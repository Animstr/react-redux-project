import {useHttp} from '../../hooks/http.hook';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { heroesFetching, heroesFetched, heroesFetchingError } from './heroestSlice';
import { filtersFetched } from '../heroesFilters/filtersSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const {heroes, heroesLoadingStatus} = useSelector(state => state.heroes);
    const {filters} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();
    let filter = [];

    const filteredHeroesSelector = createSelector(
        (state) => state.heroes.heroes,
        (state) => state.filters.activeFilter,
        (arr, filter) => {
            if (arr.length === 0) {
                return <h5 className="text-center mt-5">Героев пока нет</h5>
            }
            return arr.map(({id, element, ...props}) => {
                if (element == filter || element == 'all' || filter == 'all') {
                    return <HeroesListItem 
                                key={id}
                                element={element}
                                {...props}
                                onDelete={() => deleteHero(id)}/>
                }
            })
        }
    )

    const elements = useSelector(filteredHeroesSelector);

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => {
                filter = data.map(hero => {
                    return hero.element;
                })

                dispatch(heroesFetched(data))
                dispatch(filtersFetched(filter))
            })
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    let newData = {
        newHeroes:[],
        newFilters:[]
    }

    const deleteHero = id => {
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(() => {heroes.map((hero, i) => {
                if (hero.id !== id) {
                    newData.newHeroes.push(hero);
                    newData.newFilters.push(filters[i])
                }
                return newData;
            })
            dispatch(heroesFetched(newData.newHeroes))
            dispatch(filtersFetched(newData.newFilters))
        })
            .catch(() => dispatch(heroesFetchingError()))
    }

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;
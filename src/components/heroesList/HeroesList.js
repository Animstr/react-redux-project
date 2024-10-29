import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const {heroes, heroesLoadingStatus, filters, activeFilter} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();
    let filter = [];

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => {
                filter = data.map(hero => {
                    return hero.element;
                })
                dispatch(heroesFetched(data, filter))
            })
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    const deleteHero = useCallback(id => {
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(() => heroes.map((hero, i) => {
                if (hero.id == id) {
                    heroes.splice(i, 1);
                    filters.splice(filters.indexOf(hero.element), 1)
                }
                dispatch(heroesFetched(heroes, filters))
            }))
            .catch(() => dispatch(heroesFetchingError()))
    })

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr, filter) => {
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

    const elements = renderHeroesList(heroes, activeFilter);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;
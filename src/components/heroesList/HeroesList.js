import { useEffect} from 'react';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import { useGetHeroesQuery, useDeleteHeroMutation, usePostFiltersMutation, useGetFiltersQuery, useGetActiveFilterQuery } from '../../Api/apiSlice';
import { useMemo } from 'react';
import { useSetActiveFilterMutation } from '../../Api/apiSlice';

const HeroesList = () => {

    const {data: heroes = [], error, isLoading} = useGetHeroesQuery();
    const [removeHero] = useDeleteHeroMutation();
    const [recordingFilters] = usePostFiltersMutation();
    const {data: filter = 'all'} = useGetActiveFilterQuery();
    const [setActive, {data: activeFilter = {1: 'all'}}] = useSetActiveFilterMutation();
    let heroesList = [];

    useEffect(() => {
        if (heroes.length) {
            let filtersObj = {};
            heroes.forEach((hero) => {
                filtersObj[hero.id] = hero.element;
            })
            recordingFilters(filtersObj);
        }
    }, [heroes])

    const filteredHeroesSelector = useMemo(() => {
            if (Object.values(filter)[0] == 'all'){
                heroesList = heroes;
            } else {
                heroes.forEach(hero => {
                    if (hero.element == Object.values(filter)[0] || hero.element == 'all') {
                        heroesList.push(hero);
                    }
                })
            }

            if (heroesList.length === 0) {
                return <h5 className="text-center mt-5">Героев пока нет</h5>
            }
            return heroesList.map(({id, element, ...props}) => {
                    return <HeroesListItem 
                                key={id}
                                element={element}
                                {...props}
                                onDelete={() => deleteHero(id)}/>
            })   
        }, [heroes, filter]
    )

    const elements = filteredHeroesSelector;

    const deleteHero = id => {
        removeHero(id);
        setActive(activeFilter);
    }

    if (isLoading) {
        return <Spinner/>;
    } else if (error) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;
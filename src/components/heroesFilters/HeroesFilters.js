import { useDispatch, useSelector } from "react-redux";
import { filterHeroes } from "./filtersSlice";

const HeroesFilters = () => {
    const {filters, activeFilter} = useSelector(state => state.filters);
    const dispatch = useDispatch();

    const setActiveFilter = (name) => {
        dispatch(filterHeroes(name));
    }

    const getFilters = () => {
        let usedFilters = [];
        return filters.map( (filter, i) => {
                if (!usedFilters.includes(filter)) {
                    let elementClassName = '';
                    let name = '';
                    switch(filter) {
                        case "all":
                            elementClassName = "btn btn-outline-dark";
                            name = 'Все';
                            break;
                        case "fire":
                            elementClassName = "btn btn-danger";
                            name = 'Огонь';
                            break;
                        case "water":
                            elementClassName = "btn btn-primary";
                            name = 'Вода';
                            break;
                        case "wind":
                            elementClassName = "btn btn-success";
                            name = 'Ветер';
                            break;
                        case "earth":
                            elementClassName = "btn btn-secondary";
                            name = 'Земля';
                            break;
                        default:
                            elementClassName = "btn btn-outline-dark";
                            name = 'Все';
                            break;
                        }
                        usedFilters.push(filter)

                    return <button 
                                key={i}
                                onClick={() => setActiveFilter(filter)} 
                                className={activeFilter == filter ? elementClassName + ' active' : elementClassName}
                                >{name}
                            </button>
                }
            }) 
    }

    let filterELements = getFilters();

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filterELements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;
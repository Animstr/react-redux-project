import { useGetActiveFilterQuery, useGetFiltersQuery, useSetActiveFilterMutation } from "../../Api/apiSlice";

const HeroesFilters = () => {
    const {data: filters = []} = useGetFiltersQuery();
    const [setActive] = useSetActiveFilterMutation();
    const {data: active = {1: 'all'}} = useGetActiveFilterQuery();

    const setActiveObj = (filter, i) => {
        let obj = {};
        obj[i] = filter;
        setActive(obj)
    }

    const getFilters = () => {
        let usedFilters = [];
        
        return Object.values(filters).map((filter, i) => {
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
                            onClick={() => setActiveObj(filter, i)} 
                            className={Object.values(active)[0] == filter ? elementClassName + ' active' : elementClassName}
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
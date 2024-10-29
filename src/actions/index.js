export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes, filters) => {
    return {
        type: 'HEROES_FETCHED',
        payload: {heroes, filters}
    }
}

export const filterHeroes = (activeFilter) => {
    return {
        type: 'FILTER_HEROES',
        payload: {activeFilter}
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const heroesApi = createApi({
    reducerPath: 'api',
    tagTypes: ['Heroes', 'Filters', 'ActiveFilter'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001'
    }),
    endpoints: builder => ({
        getHeroes: builder.query({
            query: () => `/heroes`,
            providesTags: ['Heroes']
        }),
        postHero: builder.mutation({
            query: hero => ({
                url: `/heroes`,
                method: 'POST',
                body: hero,
              }),
            invalidatesTags: ['Heroes', 'Filters']
        }),
        deleteHero: builder.mutation({
            query: id => ({
                url: `/heroes/${id}`,
                method: 'DELETE'
              }),
            invalidatesTags: ['Heroes', 'Filters', 'ActiveFilter']
        }),
        postFilters: builder.mutation({
            query: (filters) => ({
                url: '/usedFilters',
                method: 'POST',
                body: filters
            }),
            invalidatesTags: ['Filters']
        }),
        getFilters: builder.query({
            query: () => '/usedFilters',
            providesTags: ['Filters']
        }),
        setActiveFilter: builder.mutation({
            query: filter => ({
                url: `/activeFilter`,
                method: 'PUT',
                body: filter
            }),
            invalidatesTags: ['Heroes', 'ActiveFilter']
        }),
        getActiveFilter: builder.query({
            query: () => '/activeFilter',
            providesTags: ['ActiveFilter']
        })

    })
})

export const {
    useGetHeroesQuery, 
    usePostHeroMutation, 
    useDeleteHeroMutation, 
    usePostFiltersMutation, 
    useGetFiltersQuery,
    useSetActiveFilterMutation,
    useGetActiveFilterQuery
} = heroesApi;
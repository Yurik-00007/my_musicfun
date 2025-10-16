import {useSelector} from 'react-redux'
import type {RootState} from "@/app/model/store.ts";
import playlistsApi from "@/features/playlists/api/playlistsApi.ts";
import {tracksApi} from "@/features/tracks/api/tracksApi.ts";

const excludedEndpoints=[playlistsApi.endpoints.fetchPlaylists.name,tracksApi.endpoints.fetchTracks.name]

export const useGlobalLoading = () => {
  return useSelector((state: RootState) => {
    // debugger
    // Получаем все активные запросы из RTK Query API
    const queries = Object.values(state.baseApi.queries || {})
    const mutations = Object.values(state.baseApi.mutations || {})

    // Проверяем, есть ли активные запросы (статус 'pending')
    const hasActiveQueries = queries.some(query => {
      // return query?.status === 'pending' && query.endpointName!=='fetchPlaylists';
      /*
            if(query?.status !== 'pending') {
              return query?.endpointName !== playlistsApi.endpoints.fetchPlaylists.name;
      */
/*
      if (query?.status !== 'pending') {
        return
      }
      if (query?.endpointName === playlistsApi.endpoints.fetchPlaylists.name) {
        const completedQueries = queries.filter(query => query?.status === 'fulfilled')
        return completedQueries.length > 0
      }
      if (query?.endpointName === tracksApi.endpoints.fetchTracks.name) {
        const completedQueries = queries.filter(query => query?.status === 'fulfilled')
        return completedQueries.length > 0
      }
*/
      if (query?.status !== 'pending') {
        return
      }
        if (excludedEndpoints.includes(query.endpointName)) {
          const completedQueries = queries.filter(query => query?.status === 'fulfilled')
          return completedQueries.length > 0
        }



    })
    const hasActiveMutations = mutations.some(mutation => mutation?.status === 'pending')

    return hasActiveQueries || hasActiveMutations
  })
}
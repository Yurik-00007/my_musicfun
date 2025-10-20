import {useSelector} from 'react-redux'
import type {RootState} from "@/app/model/store.ts";
import playlistsApi from "@/features/playlists/api/playlistsApi.ts";
import {tracksApi} from "@/features/tracks/api/tracksApi.ts";

const excludedEndpoints=[playlistsApi.endpoints.fetchPlaylists.name,tracksApi.endpoints.fetchTracks.name]

export const useGlobalLoading = () => {
  return useSelector((state: RootState) => {
    // debugger
    // console.log(state)
/*
    baseApi : {
    config : {online: true, focused: true, middlewareRegistered: false, refetchOnFocus: false, refetchOnReconnect:
    false, …}
    mutations : {}
    provided : {tags: {…}, keys: {…}}
    queries :  {fetchPlaylists({"pageNumber":1,"pageSize":2,"search":""}): {…}}
    subscriptions : {}
    }
 */

    // Получаем все активные запросы из RTK Query API
    const queries = Object.values(state.baseApi.queries || {})
    const mutations = Object.values(state.baseApi.mutations || {})

    //queries :{
    //fetchPlaylists({"pageNumber":1,"pageSize":2,"search":""}) : {
    // Получаем массив queries и mutations объектов. Берем из объекта его значения и помещаем в массив
    // data : {data: Array(2), meta: {…}}
    // endpointName : "fetchPlaylists"
    // fulfilledTimeStamp : 1760949013823
    // originalArgs : {search: '', pageNumber: 1, pageSize: 2}
    // requestId : "Y0LdOfhCaz2hJh1mfktTf"
    // startedTimeStamp : 1760949011422
    // status : "fulfilled"
    //}
    //}

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
      // debugger
        if (excludedEndpoints.includes(query.endpointName)) {
          const completedQueries = queries.filter(query => query?.status === 'fulfilled')
          return completedQueries.length > 0
        }



    })
    const hasActiveMutations = mutations.some(mutation => mutation?.status === 'pending')

    return hasActiveQueries || hasActiveMutations
  })
}
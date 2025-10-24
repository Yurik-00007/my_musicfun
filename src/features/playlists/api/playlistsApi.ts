import type {
  CreatePlaylistArgs, FetchPlaylistsArgs,
  PlaylistData,
  PlaylistsResponse,
  UpdatePlaylistArgs
} from "@/features/playlists/api/playlistsApi.types.ts";
import {baseApi} from "@/app/api/baseApi.ts";
import type {Images} from "@/common/types";
import {current} from "@reduxjs/toolkit";


const playlistsApi = baseApi.injectEndpoints({
  endpoints: (build) =>
    ({
      fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
        providesTags: ['Playlist'],
        query: (params) => ({
          url: `/playlists`,
          params
        })
        /*
                query: () => {
                return{
                  // method: 'get',
                  url: `playlists`,
                  params
                }
                },
        */
      }),
      createPlaylists: build.mutation<{ data: PlaylistData }, CreatePlaylistArgs>({
        invalidatesTags: ['Playlist'],
        query: (body) => ({
          method: 'post',
          url: `/playlists`,
          body
        }),
      }),
      removePlaylists: build.mutation<void, string>({
        invalidatesTags: ['Playlist'],
        query: (playlistId) => ({
          method: 'delete',
          url: `/playlists/${playlistId}`,
        }),
      }),
      updatePlaylists: build.mutation<void, { playlistId: string; body: UpdatePlaylistArgs }>({
        query: ({playlistId, body}) => {
          // debugger
          // console.log('4')
          return ({
            method: 'put',
            url: `/playlists/${playlistId}`,
            body
          });
        },
        onQueryStarted: async ({playlistId, body}, {queryFulfilled, dispatch, getState}) => {

          //Получает все аргументы ({search, pageNumber, pageSize}), с которыми в кеше есть результаты для fetchPlaylists.
          const args = playlistsApi.util.selectCachedArgsForQuery(getState(), 'fetchPlaylists')
          console.log(args)//хотя меняем на 2-ой странице
          //[
          // 0 : {search: '', pageNumber: 2, pageSize: 2}
          // 1 : {search: '', pageNumber: 3, pageSize: 2}
          // 2 : {search: '', pageNumber: 4, pageSize: 2}
          // 3 : {search: '', pageNumber: 5, pageSize: 2}
          // 4 : {search: '', pageNumber: 6, pageSize: 2}
          // 5 : {search: '', pageNumber: 7, pageSize: 2}
          // 6 : {search: '', pageNumber: 1, pageSize: 2}
          //]
          // debugger

          // console.log('1')

          // @ts-expect-error temporary patch type
          const patchCollections = []

          args.forEach((arg) => {
            patchCollections.push(
              dispatch(
                playlistsApi.util.updateQueryData('fetchPlaylists', {
                  search: arg.search,
                  pageNumber: arg.pageNumber,
                  pageSize: arg.pageSize
                }, (state) => {
                  // console.log('2')
                  /*
                                // ❌ ERROR: logs the Proxy-wrapped data
                                console.log(state)
                                // ✅ CORRECT: logs a plain JS copy of the current data
                                console.log(current(state))
                  */
                  const myState = current(state)
                  console.log(myState)
                  // debugger
                  const index = state.data.findIndex(playlist => playlist.id === playlistId)
                  if (index !== -1) {
                    state.data[index].attributes = {...state.data[index].attributes, ...body}
                  }
                  // debugger
                }),
              )
              // debugger
            )
          })

          /*
          const patchCollection = dispatch(
            playlistsApi.util.updateQueryData('fetchPlaylists', {
              search: args[0].search,
              pageNumber: args[0].pageNumber,
              pageSize: args[0].pageSize
            }, (state) => {
              // console.log('2')
              /!*
                            // ❌ ERROR: logs the Proxy-wrapped data
                            console.log(state)
                            // ✅ CORRECT: logs a plain JS copy of the current data
                            console.log(current(state))
              *!/
              const index = state.data.findIndex(playlist => playlist.id === playlistId)
              if (index !== -1) {
                state.data[index].attributes = {...state.data[index].attributes, ...body}
              }
              // debugger
            }),
          )
          // debugger
          */

          // @ts-expect-error temporary patch type
          console.log(patchCollections)
          //[
          // { inversePatches : [] patches : [] undo : () => {…} }
          // { inversePatches : [] patches : [] undo : () => {…} }
          // ]
          try {
            // console.log('3')
            await queryFulfilled
            // console.log('5 success')
          } catch {
            // patchCollection.undo()
            // console.log('5 error')
            // @ts-expect-error temporary patch type
            patchCollections.forEach((patchCollection) => {
              patchCollection.undo()
            })
          }

        },
        invalidatesTags: ['Playlist'],
      }),
      uploadPlaylistsCover: build.mutation<Images, { playlistId: string, file: File }>({
        invalidatesTags: ['Playlist'],
        query: ({playlistId, file}) => {
          const formData = new FormData()
          formData.append('file', file)
          return ({
            method: 'post',
            url: `/playlists/${playlistId}/images/main`,
            body: formData
          });
        },
      }),
      removePlaylistsCover: build.mutation<void, { playlistId: string }>({
        invalidatesTags: ['Playlist'],
        query: ({playlistId}) => ({
          method: 'delete',
          url: `/playlists/${playlistId}/images/main`,
        }),
      }),
    })
})
export default playlistsApi

export const {
  useFetchPlaylistsQuery,
  useCreatePlaylistsMutation,
  useRemovePlaylistsMutation,
  useUpdatePlaylistsMutation,
  useUploadPlaylistsCoverMutation,
  useRemovePlaylistsCoverMutation,
} = playlistsApi
//https://musicfun.it-incubator.app/api/1.0/

import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
// import type {FetchPlaylistsArgs, PlaylistsResponse} from "@/features/playlists/api/playlistsApi.types.ts";
import type {
  CreatePlaylistArgs,
  PlaylistData,
  PlaylistsResponse,
  UpdatePlaylistArgs
} from "@/features/playlists/api/playlistsApi.types.ts";

export const playlistsApi = createApi({
  reducerPath: 'playlistsApi',
  tagTypes:['Playlist'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
      'API-KEY': import.meta.env.VITE_API_KEY,
    },
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`)
      return headers
    }
  }),
  endpoints: (build) =>
    ({
      fetchPlaylists: build.query<PlaylistsResponse, void>({
        providesTags:['Playlist'],
        query: () => `playlists`
        /*
                query: () => ({
                  // method: 'get',
                  url: `playlists`
                }),
        */
      }),
      createPlaylists: build.mutation<{ data: PlaylistData }, CreatePlaylistArgs>({
        invalidatesTags:['Playlist'],
        query: (body) => ({
          method: 'post',
          url: `playlists`,
          body
        }),
      }),
      removePlaylists: build.mutation<void, string>({
        invalidatesTags:['Playlist'],
        query: (playlistId) => ({
          method: 'delete',
          url: `/playlists/${playlistId}`,
        }),
      }),
      updatePlaylists: build.mutation<void, { playlistId: string; body: UpdatePlaylistArgs }>({
        invalidatesTags:['Playlist'],
        query: ({playlistId, body}) => ({
          method: 'put',
          url: `/playlists/${playlistId}`,
          body
        }),
      }),
    })
})

export const {useFetchPlaylistsQuery, useCreatePlaylistsMutation, useRemovePlaylistsMutation, useUpdatePlaylistsMutation} = playlistsApi
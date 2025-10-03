import type {
  CreatePlaylistArgs,
  PlaylistData,
  PlaylistsResponse,
  UpdatePlaylistArgs
} from "@/features/playlists/api/playlistsApi.types.ts";
import {baseApi} from "@/app/api/baseApi.ts";

export const playlistsApi = baseApi.injectEndpoints({
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
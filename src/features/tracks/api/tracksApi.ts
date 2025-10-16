import {baseApi} from "@/app/api/baseApi.ts";
import type {FetchTracksArgs, FetchTracksResponse} from "@/features/tracks/api/tracksApi.types.ts";
import {PaginationType} from "@/common/enums";

export const tracksApi = baseApi.injectEndpoints({
  endpoints: build => ({
        fetchTracks: build.infiniteQuery<FetchTracksResponse, FetchTracksArgs, string | null>({
          infiniteQueryOptions: {
            initialPageParam: null,
            getNextPageParam: (lastPage) => {
              // debugger
              // return '1'
              return lastPage.meta.nextCursor || null
            }
          },
          query: ({pageParam}) => {
            // debugger
            return {
              url: 'playlists/tracks',
              params: {cursor: pageParam, pageSize: 5, paginationType: PaginationType.CURSOR}
            };
          }
        }),
/*
    fetchTracks: build.infiniteQuery<FetchTracksResponse, FetchTracksArgs, number>({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage, _allPages, lastPageParam) => {
          return lastPageParam < (lastPage.meta as { pagesCount: number }).pagesCount
            ? lastPageParam + 1
            : undefined
        },
      },
      query: ({pageParam}) => {
        return {
          url: 'playlists/tracks',
          params: {pageNumber: pageParam, pageSize: 5, paginationType: PaginationType.OFFSET}
        }
      },
    }),
*/


  }),
})

export const {useFetchTracksInfiniteQuery} = tracksApi
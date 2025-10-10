import {baseApi} from "@/app/api/baseApi.ts";
import type {FetchTracksResponse} from "@/features/tracks/api/tracksApi.types.ts";
import {PaginationType} from "@/common/enums";

export const tracksApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchTracks: build.infiniteQuery<FetchTracksResponse, void, string | null>({
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
  })
})

export const {useFetchTracksInfiniteQuery} = tracksApi
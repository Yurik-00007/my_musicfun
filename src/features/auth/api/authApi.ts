import {baseApi} from "@/app/api/baseApi.ts";
import type {MeResponse} from "@/features/auth/api/authApi.types.ts";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) =>
    ({
      getMe: build.query<MeResponse, void>({
        query: () => ({
          url: `auth/me`,
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

    })
})
export default authApi

export const {
  useGetMeQuery,
} = authApi
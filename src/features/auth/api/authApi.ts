import { baseApi } from "@/app/api/baseApi.ts";
import type {
  LoginArgs,
  LoginResponse,
  MeResponse,
} from "@/features/auth/api/authApi.types.ts";
import { AUTH_KEYS } from "@/common/constants";
import { withZodCatch } from "@/common/utils";
import {
  loginResponseSchema,
  meResponseSchema,
} from "@/features/auth/model/auth.schemas.ts";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<MeResponse, void>({
      query: () => "/auth/me",
      ...withZodCatch(meResponseSchema),
      providesTags: ["Auth"],
    }),
    login: build.mutation<LoginResponse, LoginArgs>({
      query: (payload) => ({
        method: "post",
        url: `/auth/login`,
        body: { ...payload, accessTokenTTL: "15m" },
      }),
      ...withZodCatch(loginResponseSchema),
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        // debugger
        localStorage.setItem(AUTH_KEYS.ACCESS_TOKEN, data.accessToken);
        localStorage.setItem(AUTH_KEYS.REFRESH_TOKEN, data.refreshToken);

        dispatch(authApi.util.invalidateTags(["Auth"]));
      },
    }),
    logout: build.mutation<void, void>({
      query: () => {
        const refreshToken = localStorage.getItem(AUTH_KEYS.REFRESH_TOKEN);
        return {
          method: "post",
          url: `/auth/logout`,
          body: { refreshToken },
        };
      },
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        // debugger
        await queryFulfilled;
        localStorage.removeItem(AUTH_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(AUTH_KEYS.REFRESH_TOKEN);

        dispatch(baseApi.util.resetApiState());
      },
    }),
  }),
});
export default authApi;

export const { useGetMeQuery, useLoginMutation, useLogoutMutation } = authApi;

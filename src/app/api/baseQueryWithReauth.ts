import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { baseQuery } from "@/app/api/baseQuery.ts";
import { handleErrors, isTokens } from "@/common/utils";
import { AUTH_KEYS } from "@/common/constants";
import authApi from "@/features/auth/api/authApi.ts";

// create a new mutex
const mutex = new Mutex();

// const baseQuery = fetchBaseQuery({ baseUrl: '/' })
//вынесем в отдельную функцию и файл fetchBaseQuery.ts
/*
const baseQuery =fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  headers: {
    'API-KEY': import.meta.env.VITE_API_KEY,
  },
  prepareHeaders: (headers) => {
    // debugger
    const accessToken =localStorage.getItem(AUTH_KEYS.ACCESS_TOKEN);
    // headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`)
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }
    return headers
  },
  // responseHandler:()=>{
  //   throw new Error('PARSING_ERROR')
  // },
})
*/

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // debugger

  await new Promise((resolve) => setTimeout(resolve, 2000)); //🔴delay=задержка

  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);
  // debugger

  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshToken = localStorage.getItem(AUTH_KEYS.REFRESH_TOKEN);

        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh",
            method: "post",
            body: { refreshToken },
          },
          api,
          extraOptions,
        );
        // debugger

        if (refreshResult.data && isTokens(refreshResult.data)) {
          localStorage.setItem(
            AUTH_KEYS.REFRESH_TOKEN,
            refreshResult.data.refreshToken,
          );
          localStorage.setItem(
            AUTH_KEYS.ACCESS_TOKEN,
            refreshResult.data.accessToken,
          );
          // api.dispatch(tokenReceived(refreshResult.data)) ❌
          // 🟢 Повторяем оригинальный запрос, который раньше упал
          result = await baseQuery(args, api, extraOptions);
        } else {
          // debugger
          api.dispatch(authApi.endpoints.logout.initiate());
          // api.dispatch(loggedOut()) ❌
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  if (result.error && result.error.status !== 401) {
    handleErrors(result.error);
  }

  return result;
};

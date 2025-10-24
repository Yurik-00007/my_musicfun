import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import {AUTH_KEYS} from "@/common/constants";

export const baseQuery = fetchBaseQuery({
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
})
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const   baseApi = createApi({
  reducerPath: 'baseApi',
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
  // keepUnusedDataFor: 60,//Время хранения данных в кэше, по умолчанию, составляет 60 секунд. Но это время можно настраивать с помощью keepUnusedDataFor(по умолчанию)
  // refetchOnFocus: true,
  // В RTK Query refetchOnFocus используется для автоматического повторного запроса за данными, когда окно приложения или вкладка браузера попадают в фокус. Лучше точечное использование на определенный url который вызывается в компоненте хука, а не в api запроса.
  // refetchOnReconnect: true,
  //В RTK Query refetchOnReconnect управляет повторным запросом данных, когда приложение или браузер восстанавливает соединение с интернетом после его потери. Лучше точечное использование на определенный url который вызывается в компоненте хука, а не в api запроса.
  endpoints: () => ({}),
})
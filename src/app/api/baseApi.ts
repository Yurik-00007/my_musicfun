import {createApi} from '@reduxjs/toolkit/query/react'
import {baseQueryWithReauth} from "@/app/api/baseQueryWithReauth.ts";

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Playlist', 'Auth'],
  baseQuery: baseQueryWithReauth,
  /*
    // В baseQuery создаем функцию, которая вернет функцию и будет само вызывающаяся. При каждом запросе будем попадать в места где debugger.


  baseQuery: async (args, api, extraOptions) => {

    // await new Promise(resolve => setTimeout(resolve, 2000))//delay=задержка
    // debugger


    const result = await fetchBaseQuery({
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
    })(args, api, extraOptions)


    if (result.error) {
      // debugger
      handleErrors(result.error)
      // switch (result.error.status) {
      //   case 'FETCH_ERROR':
      //   case 'PARSING_ERROR':
      //   case 'CUSTOM_ERROR':
      //   case 'TIMEOUT_ERROR':
      //     toast(result.error.error, {type: 'error', theme: 'colored'})
      //     break
      //   case 404:
      //     // ✅ 1. Type Assertions
      //     // toast((result.error.data as { error: string }).error, {type: "error", theme: 'colored'})
      //     // ✅ 2. JSON.stringify
      //     // toast(JSON.stringify(result.error.data), {type: 'error', theme: 'colored'})
      //     // ✅ 3. Type Predicate
      //     // if (isErrorWithError(result.error.data)) {
      //     //   toast(result.error.data.error, { type: 'error', theme: 'colored' })
      //     // } else {
      //     //   toast(JSON.stringify(result.error.data), { type: 'error', theme: 'colored' })
      //     // }
      //     if (isErrorWithProperty(result.error.data, 'error')) {
      //       toast(result.error.data.error, {type: 'error', theme: 'colored'})
      //     } else {
      //       toast(JSON.stringify(result.error.data), {type: 'error', theme: 'colored'})
      //     }
      //     break
      //   case 429:
      //   case 401:
      //     // if (isErrorWithMessage(result.error.data)) {
      //     //   toast(result.error.data.message, { type: 'error', theme: 'colored' })
      //     // } else {
      //     //   toast(JSON.stringify(result.error.data), { type: 'error', theme: 'colored' })
      //     // }
      //     if (isErrorWithProperty(result.error.data, 'message')) {
      //       toast(result.error.data.message, {type: 'error', theme: 'colored'})
      //     } else {
      //       toast(JSON.stringify(result.error.data), {type: 'error', theme: 'colored'})
      //     }
      //     break
      //   case 400:
      //   case 403:
      //     if (isErrorWithDetailArray(result.error.data)) {
      //       toast(trimToMaxLength(result.error.data.errors[0].detail), {type: 'error', theme: 'colored'})
      //     } else {
      //       toast(JSON.stringify(result.error.data), {type: 'error', theme: 'colored'})
      //     }
      //     break
      //   default:
      //     if (result.error.status >= 500 && result.error.status < 600){
      //       toast("Server error occurred. Please try again later.", { type: "error", theme: "colored" })
      //     } else{
      //       toast('Some error occurred', {type: "error", theme: 'colored'})
      //     }
      // }
    }

    return result
  },
*/
  // keepUnusedDataFor: 60,//Время хранения данных в кэше, по умолчанию, составляет 60 секунд. Но это время можно настраивать с помощью keepUnusedDataFor(по умолчанию)
  // refetchOnFocus: true,
  // В RTK Query refetchOnFocus используется для автоматического повторного запроса за данными, когда окно приложения или вкладка браузера попадают в фокус. Лучше точечное использование на определенный url который вызывается в компоненте хука, а не в api запроса.
  // refetchOnReconnect: true,
  //В RTK Query refetchOnReconnect управляет повторным запросом данных, когда приложение или браузер восстанавливает соединение с интернетом после его потери. Лучше точечное использование на определенный url который вызывается в компоненте хука, а не в api запроса.
  endpoints: () => ({}),
})
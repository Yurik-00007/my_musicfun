import type {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {errorToast, isErrorWithDetailArray, isErrorWithProperty, trimToMaxLength} from "@/common/utils";


//error : {
// data : {
// message: "ENOENT: no such file or directory, stat
// '/home/nod…st/spotifun/dist/apps/spotifun/public/index.html'",
// error: 'Not Found',
// statusCode: 404
// }
// status : 404
// }

export const handleErrors = (error: FetchBaseQueryError) => {
  if (error) {
    // debugger
    switch (error.status) {
      case 'FETCH_ERROR':
      case 'PARSING_ERROR':
      case 'CUSTOM_ERROR':
      case 'TIMEOUT_ERROR':
        // toast(error.error, {type: 'error', theme: 'colored'})
        errorToast(error.error)
        break
      case 404:
        // ✅ 1. Type Assertions
        // toast((result.error.data as { error: string }).error, {type: "error", theme: 'colored'})
        // ✅ 2. JSON.stringify
        // toast(JSON.stringify(result.error.data), {type: 'error', theme: 'colored'})
        // ✅ 3. Type Predicate
        // if (isErrorWithError(result.error.data)) {
        //   toast(result.error.data.error, { type: 'error', theme: 'colored' })
        // } else {
        //   toast(JSON.stringify(result.error.data), { type: 'error', theme: 'colored' })
        // }
        if (isErrorWithProperty(error.data, 'error')) {
          // toast(error.data.error, {type: 'error', theme: 'colored'})
          errorToast(error.data.error)
        } else {
          // toast(JSON.stringify(error.data), {type: 'error', theme: 'colored'})
          errorToast(JSON.stringify(error.data))
        }
        break
      case 429:
      // case 401:
        // if (isErrorWithMessage(result.error.data)) {
        //   toast(result.error.data.message, { type: 'error', theme: 'colored' })
        // } else {
        //   toast(JSON.stringify(result.error.data), { type: 'error', theme: 'colored' })
        // }
        if (isErrorWithProperty(error.data, 'message')) {
          // toast(error.data.message, {type: 'error', theme: 'colored'})
          errorToast(error.data.message)
        } else {
          // toast(JSON.stringify(error.data), {type: 'error', theme: 'colored'})
          errorToast(JSON.stringify(error.data))
        }
        break
      case 400:
        if (isErrorWithDetailArray(error.data)) {
          const errorMassage=error.data.errors[0].detail
          if(errorMassage.includes('refreshToken')){
            return
          }
          errorToast(trimToMaxLength(error.data.errors[0].detail))
        } else {
          // toast(JSON.stringify(error.data), {type: 'error', theme: 'colored'})
          errorToast(JSON.stringify(error.data))
        }
        break
      case 403:
        if (isErrorWithDetailArray(error.data)) {
          // toast(trimToMaxLength(error.data.errors[0].detail), {type: 'error', theme: 'colored'})
          errorToast(trimToMaxLength(error.data.errors[0].detail))
        } else {
          // toast(JSON.stringify(error.data), {type: 'error', theme: 'colored'})
          errorToast(JSON.stringify(error.data))
        }
        break
      default:
        if (error.status >= 500 && error.status < 600) {
          // toast("Server error occurred. Please try again later.", { type: "error", theme: "colored" })
          errorToast("Server error occurred. Please try again later.")
        } else {
          // toast('Some error occurred', {type: "error", theme: 'colored'})
          errorToast('Some error occurred')
        }
    }
  }
};


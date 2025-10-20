export function isErrorWithDetailArray(
  error: unknown,
): error is { errors: { detail: string }[] } {
  return (
    typeof error === 'object'
    && error != null
    && 'errors' in error
    && Array.isArray((error).errors)
    && (error).errors.length > 0
    && typeof (error).errors[0].detail === 'string'
  )
}

//result : {
    // error : {
        // data : {
            // errors:[
              // 0 : {status: '403', code: 4, title: 'Playlist belongs to another user', detail: 'Playlist belongs to another user'}
            //]
        //}
  //}
//}

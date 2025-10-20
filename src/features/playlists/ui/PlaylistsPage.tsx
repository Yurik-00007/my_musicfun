import {useFetchPlaylistsQuery} from "@/features/playlists/api/playlistsApi.ts";
import s from './PlaylistsPage.module.css'
import {CreatePlaylistForm} from "@/features/playlists/ui/CreatePlaylistForm/CreatePlaylistForm.tsx";
import {type ChangeEvent, useState} from "react";
import {useDebounceValue} from "@/common/hooks";
import {Pagination} from "@/common/components";
import PlaylistList from "@/features/playlists/ui/PlaylistList/PlaylistList.tsx";

export const PlaylistsPage = () => {
  const [search, setSearch] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(2)

  const debounceSearch = useDebounceValue(search)

  const {data, isLoading, isError, error} = useFetchPlaylistsQuery(
    {search: debounceSearch, pageNumber: currentPage, pageSize},
    // {refetchOnFocus: true}//точечный запрос: будут работать только этот запрос, в api запрос не сработает.
    // {refetchOnReconnect: true}//точечный запрос: будут работать только этот запрос, в api запрос не сработает.

    //Polling позволяет автоматически повторять запросы через определённые интервалы времени для поддержания актуальности данных.
    /*
        {
          pollingInterval: 3000, // каждые 3 секунды
          skipPollingIfUnfocused: true, // не опрашивать, если вкладка не активна
        }
    */
  )

  //
  console.log({error, isError})
  //error : {
  // data : {
  // message: "ENOENT: no such file or directory, stat
  // '/home/nod…st/spotifun/dist/apps/spotifun/public/index.html'",
  // error: 'Not Found',
  // statusCode: 404
  // }
  // status : 404
  // }
  // isError : true

  //isLoading → начальная загрузка, isFetching → любая активная загрузка.
  // console.log({isLoading, isFetching, status})
  //Когда status = "pending" или isFetching = true — data остаётся со старыми данными,а currentData будет undefined, пока новый запрос не завершится.
  // console.log({data, currentData, status})

/*
  useEffect(() => {
    if (error) {
      if ('status' in error) {
        // FetchBaseQueryError
        // const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)
        const errMsg = 'error' in error ? error.error : (error.data as { error: string }).error
          || (error.data as { message: string }).message || 'Some error occurred'
        toast(errMsg, {type: "error", theme: 'colored'});
      } else {
        // SerializedError
        const errMsg = error.message || 'Some error occurred'
        toast(errMsg, {type: "error", theme: 'colored'});
      }
    }
  },[error])
*/


  const changePageSizeHandler = (size: number) => {
    setPageSize(size)
    setCurrentPage(1)
  }

  const searchPlayListHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value)
    setCurrentPage(1)
  }

  if (isLoading) {
    return (
      <h1>Skeleton loading ...</h1>
    )
  }
  return (
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm onSuccess={() => setCurrentPage(1)}/>
      <input
        type="search"
        placeholder={'Search playlist by title'}
        onChange={e => searchPlayListHandler(e)}
      />
      <PlaylistList playlists={data?.data || []} isPlaylistsLoading={isLoading}/>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pagesCount={data?.meta.pagesCount || 1}
        pageSize={pageSize}
        changePageSize={changePageSizeHandler}
      />
    </div>
  )
}
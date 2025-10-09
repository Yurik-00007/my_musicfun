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
  const [pageSize, setPageSize] = useState(20)

  const debounceSearch = useDebounceValue(search)

  const {data, isLoading} = useFetchPlaylistsQuery(
    {search: debounceSearch, pageNumber: currentPage, pageSize},
    // {refetchOnFocus: true}//точечный запрос: будут работать только этот запрос, в api запрос не сработает.
    // {refetchOnReconnect: true}//точечный запрос: будут работать только этот запрос, в api запрос не сработает.

    //Polling позволяет автоматически повторять запросы через определённые интервалы времени для поддержания актуальности данных.
    {
      pollingInterval: 3000, // каждые 3 секунды
      skipPollingIfUnfocused: true, // не опрашивать, если вкладка не активна
    }
  )

  const changePageSizeHandler = (size: number) => {
    setPageSize(size)
    setCurrentPage(1)
  }

  const searchPlayListHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value)
    setCurrentPage(1)
  }

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm/>
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
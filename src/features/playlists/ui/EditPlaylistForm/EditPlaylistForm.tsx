import type {SubmitHandler, UseFormHandleSubmit, UseFormRegister} from "react-hook-form";
import {useUpdatePlaylistsMutation} from "@/features/playlists/api/playlistsApi.ts";
import type {UpdatePlaylistArgs} from "@/features/playlists/api/playlistsApi.types.ts";

type Props = {
  playlistId: string
  setPlaylistId: (playlistId: null) => void
  editPlaylist: (playlist: null) => void
  register: UseFormRegister<UpdatePlaylistArgs>
  handleSubmit: UseFormHandleSubmit<UpdatePlaylistArgs>
}

export const EditPlaylistForm = ({playlistId, setPlaylistId, editPlaylist, register, handleSubmit}: Props) => {


  const [updatePlaylist] = useUpdatePlaylistsMutation()

  const onSubmit: SubmitHandler<UpdatePlaylistArgs> = body => {
    if (!playlistId) {
      return
    }
    updatePlaylist({playlistId, body})
      .unwrap()
      .then(() => setPlaylistId(null))
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit playlist</h2>
      <div>
        <input {...register('title')} placeholder={'title'}/>
      </div>
      <div>
        <input {...register('description')} placeholder={'description'}/>
      </div>
      <button type="submit">
        save
      </button>
      <button type="button" onClick={() => editPlaylist(null)}>
        cancel
      </button>
    </form>
  )
}
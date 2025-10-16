import {type SubmitHandler, useForm} from "react-hook-form";
import type {CreatePlaylistArgs} from "@/features/playlists/api/playlistsApi.types.ts";
import {useCreatePlaylistsMutation} from "@/features/playlists/api/playlistsApi.ts";

type Props={
  onSuccess?: () => void
}

export const CreatePlaylistForm = ({onSuccess}:Props) => {
  const {register, handleSubmit, reset} = useForm<CreatePlaylistArgs>()

  const [createPlaylist] = useCreatePlaylistsMutation()

  const onSubmit: SubmitHandler<CreatePlaylistArgs> = data => {
    createPlaylist(data)
      .unwrap()
      .then(() => {
        onSuccess?.()
        reset()
      })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Create new playlist</h2>
      <div>
        <input {...register('title')} placeholder={'title'}/>
      </div>
      <div>
        <input {...register('description')} placeholder={'description'}/>
      </div>
      <button>create playlist</button>
    </form>
  )
}
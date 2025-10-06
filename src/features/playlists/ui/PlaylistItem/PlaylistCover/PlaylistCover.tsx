import s from "./PlaylistCover.module.css";
import type {ChangeEvent} from "react";
import defaultCover from "@/assets/images/default-playlist-cover.png";
import {
  useRemovePlaylistsCoverMutation,
  useUploadPlaylistsCoverMutation
} from "@/features/playlists/api/playlistsApi.ts";
import type {Images} from "@/common/types";
import {toast} from "react-toastify";

type Props = {
  playlistId: string
  images: Images
}

const PlaylistCover = ({playlistId, images}:Props) => {

  const deleteCoverHandler = () => removePlaylistsCover({playlistId})

  const [uploadPlaylistsCover] = useUploadPlaylistsCoverMutation()
  const [removePlaylistsCover] = useRemovePlaylistsCoverMutation()

  const originalCover = images.main.find(img => img.type === 'original')
  const src = originalCover ? originalCover.url : defaultCover


  const uploadPlaylistsCoverHandler = (e: ChangeEvent<HTMLInputElement>) => {

    const maxSize = 1024 * 1024//1Mb
    const allowedTypes = ["image/png", "image/jpeg", "image/gif"];

    const file = e.target.files?.length && e.target.files[0];
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      toast.error('Only JPEG, PNG, or GIF images are allowed!');
      return
    }

    if (file.size > maxSize) {
      toast.error(`The file is too large. Max size is ${Math.round(maxSize / 1024)} KB`);
      return
    }

    uploadPlaylistsCover({
      playlistId,
      file
    })
  }

  return (
    <>
      <img src={src} width={'100px'} height={'100px'} alt="cover" className={s.cover}/>
      {originalCover && <button onClick={deleteCoverHandler}>remove Cover</button>}
      <input type="file" accept={'image/jpeg, image/png, image/gif'} onChange={uploadPlaylistsCoverHandler}/>
    </>
  );
};

export default PlaylistCover;
import type {PlaylistAttributes} from "@/features/playlists/api/playlistsApi.types.ts";
import s from './PlaylistDescription.module.css'

type Props = {
  attributes: PlaylistAttributes
}


const PlaylistDescription = ({attributes}:Props) => {
  return (
    <>
      <div className={s.title}>title: {attributes.title}</div>
      <div className={s.description}>description: {attributes.description}</div>
      <div className={s.userName}>userName: {attributes.user.name}</div>
    </>
  );
};

export default PlaylistDescription;
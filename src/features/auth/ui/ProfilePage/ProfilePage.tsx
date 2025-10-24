import { useGetMeQuery } from "@/features/auth/api/authApi.ts";
import { useFetchPlaylistsQuery } from "@/features/playlists/api/playlistsApi.ts";
import PlaylistList from "@/features/playlists/ui/PlaylistList/PlaylistList.tsx";
import { CreatePlaylistForm } from "@/features/playlists/ui/CreatePlaylistForm/CreatePlaylistForm.tsx";
import s from "./ProfilePage.module.css";
import { Navigate } from "react-router";
import { Path } from "@/common/constants";

export const ProfilePage = () => {
  const { data: meResponse, isLoading: isMeLoading } = useGetMeQuery();

  const { data: playlistsResponse, isLoading } = useFetchPlaylistsQuery(
    { userId: meResponse?.userId },
    { skip: !meResponse?.userId },
  );

  if (isLoading || isMeLoading) return <h1>Skeleton loading...</h1>;

  if (!isMeLoading && !meResponse) return <Navigate to={Path.Playlists} />;

  return (
    <div>
      <h1>{meResponse?.login} page</h1>
      <div className={s.container}>
        <CreatePlaylistForm />
        <PlaylistList
          playlists={playlistsResponse?.data || []}
          isPlaylistsLoading={isLoading || isMeLoading}
        />
      </div>
    </div>
  );
};

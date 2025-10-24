import {Route, Routes} from "react-router"
import {MainPage} from "@/app/ui/MainPage/MainPage.tsx";
import {PlaylistsPage} from "@/features/playlists/ui/PlaylistsPage.tsx";
import {TracksPage} from "@/features/tracks/ui/TracksPage.tsx";
// import {PageNotFound} from "@/common/components/PageNotFound/PageNotFound.tsx";
import {PageNotFound} from "@/common/components";
import {ProfilePage} from "@/features/auth/ui/ProfilePage/ProfilePage.tsx";
import {Path} from "@/common/constants";
import {OAuthCallback} from "@/features/auth/ui/OAuthCallback/OAuthCallback.tsx";

export const Routing = () => (
  <Routes>
    <Route path={Path.Main} element={<MainPage/>}/>
    <Route path={Path.Playlists} element={<PlaylistsPage/>}/>
    <Route path={Path.Tracks} element={<TracksPage/>}/>
    <Route path={Path.Profile} element={<ProfilePage/>}/>
    <Route path={Path.NotFound} element={<PageNotFound/>}/>
    <Route path={Path.OAuthRedirect} element={<OAuthCallback/>}/>
  </Routes>
)
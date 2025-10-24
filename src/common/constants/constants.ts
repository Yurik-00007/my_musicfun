export const Path = {
  Main: '/',
  Playlists: '/playlists',
  Tracks: '/tracks',
  Profile: '/profile',
  OAuthRedirect: '/oauth/callback',
  NotFound: '*',
} as const

export const AUTH_KEYS={
  ACCESS_TOKEN: 'musicfun-access-token',
  REFRESH_TOKEN: 'musicfun-refresh-token',
}
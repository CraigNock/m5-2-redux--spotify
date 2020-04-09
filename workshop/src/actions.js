
////AUTH
export const requestAccessToken = () => ({
  type: 'REQUEST_ACCESS_TOKEN',
});

export const receiveAccessToken = (token) => ({
  type: 'RECEIVE_ACCESS_TOKEN',
  token,
});

export const receiveAccessTokenError = () => ({
  type: 'RECEIVE_ACCESS_TOKEN_ERROR',
});



////ARTISTS
export const requestArtistInfo = () => ({
  type: 'REQUEST_ARTIST_INFO',
});

export const receiveArtistProfile = (profile) => ({
  type: 'RECEIVE_ARTIST_PROFILE',
  profile,
});

export const receiveArtistTracks = (tracks) => ({
  type: 'RECEIVE_ARTIST_TRACKS',
  tracks,
});

export const receiveArtistRelated = (related) => ({
  type: 'RECEIVE_ARTIST_RELATED',
  related,
});

export const receivedAllArtistInfo = () => ({
  type: 'RECEIVED_ALL_ARTIST_INFO',
});

export const receiveArtistInfoError = () => ({
  type: 'RECEIVE_ARTIST_INFO_ERROR',
});

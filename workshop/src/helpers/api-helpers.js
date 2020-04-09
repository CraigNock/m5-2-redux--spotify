

export const fetchArtistProfile = (token, artistId) => {
  // console.log('artid ', artistId, 'tok ', token);
  const options = {
    headers: { Authorization: `Bearer ${token}`},
  };
  const url = `https://api.spotify.com/v1/artists/${artistId}`;
//response is an object, key 'profile'
  return fetch(url, options).then((response) => response.json());
};

export const fetchArtistTracks = (token, artistId) => {
  // console.log('artid ', artistId, 'tok ', token);
  const options = {
    headers: { Authorization: `Bearer ${token}`},
  };
  const url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=CA`;
//response is an object, key 'tracks' array 10
  return fetch(url, options).then((response) => response.json());
};

export const fetchArtistRelated = (token, artistId) => {
  // console.log('artid ', artistId, 'tok ', token);
  const options = {
    headers: { Authorization: `Bearer ${token}`},
  };
  const url = `https://api.spotify.com/v1/artists/${artistId}/related-artists`;
//response is an object, key 'artists' array 20
  return fetch(url, options).then((response) => response.json());
};
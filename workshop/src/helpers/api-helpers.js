

export const fetchArtistProfile = (token, artistId) => {
  // console.log('artid ', artistId, 'tok ', token);
  const options = {
    headers: { Authorization: `Bearer ${token}`},
  };
  const url = `https://api.spotify.com/v1/artists/${artistId}`;
//response is an object
  return fetch(url, options).then((response) => response.json());
};



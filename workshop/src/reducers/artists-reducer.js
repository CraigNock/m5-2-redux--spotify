


const initialState = {
  currentArtist: null,
  status: 'idle',
};


const artistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_ARTIST_INFO':
      return {
        ...state,
        status: 'loading',
      };
    case 'RECEIVE_ARTIST_PROFILE':
      return {
        ...state,
        currentArtist: {
          ...state.currentArtist,
          profile: action.profile,
        },
      };
    case 'RECEIVE_ARTIST_TRACKS':
      return {
        ...state,
        currentArtist: {
          ...state.currentArtist,
          tracks: action.tracks,
        },
      };
    case 'RECEIVE_ARTIST_RELATED':
      return {
        ...state,
        currentArtist: {
          ...state.currentArtist,
          related: action.related,
        },
      };
    case 'RECEIVED_ALL_ARTIST_INFO':
      return {
        ...state,
        status: 'idle',
      };
    case 'RECEIVE_ARTIST_INFO_ERROR':
      return {
        ...state,
        status: 'error',
      };
  
    default:
      return state;
  }
};




export default artistsReducer;



const initialState = {
  currentArtist: null,
  status: 'idle',
};


const artistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_ARTIST_PROFILE':
      return {
        ...state,
        status: 'loading',
      };
    case 'RECEIVE_ARTIST_PROFILE':
      return {
        ...state,
        status: 'idle',
        currentArtist: {
          profile: action.profile,
        },
      };
    case 'RECEIVE_ARTIST_PROFILE_ERROR':
      return {
        ...state,
        status: 'error',
      };
  
    default:
      return state;
  }
};




export default artistsReducer;
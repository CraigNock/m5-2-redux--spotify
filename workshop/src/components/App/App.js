import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import GlobalStyles from '../GlobalStyles';
import ArtistRoute from '../ArtistRoute';
import { 
  requestAccessToken, 
  receiveAccessToken, 
  receiveAccessTokenError 
} from '../../actions';

const DEFAULT_ARTIST_ID = '1kDGbuxWknIKx4FlgWxiSp';


const App = () => {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(requestAccessToken());
    console.log('start app');
    fetch('/spotify_access_token')
      .then(res => res.json())
      .then(res => {
        console.log('res ', res);
        dispatch(receiveAccessToken(res.access_token));
      })
      .catch((err) => {
        console.error('err ', err);
        dispatch(receiveAccessTokenError());
      });
  }, []);

  return (
  <>
    <Router>
    <GlobalStyles/>
      <Switch>
        <Route path='/artists/:artistId'>
          <ArtistRoute />
        </Route>
        <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`} />
      </Switch>
    </Router>
  </>
  );
};

export default App;

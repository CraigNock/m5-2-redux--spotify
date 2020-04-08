import React from "react";
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDispatch }from 'react-redux';
import PlayButton from 'react-play-button';

import { fetchArtistProfile, fetchArtistTracks } from '../../helpers/api-helpers';
import { 
  requestArtistInfo, 
  receiveArtistProfile,
  receiveArtistTracks,
  receivedAllArtistInfo,
  receiveArtistInfoError, 
} from '../../actions';

import {slimNumber} from '../utilities';
import FullScreenSpinner from '../FullScreenSpinner';

const ArtistRoute = () => {
  const { artistId } = useParams();
  const accessToken = useSelector((state) => state.auth.token);
  // console.log('param ', artistId, 'tokenn ', accessToken);
  const artist = useSelector((state) => state.artists.currentArtist);
  const status = useSelector((state) => state.artists.status);

  const dispatch = useDispatch();

  const [playing, setPlaying] = React.useState(null);

  React.useEffect(()=>{
    if(!accessToken)
      return;
    dispatch(requestArtistInfo());
    const profilePromise = fetchArtistProfile(accessToken, artistId)
      .then((res) => {
        console.log('profile ', res);
        dispatch(receiveArtistProfile(res));
      });
    const tracksPromise = fetchArtistTracks(accessToken, artistId)
    .then((res) => {
      console.log('tracks ',res);
      dispatch(receiveArtistTracks(res.tracks));
    });
    Promise.all([profilePromise, tracksPromise])
      .then(() => dispatch(receivedAllArtistInfo()))
      .then(console.log(artist))
      .catch((err) => {
        console.error(err);
        dispatch(receiveArtistInfoError(err));
      })
  }, [accessToken])

  
  const togglePlay = (input) => {
    setPlaying(input);
  };

// console.log(status, artist);

  return (artist && (status === 'idle'))?(
    <StyledDiv>
      <Header>
        <img src={artist.profile.images[0].url} alt='artist' />
        <h1>{artist.profile.name}</h1>
        <p><span>{slimNumber(artist.profile.followers.total)}</span> followers</p>
      </Header>
      <Tracks>
        <StyledSubTitle>top tracks</StyledSubTitle>
        {(artist.tracks).slice(0, 3).map((track) => (
          <div>
            <PlayButton
              key={track.id}
              url={track.preview_url}
              active={playing === track.id}
              play={()=> togglePlay(track.id)}
              stop={()=> togglePlay(null)}
              playIconColor={'#FFFFFF'}
              stopIconColor={'#FFFFFF'}
              idleBackgroundColor={'rgba(75, 75, 75, 0.4)'}
              progressCircleColor={'#3354FF'}
              progressCircleWidth={2}
            />
          </div>
          ))
        }
      </Tracks>
      <Tags>
        <StyledSubTitle>tags</StyledSubTitle>
        <p>
          <span>{artist.profile.genres[0]}</span>
          <span>{artist.profile.genres[1]}</span>
        </p>
      </Tags>
      <Related>
        <StyledSubTitle>related artists</StyledSubTitle>
      </Related>

    </StyledDiv>
  ) : <FullScreenSpinner/>
  
};

const StyledDiv = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-between; */
  background: #0B0F14;
  /* width: 100%; */
  width: 375px;
  height: 812px;
`;
const Header = styled.div`
  position: relative;
  text-align: center;
  width: 30rem;
  height:40%;
  margin: 2rem 0 0;
  img {
    width: 175px;
    height: 175px;
      border-radius: 50%;
    }
  h1{
    /* position: absolute; */
    z-index: 2;
    top: 15rem;
    margin-top: -4rem;
    color: whitesmoke;
    text-shadow: 4px 8px 25px #000000, 
    0px 4px 4px rgba(0, 0, 0, 0.5), 
    1px 2px 2px rgba(0, 0, 0, 0.75);

  }
  p{
    margin: 4rem 1rem 0;
    span{
      color: maroon;
      font-weight: bold;
    }
  }
`;
const StyledSubTitle = styled.p`
  text-align: center;
  font-size: 21px;
  font-weight: 600;
  margin-bottom: 1rem;
`;
const Tracks = styled.div`
  height:20%;
  div {
    display: inline;
    margin: 0 .5rem;
  }
`;
const Tags = styled.div`
  height:15%;
  text-align: center;
  p {
    /* margin: 2rem; */
  }
  span {
    font-size: .5rem;
    margin: .5rem;
    padding: .5rem;
    border: 1px solid gray;
    border-radius: 5px;
  }
`;
const Related = styled.div`
  height:25%;
`;

export default ArtistRoute;

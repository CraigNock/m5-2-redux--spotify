import React from "react";
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDispatch }from 'react-redux';

import { fetchArtistProfile } from '../../helpers/api-helpers';
import { 
  requestArtistProfile, 
  receiveArtistProfile, 
  receiveArtistProfileError 
} from '../../actions';

import {slimNumber} from '../utilities';

const ArtistRoute = () => {
  const { artistId } = useParams();
  const accessToken = useSelector((state) => state.auth.token);
  // console.log('param ', artistId, 'tokenn ', accessToken);
  const artist = useSelector((state) => state.artists.currentArtist);
  const dispatch = useDispatch();

  React.useEffect(()=>{
    if(!accessToken)
      return;
    dispatch(requestArtistProfile());
    fetchArtistProfile(accessToken, artistId)
      .then((res) => {
        console.log(res.name);
        dispatch(receiveArtistProfile(res));
      })
      .catch((err) => {
        console.error(err);
        dispatch(receiveArtistProfileError(err));
      })
  }, [accessToken])

  
  return artist?(
    <StyledDiv>
      <Header>
        <img src={artist.profile.images[0].url} alt='artist' />
        <h1>{artist.profile.name}</h1>
        <p><span>{slimNumber(artist.profile.followers.total)}</span> followers</p>
      </Header>
      <Tracks>
      
      </Tracks>
      <Tags>
        <p>tags</p>
        <p>
          <span>{artist.profile.genres[0]}</span>
          <span>{artist.profile.genres[1]}</span>
        </p>

      </Tags>
      <Related>

      </Related>

    </StyledDiv>
  ) : <div>loading</div>
  
};

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const Header = styled.div`
  position: relative;
  text-align: center;
  width: 30rem;
  margin: 2rem;
  img {
      height: 20rem;
      border-radius: 50%;
    }
  h1{
    position: absolute;
    top: 15rem;
    /* margin:0 auto; */
    color: whitesmoke;
  }
  p{
    margin: 1rem;
    span{
      color: maroon;
      font-weight: bold;
    }
  }
`;
const Tracks = styled.div`

`;
const Tags = styled.div`
  margin: 0 2rem 2rem;
  text-align: center;
  p {
    margin: 2rem;
  }
  span {
    margin: 2rem;
    padding: 1rem;
    border: 1px solid gray;
  }
`;
const Related = styled.div`

`;

export default ArtistRoute;

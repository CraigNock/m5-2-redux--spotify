import React from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

const FullScreenSpinner = () => {
  return ( 
    <StyledDiv>
      <Loader/>
    </StyledDiv>
  )
};

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background: #0B0F14;
  width: 375px;
  height: 812px;
`;

export default FullScreenSpinner;
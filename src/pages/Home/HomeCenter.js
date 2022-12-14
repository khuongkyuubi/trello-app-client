import React from 'react';
import styled from "styled-components";
import MediaCard from "./CardCenterHome";

const Container = styled.div`
  width: 34%;
  margin-top: 40px;
  margin-left:5px;
`
const WrapperMain = styled.div`
  width: 100%;
  height:auto;
  border-radius: 3px;
`


const HomeCenter = () => {
    return (
        <Container>
            <WrapperMain>
                <MediaCard/>
            </WrapperMain>
        </Container>
    );
};

export default HomeCenter;
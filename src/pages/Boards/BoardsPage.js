import React, {useEffect} from 'react';
import styled from "styled-components";
import Navbar from "../../components/Navbar";
import HomeLeft from "../Home/HomeLeft";
import MyBoards from "./MyBoards";
import LoadingScreen from "../../components/LoadingScreen";
import {useDispatch, useSelector} from "react-redux";
import BoardsWorkSpace from "./BoardsWorkSpace";
import {getBoards} from "../../services/boardsService";


const Container = styled.div`
  //margin-top: 1rem;
  width: 100%;
  //height: 100%;
  //display: flex;
  //flex-direction: column;
  position: absolute;
  top: 2.5rem;
  bottom: 0;
  overflow-y: auto;


`
const Nav = styled.div`
  //width: 100%;
  //position: sticky;
  //flex: 1
`

const Wrapper = styled.div`
  //flex: 6;
  display: flex;
  width: 100%;
`
const BoardsContent = styled.div`
  display: flex;
  width:70%;
  height: auto;
  margin-top: 35px;
  flex-direction: column;
`


const DivEmpty = styled.div`
  width: 10%;
`

const BoardsPage = () => {
    const {pending, boardsData} = useSelector((state) => state.boards);
    const dispatch = useDispatch();
    // useEffect(() => {
    //     getBoards(false, dispatch);
    // }, [dispatch]);
    return (
        <>
            {pending && <LoadingScreen/>}
            <Container>
                <Nav>
                    <Navbar/>
                </Nav>
                <Wrapper>
                    <DivEmpty/>
                    <HomeLeft/>
                    <BoardsContent>
                        <MyBoards/>
                        <BoardsWorkSpace/>
                    </BoardsContent>
                    <DivEmpty/>
                </Wrapper>
            </Container>
        </>
    );
};

export default BoardsPage;
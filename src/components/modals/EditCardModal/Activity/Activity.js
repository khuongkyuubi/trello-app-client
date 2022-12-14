import React, { useEffect, useRef, useState } from 'react';
import {
	Container,
	LeftContainer,
	RightContainer,
	Title,
	CommentWrapper,
	SaveButton,
	CommentArea,
	TitleWrapper,
} from './styled';
import MessageIcon from '@mui/icons-material/MessageOutlined';
import Comment from '../Comment/Comment';
import ActivityLog from '../ActivityLog/ActivityLog';
import Button from '../ReUsableComponents/Button';
import { useDispatch, useSelector } from 'react-redux';
import { comment } from '../../../../services/cardService';
import {Avatar, CircularProgress} from '@mui/material';
import {isMemberOfBoard} from "../../../../utils/checkMemberRoleOfBoard";
import io from "socket.io-client";
let socket;
const ENDPOINT = process.env.REACT_APP_SERVER_ENDPOINT;
const Activity = () => {
	const {userInfo}=useSelector(state=>state.user)
    const {members}=useSelector(state=>state.board)
    const isMember=isMemberOfBoard(userInfo._id,members)

	const dispatch = useDispatch();
	const ref = useRef();
	const card = useSelector((state) => state.card);
	const user = useSelector((state) => state.user);
	const [focusComment, setFocusComment] = useState(false);
	const [newComment, setNewComment] = useState('');
	const [details, setDetails] = useState(false);
	const [showSave, setShowSave] = useState(true);
	const board = useSelector((state) => state.board);
	useEffect(() => {
		socket = io(ENDPOINT);
		socket.emit("join", {rooms: userInfo.boards}, (error) => {
			if (error) {
				alert(error);
			}
		});

	}, []);
	const handleSaveClick = async () => {
		setShowSave(prev => !prev);
		await comment(card.cardId, card.listId, card.boardId, newComment, user.name, dispatch);
		setShowSave(prev => !prev);
		socket.emit("sendNotify", {sender: userInfo._id, room: card.boardId,  message:
				{
					user: user.userInfo.name,
					userColor: user.userInfo.color,
					action: `Comment`,
					card: card.title,
					board: board.title,
					date: Date.now()
				}})
		setNewComment('');
	};

	const handleClickOutside = (event) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setFocusComment(false);
		} else {
			setFocusComment(true);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	});
	return (
		<>
			<Container>
				<LeftContainer>
					<MessageIcon fontSize='small' />
					<Avatar
						sx={{
							width: 28,
							height: 28,
							bgcolor: user.userInfo.color,
							fontSize: '0.875rem',
							fontWeight: '800',
						}}
					>
						{user.userInfo.name[0].toUpperCase()}
					</Avatar>
				</LeftContainer>
				<RightContainer>
					<TitleWrapper>
						<Title>Activity</Title>
						<Button
							clickCallback={() => setDetails((prev) => !prev)}
							title={details ? 'Hide details' : 'Show details'}
						/>
					</TitleWrapper>
					<CommentWrapper ref={ref}>
						<SaveButton disabled={showSave ? !newComment : true} onClick={handleSaveClick} show={focusComment}>
							{!showSave ? <CircularProgress color="inherit" size={'1rem'}/> : 'Save'}
						</SaveButton>
						<CommentArea
							value={newComment}
							onChange={(e) =>{
								if(!isMember)return;
								setNewComment(e.target.value)
							}
						}
							focus={focusComment}
							placeholder='Write a comment...'
						/>
					</CommentWrapper>
				</RightContainer>
			</Container>
			{card.activities.map((activity) => {
				if (activity.isComment) {
					return <Comment key={activity._id} {...activity} />;
				}
				return undefined;
			})}

			{details && <ActivityLog />}
		</>
	);
};

export default Activity;

import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import DefaultProfileImg from '../images/default-profile-image.jpg';

const MessageItem = ({ date, profileImageUrl, text, username, removeMessage, isCorrectUser }) => (
	<div>
		<li className='list-group-item'>
			{/* use profile image if exists, else default image */}
			<img src={profileImageUrl || DefaultProfileImg} alt={username} height='100' width='100' className='timeline-image' />
			<div className='message-area' role="article">
				<Link to='/'>@{username} &nbsp;</Link>
				{/* status is not a great role here, but not sure what else to use for timestamp */}
				<span className='text-muted' role="status">
					<Moment className='text-muted' format='Do MMM YYYY'>
						{date}
					</Moment>
				</span>
				<p>
					{text}
				</p>
				{/* only show delete button if current user matches the message */}
				{isCorrectUser && (
					<a className='btn btn-danger' onClick={removeMessage}>
						Delete
					</a>
				)}
			</div>
		</li>
	</div>
);

export default MessageItem;
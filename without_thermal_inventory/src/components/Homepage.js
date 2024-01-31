import React from 'react';
import { Link } from 'react-router-dom';
import MessageTimeLine from './MessageTimeLine';

// landing page

const Homepage = ({ currentUser }) => {
	// if currentUser not authenticated,
	if (!currentUser.isAuthenticated) {
		// return this
		return (
			<div className='home-hero'>
				<h1>What's Happening?</h1>
				<h4>New to Mahalaksha?</h4>
				{/* <Link to='/signup' className='btn btn-primary'>
					Sign Up Here
				</Link> */}
			</div>
		);
	} else {
		return (
			<div>
				<MessageTimeLine
					profileImageUrl={currentUser.user.profileImageUrl}
					username={currentUser.user.username}
				/>
			</div>
		);
	}
};

export default Homepage;
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessages, removeMessage } from '../store/actions/messages';
import MessageItem from '../components/MessageItem';


class MessageList extends Component {
	// when component mounts, fetch messages
	componentDidMount() {
		this.props.fetchMessages();		// this is where messages are retrieved!
	}
	render() {
		// destructure anything mapped to props which needs accessed in render()!
		const { messages, removeMessage, currentUser } = this.props;
		// map over messages and return a MessageItem for each message
		let messageList = messages.map(m => (
			// id comes from mongoDB
			<MessageItem
				key={m._id}
				date={m.createdAt}
				text={m.text}
				username={m.user.username}
				profileImageUrl={m.user.profileImageUrl}
				// bind each message's user id and message id to each message's removeMessage()
				removeMessage={removeMessage.bind(this, m.user._id, m._id)}		// removeMessage gets a message and user id -- we supply those here, per message!!
				// used to match messages to current user (hides/shows 'delete' button where applicable)
				isCorrectUser={currentUser===m.user._id}
			/>
		))
		return (
			// make sure to wrap in a div--can't directly return an object!
			<div className='row col-sm-8'>
				<div className='offset-1 col-sm-10'>
					<ul className='list-group' id='messages'>
						{messageList}
					</ul>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		messages: state.messages,
		currentUser: state.currentUser.user.id		// we only need the current user's id, to check against the user id of each message
	};
}

export default connect(mapStateToProps, { fetchMessages, removeMessage })(MessageList);
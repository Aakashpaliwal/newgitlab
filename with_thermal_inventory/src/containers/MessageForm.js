import React, {Component} from 'react';
import {connect} from 'react-redux';		// connect() is the 'glue' between react and redux
import {postNewMessage} from '../store/actions/messages';

class MessageForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: ''	// controlled input must start with some default state
		};
	}
	
	// gets event object and handles a submitted message
	handleNewMessage = event => {
		event.preventDefault();
		// post a new message by sending the message in state
		this.props.postNewMessage(this.state.message);
		// new state of message should be an empty string, once message posts
		this.setState({message: ''});
		// redirect to index
		this.props.history.push('/');
	};
	
	render() {
		return(
			<form onSubmit={this.handleNewMessage}>
				{/* if there is any error, display the error message */}
				{this.props.errors.message && (
					<div className='alert alert-danger' role="alert">{this.props.errors.message}</div>
				)}
				<input
					type='text'
					className='form-control'
					value={this.state.message}
					// control component state (simple onChange handler since it's only for one component) 
					// (if there were more than one input, there would be a generalized onChange function)
					onChange={e=>this.setState({message:e.target.value})}
			/>
				<button
					type='submit'
					className='btn btn-success pull-right'
				>
					Add My Message
				</button>
			</form>
		);
	}
}

function mapStateToProps(state) {
	return {
		errors: state.errors
	};
}

export default connect(mapStateToProps, {postNewMessage})(MessageForm);
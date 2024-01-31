import React, { Component } from 'react';

class AuthForm extends Component {
	constructor(props) {
		super(props);
		// React state
		this.state = {
			email: '',
			username: '',
			password: '',
			profileImageUrl: ''
		};
	}

	// by using arrow functions, we retain value of 'this', and don't need to bind 'this' in the constructor
	handleChange = (e) => {
		this.setState({
			// get computed property name and set its matching value
			// (works only if the name matches what's in state! but is a nice way to generalize form changes on different types of inputs)
			[e.target.name]: e.target.value
		});
	}

	handleSubmit = (e) => {
		// prevent page refresh
		e.preventDefault();
		const authType = this.props.signUp ? 'signup' : 'signin';
		this.props.onAuth(authType, this.state).then(() => {
			console.log('logged in!');
			// redirect to home page once logged in
			this.props.history.push('/Comingsoon');
		})
		.catch(()=> {
			return;
		});
	}


	render() {
		// pull values out of state
		const { email, username, password, profileImageUrl } = this.state;
		// get props passed in from Main.js
		// ('history' comes from react-router)
		const { heading, buttonText, signUp, errors, history, removeError } = this.props;
		// listen for a change in route; if change occurs, invoke removeError()
		history.listen(()=>{
			removeError();
		});
		return (
			<div>
				{/* role is for accessibility */}
				<div className="row justify-content-md-center text-center" role="main">
					<div className="col-md-6" role="form">
						<form onSubmit={this.handleSubmit}>
							<h2>{heading}</h2>
							{/* if there are errors, display them */}
							{errors.message && (
								<div className='alert alert-danger' role="alert">{errors.message}</div>
							)}
							<label htmlFor="email">Email:</label>
							<input
								type="text"
								className='form-control'
								id='email'
								name='email'
								onChange={this.handleChange}
								value={email}
							/>
							<label htmlFor="password">Password:</label>
							<input
								type="password"
								className='form-control'
								id='password'
								name='password'
								onChange={this.handleChange}
								value={password}
							/>
							{/* conditionally display inputs to provide a username and profile image URL */}
							{signUp && (
								<div>
									<label htmlFor="username">Username:</label>
									<input
										type="text"
										className='form-control'
										id='username'
										name='username'
										onChange={this.handleChange}
										value={username}
									/>
									<label htmlFor="image-url">Image URL:</label>
									<input
										type="image-url"
										className='form-control'
										id='image-url'
										name='profileImageUrl'
										onChange={this.handleChange}
										value={profileImageUrl}
									/>
								</div>
							)}
							<button className='btn btn-primary btn-block btn-lg' type='submit'>
								{buttonText}
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default AuthForm;
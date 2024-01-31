import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';		// used to pass props, specify current route, and redirect when needed
import { connect } from 'react-redux';
import AuthForm from '../components/AuthForm';
import Login from '../components/Login/Login'
import { authUser } from '../store/actions/auth';
import { removeError } from '../store/actions/errors';
	// used to clear errors when route changes
import MainRoute from './Routes/MainRoutes'


const Main = props => {
	// get authUser from props given to main
	// currentUser from redux state
	const { authUser, errors, removeError, currentUser } = props;
	return (
		<div className='container-fluid'>
			<Switch>
				{/* Route '/' renders a function which renders the Homepage component, and gives it any props passed to Main via React Router */}
				{/* <Route exact path='/' render={props => <Homepage currentUser={currentUser} {...props} />} /> */}
				<Route exact path='/signin' render={props => {
					return (
						// AuthForm reused for both loggin in and signing up to prevent duplication;
						// buttonText and heading differ depending on what should be rendered
						<Login
							errors={errors}
							removeError={removeError}
							onAuth={authUser}
							buttonText='Log In'
							heading='Login'
							{...props} />
					);
				}} />
				<Route exact path='/signup' render={props => {
					return (
						// signUp is passed through just to be truthy
						<AuthForm
							errors={errors}
							removeError={removeError}
							onAuth={authUser}
							buttonText='Sign Me Up'
							heading='Join Today'
							{...props} signUp />
					);
				}} />
				{/* rendered only for logged-in users */}
				<MainRoute />
			</Switch>
		</div>
	);
};

// Any properties in the returned object can be accessed as props in Main.js
function mapStateToProps(state) {
	return {
		// information about current user is used to decide what view to render in Homepage component
		currentUser: state.currentUser,
		errors: state.errors			// get any errors from state
	};
}

// withRouter allows us to get props from router to component (to use history object to redirect)
// authUser, removeError passed as mapDispatchToProps (so they are available to Main.js within props!)
export default withRouter(connect(mapStateToProps, { authUser, removeError })(Main));

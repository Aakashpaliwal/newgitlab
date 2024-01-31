import React, { Component } from 'react';
import { connect } from 'react-redux';

// accepts a component to render,
// redirects to signin page if user IS NOT authenticated,
// and returns the component to render if user IS authenticated
export default function withAuth(ComponentToRender) {
	class Authenticate extends Component {
		componentWillMount() {
			// if user is not authenticated,
			if (!this.props.isAuthenticated) {
				// redirect to signin (since we are using react-router, we have access to history object)
				this.props.history.push('/signin');
			}
		}
		// in event component updates, for any kind of state change,
		// see if user is still authenticated before adding new props
		componentWillUpdate(nextProps) {
			if (!this.props.isAuthenticated) {
				// redirect to signin (since we are using react-router, we have access to history object)
				this.props.history.push('/signin');
			}
		}
		render() {
			return <ComponentToRender {...this.props} />;
		}
	}

	function mapStateToProps(state) {
		return {
			// used to see if user has logged in or not
			isAuthenticated: state.currentUser.isAuthenticated
		};
	}

	return connect(mapStateToProps)(Authenticate);
}
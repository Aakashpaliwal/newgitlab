import axios from 'axios';
import {API_URL} from '../url/url'
// sends user's token with each request so server can check login status
export function setTokenHeader(jwt) {
	// if token supplied, attach token to all future requests
	// console.log(token);
	if(jwt) {
		axios.defaults.headers.common['x-auth-token'] = `${jwt}`;
	} else {
		// but if function invoked with no token (i.e. logout), remove the token from requests
		delete axios.defaults.headers.common['x-auth-token'];
	}
}

/**
 * A wrapper around axios API call that formats errors, etc
 * @param {*} method HTTP verb to use
 * @param {*} path route path/endpoint
 * @param {*} data (optional) data in JSON format for POST requests
 */
export function apiCall(method, path, data=false) {
	return new Promise((resolve, reject) => {
		// [method] is a computed value, so can't use dot syntax
		// axios[method] returns a function, to which we pass path and data
		// (e.g. axios.get() or axios.post())
		// (we set the method toLowerCase so it matches the axios property!)
		const pat = `${API_URL}`
		// const pat = 'http://localhost:4200/'
		path = pat + path;
		console.log(data)
		return axios[method.toLowerCase()](path, data)
			.then(res => {
				// whenever we get results from axios, it comes back in a certain format:
				// an object 'response' with a sub-object 'data'
				// console.log('hello',res);
				// console.log(res.headers['x-auth-token'])
				
				// console.log(res.headers.x-auth-token)
				// this.token = res.headers.x-auth-token
				return resolve(res);

			}).catch(err => {
				console.log("error",err.response.data.errors)
				if(err.response.status == 422) {
					alert('failure - ' + err.response.data.errors[0].message)
         			//  window.location.reload(false)
				}
				// inside of response.data is a sub-object 'error'
				// return reject(err.response);
				
			});
	});
}
import axios from 'axios';

export const FETCH_MEMO = (method, url) => {
	console.log('FETCH_MEMO');

	return axios({
		method,
		url
	})
}
export const CREATE_MEMO = (method, url, data) => {
	return axios({
		method,
		url,
		data
	})
}
export const DELETE_MEMO = (method, url) => {
	return axios({
		method,
		url,
	})
}
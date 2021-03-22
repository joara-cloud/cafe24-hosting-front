import axios from 'axios';

export const FETCH_MEMO = (method, url) => {
	return axios({method, url});
}
export const FETCH_MEMO_S = (method, url) => {
	return axios({method,url})
}
export const FETCH_MEMO_DETAIL = (method, url, data) => {
	return axios({method, url, data});
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
export const updateMemoTitle = (method, url, data) => {
	return axios({method, url, data});
}
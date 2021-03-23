import axios from 'axios';

export const fetchMemo = (method, url) => {
	return axios({method, url});
}
export const fetchSelectedMemo = (method, url, data) => {
	return axios({method, url, data});
}
export const CREATE_MEMO = (method, url, data) => {
	return axios({method, url, data})
}
export const DELETE_MEMO = (method, url) => {
	return axios({method, url})
}
export const updateMemo = (method, url, data) => {
	return axios({method, url, data});
}
export const createMemo = (method, url, data) => {
	return axios({method, url, data});
}
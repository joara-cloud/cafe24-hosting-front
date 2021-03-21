import axios from 'axios';

export const FETCH_POSTS = (method, url, data) => { // 게시물 출력
	return axios({
		method,
		url,
		data
	})
}

export const FETCH_POST = (method, url) => { // 특정 게시물 출력
	console.log('특정 게시물');
	return axios({
		method,
		url
	})
}

export const DELETE_POST = (method, url, data) => { // 게시물 삭제
	return axios({
		method,
		url,
		data
	})
}
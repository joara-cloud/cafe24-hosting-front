import {fetchMemo, fetchSelectedMemo, updateMemo, createMemo} from '@/api/memo.js';
import {post} from '@/api/posts.js';

const actions = {
	async FETCH_MEMO({commit}, id) { // id 가 {id: id} 객체형식으로 넘어옴

		// 특정 데이터
		if(id) {
			const {data} = await fetchSelectedMemo('post', '/memo/fetch', id);
			commit('SET_MEMO',data.rows[0]);
		}

		// 전체 데이터
		const {data} = await fetchMemo('post', '/memo/fetch'); // API
		commit('SET_MEMOS',data.rows);

	},

	async UPDATE_MEMO({dispatch}, data) { // data에 id값은 필수!!!!
		await updateMemo('PUT', '/memo/update', data);
		dispatch('FETCH_MEMO', {id: data.id});
	},

	async CREATE_MEMO({dispatch}, data) {
		await createMemo('POST', '/memo/create', data).then( () => {
			dispatch('FETCH_MEMO', data.id);
		})
	},

	async DELETE_MEMO({dispatch}, data) { // data: {id: id} 형태로 넘어옴
		await createMemo('DELETE', `/memo/delete/${data.id}`).then( () => {
			dispatch('FETCH_MEMO');
		})
	},

	async FETCH_POST({commit}, data) { // data: {id: id} 형태로 넘어옴
	if(data) {
		await post.fetch('GET', `/posts/${data.id}`).then( ({data}) => {
			commit('SET_CURRENTBOARD', data.post[0]);
		})
	}else {
		console.log('그냥 fetch함');
		await post.fetch('GET', `/posts/list`).then( (response) => {
			console.log(response);
			// dispatch('FETCH_MEMO');
		})
	}
},
}

export default actions;
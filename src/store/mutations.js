const mutations = {
	SET_MEMO(state, memo) { // 전제 데이터
		state.currentMemo = memo;
	},
	SET_MEMOS(state, memos) { // 특정 데이터
		state.memos = memos;
	}
}

export default mutations;
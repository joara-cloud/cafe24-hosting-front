const mutations = {
	SET_MEMO(state, memo) { // 전제 데이터
		state.currentMemo = memo;
	},
	SET_MEMOS(state, memos) { // 특정 데이터
		state.memos = memos;
	},
	SET_CURRENTBOARD(state, board) { // 특정 게시물
		state.currentBoard = board;
	}
}

export default mutations;
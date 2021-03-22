import Vue from 'vue'
import Vuex from 'vuex'
import {FETCH_MEMO_DETAIL, updateMemoTitle} from '@/api/memo.js';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    memo: {},
    memos: {}
  },
  actions: {
    async FETCH_MEMO({commit, dispatch}, id) {
      console.log(id);
      const {data} = await FETCH_MEMO_DETAIL('post', '/memo/fetch', id);

      // console.log(id ? data.rows[0] : data.rows);
      
      if(id) {
        commit('SET_MEMO',data.rows[0]);
        console.log(data.rows[0]);
      }else {
        commit('SET_MEMOS',data.rows);
        console.log(data.rows);
      }

      dispatch('FETCH_MEMO_S');

    },
    async FETCH_MEMO_S({commit}) {
      const {data} = await FETCH_MEMO_DETAIL('post', '/memo/fetch');

      console.log('FETCH_MEMO_S: ', data.rows);
      
      commit('SET_MEMOS', data.rows);

    },
    async UPDATE_MEMO_TITLE({dispatch}, data) {
      await updateMemoTitle('PUT', '/memo/update', data);

      dispatch('FETCH_MEMO', {id: data.id});

    }
  },
  mutations: {
    SET_MEMO(state, memo) {
      console.log('memo: ',memo);

      state.memo = memo;
    },
    SET_MEMOS(state, memos) {
      console.log('set_memos: ',memos);
      state.memos = memos;
    }
  }
})

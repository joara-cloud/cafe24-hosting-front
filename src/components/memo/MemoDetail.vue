<template>
  <Modal>
	  <div slot="header">
			<!-- 메모 상세보기 -->
			<button type="button" v-on:click="onClose">&times;</button>
		</div>
		<div slot="body">
			<div class="title">
				<input type="text" :readonly="titleReadonly" :value="memo.subject" @blur="titleFunc" @keydown.enter="titleFunc" ref="inputTitle" @click="titleReadonly=false">
			</div>
			<div class="content">
				<textarea name="" id="" cols="30" rows="10" placeholder="내용을 입력해주세요." :readonly="contentReadonly" :value="memo.content" @blur="contentReadonly=true" @click="contentFunc()"></textarea>
			</div>
		</div>
		<div slot="footer"></div>
  </Modal>
</template>

<script>
import Modal from '@/components/common/Modal.vue';
import {mapState, mapActions} from 'vuex';

export default {
	data() {
		return {
			titleReadonly: true,
			contentReadonly: true,
		}
	},
	created() {
		this.fetchMemoDetail();
	},
	computed: {
		...mapState([
			'memo',
			'memos'
		])
	},
  components: {
    Modal
  },
	methods: {
		onClose() {
			this.$router.push('/memo');
		},
		...mapActions([
			'FETCH_MEMO',
			'UPDATE_MEMO_TITLE'
		]),
		fetchMemoDetail() {

			const id = this.$route.params.id;
			this.FETCH_MEMO({id});

		},
		titleFunc() {
			this.titleReadonly = true;

			const title = this.$refs.inputTitle.value.trim();
			if(!title) return;

			this.UPDATE_MEMO_TITLE({id: this.memo.idx, title})
		},
		contentFunc() {
			this.titleReadonly=true;
			this.contentReadonly=false;
			
		},
		onSubmit() {
		}

	}

}
</script>

<style>
.modal-container {background-color:#f5f5f5}
.modal-body {}
.modal-body .title input:read-only {border-color:transparent;background-color:#f5f5f5;cursor:pointer;outline:none}
.modal-body .content {margin:10px 0 0;padding:10px 0 0;border-top:1px solid #ccc}
.modal-body .content textarea {margin:0}
.modal-body .content textarea:read-only {border-color:transparent;background-color:#f5f5f5;cursor:pointer;outline:none}
</style>
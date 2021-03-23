<template>
	<card-popup>
		<div slot="header">
			메모 생성
			<button type="button" v-on:click="$emit('close')">&times;</button>
		</div>
		<div slot="body">
			<input type="text" placeholder="제목을 입력해주세요." v-model="subject">
			<textarea name="" id="" cols="30" rows="10" placeholder="내용을 입력해주세요." v-model="content"></textarea>
		</div>
		<div slot="footer" class="text-right">
			<button class="modal-default-button" v-on:click="[$emit('close'), submitMemoList()]">저장</button>
		</div>
	</card-popup>
</template>

<script>
// import {CREATE_MEMO} from '@/api/memo.js';
import CardPopup from '@/components/memo/CardPopup.vue';
import Bus from '@/utils/bus.js'
import {mapState, mapActions} from 'vuex'

export default {
	computed: {
		...mapState(['memos'])
	},
	components: {
		CardPopup
	},
	data() {
		return {
			// showModal: false,
			subject: '',
			content: ''
		}
	},
	methods: {
		...mapActions(['CREATE_MEMO']),
		submitMemoList() {

			const pos = this.memos[this.memos.length-1].pos * 2;
			this.CREATE_MEMO({subject: this.subject, content: this.content, pos}).then(function(response) {
				console.log('성공!', response);
				Bus.$emit('onFetch');
				Bus.$emit('onStep', 2);
			})

		}
	}

}
</script>

<style>

</style>
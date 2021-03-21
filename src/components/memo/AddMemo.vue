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
import {CREATE_MEMO} from '@/api/memo.js';
import CardPopup from '@/components/memo/CardPopup.vue';
import Bus from '@/utils/bus.js'

export default {
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
		submitMemoList() {
			// API (insert)
			const data = {
				subject: this.subject,
				content: this.content,
				pos: 65335
			}
			CREATE_MEMO('post', '/memo/create', data).then(function(response) {
				console.log('성공!', response);
				Bus.$emit('onFetch');
				Bus.$emit('onStep', 2);
			})
			.catch(function(err) {
				console.log('메모 추가 중 에러 : ', err);
			})
		}
	}

}
</script>

<style>

</style>
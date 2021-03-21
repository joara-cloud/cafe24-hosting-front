<template>
  <Modal>
	  <div slot="header">
			메모 상세보기
			<button type="button" v-on:click="$emit('close')">&times;</button>
		</div>
		<div slot="body">
			<input type="text" v-model="subject" readonly>
			<textarea name="" id="" cols="30" rows="10" placeholder="내용을 입력해주세요." v-model="content"></textarea>
		</div>
  </Modal>
</template>

<script>
import Modal from '@/components/common/Modal.vue';

export default {
  components: {
    Modal
  }

}
</script>

<style>

</style>
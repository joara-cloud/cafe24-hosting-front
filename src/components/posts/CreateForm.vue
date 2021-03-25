<template>
	<form action="" class="form_ty01" @submit.prevent="submitForm">
		<div class="row">
			<label for="">제목</label>
			<input type="text" v-model="subject" ref="subjectInput">
		</div>
		<div class="row">
			<label for="">내용</label>
			<textarea name="" id="" cols="30" rows="10" v-model="content" ref="contentInput"></textarea>
		</div>
		<div class="row">
			<label for="">파일첨부(선택)</label>
			<input type="file" @change="uploadFile" ref="uploadImageFile">
		</div>
		<img :src="image" alt="">
		<button type="submit" class="btn_ty01">확인</button>
	</form>
</template>

<script>
import bus from '@/utils/bus.js';

export default {
	data() {
		return {
			subject: '',
			content: '',
			image: '',
			uploadImageFile: '' 
		}
	},
	methods: {
		async submitForm() {
			console.log('submitform 요청함');

			if(!this.subject) {
				// bus.$emit('show:toast', '제목을 입력해주세요.');
				alert('제목을 입력해주세요.');
				this.$refs.subjectInput.focus();
				return;
			}
			if(!this.content) {
				// bus.$emit('show:toast', '내용을 입력해주세요.');
				alert('내용을 입력해주세요.');
				this.$refs.contentInput.focus();
				return;
			}

			try {

				// upload file
				const formData = new FormData(); // formdata에 추가했을 경우 백엔드에서 받을때, 파일 형식만 자동으로 req.file로 분류되고 나머지는 req.body에 저장
				formData.append('uploadImage', this.uploadImageFile); // 지정해준 key값으로 node.js에서 upload.single('upLoadImage') 이런식으로 받게 됨
				formData.append('subject', this.subject);
				formData.append('content', this.content);

				console.log(formData);
				
				for (let key of formData.entries()){ 
					console.log(key[0] + ' '+key[1]) 
					}

				var response = await this.$http.post('/posts/create',formData, {
					headers: {
						'Content-Type': 'application/json'
					}
				});
				bus.$emit('show:toast', response.data.msg)
				// this.$router.push('/posts/list');
				this.$router.push('/posts/list?listNum=8&page=1');
				// window.location.href='/posts/list?listNum=8&page=1';
			} catch(errer) {
				console.log('submitform method error : ' + errer);
			}


		},
		onFileChange(event) {
			// var files = event.target.files || event.dataTransfer.files;  event.dataTransfer.files가 뭔지 모르겠음
			var files = event.target.files; // return FileList
			console.log(files);
			if(!files.length)
				return;

			this.createImage(files[0]);
		},
		createImage(file) {
			var reader = new FileReader();
			var vm = this;

			reader.onload = (e) => { // FileReader에서 전달 받은 파일을 읽기 성공하면 load EventListener에 등록한 function이 호출된다.
				vm.image = e.target.result;
			}
			reader.readAsDataURL(file); // 파일 전달 방식 4가지 중 하나
			// reader.readAsText(file); 
		},
		uploadFile() {
			this.uploadImageFile = this.$refs.uploadImageFile.files[0];
		}
	}
}
</script>

<style>

</style>
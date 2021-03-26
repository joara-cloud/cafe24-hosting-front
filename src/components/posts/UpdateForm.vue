<template>
	<form action="" class="form_ty01" @submit.prevent="submitForm">
		<div class="row">
			<label for="">제목 *</label>
			<input type="text" :value="currentBoard.subject" ref="subjectInput">
		</div>
		<div class="row">
			<label for="">내용 *</label>
			<textarea name="" id="" cols="30" rows="10" :value="currentBoard.content" ref="contentInput"></textarea>
		</div>
		<div class="row">

			<div id="filebox" class="filebox">
				<label for="">파일첨부(최대 1장)</label>
				<input class="upload_name" value="" disabled="disabled">
				<input type="file" id="ex_filename" class="upload-hidden" name="upload_file" @change="uploadFile" ref="uploadImageFileEl">
				<label for="ex_filename" class="btn_upload" @click="validateImage">Add</label>
			</div>

			<ul class="file_list">
				<!-- <li v-if="currentBoard.f_name">
					<p>{{currentBoard.f_name}}</p>
					<button type="button" class="remove" @click="test">&times;</button>
				</li> -->
				<transition name="slide-fade">
					<li v-if="currentBoard.f_name">
						<p>{{currentBoard.f_name}}</p>
						<button type="button" class="remove" @click="deleteFile">&times;</button>
					</li>
				</transition>
				<!-- <transition name="slide-fade">
					<p v-if="currentBoard.f_name">hello</p>
				</transition> -->
			</ul>
			
		</div>
		
		<div class="text-center btns">
			<button type="submit" class="btn_ty01">확인</button>
			<router-link :to="`/posts/list?listNum=8&page=1`" class="btn_ty01 white right">취소</router-link>
		</div>
	</form>
</template>

<script>
import {mapState} from 'vuex'
import bus from '@/utils/bus.js';

export default {
	data() {
		return {
			image: '',
			uploadImageFileData: '',
			deleteImage: false
		}
	},
	mounted() {
		// 파일
		var fileTarget = document.querySelector('.filebox .upload-hidden');
		fileTarget.addEventListener('change', () => {
			const filename = fileTarget.files[0].name;
			// document.querySelector('.file_list').innerHTML = `<li><p>${filename}</p><button type="button" class="remove">&times;</button></li>`
			this.currentBoard.f_name = filename;
		});
	},
	computed: {
		...mapState(['currentBoard'])
	},
	methods: {
		validateImage(e) {
			if(this.currentBoard.f_name) {
				alert('이미지는 최대 1장까지만 등록 가능합니다.');
				console.log(e);
				e.preventDefault();
				return;
			}
		},
		deleteFile() {
			this.currentBoard.f_name = '';
			this.deleteImage = true; // true: 삭제됨, false: no 삭제
		},
		async submitForm() {
			console.log('submitform 요청함');

			try {

				// upload file
				const formData = new FormData(); // formdata에 추가했을 경우 백엔드에서 받을때, 파일 형식만 자동으로 req.file로 분류되고 나머지는 req.body에 저장
				formData.append('uploadImage', this.uploadImageFileData); // 지정해준 key값으로 node.js에서 upload.single('upLoadImage') 이런식으로 받게 됨
				formData.append('deleteImage', this.deleteImage); // 이미지(첨부파일)를 삭제 유무
				formData.append('subject', this.$refs.subjectInput.value);
				formData.append('content', this.$refs.contentInput.value);
				formData.append('id', this.currentBoard.pid);

				// console.log(formData);
				
				// for (let key of formData.entries()){ 
				// 	console.log(key[0] + ' '+key[1]) 
				// 	}

				var response = await this.$http.put('/posts/update',formData, {
					headers: {
						'Content-Type': 'application/json'
					}
				});

				bus.$emit('show:toast', response.data.msg)
				this.$router.push('/posts/list?listNum=8&page=1');



				// this.$router.push('/posts/list');
				// window.location.href='/posts/list?listNum=8&page=1';
			} catch(errer) {
				console.log('submitform method error : ' + errer);
			}


		},
		onFileChange(event) {
			// var files = event.target.files || event.dataTransfer.files;  event.dataTransfer.files가 뭔지 모르겠음
			var files = event.target.files; // return FileList
			console.log(files);
			if(!files.length) return;

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
			this.uploadImageFileData = this.$refs.uploadImageFileEl.files[0];
		}
	}
}
</script>

<style>
#filebox {display:flex;margin-top:-10px;align-items:center; padding: 0 3px;}
#filebox input[type="file"] {overflow:hidden;width:0;height:0;margin:-1px;padding:0;border:0}
#filebox label {margin:0}
#filebox .btn_upload {display:inline-block;width:140px;margin-left:10px;border:1px solid #00a999;border-color:#00a999;color:#00a999;line-height:38px;text-align:center;vertical-align:middle;background-color:#fff;cursor:pointer}
#filebox .upload_name {padding:8px 12px;flex:1;border:0;background:none;-webkit-appearance:none;-moz-appearance:none;appearance:none}
@media screen and (max-width:991px) {
	#filebox .btn_upload {width:90px}
}

.file_list {margin:10px 0 0}
.file_list > li {margin:5px 0 0;padding:5px 10px;border-radius:5px;font-size:0;background-color:#f5f5f5;}
.file_list > li:first-child {margin:0}
.file_list > li > p {display:inline-block;width:calc(100% - 40px);padding:8px 0;font-size:12px;vertical-align:top;}
.file_list .remove {width:30px;height:30px;border:1px solid #ddd;border-radius:50%;line-height:30px;text-align:center;color:#aaa}

/* transition */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
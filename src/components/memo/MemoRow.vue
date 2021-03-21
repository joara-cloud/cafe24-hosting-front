<template>
	<div class="memo_list_wrap">
		<div class="memo_section">
			<h3>Doing</h3>
			{{memoPosts}}
			<ul id="memoList" class="memo_list">
				<!-- <li>
					<input type="text" value="1메모내용입니다." readonly>
					<div class="icon">
						<svg height="10" viewBox="0 0 16 10" width="16" xmlns="http://www.w3.org/2000/svg"> 
							<path d="m1 0h14c.5522847 0 1 .44771525 1 1s-.4477153 1-1 1h-14c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1zm0 4h14c.5522847 0 1 .44771525 1 1s-.4477153 1-1 1h-14c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1zm0 4h8c.55228475 0 1 .44771525 1 1s-.44771525 1-1 1h-8c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1z" fill="#30364c" fill-rule="evenodd" opacity=".3"></path>
						</svg>
					</div>
					<button type="button" class="memo_delete">&times;</button>
				</li> -->
				<li class="list_item" v-for="row in rowData" v-bind:key="row.idx">
					<router-link :to="`/memo/detail/${fdf}`">
						<div :data-idx="row.idx" :data-pos="row.pos">
							<input type="text" :value="row.subject" readonly>
							<button type="button" class="memo_delete" @click="deleteList(row.idx)">&times;</button>
						</div>
					</router-link>										
				</li>
				<li class="add_list">
					<a href="" v-on:click.prevent="$emit('dhow')">+ Add list</a>
				</li>
			</ul>
		</div>

		<!-- <router-link to="/card/1" id="addCard" class="memo_section" v-on:click.prevent="$emit('dhow')">+ Add Card</router-link> -->
		<a href="" id="addCard" class="memo_section">+ Add Card</a>
		<Dim v-if="isLoading"></Dim>
	</div>
</template>

<script>
import dragula from 'dragula';
import 'dragula/dist/dragula.css';
import Dim from '@/components/common/Dim.vue'
import Bus from '@/utils/bus.js'
import {FETCH_MEMO, DELETE_MEMO} from '@/api/memo.js';

export default {
	data() {
		return {
			dragulaCard: '',
			rowData: [],
			isLoading: true,
		}
	},
	components: {
		Dim
	},
	created() {
		this.fetchList();
		Bus.$on('onFetch', this.fetchList);
		
	},
	mounted() {
		const vm = this;

		this.dragulaCard = dragula([
			// ...Array.from(this.$el.querySelectorAll('#memoList')) // 유사배열이라 Array.from처리해줌 (배열로 넣기위해)
			document.getElementById('memoList')
		]).on('drop', (el) => { // el, wrapper, target, siblings

			const targetList = {
				idx: el.firstElementChild.dataset.idx*1,
				pos: el.firstElementChild.dataset.pos*1
			};

			// 순서 비교는 배열의 index값으로 할꺼임
			Array.from(document.querySelectorAll('#memoList .list_item')).forEach((el, idx, arr) => { // 배열의 index로 target의 위치 확인
				const cardId = el.firstElementChild.dataset.idx;
				let prevList = null;
				let nextList = null;
				if(cardId == targetList.idx) {
					prevList = idx > 0 ? {
						idx: arr[idx-1].firstElementChild.dataset.idx*1,
						pos: arr[idx-1].firstElementChild.dataset.pos*1
					} : null;
					nextList = idx < arr.length-1 ? {
						idx: arr[idx+1].firstElementChild.dataset.idx*1,
						pos: arr[idx+1].firstElementChild.dataset.pos*1
					} : null;

					// if(!prevList && nextList) targetList.pos = nextList.pos / 2; // 첫 번째 자리
					// else if(!nextList && prevList) targetList.pos = prevList.pos * 2; //마지막 자리
					// else targetList.pos = (nextList.pos + prevList.pos) / 2; //중간 자리

					console.log('prevList : ', prevList);
					console.log('nextList : ', nextList);

					if(!prevList && nextList) {
						targetList.pos = nextList.pos / 2; // 첫 번째 자리
						console.log('첫 번째 자리');
					}
					else if(!nextList && prevList) {
						targetList.pos = prevList.pos * 2; //마지막 자리
						console.log('마지막 자리');
					}
					else {
						targetList.pos = (nextList.pos + prevList.pos) / 2; //중간 자리
						console.log('중간 자리');
						this.testNum = 3;
					}

					vm.$http({
						method: 'PUT',
						url: '/memo/update',
						data: {
							pos: targetList.pos,
							idx: targetList.idx
						}
					}).then(async () => {
						const {data} = await FETCH_MEMO('post', '/memo/fetch');
						this.rowData = data.rows;
						Bus.$emit('onStep', 1);
					})
				}

			})
		})
		// dragula([document.getElementById(container)]);
	},
	methods: {
		async fetchList() {
			try {
				const {data} = await FETCH_MEMO('post', '/memo/fetch');
				this.rowData = data.rows;
				this.isLoading = false;

				console.log('[created] fetch memo : ',this.rowData);
			}catch(err) {
				console.log(err);
			}
		},
		deleteList(id) {
			console.log(id);

			if(!window.confirm('해당 리스트를 삭제하시겠습니까?')) return;

			try {
				DELETE_MEMO('delete', `/memo/delete/${id}`).then(() => {
					this.fetchList();
					Bus.$emit('onStep', 3);

				})

			}catch(err) {
				console.log('', err);
			}
		}
	}


}
</script>

<style>
.memo_list_wrap {display:flex;padding:0 50px;align-items:flex-start}
.memo_list > li {position:relative;margin-top:8px;padding:12px 10px;border-radius:4px;font-size:14px;background-color:#fff}
.memo_list > li:first-child {margin-top:0}
.memo_list > li input {border:0;outline:none;cursor:pointer}
.memo_list .add_list {background-color:#a5c1de;}
.memo_list .add_list a {display:block}
.memo_list .memo_delete {position:absolute;right:5px;top:9px;width:24px;font-size:24px;line-height:1;background:none}
.memo_list .icon {margin:5px 0 0}
.memo_section {width:250px;margin-left:20px;padding:15px;border-radius:6px;background-color:#E5EFF5}
.memo_section:first-child {margin-left:0}
.memo_section h3 {padding:0 0 10px;font-size:16px}

/* drag */
.gu-mirror {position:relative;margin-top:8px;padding:12px 10px;border-radius:4px;box-sizing:border-box;font-size:14px;background-color:#fff;transform:rotate(5deg)}
.gu-mirror:first-child {margin-top:0}
.gu-mirror input {border:0;outline:none;cursor:pointer}
.gu-mirror .add_list {background-color:#a5c1de;}
.gu-mirror .add_list a {display:block}
.gu-mirror .memo_delete {position:absolute;right:5px;top:9px;width:24px;font-size:24px;line-height:1;background:none}
.gu-mirror .icon {margin:5px 0 0}
</style>
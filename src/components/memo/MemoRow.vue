<template>
	<div class="memo_list_wrap">
		<div class="memo_section">
			<h3>메모</h3>
			{{memoPosts}}
			<ul id="memoList" class="memo_list">
				<li class="list_item" v-for="memo in memos" v-bind:key="memo.idx" :data-idx="memo.idx" :data-pos="memo.pos">
					<router-link :to="`/memo/detail/${memo.idx}`">
						<div>
							<input type="text" :value="memo.subject" readonly>
						</div>
						<div v-if="memo.content" class="ico_more"><span></span><span></span><span></span></div>
					</router-link>			
					<button type="button" class="memo_delete" @click="deleteList(memo.idx)">&times;</button>

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
import {mapState, mapActions} from 'vuex';

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
		this.FETCH_MEMO();
		this.isLoading = false;

		Bus.$on('onFetch', this.fetchList);
	},
	computed: {
		...mapState(['memo', 'memos'])
	},
	mounted() {

		this.dragulaCard = dragula([
			// document.getElementById('memoList')
			...Array.from(this.$el.querySelectorAll('#memoList')) // 유사배열이라 Array.from처리해줌 (배열로 넣기위해)
		], {
			invalid: (el) => {
				return el.classList.contains('add_list'); //true가 반환되면 드래그를 할 수 없게 하는 함수이다. (getElementById로 element를 가져오면 안됨 => 배열로 가져와야되네...)
      }
		}).on('drop', (el) => { // el, wrapper, target, siblings

			const targetList = {
				idx: el.dataset.idx*1,
				pos: el.dataset.pos*1
			};


			// 순서 비교는 배열의 index값으로 할꺼임
			Array.from(document.querySelectorAll('#memoList .list_item')).forEach((el, idx, arr) => { // 배열의 index로 target의 위치 확인

				const cardId = el.dataset.idx;
				let prevList = null;
				let nextList = null;
				if(cardId == targetList.idx) {
					prevList = idx > 0 ? {
						idx: arr[idx-1].dataset.idx*1,
						pos: arr[idx-1].dataset.pos*1
					} : null;
					nextList = idx < arr.length-1 ? {
						idx: arr[idx+1].dataset.idx*1,
						pos: arr[idx+1].dataset.pos*1
					} : null;

					// if(!prevList && nextList) targetList.pos = nextList.pos / 2; // 첫 번째 자리
					// else if(!nextList && prevList) targetList.pos = prevList.pos * 2; //마지막 자리
					// else targetList.pos = (nextList.pos + prevList.pos) / 2; //중간 자리

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

					this.UPDATE_MEMO({pos: targetList.pos, id: targetList.idx})
					Bus.$emit('onStep', 1);

				}

			})
		})
	},
	methods: {
		...mapActions(['FETCH_MEMO', 'UPDATE_MEMO', 'DELETE_MEMO']),
		fetchList() {
			this.FETCH_MEMO();
		},
		deleteList(id) {
			if(!window.confirm('해당 리스트를 삭제하시겠습니까?')) return;

			this.DELETE_MEMO({id});
			Bus.$emit('onStep', 3);
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
.memo_list .memo_delete {position:absolute;right:5px;top:9px;width:24px;font-size:18px;line-height:1;background:none}
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

/* 내용있을 때 표시 아이콘 */
.ico_more {line-height:17px;text-align:center;box-sizing:border-box;margin:5px 0 0}
.ico_more span {display:block;width:11px;height:2px;margin-top:2px;background-color:#ccc}
.ico_more span:first-child {margin:0}
.ico_more span:nth-child(2) {width:14px}
</style>
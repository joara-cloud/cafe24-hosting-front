<template>
	<div id="content" class="memo_wrap">
		<memo-row v-on:dhow="addMemo"></memo-row>
		<add-memo v-if="isAddMemo" v-on:close="isAddMemo=false"></add-memo>
		<router-view></router-view>

		<div class="memo_info">
			<!-- <ul class="info_list" data-aos="flip-up" data-aos-delay="50" data-aos-duration="500" data-aos-easing="ease-out" data-aos-once="true"> -->
			<ul class="info_list">
				<li>1. 메모 목록을 드래그하여 옮겨주세요. (하얀색 박스)</li>
				<li>2. "Add list" 버튼을 눌려 메모를 추가해주세요.</li>
				<li>3. X버튼을 눌러 메모를 삭제해주세요.</li>
			</ul>
		</div>
	</div>
</template>

<script>
// import AOS from 'aos';
import MemoRow from '@/components/memo/MemoRow.vue';
import AddMemo from '@/components/memo/AddMemo.vue';
import Bus from '@/utils/bus.js'
// import "aos/dist/aos.css";

export default {
	data() {
		return {
			isAddMemo: false,
		}
	},
	components: {
		MemoRow,
		AddMemo
	},
	methods: {
		addMemo() {
			this.isAddMemo = true;
		}
	},
	created() {
		// AOS.init();

		// 메모 안내 문구 중 1번 완료
		Bus.$on('onStep', step => {
			document.querySelectorAll('.info_list > li')[step-1].classList.add('on');
		})
	}

}
</script>

<style>
.memo_wrap {min-height:50vh;background: -webkit-gradient(linear, left top, left bottom, from(#3EB9DE), to(#3A80DE));background: linear-gradient(#3EB9DE, #3A80DE);background:#ddd;}
.memo_info {padding:80px 50px;animation: ani 1s}
.memo_info .info_list {padding:22px;border-radius:20px;background:#ccc;}
.memo_info .info_list > li {font-size:14px;line-height:1.5;color:#555}
.memo_info .info_list > li.on {font-weight:600;color:#172852}
@keyframes ani{
	0%{transform: rotate(1deg);}
	10%{transform: rotate(0deg);}
	20%{transform: rotate(1deg);}
	30%{transform: rotate(0deg);}
}
</style>
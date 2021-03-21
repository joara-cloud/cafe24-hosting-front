<template>
	<div id="wrap">
		<app-header></app-header>
		<div id="container">
			<!-- <router-view></router-view> -->
			<slot></slot>
		</div>
    <app-footer></app-footer>
		<toast-popup></toast-popup>
	</div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import ToastPopup from '@/components/common/ToastPopup.vue'

export default {
	components: {
		AppHeader,
		AppFooter,
		ToastPopup
	}
}
</script>

<style>

</style>
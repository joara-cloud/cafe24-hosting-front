<template>
  <div id="app">
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>

<script>


export default {
  computed: {
    layout() {
      var defaultLayout = 'default';
      return (this.$route.meta.layout || defaultLayout) + '-layout';
    }
  },
  created() {

  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');
@import url('./assets/css/common/reset.css');
@import url('./assets/css/common/common.css');
</style>

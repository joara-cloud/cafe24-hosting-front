import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

var routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/posts',
    component: () => import('@/views/board/Index.vue'),
    children: [
      {
        path: 'list',
        component: () => import('@/views/board/List.vue')
      },      
      {
        path: 'view/:idx',
        component: () => import('@/views/board/View.vue')
      },
      {
        path: 'write',
        component: () => import('@/views/board/Write.vue')
      },
      {
        path: 'update/:id',
        component: () => import('@/views/board/Update.vue')
      }
    ]
  },
  {
    path: '/usage',
    component: () => import('@/views/Usage.vue'),
  },
  {
    path: '/memo',
    component: () => import('@/views/memo/List.vue'),
    children: [
      {
        path: 'card/:id',
        component: () => import('@/components/memo/CardPopup.vue')
      },
      {
        path: 'detail/:id',
        component: () => import('@/components/memo/MemoDetail.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/member/Login.vue')
  },
  {
    path: '*',
    meta: {
      layout: 'blank'
    },
    component: () => import('@/views/404.vue')
  }
]

var router = new VueRouter({
  mode: 'history', // 특정 URL에서 새로고침시 404뜨는거때문에 일시적으로 해둠
  base: process.env.BASE_URL,
  routes
});

export default router

import type { RouteRecordRaw } from "vue-router";
export const accessRoutes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    component: () => import("@/views/home/index.vue"),
    meta: { title: '主页' },
    // children: [
    //   {
    //     path: '/app/home',
    //     component: () => import('/@/views/home/index.vue'),
    //     name: 'home',
    //     meta: {
    //       title: '首页',
    //       icon: 'liulanqi',
    //       auth: ['home'],
    //     },
    //   },
    //   {
    //     path: '/app/website',
    //     name: 'website',
    //     component: () => import('/@/views/website/index.vue'),
    //     meta: {
    //       title: '网站管理',
    //       keepAlive: true,
    //       icon: 'jiedianguanli',
    //       auth: ['website'],
    //     },
    //   },
    //   {
    //     path: '/app/table-demo',
    //     name: 'table-demo',
    //     component: () => import('/@/views/table-demo/index.vue'),
    //     meta: {
    //       title: '表格用法',
    //       keepAlive: true,
    //       icon: 'rili',
    //     },
    //   },
    //   {
    //     path: '/app/others',
    //     name: 'others',
    //     component: BlankLayout,
    //     redirect: '/app/others/about',
    //     meta: {
    //       title: '其他菜单',
    //       icon: 'shurumimadenglu',
    //       auth: ['others'],
    //     },
    //     children: [
    //       {
    //         path: '/app/others/about',
    //         name: 'about',
    //         component: () => import('/@/views/others/about/index.vue'),
    //         meta: { title: '关于', keepAlive: true, hiddenWrap: true },
    //       },
    //       {
    //         path: '/app/others/antdv',
    //         name: 'antdv',
    //         component: () => import('/@/views/others/antdv/index.vue'),
    //         meta: { title: '组件', keepAlive: true, breadcrumb: true },
    //       },
    //     ],
    //   },
    //   {
    //     path: '/sys/account',
    //     name: 'account',
    //     component: () => import('/@/views/account/index.vue'),
    //     meta: { title: '用户管理', keepAlive: true, breadcrumb: true },
    //   },
    // ],
  },
  {
    path: "/notifications",
    name: "notifications",
    component: () => import("@/views/notifications/index.vue"),
  },
  {
    path: "/favorites",
    name: "favorites",
    component: () => import("@/views/favorites/index.vue"),
  },
  {
    path: "/explore",
    name: "explore",
    component: () => import("@/views/explore/index.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("@/views/settings/index.vue"),
  },
  {
    path: "/@:id",
    name: "user",
    component: () => import("@/views/user/index.vue"),
  },
  {
    path: "/@:id/following",
    name: "following",
    component: () => import("@/views/user/following/index.vue"),
  },
  {
    path: "/@:id/followed",
    name: "followed",
    component: () => import("@/views/user/followed/index.vue"),
  },
  {
    path: "/notes/:id",
    name: "notes",
    component: () => import("@/views/notes/index.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/404",
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error.vue"),
  },
];
export const constantRoutes: RouteRecordRaw[] = [
  // {
  //   path: "/home",
  //   name: "home",
  //   component: () => import("@/views/home/index.vue"),
  // },
  {
    path: "/",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
    ...accessRoutes,
];

export const publicRoutes = [
  {
    path: "/:pathMatch(.*)",
    redirect: "/404",
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error.vue"),
  },
];

export default constantRoutes;

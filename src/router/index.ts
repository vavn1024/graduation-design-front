import { createRouter, createWebHistory } from 'vue-router';
import routes from './router.config';
import {getToken} from "@/utils/auth";

// app router
export const router = createRouter({
  // 解决 二级路径存在时，路径地址路由不匹配的问题
  // https://juejin.cn/post/7051826951463370760#heading-27
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  strict: true,
  // scrollBehavior: () => ({ left: 0, top: 0 }),
});

router.beforeEach( async (to: any, _, next) => {
  const hasToken = getToken();
  if (hasToken) {
    // 已登录
    if (to.path === '/') {
      next({ path: '/home' });
    } else {
      // //是否获取过用户信息
      // const isGetUserInfo = permissioStore.getIsGetUserInfo;
      // if (isGetUserInfo) {
      //   next();
      // } else {
      //   // 没有获取，请求数据
      //   await permissioStore.fetchAuths();
      //   // 过滤权限路由
      //   const routes = await permissioStore.buildRoutesAction();
      //   // 404 路由一定要放在 权限路由后面
      //   routes.forEach((route) => {
      //     router.addRoute(route);
      //   });
      //   // hack 方法
      //   // 不使用 next() 是因为，在执行完 router.addRoute 后，
      //   // 原本的路由表内还没有添加进去的路由，会 No match
      //   // replace 使路由从新进入一遍，进行匹配即可
      //   next({ ...to, replace: true });
      // }
      next();
    }
  } else {
    if (to.path === '/') {
      next();
    } else {
      next({ path: '/' });
    }
    // next();
    // 未登录
    // if (whiteList.indexOf(to.path) !== -1) {
    //   next();
    // } else {
    // }
  }

});

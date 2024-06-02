import {
  type Router,
  createRouter,
  type RouteRecordRaw,
  type RouteComponent,
  createWebHistory
} from "vue-router";
import NProgress from "@/utils/progress";
import { getHistoryMode } from "../utils";

const Layout = () => import("@/views/item/layout/index.vue");

export const routes = [
  {
    path: "/",
    name: "Home",
    component: Layout,
    redirect: "/profile",
    index: "1",
    meta: {
      icon: "ep:home-filled",
      title: "首页",
      rank: 0
    },
    children: [
      {
        path: "/profile",
        name: "Profile",
        index: "1-1",
        meta: {
          title: "资料",
          icon: "ep:home-filled",
          showLink: true
        },
        component: () => import("@/views/pass/profile/index.vue")
      }
    ]
  },
  {
    path: "/user",
    name: "User",
    component: Layout,
    redirect: "/profilex",
    index: "2",
    meta: {
      icon: "ep:home-filled",
      title: "首页",
      rank: 0
    },
    children: [
      {
        path: "/list",
        index: "2-1",
        name: "List",
        meta: {
          title: "资料",
          icon: "ep:home-filled",
          showLink: true
        },
        component: () => import("@/views/pass/users/index.vue")
      }
    ]
  }
];

export const router: Router = createRouter({
  history: getHistoryMode(import.meta.env.VITE_ROUTER_HISTORY),
  routes,
  strict: true,
  scrollBehavior(to, from, savedPosition) {
    return new Promise(resolve => {
      if (savedPosition) {
        return savedPosition;
      } else {
        if (from.meta.saveSrollTop) {
          const top: number =
            document.documentElement.scrollTop || document.body.scrollTop;
          resolve({ left: 0, top });
        }
      }
    });
  }
});

router.beforeEach((to: ToRouteType, _from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;

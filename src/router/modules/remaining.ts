const Layout = () => import("@/layout/index.vue");

export default [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
      showLink: false,
      rank: 101
    }
  },
  {
    path: "/redirect",
    component: Layout,
    meta: {
      title: "加载中...",
      showLink: false,
      rank: 102
    },
    children: [
      {
        path: "/redirect/:path(.*)", // '/:pathMatch(.*)*' 任意深度路径
        name: "Redirect",
        component: () => import("@/layout/redirect.vue")
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    // redirect: '/',
    name: "404",
    component: () => import("@/views/error/404.vue"),
    meta: {
      title: "404"
    }
  }
] satisfies Array<RouteConfigsTable>;

// 不需要鉴权的外部界面
import {createRouter, createWebHashHistory, type RouteRecordRaw} from "vue-router";
import commonRoute from "./modules/common";

const outerPaths: RouteRecordRaw[] = [
    {
        path: "/",
        redirect: "/login",
    },
    {
        path: "/home",
        name: "home",
        component: () => import("../views/home/HomeView.vue"),
        meta: {
            title: "首页",
        },
    },
    {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("../views/about/AboutView.vue"),
        meta: {
            title: "关于",
        },
    },
    {
        path: "/login",
        name: "login",
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("../views/login/LoginView.vue"),
        meta: {
            title: "登录",
        },
    },
    {
        path: "/register",
        name: "register",
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("../views/register/RegisterView.vue"),
        meta: {
            title: "注册",
        },
    },
    {
        path: "/forgetPassword",
        name: "forgetPassword",
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("../views/forgetPassword/ForgetPasswordView.vue"),
        meta: {
            title: "忘记密码",
        },
    },
    {
        path: "/userProfile",
        name: "userProfile",
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("../views/profile/UserProfileView.vue"),
        meta: {
            title: "个人中心",
        },
    },
    {
        path: "/settings",
        name: "settings",
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("../views/settings/SettingView.vue"),
        meta: {
            title: "系统设置",
        },
    },

    ...commonRoute,
];

// 需要鉴权的界面
/**
 * 三个管理界面需要鉴权;一个web-tracing echarts需要鉴权;
 */
const innerPaths: RouteRecordRaw[] = [
    // {
    //   name: "Portal",
    //   path: "/portal",
    //   redirect: "/welcome",
    //   component: () => import("@/layouts/platform/index.vue"),
    //   children: [...demoRoute],
    // },
];

const routes: RouteRecordRaw[] = [
    ...outerPaths,
    ...innerPaths,
    //设置不存在的路径统一跳转至/error/not-found
    {
        path: "/:pathMatch(.*)*",
        redirect: "/error/not-found",
    },
];

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
});

// 全局路由守卫
router.beforeEach(async (to) => {
    const title = (to.meta && (to.meta.title as string)) || "";
    if (title) {
        document.title = title;
    }
});

export default router;

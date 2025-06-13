import type {RouteRecordRaw} from "vue-router";

const route: RouteRecordRaw[] = [
    {
        name: "NotFound",
        path: "/error/not-found",
        component: () => import("../../views/common/NotFonudView.vue"),
        meta: {
            title: "页面丢失",
        },
    },
    {
        name: "Forbidden",
        path: "/error/forbidden",
        component: () => import("../../views/common/ForbiddenView.vue"),
        meta: {
            title: "无权限",
        },
    },
];
export default route;

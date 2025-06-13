import {defineStore} from 'pinia';
import {computed, ref} from "vue";

export interface LoginBgImage {
    id: number,
    url: string,
    name: string,
}

export const useBackGroundImageStore = defineStore('BackGroundImage', () => {
    const loginBackGroundImageURL = ref<string>("/images/bg-left.png");
    const systemctlBackGroundImageURL = ref<string>('/images/bg-left.png');
    const getLoginBackGroundImageURL = computed(() => loginBackGroundImageURL.value)
    const getSystemctlBackGroundImageURL = computed(() => systemctlBackGroundImageURL.value)
    const currentLoginBackGroundImageName = ref<string>("登录框背景图-bg0");

    function setLoginBackGroundImageURL(v: string) {
        loginBackGroundImageURL.value = v;
    }

    function setCurrentLoginBackGroundImageName(v: string) {
        currentLoginBackGroundImageName.value = v;
    }

    const LoginBgImageList = ref<LoginBgImage[]>(
        [
            {id: 0, url: "/images/bg-left.png", name: "登录框背景图-bg0"},
            {id: 1, url: "/images/login/bg1.png", name: "登录框背景图-bg1"},
            {id: 2, url: "/images/login/bg2.jpg", name: "登录框背景图-bg2"},
            {id: 3, url: "/images/login/bg3.jpg", name: "登录框背景图-bg3"},
            {id: 4, url: "/images/login/bg4.jpg", name: "登录框背景图-bg4"},
            {id: 5, url: "/images/login/bg5.jpg", name: "登录框背景图-bg5"},
            {id: 6, url: "/images/login/bg6.jpg", name: "登录框背景图-bg6"},
            {id: 7, url: "/images/login/bg7.jpg", name: "登录框背景图-bg7"},
            {id: 8, url: "/images/login/bg8.jpg", name: "登录框背景图-bg8"},
            {id: 9, url: "/images/login/bg9.jpg", name: "登录框背景图-bg9"},
            {id: 10, url: "/images/login/bg10.png", name: "登录框背景图-bg10"},
            {id: 11, url: "/images/login/bg11.png", name: "登录框背景图-bg11"},
            {id: 12, url: "/images/login/bg12.png", name: "登录框背景图-bg12"},
        ]
    )

    return {
        loginBackGroundImageURL, systemctlBackGroundImageURL, setLoginBackGroundImageURL,
        getLoginBackGroundImageURL, getSystemctlBackGroundImageURL, LoginBgImageList,
        currentLoginBackGroundImageName, setCurrentLoginBackGroundImageName
    }
}, {
    persist: true,
})
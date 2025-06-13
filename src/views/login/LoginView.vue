<script setup lang="ts">
import {reactive, ref} from "vue";
import type {LoginOptions} from "../../models/models.ts";
import {useRouter} from "vue-router";

const router = useRouter();
const optionLogSize = ref<string>("50px");
const optionLogHeight = ref<string>('40px');

const LoginOptionList = reactive<LoginOptions[]>(
    [
      {name: "阿里云OSS", id: 1, logo: "/images/阿里云logo.jpg", theme: "#FF9A2E",},
      {name: "华为云存储", id: 2, logo: "/images/华为云logo.png", theme: "#CB272D",},
      {name: "腾讯云cos", id: 3, logo: "/images/cos-logo.png", theme: "#165DFF",},
      {name: "百度云存储", id: 4, logo: "/images/baiducloud-color.png", theme: "#c9cdd4",},
      {name: "七牛云存储", id: 5, logo: "/images/七牛云logo.png", theme: "#114BA3",},
      {name: "Linux云服务器", id: 6, logo: "/images/linux-logo.png", theme: "#FBACA3",},
      {name: "电脑本地文件存储", id: 8, logo: "/images/windows-logo.png", theme: "#C396ED",},
      {name: "浏览器本地缓存", id: 8, logo: "/images/google-color.png", theme: "#F979B7",},
    ]
)
const goHome = () => {
  console.log("跳转首页");
  router.push("/home");
  // 使用pinia保存选择的存储Type;
}
/*- 阿里云OSS
- 华为云存储
- 腾讯云cos
- 百度云存储
- 浏览器本地缓存
- Linux云服务器
- 电脑本地文件存储
- 七牛云存储*/

</script>

<template>
  <div class="login-app">
    <div class="login-container">
      <div class="left-container"></div>
      <div class="right-container">
        <div class="title">欢迎使用 password-QY</div>
        <div class="please">请选择您的登录方式</div>
        <a-divider/>
        <div class="login-options-view">
          <div class="login-option-item" v-for="(item,index) in LoginOptionList" :key="index" @click="goHome()"
               :style="{backgroundColor: item.theme}"
          >
            <div class="option-logo">
              <img :src="item.logo" :alt="item.logo" :width="optionLogSize" :height="optionLogHeight">
            </div>
            <div class="option-name" style="margin-top: 5px">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.login-app {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .login-container {
    width: 70%;
    height: 80vh;
    /*后续修改为渐变色*/
    background-color: #ffffff;
    display: flex;
    flex-direction: row;

    .left-container {
      width: 50%;
      background-image: url("/images/bg-left.png");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    .right-container {
      width: 50%;
      background-color: #ffffff;
      opacity: 0.9;

      .login-options-view {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        flex: 1;
        justify-content: center;
        align-items: center;


        .login-option-item {
          text-align: center;
          width: 25%;
          padding: 20px;
          border-radius: 10px;
          transition: all 0.3s;
          background-color: rgba(136, 136, 136, 0.15);
          margin-top: 2vh;
          margin-left: 1vw;
        }

        .login-option-item:hover {
          transform: scale(1.1);
          cursor: pointer;
          box-shadow: 1px 1px rgba(0, 180, 42, 0.25);
        }
      }

      .please {
        font-family: 华文宋体, serif;
        text-align: center;
        margin-top: 2vh;
        color: #009A29;

      }

      .title {
        font-size: 30px;
        font-weight: bolder;
        font-family: 华文宋体, serif;
        text-align: center;
        margin-top: 2vh;
      }
    }
  }

}
</style>
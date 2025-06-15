<script setup lang="ts">
import {reactive, ref} from "vue";
import type {LoginOptions} from "../../models/models.ts";
import {useBackGroundImageStore} from "../../store/modules/backgroundImageStore.ts";
import {useStorageClientStore} from "../../store/modules/storageClientStore.ts";
import LoginForm from "../../components/LoginForm.vue";

const storageClientStore = useStorageClientStore();
const optionLogSize = ref<string>("80px");
const optionLogHeight = ref<string>('80px');
const LoginFormShowState = ref<boolean>(false);
const toggleLoginFormShowState = () => {
  LoginFormShowState.value = !LoginFormShowState.value;
}
const LoginOptionList = reactive<LoginOptions[]>(
    [
      {
        name: "阿里云OSS", id: 1, logo: "/images/阿里云logo.jpg", theme: "#FF9A2E", func: () => {
          storageClientStore.setLoginPlatform('aliyun-oss');
          toggleLoginFormShowState();
        }
      },
      {
        name: "华为云存储", id: 2, logo: "/images/华为云logo.png", theme: "#CB272D", func: () => {
          storageClientStore.setLoginPlatform('huawei-cloud');
          toggleLoginFormShowState();
        }
      },
      {
        name: "腾讯云cos", id: 3, logo: "/images/cos-logo.png", theme: "#165DFF", func: () => {
          storageClientStore.setLoginPlatform('tencent-cos');
          toggleLoginFormShowState();
        }
      },
      {
        name: "百度云存储", id: 4, logo: "/images/baiducloud-color.png", theme: "#c9cdd4", func: () => {
          storageClientStore.setLoginPlatform('baidu-cloud');
          toggleLoginFormShowState();
        }
      },
      {
        name: "七牛云存储", id: 5, logo: "/images/七牛云logo.png", theme: "#114BA3", func: () => {
          storageClientStore.setLoginPlatform('qiniu-kodo');
          toggleLoginFormShowState();
        }
      },
      {
        name: "Linux云服务器", id: 6, logo: "/images/linux-logo.png", theme: "#FBACA3", func: () => {

          storageClientStore.setLoginPlatform('linux-server');
          toggleLoginFormShowState();
        }
      },
      {
        name: "SpringBootAPI", id: 7, logo: "/images/icons8-春天的标志-240.png", theme: "green", func: () => {

          storageClientStore.setLoginPlatform('springboot-api');
          toggleLoginFormShowState();
        }
      },
      {
        name: "浏览器本地缓存", id: 8, logo: "/images/google-color.png", theme: "#F979B7", func: () => {
          // 跳转至首页;
          storageClientStore.setLoginPlatform('localCache');
          toggleLoginFormShowState();
          //goHome();
        }
      },
      {
        name: "Supabase", id: 9, logo: "/images/Supabase.png", theme: "#23C343", func: () => {
          // 跳转至首页;

          storageClientStore.setLoginPlatform('supabase');
          toggleLoginFormShowState();
        }
      },
      {
        name: "minio", id: 10, logo: "/images/minio-1.svg", theme: "#FBACA3", func: () => {
          // 跳转至首页;

          storageClientStore.setLoginPlatform('minio');
          toggleLoginFormShowState();
        }
      },
      {
        name: "ETCD", id: 11, logo: "/images/ETCD.png", theme: "#E8F7FF", func: () => {
          // 跳转至首页;

          storageClientStore.setLoginPlatform('etcd');
          toggleLoginFormShowState();
        }
      },
      {
        name: "Redis", id: 12, logo: "/images/Redis-Labs.png", theme: "#F76560", func: () => {
          // 跳转至首页;

          storageClientStore.setLoginPlatform('redis');
          toggleLoginFormShowState();
        }
      },
    ]
)


const backGroundImageStore = useBackGroundImageStore();
const back = () => {
  toggleLoginFormShowState();
  storageClientStore.setLoginPlatform(null);
}
</script>

<template>
  <div class="login-app">
    <div class="login-container">
      <div class="left-container"
           :style="{backgroundImage:  'url(' + backGroundImageStore.getLoginBackGroundImageURL + ')' }"></div>
      <div v-if="!LoginFormShowState" class="right-container  ">
        <div class="title">欢迎使用 password-QY</div>
        <div class="please">请选择您的登录方式</div>
        <a-divider/>
        <div class="login-options-view">
          <div class="login-option-item" v-for="(item,index) in LoginOptionList" :key="index" @click="item.func()"
               :style="{backgroundColor: item.theme}"
          >
            <div class="option-logo">
              <img :src="item.logo" :alt="item.logo" :width="optionLogSize" :height="optionLogHeight">
            </div>
            <div class="option-name" style="margin-top: 5px">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div v-else class="right-container">
        <LoginForm @back="back"/>
      </div>
      <!--      进行数据初始化操作;-->
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
    width: 90%;
    height: 80vh;
    background-color: rgba(255, 255, 255, 0.9);
    display: flex;
    flex-direction: row;

    .left-container {
      width: 50%;
      /*background-image: url("/images/bg-left.png"); 已使用Pinia 结合CSS实现动态背景图*/
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
          width: 15%;
          padding: 10px;
          border-radius: 10px;
          transition: all 0.3s;
          background-color: rgba(136, 136, 136, 0.15);
          margin-top: 1vh;
          margin-left: 1.5vw;

          .option-name {
            font-weight: bold;
            font-size: 0.9rem;

          }
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
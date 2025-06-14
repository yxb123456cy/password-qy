<template>
  <a-card :title="getTitle">
    <a-form
        ref="formRef"
        :model="form"
        :rules="rules"
        class="mt-4"
        layout="vertical"
        @submit.prevent="onSubmit"
    >
      <!-- 阿里云 OSS -->
      <template v-if="platform === 'aliyun-oss'">
        <a-form-item field="accessKeyId" label="AccessKeyId" required>
          <a-input v-model="form.accessKeyId"/>
        </a-form-item>
        <a-form-item field="accessKeySecret" label="AccessKeySecret" required>
          <a-input-password v-model="form.accessKeySecret"/>
        </a-form-item>
        <a-form-item field="bucket" label="Bucket" required>
          <a-input v-model="form.bucket"/>
        </a-form-item>
        <a-form-item field="region" label="Region" required>
          <a-input v-model="form.region"/>
        </a-form-item>
      </template>

      <!-- 华为云存储 -->
      <template v-else-if="platform === 'huawei-cloud'">
        <a-form-item field="accessKey" label="AccessKey" required>
          <a-input v-model="form.accessKey"/>
        </a-form-item>
        <a-form-item field="secretKey" label="SecretKey" required>
          <a-input-password v-model="form.secretKey"/>
        </a-form-item>
        <a-form-item field="bucket" label="Bucket" required>
          <a-input v-model="form.bucket"/>
        </a-form-item>
        <a-form-item field="region" label="Region" required>
          <a-input v-model="form.region"/>
        </a-form-item>
      </template>

      <!-- 腾讯云 COS -->
      <template v-else-if="platform === 'tencent-cos'">
        <a-form-item field="secretId" label="SecretId" required>
          <a-input v-model="form.secretId"/>
        </a-form-item>
        <a-form-item field="secretKey" label="SecretKey" required>
          <a-input-password v-model="form.secretKey"/>
        </a-form-item>
        <a-form-item field="bucket" label="Bucket" required>
          <a-input v-model="form.bucket"/>
        </a-form-item>
        <a-form-item field="region" label="Region" required>
          <a-input v-model="form.region"/>
        </a-form-item>
      </template>

      <!-- 百度云存储 -->
      <template v-else-if="platform === 'baidu-cloud'">
        <a-form-item field="ak" label="AccessKey (AK)" required>
          <a-input v-model="form.ak"/>
        </a-form-item>
        <a-form-item field="sk" label="SecretKey (SK)" required>
          <a-input-password v-model="form.sk"/>
        </a-form-item>
        <a-form-item field="bucket" label="Bucket" required>
          <a-input v-model="form.bucket"/>
        </a-form-item>
        <a-form-item field="endpoint" label="Endpoint" required>
          <a-input v-model="form.endpoint"/>
        </a-form-item>
      </template>

      <!-- 七牛云 Kodo -->
      <template v-else-if="platform === 'qiniu-kodo'">
        <a-form-item field="ak" label="AK" required>
          <a-input v-model="form.ak"/>
        </a-form-item>
        <a-form-item field="sk" label="SK" required>
          <a-input-password v-model="form.sk"/>
        </a-form-item>
        <a-form-item field="bucket" label="Bucket" required>
          <a-input v-model="form.bucket"/>
        </a-form-item>
        <a-form-item field="region" label="Region" required>
          <a-input v-model="form.region"/>
        </a-form-item>
      </template>

      <!-- Linux 云服务器 -->
      <template v-else-if="platform === 'linux-server'">
        <a-form-item field="ip" label="IP 地址" required>
          <a-input v-model="form.ip"/>
        </a-form-item>
        <a-form-item field="username" label="用户名" required>
          <a-input v-model="form.username"/>
        </a-form-item>
        <a-form-item field="password" label="密码" required>
          <a-input-password v-model="form.password"/>
        </a-form-item>
      </template>

      <!-- SpringBoot API -->
      <template v-else-if="platform === 'springboot-api'">
        <a-form-item field="username" label="用户名" required>
          <a-input v-model="form.username"/>
        </a-form-item>
        <a-form-item field="password" label="密码" required>
          <a-input-password v-model="form.password"/>
        </a-form-item>
      </template>

      <!-- 本地缓存 -->
      <template v-else-if="platform === 'localCache'">
        <a-form-item field="prefix" label="命名空间前缀" required>
          <a-input v-model="form.prefix"/>
        </a-form-item>
      </template>

      <!-- Supabase -->
      <template v-else-if="platform === 'supabase'">
        <a-form-item field="url" label="Supabase URL" required>
          <a-input v-model="form.url"/>
        </a-form-item>
        <a-form-item field="apiKey" label="API Key" required>
          <a-input-password v-model="form.apiKey"/>
        </a-form-item>
      </template>

      <!-- MinIO -->
      <template v-else-if="platform === 'minio'">
        <a-form-item field="endpoint" label="Endpoint" required>
          <a-input v-model="form.endpoint"/>
        </a-form-item>
        <a-form-item field="accessKey" label="Access Key" required>
          <a-input v-model="form.accessKey"/>
        </a-form-item>
        <a-form-item field="secretKey" label="Secret Key" required>
          <a-input-password v-model="form.secretKey"/>
        </a-form-item>
      </template>

      <!-- ETCD -->
      <template v-else-if="platform === 'etcd'">
        <a-form-item field="endpoint" label="Endpoint" required>
          <a-input v-model="form.endpoint"/>
        </a-form-item>
        <a-form-item field="username" label="用户名">
          <a-input v-model="form.username"/>
        </a-form-item>
        <a-form-item field="password" label="密码">
          <a-input-password v-model="form.password"/>
        </a-form-item>
      </template>

      <!-- Redis -->
      <template v-else-if="platform === 'redis'">
        <a-form-item field="host" label="Host" required>
          <a-input v-model="form.host"/>
        </a-form-item>
        <a-form-item field="port" label="Port" required>
          <a-input-number v-model="form.port" :min="1" :max="65535"/>
        </a-form-item>
        <a-form-item field="password" label="密码">
          <a-input-password v-model="form.password"/>
        </a-form-item>
      </template>
      <div style="display: flex">
        <a-form-item class="text-center mt-4">
          <a-button style="width:10vw" type="primary" status="warning" :loading="ButtonLoadingState" size="large"
                    @click="connectTest">连接测试
          </a-button>
        </a-form-item>
        <a-form-item class="text-center mt-4">
          <a-tooltip :content="disabled? '连接测试通过后才可登录':'连接测试已通过,可以进行登录' ">
            <a-button style="width:10vw" type="primary" status="success" size="large" :disabled="disabled"
                      @click="onSubmit" :loading="SubmitButtonLoadingState">登录
            </a-button>
          </a-tooltip>

        </a-form-item>
        <a-form-item class="text-center mt-4">
          <a-button style="width:10vw" type="primary" size="large" @click="back">返回</a-button>
        </a-form-item>
        <a-form-item class="text-center mt-4">
          <a-button style="width:10vw" type="primary" status="danger" size="large" @click="resetForm">重置</a-button>
        </a-form-item>
      </div>
      <div v-if="LoadingState2">
        <a-spin dot size="25"/>
        <br>
        <a-tag style="margin-top: 1vh" size="large">正在初始化加载数据...</a-tag>
      </div>
    </a-form>
  </a-card>
</template>

<script setup lang="ts">
import {ref, reactive, onMounted, defineEmits, computed} from 'vue';
import {FormInstance, Message} from '@arco-design/web-vue';
import {defaultFormMap, type LoginPlatform} from "../models/login/login.ts";
import {useStorageClientStore} from "../store/modules/storageClientStore.ts";
import {StorageAdapterFactory} from "../models/adapter/adapter.ts";
import {initialize} from "../hooks/init/initialize.ts";
import {useRouter} from "vue-router";

const router = useRouter();
const emit = defineEmits(['back']);
const storageClientStore = useStorageClientStore();
const platform = storageClientStore.getLoginPlatform;
const disabled = ref<boolean>(true);
// 按钮是否加载的state;
const ButtonLoadingState = ref<boolean>(false);

const LoadingState2 = ref<boolean>(false);
const SubmitButtonLoadingState = ref<boolean>(false);

const getTitle = computed(() => {
  return '登录' + "-" + "您当前选择的方式为:" + platform;
})
const form = reactive<any>({});
const formRef = ref<FormInstance>();
onMounted(() => {
  if (platform) {
    Object.assign(form, defaultFormMap[platform]);
  }
});
const back = () => {
  // 函数回调;
  emit('back');
  /*disabled.value = false;*/
}
const resetForm = () => {
  console.log("重置表单");
  formRef.value.resetFields();
}

/**
 * 连接测试方法 使用适配器+工厂模式;
 */
const connectTest = async () => {
  ButtonLoadingState.value = true;
  const p = storageClientStore.getLoginPlatform;
  console.log(p);
  console.log("form:", form.prefix);
  const adapter = StorageAdapterFactory.getAdapter(p);
  let res = await adapter.testConnection(form);

  console.log("连接测试结果:", res);
  //为ture; 打开登录限制;
  if (res) {
    storageClientStore.setPrefix(form.prefix as string);
    setTimeout(() => {
      disabled.value = false;
      Message.success("连接测试成功!");
      ButtonLoadingState.value = false;
    }, 500)

  } else {
    disabled.value = true;
  }
}
const platformLabels: Record<LoginPlatform, string> = {
  'aliyun-oss': '阿里云 OSS',
  'huawei-cloud': '华为云存储',
  'tencent-cos': '腾讯云 COS',
  'baidu-cloud': '百度云存储',
  'qiniu-kodo': '七牛云 Kodo',
  'linux-server': 'Linux 云服务器',
  'springboot-api': 'SpringBoot API',
  'localCache': "浏览器本地缓存",
  'supabase': 'SupaBase',
  'minio': 'MinIO',
  'etcd': 'ETCD',
  'redis': 'Redis',
};
const rules = {};
const goHome = () => {
  // 使用pinia保存选择的存储Type;
  console.log("跳转首页");
  router.push("/home");
}
const onSubmit = async () => {
  await formRef.value?.validate();
  console.log('提交的数据：', platform, form);
  LoadingState2.value = true; //开启加载;
  SubmitButtonLoadingState.value = true;
  const res = initialize(storageClientStore.getLoginPlatform, form.prefix as string);
  if (res != undefined && res) {
    //代表初始化数据成功
    setTimeout(() => {
      LoadingState2.value = false; //开启加载;
      SubmitButtonLoadingState.value = false;
      Message.success(`使用 ${platformLabels[platform!]} 方式登录成功`);
      goHome();
    }, 1000);
    //调用goHome方法;

  } else {
    Message.error("初始化数据失败");
    //继续关闭;
    LoadingState2.value = false; //开启加载;
    SubmitButtonLoadingState.value = false;
  }


};
</script>

<style scoped>
.mt-4 {
  margin-top: 1rem;
}
</style>

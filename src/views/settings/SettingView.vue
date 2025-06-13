<script setup lang="ts">
import {ref, reactive} from 'vue';
import {Message} from '@arco-design/web-vue';
import {useRouter} from "vue-router";
import {useBackGroundImageStore} from "../../store/modules/backgroundImageStore.ts";

const router = useRouter();
// 主题设置
const themeOptions = [
  {label: '浅色模式', value: 'light'},
  {label: '深色模式', value: 'dark'},
  {label: '跟随系统', value: 'auto'}
];
const currentTheme = ref('light');

// 语言设置
const languageOptions = [
  {label: '简体中文', value: 'zh-CN'},
  {label: '繁体中文', value: 'zh-TW'},
  {label: '英文', value: 'en-US'}
];
const currentLanguage = ref('zh-CN');

// 安全设置
const securitySettings = reactive({
  autoLock: true,
  autoLockTime: 5,
  requirePasswordOnStart: true,
  twoFactorAuth: false
});

// 自动锁定时间选项
const lockTimeOptions = [
  {label: '1分钟', value: 1},
  {label: '5分钟', value: 5},
  {label: '10分钟', value: 10},
  {label: '30分钟', value: 30},
  {label: '1小时', value: 60}
];

// 通知设置
const notificationSettings = reactive({
  enableNotifications: true,
  passwordExpiryAlert: true,
  securityAlert: true,
  updateAlert: true
});
const goHome = () => {
  router.push("/home");
}

// 保存设置
const saveSettings = () => {
  // 这里应该是实际的API调用，保存用户设置
  // 模拟保存成功
  Message.success('设置保存成功');
};

// 重置设置
const resetSettings = () => {
  // 重置为默认设置
  currentTheme.value = 'light';
  currentLanguage.value = 'zh-CN';
  securitySettings.autoLock = true;
  securitySettings.autoLockTime = 5;
  securitySettings.requirePasswordOnStart = true;
  securitySettings.twoFactorAuth = false;
  notificationSettings.enableNotifications = true;
  notificationSettings.passwordExpiryAlert = true;
  notificationSettings.securityAlert = true;
  notificationSettings.updateAlert = true;

  Message.success('设置已重置为默认值');
};
const backGroundImageStore = useBackGroundImageStore();
const value = ref(backGroundImageStore.currentLoginBackGroundImageName);
const selectChange = (value: string | number | boolean | Record<string, any> | (string | number | boolean | Record<string, any>)[]) => {
  console.log(value);
  let opt = backGroundImageStore.LoginBgImageList.find((e) => e.name === value)!;
  backGroundImageStore.setCurrentLoginBackGroundImageName(opt.name);
  backGroundImageStore.setLoginBackGroundImageURL(opt.url);

}
</script>

<template>
  <div class="settings-container">
    <a-card class="settings-card">
      <template #title>
        <div class="card-title">系统设置</div>
      </template>

      <a-tabs default-active-key="1">
        <!-- 个性化 -->
        <a-tab-pane key="1" title="个性化">
          <a-form :model="{ theme: currentTheme, language: currentLanguage }" layout="vertical">
            <a-form-item field="theme" label="主题设置">
              <a-radio-group v-model="currentTheme">
                <a-radio v-for="option in themeOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </a-radio>
              </a-radio-group>
            </a-form-item>

            <a-form-item field="language" label="语言设置">
              <a-select v-model="currentLanguage" placeholder="请选择语言">
                <a-option v-for="option in languageOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </a-option>
              </a-select>
            </a-form-item>
            <a-form-item label="登录图片设置">
              <div>
                <!--              可使用预先定义也可以自定义上传-->
                <a-select v-model="value" :style="{width:'320px'}" placeholder="Please select ..."
                          @change="selectChange">
                  <a-option v-for="item of backGroundImageStore.LoginBgImageList" :value="item.name"
                            :label="item.name"/>
                </a-select>
                <div>Select Value: {{ value }}</div>
              </div>
            </a-form-item>
            <a-form-item>
              <div>
                <a-image
                    width="350"
                    :src="backGroundImageStore.getLoginBackGroundImageURL"
                />
              </div>
            </a-form-item>
            <a-form-item label="系统背景图设置">
              <!--              可使用预先定义也可以自定义上传-->
            </a-form-item>
          </a-form>
        </a-tab-pane>

        <!-- 安全设置 -->
        <a-tab-pane key="2" title="安全设置">
          <a-form :model="securitySettings" layout="vertical">
            <a-form-item field="autoLock">
              <a-space direction="vertical" style="width: 100%">
                <a-switch v-model="securitySettings.autoLock">
                  <template #checked>开启</template>
                  <template #unchecked>关闭</template>
                </a-switch>
                <div class="setting-label">自动锁定</div>
                <div class="setting-description">在指定时间内无操作时自动锁定应用</div>
              </a-space>
            </a-form-item>

            <a-form-item field="autoLockTime" v-if="securitySettings.autoLock">
              <a-select v-model="securitySettings.autoLockTime" placeholder="请选择自动锁定时间">
                <a-option v-for="option in lockTimeOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </a-option>
              </a-select>
            </a-form-item>

            <a-form-item field="requirePasswordOnStart">
              <a-space direction="vertical" style="width: 100%">
                <a-switch v-model="securitySettings.requirePasswordOnStart">
                  <template #checked>开启</template>
                  <template #unchecked>关闭</template>
                </a-switch>
                <div class="setting-label">启动时要求密码</div>
                <div class="setting-description">每次启动应用时需要输入主密码</div>
              </a-space>
            </a-form-item>

            <a-form-item field="twoFactorAuth">
              <a-space direction="vertical" style="width: 100%">
                <a-switch v-model="securitySettings.twoFactorAuth">
                  <template #checked>开启</template>
                  <template #unchecked>关闭</template>
                </a-switch>
                <div class="setting-label">两步验证</div>
                <div class="setting-description">使用两步验证提高账户安全性</div>
              </a-space>
            </a-form-item>
          </a-form>
        </a-tab-pane>

        <!-- 通知设置 -->
        <a-tab-pane key="3" title="通知设置">
          <a-form :model="notificationSettings" layout="vertical">
            <a-form-item field="enableNotifications">
              <a-space direction="vertical" style="width: 100%">
                <a-switch v-model="notificationSettings.enableNotifications">
                  <template #checked>开启</template>
                  <template #unchecked>关闭</template>
                </a-switch>
                <div class="setting-label">启用通知</div>
                <div class="setting-description">接收应用相关通知</div>
              </a-space>
            </a-form-item>

            <template v-if="notificationSettings.enableNotifications">
              <a-form-item field="passwordExpiryAlert">
                <a-space direction="vertical" style="width: 100%">
                  <a-switch v-model="notificationSettings.passwordExpiryAlert">
                    <template #checked>开启</template>
                    <template #unchecked>关闭</template>
                  </a-switch>
                  <div class="setting-label">密码过期提醒</div>
                  <div class="setting-description">当密码即将过期时接收提醒</div>
                </a-space>
              </a-form-item>

              <a-form-item field="securityAlert">
                <a-space direction="vertical" style="width: 100%">
                  <a-switch v-model="notificationSettings.securityAlert">
                    <template #checked>开启</template>
                    <template #unchecked>关闭</template>
                  </a-switch>
                  <div class="setting-label">安全警报</div>
                  <div class="setting-description">当检测到安全问题时接收警报</div>
                </a-space>
              </a-form-item>

              <a-form-item field="updateAlert">
                <a-space direction="vertical" style="width: 100%">
                  <a-switch v-model="notificationSettings.updateAlert">
                    <template #checked>开启</template>
                    <template #unchecked>关闭</template>
                  </a-switch>
                  <div class="setting-label">更新提醒</div>
                  <div class="setting-description">当有新版本可用时接收提醒</div>
                </a-space>
              </a-form-item>
            </template>
          </a-form>
        </a-tab-pane>


        <a-tab-pane key="4" title="功能管理">
        </a-tab-pane>
        <a-tab-pane key="5" title="登录信息">
        </a-tab-pane>
        <a-tab-pane key="6" title="备份恢复">
        </a-tab-pane>
        <a-tab-pane key="7" title="问题反馈">
        </a-tab-pane>
        <a-tab-pane key="8" title="关于项目">
        </a-tab-pane>
        <a-tab-pane key="9" title="支持我们">
        </a-tab-pane>
        <a-tab-pane key="10" title="版权声明">
        </a-tab-pane>
      </a-tabs>

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <a-space>
          <a-button type="primary" status="success" @click="goHome">
            <template #icon>
              <icon-backward/>
            </template>
            返回首页
          </a-button>
          <a-button type="primary" @click="saveSettings">
            <template #icon>
              <icon-save/>
            </template>
            保存设置
          </a-button>
          <a-button status="warning" @click="resetSettings">
            <template #icon>
              <icon-refresh/>
            </template>
            重置设置
          </a-button>
        </a-space>
      </div>
    </a-card>
  </div>
</template>

<style scoped lang="less">
.settings-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 20px;
}

.settings-card {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  color: #1d2129;
}

.setting-label {
  font-weight: 500;
  margin-top: 4px;
}

.setting-description {
  color: #86909c;
  font-size: 13px;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e5e6eb;
}
</style>
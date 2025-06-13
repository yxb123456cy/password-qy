<script setup lang="ts">
import { ref, reactive } from 'vue';
import {Message} from "@arco-design/web-vue";

// 用户信息数据
const userInfo = reactive({
  username: '张三',
  email: 'zhangsan@example.com',
  avatar: '',
  phone: '13800138000',
  createTime: '2023-01-01',
  lastLoginTime: '2023-06-15'
});

// 头像上传相关
const avatarUrl = ref('');
const uploadLoading = ref(false);

const handleAvatarUpload = (file: File) => {
  uploadLoading.value = true;
  // 模拟上传
  setTimeout(() => {
    // 这里应该是实际的上传逻辑和API调用
    avatarUrl.value = URL.createObjectURL(file);
    userInfo.avatar = avatarUrl.value;
    uploadLoading.value = false;
    Message.success('头像上传成功');
  }, 1500);
  return false; // 阻止默认上传行为
};

// 编辑个人信息相关
const editVisible = ref(false);
const editForm = reactive({
  username: userInfo.username,
  email: userInfo.email,
  phone: userInfo.phone
});

const showEditModal = () => {
  // 重置表单数据
  editForm.username = userInfo.username;
  editForm.email = userInfo.email;
  editForm.phone = userInfo.phone;
  editVisible.value = true;
};

const handleEditSubmit = () => {
  // 这里应该是实际的API调用
  // 模拟保存成功
  userInfo.username = editForm.username;
  userInfo.email = editForm.email;
  userInfo.phone = editForm.phone;
  
  editVisible.value = false;
  Message.success('个人信息更新成功');
};

// 修改密码相关
const passwordVisible = ref(false);
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const showPasswordModal = () => {
  passwordForm.oldPassword = '';
  passwordForm.newPassword = '';
  passwordForm.confirmPassword = '';
  passwordVisible.value = true;
};

const handlePasswordSubmit = () => {
  // 验证新密码与确认密码是否一致
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    Message.error('新密码与确认密码不一致');
    return;
  }
  
  // 这里应该是实际的API调用
  // 模拟修改成功
  passwordVisible.value = false;
  Message.success('密码修改成功');
};
</script>

<template>
  <div class="user-profile-container">
    <a-card class="profile-card">
      <template #title>
        <div class="card-title">个人中心</div>
      </template>
      
      <!-- 用户基本信息 -->
      <div class="user-info-section">
        <div class="avatar-section">
          <a-upload
            action=""
            :show-file-list="false"
            :custom-request="handleAvatarUpload"
            accept="image/*"
          >
            <a-avatar 
              :image-url="userInfo.avatar || 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp'"
              :size="100"
              :trigger-type="['button', 'mask']"
            >
              <template #trigger-icon>
                <icon-camera />
              </template>
            </a-avatar>
          </a-upload>
          <div class="username">{{ userInfo.username }}</div>
        </div>
        
        <div class="info-details">
          <a-descriptions :data="[{ label: '用户名', value: userInfo.username },
                                { label: '邮箱', value: userInfo.email },
                                { label: '手机号', value: userInfo.phone },
                                { label: '注册时间', value: userInfo.createTime },
                                { label: '上次登录', value: userInfo.lastLoginTime }]" 
                         layout="inline-vertical" 
                         :column="{ xs: 1, sm: 2, md: 2, lg: 3 }" />
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div class="action-buttons">
        <a-space>
          <a-button type="primary" @click="showEditModal">
            <template #icon><icon-edit /></template>
            编辑资料
          </a-button>
          <a-button status="warning" @click="showPasswordModal">
            <template #icon><icon-lock /></template>
            修改密码
          </a-button>
        </a-space>
      </div>
    </a-card>
    
    <!-- 编辑个人信息弹窗 -->
    <a-modal v-model:visible="editVisible" title="编辑个人信息" @ok="handleEditSubmit">
      <a-form :model="editForm">
        <a-form-item field="username" label="用户名">
          <a-input v-model="editForm.username" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item field="email" label="邮箱">
          <a-input v-model="editForm.email" placeholder="请输入邮箱" />
        </a-form-item>
        <a-form-item field="phone" label="手机号">
          <a-input v-model="editForm.phone" placeholder="请输入手机号" />
        </a-form-item>
      </a-form>
    </a-modal>
    
    <!-- 修改密码弹窗 -->
    <a-modal v-model:visible="passwordVisible" title="修改密码" @ok="handlePasswordSubmit">
      <a-form :model="passwordForm">
        <a-form-item field="oldPassword" label="当前密码">
          <a-input-password v-model="passwordForm.oldPassword" placeholder="请输入当前密码" />
        </a-form-item>
        <a-form-item field="newPassword" label="新密码">
          <a-input-password v-model="passwordForm.newPassword" placeholder="请输入新密码" />
        </a-form-item>
        <a-form-item field="confirmPassword" label="确认密码">
          <a-input-password v-model="passwordForm.confirmPassword" placeholder="请再次输入新密码" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style scoped lang="less">
.user-profile-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 20px;
}

.profile-card {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  color: #1d2129;
}

.user-info-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  
  @media (min-width: 768px) {
    margin-right: 40px;
    margin-bottom: 0;
  }
}

.username {
  margin-top: 12px;
  font-size: 16px;
  font-weight: bold;
}

.info-details {
  flex: 1;
}

.action-buttons {
  display: flex;
  justify-content: center;
  margin-top: 24px;
  
  @media (min-width: 768px) {
    justify-content: flex-end;
  }
}
</style>
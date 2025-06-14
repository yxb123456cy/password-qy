<script setup lang="ts">
import {ref, reactive, defineEmits, defineProps, watch} from 'vue';
import type {passwordItemType} from '../models/models';
import {FormInstance, Message} from '@arco-design/web-vue';


/**
 * 定义事件名称;
 */
const emit = defineEmits(['submit', 'cancel']);

const props = defineProps({
  //是修改还是新建 默认新建;
  isEdit: {
    type: Boolean,
    default: false
  },
  // 父组件需要传递过来的表单数据;
  passwordData: {
    type: Object as () => passwordItemType | null,
    // 默认null
    default: null
  }
});

// 表单数据
const formData = reactive<{
  id: number | null;
  title: string;
  username: string;
  password: string;
  website: string;
  remark: string;
  tags: string[];
  star: boolean;
}>({
  id: null,
  title: '',
  username: '',
  password: '',
  website: '',
  remark: '',
  tags: [],
  star: false
});

// 表单验证规则
const rules = {
  title: [{required: true, message: '请输入标题'}],
  username: [{required: true, message: '请输入用户名'}],
  password: [{required: true, message: '请输入密码'}]
};

// 标签输入
const tagInputVisible = ref(false);
const tagInputValue = ref('');
const tagInputRef = ref(null);

// 密码可见性
const passwordVisible = ref(false);

// 监听编辑模式下的数据变化
watch(() => props.passwordData, (newVal) => {
  if (newVal && props.isEdit) {
    formData.id = newVal.id;
    formData.title = newVal.title;
    formData.username = newVal.username;
    formData.password = newVal.password;
    formData.website = newVal.website;
    formData.remark = newVal.remark;
    formData.tags = [...newVal.tags];
    formData.star = newVal.star;
  }
}, {immediate: true});

// 添加标签
const handleInputConfirm = () => {
  if (tagInputValue.value && !formData.tags.includes(tagInputValue.value)) {
    formData.tags.push(tagInputValue.value);
  }
  tagInputVisible.value = false;
  tagInputValue.value = '';
};

// 显示标签输入框
const showTagInput = () => {
  tagInputVisible.value = true;
  // 下一个 tick 后聚焦输入框
  setTimeout(() => {
    if (tagInputRef.value) {
      (tagInputRef.value as any).focus();
    }
  }, 10);
};

// 移除标签
const removeTag = (tag: string) => {
  const index = formData.tags.indexOf(tag);
  if (index !== -1) {
    formData.tags.splice(index, 1);
  }
};

// 表单引用
const formRef = ref<FormInstance>();

// 提交表单
const handleSubmit = async () => {
  try {
    if (!formRef.value) {
      Message.error('表单未挂载!');
      return;
    }
    const v = await formRef.value.validate();//获取校验结果;
    if (v != undefined) {
      Message.error('请检查表单输入内容');
    } else {
      // 不存在getFieldsValue方法;
      //const values = getFieldsValue();
      const values: passwordItemType = {
        id: 0, password: formData.password, remark: formData.remark,
        star: false, tags: [], title: formData.title, username: formData.username, website: formData.website
      }
      // 如果是编辑模式，保留原有ID
      if (props.isEdit && formData.id) {
        values.id = formData.id;
      } else {
        // 新增模式，生成新ID (实际应用中可能由后端生成)
        values.id = Date.now();
      }
      // 确保标签数组存在
      values.tags = formData.tags;
      // 确保星标状态存在
      values.star = formData.star;
      emit('submit', values);
      // 在父组件进行通知;
      //Message.success(`${props.isEdit ? '修改' : '添加'}密码成功`);
    }
  } catch (error) {
    console.error('表单验证失败', error);
    Message.error("表单校验失败");
  }
};

const inputPassword = ref();
// 取消操作
const handleCancel = () => {
  emit('cancel');

};

// 生成随机密码
const generateRandomPassword = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  formData.password = password;
  passwordVisible.value = false; // 显示生成的密码
};
</script>

<template>
  <div class="password-form">
    <!--    ps: 使用ref不需要加上v-bind(:) ref.value得到的是一个代理对象; -->
    <a-form :model="formData" :rules="rules" ref="formRef">
      <a-form-item field="title" label="标题">
        <a-input v-model="formData.title" placeholder="请输入标题"/>
      </a-form-item>

      <a-form-item field="username" label="用户名">
        <a-input v-model="formData.username" placeholder="请输入用户名"/>
      </a-form-item>

      <a-form-item field="password" label="密码">
        <a-input-password
            ref="inputPassword"
            v-model="formData.password"
            placeholder="请输入密码"
            :visibility="passwordVisible"
            @visibilityChange="(value: boolean) => passwordVisible = value"
        >
          <template #suffix>
            <a-button type="text" size="mini" @click="generateRandomPassword">
              <template #icon>
                <icon-refresh/>
              </template>
            </a-button>
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item field="website" label="网站">
        <a-input v-model="formData.website" placeholder="请输入网站地址"/>
      </a-form-item>

      <a-form-item field="remark" label="备注">
        <a-textarea v-model="formData.remark" placeholder="请输入备注信息"/>
      </a-form-item>

      <a-form-item field="tags" label="标签">
        <div class="tags-container">
          <a-tag
              v-for="tag in formData.tags"
              :key="tag"
              closable
              @close="removeTag(tag)"
              color="arcoblue"
              size="medium"
          >
            {{ tag }}
          </a-tag>

          <a-input
              v-if="tagInputVisible"
              ref="tagInputRef"
              v-model="tagInputValue"
              size="mini"
              style="width: 100px"
              @blur="handleInputConfirm"
              @press-enter="handleInputConfirm"
          />

          <a-tag
              v-else
              class="tag-add-button"
              @click="showTagInput"
          >
            <template #icon>
              <icon-plus/>
            </template>
            添加标签
          </a-tag>
        </div>
      </a-form-item>

      <a-form-item field="star">
        <a-checkbox v-model="formData.star">添加到收藏</a-checkbox>
      </a-form-item>

      <a-form-item>
        <a-space>
          <a-button type="primary" @click="handleSubmit">{{ props.isEdit ? '保存修改' : '添加密码' }}</a-button>
          <a-button @click="handleCancel">取消</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped lang="less">
.password-form {
  padding: 16px;

  .tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .tag-add-button {
      cursor: pointer;
      border-style: dashed;
    }
  }
}
</style>
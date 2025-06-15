<script setup lang="ts">
import {ref, computed} from 'vue';
import {useRouter} from "vue-router";
import type {favoriteItemType, passwordItemType, tagType} from "../../models/models.ts";

import {Message, Modal} from '@arco-design/web-vue';
import PasswordForm from '../../components/PasswordForm.vue';
import {genStorageUtil} from "../../utils";
import {useStorageClientStore} from "../../store/modules/storageClientStore.ts";
import {useLockStore} from "../../store/modules/lockStore.ts";
import {useListViewStore} from "../../store/modules/listview.ts";

const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    slotName: 'title',
    minWidth: 140,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    slotName: 'username',
    minWidth:250,
  },
  {
    title: '密码',
    dataIndex: 'password',
    slotName: 'password',
    minWidth:200,

  },
  {
    title: '网站',
    dataIndex: 'website',
    slotName: 'website',
  },
  {
    title: '备注',
    dataIndex: 'remark',
    slotName: 'remark',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    slotName: 'tags',
  },
  {
    title: '操作',
    dataIndex: 'actions',
    slotName: 'actions',
    align: 'center',
  },
];
const listViewStore = useListViewStore();
const storageClientStore = useStorageClientStore();
const lockStore = useLockStore();
const router = useRouter();
let s = genStorageUtil(storageClientStore.getPrefix).get<passwordItemType[]>('passwordList')!;
let u = genStorageUtil(storageClientStore.getPrefix).get<favoriteItemType[]>('favoriteList')!;
let v = genStorageUtil(storageClientStore.getPrefix).get<tagType[]>('tagList')!;
// 模拟密码数据
const passwordList = ref<passwordItemType[]>([...s]);
// 收藏列表
const favoriteList = ref<favoriteItemType[]>([
  ...u
]);
// 标签列表
const tagList = ref<tagType[]>([
  ...v
]);


// 切换密码收藏状态
const togglePasswordStar = (item: passwordItemType, toStar: boolean) => {
  // 查找密码项
  const index = passwordList.value.findIndex((p) => p.id === item.id);
  if (index === -1) return false;

  // 如果当前状态已经是目标状态，则不需要操作
  if (passwordList.value[index].star === toStar) {
    Message.info(`该密码${toStar ? '已经在' : '不在'}收藏列表中`);
    return false;
  }

  // 更新密码项的收藏状态
  passwordList.value[index].star = toStar;

  // 更新收藏列表
  if (toStar) {
    // 添加到收藏列表
    const favoriteItem: favoriteItemType = {
      id: item.id,
      username: item.username,
      title: item.title,
    };
    favoriteList.value.push(favoriteItem);
    Message.success('已添加到收藏');
  } else {
    // 从收藏列表中移除
    const favIndex = favoriteList.value.findIndex(f => f.id === item.id);
    if (favIndex !== -1) {
      favoriteList.value.splice(favIndex, 1);
      Message.success('已从收藏中移除');
    }
  }
  genStorageUtil(storageClientStore.getPrefix).set<favoriteItemType[]>('favoriteList', favoriteList.value);
  return true;
};

// 将密码加入收藏列表
const addPasswordToStarList = (item: passwordItemType) => {
  togglePasswordStar(item, true);
};

// 从收藏列表中移除密码
const removePasswordFromStarList = (item: passwordItemType) => {
  togglePasswordStar(item, false);
};


const defaultTheme = ref<string>("line");
const changeGlobalTheme = () => {
  defaultTheme.value = defaultTheme.value === 'line' ? 'deep' : 'line';
}
//跳转至系统设置页面;
const goSettingsView = () => {
  console.log("跳转至系统设置页面");
  router.push('/settings');
}
//打开密码回收站弹窗;
const openDeleteList = () => {
  console.log("打开密码回收站弹窗")
}
//退出登录;
const logout = () => {
  router.push("/");
}


// 抽屉可见性控制
const drawerVisible = ref(false);
const isEditMode = ref(false);
const currentEditPassword = ref<passwordItemType | null>(null);

// 添加新密码-打开新增密码弹窗;
const addPassword = () => {
  isEditMode.value = false;
  currentEditPassword.value = null;
  drawerVisible.value = true;
};

// 编辑密码
const editPassword = (item: passwordItemType) => {
  isEditMode.value = true;
  currentEditPassword.value = {...item};
  drawerVisible.value = true;
};

// 处理表单提交
const handleFormSubmit = (formData: passwordItemType) => {
  if (isEditMode.value) {
    console.log("选择更新密码 value:", formData);
    // 更新现有密码
    const index = passwordList.value.findIndex(item => item.id === formData.id);
    if (index !== -1) {
      passwordList.value[index] = formData;

      // 如果是收藏项，也需要更新收藏列表
      if (formData.star) {
        const favIndex = favoriteList.value.findIndex(item => item.id === formData.id);
        if (favIndex !== -1) {
          favoriteList.value[favIndex] = {
            id: formData.id,
            title: formData.title,
            username: formData.username
          };
        }
      }
      Message.success('密码已更新');

    }
  } else {
    console.log("新增密码 value:", formData);
    // 添加新密码
    passwordList.value.push(formData);
    // 如果设置了收藏，添加到收藏列表
    if (formData.star) {
      favoriteList.value.push({
        id: formData.id,
        title: formData.title,
        username: formData.username
      });
    }
    // 更新标签列表
    updateTagList();
    genStorageUtil(storageClientStore.getPrefix).set<passwordItemType[]>("passwordList", passwordList.value);
    genStorageUtil(storageClientStore.getPrefix).set<favoriteItemType[]>('favoriteList', favoriteList.value);
    Message.success('添加密码成功');
  }
  drawerVisible.value = false;
  // current置空;
  currentEditPassword.value = null;
};

// 关闭抽屉
const closeDrawer = () => {
  drawerVisible.value = false;
};

// 删除密码
const deletePassword = (item: passwordItemType) => {
  Modal.warning({
    title: '确认删除',
    content: `确定要删除「${item.title}」吗？此操作不可恢复。`,
    okText: '确认删除',
    cancelText: '取消',
    // 取消删除密码逻辑;
    onCancel: () => {
    },
    //确定删除密码逻辑;
    onOk: () => {
      // 从密码列表中删除
      const index = passwordList.value.findIndex(p => p.id === item.id);
      if (index !== -1) {
        passwordList.value.splice(index, 1);
      }

      // 如果在收藏列表中，也需要删除
      if (item.star) {
        const favIndex = favoriteList.value.findIndex(f => f.id === item.id);
        if (favIndex !== -1) {
          favoriteList.value.splice(favIndex, 1);
        }
      }

      genStorageUtil(storageClientStore.getPrefix).set<passwordItemType[]>("passwordList", passwordList.value);
      genStorageUtil(storageClientStore.getPrefix).set<favoriteItemType[]>('favoriteList', favoriteList.value);
      // 更新标签列表
      updateTagList();
      currentSelectedFavorite.value = null;
      currentSelectedTag.value = null;
      Message.success('密码已删除');
    }
  });
};

// 更新标签列表
const updateTagList = () => {
  // 创建一个Map来存储标签及其计数
  const tagMap = new Map<string, number>();
  tagMap.set('全部', passwordList.value.length);

  // 遍历所有密码项的标签
  passwordList.value.forEach(item => {
    item.tags.forEach(tag => {
      const count = tagMap.get(tag) || 0;
      tagMap.set(tag, count + 1);
    });
  });

  // 转换为标签列表格式
  tagList.value = Array.from(tagMap.entries()).map(([name, count]) => ({name, count}));
  genStorageUtil(storageClientStore.getPrefix).set<tagType[]>('tagList', tagList.value);
};

// 搜索功能-搜索关键字;
const searchKeyword = ref('');

const filteredPasswordList = computed(() => {
  if (!searchKeyword.value) {
    // 如果选择了标签，按标签筛选
    if (currentSelectedTag.value !== null) {
      const selectedTag = tagList.value[currentSelectedTag.value].name;
      if (selectedTag === '全部') {
        return passwordList.value;
      }
      return passwordList.value.filter(item => item.tags.includes(selectedTag));
    }
    // 如果选择了收藏，按收藏筛选
    else if (currentSelectedFavorite.value !== null) {
      const selectedFavoriteId = favoriteList.value[currentSelectedFavorite.value].id;
      return passwordList.value.filter(item => item.id === selectedFavoriteId);
    }
    // 当没有按标签筛选也没有按收藏筛选走的方式;
    return passwordList.value;
  }
  // 搜索关键词筛选 使用字符串的includes API;
  const keyword = searchKeyword.value.toLowerCase();
  return passwordList.value.filter(item =>
      item.title.toLowerCase().includes(keyword) ||
      item.username.toLowerCase().includes(keyword) ||
      item.website.toLowerCase().includes(keyword) ||
      item.remark.toLowerCase().includes(keyword) ||
      item.tags.some(tag => tag.toLowerCase().includes(keyword))
  );
});

// 处理搜索 搜索框表单Value绑定;
const handleSearch = (value: string) => {
  searchKeyword.value = value;
};

// 使用AI生成密码（示例函数）
const generateAIPassword = () => {
  console.log('使用AI生成密码');
  // 这里可以添加AI生成密码的逻辑
  //
};

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    console.log(`Copied: ${text}`);
  });
}

// 样式绑定;
const currentSelectedTag = ref<number | null>(null);
const currentSelectedFavorite = ref<number | null>(null);
const selectTag = (index: number) => {
  currentSelectedTag.value = index;
  currentSelectedFavorite.value = null;
}
const selectFavorite = (index: number) => {
  currentSelectedTag.value = null;
  currentSelectedFavorite.value = index;
}
const cancelTagAndFavoriteFilter = () => {
  // 都置为null;
  currentSelectedTag.value = null;
  currentSelectedFavorite.value = null;
}
</script>

<template>
  <div class="home-container">
    <!-- 左侧栏 -->
    <div class="left-panel">
      <!-- 标签栏卡片 -->
      <a-card class="tag-card" title="标签管理">
        <template #extra v-if="currentSelectedTag!=null">
          <a-tooltip content="当前是标签过滤状态生效中,点击可取消过滤~" position="rt">
            <icon-filter size="25" class="tag-filter-icon" @click="cancelTagAndFavoriteFilter"/>
          </a-tooltip>

        </template>
        <a-list>
          <a-list-item v-for="(tag,index) in tagList" :key="tag.name"
                       @click="selectTag(index)"
                       :class="{'tag-selected': currentSelectedTag===index, 'tag-list-item':currentSelectedTag!==index}"
          >
            <div class="tag-item">
              <span>{{ tag.name }}</span>
              <a-tag>{{ tag.count }}</a-tag>
            </div>
          </a-list-item>
        </a-list>
      </a-card>

      <!-- 收藏栏卡片 -->
      <a-card class="favorite-card" title="收藏密码">
        <template #extra v-if="currentSelectedFavorite!=null">
          <a-tooltip content="当前是收藏过滤状态生效中,点击可取消过滤~" position="rt">
            <icon-filter size="25" class="tag-filter-icon" @click="cancelTagAndFavoriteFilter"/>
          </a-tooltip>

        </template>
        <a-list>
          <a-list-item v-for="(item,index) in favoriteList" :key="item.id"
                       @click="selectFavorite(index)"
                       :class="{'favorite-selected': currentSelectedFavorite===index, 'favorite-list-item':currentSelectedFavorite!==index}"
          >
            <div class="favorite-item">
              <a-avatar shape="square" :style="{ backgroundColor: '#3370ff' }">{{ item.title.charAt(0) }}</a-avatar>
              <div class="favorite-info">
                <div class="favorite-title">{{ item.title }}</div>
                <div class="favorite-username">{{ item.username }}</div>
              </div>
            </div>
          </a-list-item>
        </a-list>
      </a-card>
    </div>

    <!-- 右侧密码卡片区域 -->
    <div class="right-panel">
      <a-card class="password-card">
        <template #title>
          <div class="right-panel-card-title" style="display: flex;gap:4vw;">
            <div class="password-card-title">密码管理</div>
            <div class="extra-search">
              <a-input-search
                  :style="{ width: '320px', display: 'inline-block' }"
                  placeholder="搜索..."
                  search-button
                  v-model="searchKeyword"
                  @search="handleSearch"
              />
            </div>
          </div>

        </template>

        <!--        Option-->
        <template #extra>
          <div class="password-card-actions">
            <a-tooltip content="点击前往个人中心">
              <a-button type="primary" @click="router.push('/userProfile')">
                <template #icon>
                  <icon-user/>
                </template>
                个人中心
              </a-button>
            </a-tooltip>
            <a-tooltip content="AI生成密码">
              <a-button type="primary" status="success" @click="generateAIPassword">
                <template #icon>
                  <icon-robot/>
                </template>
                AI生成密码
              </a-button>
            </a-tooltip>

            <a-tooltip content="添加新的密码">
              <a-button type="primary" @click="addPassword" :disabled="lockStore.getLockState">
                <template #icon>
                  <icon-plus/>
                </template>
                添加密码
              </a-button>
            </a-tooltip>

            <a-tooltip :content="lockStore.getLockState ? '解除锁定' : '锁定'">
              <a-button @click="lockStore.toggleLockState">
                <template #icon>
                  <icon-unlock v-if="lockStore.getLockState"/>
                  <icon-lock v-else/>
                </template>
                {{ lockStore.getLockState ? '解锁' : '锁定' }}
              </a-button>
            </a-tooltip>

            <a-tooltip :content="listViewStore.getViewState === 'card' ? '切换为列表视图' : '切换为卡片视图'">
              <a-button type="secondary" @click="listViewStore.toggleViewState" size="large" style="width: 80px">
                <template #icon>
                  <icon-bookmark v-if="listViewStore.getViewState === 'card'"/>
                  <icon-nav v-else/>
                </template>
              </a-button>
            </a-tooltip>

            <a-dropdown>
              <a-button type="primary">
                <template #icon>
                  <icon-more-vertical/>
                </template>
              </a-button>
              <template #content>
                <a-doption @click="changeGlobalTheme">
                  <template #icon>
                    <icon-location/>
                  </template>
                  <template #default>{{ defaultTheme === "line" ? '深色主题' : '浅色主题' }}</template>
                </a-doption>
                <a-doption @click="goSettingsView">
                  <template #icon>
                    <icon-settings/>
                  </template>
                  <template #default>系统设置</template>
                </a-doption>
                <a-doption @click="openDeleteList">
                  <template #icon>
                    <icon-delete/>
                  </template>
                  <template #default>回收站</template>
                </a-doption>
                <a-doption @click="logout">
                  <template #icon>
                    <icon-poweroff/>
                  </template>
                  <template #default>退出登录</template>
                </a-doption>
              </template>
            </a-dropdown>
          </div>
        </template>

        <div v-if="lockStore.getLockState"
             style="display: flex;flex-direction: column;justify-content: center;align-items: center">
          <div>
            <icon-lock size="300"/>
          </div>
          <div style="color:#86909c;font-family:'华文宋体',serif"><h3>当前处于锁定状态 无法对密码进行操作!</h3></div>

        </div>
        <div v-if="!lockStore.getLockState">
          <!-- 密码列表  不处于锁定状态-->
          <div class="password-list" v-if="filteredPasswordList.length!=0&& listViewStore.getViewState==='card'">
            <!--            卡片视图-->
            <a-card v-for="item in filteredPasswordList" :key="item.id"
                    class="password-item">
              <template #title>
                <div class="password-item-title">
                  <a-avatar shape="square" :style="{ backgroundColor: '#3370ff' }">{{ item.title.charAt(0) }}</a-avatar>
                  <span>{{ item.title }}</span>
                </div>
              </template>
              <template #extra>
                <a-space>
                  <a-button type="text" size="mini">
                    <template #icon>
                      <a-tooltip v-if="!item.star" content="收藏">
                        <icon-star @click="addPasswordToStarList(item)"/>
                      </a-tooltip>
                      <a-tooltip v-else content="取消收藏">
                        <icon-star-fill @click="removePasswordFromStarList(item)"/>
                      </a-tooltip>
                    </template>
                  </a-button>
                  <a-button type="text" size="mini">
                    <template #icon>
                      <a-tooltip content="复制">
                        <icon-copy/>
                      </a-tooltip>
                    </template>
                  </a-button>
                  <a-button type="text" size="mini" @click="editPassword(item)">
                    <template #icon>
                      <a-tooltip content="修改">
                        <icon-edit/>
                      </a-tooltip>
                    </template>
                  </a-button>
                  <a-button type="text" size="mini" status="danger" @click="deletePassword(item)">
                    <template #icon>
                      <a-tooltip content="删除">
                        <icon-delete/>
                      </a-tooltip>
                    </template>
                  </a-button>
                </a-space>
              </template>
              <div class="password-item-content">
                <div class="password-item-field">
                  <span class="field-label">用户名：</span>
                  <span class="field-value">{{ item.username }}</span>
                  <a-button type="text" size="mini">
                    <template #icon>
                      <icon-copy/>
                    </template>
                  </a-button>
                </div>
                <div class="password-item-field">
                  <span class="field-label">密码：</span>
                  <span class="field-value">{{ item.password }}</span>
                  <a-button type="text" size="mini">
                    <template #icon>
                      <icon-copy/>
                    </template>
                  </a-button>
                  <a-button type="text" size="mini">
                    <template #icon>
                      <icon-eye/>
                    </template>
                  </a-button>
                </div>


                <div class="password-item-field">
                  <span class="field-label">网站：</span>
                  <span class="field-value">{{ item.website }}</span>
                  <a-button type="text" size="mini">
                    <template #icon>
                      <icon-link/>
                    </template>
                  </a-button>
                </div>

                <div class="password-item-field">
                  <span class="field-label">备注：</span>
                  <span class="field-value">{{ item.remark }}</span>
                </div>
                <div class="password-item-tags">
                  <a-tag v-for="tag in item.tags" :key="tag" size="small" color="arcoblue">{{ tag }}</a-tag>
                </div>
              </div>
            </a-card>
          </div>

          <div v-if="filteredPasswordList.length!=0&& listViewStore.getViewState==='table'">
            <a-table
                :columns="columns"
                :data="filteredPasswordList"
                row-key="id"
                :pagination="false"
            >
              <template #title="{ record }">
                <div class="password-item-title">
                  <a-tag  color="arcoblue" :default-checked="true">{{ record.title }}</a-tag>

                </div>
              </template>

              <template #username="{ record }">
                <div class="field-wrapper">
                  {{ record.username }}
                  <a-button type="text" size="mini" @click="copyToClipboard(record.username)">
                    <icon-copy/>
                  </a-button>
                </div>
              </template>

              <template #password="{ record }">
                <div class="field-wrapper">
                  {{ record.password }}
                  <a-button type="text" size="mini" @click="copyToClipboard(record.password)">
                    <icon-copy/>
                  </a-button>
                  <a-button type="text" size="mini">
                    <icon-eye/>
                  </a-button>
                </div>
              </template>

              <template #website="{ record }">
                <div class="field-wrapper">
                  {{ record.website }}
                  <a-button type="text" size="mini">
                    <icon-link/>
                  </a-button>
                </div>
              </template>

              <template #remark="{ record }">
                {{ record.remark }}
              </template>

              <template #tags="{ record }">
                <div class="password-item-tags">
                  <a-tag
                      v-for="tag in record.tags"
                      :key="tag"
                      size="small"
                      color="arcoblue"
                  >
                    {{ tag }}
                  </a-tag>
                </div>
              </template>

              <template #actions="{ record }">
                <a-space>
                  <a-button type="text" size="mini">
                    <template #icon>
                      <a-tooltip v-if="!record.star" content="收藏">
                        <icon-star @click="addPasswordToStarList(record)"/>
                      </a-tooltip>
                      <a-tooltip v-else content="取消收藏">
                        <icon-star-fill @click="removePasswordFromStarList(record)"/>
                      </a-tooltip>
                    </template>
                  </a-button>
                  <a-button type="text" size="mini" @click="editPassword(record)">
                    <template #icon>
                      <a-tooltip content="修改">
                        <icon-edit/>
                      </a-tooltip>
                    </template>
                  </a-button>
                  <a-button type="text" size="mini" status="danger" @click="deletePassword(record)">
                    <template #icon>
                      <a-tooltip content="删除">
                        <icon-delete/>
                      </a-tooltip>
                    </template>
                  </a-button>
                </a-space>
              </template>
            </a-table>
          </div>
          <!--          空密码视图-->
          <div class="empty-list" v-else>
            <div style="margin-top:1vh"><img src="https://password-xl.cn/assets/empty-Dnhuoe9-.svg" alt="none.svg">
            </div>
            <div v-if="searchKeyword!==''"><h3>未查找到相关密码</h3></div>
            <div v-else>
              <div><h2>当前暂无密码存储</h2></div>
              <div>
                <a-button type="primary" size="large" style="border-radius: 15px" @click="addPassword">添加我的第一个密码
                </a-button>
              </div>
            </div>
          </div>
        </div>

      </a-card>
    </div>

    <!-- 添加/编辑密码抽屉 -->
    <a-drawer
        :visible="drawerVisible"
        :width="500"
        :title="isEditMode ? '编辑密码' : '添加密码'"
        :hide-cancel="true"
        @cancel="closeDrawer"
        :footer="false"
    >
      <!--使用v-if 每个表单都是全新表单;-->
      <PasswordForm
          v-if="drawerVisible"
          :is-edit="isEditMode"
          :password-data="currentEditPassword"
          @submit="handleFormSubmit"
          @cancel="closeDrawer"
      />
    </a-drawer>
  </div>
</template>

<style scoped lang="less">
.tag-filter-icon {
  transition: all 0.1s;
}

.tag-filter-icon:hover {
  cursor: pointer;
  box-shadow: 1px 1px 1px #CB272D;
  color: #CB272D;
}

.empty-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1vh;

}

.favorite-selected {
  background-color: #7BE188;
}

.tag-selected {
  background-color: #57A9FB;
}

.favorite-list-item {
  transition: all 0.1s;
}

.favorite-list-item:hover {
  background-color: rgba(123, 225, 136, 0.45);

  cursor: pointer;
}

.tag-list-item {
  transition: all 0.1s;
}

.tag-list-item:hover {
  background-color: rgba(137, 233, 224, 0.85);
  cursor: pointer;
}

.home-container {
  display: flex;
  gap: 16px;
  padding: 15px;
  height: 100%;
  box-sizing: border-box;

  .left-panel {
    width: 280px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: 100%;

    .tag-card,
    .favorite-card {
      width: 100%;
      display: flex;
      flex-direction: column;
      background-color: rgba(255, 255, 255, 0.9);
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    .tag-card {
      flex: 1;
      background-color: rgba(255, 255, 255, 0.9);
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

      :deep(.arco-card-body) {
        overflow-y: auto;
        max-height: calc(50vh - 80px);
      }

      .tag-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }
    }

    .favorite-card {
      flex: 1;

      :deep(.arco-card-body) {
        overflow-y: auto;
        max-height: calc(50vh - 80px);
      }

      .favorite-item {
        display: flex;
        align-items: center;

        gap: 12px;

        .favorite-info {
          display: flex;
          flex-direction: column;

          .favorite-title {
            font-weight: bold;
          }

          .favorite-username {
            font-size: 12px;
            color: var(--color-text-3);
          }
        }
      }
    }
  }

  .right-panel {
    flex: 1;
    height: 100%;

    .password-card {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      background-color: rgba(255, 255, 255, 0.9);
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

      :deep(.arco-card-body) {
        flex: 1;
        overflow-y: auto;
      }

      .password-card-title {
        font-size: 16px;
        font-weight: bold;
      }

      .password-card-actions {
        display: flex;
        gap: 8px;
        position: relative;
      }

      .password-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 16px;
        margin-top: 16px;
        overflow-y: auto;
        max-height: calc(100vh - 180px);

        .password-item {
          border-radius: 10px;
          border: 1px solid var(--color-border-2);
          transition: all 0.2s;

          &:hover {
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }

          .password-item-title {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .password-item-content {
            display: flex;
            flex-direction: column;
            gap: 8px;

            .password-item-field {
              display: flex;
              align-items: center;

              .field-label {
                width: 60px;
                color: var(--color-text-3);
              }

              .field-value {
                flex: 1;
                margin-right: 8px;
              }
            }

            .password-item-tags {
              margin-top: 8px;
              display: flex;
              gap: 4px;
              flex-wrap: wrap;
            }
          }
        }
      }
    }
  }
}
</style>
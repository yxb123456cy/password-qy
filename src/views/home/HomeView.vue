<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from "vue-router";
import type {favoriteItemType, passwordItemType, tagType} from "../../models/models.ts";

const router = useRouter();
// 模拟密码数据
const passwordList = ref<passwordItemType[]>([
  {
    id: 1,
    title: '个人邮箱',
    remark: "个人邮箱密码",
    username: 'user1@example.com',
    password: '********',
    website: 'mail.example.com',
    tags: ['邮箱', '个人'],
    star: true,
  },
  {
    id: 2,
    title: '工作邮箱',
    remark: "工作邮箱密码",
    username: 'work@company.com',
    password: '********',
    website: 'mail.company.com',
    tags: ['邮箱', '工作'],
    star: false,
  },
  {
    id: 3,
    title: 'GitHub',
    remark: "Github密码",
    username: 'devuser',
    password: '********',
    website: 'github.com',
    tags: ['开发', '工具'],
    star: true,
  },
  {
    id: 4,
    title: '社交媒体',
    remark: "个人社交媒体网站密码",
    username: 'socialuser',
    password: '********',
    website: 'social.example.com',
    tags: ['社交', '娱乐'],
    star: false,
  },
]);
// 收藏列表
const favoriteList = ref<favoriteItemType[]>([
  {id: 1, title: '个人邮箱', username: 'user1@example.com'},
  {id: 3, title: 'GitHub', username: 'devuser'},
]);
// 标签列表
const tagList = ref<tagType[]>([
  {name: '全部', count: 4},
  {name: '邮箱', count: 2},
  {name: '工作', count: 1},
  {name: '开发', count: 1},
  {name: '社交', count: 1},
  {name: '娱乐', count: 1},
  {name: '个人', count: 1},
]);
const passwordListView = ref<string>("card");

import {Message} from '@arco-design/web-vue';

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

const changePasswordListView = () => {
  passwordListView.value = passwordListView.value === 'card' ? 'table' : 'card';
}


const defaultTheme = ref<string>("line");
const changeGlobalTheme = () => {
  defaultTheme.value = defaultTheme.value === 'line' ? 'deep' : 'line';
}
//跳转至系统设置页面;
const goSettingsView = () => {
  console.log("跳转至系统设置页面")
}
//打开密码回收站弹窗;
const openDeleteList = () => {
  console.log("打开密码回收站弹窗")
}
//退出登录;
const logout = () => {
  router.push("/");
}


// 是否锁定密码卡片
const isLocked = ref(false);

// 切换锁定状态
const toggleLock = () => {
  isLocked.value = !isLocked.value;
};

// 添加新密码（示例函数）
const addPassword = () => {
  console.log('添加新密码');
  // 这里可以添加弹窗或导航到添加密码的页面
  // 打开新增密码的抽屉;
};

// 使用AI生成密码（示例函数）
const generateAIPassword = () => {
  console.log('使用AI生成密码');
  // 这里可以添加AI生成密码的逻辑
  //
};
</script>

<template>
  <div class="home-container">
    <!-- 左侧栏 -->
    <div class="left-panel">
      <!-- 标签栏卡片 -->
      <a-card class="tag-card" title="标签管理">
        <a-list>
          <a-list-item v-for="tag in tagList" :key="tag.name">
            <div class="tag-item">
              <span>{{ tag.name }}</span>
              <a-tag>{{ tag.count }}</a-tag>
            </div>
          </a-list-item>
        </a-list>
      </a-card>

      <!-- 收藏栏卡片 -->
      <a-card class="favorite-card" title="收藏密码">
        <a-list>
          <a-list-item v-for="item in favoriteList" :key="item.id">
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
              <a-input-search :style="{ width: '320px', display: 'inline-block' }" placeholder="搜索..." search-button/>
            </div>
          </div>

        </template>

        <!--        Option-->
        <template #extra>
          <div class="password-card-actions">
            <a-tooltip content="点击前往个人中心">
              <a-button type="primary">
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
              <a-button type="primary" @click="addPassword" :disabled="isLocked">
                <template #icon>
                  <icon-plus/>
                </template>
                添加密码
              </a-button>
            </a-tooltip>

            <a-tooltip :content="isLocked ? '解除锁定' : '锁定'">
              <a-button @click="toggleLock">
                <template #icon>
                  <icon-unlock v-if="isLocked"/>
                  <icon-lock v-else/>
                </template>
                {{ isLocked ? '解锁' : '锁定' }}
              </a-button>
            </a-tooltip>

            <a-tooltip :content="passwordListView === 'card' ? '切换为列表视图' : '切换为卡片视图'">
              <a-button type="secondary" @click="changePasswordListView" size="large" style="width: 80px">
                <template #icon>
                  <icon-bookmark v-if="passwordListView === 'card'"/>
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

        <!-- 密码卡片列表 -->
        <div class="password-list">
          <a-card v-for="item in passwordList" :key="item.id" class="password-item">
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
                <a-button type="text" size="mini">
                  <template #icon>
                    <a-tooltip content="修改">
                      <icon-edit/>
                    </a-tooltip>
                  </template>
                </a-button>
                <a-button type="text" size="mini" status="danger">
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
      </a-card>
    </div>
  </div>
</template>

<style scoped lang="less">
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
    }

    .tag-card {
      flex: 1;

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
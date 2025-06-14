import {LoginTypes} from "../../config/constants/constants.ts";
import {Message} from "@arco-design/web-vue";
import type User from "../../models/user/user.ts";
import defaultStorageUtil from "../../utils/modules/LocalStorageUtil.ts";
import type {favoriteItemType, passwordItemType, tagType} from "../../models/models.ts";

export const initialize = (loginType: string) => {
    console.log(loginType);
    if (!LoginTypes.includes(loginType)) {
        Message.error("存储方式错误,请重新选择");
    } else {
        // 进行初始化数据操作;
        const defaultUser: User = {
            username: '轻叶',
            email: 'zhangsan@example.com',
            avatar: 'https://th.bing.com/th/id/OIP.NHJWTOPxa3ZQmW99bQp2EQHaHa?rs=1&pid=ImgDetMain',
            phone: '13800138000',
            createTime: new Date().toString(),
            lastLoginTime: new Date().toString()
        }
        // 模拟密码数据
        const passwordList: passwordItemType[] = [
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
        ];

        const favoriteList: favoriteItemType[] = [
            {id: 1, title: '个人邮箱', username: 'user1@example.com'},
            {id: 3, title: 'GitHub', username: 'devUser'},
        ];
        const tagList: tagType[] = [
            {name: '全部', count: 4},
            {name: '邮箱', count: 2},
            {name: '工作', count: 1},
            {name: '开发', count: 1},
            {name: '社交', count: 1},
            {name: '娱乐', count: 1},
            {name: '个人', count: 1},
        ];
        if (defaultStorageUtil.get<User>("user") === null && defaultStorageUtil.get<passwordItemType[]>("passwordList") === null
            && defaultStorageUtil.get<favoriteItemType[]>("favoriteList") === null &&
            defaultStorageUtil.get<tagType[]>("tagList") === null
        ) {
            defaultStorageUtil.set<User>('user', defaultUser);
            defaultStorageUtil.set<passwordItemType[]>('passwordList', passwordList);
            defaultStorageUtil.set<favoriteItemType[]>('favoriteList', favoriteList);
            defaultStorageUtil.set<tagType[]>('tagList', tagList);
        }

    }
}
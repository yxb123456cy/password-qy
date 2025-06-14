/**
 * 使用localStorage进行数据存储;
 */
// storage.ts


export class LocalStorageUtil {
    private readonly prefix: string;


    /**
     * 构造函数;  可选参数 prefix 命名空间前缀;
     * @param prefix
     */
    constructor(prefix: string = 'app_') {
        this.prefix = prefix;
    }

    /**
     * 获取键;
     * @param key
     * @private
     */
    private getKey(key: string): string {
        return `${this.prefix}${key}`;
    }

    /**
     * 设置键值对;
     * @param key
     * @param value
     */
    set<T>(key: string, value: T): void {
        try {
            const json = JSON.stringify(value);
            localStorage.setItem(this.getKey(key), json);
        } catch (error) {
            console.error(`localStorage set error for key: ${key}`, error);
        }
    }

    /**
     * 获取value;
     * @param key
     */
    get<T>(key: string): T | null {
        try {
            const json = localStorage.getItem(this.getKey(key));
            if (!json) return null;
            // 类型断言为T;
            return JSON.parse(json) as T;
        } catch (error) {
            console.error(`localStorage get error for key: ${key}`, error);
            return null;
        }
    }

    /**
     * 删除键值对
     * @param key 键;
     */
    remove(key: string): void {
        try {
            localStorage.removeItem(this.getKey(key));
        } catch (error) {
            console.error(`localStorage remove error for key: ${key}`, error);
        }
    }

    clear(): void {
        try {
            const keysToRemove: string[] = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);// 根据索引获取key;
                //而且是删除指定前缀（命名空间）下的key;
                if (key && key.startsWith(this.prefix)) {
                    keysToRemove.push(key);
                }
            }
            // 循环遍历删除;
            keysToRemove.forEach(key => localStorage.removeItem(key));
        } catch (error) {
            console.error('localStorage clear error', error);
        }
    }
}

const defaultStorageUtil = new LocalStorageUtil("password_qy_");

export default defaultStorageUtil;

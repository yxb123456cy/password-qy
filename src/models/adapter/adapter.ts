// 所有存储平台的连接测试适配器

const test_connect_str: string = 'test_connect_str';
// 1. 通用接口
import {genStorageUtil} from "../../utils";

export interface IStorageAdapter {
    testConnection(config: Record<string, any>): Promise<boolean>;
}

// 2. 阿里云 OSS


export class AliYunOSSAdapter implements IStorageAdapter {
    async testConnection(config: { accessKeyId: string; accessKeySecret: string; region: string; bucket: string }) {
        console.log(config);

        return true;
    }
}

// 3. 华为云 OBS (伪代码)
export class HuaweiCloudAdapter implements IStorageAdapter {
    async testConnection(config: { accessKey: string; secretKey: string; region: string; bucket: string }) {
        console.log(config);
        return true;
    }
}

// 4. 腾讯云 COS


export class TencentCOSAdapter implements IStorageAdapter {
    async testConnection(config: { secretId: string; secretKey: string; region: string; bucket: string }) {
        console.log(config);
        return true;
    }
}

// 5. 百度云 BOS (伪代码)
export class BaiduCloudAdapter implements IStorageAdapter {
    async testConnection(config: { ak: string; sk: string; bucket: string; endpoint: string }) {
        // 使用百度 BOS SDK
        console.log(config);
        return true;
    }
}

// 6. 七牛云 Kodo

export class QiniuKodoAdapter implements IStorageAdapter {
    async testConnection(config: { ak: string; sk: string; bucket: string; region: string }) {
        console.log(config);
        return true;
    }
}

// 7. Linux 服务器 (伪代码)
export class LinuxServerAdapter implements IStorageAdapter {
    async testConnection(config: { ip: string; username: string; password: string }) {
        // 建议使用服务端中转 SSH 测试连接
        console.log(config);
        return true;
    }
}

// 8. SpringBoot API
export class SpringBootApiAdapter implements IStorageAdapter {
    async testConnection(config: { username: string; password: string }) {
        console.log(config);
        return true;
    }
}

// 9. 浏览器本地缓存
export class LocalCacheAdapter implements IStorageAdapter {
    async testConnection(config: { prefix: string }) {
        console.log("命名空间前缀:", config.prefix);
        // 调用LocalStorageUtil的方法进行测试;
        const storageUtil = genStorageUtil(config.prefix);
        storageUtil.set<string>('test', test_connect_str);
        const res = storageUtil.get<string>('test');
        return res === test_connect_str;
    }
}

// 10. Supabase
export class SupabaseAdapter implements IStorageAdapter {
    async testConnection(config: { url: string; apiKey: string }) {
        console.log(config);
        return true;
    }
}

// 11. MinIO (使用 S3 SDK)
export class MinioAdapter implements IStorageAdapter {
    async testConnection(config: { endpoint: string; accessKey: string; secretKey: string }) {
        console.log(config);
        return true;
    }
}

// 12. Redis
export class RedisAdapter implements IStorageAdapter {
    async testConnection(config: { host: string; port: number; password?: string }) {
        console.log(config);
        return true;
    }
}

// 工厂
export class StorageAdapterFactory {
    static getAdapter(platform: string): IStorageAdapter {
        switch (platform) {
            case 'aliyun-oss':
                return new AliYunOSSAdapter();
            case 'huawei-cloud':
                return new HuaweiCloudAdapter();
            case 'tencent-cos':
                return new TencentCOSAdapter();
            case 'baidu-cloud':
                return new BaiduCloudAdapter();
            case 'qiniu-kodo':
                return new QiniuKodoAdapter();
            case 'linux-server':
                return new LinuxServerAdapter();
            case 'springboot-api':
                return new SpringBootApiAdapter();
            case 'localCache':
                return new LocalCacheAdapter();
            case 'supabase':
                return new SupabaseAdapter();
            case 'minio':
                return new MinioAdapter();
            case 'etcd':
                return new LocalCacheAdapter(); // TODO: 替换为 EtcdAdapter
            case 'redis':
                return new RedisAdapter();
            default:
                throw new Error(`未知平台：${platform}`);
        }
    }
}

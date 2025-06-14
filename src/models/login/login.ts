export type LoginPlatform =
    | 'aliyun-oss'
    | 'huawei-cloud'
    | 'tencent-cos'
    | 'baidu-cloud'
    | 'qiniu-kodo'
    | 'linux-server'
    | 'springboot-api'
    | 'localCache'
    | 'supabase'
    | 'minio'
    | 'etcd'
    | 'redis';

export interface LoginFormMap {
    'aliyun-oss': { accessKeyId: string; accessKeySecret: string; bucket: string; region: string };
    'huawei-cloud': { accessKey: string; secretKey: string; bucket: string; region: string };
    'tencent-cos': { secretId: string; secretKey: string; bucket: string; region: string };
    'baidu-cloud': { ak: string; sk: string; bucket: string; endpoint: string };
    'qiniu-kodo': { ak: string; sk: string; bucket: string; region: string };
    'linux-server': { ip: string; username: string; password: string };
    'springboot-api': { username: string; password: string };
    'localCache': { prefix: string };
    'supabase': { url: string; apiKey: string };
    'minio': { endpoint: string; accessKey: string; secretKey: string };
    'etcd': { endpoint: string; username?: string; password?: string };
    'redis': { host: string; port: number; password?: string };
}

export const defaultFormMap: Record<LoginPlatform, Record<string, any>> = {
    'aliyun-oss': {
        accessKeyId: '',
        accessKeySecret: '',
        bucket: '',
        region: '',
    },
    'huawei-cloud': {
        accessKey: '',
        secretKey: '',
        bucket: '',
        region: '',
    },
    'tencent-cos': {
        secretId: '',
        secretKey: '',
        bucket: '',
        region: '',
    },
    'baidu-cloud': {
        ak: '',
        sk: '',
        bucket: '',
        endpoint: '',
    },
    'qiniu-kodo': {
        ak: '',
        sk: '',
        bucket: '',
        region: '',
    },
    'linux-server': {
        ip: '',
        username: '',
        password: '',
    },
    'springboot-api': {
        username: '',
        password: '',
    },
    'localCache': {
        prefix: '',
    },
    'supabase': {
        url: '',
        apiKey: '',
    },
    'minio': {
        endpoint: '',
        accessKey: '',
        secretKey: '',
    },
    'etcd': {
        endpoint: '',
        username: '',
        password: '',
    },
    'redis': {
        host: '',
        port: 6379,
        password: '',
    },
};


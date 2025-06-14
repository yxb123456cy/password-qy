import {defineStore} from "pinia";
import {computed, ref} from "vue";
import type {LoginPlatform} from "../../models/login/login.ts";

export const useStorageClientStore = defineStore('storageClient', () => {
    const LoginPlatform = ref<LoginPlatform | null>(null)
    const getLoginPlatform = computed(() => LoginPlatform.value!);
    const StorageClient = ref<any>(null);
    const getStorageClient = computed(() => StorageClient.value);
    const prefix = ref<string>("");
    const getPrefix = computed(() => prefix.value);

    function setPrefix(p: string) {
        prefix.value = p;
    }

    function setLoginPlatform(p: LoginPlatform | null) {
        LoginPlatform.value = p;
    }

    function setStorageClient(client: any) {
        StorageClient.value = client;
    }

    return {
        LoginPlatform, setLoginPlatform, getLoginPlatform, getStorageClient, setStorageClient,
        setPrefix, prefix, getPrefix
    }
})
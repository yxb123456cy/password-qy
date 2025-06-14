import {defineStore} from "pinia";
import {computed, ref} from "vue";
import type {LoginPlatform} from "../../models/login/login.ts";
import {createClient, SupabaseClient} from "@supabase/supabase-js";

export const useStorageClientStore = defineStore('storageClient', () => {
    const LoginPlatform = ref<LoginPlatform | null>(null)
    const getLoginPlatform = computed(() => LoginPlatform.value!);
    const StorageClient = ref<any>(null);
    const getStorageClient = computed(() => StorageClient.value);
    const prefix = ref<string>("");
    const getPrefix = computed(() => prefix.value);
    const supaBaseClient = ref<SupabaseClient | null>(null);

    const defaultSupaBaseClient = ref<SupabaseClient | null>(null);

    function setDefaultSupaBaseClient(url: string, apiKey: string) {
        defaultSupaBaseClient.value = createClient(url, apiKey);
    }

    const getDefaultSupaBaseClient = computed(() => defaultSupaBaseClient.value);

    function setSupaBaseClient(url: string, apiKey: string) {
        supaBaseClient.value = createClient(url, apiKey);
    }

    const getSupaBaseClient = computed(() => supaBaseClient.value);

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
        setPrefix, prefix, getPrefix, setSupaBaseClient, getSupaBaseClient,
        setDefaultSupaBaseClient,getDefaultSupaBaseClient
    }
},{
    persist: true,
})
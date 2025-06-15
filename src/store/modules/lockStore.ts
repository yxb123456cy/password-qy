import {defineStore} from 'pinia';
import {computed, ref} from "vue";


export const useLockStore = defineStore('lock', () => {
    const lockState = ref<boolean>(false); //默认为false;

    const getLockState = computed(() => lockState.value);

    function toggleLockState() {
        lockState.value = !lockState.value;
    }


    return {
        lockState,
        toggleLockState,
        getLockState
    }
}, {
    persist: true,
})
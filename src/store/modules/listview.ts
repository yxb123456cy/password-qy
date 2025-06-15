import {defineStore} from 'pinia';
import {computed, ref} from "vue";


export const useListViewStore = defineStore('listView', () => {
    const viewState = ref<string>("card"); //默认为card-卡片形式;

    const getViewState = computed(() => viewState.value);

    function toggleViewState() {
        viewState.value = viewState.value === 'card' ? 'table' : 'card';
    }

    return {
        viewState,
        toggleViewState,
        getViewState
    }
}, {
    // 持久化存储;
    persist: true,
})
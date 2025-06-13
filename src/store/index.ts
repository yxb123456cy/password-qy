import {createPinia} from 'pinia'
/**
 *启用pinia持久化插件;
 */
import persistedState from 'pinia-plugin-persistedstate'

const pinia = createPinia();
pinia.use(persistedState);
export default pinia;
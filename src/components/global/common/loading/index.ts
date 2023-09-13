import { ref } from 'vue'
const isShow = ref(false);
export default function useLoading() {


    const showLoading = (value: boolean): void => {
        isShow.value = value
    }

    return {
        showLoading,
        isShow
    }
}
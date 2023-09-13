<template>
    <div v-if="isShow"
        class="absolute top-0 left-0 overflow-hidden bg-slate-400 h-screen w-full opacity-50 z-50 flex items-center justify-center">
        <Spinner class="h-10 w-10" />
    </div>
</template>

<script setup lang="ts">
import Spinner from '../../icons/Spinner.vue';
import useLoading from '.';

const {
    isShow } = useLoading();
</script>
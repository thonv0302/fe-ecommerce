<template>
    <VeeForm class="space-y-6" v-slot="{ errors }" @submit="onLogin">
        <div>
            <label for="pastedUrl" class="block text-sm text-gray-700">
                Paste image URL
            </label>
            <div class="mt-1">
                <VeeField id="pastedUrl" name="pastedUrl" type="text" autocomplete="pastedUrl" rules="required" :class="[
                    'block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
                    {
                        'ring-red-500 border-red-500': errors.pastedUrl,
                        ' focus:ring-indigo-500 focus:border-indigo-500': !errors.pastedUrl,
                    },
                ]" />
                <ErrorMessage name="pastedUrl" class="mt-2 text-sm text-red-600" />
            </div>
        </div>
    </VeeForm>
</template>

<script setup lang="ts">
const onLogin = () => {

}
</script>
<template>
    <div :class="['mt-2 flex ' + calcAlignment]">
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm">
            <a href="#" aria-current="page"
                class="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">1</a>
            <a href="#"
                class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">2</a>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const props = defineProps({
    alignment: {
        type: String,
        default: 'right'
    },
    totalRecords: {
        type: Number,
        default: 1,
    },
    pageRange: {
        type: Number,
        default: 5
    }
})

const route = useRoute();

const calcAlignment = computed(() => {
    const mapClass = {
        'left': 'justify-start',
        'right': 'justify-end',
        'center': 'justify-center',
    }

    return mapClass[props.alignment]
})

const currentPage = computed(() => {
    return +route.query.page || 1
})

const pageSize = computed(() => {
    return +route.query.limit || 5
})

const totalPages = computed(() => {
    return Math.ceil(props.totalRecords / pageSize.value)
})

const pagination = computed(() => {
    let middle = Math.ceil(props.pageRange / 2);

    //-- Min of page range
    let min = currentPage.value - middle + 1;

    //-- Max of page range
    let max = min + props.pageRange - 1;

    if (min < 1) {
        min = 1;
        max = props.pageRange
    }

    if (max > totalPages.value) {
        max = totalPages.value
        min = max - props.pageRange + 1 >= 1 ? max - props.pageRange + 1 : 1;
    }

    let arr = [];
    //-- Convert min max to array to v-for
    for (let i = min; i <= max; i++) {
        arr.push(i);
    }

    return arr;
})

</script>
<template>
    <div class="a">
        <el-button type="success" @click="confirm">确认</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: '123'
        };
    },
    methods: {
        confirm() {
            console.log('confirm');
        }
    }
};
</script>

<style>

</style>
<script setup lang="ts">
import { ref } from 'vue'
    const date = ref('');
    const show = ref(false);

    const formatDate = (date: Date) => `${date.getMonth() + 1}/${date.getDate()}`;
    const onConfirm = (values: [Date, Date]) => {
      const [start, end] = values;
      show.value = false;
      date.value = `${formatDate(start)} - ${formatDate(end)}`;
    };
</script>

<template>
  <!-- AppLayout: มี NavBar/Sidebar/Spacing -->
  <section>
    <h2 class="text-2xl font-bold text-blue-500 text-center">Calendar</h2>
    
    <van-divider :style="{ borderColor: '#1989fa' }" />
    <van-notice-bar scrollable text="กรุณาเลือกวันที่" left-icon="info-o" color="#ffffff" background="#1989fa"/>
        <van-cell title="เลือกวันที่" :value="date" @click="show = true" />
        <van-calendar v-model:show="show" type="range" @confirm="onConfirm" />
    <van-divider :style="{ borderColor: '#1989fa' }" />
  </section>
</template>

<style scoped>

</style>

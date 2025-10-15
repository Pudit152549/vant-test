<template>
  <router-view />
</template>


<script setup lang="ts">
import liff from '@line/liff';
import { onMounted } from 'vue';

const LIFF_ID = '2008291244-OWyLQ4Wa';
onMounted(async () => {
  try {
    await liff.init({ liffId: LIFF_ID });
      const profile = await liff.getProfile();
      console.log(profile);
    } catch (error) {
      console.log(error, error);
      console.error('LIFF initialization failed', error);
  }
});
</script>

<style scoped>
</style>

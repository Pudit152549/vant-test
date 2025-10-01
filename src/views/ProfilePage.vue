<script setup lang="ts">
import { ref } from 'vue'
import { showDialog, showToast } from 'vant'
import { useRouter } from 'vue-router'

const router = useRouter()
type contactInfo = {
  name: string
  tel: string
}
// ข้อมูลโปรไฟล์
const tel = ref('13000000000')
const name = ref('John Snow')
const onEdit = () => showToast('edit')

// Logout dialog
const onLogout = () => {
  showDialog({
    title: 'Notification',
    message: 'Are you sure you want to logout?',
    showCancelButton: true,
  })
    .then(() => router.push('/')) // กลับไปหน้า Login
    .catch(() => {})
}
    const editingContact = ref({
      tel: '',
      name: '',
    });
    const onSave = (contactInfo: contactInfo, _index: number) => showToast('Save' + contactInfo.name + contactInfo.tel);
</script>

<template>
  <!-- AppLayout: มี NavBar/Sidebar/Spacing -->
  <section>
    <h2 class="text-2xl font-bold text-blue-500 text-center">Profile Setting</h2>
    <van-divider :style="{ borderColor: '#1989fa' }" />

    <div class="my-4">
      <van-row justify="center">
        <van-image
          round
          width="10rem"
          height="10rem"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
      </van-row>
    </div>
      <van-contact-card type="edit" :tel="tel" :name="name" @click="onEdit" />
    <!-- <div class="w-full h-auto">
      <van-contact-edit
      is-edit
      :contact-info="editingContact"
      @save="onSave"
    />
    </div> -->
    <van-divider :style="{ borderColor: '#1989fa' }" />

    <div class="mt-4 px-4">
      <van-row justify="center">
        <van-button type="danger" size="small" @click="onLogout">Logout</van-button>
      </van-row>
    </div>
  </section>
</template>

<style scoped>
/* หน้านี้ไม่ต้องมีสไตล์ NavBar/Sidebar */
</style>

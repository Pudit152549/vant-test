<script setup lang="ts">
import { ref } from 'vue'
import { showDialog, showToast } from 'vant'
import { useRouter } from 'vue-router'

const router = useRouter()
// state สำหรับสลับ view
const isEditing = ref(false)

// เก็บข้อมูล contact ที่แก้ไข
const editingContact = ref({
  name: 'John Snow',
  tel: '13000000000',
})

const onEdit = () => {
  isEditing.value = true
}

const onSave = (contactInfo: { name: string; tel: string }) => {
  editingContact.value = { ...contactInfo }
  showToast(`Saved ${contactInfo.name} ${contactInfo.tel}`)
  isEditing.value = false
}

const onCancel = () => {
  isEditing.value = false
}

const onLogout = () => {
  showDialog({
    title: 'Notification',
    message: 'Are you sure you want to logout?',
    showCancelButton: true,
  })
    .then(() => router.push('/')) // กลับไปหน้า Login
    .catch(() => {})
}
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
          fit="cover"
          position="top"
          src="https://i.pinimg.com/736x/8c/cf/1a/8ccf1a558b9f4b4d01f1b928c7566e04.jpg"
        />
      </van-row>
    </div>
    <template v-if="!isEditing">
      <van-contact-card
        type="edit"
        :tel="editingContact.tel"
        :name="editingContact.name"
        @click="onEdit"
      />
    </template>

    <!-- ถ้าแก้ไข แสดงฟอร์ม -->
    <template v-else>
      <van-contact-edit
        is-edit
        :contact-info="editingContact"
        @save="onSave"
        @cancel="onCancel"
      />
    </template>
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

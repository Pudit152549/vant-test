<!-- src/views/FriendPage.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { showToast } from 'vant'

type Contact = {
  id: string
  name: string
  tel: string
  isDefault?: boolean
}
const search = ref('')

const chosenContactId = ref('1')

const list = ref([
  { id: '1', name: 'John Snow', tel: '13000000000', isDefault: true },
  { id: '2', name: 'Ned Stark',  tel: '1310000000' },
  { id: '3', name: 'Arya Stark', tel: '1320000000' },
  { id: '4', name: 'Sansa Snow', tel: '1330000000' },
  { id: '5', name: 'Bran Stark', tel: '1340000000' },
])

const onAdd = () => showToast('Add')

const onEdit = (contact: Contact, _index: number) => {
  showToast('Edit ' + contact.id)
}
const onSelect = (contact: Contact, _index: number) => {
  showToast('Select ' + contact.id)
}
</script>

<template>
  <!-- AppLayout จะห่อหน้านี้ให้เอง -->
  <section>
    <h2 class="text-2xl font-bold text-blue-500 text-center">Friends</h2>
    <van-divider :style="{ borderColor: '#1989fa' }" />
    <div class="px-4">
    <van-search v-model="search" placeholder="ค้นหาเพื่อน" />
    </div>
    <van-divider :style="{ borderColor: '#1989fa' }" />
    <van-contact-list
    v-model="chosenContactId"
        :list="list"
        default-tag-text="default"
        :add-button-text="null"
        @edit="onEdit"
        @select="onSelect"
    />
        <div class="px-4 py-3">
      <van-button type="primary" block round @click="onAdd">
        เพิ่มผู้ติดต่อ
      </van-button>
    </div>
    <van-divider :style="{ borderColor: '#1989fa' }" />
  </section>
</template>

<style scoped>
:deep(.van-contact-list__bottom) {
  display: none !important;
}
</style>

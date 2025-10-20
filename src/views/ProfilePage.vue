<script setup lang="ts">
import { ref } from 'vue'
import { showDialog, showToast } from 'vant'
//import { useRouter } from 'vue-router'
import liff from '@line/liff'
import { useProfileStore } from '../stores/profile'
import type { Contact, ProfileForm } from '../stores/profile'

// ===== Store =====
const profile = useProfileStore()
const form = profile.form

// ===== Router =====
//const router = useRouter()
const onLogout = () => {
  showDialog({
    title: 'LOGOUT',
    message: 'Are you sure you want to logout?',
    showCancelButton: true,
  })
    .then(() => {
      // ถ้าอยู่ใน LIFF และล็อกอินอยู่ → ออกจากระบบ
      if (liff.isLoggedIn()) {
        liff.logout()
        liff.login({ redirectUri: window.location.href })
      }
      // จากนั้นพาออกไปหน้าแรก/หน้า login (เลือกอันใดอันหนึ่ง)
      // 1) reload ทั้งแอป (แนะนำใน LIFF)
      // window.location.reload()

      // 2) หรือ redirect ไปหน้าแรก
      //router.replace('/')

      // 3) หรือถ้าต้องการให้ขึ้นหน้า login ของ LINE ทันทีหลัง logout:
      // liff.login({ redirectUri: window.location.href })
    })
    .catch(() => {
      console.log('Logout cancelled')
    })
}

// ===== Contact =====
const onAddContact = () => showToast('add')
const onEditContact = () => profile.startEditContact()
const onSaveContact = (c: Contact) => {
  profile.saveContact(c)
  showToast(`Saved ${c.name} ${c.tel}`)
}
const onCancelContact = () => profile.cancelContact()

// ===== Form actions =====
const showTel = ref(false)
const showAge = ref(false)
const showPicker = ref(false)
const pickerValue = ref<string[]>([])

const onConfirmBirth = ({ selectedValues }: { selectedValues: string[] }) => {
  form.birthDate = selectedValues.join('/')
  pickerValue.value = selectedValues
  showPicker.value = false
}

const onSubmit = async (values: Record<string, string>) => {
  const required = ['firstname', 'lastname', 'tel', 'age', 'gender', 'birthDate']
  const complete = required.every(k => values[k])

  if (!complete) {
    showToast('กรุณากรอกข้อมูลให้ครบ')
    return
  }

  profile.saveForm({ ...profile.form } as ProfileForm)

  await showDialog({
    title: 'แจ้งเตือน',
    message: 'บันทึกข้อมูลสำเร็จ ✅',
  })
}

const onEditForm = () => profile.unlockForm()
</script>

<template>
  <section>
    <h2 class="text-2xl font-bold text-blue-500 text-center">Profile Setting</h2>
    <van-divider :style="{ borderColor: '#1989fa' }" />

    <!-- Avatar -->
    <div class="my-4">
      <van-row justify="center">
        <img 
          v-if="profile.form.pictureUrl"
          :src="profile.form.pictureUrl"
          alt="Profile"
          class="w-[10rem] h-[10rem] rounded-full object-cover"
        />
      </van-row>
    </div>

    <!-- Contact -->
    <div class="my-2">
      <van-contact-card type="add" @click="onAddContact" />
      <template v-if="!profile.isEditingContact">
        <van-contact-card
          type="edit"
          :tel="profile.contact.tel"
          :name="profile.contact.name"
          @click="onEditContact"
        />
      </template>
      <template v-else>
        <van-contact-edit
          is-edit
          :contact-info="profile.contact"
          @save="onSaveContact"
          @cancel="onCancelContact"
        />
      </template>
    </div>

    <!-- Form -->
    <div class="my-4">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field v-model="form.userId" label="User ID" readonly />
          <van-field v-model="form.displayName" label="Username" readonly />

          <van-field v-model="form.firstname" label="Firstname" :disabled="profile.isFormLocked" />
          <van-field v-model="form.lastname" label="Lastname" :disabled="profile.isFormLocked" />

          <van-field
            v-model="form.tel"
            label="Telephone"
            :readonly="true"
            :clickable="!profile.isFormLocked"
            :disabled="profile.isFormLocked"
            @touchstart.stop="!profile.isFormLocked && (showTel = true)"
          />
          <van-number-keyboard
            v-model="form.tel"
            :show="showTel && !profile.isFormLocked"
            close-button-text="Close"
            @blur="showTel = false"
            :maxlength="10"
          />

          <van-field label="Gender" :disabled="profile.isFormLocked">
            <template #input>
              <van-radio-group v-model="form.gender" direction="horizontal" shape="dot">
                <van-radio name="1" checked-color="#1808f6">Male</van-radio>
                <van-radio name="2" checked-color="#1808f6">Female</van-radio>
              </van-radio-group>
            </template>
          </van-field>

          <van-field
            v-model="form.birthDate"
            is-link
            readonly
            label="Birth Date"
            @click="!profile.isFormLocked && (showPicker = true)"
          />
          <van-popup v-model:show="showPicker" position="bottom">
            <van-date-picker
              :model-value="pickerValue"
              @confirm="onConfirmBirth"
              @cancel="showPicker = false"
            />
          </van-popup>

          <van-field
            v-model="form.age"
            label="Age"
            :readonly="true"
            :clickable="!profile.isFormLocked"
            :disabled="profile.isFormLocked"
            @touchstart.stop="!profile.isFormLocked && (showAge = true)"
          />
          <van-number-keyboard
            v-model="form.age"
            :show="showAge && !profile.isFormLocked"
            close-button-text="Close"
            @blur="showAge = false"
            :maxlength="2"
          />
        </van-cell-group>

        <div style="margin: 16px;">
          <van-button v-if="!profile.isFormLocked" round block type="primary" native-type="submit">
            Save
          </van-button>

          <van-button v-else round block type="default" @click="onEditForm">
            Edit
          </van-button>
        </div>
      </van-form>
    </div>

    <van-divider :style="{ borderColor: '#1989fa' }" />
    <div class="mt-4 px-4">
      <van-row justify="center">
        <van-button type="danger" size="small" @click="onLogout">Logout</van-button>
      </van-row>
    </div>
  </section>
</template>

<style scoped></style>

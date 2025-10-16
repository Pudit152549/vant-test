<!-- src/views/ProfilePage.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { showDialog, showToast } from 'vant'
import { useRouter } from 'vue-router'
import { useProfileStore } from '../stores/profile'
import type { Contact, ProfileForm } from '../stores/profile'

// ===== Store =====
const profile = useProfileStore()

// ===== Router / Dialogs =====
const router = useRouter()
const onLogout = () => {
  showDialog({
    title: 'Notification',
    message: 'Are you sure you want to logout?',
    showCancelButton: true,
  })
    .then(() => router.push('/'))
    .catch(() => {})
}

// ===== Contact card (แยกจากฟอร์ม) =====
const onAddContact = () => showToast('add')
const onEditContact = () => profile.startEditContact()
const onSaveContact = (contactInfo: Contact) => {
  profile.saveContact(contactInfo)
  showToast(`Saved ${contactInfo.name} ${contactInfo.tel}`)
}
const onCancelContact = () => profile.cancelContact()

// ===== ฟอร์ม (อ้างอิงจาก store โดยตรง) =====
const form = profile.form

// UI states
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

  // ✅ save แล้ว lock ฟอร์ม (และ persist อัตโนมัติ)
  profile.saveForm({ ...profile.form } as ProfileForm)

  await showDialog({
    title: 'แจ้งเตือน',
    message: 'บันทึกข้อมูลสำเร็จ ✅',
  })
}

// ปุ่ม Edit เพื่อปลดล็อกฟอร์ม
const onEditForm = () => profile.unlockForm()
</script>

<template>
  <section>
    <h2 class="text-2xl font-bold text-blue-500 text-center">Profile Setting</h2>
    <van-divider :style="{ borderColor: '#1989fa' }" />

    <!-- Avatar -->
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

    <!-- ===== CONTACT SECTION (แยกจากฟอร์ม) ===== -->
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

    <!-- ===== FORM SECTION ===== -->
    <div class="my-4">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="form.userId"
            name="User ID"
            label="User ID"
            placeholder="User ID"
            :disabled="profile.isFormLocked"
            :rules="[{ required: true, message: 'User ID is required' }]"
          />
          <van-field
            v-model="form.displayName"
            name="Displayname"
            label="Username"
            placeholder="UserName"
            :disabled="profile.isFormLocked"
            :rules="[{ required: true, message: 'Username is required' }]"
          />

          <van-field
            v-model="form.firstname"
            name="firstname"
            label="Firstname"
            placeholder="Firstname"
            :disabled="profile.isFormLocked"
            :rules="[{ required: true, message: 'Firstname is required' }]"
          />
          <van-field
            v-model="form.lastname"
            name="lastname"
            label="Lastname"
            placeholder="Lastname"
            :disabled="profile.isFormLocked"
            :rules="[{ required: true, message: 'Lastname is required' }]"
          />

          <van-field
            v-model="form.tel"
            name="tel"
            label="Telephone"
            placeholder="Telephone"
            :readonly="true"
            :clickable="!profile.isFormLocked"
            :disabled="profile.isFormLocked"
            @touchstart.stop="!profile.isFormLocked && (showTel = true)"
            :rules="[{ required: true, message: 'Telephone is required' }]"
          />
          <van-number-keyboard
            v-model="form.tel"
            :show="showTel && !profile.isFormLocked"
            close-button-text="Close"
            @blur="showTel = false"
            :maxlength="10"
          />

          <van-field name="gender" label="Gender" :disabled="profile.isFormLocked">
            <template #input>
              <van-radio-group v-model="form.gender" direction="horizontal" shape="dot">
                <van-radio name="1" checked-color="#1808f6" :disabled="profile.isFormLocked">Male</van-radio>
                <van-radio name="2" checked-color="#1808f6" :disabled="profile.isFormLocked">Female</van-radio>
              </van-radio-group>
            </template>
          </van-field>

          <van-field
            v-model="form.birthDate"
            name="birthDate"
            is-link
            readonly
            label="Birth Date"
            placeholder="Select date"
            :disabled="profile.isFormLocked"
            @click="!profile.isFormLocked && (showPicker = true)"
          />
          <van-popup v-model:show="showPicker" destroy-on-close position="bottom">
            <van-date-picker
              :model-value="pickerValue"
              @confirm="onConfirmBirth"
              @cancel="showPicker = false"
            />
          </van-popup>

          <van-field
            v-model="form.age"
            name="age"
            label="Age"
            placeholder="Age"
            :readonly="true"
            :clickable="!profile.isFormLocked"
            :disabled="profile.isFormLocked"
            @touchstart.stop="!profile.isFormLocked && (showAge = true)"
            :rules="[{ required: true, message: 'Age is required' }]"
          />
          <van-number-keyboard
            v-model="form.age"
            :show="showAge && !profile.isFormLocked"
            close-button-text="Close"
            @blur="showAge = false"
            :maxlength="2"
          />
        </van-cell-group>

        <!-- Save/Lock & Edit/Unlock -->
        <div style="margin: 16px;">
          <van-button
            v-if="!profile.isFormLocked"
            round
            block
            type="primary"
            native-type="submit"
          >
            Save
          </van-button>

          <van-button
            v-else
            round
            block
            type="default"
            @click="onEditForm"
          >
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

<style scoped>
/* ไม่มีสไตล์ layout ที่นี่ เพราะ AppLayout จัดการให้แล้ว */
</style>

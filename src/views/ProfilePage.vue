<script setup lang="ts">
import { ref } from 'vue'
import { showDialog, showToast } from 'vant'
import { useRouter } from 'vue-router'

const router = useRouter()
// state สำหรับสลับ view
const isEditing = ref(false)
const onAdd = () => showToast('add')
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

const onDelete = () => {
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

const showTel = ref(false)
const tel = ref('');
const age = ref('');
const firstname = ref('');
const lastname = ref('');
const result = ref('');
    const showPicker = ref(false);
    const pickerValue = ref<string[]>([]);
    const onConfirm = ({ selectedValues }: { selectedValues: string[] }) => {
      result.value = selectedValues.join('/');
      pickerValue.value = selectedValues;
      showPicker.value = false;
    };
const checked = ref('')
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
    <div class="my-2">
      <van-contact-card type="add" @click="onAdd" />
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
          @cancel="onDelete"
        />
      </template>
    </div>
    <div class="my-4">
      <van-cell-group inset>
        <van-field v-model="firstname" label="Firstname" placeholder="Firstname" />
        <van-field v-model="lastname" label="Lastname" placeholder="Lastname" />
        <van-field v-model="tel" readonly clickable @touchstart.stop="showTel = true"
          name="Telephone"
          label="Telephone"
          placeholder="Telephone" />
        <van-number-keyboard
            v-model="tel"
            :show="showTel"
            close-button-text="Close"
            @blur="showTel = false"
            :maxlength="10"
          />
        <van-field name="gender" label="Gender">
          <template #input>
            <van-radio-group v-model="checked" direction="horizontal" shape="dot">
              <van-radio name="1" checked-color="#1808f6">Male</van-radio>
              <van-radio name="2" checked-color="#1808f6">Female</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          v-model="result"
          is-link
          readonly
          name="birthDate"
          label="Birth Date"
          placeholder="Select date"
          @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" destroy-on-close position="bottom">
          <van-date-picker
            :model-value="pickerValue"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>
        <van-field v-model="age" name="age" label="Age" placeholder="Age" />
      </van-cell-group>
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
/* หน้านี้ไม่ต้องมีสไตล์ NavBar/Sidebar */
</style>

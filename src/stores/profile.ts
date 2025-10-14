import { defineStore } from 'pinia'

export type Contact = {
  name: string
  tel: string
}

export type ProfileForm = {
  firstname: string
  lastname: string
  tel: string
  gender: '1' | '2' | ''
  birthDate: string
  age: string  // เก็บเป็น string เพื่อเข้ากับ van-number-keyboard
}

export const useProfileStore = defineStore('profile', {
  state: () => ({
    contact: {
      name: 'John Snow',
      tel: '13000000000',
    } as Contact,

    isEditingContact: false,

    // ข้อมูลฟอร์ม (ของแบบฟอร์มรายละเอียด)
    form: {
      firstname: '',
      lastname: '',
      tel: '',
      gender: '',
      birthDate: '',
      age: '',
    } as ProfileForm,

    // ล็อก/ปลดล็อกฟอร์ม (true = disabled ทั้งหมด)
    isFormLocked: false,
  }),

  actions: {
    // ===== Contact actions =====
    startEditContact() {
      this.isEditingContact = true
    },
    saveContact(payload: Contact) {
      this.contact = { ...payload }
      this.isEditingContact = false
    },
    cancelContact() {
      this.isEditingContact = false
    },

    // ===== Form actions =====
    unlockForm() {
      this.isFormLocked = false
    },
    lockForm() {
      this.isFormLocked = true
    },
    saveForm(payload: ProfileForm) {
      this.form = { ...payload }
      this.lockForm()
    },
    // ตัวอย่าง: reset ฟอร์ม (หากอยากมี)
    resetForm() {
      this.form = {
        firstname: '',
        lastname: '',
        tel: '',
        gender: '',
        birthDate: '',
        age: '',
      }
    },
  },
})

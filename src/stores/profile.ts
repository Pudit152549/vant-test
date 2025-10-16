// src/stores/profile.ts
import { defineStore } from 'pinia'
import { useStorage, StorageSerializers } from '@vueuse/core'

export type Contact = {
  name: string
  tel: string
}

export type ProfileForm = {
  userId: string
  displayName: string
  firstname: string
  lastname: string
  tel: string
  gender: '1' | '2' | ''
  birthDate: string
  age: string // เก็บ string ให้เข้ากับ van-number-keyboard
}

export const useProfileStore = defineStore('profile', {
  state: () => ({
    // ✅ persist ฟอร์มด้วย useStorage: เขียน/อ่านจาก localStorage อัตโนมัติ
    form: useStorage<ProfileForm>(
      'profileUser',
      {
        userId: '',
        displayName: '',
        firstname: '',
        lastname: '',
        tel: '',
        gender: '',
        birthDate: '',
        age: '',
      },
      undefined,
      { serializer: StorageSerializers.object }
    ),

    // ✅ (optional) persist contact ด้วยก็ได้
    contact: useStorage<Contact>(
      'profileContact',
      { name: 'John Snow', tel: '13000000000' },
      undefined,
      { serializer: StorageSerializers.object }
    ),

    isEditingContact: false,

    // ล็อก/ปลดล็อกฟอร์ม (true = disabled ทั้งหมด)
    isFormLocked: false,
  }),

  actions: {
    // ===== Contact actions =====
    startEditContact() {
      this.isEditingContact = true
    },
    saveContact(payload: Contact) {
      this.contact = { ...payload } // useStorage จะเขียนลง localStorage ให้อัตโนมัติ
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
      this.form = { ...payload } // useStorage จะ persist ให้ทันที
      this.lockForm()
    },
    resetForm() {
      this.form = {
        userId: '',
        displayName: '',
        firstname: '',
        lastname: '',
        tel: '',
        gender: '',
        birthDate: '',
        age: '',
      }
      this.isFormLocked = false
    },
  },
})

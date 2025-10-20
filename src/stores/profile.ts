import { defineStore } from 'pinia'
import { useStorage, StorageSerializers } from '@vueuse/core'

export type Contact = {
  name: string
  tel: string
}

export type ProfileForm = {
  userId: string
  displayName: string
  pictureUrl: string
  firstname: string
  lastname: string
  tel: string
  gender: '1' | '2' | ''
  birthDate: string
  age: string
}

export const useProfileStore = defineStore('profile', {
  state: () => ({
    form: useStorage<ProfileForm>(
      'profileUser',
      {
        userId: '',
        displayName: '',
        pictureUrl: '',
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

    contact: useStorage<Contact>(
      'profileContact',
      { name: 'John Snow', tel: '13000000000' },
      undefined,
      { serializer: StorageSerializers.object }
    ),

    isEditingContact: false,
    isFormLocked: false,
    _formSnapshot: null as ProfileForm | null,
  }),

  actions: {
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

    unlockForm() {
      // เก็บ snapshot ก่อนแก้ไข
      this._formSnapshot = typeof structuredClone === 'function'
        ? structuredClone(this.form)
        : JSON.parse(JSON.stringify(this.form))
      this.isFormLocked = false
    },
    lockForm() {
      this.isFormLocked = true
    },
    saveForm(payload?: ProfileForm) {
      if (payload) this.form = { ...payload }
      this.isFormLocked = true
      this._formSnapshot = null // บันทึกแล้วไม่ต้องเก็บ snapshot ต่อ
    },
    cancelForm() {
      // ถ้ามี snapshot ให้ย้อนกลับ
      if (this._formSnapshot) {
        this.form = typeof structuredClone === 'function'
          ? structuredClone(this._formSnapshot)
          : JSON.parse(JSON.stringify(this._formSnapshot))
      }
      this.isFormLocked = true
      this._formSnapshot = null
    },
    resetForm() {
      this.form = {
        userId: '',
        displayName: '',
        pictureUrl: '',
        firstname: '',
        lastname: '',
        tel: '',
        gender: '',
        birthDate: '',
        age: '',
      }
      this.isFormLocked = false
      this._formSnapshot = null
    },
  },
})

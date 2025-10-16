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
  age: string
}

export const useProfileStore = defineStore('profile', {
  state: () => ({
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

    contact: useStorage<Contact>(
      'profileContact',
      { name: 'John Snow', tel: '13000000000' },
      undefined,
      { serializer: StorageSerializers.object }
    ),

    isEditingContact: false,
    isFormLocked: false,
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
      this.isFormLocked = false
    },
    lockForm() {
      this.isFormLocked = true
    },
    saveForm(payload: ProfileForm) {
      this.form = { ...payload }
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

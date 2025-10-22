// src/lib/LineLiff.ts
import liff from '@line/liff'
import { useProfileStore } from '@/stores/profile'

let initialized = false

export async function initLiff(liffId: string) {
  if (initialized) return
  await liff.init({ liffId })
  initialized = true
}

export async function loadUserProfile(liffId: string) {
  const profileStore = useProfileStore()

  try {
    // 1) init LIFF
    await initLiff(liffId)

    // 2) ถ้ายังไม่ได้ล็อกอิน → ไปหน้า login
    if (!liff.isLoggedIn()) {
      liff.login({ redirectUri: window.location.origin + '/password' })
      return
    }

    // 3) ดึงโปรไฟล์จาก LINE
    const profile = await liff.getProfile()

    // 4) เก็บค่าลง Pinia store
    profileStore.form.userId = profile.userId
    profileStore.form.displayName = profile.displayName
    profileStore.form.pictureUrl = profile.pictureUrl || ''

    console.log('✅ LINE Profile Loaded:', profile)
  } catch (err) {
    console.error('❌ LIFF init or getProfile failed:', err)
  }
}

export function logoutAndRelogin() {
  if (liff.isLoggedIn()) {
    liff.logout()
    window.location.reload()
    liff.login({ redirectUri: window.location.origin + '/password' })
  }
}

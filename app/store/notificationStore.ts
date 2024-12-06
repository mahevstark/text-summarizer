import { create } from 'zustand'

export type NotificationType = 'success' | 'error'
export enum NotificationTypes {
  success = 'success',
  error = 'error'
}

interface NotificationState {
  message: string
  title: string
  type: NotificationType
  isVisible: boolean
  showNotification: (type: NotificationType, title: string, msg?: string) => void
  hideNotification: () => void

}

export const useNotificationStore = create<NotificationState>((set) => ({
  message: '',
  title: '',
  type: 'success',
  isVisible: false,
  showNotification: (type, title, msg) => {
    set({ type, title, message: msg ?? "", isVisible: true })
    setTimeout(() => {
      set({ isVisible: false })
    }, 3000)
  },
  hideNotification: () => set({ isVisible: false }),
})) 
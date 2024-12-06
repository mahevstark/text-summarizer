import { create } from 'zustand'

export type NotificationType = 'success' | 'error'

interface NotificationState {
  message: string
  title: string
  type: NotificationType
  isVisible: boolean
  showNotification: (message: string, title: string, type: NotificationType) => void
  hideNotification: () => void

}

export const useNotificationStore = create<NotificationState>((set) => ({
  message: '',
  title: '',
  type: 'success',
  isVisible: false,
  showNotification: (message, title, type) => {
    set({ message, title, type, isVisible: true })
    setTimeout(() => {
      set({ isVisible: false })
    }, 3000)
  },
  hideNotification: () => set({ isVisible: false }),
})) 
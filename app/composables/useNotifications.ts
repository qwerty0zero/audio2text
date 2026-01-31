import { ref } from 'vue'

export interface Notification {
    id: number
    text: string,
    title?: string,
    duration: number
    icon?: string
}

const notifications = ref<Notification[]>([])
let idCounter = 0

export function useNotifications() {
    const notify = (text: string, title?: string, duration: number = 3000, icon?: string) => {
        const id = idCounter++
        const notification: Notification = { id, text, title, duration, icon}

        notifications.value.push(notification)

    }

    const remove = (id: number) => {
        const index = notifications.value.findIndex(n => n.id === id);
        if (index > -1) {
            notifications.value.splice(index, 1);
        }
    }

    return {
        notifications,
        notify,
        remove
    }
}
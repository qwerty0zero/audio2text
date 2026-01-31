export const useAnchorScroll = () => {
    const route = useRoute()
    const router = useRouter()

    const scrollToAnchor = (hash: string) => {
        const targetId = hash.replace(/^#/, '')
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })

            router.push({
                path: route.path,
                query: route.query,
                hash: `#${targetId}`
            })
        }
    }

    return {
        scrollToAnchor
    }
}
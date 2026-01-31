const elementCache = new Map<string, HTMLElement | null>();

export const useAnchorScroll = () => {
    const route = useRoute()
    const router = useRouter()

    const scrollToAnchor = (hash: string) => {
        if (import.meta.server) return;

        const targetId = hash.replace(/^#/, '')

        if (!targetId) return;

        let targetElement = elementCache.get(targetId);
        if (!targetElement && targetElement !== null) {
            targetElement = document.getElementById(targetId);
            elementCache.set(targetId, targetElement);
        }

        if (targetElement) {
            requestAnimationFrame(() => {
                targetElement!.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            });

            const currentHash = route.hash?.replace(/^#/, '');
            if (currentHash !== targetId) {
                router.push({
                    path: route.path,
                    query: route.query,
                    hash: `#${targetId}`
                });
            }
        }
    }

    return {
        scrollToAnchor
    }
}
const observerCache = new Map<string, IntersectionObserver>();

function getObserver(rootMargin: string): IntersectionObserver {
    const key = rootMargin;

    if (!observerCache.has(key)) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target as HTMLElement;
                    el.classList.add('active_animation');
                    observer.unobserve(el);
                }
            });
        }, {
            threshold: 0.01,
            rootMargin
        });

        observerCache.set(key, observer);
    }

    return observerCache.get(key)!;
}

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('observe-visibility', {
        mounted(el: HTMLElement) {
            if (typeof window === 'undefined' || !window.IntersectionObserver) return;

            requestAnimationFrame(() => {
                const offsetValue = el.dataset.offset || '0';
                const delayValue = el.dataset.delay;

                if (delayValue) {
                    el.style.transitionDelay = /^\d+$/.test(delayValue)
                        ? `${delayValue}ms`
                        : delayValue;
                }

                const rootMargin = `0px 0px -${offsetValue}% 0px`;
                const observer = getObserver(rootMargin);

                observer.observe(el);
                (el as any)._observer = observer;
            });
        },

        unmounted(el: HTMLElement) {
            const observer = (el as any)._observer as IntersectionObserver | undefined;
            if (observer) {
                observer.unobserve(el);
            }
        },

        getSSRProps() {
            return {};
        }
    });
});
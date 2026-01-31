export const useSmoothScroll = () => {
    const lenisOptions = {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    }

    return {
        lenisOptions
    }
}
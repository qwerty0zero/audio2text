export type PriceKey = 'basic' | 'pro' | 'business'

export const prices: Record<PriceKey, number> = {
    basic: 0,
    pro: 990,
    business: 2490,
};
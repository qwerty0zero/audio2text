import { computed, watch } from 'vue'
import { useRoute, useRouter, useCookie, useState } from '#app'

const RATES = {
    RUB: 1,
    USD: 0.011,
    EUR: 0.010,
    PLN: 0.044
} as const;

const CURRENCIES = {
    USD: { code: 'USD', symbol: '$', locale: 'en-US' },
    EUR: { code: 'EUR', symbol: '€', locale: 'de-DE' },
    PLN: { code: 'PLN', symbol: 'zł', locale: 'pl-PL' },
    RUB: { code: 'RUB', symbol: '₽', locale: 'ru-RU' },
} as const;

const ALL_CURRENCIES = Object.values(CURRENCIES);

type CurrencyCode = keyof typeof CURRENCIES;

export const useCurrency = () => {
    const route = useRoute()
    const router = useRouter()

    const currencyCookie = useCookie<CurrencyCode | null>('currency', {
        maxAge: 365 * 24 * 60 * 60,
    })

    const currency = useState<CurrencyCode>('currency_state', () => currencyCookie.value || 'USD')

    const setCurrency = (code: CurrencyCode) => {
        currency.value = code
        currencyCookie.value = code
        if (route.query.currency === code) return
        router.replace({ query: { ...route.query, currency: code } })
    }

    const detectCurrency = () => {
        const queryCurrency = route.query.currency as string
        if (queryCurrency && CURRENCIES[queryCurrency as CurrencyCode]) {
            if (currency.value !== queryCurrency) setCurrency(queryCurrency as CurrencyCode)
            return
        }

        let targetCurrency: CurrencyCode = 'USD'
        if (currencyCookie.value) {
            targetCurrency = currencyCookie.value
        } else if (import.meta.client) {
            const userLang = navigator.language.toLowerCase()
            if (userLang.includes('pl')) targetCurrency = 'PLN'
            else if (userLang.includes('ru') || userLang.includes('be')) targetCurrency = 'RUB'
            else if (userLang.includes('de') || userLang.includes('fr')) targetCurrency = 'EUR'
            setCurrency(targetCurrency)
        }
    }

    watch(() => route.query.currency, (newVal, oldVal) => {
        if (newVal === oldVal) return;

        if (typeof newVal === 'string' && newVal in CURRENCIES) {
            const validCode = newVal as CurrencyCode
            if (currency.value !== validCode) {
                currency.value = validCode
                currencyCookie.value = validCode
            }
        }
    })

    const convertAndFormat = (basePrice: number) => {
        if (typeof basePrice !== 'number' || isNaN(basePrice)) return '';

        const code = currency.value;

        const rate = RATES[code];
        const convertedValue = basePrice * rate;

        const finalValue = Math.ceil(convertedValue);

        const config = CURRENCIES[code];
        return new Intl.NumberFormat(config.locale, {
            style: 'currency',
            currency: config.code,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(finalValue);
    }

    return {
        currency: computed(() => currency.value),
        allCurrencies: ALL_CURRENCIES,
        setCurrency,
        detectCurrency,
        convertAndFormat
    }
}
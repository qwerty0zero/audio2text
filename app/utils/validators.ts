export const required = (msg: string) => (val: string) =>
    (val && val.length > 0) || msg;

export const minLength = (min: number, msg: string) => (val: string) =>
    (val && val.length >= min) || msg;

export const emailFormat = (msg: string) => (val: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(val) || msg;
};

export const nameFormat = (msg: string) => (val: string) => {
    const regex = /^[a-zA-Zа-яА-ЯёЁ]+$/;
    return regex.test(val) || msg;
};
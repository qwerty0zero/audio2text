import { useModal } from '~/composables/useModal';
import {useNotifications} from "~/composables/useNotifications";

const { notify } = useNotifications()

const handleLogin = () => {
    const { open } = useModal();
    open('login');
};

const handleSignup = () => {
    const { open } = useModal();
    open('signup');
};

const handlStartForFree = () => {
    handleLogin()
}

const handleChoosePlan = () => {
    handleLogin()
}

const handleContactUs = () => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    if (isMobile) {
        const footer = document.getElementById('footer');

        if (footer)
            footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
         else
            console.warn('Элемент #footer не найден для скролла');

    } else {
        const { open } = useModal();
        open('contact');
    }
};

const handleDownload = () => {
    const text = "Hello, this is an example file!";
    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'example.txt';
    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
};

const handleShare = async () => {
    const shareData = {
        title: 'Audio2Text',
        text: 'Check out this cool project!',
        url: window.location.href
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            await navigator.clipboard.writeText(window.location.href);
            notify('Ссылка скопирована в буфер обмена', '',2000)
        }
    } catch (err) {
        console.error('Share failed:', err);
    }
};

const handleRegisterSubmit = async (formData: any) => {
    const { close } = useModal();
    close()
    console.log('[Handler] Registration Start', formData);
    notify('Регистрация прошла успешно', '',2000)
};

const handleLogInSubmit = async (formData: any) => {
    const { close } = useModal();
    close()
    console.log('[Handler] Login Start', formData);
    notify('Вход успешен', '',2000)
};

const handleUserContactSubmit = async (formData: any) => {
    const { close } = useModal();
    close()
    console.log('[Handler] User send data', formData);
    notify('Сообщение отправленно', '',2000)
};

const handleSocialLogin = (provider: 'google' | 'apple') => {
    const { close } = useModal();
    close()
    console.log(`[Handler] Social Login via ${provider}`);
};



export const handlers = {
    logIn: handleLogin,
    signUp: handleSignup,

    contactUs: handleContactUs,

    register: handleRegisterSubmit,
    loginSubmit: handleLogInSubmit,
    socialLogin: handleSocialLogin,

    sendMessage :handleUserContactSubmit,

    downloadExample: handleDownload,
    shareExample: handleShare,

    startForFree: handlStartForFree,
    choosePlan: handleChoosePlan
};
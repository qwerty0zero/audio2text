import type { ModalType } from '~/core/actions/types';

export const useModal = () => {
    const isOpen = useState<boolean>('modal_is_open', () => false);
    const currentModal = useState<ModalType>('modal_current', () => null);

    const open = (type: ModalType) => {
        currentModal.value = type;
        isOpen.value = true;
    };

    const close = () => {
        isOpen.value = false;
        setTimeout(() => {
            currentModal.value = null;
        }, 300);
    };

    return {
        isOpen,
        currentModal,
        open,
        close
    };
};
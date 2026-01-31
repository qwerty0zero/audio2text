export type ActionType =
    | 'logIn'
    | 'signUp'
    | 'contactUs'
    | 'downloadExample'
    | 'shareExample'
    | 'register'
    | 'loginSubmit'
    | 'socialLogin'
    | 'sendMessage'
    | 'startForFree'
    | 'choosePlan';

export type ModalType = 'login' | 'signup' | 'contact' | null;

export interface IActionDispatcher {
    dispatch(action: ActionType, payload?: any): Promise<void> | void
    }
import type { ActionType } from './types';
import { handlers } from './handlers';

export const actionDispatcher = {
    dispatch(action: ActionType, payload?: any): void | Promise<void> {
        const handler = handlers[action];

        if (!handler) {
            console.warn(`[ActionDispatcher] No handler found for action: ${action}`);
            return;
        }

        return handler(payload);
    }
};
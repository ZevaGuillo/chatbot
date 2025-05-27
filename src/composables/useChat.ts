import { useContext } from 'react';
import { ChatContext } from '../constants/contexts';
import type { Chat } from '../types';

/**
 * Hook que proporciona acceso al estado y funciones del chat actual.
 * 
 * @throws Error si no se encuentra el contexto (fuera del provider).
 */
export function useChat(): Chat {
	const chat = useContext(ChatContext);

	if (!chat) {
		throw new Error('ChatContext not found. Did you forget to wrap your component tree with <ChatContext.Provider>?');
	}

	return chat;
}

import { useContext } from 'react';
import { ChatOptionsContext } from '../constants/contexts';
import type { ChatOptions } from '../types';

/**
 * Hook React que permite acceder a las opciones de configuración global del chat.
 * @returns Objeto con las opciones inyectadas mediante contexto.
 */
export function useOptions(): { options: ChatOptions } {
	const options = useContext(ChatOptionsContext);

	if (!options) {
		throw new Error('ChatOptionsContext not found. Did you forget to wrap your app with <ChatOptionsContext.Provider>?');
	}

	return { options };
}

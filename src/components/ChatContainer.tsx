import { useState } from 'react';
import { Launcher } from './Launcher/Launcher';
import { ChatWindow } from './ChatWindow/ChatWindow';
import { ChatOptionsContext } from '../constants';
import type { ChatOptions } from '../types';
import { ChatProvider } from '../composables/ChatProvider';

export const chatOptions: ChatOptions = {
	webhookUrl: 'https://rich-sparrow-literate.ngrok-free.app/webhook/a7282d9a-9bf7-43a9-b3ce-c8178e065bd1',
	mode: 'window',
	showWindowCloseButton: true,
	showWelcomeScreen: true,
	loadPreviousSession: true,
	defaultLanguage: 'en',
	chatInputKey: 'message',
	chatSessionKey: 'sessionId',
	i18n: {
		en: {
			title: 'Hi there! 👋',
			subtitle: 'How can I assist you today?',
			getStarted: 'Start Chat',
			inputPlaceholder: 'Type your message...',
			footer: '',
			closeButtonTooltip: 'Close chat',
		},
	},
};

/**
 * Contenedor principal del chat. Controla la visibilidad del `ChatWindow`
 * y el estado del botón flotante `Launcher`.
 */
export const ChatContainer = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
		<ChatOptionsContext.Provider value={chatOptions}>
			<ChatProvider>
				<Launcher isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
				{isOpen && <ChatWindow />}
			</ChatProvider>
		</ChatOptionsContext.Provider>
		</>
	);
};

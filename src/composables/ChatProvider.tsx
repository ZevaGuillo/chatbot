// context/ChatProvider.tsx
import React, { useState } from 'react';
import type { Chat, ChatMessage } from '../types';
import { ChatContext } from '../constants';
import { useOptions } from './useOptions';

interface ChatProviderProps {
	children: React.ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [initialMessages] = useState<ChatMessage[]>([]);
	const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
	const [waitingForResponse, setWaitingForResponse] = useState(false);
    const {options} = useOptions();

	// ejemplo simple
    const sendMessage = async (text: string, files: File[] = []) => {
	setWaitingForResponse(true);

	const userMessage: ChatMessage = {
		id: crypto.randomUUID(),
		text,
		sender: 'user',
	};

	setMessages((prev) => [...prev, userMessage]);

	try {
		const res = await fetch(options.webhookUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				action: 'sendMessage',
				message: text,
				sessionId: options.chatSessionKey,
			}),
		});

		const data = await res.json();

		const botMessage: ChatMessage = {
			id: crypto.randomUUID(),
			text: data.text ?? '🤖 Sin respuesta',
			sender: 'bot',
		};

		setMessages((prev) => [...prev, botMessage]);
	} catch (err) {
		console.error('❌ Error al conectar con webhook:', err);
		setMessages((prev) => [
			...prev,
			{
				id: crypto.randomUUID(),
				text: '⚠️ No se pudo conectar con el servidor.',
				sender: 'bot',
			},
		]);
	} finally {
		setWaitingForResponse(false);
	}
};

	const loadPreviousSession = async () => {
		// Simulación
		setMessages([]);
		return 'dummy-session-id';
	};

	const startNewSession = async () => {
		setMessages([]);
		setCurrentSessionId(crypto.randomUUID());
	};

	const value: Chat = {
		initialMessages,
		messages,
		currentSessionId,
		waitingForResponse,
		sendMessage,
		loadPreviousSession,
		startNewSession,
	};

	return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

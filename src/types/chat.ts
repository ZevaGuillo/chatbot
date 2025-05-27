import type { ChatMessage } from './messages';

export interface Chat {
	initialMessages: ChatMessage[];
	messages: ChatMessage[];
	currentSessionId: string | null;
	waitingForResponse: boolean;
	loadPreviousSession?: () => Promise<string | undefined>;
	startNewSession?: () => Promise<void>;
	sendMessage: (text: string, files: File[]) => Promise<void>;
}

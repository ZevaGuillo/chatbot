import React, { useEffect, useRef } from 'react';
import styles from './MessagesList.module.css';
import type { ChatMessage } from '../../types';
import { useChat } from '../../composables';
import { Message } from '../Message/Message';
import { MessageTyping } from '../MessageTyping/MessageTyping';

interface MessagesListProps {
	messages: ChatMessage[];
	emptyText?: string;
	beforeMessageSlot?: (message: ChatMessage) => React.ReactNode;
}

export const MessagesList: React.FC<MessagesListProps> = ({
	messages,
	emptyText,
	beforeMessageSlot,
}) => {
	const { initialMessages, waitingForResponse } = useChat();
	const lastMessageRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		lastMessageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}, [messages.length, initialMessages.length, waitingForResponse]);

	const noMessages = initialMessages.length === 0 && messages.length === 0;

	return (
		<>
			{noMessages && emptyText ? (
				<div className={styles.emptyContainer}>
					<div className={styles.empty}>
						<span className={styles.emptyIcon}>💬</span>
						<p>{emptyText}</p>
					</div>
				</div>
			) : (
				<div className={styles.messagesList}>
					{initialMessages.map((m) => (
						<Message key={m.id} message={m} />
					))}

					{messages.map((m, index) => (
						<div ref={index === messages.length - 1 ? lastMessageRef : undefined} key={m.id}>
							<Message message={m} beforeMessageSlot={beforeMessageSlot?.(m)} />
						</div>
					))}

					{waitingForResponse && <MessageTyping />}
				</div>
			)}
		</>
	);
};

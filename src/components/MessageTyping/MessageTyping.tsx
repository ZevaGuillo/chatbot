import React, { useEffect, useRef } from 'react';
import styles from './MessageTyping.module.css';
import type { ChatMessage } from '../../types';
import { Message } from '../Message';

interface MessageTypingProps {
	animation?: 'bouncing' | 'scaling';
}

/**
 * Componente que representa la animación de "escribiendo..."
 * mostrado por el bot mientras se genera la respuesta.
 */
export const MessageTyping: React.FC<MessageTypingProps> = ({
	animation = 'bouncing',
}) => {
	const messageRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		messageRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, []);

	const message: ChatMessage = {
		id: 'typing',
		text: '',
		sender: 'bot',
	};

	const className = [
		styles.messageTyping,
		animation === 'bouncing'
			? styles.animationBouncing
			: styles.animationScaling,
	].join(' ');

	return (
		<Message ref={messageRef} message={message} className={className}>
			<div className={styles.typingBody}>
				<span className={styles.circle} />
				<span className={styles.circle} />
				<span className={styles.circle} />
			</div>
		</Message>
	);
};

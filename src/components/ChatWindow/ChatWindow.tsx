import React, { useState } from 'react';
import { MessageSquare, ChevronDown } from 'lucide-react'; // íconos reemplazo

import styles from './ChatWindow.module.css';
import { chatEventBus } from '../../utils';
import { Chat } from '../Chat';

export const ChatWindow: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => {
		setIsOpen((prev) => !prev);
		if (!isOpen) {
			setTimeout(() => {
				chatEventBus.emit('scrollToBottom');
			}, 0);
		}
	};

	return (
		<div className={styles.chatWindowWrapper}>
			{isOpen && (
				<div className={`${styles.chatWindow} ${styles.transition}`}>
					<Chat />
				</div>
			)}
			<div className={styles.chatWindowToggle} onClick={toggle}>
				{isOpen ? <ChevronDown size={32} /> : <MessageSquare size={32} />}
			</div>
		</div>
	);
};

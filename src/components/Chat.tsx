import React, { useEffect } from 'react';
import { useChat, useI18n, useOptions } from '../composables';
import { chatEventBus } from '../utils';
import { Layout } from './Layout';
import { MessagesList } from './MessagesList';
import { GetStarted } from './GetStarted';
import { GetStartedFooter } from './GetStartedFooter';
import { Input } from './Input';
import { X } from 'lucide-react'; // ícono alternativo

export const Chat: React.FC = () => {
	const { t } = useI18n();
	const chatStore = useChat();
	const { messages, currentSessionId, loadPreviousSession, startNewSession } = chatStore;
	const { options } = useOptions();

	const showCloseButton =
		options.mode === 'window' && options.showWindowCloseButton;

	const getStarted = async () => {
		if (!startNewSession) return;
		await startNewSession();
		setTimeout(() => {
			chatEventBus.emit('scrollToBottom');
		}, 0);
	};

	const initialize = async () => {
		if (!loadPreviousSession) return;
		await loadPreviousSession();
		setTimeout(() => {
			chatEventBus.emit('scrollToBottom');
		}, 0);
	};

	const closeChat = () => {
		chatEventBus.emit('close');
	};

	useEffect(() => {
		initialize();
		if (!options.showWelcomeScreen && !currentSessionId) {
			getStarted();
		}
	}, []);

	return (
		<Layout className="chat-wrapper">
			<Layout.Header>
				<div className="chat-heading">
					<h1>{t('title')}</h1>
					{showCloseButton && (
						<button
							className="chat-close-button"
							title={t('closeButtonTooltip')}
							onClick={closeChat}
						>
							<X size={18} />
						</button>
					)}
				</div>
				{t('subtitle') && <p>{t('subtitle')}</p>}
			</Layout.Header>

			{!currentSessionId && options.showWelcomeScreen ? (
				<GetStarted onClick={getStarted} />
			) : (
				<MessagesList messages={messages} />
			)}

			<Layout.Footer>
				{currentSessionId ? <Input /> : <GetStartedFooter />}
			</Layout.Footer>
		</Layout>
	);
};

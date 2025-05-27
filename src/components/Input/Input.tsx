import React, { useEffect, useRef, useState } from 'react';
import { Paperclip, Send } from 'lucide-react';
import styles from './Input.module.css';
import { useChat, useI18n, useOptions } from '../../composables';
import { chatEventBus } from '../../utils';
import { ChatFile } from '../ChatFile/ChatFile';

export const Input: React.FC = () => {
	const { t } = useI18n();
	const { sendMessage, waitingForResponse } = useChat();
	const { options } = useOptions();

	const chatTextArea = useRef<HTMLTextAreaElement | null>(null);
	const [inputValue, setInputValue] = useState('');
	const [files, setFiles] = useState<File[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const isDisabled = options.disabled;
	const isFileUploadAllowed = options.allowFileUploads;
	const allowedMimeTypes = options.allowedFilesMimeTypes;

	const handleSubmit = async (e: React.MouseEvent | React.KeyboardEvent) => {
		e.preventDefault();
		if (!inputValue.trim() || waitingForResponse || isDisabled) return;

		setIsSubmitting(true);
		await sendMessage(inputValue.trim(), files);
		setInputValue('');
		setFiles([]);
		setIsSubmitting(false);
	};

	const handleKeyDown = async (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			await handleSubmit(e);
			resizeTextArea();
		}
		if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
			e.preventDefault();
			chatEventBus.emit('arrowKeyDown', {
				key: e.key,
				currentInputValue: inputValue,
			});
		}
	};

	const resizeTextArea = () => {
		const textarea = chatTextArea.current;
		if (textarea) {
			textarea.style.height = '2.5rem';
			const newHeight = Math.min(textarea.scrollHeight, 480);
			textarea.style.height = `${newHeight}px`;
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
		e.target.value = '';
	};

	const removeFile = (fileToRemove: File) => {
		setFiles((prev) => prev.filter(file => file.name !== fileToRemove.name));
	};

    useEffect(() => {
        const onFocusInput = () => chatTextArea.current?.focus();
        const onBlurInput = () => chatTextArea.current?.blur();
        const onSetInputValue = (val: string) => {
            setInputValue(val);
            chatTextArea.current?.focus();
        };

        chatEventBus.on('focusInput', onFocusInput);
        chatEventBus.on('blurInput', onBlurInput);
        chatEventBus.on('setInputValue', onSetInputValue);

        return () => {
            chatEventBus.off('focusInput', onFocusInput);
            chatEventBus.off('blurInput', onBlurInput);
            chatEventBus.off('setInputValue', onSetInputValue);
        };
    }, []);

	return (
		<div className={styles.chatInput}>
			<div className={styles.chatInputs}>
				<textarea
					ref={chatTextArea}
					className={styles.textarea}
					value={inputValue}
					disabled={isDisabled}
					placeholder={t('inputPlaceholder')}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={handleKeyDown}
					onInput={resizeTextArea}
					onFocus={resizeTextArea}
					onMouseDown={resizeTextArea}
				/>
				<div className={styles.chatInputsControls}>
					{isFileUploadAllowed && (
						<label className={styles.chatInputFileButton}>
							<Paperclip size={20} />
							<input
								type="file"
								multiple
								accept={allowedMimeTypes}
								style={{ display: 'none' }}
								onChange={handleFileChange}
							/>
						</label>
					)}
					<button
						className={styles.chatInputSendButton}
						onClick={handleSubmit}
						disabled={!inputValue.trim() || waitingForResponse}
					>
						<Send size={20} />
					</button>
				</div>
			</div>

			{files.length > 0 && !isSubmitting && (
				<div className={styles.chatFiles}>
					{files.map((file) => (
						<ChatFile
							key={file.name}
							file={file}
							isRemovable
							isPreviewable
							onRemove={() => removeFile(file)}
						/>
					))}
				</div>
			)}
		</div>
	);
};

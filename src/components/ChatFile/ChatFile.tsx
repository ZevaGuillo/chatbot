import React, { useMemo } from 'react';
import {
	FileText,
	FileImage,
	FileMusic,
	FileVideo,
	X,
	ExternalLink,
} from 'lucide-react';
import styles from './ChatFile.module.css';

export interface ChatFileProps {
	file: File;
	isRemovable: boolean;
	isPreviewable?: boolean;
	onRemove?: () => void;
}

export const ChatFile: React.FC<ChatFileProps> = ({
	file,
	isRemovable,
	isPreviewable = false,
	onRemove,
}) => {
	const fileType = useMemo(() => file.type.split('/')[0], [file.type]);

	const TypeIcon = useMemo(() => {
		switch (fileType) {
			case 'image':
				return FileImage;
			case 'audio':
				return FileMusic;
			case 'video':
				return FileVideo;
			default:
				return FileText;
		}
	}, [fileType]);

	const handleClick = () => {
		if (isPreviewable) {
			window.open(URL.createObjectURL(file), '_blank');
		}
	};

	return (
		<div className={styles.chatFile} onClick={handleClick}>
			<TypeIcon size={18} />
			<p className={styles.chatFileName} title={file.name}>{file.name}</p>

			{isRemovable && (
				<span className={styles.chatFileDelete} onClick={(e) => {
					e.stopPropagation();
					onRemove?.();
				}}>
					<X size={16} />
				</span>
			)}

			{!isRemovable && isPreviewable && (
				<ExternalLink size={16} className={styles.chatFilePreview} />
			)}
		</div>
	);
};

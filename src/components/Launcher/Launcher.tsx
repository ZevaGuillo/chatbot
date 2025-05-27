import React from 'react';
import { MessageCircle, X } from 'lucide-react';
import styles from './Launcher.module.css';

interface LauncherProps {
	isOpen: boolean;
	onToggle: () => void;
	ariaLabel?: string;
}

/**
 * Botón flotante que permite abrir o cerrar la ventana del chat.
 *
 * @param isOpen Indica si el chat está actualmente abierto.
 * @param onToggle Función que alterna la visibilidad del chat.
 * @param ariaLabel Etiqueta para accesibilidad (lectores de pantalla).
 */
export const Launcher: React.FC<LauncherProps> = ({
	isOpen,
	onToggle,
	ariaLabel = 'Toggle chat window',
}) => {
	return (
		<button
			className={`${styles.launcherButton} ${isOpen ? styles.active : ''}`}
			onClick={onToggle}
			aria-label={ariaLabel}
		>
			{isOpen ? <X size={22} /> : <MessageCircle size={22} />}
		</button>
	);
};

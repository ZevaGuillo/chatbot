import React from 'react';
import styles from './GetStarted.module.css';

interface GetStartedProps {
	onClick: () => void;
}

/**
 * Pantalla de bienvenida inicial cuando no existe sesión activa.
 * Muestra un mensaje y un botón para iniciar el chat.
 *
 * @param onClick Función que inicia una nueva sesión.
 */
export const GetStarted: React.FC<GetStartedProps> = ({ onClick }) => {
	return (
		<div className={styles.getStarted}>
			<h2 className={styles.title}>¡Hola!</h2>
			<p className={styles.subtitle}>¿En qué puedo ayudarte hoy?</p>
			<button className={styles.button} onClick={onClick}>
				Comenzar
			</button>
		</div>
	);
};

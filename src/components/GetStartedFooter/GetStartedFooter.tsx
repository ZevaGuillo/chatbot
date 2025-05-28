import React from 'react';
import styles from './GetStartedFooter.module.css';

/**
 * Componente de pie de pantalla para la vista de bienvenida del chat.
 * Se puede usar para mostrar links, sugerencias o botones de acción rápida.
 */
export const GetStartedFooter: React.FC = () => {
	return (
		<div className={styles.footer}>
			<p className={styles.hint}>Puedes preguntarme sobre nuestros servicios o productos.</p>
			<ul className={styles.suggestions}>
				<li>💡 ¿Qué servicios ofrecen?</li>
				<li>💡 ¿Tienen experiencia en React?</li>
				<li>💡 ¿Pueden integrarse con mi sistema?</li>
			</ul>
		</div>
	);
};

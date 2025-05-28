import { useState } from 'react';
import { Launcher } from './Launcher/Launcher';
import { ChatWindow } from './ChatWindow/ChatWindow';
/**
 * Contenedor principal del chat. Controla la visibilidad del `ChatWindow`
 * y el estado del botón flotante `Launcher`.
 */
export const ChatContainer = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Launcher isOpen={isOpen} onToggle={() => setIsOpen((prev) => !prev)} />
			{isOpen && <ChatWindow />}
		</>
	);
};

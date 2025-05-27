/**
 * Representa un mensaje del chat, que puede ser de tipo texto o componente.
 */
export type ChatMessage<T = Record<string, unknown>> = ChatMessageComponent<T> | ChatMessageText;

/**
 * Mensaje de tipo componente, que permite renderizar contenido dinámico (como botones, formularios, menús).
 * @template T Tipo de los argumentos personalizados del componente.
 */
export interface ChatMessageComponent<T = Record<string, unknown>> extends ChatMessageBase {
	/** Tipo discriminador para este tipo de mensaje */
	type: 'component';
	/** Clave única para identificar qué componente debe renderizarse en el frontend */
	key: string;
	/** Argumentos que se pasarán al componente en el frontend */
	arguments: T;
}

/**
 * Mensaje de texto plano, enviado por el usuario o el bot.
 */
export interface ChatMessageText extends ChatMessageBase {
	/** Tipo de mensaje, por defecto es 'text'. Puede omitirse. */
	type?: 'text';
	/** Contenido textual del mensaje */
	text: string;
}

/**
 * Base común para todos los tipos de mensajes.
 */
interface ChatMessageBase {
	/** ID único del mensaje */
	id: string;

	/** Si el mensaje debe mostrarse de forma más sutil o atenuada visualmente */
	transparent?: boolean;

	/** Emisor del mensaje, ya sea el usuario o el bot */
	sender: 'user' | 'bot';

	/** Archivos adjuntos, si aplica (por ejemplo, imágenes o documentos subidos por el usuario) */
	files?: File[];
}

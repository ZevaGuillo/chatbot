/**
 * Representa un mensaje almacenado previamente en una sesión anterior,
 * normalmente devuelto por n8n cuando se carga una sesión previa.
 */
export interface LoadPreviousSessionResponseItem {
	/**
	 * Lista de identificadores asociados al mensaje.
	 * Puede usarse para tracking o reindexado.
	 */
	id: string[];

	/**
	 * Parámetros del mensaje, incluyendo su contenido textual.
	 */
	kwargs: {
		/** Contenido del mensaje en formato texto plano. */
		content: string;

		/** Parámetros adicionales, útiles para mensajes enriquecidos o de control. */
		additional_kwargs: Record<string, unknown>;
	};

	/**
	 * Posición relativa o lógica dentro de la conversación (ordenamiento).
	 */
	lc: number;

	/**
	 * Tipo del mensaje (puede indicar si es de usuario, sistema, asistente, etc.).
	 */
	type: string;
}

/**
 * Estructura de respuesta completa al cargar una sesión previa del chat.
 */
export interface LoadPreviousSessionResponse {
	/** Lista de mensajes recuperados. */
	data: LoadPreviousSessionResponseItem[];
}

/**
 * Estructura de respuesta al enviar un nuevo mensaje al webhook del chat.
 */
export interface SendMessageResponse {
	/**
	 * Texto generado por el modelo o flujo del bot.
	 * Puede ser usado directamente como mensaje de salida.
	 */
	output?: string;

	/**
	 * Versión alternativa del mensaje, usada para bots multicanal o conversiones.
	 */
	text?: string;
}

/**
 * Opciones de configuración global del chatbot.
 * Este objeto se pasa al inicializar el componente de chat.
 */
export interface ChatOptions {
	/**
	 * URL del webhook que recibirá los mensajes (generalmente conectado a n8n).
	 */
	webhookUrl: string;

	/**
	 * Configuración adicional del webhook: método y cabeceras HTTP.
	 */
	webhookConfig?: {
		/** Método HTTP usado en la solicitud. */
		method?: 'GET' | 'POST';
		/** Cabeceras HTTP personalizadas (por ejemplo, para autenticación). */
		headers?: Record<string, string>;
	};

	/**
	 * Elemento DOM en el que se montará el chat. Puede ser un `querySelector` o un nodo directamente.
	 */
	target?: string | Element;

	/**
	 * Modo de visualización del chat.
	 * - `window`: ventana flotante.
	 * - `fullscreen`: ocupa toda la pantalla.
	 */
	mode?: 'window' | 'fullscreen';

	/**
	 * Muestra el botón de cerrar en la ventana del chat (si `mode = 'window'`).
	 */
	showWindowCloseButton?: boolean;

	/**
	 * Muestra una pantalla de bienvenida antes de iniciar la conversación.
	 */
	showWelcomeScreen?: boolean;

	/**
	 * Intenta cargar la conversación anterior del usuario automáticamente.
	 */
	loadPreviousSession?: boolean;

	/**
	 * Clave del campo de entrada de mensaje (por defecto `"message"`).
	 */
	chatInputKey?: string;

	/**
	 * Clave del identificador de sesión del chat (por defecto `"sessionId"`).
	 */
	chatSessionKey?: string;

	/**
	 * Idioma por defecto del chat. Actualmente solo se soporta `'en'`.
	 */
	defaultLanguage?: 'en';

	/**
	 * Lista de mensajes iniciales para mostrar apenas se abra el chat.
	 */
	initialMessages?: string[];

	/**
	 * Datos adicionales que se envían con cada mensaje (pueden incluir IDs de usuario, contexto, etc.).
	 */
	metadata?: Record<string, unknown>;

	/**
	 * Diccionario de traducciones e interfaz del usuario por idioma.
	 * Cada clave es un idioma (`en`, `es`, `fr`, etc.).
	 */
	i18n: Record<
		string,
		{
			title: string;
			subtitle: string;
			footer: string;
			getStarted: string;
			inputPlaceholder: string;
			closeButtonTooltip: string;
			[messageKey: string]: string;
		}
	>;

	/**
	 * Tema visual personalizado (colores, fuentes, etc.).
	 */
	theme?: Record<string, unknown>;

	/**
	 * Mapeo de componentes personalizados para renderizar mensajes especiales.
	 * (Solo si usas un sistema de componentes en React).
	 */
	messageComponents?: Record<string, React.ComponentType<unknown>>;

	/**
	 * Si se debe deshabilitar temporalmente el chat.
	 */
	disabled?: boolean;

	/**
	 * Si se permite la carga de archivos en el chat.
	 */
	allowFileUploads?: boolean;

	/**
	 * Tipos MIME de archivos permitidos para subir (ej. `"image/png"` o `"application/pdf"`).
	 */
	allowedFilesMimeTypes?: string;
}

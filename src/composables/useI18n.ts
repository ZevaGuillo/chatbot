import { useOptions } from './useOptions';

/**
 * Hook que proporciona funciones de traducción basadas en las opciones de configuración del chat.
 */
export function useI18n() {
	const { options } = useOptions();
	const language = options?.defaultLanguage ?? 'en';

	/**
	 * Traduce una clave de texto a su equivalente en el idioma actual.
	 * @param key Clave de texto
	 * @returns Texto traducido o la misma clave si no se encuentra traducción
	 */
	function t(key: string): string {
		const val = options?.i18n?.[language]?.[key];
		return typeof val === 'string' ? val : key;
	}

	/**
	 * Verifica si existe una traducción para la clave dada.
	 * @param key Clave de texto
	 * @returns Verdadero si existe traducción
	 */
	function te(key: string): boolean {
		return !!options?.i18n?.[language]?.[key];
	}

	return { t, te };
}

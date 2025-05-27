/**
 * Tipo de función que se ejecuta cuando ocurre un evento.
 */

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export type CallbackFn = Function;

/**
 * Función que cancela la suscripción a un evento.
 */
export type UnregisterFn = () => void;

/**
 * Interfaz de un bus de eventos simple.
 */
export interface EventBus {
	/**
	 * Suscribirse a un evento.
	 * @param eventName Nombre del evento
	 * @param fn Callback que se ejecutará
	 * @returns Función para cancelar la suscripción
	 */
	on: (eventName: string, fn: CallbackFn) => UnregisterFn;

	/**
	 * Cancelar la suscripción de un evento.
	 * @param eventName Nombre del evento
	 * @param fn Callback que se había registrado
	 */
	off: (eventName: string, fn: CallbackFn) => void;

	/**
	 * Emitir un evento con datos opcionales.
	 * @param eventName Nombre del evento
	 * @param event Datos del evento (opcional)
	 */
	emit: <T = Event>(eventName: string, event?: T) => void;
}

/**
 * Crea una instancia nueva de EventBus.
 */
export function createEventBus(): EventBus {
	const handlers = new Map<string, CallbackFn[]>();

	function off(eventName: string, fn: CallbackFn) {
		const eventFns = handlers.get(eventName);
		if (eventFns) {
			eventFns.splice(eventFns.indexOf(fn) >>> 0, 1);
		}
	}

	function on(eventName: string, fn: CallbackFn): UnregisterFn {
		let eventFns = handlers.get(eventName);
		if (!eventFns) {
			eventFns = [fn];
		} else {
			eventFns.push(fn);
		}
		handlers.set(eventName, eventFns);
		return () => off(eventName, fn);
	}

	function emit<T = Event>(eventName: string, event?: T) {
		const eventFns = handlers.get(eventName);
		if (eventFns) {
			eventFns.slice().forEach(async (handler) => {
				await handler(event);
			});
		}
	}

	return {
		on,
		off,
		emit,
	};
}

export const chatEventBus = createEventBus();
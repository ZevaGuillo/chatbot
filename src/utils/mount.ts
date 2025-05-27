/**
 * Asegura que exista un nodo DOM con el selector dado.
 * Si no existe, lo crea dinámicamente y lo agrega al <body>.
 *
 * @param mountingTarget - Selector CSS (ej. "#n8n-chat" o ".chat-container").
 */
export function createDefaultMountingTarget(mountingTarget: string): void {
	const mountingTargetNode = document.querySelector(mountingTarget);
	if (!mountingTargetNode) {
		const generatedMountingTargetNode = document.createElement('div');

		if (mountingTarget.startsWith('#')) {
			generatedMountingTargetNode.id = mountingTarget.replace('#', '');
		}

		if (mountingTarget.startsWith('.')) {
			generatedMountingTargetNode.classList.add(mountingTarget.replace('.', ''));
		}

		document.body.appendChild(generatedMountingTargetNode);
	}
}

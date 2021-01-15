type course = 'check' | 'uncheck';

/**
 * Button to check / uncheck all checkboxes by Custom Elements.
 *
 * @version 1.0.0
 */
export default class ButtonCheckboxesCtrl extends HTMLButtonElement {
	#course: course | null = null; // ボタンの機能（全選択 or 全解除）
	#checkboxElements: HTMLInputElement[] = []; // 対象のチェックボックス

	constructor() {
		super();

		this.type = 'button';
	}

	connectedCallback(): void {
		const course = this.dataset.course;
		switch (course) {
			case 'check':
			case 'uncheck':
				this.#course = course;
				break;
			case undefined:
				throw new Error('Attribute: `data-course` is not set.');
			default:
				throw new Error("Only 'check' or 'uncheck' can be set for the `data-course` attribute.");
		}

		const targetsAncestorElementId = this.dataset.targetFor;
		const targetElementsClass = this.dataset.targetsClass;
		const targetElementsName = this.dataset.targetsName;
		if (targetsAncestorElementId === undefined && targetElementsClass === undefined && targetElementsName === undefined) {
			throw new Error('Attribute: `data-target-for` or `data-targets-class` or `data-targets-name` is not set.');
		}

		if (targetsAncestorElementId !== undefined) {
			const targetsAncestorElement = document.getElementById(targetsAncestorElementId);
			if (targetsAncestorElement === null) {
				throw new Error(`Element: #${targetsAncestorElementId} can not found.`);
			}

			const targetElements = <NodeListOf<HTMLInputElement>>targetsAncestorElement.querySelectorAll('input[type="checkbox"]');
			if (targetElements.length === 0) {
				throw new Error(`Checkbox does not exist in descendants of the Element: #${targetsAncestorElementId}.`);
			}

			this.#checkboxElements = Array.from(targetElements);
		}

		if (targetElementsClass !== undefined) {
			const targetElements = <HTMLCollectionOf<HTMLInputElement>>document.getElementsByClassName(targetElementsClass);
			if (targetElements.length === 0) {
				throw new Error(`Element: .${targetElementsClass} can not found.`);
			}

			this.#checkboxElements = Array.from(targetElements);
		}

		if (targetElementsName !== undefined) {
			const targetElements = <NodeListOf<HTMLInputElement>>document.getElementsByName(targetElementsName);
			if (targetElements.length === 0) {
				throw new Error(`Element: [name=${targetElementsName}] can not found.`);
			}

			this.#checkboxElements = Array.from(targetElements);
		}

		this.addEventListener('click', this._clickEvent, { passive: true });
	}

	disconnectedCallback(): void {
		this.removeEventListener('click', this._clickEvent);
	}

	/**
	 * ボタン押下時の処理
	 */
	private _clickEvent() {
		switch (this.#course) {
			case 'check': {
				/* チェックボックスをすべてチェックする */
				for (const checkboxUncheckedElement of this.#checkboxElements.filter((element) => !element.checked)) {
					checkboxUncheckedElement.checked = true;
				}
				break;
			}
			case 'uncheck': {
				/* チェックボックスをすべて解除する */
				for (const checkboxCheckedElement of this.#checkboxElements.filter((element) => element.checked)) {
					checkboxCheckedElement.checked = false;
				}
				break;
			}
		}
	}
}

var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _course, _checkboxElements;
/**
 * Button to check / uncheck all checkboxes by Custom Elements.
 *
 * @version 1.0.0
 */
export default class ButtonCheckboxesCtrl extends HTMLButtonElement {
    constructor() {
        super();
        _course.set(this, null); // ボタンの機能（全選択 or 全解除）
        _checkboxElements.set(this, []); // 対象のチェックボックス
        this.type = 'button';
    }
    connectedCallback() {
        const course = this.dataset.course;
        switch (course) {
            case 'check':
            case 'uncheck':
                __classPrivateFieldSet(this, _course, course);
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
            const targetElements = targetsAncestorElement.querySelectorAll('input[type="checkbox"]');
            if (targetElements.length === 0) {
                throw new Error(`Checkbox does not exist in descendants of the Element: #${targetsAncestorElementId}.`);
            }
            __classPrivateFieldSet(this, _checkboxElements, Array.from(targetElements));
        }
        if (targetElementsClass !== undefined) {
            const targetElements = document.getElementsByClassName(targetElementsClass);
            if (targetElements.length === 0) {
                throw new Error(`Element: .${targetElementsClass} can not found.`);
            }
            __classPrivateFieldSet(this, _checkboxElements, Array.from(targetElements));
        }
        if (targetElementsName !== undefined) {
            const targetElements = document.getElementsByName(targetElementsName);
            if (targetElements.length === 0) {
                throw new Error(`Element: [name=${targetElementsName}] can not found.`);
            }
            __classPrivateFieldSet(this, _checkboxElements, Array.from(targetElements));
        }
        this.addEventListener('click', this._clickEvent, { passive: true });
    }
    disconnectedCallback() {
        this.removeEventListener('click', this._clickEvent);
    }
    /**
     * ボタン押下時の処理
     */
    _clickEvent() {
        switch (__classPrivateFieldGet(this, _course)) {
            case 'check': {
                /* チェックボックスをすべてチェックする */
                for (const checkboxUncheckedElement of __classPrivateFieldGet(this, _checkboxElements).filter((element) => !element.checked)) {
                    checkboxUncheckedElement.checked = true;
                }
                break;
            }
            case 'uncheck': {
                /* チェックボックスをすべて解除する */
                for (const checkboxCheckedElement of __classPrivateFieldGet(this, _checkboxElements).filter((element) => element.checked)) {
                    checkboxCheckedElement.checked = false;
                }
                break;
            }
        }
    }
}
_course = new WeakMap(), _checkboxElements = new WeakMap();
//# sourceMappingURL=ButtonCheckboxesCtrl.js.map
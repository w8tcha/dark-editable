import { default as DarkEditable } from '../dark-editable.ts';
import { default as BaseTypeButtons } from '../Interfaces/BaseTypeButtons.ts';
export default class BaseType {
    context: DarkEditable;
    element: HTMLInputElement | null;
    error: HTMLElement | null;
    form: HTMLElement | null;
    load: HTMLElement | null;
    buttons: BaseTypeButtons;
    constructor(context: DarkEditable);
    create(): HTMLElement;
    createContainer(element: HTMLInputElement): HTMLDivElement;
    createContainerError(): HTMLDivElement;
    createContainerForm(): HTMLFormElement;
    createContainerLoad(): HTMLDivElement;
    createButton(): HTMLButtonElement;
    createButtonSuccess(): HTMLButtonElement;
    createButtonCancel(): HTMLButtonElement;
    hideLoad(): void;
    showLoad(): void;
    ajax(new_value: string): Promise<Response>;
    successResponse(_response: Response, _newValue: string): Promise<any>;
    errorResponse(_response: Response, _newValue: string): Promise<any>;
    setError(errorMsg: string): void;
    showError(): void;
    hideError(): void;
    createElement(name: string): HTMLInputElement;
    add_focus(element: HTMLInputElement): void;
    initText(): boolean;
    initOptions(): void;
    getValue(): string;
}

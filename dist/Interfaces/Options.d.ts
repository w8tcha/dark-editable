import { Popover } from 'bootstrap';
import { default as BaseType } from '../Types/BaseType.ts';
export default interface Options {
    value?: string;
    name?: string;
    id?: string;
    title?: string;
    type?: BaseType | string;
    ajaxOptions?: RequestInit;
    disabled?: boolean;
    send?: boolean;
    mode?: 'popup' | 'inline';
    emptytext?: string;
    placeholder?: string;
    url?: string | null;
    required?: boolean;
    showbuttons?: boolean;
    success?: (response: Response, newValue: string | number) => Promise<any>;
    error?: (response: Response, newValue: string | number) => Promise<any>;
    popoverOptions?: Popover.Options;
    format?: string;
    viewformat?: string;
    source?: [{
        value: string;
        text: string;
    }] | string;
    attributes?: {
        [key: string]: string | number | boolean | undefined;
    };
}

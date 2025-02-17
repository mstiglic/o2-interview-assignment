import type { INPUT_SIZE, INPUT_STATE, INPUT_TYPE } from '@constants/input';
import type { AriaRole, HTMLInputAutoCompleteAttribute } from 'react';


export interface IInputProps {
    onChange?: (stringValue: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onChangeDebounce?: (value?: string) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onInvalid?: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    type?: INPUT_TYPE;
    state?: INPUT_STATE;
    errors?: Array<string>;
    label?: string;
    name?: string;
    id?: string;
    disabled?: boolean;
    required?: boolean;
    readonly?: boolean;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    autoComplete?: HTMLInputAutoCompleteAttribute;
    description?: {
        above?: string;
        below?: string;
    }
    children?: {
        slotInsideLeft?: React.ReactNode;
        slotInsideRight?: React.ReactNode;
        slotOutsideLeft?: React.ReactNode;
        slotOutsideRight?: React.ReactNode;
    }
    hidden?: boolean;
    className?: string;
    resizable?: boolean;
    size?: INPUT_SIZE;
    role?: AriaRole;
    'aria-label'?: string;
    tabIndex?: number;
    min?: number;
    max?: number;
    step?: number;
    spellCheck?: boolean;
    dir?: string;
    autoFocus?: boolean;
    autoCorrect?: string;
    row?: number;
    cols?: number;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
}

export type TInputCommonAttributes = 
    React.InputHTMLAttributes<HTMLInputElement> | React.TextareaHTMLAttributes<HTMLTextAreaElement> 
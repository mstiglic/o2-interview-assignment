import type { IInputProps, TInputCommonAttributes } from '@/types/input';
import { useCallback, useState, type ReactNode } from 'react';
import classNames from 'classnames';
import Show from '@components/Show';
import { getBemClassName } from '@/helpers/index';
import '@styles/components/o2-input.css';
import { INPUT_STATE, INPUT_TYPE } from '@/constants/input';
import debounce from '@/utilities/debounce';

const DEFAULT_CLASS = 'o2-input';

function O2Input(props: IInputProps): ReactNode {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isInvalid, setIsInvalid] = useState<boolean>(false);

    const debouncedChange = useCallback(debounce((value: string) => {
        if(props.onChangeDebounce) {
            props.onChangeDebounce(value);
        }
    }, 300), []);

    const localErrorMessages = props.errors?.filter(error => error);
    const hasError: boolean = isInvalid || !!localErrorMessages?.length || props.state === INPUT_STATE.ERROR;
    
    const isResizable: boolean = !!props.resizable && props.type === INPUT_TYPE.TEXTAREA;
    const rootClassNames = classNames(
        DEFAULT_CLASS,
        {
            [getBemClassName(DEFAULT_CLASS, null, 'is-disabled')]: props.disabled,
            [getBemClassName(DEFAULT_CLASS, null, 'is-readonly')]: props.readonly,
            [getBemClassName(DEFAULT_CLASS, null, 'has-error')]: hasError,
            [getBemClassName(DEFAULT_CLASS, null, 'is-success')]: props.state === INPUT_STATE.SUCCESS,
            [getBemClassName(DEFAULT_CLASS, null, 'has-warning')]: props.state === INPUT_STATE.WARNING,
            [getBemClassName(DEFAULT_CLASS, null, 'is-focused')]: isFocused,
            [getBemClassName(DEFAULT_CLASS, null, props.type)]: props.type,
            [getBemClassName(DEFAULT_CLASS, null, 'has-description-above')]: props.description?.above,
            [getBemClassName(DEFAULT_CLASS, null, 'has-description-below')]: props.description?.below,
            [getBemClassName(DEFAULT_CLASS, null, 'is-resizable')]: isResizable,
            [getBemClassName(DEFAULT_CLASS, null, `size-${props.size}`)]: props.size,
        },
        props.className
    );
    const descriptionClassName = {
        above: classNames(
            getBemClassName(DEFAULT_CLASS, 'description'), 
            getBemClassName(DEFAULT_CLASS, 'description', 'above')
        ),
        below: classNames(
            getBemClassName(DEFAULT_CLASS, 'description'),
            getBemClassName(DEFAULT_CLASS, 'description', 'below')
        ),
    };
    const slotClassName = {
        left: classNames(
            getBemClassName(DEFAULT_CLASS, 'slot'), 
            getBemClassName(DEFAULT_CLASS, 'slot', 'left')
        ),
        right: classNames(
            getBemClassName(DEFAULT_CLASS, 'slot'), 
            getBemClassName(DEFAULT_CLASS, 'slot', 'right')
        ),
        insideLeft: classNames(
            getBemClassName(DEFAULT_CLASS, 'slot'), 
            getBemClassName(DEFAULT_CLASS, 'slot', 'insideLeft')
        ),
        insideRight: classNames(
            getBemClassName(DEFAULT_CLASS, 'slot'), 
            getBemClassName(DEFAULT_CLASS, 'slot', 'insideRight')
        ),
    };

    function handleFocus(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setIsFocused(true);
        
        if(props.onFocus) {
            props.onFocus(event);
        }
    }

    function handleBlur(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setIsFocused(false);

        if(props.onBlur) {
            props.onBlur(event);
        }
    }

    function handleInvalid(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setIsInvalid(true);
        
        if(props.onInvalid) {
            props.onInvalid(event);
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        if(props.disabled || props.readonly) {
            event.preventDefault();
            return;
        }
        
        if(isInvalid) {
            setIsInvalid(false);
        }
        if (props.onChange) {
            props.onChange(event.target.value, event);
        }
        if(props.onChangeDebounce) {
            debouncedChange(event.target.value);
        }
    }

    function handleInputTextarea(event: React.ChangeEvent<HTMLTextAreaElement>): void {
        event.currentTarget.style.height = 'auto';
        event.currentTarget.style.height = event.currentTarget.scrollHeight + 'px';
    }

    const commonAttributes: TInputCommonAttributes = {
        placeholder: props.placeholder,
        id: props.id,
        className: getBemClassName(DEFAULT_CLASS, 'input-element'),
        onFocus: handleFocus,
        onBlur: handleBlur,
        onInvalid: handleInvalid,
        autoCorrect: props.autoCorrect,
        autoFocus: props.autoFocus,
        required: props.required,
        disabled: props.disabled,
        readOnly: props.readonly,
        maxLength: props.maxLength,
        minLength: props.minLength,
        name: props.name,
        autoComplete: props.autoComplete,
        role: props.role || 'textbox',
        tabIndex: props.tabIndex || 0,
        spellCheck: props.spellCheck,
        dir: props.dir,
        'aria-required': props.required,
        'aria-invalid': isInvalid || !!localErrorMessages?.length,
        'aria-readonly': props.readonly,
        'aria-disabled': props.disabled,
        'aria-labelledby': props['aria-labelledby'],
        'aria-describedby': props['aria-describedby'],
    };

    const inputAttributes: React.InputHTMLAttributes<HTMLInputElement> = {
        pattern: props.pattern,
        type: props.type || INPUT_TYPE.TEXT,
        'aria-label': props['aria-label'] || 'Input field',
        ...(commonAttributes as React.InputHTMLAttributes<HTMLInputElement>),
    };
    const textareaAttributes: React.TextareaHTMLAttributes<HTMLTextAreaElement> = {
        'aria-label': props['aria-label'] || 'Textarea field',
        rows: props.rows,
        cols: props.cols,
        onInput: handleInputTextarea,
        ...(commonAttributes as React.TextareaHTMLAttributes<HTMLTextAreaElement>),
    };
    const controlModeAttributes: {
        defaultValue?: string;
        value?: string;
        onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    } = props.defaultValue 
        ? { 
            defaultValue: props.defaultValue } 
        : { 
            value: props.value, 
            onChange: handleChange,
        };

    return (
        <div className={rootClassNames} hidden={props.hidden} data-testid='o2-input-wrapper'>
            <Show when={props.label}>
                <div className={getBemClassName(DEFAULT_CLASS, 'label')}>
                    <label 
                        htmlFor={props.id}  
                        className={getBemClassName(DEFAULT_CLASS, 'label-text')}
                    >
                        {props.label}
                    </label>
                    <Show when={!props.required}>
                        <span className={getBemClassName(DEFAULT_CLASS, 'optional')}>Optional</span>
                    </Show>
                </div>
            </Show>
            <Show when={props.description?.above}>
                <div className={descriptionClassName.above}>
                    {props.description?.above}
                </div>
            </Show>
            <div className={getBemClassName(DEFAULT_CLASS, 'input')} >
                <Show when={props.slot?.outsideLeft}>
                    <div className={slotClassName.left}>
                        {props.slot?.outsideLeft}
                    </div>
                </Show>
                <div className={getBemClassName(DEFAULT_CLASS, 'input-wrapper')}>
                    <Show when={props.slot?.insideLeft}>
                        <div className={slotClassName.insideLeft}>
                            {props.slot?.insideLeft}
                        </div>
                    </Show>
                    <Show 
                        when={props.type === INPUT_TYPE.TEXTAREA}
                        fallback={<input {...inputAttributes} {...controlModeAttributes} />}
                    >
                        <textarea {...textareaAttributes} {...controlModeAttributes} />
                    </Show>
                    <Show when={props.slot?.insideRight}>
                        <div className={slotClassName.insideRight}>
                            {props.slot?.insideRight}
                        </div>
                    </Show>
                </div>
                <Show when={props.slot?.outsideRight}>
                    <div className={slotClassName.right}>
                        {props.slot?.outsideRight}
                    </div>
                </Show>
            </div>
            <Show when={localErrorMessages?.length}>
                <div className={getBemClassName(DEFAULT_CLASS, 'errors')}>
                    {localErrorMessages?.map((error, index) => (
                        <span 
                            key={`o2-input-error__${index}`} 
                            className={getBemClassName(DEFAULT_CLASS, 'error-message')}
                            role="alert"
                        >
                            {error}
                        </span>
                    ))}
                </div>
            </Show>
            <Show when={props.description?.below}>
                <div className={descriptionClassName.below}>{props.description?.below}</div>
            </Show>
        </div>
    );
}

export default O2Input;
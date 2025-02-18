import type { Meta, StoryObj } from '@storybook/react';
import O2Input from '../components/input/O2Input';
import { INPUT_SIZE, INPUT_STATE, INPUT_TYPE } from '../constants/input';
import { fn } from '@storybook/test';
import './assets/css/helpers.css';


const meta = {
    title: 'Components/O2Input',
    component: (args) => <div style={{width: '500px'}}><O2Input {...args}/></div>,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        onChange: fn(),
        onFocus: fn(),
        onBlur: fn(),
        onInvalid: fn(),
        onChangeDebounce: fn(),
    },
    argTypes: {
        'aria-label': { control: 'text' },
        'aria-labelledby': { control: 'text' },
        'aria-describedby': { control: 'text' },
        autoComplete: { control: 'text' },
        autoCorrect: { control: 'text' },
        autoFocus: { control: 'boolean' },
        className: { control: 'text' },
        cols: { control: 'number' },
        rows: { control: 'number' },
        defaultValue: { control: 'text' },
        description: { 
            control: 'object',
        },
        dir: { control: 'text' },
        disabled: { control: 'boolean' },
        errors: { control: 'object'},
        hidden: { control: 'boolean' },
        id: { control: 'text' },
        label: { control: 'text' },
        maxLength: { control: 'number' },
        minLength: { control: 'number' },
        name: { control: 'text' },
        max: { control: 'number' },
        min: { control: 'number' },
        pattern: { control: 'text' },
        placeholder: { control: 'text' },
        readonly: { control: 'boolean' },
        resizable: { control: 'boolean' },
        required: { control: 'boolean' },
        role: { control: 'text' },
        spellCheck: { control: 'boolean' },
        step: { control: 'number' },
        value: { control: 'text' },
        tabIndex: { control: 'number' },
        type: {
            control: {
                type: 'select',
            },
            options: Object.values(INPUT_TYPE),
        },
        state: {
            control: {
                type: 'select',
            },
            options: Object.values(INPUT_STATE),
        },
        size: {
            control: {
                type: 'select',
            },
            options: Object.values(INPUT_SIZE)   
        },
        onChange: { action: 'changed' },
        onFocus: { action: 'focused' },
        onBlur: { action: 'blurred' },
        onInvalid: { action: 'invalid' },
        onChangeDebounce: { action: 'debouncedChange' },

    },
} satisfies Meta<typeof O2Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Label',
        placeholder: 'Placeholder',
        errors: [],
        description: {
            above: '',
            below: ''
        },
    },
};

export const TextArea: Story = {
    args: {
        label: Default.args?.label,
        type: INPUT_TYPE.TEXTAREA,
        rows: 8,
        resizable: true
    },
};

export const ValidationErrors: Story = {
    args: {
        label: Default.args?.label,
        errors: ['Validation error 1', 'Validation error 2'],
        required: true
    },
};

export const Disabled: Story = {
    args: {
        label: Default.args?.label,
        disabled: true,
        defaultValue: 'Default value',
    },
};

export const Readonly: Story = {
    args: {
        label: Default.args?.label,
        readonly: true,
        defaultValue: 'Default value',
    },
};

export const Required: Story = {
    args: {
        label: Default.args?.label,
        required: true,
    },
};

export const DescriptionAbove: Story = {
    args: {
        label: Default.args?.label,
        description: {
            above: 'Description above',
        },
    },
};

export const DescriptionBelow: Story = {
    args: {
        label: Default.args?.label,
        description: {
            below: 'Description below',
        },
    },
};

export const LeftInsideSlot: Story = {
    args: {
        label: 'Label',
        type: INPUT_TYPE.NUMBER,
        slot: {
            insideLeft: <pre style={{paddingLeft: 'var(--dimension-spacing--m)'}} className="phone-prefix">
                +421
            </pre>,
        }
    },
};

export const RightInsideSlot: Story = {
    args: {
        label: 'Label',
        type: INPUT_TYPE.NUMBER,
        slot: {
            insideRight: <pre style={{paddingRight: 'var(--dimension-spacing--m)'}} className="phone-prefix">
                +421
            </pre>,
        }
    },
};

export const LeftOutsideSlot: Story = {
    args: {
        label: Default.args?.label,
        slot: {
            outsideLeft: (
                <div className="h-full items-center">
                    <button style={{marginRight: 'var(--dimension-spacing--s)'}} className="custom-button">
                        Button
                    </button>
                </div>
            ),
        }
    },
};

export const RightOutsideSlot: Story = {
    args: {
        label: Default.args?.label,
        slot: {
            outsideRight: (
                <div className="h-full items-center">
                    <button style={{marginLeft: 'var(--dimension-spacing--s)'}} className="custom-button">
                        Button
                    </button>
                </div>
            ),
        }
    },
};

export const DifferentState: Story = {
    args: {
        label: Default.args?.label,
        state: INPUT_STATE.SUCCESS,
        defaultValue: 'Success'
    },
};
import type { Meta, StoryObj } from '@storybook/react';
import './assets/css/helpers.css';
import O2Form from './components/O2SignupForm';

const meta = {
    title: 'Components/O2FormExample',
    component: O2Form,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import O2Input from '@components/input/O2Input';
import { describe, expect, it, vi } from 'vitest';
import { INPUT_TYPE, INPUT_STATE, INPUT_SIZE } from '@/constants/input';

describe('O2Input Component', () => {
    it('renders input field with placeholder', () => {
        render(<O2Input placeholder="Enter text" />);

        const input = screen.getByPlaceholderText('Enter text');
        
        expect(input).toBeInTheDocument();
    });

    it('calls onChange when typing', () => {
        const handleChange = vi.fn();
        
        render(<O2Input onChange={handleChange} />);
        
        const input = screen.getByRole('textbox');

        fireEvent.change(input, { target: { value: 'Hello' } });
        expect(handleChange).toHaveBeenCalledWith('Hello', expect.any(Object));
    });

    it('triggers debounced onChangeDebounce after delay', async () => {
        const handleChangeDebounce = vi.fn();
        
        render(<O2Input onChangeDebounce={handleChangeDebounce} />);
        
        const input = screen.getByRole('textbox');

        fireEvent.change(input, { target: { value: 'Test' } });
        await waitFor(() => expect(handleChangeDebounce).toHaveBeenCalledWith('Test'));
    });

    it('handles focus and blur events', () => {
        const handleFocus = vi.fn();
        const handleBlur = vi.fn();
        
        render(<O2Input onFocus={handleFocus} onBlur={handleBlur} />);
        
        const input = screen.getByRole('textbox');
        const inputWrapper = screen.getByTestId('o2-input-wrapper');

        fireEvent.focus(input);
        expect(handleFocus).toHaveBeenCalled();
        expect(inputWrapper.classList.contains('o2-input--is-focused')).toBe(true);

        fireEvent.blur(input);
        expect(handleBlur).toHaveBeenCalled();
        expect(inputWrapper).not.toHaveClass('is-focused');
    });

    it('displays error state when invalid and contains "has-error" class', () => {
        render(<O2Input required />);
        
        const input = screen.getByRole('textbox');
        const inputWrapper = screen.getByTestId('o2-input-wrapper');

        fireEvent.invalid(input);
        expect(input).toHaveAttribute('aria-invalid', 'true');
        expect(inputWrapper.classList.contains('o2-input--has-error')).toBe(true);
    });

    it('renders textarea when type is textarea', () => {
        render(<O2Input type={INPUT_TYPE.TEXTAREA} placeholder="Enter description" />);
        
        const textarea = screen.getByPlaceholderText('Enter description');
        
        expect(textarea.tagName).toBe('TEXTAREA');
    });

    it('textarea resizes on input', () => {
        render(<O2Input type={INPUT_TYPE.TEXTAREA} />);
        
        const textarea = screen.getByRole('textbox');
        const initialHeight = textarea.style.height;
      
        fireEvent.input(textarea, { target: { value: 'Line 1\nLine 2\nLine 3' } });
        expect(textarea.style.height).not.toBe(initialHeight);
    });

    it('renders with default value', () => {
        render(<O2Input defaultValue="Default text" />);
        
        const input = screen.getByRole('textbox');
        
        expect(input).toHaveValue('Default text');
    });
      
    it('renders with disabled state', () => {
        render(<O2Input disabled />);
        
        const input = screen.getByRole('textbox');
        
        expect(input).toBeDisabled();
    });
      
    it('renders with maxLength attribute', () => {
        render(<O2Input maxLength={10} />);
        
        const input = screen.getByRole('textbox');
        
        expect(input).toHaveAttribute('maxLength', '10');
    });
      
    it('does not call onChange when disabled', () => {
        const handleChange = vi.fn();
        
        render(<O2Input onChange={handleChange} disabled />);
        
        const input = screen.getByRole('textbox');
      
        fireEvent.change(input, { target: { value: 'Hello' } });
        expect(handleChange).not.toHaveBeenCalled();
    });
      
    it('renders with custom class name', () => {
        render(<O2Input className="custom-class" />);
        
        const inputWrapper = screen.getByTestId('o2-input-wrapper');
        
        expect(inputWrapper.className).includes('custom-class');
    });
      
    it('renders with custom id', () => {
        render(<O2Input id="custom-id" />);
        
        const input = screen.getByRole('textbox');
        
        expect(input).toHaveAttribute('id', 'custom-id');
    });
      
    it('renders with aria-label', () => {
        render(<O2Input aria-label="Custom Aria Label" />);
        
        const input = screen.getByRole('textbox');
        
        expect(input).toHaveAttribute('aria-label', 'Custom Aria Label');
    });
      
    it('renders with aria-describedby', () => {
        render(<O2Input aria-describedby="description" />);
        
        const input = screen.getByRole('textbox');
        
        expect(input).toHaveAttribute('aria-describedby', 'description');
    });
      
    it('renders with aria-labelledby', () => {
        render(<O2Input aria-labelledby="label" />);
        
        const input = screen.getByRole('textbox');
        
        expect(input).toHaveAttribute('aria-labelledby', 'label');
    });

    it('renders with error messages', () => {
        const errors = ['Error 1', 'Error 2'];
        
        render(<O2Input errors={errors} />);
        
        const errorMessages = screen.getAllByRole('alert');
        
        expect(errorMessages).toHaveLength(errors.length);
        errors.forEach((error, index) => {
            expect(errorMessages[index]).toHaveTextContent(error);
        });
    });

    it('renders with description above and below', () => {
        const description = { above: 'Above description', below: 'Below description' };
        
        render(<O2Input description={description} />);
        
        const aboveDescription = screen.getByText(description.above);
        const belowDescription = screen.getByText(description.below);

        expect(aboveDescription).toBeInTheDocument();
        expect(belowDescription).toBeInTheDocument();
    });

    it('renders with slots', () => {
        render(
            <O2Input slot={{
                outsideLeft: 'Left Slot',
                outsideRight: 'Right Slot',
                insideLeft: 'Inside Left Slot',
                insideRight: 'Inside Right Slot',
            }}/>
        );
        expect(screen.getByText('Left Slot')).toBeInTheDocument();
        expect(screen.getByText('Right Slot')).toBeInTheDocument();
        expect(screen.getByText('Inside Left Slot')).toBeInTheDocument();
        expect(screen.getByText('Inside Right Slot')).toBeInTheDocument();
    });

    it('renders with different sizes', () => {
        render(<O2Input size={INPUT_SIZE.LARGE} />);
        
        const inputWrapper = screen.getByTestId('o2-input-wrapper');
        
        expect(inputWrapper.classList.contains('o2-input--size-large')).toBe(true);
    });

    it('renders with different states', () => {
        render(<O2Input state={INPUT_STATE.SUCCESS} />);
        
        const inputWrapper = screen.getByTestId('o2-input-wrapper');
        
        expect(inputWrapper.classList.contains('o2-input--is-success')).toBe(true);
    });
});

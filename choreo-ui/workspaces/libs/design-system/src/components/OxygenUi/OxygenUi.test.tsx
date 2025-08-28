import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { OxygenUi } from './OxygenUi';

describe('OxygenUi', () => {
    it('should render children correctly', () => {
        render(<OxygenUi>Test Content</OxygenUi>);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
        const { container } = render(
            <OxygenUi className="custom-class">Content</OxygenUi>
        );
        expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should handle click events', () => {
        const handleClick = jest.fn();
        render(<OxygenUi onClick={handleClick}>Clickable</OxygenUi>);
        
        fireEvent.click(screen.getByText('Clickable'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should respect disabled state', () => {
        const handleClick = jest.fn();
        render(
            <OxygenUi disabled onClick={handleClick}>
                Disabled
            </OxygenUi>
        );
        
        fireEvent.click(screen.getByText('Disabled'));
        expect(handleClick).not.toHaveBeenCalled();
    });
});

import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { SelectOxygen } from './SelectOxygen';

describe('SelectOxygen', () => {
    it('should render children correctly', () => {
        render(<SelectOxygen>Test Content</SelectOxygen>);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
        const { container } = render(
            <SelectOxygen className="custom-class">Content</SelectOxygen>
        );
        expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should handle click events', () => {
        const handleClick = jest.fn();
        render(<SelectOxygen onClick={handleClick}>Clickable</SelectOxygen>);
        
        fireEvent.click(screen.getByText('Clickable'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should respect disabled state', () => {
        const handleClick = jest.fn();
        render(
            <SelectOxygen disabled onClick={handleClick}>
                Disabled
            </SelectOxygen>
        );
        
        fireEvent.click(screen.getByText('Disabled'));
        expect(handleClick).not.toHaveBeenCalled();
    });
});

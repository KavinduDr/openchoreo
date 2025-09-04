import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { GridOxygen } from './GridOxygen';

describe('GridOxygen', () => {
    it('should render children correctly', () => {
        render(<GridOxygen>Test Content</GridOxygen>);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
        const { container } = render(
            <GridOxygen className="custom-class">Content</GridOxygen>
        );
        expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should handle click events', () => {
        const handleClick = jest.fn();
        render(<GridOxygen onClick={handleClick}>Clickable</GridOxygen>);
        
        fireEvent.click(screen.getByText('Clickable'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should respect disabled state', () => {
        const handleClick = jest.fn();
        render(
            <GridOxygen disabled onClick={handleClick}>
                Disabled
            </GridOxygen>
        );
        
        fireEvent.click(screen.getByText('Disabled'));
        expect(handleClick).not.toHaveBeenCalled();
    });
});

import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { BoxOxygen } from './BoxOxygen';

describe('BoxOxygen', () => {
    it('should render children correctly', () => {
        render(<BoxOxygen>Test Content</BoxOxygen>);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
        const { container } = render(
            <BoxOxygen className="custom-class">Content</BoxOxygen>
        );
        expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should handle click events', () => {
        const handleClick = jest.fn();
        render(<BoxOxygen onClick={handleClick}>Clickable</BoxOxygen>);
        
        fireEvent.click(screen.getByText('Clickable'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should respect disabled state', () => {
        const handleClick = jest.fn();
        render(
            <BoxOxygen disabled onClick={handleClick}>
                Disabled
            </BoxOxygen>
        );
        
        fireEvent.click(screen.getByText('Disabled'));
        expect(handleClick).not.toHaveBeenCalled();
    });
});

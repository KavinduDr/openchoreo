import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { AvatarOxygen } from './AvatarOxygen';

describe('AvatarOxygen', () => {
    it('should render children correctly', () => {
        render(<AvatarOxygen>Test Content</AvatarOxygen>);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
        const { container } = render(
            <AvatarOxygen className="custom-class">Content</AvatarOxygen>
        );
        expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should handle click events', () => {
        const handleClick = jest.fn();
        render(<AvatarOxygen onClick={handleClick}>Clickable</AvatarOxygen>);
        
        fireEvent.click(screen.getByText('Clickable'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should respect disabled state', () => {
        const handleClick = jest.fn();
        render(
            <AvatarOxygen disabled onClick={handleClick}>
                Disabled
            </AvatarOxygen>
        );
        
        fireEvent.click(screen.getByText('Disabled'));
        expect(handleClick).not.toHaveBeenCalled();
    });
});

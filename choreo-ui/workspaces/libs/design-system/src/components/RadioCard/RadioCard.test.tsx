import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { RadioCard } from './RadioCard';

describe('RadioCard', () => {
    it('should render children correctly', () => {
        render(<RadioCard>Test Content</RadioCard>);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
        const { container } = render(
            <RadioCard className="custom-class">Content</RadioCard>
        );
        expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should handle click events', () => {
        const handleClick = jest.fn();
        render(<RadioCard onClick={handleClick}>Clickable</RadioCard>);
        
        fireEvent.click(screen.getByText('Clickable'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should respect disabled state', () => {
        const handleClick = jest.fn();
        render(
            <RadioCard disabled onClick={handleClick}>
                Disabled
            </RadioCard>
        );
        
        fireEvent.click(screen.getByText('Disabled'));
        expect(handleClick).not.toHaveBeenCalled();
    });
});

import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { TableOxygen } from './TableOxygen';

describe('TableOxygen', () => {
    it('should render children correctly', () => {
        render(<TableOxygen>Test Content</TableOxygen>);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
        const { container } = render(
            <TableOxygen className="custom-class">Content</TableOxygen>
        );
        expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should handle click events', () => {
        const handleClick = jest.fn();
        render(<TableOxygen onClick={handleClick}>Clickable</TableOxygen>);
        
        fireEvent.click(screen.getByText('Clickable'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should respect disabled state', () => {
        const handleClick = jest.fn();
        render(
            <TableOxygen disabled onClick={handleClick}>
                Disabled
            </TableOxygen>
        );
        
        fireEvent.click(screen.getByText('Disabled'));
        expect(handleClick).not.toHaveBeenCalled();
    });
});

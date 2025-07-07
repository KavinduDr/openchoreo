import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { ButtonGroup } from './ButtonGroup';

describe('ButtonGroup', () => {
    it('should render children correctly', () => {
        render(<ButtonGroup>Test Content</ButtonGroup>);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
        const { container } = render(
            <ButtonGroup className="custom-class">Content</ButtonGroup>
        );
        expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should handle click events', () => {
        const handleClick = jest.fn();
        render(<ButtonGroup onClick={handleClick}>Clickable</ButtonGroup>);
        
        fireEvent.click(screen.getByText('Clickable'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should respect disabled state', () => {
        const handleClick = jest.fn();
        render(
            <ButtonGroup disabled onClick={handleClick}>
                Disabled
            </ButtonGroup>
        );
        
        fireEvent.click(screen.getByText('Disabled'));
        expect(handleClick).not.toHaveBeenCalled();
    });
});

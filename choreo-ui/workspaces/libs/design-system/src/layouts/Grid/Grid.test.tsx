import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Grid } from './Grid';

describe('Grid', () => {
    it('should render children correctly', () => {
        render(<Grid>Test Content</Grid>);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
        const { container } = render(
            <Grid className="custom-class">Content</Grid>
        );
        expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should handle click events', () => {
        const handleClick = jest.fn();
        render(<Grid onClick={handleClick}>Clickable</Grid>);
        
        fireEvent.click(screen.getByText('Clickable'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should respect disabled state', () => {
        const handleClick = jest.fn();
        render(
            <Grid disabled onClick={handleClick}>
                Disabled
            </Grid>
        );
        
        fireEvent.click(screen.getByText('Disabled'));
        expect(handleClick).not.toHaveBeenCalled();
    });
});

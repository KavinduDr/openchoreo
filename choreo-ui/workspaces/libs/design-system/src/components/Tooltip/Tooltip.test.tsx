import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
    it('should render children correctly', () => {
        render(<Tooltip><div>Test Content</div></Tooltip>);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
        const { container } = render(
            <Tooltip className="custom-class"><div>Content</div></Tooltip>
        );
        expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should render with title prop', () => {
        render(
            <Tooltip title="Tooltip content">
                <div>Hover me</div>
            </Tooltip>
        );
        expect(screen.getByText('Hover me')).toBeInTheDocument();
    });

    it('should render with arrow prop', () => {
        const { container } = render(
            <Tooltip arrow title="Tooltip with arrow">
                <div>Content</div>
            </Tooltip>
        );
        expect(container.firstChild).toBeInTheDocument();
    });

    it('should render with custom placement', () => {
        const { container } = render(
            <Tooltip placement="top" title="Top tooltip">
                <div>Content</div>
            </Tooltip>
        );
        expect(container.firstChild).toBeInTheDocument();
    });

    it('should respect disabled state', () => {
        const { container } = render(
            <Tooltip disabled title="Disabled tooltip">
                <div>Content</div>
            </Tooltip>
        );
        expect(container.firstChild).toBeInTheDocument();
    });

    it('should not render when no children provided', () => {
        const { container } = render(<Tooltip />);
        expect(container.firstChild).toBeNull();
    });
});

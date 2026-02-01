/**
 * DataHubSection Tests
 * Phase 4 - STORY-060
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DataHubSection, DataHubSectionProps } from '../DataHubSection';
import { DataToolCard, DataToolCardProps, DataTool } from '../DataToolCard';

// Mock useInViewAnimation hook
jest.mock('../../../hooks/useInViewAnimation', () => ({
    useInViewAnimation: () => ({
        ref: { current: null },
        isInView: true,
        hasAnimated: true,
    }),
}));

describe('DataHubSection', () => {
    const mockTools: DataTool[] = [
        {
            id: 'winner-maps',
            name: 'Winner Maps',
            description: 'See which party won each constituency',
            icon: '🗺️',
            previewImageUrl: '/static/images/tools/winner-maps.jpg',
            path: '/data-hub/winner-maps',
            isNew: true,
        },
        {
            id: 'voter-turnout',
            name: 'Voter Turnout',
            description: 'Historical turnout trends by state',
            icon: '📈',
            previewImageUrl: '/static/images/tools/voter-turnout.jpg',
            path: '/data-hub/voter-turnout',
        },
        {
            id: 'party-performance',
            name: 'Party Performance',
            description: 'Track party success across elections',
            icon: '📊',
            previewImageUrl: '/static/images/tools/party-performance.jpg',
            path: '/data-hub/party-performance',
        },
    ];

    const defaultProps: DataHubSectionProps = {
        tools: mockTools,
    };

    beforeEach(() => {
        // Mock window.location
        delete (window as any).location;
        window.location = { href: '' } as Location;
    });

    describe('Rendering', () => {
        it('renders the section with default props', () => {
            render(<DataHubSection {...defaultProps} />);
            
            expect(screen.getByTestId('data-hub-section')).toBeInTheDocument();
            // "Data Hub" appears as both a label and heading, so check the heading by role
            expect(screen.getByRole('heading', { level: 2, name: 'Data Hub' })).toBeInTheDocument();
            expect(screen.getByText("Deep dive into India's biggest election database")).toBeInTheDocument();
        });

        it('renders custom title and subtitle', () => {
            render(
                <DataHubSection
                    {...defaultProps}
                    title="Custom Title"
                    subtitle="Custom subtitle"
                />
            );
            
            expect(screen.getByText('Custom Title')).toBeInTheDocument();
            expect(screen.getByText('Custom subtitle')).toBeInTheDocument();
        });

        it('renders all provided tools', () => {
            render(<DataHubSection {...defaultProps} />);
            
            expect(screen.getByTestId('data-tool-card-winner-maps')).toBeInTheDocument();
            expect(screen.getByTestId('data-tool-card-voter-turnout')).toBeInTheDocument();
            expect(screen.getByTestId('data-tool-card-party-performance')).toBeInTheDocument();
        });

        it('respects maxTools prop', () => {
            render(<DataHubSection {...defaultProps} maxTools={2} />);
            
            expect(screen.getByTestId('data-tool-card-winner-maps')).toBeInTheDocument();
            expect(screen.getByTestId('data-tool-card-voter-turnout')).toBeInTheDocument();
            expect(screen.queryByTestId('data-tool-card-party-performance')).not.toBeInTheDocument();
        });

        it('renders the grid container', () => {
            render(<DataHubSection {...defaultProps} />);
            
            expect(screen.getByTestId('data-hub-grid')).toBeInTheDocument();
        });

        it('renders with default tools when no tools provided', () => {
            render(<DataHubSection />);
            
            expect(screen.getByTestId('data-hub-section')).toBeInTheDocument();
            expect(screen.getByTestId('data-hub-grid')).toBeInTheDocument();
        });
    });

    describe('View All Button', () => {
        it('shows View All button when showViewAll is true and more tools exist', () => {
            render(
                <DataHubSection
                    tools={[...mockTools, ...mockTools]}
                    maxTools={3}
                    showViewAll={true}
                />
            );
            
            expect(screen.getByTestId('data-hub-view-all')).toBeInTheDocument();
        });

        it('hides View All button when showViewAll is false', () => {
            render(
                <DataHubSection
                    {...defaultProps}
                    showViewAll={false}
                />
            );
            
            expect(screen.queryByTestId('data-hub-view-all')).not.toBeInTheDocument();
        });

        it('navigates to viewAllUrl when clicked', () => {
            render(
                <DataHubSection
                    tools={[...mockTools, ...mockTools]}
                    maxTools={3}
                    viewAllUrl="/custom-data-hub"
                />
            );
            
            fireEvent.click(screen.getByTestId('data-hub-view-all'));
            expect(window.location.href).toBe('/custom-data-hub');
        });
    });

    describe('Tool Clicks', () => {
        it('calls onToolClick when tool is clicked', () => {
            const mockOnClick = jest.fn();
            render(
                <DataHubSection
                    {...defaultProps}
                    onToolClick={mockOnClick}
                />
            );
            
            fireEvent.click(screen.getByTestId('data-tool-card-winner-maps'));
            expect(mockOnClick).toHaveBeenCalledWith(mockTools[0]);
        });

        it('navigates to tool path when no onToolClick provided', () => {
            render(<DataHubSection {...defaultProps} />);
            
            fireEvent.click(screen.getByTestId('data-tool-card-winner-maps'));
            expect(window.location.href).toBe('/data-hub/winner-maps');
        });
    });

    describe('Accessibility', () => {
        it('has proper aria-labelledby attribute', () => {
            render(<DataHubSection {...defaultProps} />);
            
            const section = screen.getByTestId('data-hub-section');
            expect(section).toHaveAttribute('aria-labelledby', 'data-hub-title');
        });

        it('has proper heading structure', () => {
            render(<DataHubSection {...defaultProps} />);
            
            const heading = screen.getByRole('heading', { level: 2 });
            expect(heading).toHaveTextContent('Data Hub');
        });
    });
});

describe('DataToolCard', () => {
    const mockTool: DataTool = {
        id: 'test-tool',
        name: 'Test Tool',
        description: 'A test tool for testing',
        icon: '🧪',
        previewImageUrl: '/static/images/test.jpg',
        path: '/test-tool',
    };

    const defaultProps: DataToolCardProps = {
        tool: mockTool,
    };

    describe('Rendering', () => {
        it('renders the tool card', () => {
            render(<DataToolCard {...defaultProps} />);
            
            expect(screen.getByTestId('data-tool-card-test-tool')).toBeInTheDocument();
        });

        it('renders tool name and description', () => {
            render(<DataToolCard {...defaultProps} />);
            
            expect(screen.getByText('Test Tool')).toBeInTheDocument();
            expect(screen.getByText('A test tool for testing')).toBeInTheDocument();
        });

        it('renders tool icon', () => {
            render(<DataToolCard {...defaultProps} />);
            
            expect(screen.getByText('🧪')).toBeInTheDocument();
        });

        it('renders "Explore" CTA', () => {
            render(<DataToolCard {...defaultProps} />);
            
            expect(screen.getByText('Explore')).toBeInTheDocument();
        });

        it('uses custom testId when provided', () => {
            render(<DataToolCard {...defaultProps} testId="custom-test-id" />);
            
            expect(screen.getByTestId('custom-test-id')).toBeInTheDocument();
        });
    });

    describe('Badges', () => {
        it('renders "New" badge when isNew is true', () => {
            render(
                <DataToolCard
                    tool={{ ...mockTool, isNew: true }}
                />
            );
            
            expect(screen.getByText('New')).toBeInTheDocument();
        });

        it('does not render "New" badge when isNew is false', () => {
            render(<DataToolCard {...defaultProps} />);
            
            expect(screen.queryByText('New')).not.toBeInTheDocument();
        });

        it('renders "Premium" badge when isPremium is true', () => {
            render(
                <DataToolCard
                    tool={{ ...mockTool, isPremium: true }}
                />
            );
            
            expect(screen.getByText('⭐ Premium')).toBeInTheDocument();
        });

        it('does not render "Premium" badge when isPremium is false', () => {
            render(<DataToolCard {...defaultProps} />);
            
            expect(screen.queryByText('⭐ Premium')).not.toBeInTheDocument();
        });

        it('renders both badges when both flags are true', () => {
            render(
                <DataToolCard
                    tool={{ ...mockTool, isNew: true, isPremium: true }}
                />
            );
            
            expect(screen.getByText('New')).toBeInTheDocument();
            expect(screen.getByText('⭐ Premium')).toBeInTheDocument();
        });
    });

    describe('Interactions', () => {
        it('calls onClick when clicked', () => {
            const mockOnClick = jest.fn();
            render(<DataToolCard {...defaultProps} onClick={mockOnClick} />);
            
            fireEvent.click(screen.getByTestId('data-tool-card-test-tool'));
            expect(mockOnClick).toHaveBeenCalledWith(mockTool);
        });

        it('calls onClick on Enter key press', () => {
            const mockOnClick = jest.fn();
            render(<DataToolCard {...defaultProps} onClick={mockOnClick} />);
            
            const card = screen.getByTestId('data-tool-card-test-tool');
            fireEvent.keyDown(card, { key: 'Enter' });
            expect(mockOnClick).toHaveBeenCalledWith(mockTool);
        });

        it('calls onClick on Space key press', () => {
            const mockOnClick = jest.fn();
            render(<DataToolCard {...defaultProps} onClick={mockOnClick} />);
            
            const card = screen.getByTestId('data-tool-card-test-tool');
            fireEvent.keyDown(card, { key: ' ' });
            expect(mockOnClick).toHaveBeenCalledWith(mockTool);
        });

        it('does not call onClick on other key presses', () => {
            const mockOnClick = jest.fn();
            render(<DataToolCard {...defaultProps} onClick={mockOnClick} />);
            
            const card = screen.getByTestId('data-tool-card-test-tool');
            fireEvent.keyDown(card, { key: 'Tab' });
            expect(mockOnClick).not.toHaveBeenCalled();
        });
    });

    describe('Accessibility', () => {
        it('has role="button"', () => {
            render(<DataToolCard {...defaultProps} />);
            
            const card = screen.getByTestId('data-tool-card-test-tool');
            expect(card).toHaveAttribute('role', 'button');
        });

        it('has tabIndex for keyboard focus', () => {
            render(<DataToolCard {...defaultProps} />);
            
            const card = screen.getByTestId('data-tool-card-test-tool');
            expect(card).toHaveAttribute('tabIndex', '0');
        });

        it('has descriptive aria-label', () => {
            render(<DataToolCard {...defaultProps} />);
            
            const card = screen.getByTestId('data-tool-card-test-tool');
            expect(card).toHaveAttribute('aria-label', 'Open Test Tool - A test tool for testing');
        });
    });

    describe('Preview Image', () => {
        it('shows large icon when no preview image', () => {
            render(
                <DataToolCard
                    tool={{ ...mockTool, previewImageUrl: '' }}
                />
            );
            
            // The icon should appear in the preview area
            const icons = screen.getAllByText('🧪');
            expect(icons.length).toBeGreaterThanOrEqual(1);
        });
    });
});

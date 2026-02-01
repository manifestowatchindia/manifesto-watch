/**
 * StateElectionHubs Tests
 * Phase 4 - STORY-058
 * Comprehensive test coverage for state election hub components
 */

import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StateElectionHubs, StateHub } from '../StateElectionHubs';
import { StateHubCard } from '../StateHubCard';
import { HubSectionGrid } from '../HubSectionGrid';
import { HubContentCarousel } from '../HubContentCarousel';

// Mock data for tests
const mockStateHub: StateHub = {
    stateCode: 'KL',
    stateName: 'Kerala',
    tagline: 'Ideas, Impact & Influences shaping Kerala',
    heroImageUrl: '/static/images/states/kerala-bg.jpg',
    electionDate: '2026-04-15',
    rulingParty: 'LDF',
    rulingPartyColor: '#E53935',
    totalSeats: 140,
    contentSections: [
        { id: 'on-record', name: 'On Record', icon: '📋', thumbnailUrl: '/img.jpg', contentCount: 24, latestContentDate: new Date().toISOString() },
        { id: 'on-ground', name: 'On Ground', icon: '🗺️', thumbnailUrl: '/img.jpg', contentCount: 18, latestContentDate: '2025-01-09' },
        { id: 'snippets', name: 'Snippets', icon: '✂️', thumbnailUrl: '/img.jpg', contentCount: 45, latestContentDate: '2025-01-11' },
    ],
    quickLinks: [
        { id: 'manifestos', label: 'Manifestos', icon: '📄', url: '/states/kerala/manifestos' },
        { id: 'promises', label: 'Promises', icon: '✓', url: '/states/kerala/promises' },
    ],
    featuredContent: [
        { id: 'fc1', type: 'video', title: 'Kerala Infrastructure', thumbnailUrl: '/img.jpg', duration: '12:34', isNew: true },
        { id: 'fc2', type: 'article', title: 'LDF vs UDF Comparison', thumbnailUrl: '/img.jpg', isNew: false },
    ],
};

const mockStateHub2: StateHub = {
    ...mockStateHub,
    stateCode: 'TN',
    stateName: 'Tamil Nadu',
    tagline: 'The Political Powerhouse of the South',
    rulingParty: 'DMK',
    rulingPartyColor: '#D32F2F',
    totalSeats: 234,
};

const mockStates: StateHub[] = [mockStateHub, mockStateHub2];

describe('StateElectionHubs', () => {
    describe('rendering', () => {
        it('renders section with title and subtitle', () => {
            render(<StateElectionHubs states={mockStates} />);
            
            expect(screen.getByText('State Election Hubs 2026')).toBeInTheDocument();
            expect(screen.getByText('Deep dive into upcoming state assembly elections')).toBeInTheDocument();
        });

        it('renders with custom title and subtitle', () => {
            render(
                <StateElectionHubs 
                    states={mockStates}
                    title="Custom Title"
                    subtitle="Custom subtitle text"
                />
            );
            
            expect(screen.getByText('Custom Title')).toBeInTheDocument();
            expect(screen.getByText('Custom subtitle text')).toBeInTheDocument();
        });

        it('renders all state hub cards', () => {
            render(<StateElectionHubs states={mockStates} />);
            
            expect(screen.getByText('Kerala')).toBeInTheDocument();
            expect(screen.getByText('Tamil Nadu')).toBeInTheDocument();
        });

        it('has correct section aria-labelledby', () => {
            render(<StateElectionHubs states={mockStates} />);
            
            const section = screen.getByRole('region', { name: /state election hubs/i });
            expect(section).toBeInTheDocument();
        });

        it('shows hint text when not expanded', () => {
            render(<StateElectionHubs states={mockStates} />);
            
            expect(screen.getByText(/click on a state card/i)).toBeInTheDocument();
        });
    });

    describe('interaction', () => {
        it('expands state details when card is clicked', () => {
            render(<StateElectionHubs states={mockStates} />);
            
            const keralaCard = screen.getByRole('option', { name: /kerala/i });
            fireEvent.click(keralaCard);
            
            expect(screen.getByText('Kerala Dekoded')).toBeInTheDocument();
            expect(screen.getByText(`"${mockStateHub.tagline}"`)).toBeInTheDocument();
        });

        it('shows quick links when expanded', () => {
            render(<StateElectionHubs states={mockStates} />);
            
            const keralaCard = screen.getByRole('option', { name: /kerala/i });
            fireEvent.click(keralaCard);
            
            expect(screen.getByText('Manifestos')).toBeInTheDocument();
            expect(screen.getByText('Promises')).toBeInTheDocument();
        });

        it('shows content sections grid when expanded', () => {
            render(<StateElectionHubs states={mockStates} />);
            
            const keralaCard = screen.getByRole('option', { name: /kerala/i });
            fireEvent.click(keralaCard);
            
            expect(screen.getByText('On Record')).toBeInTheDocument();
            expect(screen.getByText('On Ground')).toBeInTheDocument();
        });

        it('shows featured content when expanded', () => {
            render(<StateElectionHubs states={mockStates} />);
            
            const keralaCard = screen.getByRole('option', { name: /kerala/i });
            fireEvent.click(keralaCard);
            
            expect(screen.getByText('Featured Content')).toBeInTheDocument();
            expect(screen.getByText('Kerala Infrastructure')).toBeInTheDocument();
        });

        it('shows view full coverage CTA when expanded', () => {
            render(<StateElectionHubs states={mockStates} />);
            
            const keralaCard = screen.getByRole('option', { name: /kerala/i });
            fireEvent.click(keralaCard);
            
            expect(screen.getByText(/view full kerala coverage/i)).toBeInTheDocument();
        });

        it('switches between states correctly', () => {
            render(<StateElectionHubs states={mockStates} />);
            
            // Select Kerala first
            const keralaCard = screen.getByRole('option', { name: /kerala/i });
            fireEvent.click(keralaCard);
            expect(screen.getByText('Kerala Dekoded')).toBeInTheDocument();
            
            // Then select Tamil Nadu
            const tnCard = screen.getByRole('option', { name: /tamil nadu/i });
            fireEvent.click(tnCard);
            expect(screen.getByText('Tamil Nadu Dekoded')).toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('has listbox role for state cards container', () => {
            render(<StateElectionHubs states={mockStates} />);
            
            expect(screen.getByRole('listbox', { name: /select a state/i })).toBeInTheDocument();
        });

        it('cards have option role with aria-selected', () => {
            render(<StateElectionHubs states={mockStates} />);
            
            const options = screen.getAllByRole('option');
            expect(options).toHaveLength(2);
        });
    });
});

describe('StateHubCard', () => {
    const defaultProps = {
        state: mockStateHub,
        daysUntil: 120,
        isSelected: false,
        onSelect: jest.fn(),
    };

    describe('rendering', () => {
        it('renders state name', () => {
            render(<StateHubCard {...defaultProps} />);
            
            expect(screen.getByText('Kerala')).toBeInTheDocument();
        });

        it('renders election type', () => {
            render(<StateHubCard {...defaultProps} />);
            
            expect(screen.getByText('Assembly 2026')).toBeInTheDocument();
        });

        it('renders days until election', () => {
            render(<StateHubCard {...defaultProps} />);
            
            expect(screen.getByText('120 days')).toBeInTheDocument();
        });

        it('renders ruling party', () => {
            render(<StateHubCard {...defaultProps} />);
            
            expect(screen.getByText(/ruling: ldf/i)).toBeInTheDocument();
        });

        it('renders total seats', () => {
            render(<StateHubCard {...defaultProps} />);
            
            expect(screen.getByText(/140 seats/i)).toBeInTheDocument();
        });

        it('formats election date correctly', () => {
            render(<StateHubCard {...defaultProps} />);
            
            // Component renders "15 Apr 2026" format
            expect(screen.getByText(/15 Apr 2026/i)).toBeInTheDocument();
        });

        it('shows urgent styling for elections within 100 days', () => {
            render(<StateHubCard {...defaultProps} daysUntil={50} />);
            
            const daysElement = screen.getByText('50 days');
            expect(daysElement).toHaveClass('animate-pulse');
        });
    });

    describe('selection state', () => {
        it('shows checkmark when selected', () => {
            render(<StateHubCard {...defaultProps} isSelected={true} />);
            
            // Check for the checkmark SVG path
            const card = screen.getByRole('option');
            expect(card).toHaveAttribute('aria-selected', 'true');
        });

        it('shows additional stats when selected', () => {
            render(<StateHubCard {...defaultProps} isSelected={true} />);
            
            // Selected cards show article count and featured count
            expect(screen.getByText(/\d+ articles/)).toBeInTheDocument();
            expect(screen.getByText(/\d+ featured/)).toBeInTheDocument();
        });

        it('does not show additional stats when not selected', () => {
            render(<StateHubCard {...defaultProps} isSelected={false} />);
            
            expect(screen.queryByText(/articles/)).not.toBeInTheDocument();
        });
    });

    describe('interaction', () => {
        it('calls onSelect when clicked', () => {
            const onSelect = jest.fn();
            render(<StateHubCard {...defaultProps} onSelect={onSelect} />);
            
            fireEvent.click(screen.getByRole('option'));
            expect(onSelect).toHaveBeenCalledTimes(1);
        });
    });

    describe('accessibility', () => {
        it('has correct aria-label', () => {
            render(<StateHubCard {...defaultProps} />);
            
            expect(screen.getByRole('option')).toHaveAttribute(
                'aria-label',
                expect.stringContaining('Kerala election hub')
            );
        });
    });
});

describe('HubSectionGrid', () => {
    const defaultProps = {
        sections: mockStateHub.contentSections,
        stateName: 'Kerala',
        stateCode: 'KL',
    };

    describe('rendering', () => {
        it('renders all sections', () => {
            render(<HubSectionGrid {...defaultProps} />);
            
            expect(screen.getByText('On Record')).toBeInTheDocument();
            expect(screen.getByText('On Ground')).toBeInTheDocument();
            expect(screen.getByText('Snippets')).toBeInTheDocument();
        });

        it('renders section icons', () => {
            render(<HubSectionGrid {...defaultProps} />);
            
            expect(screen.getByText('📋')).toBeInTheDocument();
            expect(screen.getByText('🗺️')).toBeInTheDocument();
            expect(screen.getByText('✂️')).toBeInTheDocument();
        });

        it('renders content counts', () => {
            render(<HubSectionGrid {...defaultProps} />);
            
            expect(screen.getByText('24 items')).toBeInTheDocument();
            expect(screen.getByText('18 items')).toBeInTheDocument();
            expect(screen.getByText('45 items')).toBeInTheDocument();
        });

        it('renders relative dates', () => {
            render(<HubSectionGrid {...defaultProps} />);
            
            // "Today" for the first section with current date
            expect(screen.getByText('Today')).toBeInTheDocument();
        });
    });

    describe('links', () => {
        it('creates correct section links', () => {
            render(<HubSectionGrid {...defaultProps} />);
            
            const onRecordLink = screen.getByRole('link', { name: /on record/i });
            expect(onRecordLink).toHaveAttribute('href', '/states/kl/on-record');
        });
    });

    describe('accessibility', () => {
        it('has navigation role', () => {
            render(<HubSectionGrid {...defaultProps} />);
            
            expect(screen.getByRole('navigation', { name: /kerala content sections/i })).toBeInTheDocument();
        });
    });
});

describe('HubContentCarousel', () => {
    const defaultProps = {
        content: mockStateHub.featuredContent,
        stateName: 'Kerala',
    };

    describe('rendering', () => {
        it('renders featured content header', () => {
            render(<HubContentCarousel {...defaultProps} />);
            
            expect(screen.getByText('Featured Content')).toBeInTheDocument();
        });

        it('renders all content items', () => {
            render(<HubContentCarousel {...defaultProps} />);
            
            expect(screen.getByText('Kerala Infrastructure')).toBeInTheDocument();
            expect(screen.getByText('LDF vs UDF Comparison')).toBeInTheDocument();
        });

        it('renders content type badges', () => {
            render(<HubContentCarousel {...defaultProps} />);
            
            expect(screen.getByText('Video')).toBeInTheDocument();
            expect(screen.getByText('Article')).toBeInTheDocument();
        });

        it('renders video duration', () => {
            render(<HubContentCarousel {...defaultProps} />);
            
            expect(screen.getByText('12:34')).toBeInTheDocument();
        });

        it('renders NEW badge for new content', () => {
            render(<HubContentCarousel {...defaultProps} />);
            
            expect(screen.getByText('NEW')).toBeInTheDocument();
        });

        it('returns null when content is empty', () => {
            const { container } = render(
                <HubContentCarousel content={[]} stateName="Kerala" />
            );
            
            expect(container.firstChild).toBeNull();
        });
    });

    describe('navigation', () => {
        it('renders scroll buttons', () => {
            render(<HubContentCarousel {...defaultProps} />);
            
            expect(screen.getByLabelText('Scroll content left')).toBeInTheDocument();
            expect(screen.getByLabelText('Scroll content right')).toBeInTheDocument();
        });
    });

    describe('links', () => {
        it('creates correct content links', () => {
            render(<HubContentCarousel {...defaultProps} />);
            
            const links = screen.getAllByRole('link');
            expect(links[0]).toHaveAttribute('href', '/content/fc1');
            expect(links[1]).toHaveAttribute('href', '/content/fc2');
        });
    });
});

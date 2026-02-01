/**
 * ManifestoLibrarySection Tests
 * Phase 4 - STORY-061
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ManifestoLibrarySection, ManifestoLibrarySectionProps, ManifestoCategory } from '../ManifestoLibrarySection';
import { ManifestoDownloadCard, ManifestoDownloadCardProps, ManifestoCardData } from '../ManifestoDownloadCard';

// Mock useInViewAnimation hook
jest.mock('../../../hooks/useInViewAnimation', () => ({
    useInViewAnimation: () => ({
        ref: { current: null },
        isInView: true,
        hasAnimated: true,
    }),
}));

describe('ManifestoLibrarySection', () => {
    const mockManifestos: ManifestoCardData[] = [
        {
            id: 'bjp-ls-2024',
            partyName: 'BJP',
            partyColor: '#FF9933',
            electionName: 'Lok Sabha',
            electionYear: 2024,
            languages: ['English', 'Hindi'],
            documentUrl: '/manifestos/bjp-lok-sabha-2024.pdf',
            isWinner: true,
            downloadCount: 45000,
        },
        {
            id: 'inc-ls-2024',
            partyName: 'Indian National Congress',
            partyColor: '#00BFFF',
            electionName: 'Lok Sabha',
            electionYear: 2024,
            languages: ['English', 'Hindi'],
            documentUrl: '/manifestos/inc-lok-sabha-2024.pdf',
            downloadCount: 32000,
        },
        {
            id: 'bjp-mh-2024',
            partyName: 'BJP',
            partyColor: '#FF9933',
            electionName: 'Maharashtra Assembly',
            electionYear: 2024,
            languages: ['English', 'Marathi'],
            documentUrl: '/manifestos/bjp-maharashtra-2024.pdf',
            downloadCount: 12000,
        },
        {
            id: 'bjp-ls-2019',
            partyName: 'BJP',
            partyColor: '#FF9933',
            electionName: 'Lok Sabha',
            electionYear: 2019,
            languages: ['English', 'Hindi'],
            documentUrl: '/manifestos/bjp-lok-sabha-2019.pdf',
            isWinner: true,
            downloadCount: 89000,
        },
    ];

    const defaultProps: ManifestoLibrarySectionProps = {
        manifestos: mockManifestos,
    };

    beforeEach(() => {
        // Mock window.location
        delete (window as any).location;
        window.location = { href: '' } as Location;
        
        // Mock window.open
        window.open = jest.fn();
        
        // Mock console.log
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('Rendering', () => {
        it('renders the section with default props', () => {
            render(<ManifestoLibrarySection {...defaultProps} />);
            
            expect(screen.getByTestId('manifesto-library-section')).toBeInTheDocument();
            // "Manifesto Library" appears as both a label and heading, so check the heading by role
            expect(screen.getByRole('heading', { level: 2, name: 'Manifesto Library' })).toBeInTheDocument();
            expect(screen.getByText('Access original party documents and manifestos')).toBeInTheDocument();
        });

        it('renders custom title and subtitle', () => {
            render(
                <ManifestoLibrarySection
                    {...defaultProps}
                    title="Custom Title"
                    subtitle="Custom subtitle"
                />
            );
            
            expect(screen.getByText('Custom Title')).toBeInTheDocument();
            expect(screen.getByText('Custom subtitle')).toBeInTheDocument();
        });

        it('renders the manifestos grid', () => {
            render(<ManifestoLibrarySection {...defaultProps} />);
            
            expect(screen.getByTestId('manifestos-grid')).toBeInTheDocument();
        });

        it('renders with default manifestos when none provided', () => {
            render(<ManifestoLibrarySection />);
            
            expect(screen.getByTestId('manifesto-library-section')).toBeInTheDocument();
            expect(screen.getByTestId('manifestos-grid')).toBeInTheDocument();
        });
    });

    describe('Category Tabs', () => {
        it('renders all category tabs', () => {
            render(<ManifestoLibrarySection {...defaultProps} />);
            
            expect(screen.getByTestId('category-tab-central-2024')).toBeInTheDocument();
            expect(screen.getByTestId('category-tab-state-2024')).toBeInTheDocument();
            expect(screen.getByTestId('category-tab-archives')).toBeInTheDocument();
        });

        it('has central-2024 as default active category', () => {
            render(<ManifestoLibrarySection {...defaultProps} />);
            
            const centralTab = screen.getByTestId('category-tab-central-2024');
            expect(centralTab).toHaveAttribute('aria-selected', 'true');
        });

        it('respects defaultCategory prop', () => {
            render(
                <ManifestoLibrarySection
                    {...defaultProps}
                    defaultCategory="archives"
                />
            );
            
            const archivesTab = screen.getByTestId('category-tab-archives');
            expect(archivesTab).toHaveAttribute('aria-selected', 'true');
        });

        it('changes category on tab click', () => {
            render(<ManifestoLibrarySection {...defaultProps} />);
            
            const stateTab = screen.getByTestId('category-tab-state-2024');
            fireEvent.click(stateTab);
            
            expect(stateTab).toHaveAttribute('aria-selected', 'true');
            expect(screen.getByTestId('category-tab-central-2024')).toHaveAttribute('aria-selected', 'false');
        });

        it('filters manifestos by Central 2024 category', () => {
            render(<ManifestoLibrarySection {...defaultProps} />);
            
            // Central 2024 should show Lok Sabha 2024 manifestos
            expect(screen.getByTestId('manifesto-card-bjp-ls-2024')).toBeInTheDocument();
            expect(screen.getByTestId('manifesto-card-inc-ls-2024')).toBeInTheDocument();
            // State 2024 should not be visible
            expect(screen.queryByTestId('manifesto-card-bjp-mh-2024')).not.toBeInTheDocument();
        });

        it('filters manifestos by State 2024 category', () => {
            render(<ManifestoLibrarySection {...defaultProps} />);
            
            fireEvent.click(screen.getByTestId('category-tab-state-2024'));
            
            // State 2024 should show non-Lok Sabha 2024 manifestos
            expect(screen.getByTestId('manifesto-card-bjp-mh-2024')).toBeInTheDocument();
            // Central 2024 should not be visible
            expect(screen.queryByTestId('manifesto-card-bjp-ls-2024')).not.toBeInTheDocument();
        });

        it('filters manifestos by Archives category', () => {
            render(<ManifestoLibrarySection {...defaultProps} />);
            
            fireEvent.click(screen.getByTestId('category-tab-archives'));
            
            // Archives should show pre-2024 manifestos
            expect(screen.getByTestId('manifesto-card-bjp-ls-2019')).toBeInTheDocument();
            // 2024 manifestos should not be visible
            expect(screen.queryByTestId('manifesto-card-bjp-ls-2024')).not.toBeInTheDocument();
        });
    });

    describe('Empty State', () => {
        it('shows empty message when no manifestos match category', () => {
            const emptyManifestos: ManifestoCardData[] = [];
            render(
                <ManifestoLibrarySection
                    manifestos={emptyManifestos}
                />
            );
            
            expect(screen.getByTestId('no-manifestos-message')).toBeInTheDocument();
            expect(screen.getByText('No manifestos available in this category yet.')).toBeInTheDocument();
        });
    });

    describe('Browse All Button', () => {
        it('shows Browse All button by default', () => {
            render(<ManifestoLibrarySection {...defaultProps} />);
            
            expect(screen.getByTestId('manifesto-browse-all')).toBeInTheDocument();
        });

        it('hides Browse All button when showBrowseAll is false', () => {
            render(
                <ManifestoLibrarySection
                    {...defaultProps}
                    showBrowseAll={false}
                />
            );
            
            expect(screen.queryByTestId('manifesto-browse-all')).not.toBeInTheDocument();
        });

        it('navigates to browseAllUrl when clicked', () => {
            render(
                <ManifestoLibrarySection
                    {...defaultProps}
                    browseAllUrl="/custom-manifestos"
                />
            );
            
            fireEvent.click(screen.getByTestId('manifesto-browse-all'));
            expect(window.location.href).toBe('/custom-manifestos');
        });

        it('displays total count in button text', () => {
            render(
                <ManifestoLibrarySection
                    {...defaultProps}
                    totalCount={500}
                />
            );
            
            expect(screen.getByText('Browse All 500+ Manifestos')).toBeInTheDocument();
        });
    });

    describe('Download Handling', () => {
        it('calls onDownload when manifesto download is clicked', () => {
            const mockOnDownload = jest.fn();
            render(
                <ManifestoLibrarySection
                    {...defaultProps}
                    onDownload={mockOnDownload}
                />
            );
            
            fireEvent.click(screen.getByTestId('download-btn-bjp-ls-2024'));
            expect(mockOnDownload).toHaveBeenCalledWith(mockManifestos[0]);
        });

        it('opens document URL in new tab when no onDownload provided', () => {
            render(<ManifestoLibrarySection {...defaultProps} />);
            
            fireEvent.click(screen.getByTestId('download-btn-bjp-ls-2024'));
            expect(window.open).toHaveBeenCalledWith(
                '/manifestos/bjp-lok-sabha-2024.pdf',
                '_blank',
                'noopener,noreferrer'
            );
        });
    });

    describe('Accessibility', () => {
        it('has proper aria-labelledby attribute', () => {
            render(<ManifestoLibrarySection {...defaultProps} />);
            
            const section = screen.getByTestId('manifesto-library-section');
            expect(section).toHaveAttribute('aria-labelledby', 'manifesto-library-title');
        });

        it('has proper heading structure', () => {
            render(<ManifestoLibrarySection {...defaultProps} />);
            
            const heading = screen.getByRole('heading', { level: 2 });
            expect(heading).toHaveTextContent('Manifesto Library');
        });

        it('has tablist role on category tabs', () => {
            render(<ManifestoLibrarySection {...defaultProps} />);
            
            const tablist = screen.getByTestId('manifesto-category-tabs');
            expect(tablist).toHaveAttribute('role', 'tablist');
        });

        it('has tab role on individual category buttons', () => {
            render(<ManifestoLibrarySection {...defaultProps} />);
            
            const tab = screen.getByTestId('category-tab-central-2024');
            expect(tab).toHaveAttribute('role', 'tab');
        });

        it('has tabpanel role on manifestos grid', () => {
            render(<ManifestoLibrarySection {...defaultProps} />);
            
            const tabpanel = screen.getByTestId('manifestos-grid');
            expect(tabpanel).toHaveAttribute('role', 'tabpanel');
        });
    });
});

describe('ManifestoDownloadCard', () => {
    const mockManifesto: ManifestoCardData = {
        id: 'test-manifesto',
        partyName: 'Test Party',
        partyColor: '#FF0000',
        electionName: 'Test Election',
        electionYear: 2024,
        languages: ['English', 'Hindi'],
        documentUrl: '/test.pdf',
        downloadCount: 1000,
    };

    const defaultProps: ManifestoDownloadCardProps = {
        manifesto: mockManifesto,
    };

    beforeEach(() => {
        window.open = jest.fn();
    });

    describe('Rendering', () => {
        it('renders the card', () => {
            render(<ManifestoDownloadCard {...defaultProps} />);
            
            expect(screen.getByTestId('manifesto-card-test-manifesto')).toBeInTheDocument();
        });

        it('renders party name and election info', () => {
            render(<ManifestoDownloadCard {...defaultProps} />);
            
            expect(screen.getByText('Test Party')).toBeInTheDocument();
            expect(screen.getByText('Test Election 2024')).toBeInTheDocument();
        });

        it('renders languages', () => {
            render(<ManifestoDownloadCard {...defaultProps} />);
            
            expect(screen.getByText('English')).toBeInTheDocument();
            expect(screen.getByText('Hindi')).toBeInTheDocument();
        });

        it('renders download count', () => {
            render(<ManifestoDownloadCard {...defaultProps} />);
            
            expect(screen.getByText('📥 1,000 downloads')).toBeInTheDocument();
        });

        it('uses custom testId when provided', () => {
            render(<ManifestoDownloadCard {...defaultProps} testId="custom-test-id" />);
            
            expect(screen.getByTestId('custom-test-id')).toBeInTheDocument();
        });

        it('renders party abbreviation when no logo', () => {
            render(<ManifestoDownloadCard {...defaultProps} />);
            
            expect(screen.getByText('TES')).toBeInTheDocument(); // First 3 letters of "Test Party"
        });
    });

    describe('Winner Badge', () => {
        it('shows winner badge when isWinner is true', () => {
            render(
                <ManifestoDownloadCard
                    manifesto={{ ...mockManifesto, isWinner: true }}
                />
            );
            
            expect(screen.getByText('Winner')).toBeInTheDocument();
        });

        it('does not show winner badge when isWinner is false', () => {
            render(<ManifestoDownloadCard {...defaultProps} />);
            
            expect(screen.queryByText('Winner')).not.toBeInTheDocument();
        });
    });

    describe('Download Button', () => {
        it('renders download button', () => {
            render(<ManifestoDownloadCard {...defaultProps} />);
            
            expect(screen.getByTestId('download-btn-test-manifesto')).toBeInTheDocument();
            expect(screen.getByText('Download PDF')).toBeInTheDocument();
        });

        it('opens document URL when clicked', () => {
            render(<ManifestoDownloadCard {...defaultProps} />);
            
            fireEvent.click(screen.getByTestId('download-btn-test-manifesto'));
            expect(window.open).toHaveBeenCalledWith('/test.pdf', '_blank', 'noopener,noreferrer');
        });

        it('calls onDownload when provided', () => {
            const mockOnDownload = jest.fn();
            render(
                <ManifestoDownloadCard
                    {...defaultProps}
                    onDownload={mockOnDownload}
                />
            );
            
            fireEvent.click(screen.getByTestId('download-btn-test-manifesto'));
            expect(mockOnDownload).toHaveBeenCalledWith(mockManifesto);
        });

        it('shows "Coming Soon" when no documentUrl', () => {
            render(
                <ManifestoDownloadCard
                    manifesto={{ ...mockManifesto, documentUrl: null }}
                />
            );
            
            expect(screen.getByText('Coming Soon')).toBeInTheDocument();
        });

        it('disables button when no documentUrl', () => {
            render(
                <ManifestoDownloadCard
                    manifesto={{ ...mockManifesto, documentUrl: null }}
                />
            );
            
            const button = screen.getByTestId('download-btn-test-manifesto');
            expect(button).toBeDisabled();
        });

        it('triggers download on Enter key', () => {
            const mockOnDownload = jest.fn();
            render(
                <ManifestoDownloadCard
                    {...defaultProps}
                    onDownload={mockOnDownload}
                />
            );
            
            const button = screen.getByTestId('download-btn-test-manifesto');
            fireEvent.keyDown(button, { key: 'Enter' });
            expect(mockOnDownload).toHaveBeenCalled();
        });

        it('triggers download on Space key', () => {
            const mockOnDownload = jest.fn();
            render(
                <ManifestoDownloadCard
                    {...defaultProps}
                    onDownload={mockOnDownload}
                />
            );
            
            const button = screen.getByTestId('download-btn-test-manifesto');
            fireEvent.keyDown(button, { key: ' ' });
            expect(mockOnDownload).toHaveBeenCalled();
        });
    });

    describe('Accessibility', () => {
        it('has descriptive aria-label on download button', () => {
            render(<ManifestoDownloadCard {...defaultProps} />);
            
            const button = screen.getByTestId('download-btn-test-manifesto');
            expect(button).toHaveAttribute(
                'aria-label',
                'Download Test Party Test Election 2024 manifesto'
            );
        });
    });

    describe('Download Count Display', () => {
        it('hides download count when zero', () => {
            render(
                <ManifestoDownloadCard
                    manifesto={{ ...mockManifesto, downloadCount: 0 }}
                />
            );
            
            expect(screen.queryByText(/downloads/)).not.toBeInTheDocument();
        });

        it('hides download count when undefined', () => {
            const { downloadCount, ...manifestoWithoutCount } = mockManifesto;
            render(
                <ManifestoDownloadCard
                    manifesto={manifestoWithoutCount as ManifestoCardData}
                />
            );
            
            expect(screen.queryByText(/downloads/)).not.toBeInTheDocument();
        });
    });
});

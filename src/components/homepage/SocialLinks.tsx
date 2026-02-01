/**
 * SocialLinks - Social media links component
 * Phase 4 - STORY-064
 */

import React from 'react';

export interface SocialLink {
    id: string;
    name: string;
    icon: string;
    url: string;
    color: string;
}

export interface SocialLinksProps {
    /** Custom social links */
    links?: SocialLink[];
    /** Size variant */
    size?: 'small' | 'medium' | 'large';
    /** Show labels */
    showLabels?: boolean;
}

const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
    {
        id: 'twitter',
        name: 'Twitter',
        icon: '𝕏',
        url: 'https://twitter.com/manifestowatch',
        color: '#000000',
    },
    {
        id: 'instagram',
        name: 'Instagram',
        icon: '📷',
        url: 'https://instagram.com/manifestowatch',
        color: '#E4405F',
    },
    {
        id: 'youtube',
        name: 'YouTube',
        icon: '▶️',
        url: 'https://youtube.com/@manifestowatch',
        color: '#FF0000',
    },
    {
        id: 'linkedin',
        name: 'LinkedIn',
        icon: '💼',
        url: 'https://linkedin.com/company/manifestowatch',
        color: '#0A66C2',
    },
];

const SIZE_MAP = {
    small: { icon: '1.25rem', padding: '8px' },
    medium: { icon: '1.5rem', padding: '12px' },
    large: { icon: '2rem', padding: '16px' },
};

export const SocialLinks: React.FC<SocialLinksProps> = ({
    links = DEFAULT_SOCIAL_LINKS,
    size = 'medium',
    showLabels = false,
}) => {
    const sizeStyles = SIZE_MAP[size];

    return (
        <div
            className="social-links"
            data-testid="social-links"
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                flexWrap: 'wrap',
            }}
        >
            {links.map((link) => (
                <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    data-testid={`social-link-${link.id}`}
                    aria-label={`Follow us on ${link.name}`}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: sizeStyles.padding,
                        backgroundColor: '#f3f4f6',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: '#1f2937',
                        transition: 'background-color 0.2s ease, transform 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = link.color;
                        e.currentTarget.style.color = '#ffffff';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                        e.currentTarget.style.color = '#1f2937';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    <span
                        style={{
                            fontSize: sizeStyles.icon,
                        }}
                        aria-hidden="true"
                    >
                        {link.icon}
                    </span>
                    {showLabels && (
                        <span
                            style={{
                                fontSize: '0.875rem',
                                fontWeight: 500,
                            }}
                        >
                            {link.name}
                        </span>
                    )}
                </a>
            ))}
        </div>
    );
};

export default SocialLinks;

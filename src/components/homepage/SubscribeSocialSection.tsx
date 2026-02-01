/**
 * SubscribeSocialSection - Subscribe & Social media section
 * Phase 4 - STORY-064
 * Email/WhatsApp subscription and social media links
 */

import React, { useState, useCallback } from 'react';
import { SocialLinks } from './SocialLinks';
import { useInViewAnimation } from '../../hooks/useInViewAnimation';

export interface SubscriptionFormData {
    email: string;
    phone: string;
    subscriptions: {
        email: boolean;
        whatsapp: boolean;
    };
    consent: boolean;
}

export interface SubscribeSocialSectionProps {
    /** Section title */
    title?: string;
    /** Section subtitle */
    subtitle?: string;
    /** Email submission handler */
    onEmailSubmit?: (email: string) => Promise<void>;
    /** WhatsApp submission handler */
    onWhatsAppSubmit?: (phone: string) => Promise<void>;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * Validate email format
 */
const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate Indian phone number
 */
const isValidPhone = (phone: string): boolean => {
    const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * SubscribeSocialSection Component
 */
export const SubscribeSocialSection: React.FC<SubscribeSocialSectionProps> = ({
    title = 'Stay Informed',
    subtitle = 'Get updates on elections, promises, and political analysis',
    onEmailSubmit,
    onWhatsAppSubmit,
}) => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [emailConsent, setEmailConsent] = useState(false);
    const [whatsAppConsent, setWhatsAppConsent] = useState(false);
    const [emailStatus, setEmailStatus] = useState<SubmitStatus>('idle');
    const [whatsAppStatus, setWhatsAppStatus] = useState<SubmitStatus>('idle');
    const [emailError, setEmailError] = useState<string | null>(null);
    const [phoneError, setPhoneError] = useState<string | null>(null);

    const { ref, isInView, hasAnimated } = useInViewAnimation({
        threshold: 0.1,
        triggerOnce: true,
    });

    const handleEmailSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setEmailError(null);

        if (!email.trim()) {
            setEmailError('Please enter your email address');
            return;
        }

        if (!isValidEmail(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }

        if (!emailConsent) {
            setEmailError('Please agree to receive email updates');
            return;
        }

        setEmailStatus('loading');

        try {
            if (onEmailSubmit) {
                await onEmailSubmit(email);
            } else {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            setEmailStatus('success');
            setEmail('');
            setEmailConsent(false);
        } catch {
            setEmailStatus('error');
            setEmailError('Something went wrong. Please try again.');
        }
    }, [email, emailConsent, onEmailSubmit]);

    const handleWhatsAppSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setPhoneError(null);

        if (!phone.trim()) {
            setPhoneError('Please enter your phone number');
            return;
        }

        if (!isValidPhone(phone)) {
            setPhoneError('Please enter a valid Indian mobile number');
            return;
        }

        if (!whatsAppConsent) {
            setPhoneError('Please agree to receive WhatsApp updates');
            return;
        }

        setWhatsAppStatus('loading');

        try {
            if (onWhatsAppSubmit) {
                await onWhatsAppSubmit(phone);
            } else {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            setWhatsAppStatus('success');
            setPhone('');
            setWhatsAppConsent(false);
        } catch {
            setWhatsAppStatus('error');
            setPhoneError('Something went wrong. Please try again.');
        }
    }, [phone, whatsAppConsent, onWhatsAppSubmit]);

    const shouldAnimate = isInView || hasAnimated;

    return (
        <section
            ref={ref}
            className="subscribe-social-section"
            data-testid="subscribe-social-section"
            aria-labelledby="subscribe-title"
            style={{
                padding: '64px 24px',
                backgroundColor: '#1f2937',
                color: '#ffffff',
            }}
        >
            <div
                className="subscribe-container"
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                }}
            >
                {/* Section Header */}
                <header
                    className="subscribe-header"
                    style={{
                        marginBottom: '40px',
                        textAlign: 'center',
                        opacity: shouldAnimate ? 1 : 0,
                        transform: shouldAnimate ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.6s ease, transform 0.6s ease',
                    }}
                >
                    <div
                        className="section-label"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            marginBottom: '12px',
                        }}
                    >
                        <span style={{ fontSize: '1.5rem' }} aria-hidden="true">📬</span>
                        <span
                            style={{
                                color: '#60a5fa',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                            }}
                        >
                            Stay Informed
                        </span>
                    </div>

                    <h2
                        id="subscribe-title"
                        style={{
                            margin: '0 0 12px 0',
                            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                            fontWeight: 700,
                            color: '#ffffff',
                        }}
                    >
                        {title}
                    </h2>

                    <p
                        style={{
                            margin: 0,
                            fontSize: '1.125rem',
                            color: '#9ca3af',
                            maxWidth: '600px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}
                    >
                        {subtitle}
                    </p>
                </header>

                {/* Subscription Forms Grid */}
                <div
                    className="forms-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '24px',
                        marginBottom: '48px',
                    }}
                >
                    {/* Email Subscription Form */}
                    <div
                        className="email-form-container"
                        style={{
                            opacity: shouldAnimate ? 1 : 0,
                            transform: shouldAnimate ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
                        }}
                    >
                        <form
                            onSubmit={handleEmailSubmit}
                            className="email-form"
                            data-testid="email-subscribe-form"
                            style={{
                                padding: '24px',
                                backgroundColor: '#374151',
                                borderRadius: '12px',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    marginBottom: '16px',
                                }}
                            >
                                <span style={{ fontSize: '1.25rem' }} aria-hidden="true">📧</span>
                                <h3
                                    style={{
                                        margin: 0,
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                    }}
                                >
                                    Email Updates
                                </h3>
                            </div>

                            {emailStatus === 'success' ? (
                                <div
                                    className="success-message"
                                    data-testid="email-success"
                                    style={{
                                        padding: '16px',
                                        backgroundColor: '#065f46',
                                        borderRadius: '8px',
                                        textAlign: 'center',
                                    }}
                                >
                                    <span style={{ fontSize: '1.5rem' }}>✅</span>
                                    <p style={{ margin: '8px 0 0 0' }}>
                                        Thanks for subscribing! Check your inbox.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div style={{ marginBottom: '12px' }}>
                                        <label htmlFor="email-input" className="sr-only">
                                            Email address
                                        </label>
                                        <input
                                            id="email-input"
                                            type="email"
                                            placeholder="your@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            data-testid="email-input"
                                            aria-describedby={emailError ? 'email-error' : undefined}
                                            style={{
                                                width: '100%',
                                                padding: '12px 16px',
                                                backgroundColor: '#1f2937',
                                                border: emailError ? '2px solid #ef4444' : '2px solid #4b5563',
                                                borderRadius: '8px',
                                                color: '#ffffff',
                                                fontSize: '1rem',
                                                outline: 'none',
                                                boxSizing: 'border-box',
                                            }}
                                        />
                                        {emailError && (
                                            <p
                                                id="email-error"
                                                style={{
                                                    margin: '8px 0 0 0',
                                                    color: '#fca5a5',
                                                    fontSize: '0.875rem',
                                                }}
                                                role="alert"
                                            >
                                                {emailError}
                                            </p>
                                        )}
                                    </div>

                                    <div style={{ marginBottom: '16px' }}>
                                        <label
                                            style={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: '8px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={emailConsent}
                                                onChange={(e) => setEmailConsent(e.target.checked)}
                                                data-testid="email-consent"
                                                style={{
                                                    marginTop: '4px',
                                                    width: '16px',
                                                    height: '16px',
                                                    accentColor: '#3b82f6',
                                                }}
                                            />
                                            <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                                                I agree to receive email updates about elections and political analysis
                                            </span>
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={emailStatus === 'loading'}
                                        data-testid="email-submit"
                                        style={{
                                            width: '100%',
                                            padding: '12px 24px',
                                            backgroundColor: emailStatus === 'loading' ? '#6b7280' : '#3b82f6',
                                            color: '#ffffff',
                                            border: 'none',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                            cursor: emailStatus === 'loading' ? 'wait' : 'pointer',
                                            transition: 'background-color 0.2s ease',
                                        }}
                                    >
                                        {emailStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                                    </button>
                                </>
                            )}
                        </form>
                    </div>

                    {/* WhatsApp Subscription Form */}
                    <div
                        className="whatsapp-form-container"
                        style={{
                            opacity: shouldAnimate ? 1 : 0,
                            transform: shouldAnimate ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
                        }}
                    >
                        <form
                            onSubmit={handleWhatsAppSubmit}
                            className="whatsapp-form"
                            data-testid="whatsapp-subscribe-form"
                            style={{
                                padding: '24px',
                                backgroundColor: '#374151',
                                borderRadius: '12px',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    marginBottom: '16px',
                                }}
                            >
                                <span style={{ fontSize: '1.25rem' }} aria-hidden="true">📱</span>
                                <h3
                                    style={{
                                        margin: 0,
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                    }}
                                >
                                    WhatsApp Updates
                                </h3>
                            </div>

                            {whatsAppStatus === 'success' ? (
                                <div
                                    className="success-message"
                                    data-testid="whatsapp-success"
                                    style={{
                                        padding: '16px',
                                        backgroundColor: '#065f46',
                                        borderRadius: '8px',
                                        textAlign: 'center',
                                    }}
                                >
                                    <span style={{ fontSize: '1.5rem' }}>✅</span>
                                    <p style={{ margin: '8px 0 0 0' }}>
                                        You'll receive updates on WhatsApp soon!
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div style={{ marginBottom: '12px' }}>
                                        <label htmlFor="phone-input" className="sr-only">
                                            WhatsApp number
                                        </label>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    padding: '12px 16px',
                                                    backgroundColor: '#4b5563',
                                                    border: '2px solid #4b5563',
                                                    borderRight: 'none',
                                                    borderRadius: '8px 0 0 8px',
                                                    color: '#9ca3af',
                                                    fontSize: '1rem',
                                                }}
                                            >
                                                +91
                                            </span>
                                            <input
                                                id="phone-input"
                                                type="tel"
                                                placeholder="XXXXX XXXXX"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                data-testid="phone-input"
                                                aria-describedby={phoneError ? 'phone-error' : undefined}
                                                style={{
                                                    flex: 1,
                                                    padding: '12px 16px',
                                                    backgroundColor: '#1f2937',
                                                    border: phoneError ? '2px solid #ef4444' : '2px solid #4b5563',
                                                    borderRadius: '0 8px 8px 0',
                                                    color: '#ffffff',
                                                    fontSize: '1rem',
                                                    outline: 'none',
                                                }}
                                            />
                                        </div>
                                        {phoneError && (
                                            <p
                                                id="phone-error"
                                                style={{
                                                    margin: '8px 0 0 0',
                                                    color: '#fca5a5',
                                                    fontSize: '0.875rem',
                                                }}
                                                role="alert"
                                            >
                                                {phoneError}
                                            </p>
                                        )}
                                    </div>

                                    <div style={{ marginBottom: '16px' }}>
                                        <label
                                            style={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: '8px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={whatsAppConsent}
                                                onChange={(e) => setWhatsAppConsent(e.target.checked)}
                                                data-testid="whatsapp-consent"
                                                style={{
                                                    marginTop: '4px',
                                                    width: '16px',
                                                    height: '16px',
                                                    accentColor: '#22c55e',
                                                }}
                                            />
                                            <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                                                I agree to receive WhatsApp messages about elections
                                            </span>
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={whatsAppStatus === 'loading'}
                                        data-testid="whatsapp-submit"
                                        style={{
                                            width: '100%',
                                            padding: '12px 24px',
                                            backgroundColor: whatsAppStatus === 'loading' ? '#6b7280' : '#22c55e',
                                            color: '#ffffff',
                                            border: 'none',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                            cursor: whatsAppStatus === 'loading' ? 'wait' : 'pointer',
                                            transition: 'background-color 0.2s ease',
                                        }}
                                    >
                                        {whatsAppStatus === 'loading' ? 'Joining...' : 'Join WhatsApp'}
                                    </button>
                                </>
                            )}
                        </form>
                    </div>
                </div>

                {/* Social Links */}
                <div
                    className="social-section"
                    style={{
                        textAlign: 'center',
                        opacity: shouldAnimate ? 1 : 0,
                        transform: shouldAnimate ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s',
                    }}
                >
                    <p
                        style={{
                            margin: '0 0 16px 0',
                            color: '#9ca3af',
                            fontSize: '0.875rem',
                        }}
                    >
                        Follow us on social media
                    </p>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <SocialLinks size="medium" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SubscribeSocialSection;

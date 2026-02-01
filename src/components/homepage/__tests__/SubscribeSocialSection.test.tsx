import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { SubscribeSocialSection } from '../SubscribeSocialSection';

describe('SubscribeSocialSection', () => {
  it('renders without crashing', () => {
    render(<SubscribeSocialSection />);
    expect(screen.getByTestId('subscribe-social-section')).toBeInTheDocument();
  });

  it('renders email subscription form', () => {
    render(<SubscribeSocialSection />);
    expect(screen.getByPlaceholderText(/your@email.com/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Subscribe/i })).toBeInTheDocument();
  });

  it('renders WhatsApp subscription form', () => {
    render(<SubscribeSocialSection />);
    expect(screen.getByPlaceholderText(/XXXXX XXXXX/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Join WhatsApp/i })).toBeInTheDocument();
  });

  it('renders social links section', () => {
    render(<SubscribeSocialSection />);
    expect(screen.getByText(/Follow us on social media/i)).toBeInTheDocument();
  });

  it('validates email format - invalid email', async () => {
    render(<SubscribeSocialSection />);
    
    const emailInput = screen.getByPlaceholderText(/your@email.com/i);
    const emailConsent = screen.getByLabelText(/I agree to receive email/i);
    const submitButton = screen.getByRole('button', { name: /Subscribe/i });
    
    await userEvent.type(emailInput, 'invalid-email');
    await userEvent.click(emailConsent);
    await userEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid email/i)).toBeInTheDocument();
    });
  });

  it('validates email format - valid email', async () => {
    render(<SubscribeSocialSection />);
    
    const emailInput = screen.getByPlaceholderText(/your@email.com/i);
    const emailConsent = screen.getByLabelText(/I agree to receive email/i);
    const submitButton = screen.getByRole('button', { name: /Subscribe/i });
    
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.click(emailConsent);
    await userEvent.click(submitButton);
    
    // Should not show email validation error
    await waitFor(() => {
      expect(screen.queryByText(/Please enter a valid email/i)).not.toBeInTheDocument();
    });
  });

  it('requires consent checkbox for email', async () => {
    render(<SubscribeSocialSection />);
    
    const emailInput = screen.getByPlaceholderText(/your@email.com/i);
    const submitButton = screen.getByRole('button', { name: /Subscribe/i });
    
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Please agree to receive email/i)).toBeInTheDocument();
    });
  });

  it('validates phone format - invalid phone', async () => {
    render(<SubscribeSocialSection />);
    
    const phoneInput = screen.getByPlaceholderText(/XXXXX XXXXX/i);
    const phoneConsent = screen.getByLabelText(/I agree to receive WhatsApp/i);
    const joinButton = screen.getByRole('button', { name: /Join WhatsApp/i });
    
    await userEvent.type(phoneInput, '12345');
    await userEvent.click(phoneConsent);
    await userEvent.click(joinButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid Indian mobile/i)).toBeInTheDocument();
    });
  });

  it('validates phone format - valid phone', async () => {
    render(<SubscribeSocialSection />);
    
    const phoneInput = screen.getByPlaceholderText(/XXXXX XXXXX/i);
    const phoneConsent = screen.getByLabelText(/I agree to receive WhatsApp/i);
    const joinButton = screen.getByRole('button', { name: /Join WhatsApp/i });
    
    await userEvent.type(phoneInput, '9876543210');
    await userEvent.click(phoneConsent);
    await userEvent.click(joinButton);
    
    // Should not show phone validation error
    await waitFor(() => {
      expect(screen.queryByText(/Please enter a valid Indian mobile/i)).not.toBeInTheDocument();
    });
  });

  it('requires consent checkbox for WhatsApp', async () => {
    render(<SubscribeSocialSection />);
    
    const phoneInput = screen.getByPlaceholderText(/XXXXX XXXXX/i);
    const joinButton = screen.getByRole('button', { name: /Join WhatsApp/i });
    
    await userEvent.type(phoneInput, '9876543210');
    await userEvent.click(joinButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Please agree to receive WhatsApp/i)).toBeInTheDocument();
    });
  });

  it('shows success message on email submission', async () => {
    render(<SubscribeSocialSection />);
    
    const emailInput = screen.getByPlaceholderText(/your@email.com/i);
    const emailConsent = screen.getByLabelText(/I agree to receive email/i);
    const submitButton = screen.getByRole('button', { name: /Subscribe/i });
    
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.click(emailConsent);
    await userEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Thanks for subscribing/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('has accessible form labels', () => {
    render(<SubscribeSocialSection />);
    
    // Email form should have proper labeling
    const emailInput = screen.getByPlaceholderText(/your@email.com/i);
    expect(emailInput).toHaveAttribute('type', 'email');
    
    // Phone form should have proper labeling  
    const phoneInput = screen.getByPlaceholderText(/XXXXX XXXXX/i);
    expect(phoneInput).toHaveAttribute('type', 'tel');
  });
});

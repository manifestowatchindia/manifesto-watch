import React, { useState } from 'react';
import { Input } from './ui';

export const InputShowcase: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [search, setSearch] = useState('');
  const [disabled, setDisabled] = useState('Cannot edit');

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-12">
      <div>
        <h1 className="text-display-sm font-bold text-gray-900 mb-2">Input Component Showcase</h1>
        <p className="text-body text-gray-600">
          Form input component with error states, icons, and accessibility features
        </p>
      </div>

      {/* Basic Inputs */}
      <section className="space-y-4">
        <h2 className="text-heading-lg font-semibold text-gray-800">Basic Inputs</h2>
        
        <Input 
          label="Email Address" 
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <Input 
          label="Password" 
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <Input 
          label="Full Name" 
          placeholder="Enter your name"
        />
      </section>

      {/* With Icons */}
      <section className="space-y-4">
        <h2 className="text-heading-lg font-semibold text-gray-800">With Icons</h2>
        
        <Input 
          label="Search Promises" 
          type="search"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leadingIcon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          }
        />
        
        <Input 
          label="Verified Email" 
          type="email"
          value="verified@example.com"
          readOnly
          trailingIcon={
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          }
        />
        
        <Input 
          label="Amount" 
          type="number"
          placeholder="0.00"
          leadingIcon={<span className="text-gray-600">₹</span>}
          trailingIcon={<span className="text-body-sm text-gray-500">INR</span>}
        />
      </section>

      {/* Error States */}
      <section className="space-y-4">
        <h2 className="text-heading-lg font-semibold text-gray-800">Error States</h2>
        
        <Input 
          label="Email Address" 
          type="email"
          value="invalid-email"
          error="Please enter a valid email address"
        />
        
        <Input 
          label="Password" 
          type="password"
          value="123"
          error="Password must be at least 8 characters"
        />
        
        <Input 
          label="Username" 
          value="ab"
          error="Username must be at least 3 characters"
          leadingIcon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }
        />
      </section>

      {/* Disabled State */}
      <section className="space-y-4">
        <h2 className="text-heading-lg font-semibold text-gray-800">Disabled State</h2>
        
        <Input 
          label="Disabled Input" 
          value={disabled}
          onChange={(e) => setDisabled(e.target.value)}
          disabled
        />
        
        <Input 
          label="Disabled with Icon" 
          value="Read only content"
          disabled
          leadingIcon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          }
        />
      </section>

      {/* Real-world Forms */}
      <section className="space-y-6">
        <h2 className="text-heading-lg font-semibold text-gray-800">Real-world Forms</h2>
        
        <div className="bg-white p-6 rounded-card shadow-sm border border-gray-200 space-y-4">
          <h3 className="text-heading font-semibold text-gray-900">Login Form</h3>
          
          <Input 
            label="Email" 
            type="email"
            placeholder="Enter your email"
            leadingIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            }
          />
          
          <Input 
            label="Password" 
            type="password"
            placeholder="Enter your password"
            leadingIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
          />
        </div>

        <div className="bg-white p-6 rounded-card shadow-sm border border-gray-200 space-y-4">
          <h3 className="text-heading font-semibold text-gray-900">Search & Filter</h3>
          
          <Input 
            placeholder="Search promises by keyword..."
            leadingIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
          
          <Input 
            placeholder="Filter by location..."
            leadingIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
          />
        </div>
      </section>

      {/* Accessibility Features */}
      <section className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-heading-lg font-semibold text-gray-900 mb-3">Accessibility Features</h2>
        <ul className="space-y-2 text-body text-gray-700">
          <li>✓ Minimum 44px touch target height</li>
          <li>✓ Proper label association with htmlFor and id</li>
          <li>✓ aria-invalid for error states</li>
          <li>✓ aria-describedby linking to error messages</li>
          <li>✓ Error messages with role="alert"</li>
          <li>✓ Focus ring with brand colors</li>
          <li>✓ Icons are pointer-events-none (non-interactive)</li>
          <li>✓ Keyboard navigation support</li>
          <li>✓ Disabled state with reduced opacity</li>
          <li>✓ Forward ref support for programmatic focus</li>
        </ul>
      </section>
    </div>
  );
};

export default InputShowcase;

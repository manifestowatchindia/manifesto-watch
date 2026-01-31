import React from 'react';
import { Button } from './ui/Button';

/**
 * ButtonShowcase - Visual demo of all Button component variations
 * This is for testing purposes only. Delete after verification.
 */
export const ButtonShowcase: React.FC = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-h1 text-brand-primary font-bold mb-8">Button Component Showcase</h1>

        {/* Variants Section */}
        <section className="bg-white p-6 rounded-card shadow-sm">
          <h2 className="text-h3 font-semibold mb-4">Variants</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="danger">Danger Button</Button>
          </div>
        </section>

        {/* Sizes Section */}
        <section className="bg-white p-6 rounded-card shadow-sm">
          <h2 className="text-h3 font-semibold mb-4">Sizes</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small Button</Button>
            <Button size="md">Medium Button</Button>
            <Button size="lg">Large Button</Button>
          </div>
        </section>

        {/* With Icons Section */}
        <section className="bg-white p-6 rounded-card shadow-sm">
          <h2 className="text-h3 font-semibold mb-4">With Icons</h2>
          <div className="flex flex-wrap gap-4">
            <Button icon={<span>🔍</span>}>Search</Button>
            <Button variant="secondary" icon={<span>➕</span>}>Add Item</Button>
            <Button variant="ghost" icon={<span>⬇️</span>}>Download</Button>
          </div>
        </section>

        {/* Loading States Section */}
        <section className="bg-white p-6 rounded-card shadow-sm">
          <h2 className="text-h3 font-semibold mb-4">Loading States</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" isLoading>Primary Loading</Button>
            <Button variant="secondary" isLoading>Secondary Loading</Button>
            <Button variant="ghost" isLoading>Ghost Loading</Button>
          </div>
        </section>

        {/* Disabled States Section */}
        <section className="bg-white p-6 rounded-card shadow-sm">
          <h2 className="text-h3 font-semibold mb-4">Disabled States</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" disabled>Primary Disabled</Button>
            <Button variant="secondary" disabled>Secondary Disabled</Button>
            <Button variant="ghost" disabled>Ghost Disabled</Button>
            <Button variant="danger" disabled>Danger Disabled</Button>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section className="bg-white p-6 rounded-card shadow-sm">
          <h2 className="text-h3 font-semibold mb-4">Interactive Demo</h2>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => alert('Primary clicked!')}>
              Click Me (Primary)
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => console.log('Secondary clicked!')}
            >
              Console Log
            </Button>
            <Button 
              variant="ghost"
              icon={<span>👍</span>}
              onClick={() => alert('Like button clicked!')}
            >
              Like
            </Button>
          </div>
        </section>

        {/* Real-world Examples Section */}
        <section className="bg-white p-6 rounded-card shadow-sm">
          <h2 className="text-h3 font-semibold mb-4">Real-world Examples</h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <Button variant="primary" size="lg">Track Promises</Button>
              <Button variant="secondary" size="lg">Compare Parties</Button>
            </div>
            <div className="flex gap-3">
              <Button icon={<span>🗳️</span>}>Register to Vote</Button>
              <Button variant="ghost" icon={<span>📥</span>}>Download Manifesto</Button>
            </div>
            <div className="flex gap-3">
              <Button variant="danger" size="sm">Delete</Button>
              <Button variant="ghost" size="sm">Cancel</Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ButtonShowcase;

import React, { useState } from 'react';
import { Select } from './ui';

export const SelectShowcase: React.FC = () => {
  const [state, setState] = useState('');
  const [category, setCategory] = useState('');
  const [party, setParty] = useState('');

  const stateOptions = [
    { value: '', label: '-- Select State --' },
    { value: 'kerala', label: 'Kerala' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'tamil-nadu', label: 'Tamil Nadu' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'west-bengal', label: 'West Bengal' },
  ];

  const categoryOptions = [
    { value: '', label: '-- All Categories --' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'employment', label: 'Employment' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'environment', label: 'Environment' },
  ];

  const partyOptions = [
    { value: 'BJP', label: 'Bharatiya Janata Party (BJP)' },
    { value: 'INC', label: 'Indian National Congress (INC)' },
    { value: 'AAP', label: 'Aam Aadmi Party (AAP)' },
    { value: 'CPM', label: 'Communist Party of India (Marxist)' },
    { value: 'TMC', label: 'Trinamool Congress (TMC)' },
    { value: 'DMK', label: 'Dravida Munnetra Kazhagam (DMK)' },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'completed', label: 'Completed' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'delayed', label: 'Delayed' },
    { value: 'failed', label: 'Failed' },
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'completion', label: 'By Completion Rate' },
    { value: 'impact', label: 'By Impact' },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-12">
      <div>
        <h1 className="text-display-sm font-bold text-gray-900 mb-2">Select Component Showcase</h1>
        <p className="text-body text-gray-600">
          Dropdown select component with custom arrow, error states, and accessibility
        </p>
      </div>

      {/* Basic Selects */}
      <section className="space-y-4">
        <h2 className="text-heading-lg font-semibold text-gray-800">Basic Selects</h2>
        
        <Select 
          label="Select State" 
          options={stateOptions}
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        
        <Select 
          label="Select Category" 
          options={categoryOptions}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        
        <Select 
          label="Political Party" 
          options={partyOptions}
          value={party}
          onChange={(e) => setParty(e.target.value)}
        />
      </section>

      {/* Without Labels */}
      <section className="space-y-4">
        <h2 className="text-heading-lg font-semibold text-gray-800">Without Labels</h2>
        
        <Select 
          options={categoryOptions}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        
        <Select 
          options={statusOptions}
          defaultValue="all"
        />
      </section>

      {/* Error States */}
      <section className="space-y-4">
        <h2 className="text-heading-lg font-semibold text-gray-800">Error States</h2>
        
        <Select 
          label="State" 
          options={stateOptions}
          value=""
          error="Please select a state"
        />
        
        <Select 
          label="Category" 
          options={categoryOptions}
          value=""
          error="This field is required"
        />
        
        <Select 
          label="Political Party" 
          options={partyOptions}
          value=""
          error="You must select a party to continue"
        />
      </section>

      {/* Disabled State */}
      <section className="space-y-4">
        <h2 className="text-heading-lg font-semibold text-gray-800">Disabled State</h2>
        
        <Select 
          label="Disabled Select" 
          options={stateOptions}
          value="kerala"
          disabled
        />
        
        <Select 
          label="Cannot Change" 
          options={partyOptions}
          value="BJP"
          disabled
        />
      </section>

      {/* Real-world Filters */}
      <section className="space-y-6">
        <h2 className="text-heading-lg font-semibold text-gray-800">Real-world Filters</h2>
        
        <div className="bg-white p-6 rounded-card shadow-sm border border-gray-200 space-y-4">
          <h3 className="text-heading font-semibold text-gray-900">Promise Filter Dashboard</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select 
              label="State" 
              options={stateOptions}
            />
            
            <Select 
              label="Category" 
              options={categoryOptions}
            />
            
            <Select 
              label="Status" 
              options={statusOptions}
              defaultValue="all"
            />
            
            <Select 
              label="Sort By" 
              options={sortOptions}
              defaultValue="recent"
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-card shadow-sm border border-gray-200 space-y-4">
          <h3 className="text-heading font-semibold text-gray-900">Party Comparison Tool</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Select 
                label="Party 1" 
                options={partyOptions}
                defaultValue="BJP"
              />
            </div>
            
            <div>
              <Select 
                label="Party 2" 
                options={partyOptions}
                defaultValue="INC"
              />
            </div>
          </div>
          
          <Select 
            label="Compare By" 
            options={[
              { value: 'all', label: 'All Categories' },
              { value: 'healthcare', label: 'Healthcare Only' },
              { value: 'education', label: 'Education Only' },
              { value: 'economy', label: 'Economy Only' },
            ]}
            defaultValue="all"
          />
        </div>

        <div className="bg-white p-6 rounded-card shadow-sm border border-gray-200 space-y-4">
          <h3 className="text-heading font-semibold text-gray-900">Election Year Selector</h3>
          
          <Select 
            label="Select Election Year" 
            options={[
              { value: '2024', label: '2024 General Election' },
              { value: '2019', label: '2019 General Election' },
              { value: '2014', label: '2014 General Election' },
              { value: '2009', label: '2009 General Election' },
            ]}
            defaultValue="2024"
          />
          
          <Select 
            label="Election Type" 
            options={[
              { value: 'general', label: 'General Election' },
              { value: 'state', label: 'State Assembly' },
              { value: 'by-election', label: 'By-Election' },
            ]}
            defaultValue="general"
          />
        </div>
      </section>

      {/* Custom Children */}
      <section className="space-y-4">
        <h2 className="text-heading-lg font-semibold text-gray-800">With Custom Children</h2>
        
        <Select label="Custom Options" options={[]}>
          <option value="">-- Select --</option>
          <optgroup label="Major Parties">
            <option value="BJP">BJP</option>
            <option value="INC">INC</option>
          </optgroup>
          <optgroup label="Regional Parties">
            <option value="TMC">TMC</option>
            <option value="DMK">DMK</option>
            <option value="AAP">AAP</option>
          </optgroup>
        </Select>
      </section>

      {/* Accessibility Features */}
      <section className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-heading-lg font-semibold text-gray-900 mb-3">Accessibility Features</h2>
        <ul className="space-y-2 text-body text-gray-700">
          <li>✓ Minimum 44px touch target height</li>
          <li>✓ Custom arrow icon with SVG (consistent across browsers)</li>
          <li>✓ appearance-none removes default arrow</li>
          <li>✓ Proper label association with htmlFor and id</li>
          <li>✓ aria-invalid for error states</li>
          <li>✓ aria-describedby linking to error messages</li>
          <li>✓ Error messages with role="alert"</li>
          <li>✓ Focus ring with brand colors</li>
          <li>✓ Arrow icon is pointer-events-none (doesn't interfere)</li>
          <li>✓ Arrow icon has aria-hidden</li>
          <li>✓ Keyboard navigation support (arrow keys, Enter)</li>
          <li>✓ Disabled state with reduced opacity</li>
          <li>✓ Forward ref support for programmatic focus</li>
        </ul>
      </section>
    </div>
  );
};

export default SelectShowcase;

import React from 'react';
import { Badge } from './ui/Badge';
import { Card } from './ui/Card';

/**
 * BadgeShowcase - Visual demo of all Badge component variations
 * This is for testing purposes only. Delete after verification.
 */
export const BadgeShowcase: React.FC = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-h1 text-brand-primary font-bold mb-8">Badge Component Showcase</h1>

        {/* All Variants Section */}
        <section className="space-y-4">
          <h2 className="text-h3 font-semibold mb-4">All Variants</h2>
          <Card variant="elevated" padding="lg">
            <div className="flex flex-wrap gap-3">
              <Badge variant="completed">Completed</Badge>
              <Badge variant="in-progress">In Progress</Badge>
              <Badge variant="delayed">Delayed</Badge>
              <Badge variant="failed">Failed</Badge>
              <Badge variant="verified">Verified</Badge>
              <Badge variant="default">Default</Badge>
            </div>
          </Card>
        </section>

        {/* With Icons Section */}
        <section className="space-y-4">
          <h2 className="text-h3 font-semibold mb-4">With Icons</h2>
          <Card variant="elevated" padding="lg">
            <div className="flex flex-wrap gap-3">
              <Badge variant="completed" icon={<span>✓</span>}>
                Completed
              </Badge>
              <Badge variant="in-progress" icon={<span>⏳</span>}>
                In Progress
              </Badge>
              <Badge variant="delayed" icon={<span>⚠️</span>}>
                Delayed
              </Badge>
              <Badge variant="failed" icon={<span>✗</span>}>
                Failed
              </Badge>
              <Badge variant="verified" icon={<span>✓</span>}>
                Verified
              </Badge>
              <Badge variant="default" icon={<span>📌</span>}>
                Default
              </Badge>
            </div>
          </Card>
        </section>

        {/* Status Indicators Section */}
        <section className="space-y-4">
          <h2 className="text-h3 font-semibold mb-4">Status Indicators with Counts</h2>
          <Card variant="elevated" padding="lg">
            <div className="flex flex-wrap gap-3">
              <Badge variant="completed" icon={<span>✓</span>}>
                45 Completed
              </Badge>
              <Badge variant="in-progress" icon={<span>⏳</span>}>
                23 In Progress
              </Badge>
              <Badge variant="delayed" icon={<span>⚠️</span>}>
                8 Delayed
              </Badge>
              <Badge variant="failed" icon={<span>✗</span>}>
                2 Failed
              </Badge>
            </div>
          </Card>
        </section>

        {/* Real-world Use Cases Section */}
        <section className="space-y-4">
          <h2 className="text-h3 font-semibold mb-4">Real-world Examples</h2>

          {/* Promise Card with Status Badge */}
          <Card variant="elevated" padding="lg" hover>
            <div className="flex items-start justify-between gap-4 mb-3">
              <h3 className="text-h5 font-semibold flex-1">
                Create 10 Million Jobs by 2029
              </h3>
              <Badge variant="in-progress" icon={<span>⏳</span>}>
                In Progress
              </Badge>
            </div>
            <p className="text-body-sm text-gray-600 mb-3">
              Government initiative to create employment opportunities through infrastructure 
              development and skill training programs across various sectors.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Employment</Badge>
              <Badge variant="default">Infrastructure</Badge>
              <Badge variant="verified" icon={<span>✓</span>}>
                Verified Source
              </Badge>
            </div>
          </Card>

          {/* Promise with Multiple Statuses */}
          <Card variant="outline" padding="lg">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <h3 className="text-h5 font-semibold">Universal Healthcare Coverage</h3>
                <Badge variant="completed" icon={<span>✓</span>}>
                  Completed
                </Badge>
              </div>
              <p className="text-body-sm text-gray-600">
                Successfully implemented comprehensive health insurance scheme covering 
                100 million families.
              </p>
              <div className="border-t pt-3 flex flex-wrap gap-2 items-center text-body-sm text-gray-600">
                <span>Categories:</span>
                <Badge variant="default">Healthcare</Badge>
                <Badge variant="default">Social Welfare</Badge>
                <span className="ml-3">•</span>
                <Badge variant="verified" icon={<span>✓</span>}>
                  Government Verified
                </Badge>
              </div>
            </div>
          </Card>

          {/* Mixed Status Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card variant="default" padding="md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-body font-semibold">Digital India Initiative</span>
                <Badge variant="completed">Done</Badge>
              </div>
              <p className="text-body-sm text-gray-600">
                75% of villages now connected to high-speed internet
              </p>
            </Card>

            <Card variant="default" padding="md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-body font-semibold">Clean Energy Target</span>
                <Badge variant="in-progress">Active</Badge>
              </div>
              <p className="text-body-sm text-gray-600">
                450 GW renewable energy capacity by 2030
              </p>
            </Card>

            <Card variant="default" padding="md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-body font-semibold">Farmer Income Doubling</span>
                <Badge variant="delayed">Behind Schedule</Badge>
              </div>
              <p className="text-body-sm text-gray-600">
                Target: Double farmer income by 2024
              </p>
            </Card>

            <Card variant="default" padding="md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-body font-semibold">Smart Cities Mission</span>
                <Badge variant="failed">Stalled</Badge>
              </div>
              <p className="text-body-sm text-gray-600">
                Development of 100 smart cities across India
              </p>
            </Card>
          </div>
        </section>

        {/* Inline Usage Section */}
        <section className="space-y-4">
          <h2 className="text-h3 font-semibold mb-4">Inline with Text</h2>
          <Card variant="elevated" padding="lg">
            <p className="text-body mb-3">
              The promise to provide free laptops to students is currently{' '}
              <Badge variant="in-progress">In Progress</Badge> with 45% completion rate.
            </p>
            <p className="text-body mb-3">
              The healthcare infrastructure upgrade project has been marked as{' '}
              <Badge variant="completed" icon={<span>✓</span>}>
                Completed
              </Badge>{' '}
              as of December 2025.
            </p>
            <p className="text-body">
              Unfortunately, the metro rail expansion to tier-2 cities is{' '}
              <Badge variant="delayed" icon={<span>⚠️</span>}>
                Delayed
              </Badge>{' '}
              due to budget constraints.
            </p>
          </Card>
        </section>

        {/* Statistics Dashboard Section */}
        <section className="space-y-4">
          <h2 className="text-h3 font-semibold mb-4">Statistics Dashboard</h2>
          <Card variant="elevated" padding="lg">
            <h3 className="text-h4 font-semibold mb-4">2024 Kerala Assembly Election - Promise Tracker</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-display-sm font-bold text-status-completed mb-1">45</div>
                <Badge variant="completed" icon={<span>✓</span>}>
                  Completed
                </Badge>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-display-sm font-bold text-status-in-progress mb-1">23</div>
                <Badge variant="in-progress" icon={<span>⏳</span>}>
                  In Progress
                </Badge>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-display-sm font-bold text-status-delayed mb-1">8</div>
                <Badge variant="delayed" icon={<span>⚠️</span>}>
                  Delayed
                </Badge>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-display-sm font-bold text-status-failed mb-1">2</div>
                <Badge variant="failed" icon={<span>✗</span>}>
                  Failed
                </Badge>
              </div>
            </div>
          </Card>
        </section>

        {/* Category Tags Section */}
        <section className="space-y-4">
          <h2 className="text-h3 font-semibold mb-4">Category Tags</h2>
          <Card variant="elevated" padding="lg">
            <h3 className="text-h5 font-semibold mb-3">Browse Promises by Category</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Healthcare</Badge>
              <Badge variant="default">Education</Badge>
              <Badge variant="default">Infrastructure</Badge>
              <Badge variant="default">Employment</Badge>
              <Badge variant="default">Agriculture</Badge>
              <Badge variant="default">Technology</Badge>
              <Badge variant="default">Environment</Badge>
              <Badge variant="default">Social Welfare</Badge>
              <Badge variant="default">Defense</Badge>
              <Badge variant="default">Economy</Badge>
            </div>
          </Card>
        </section>

        {/* Custom Styling Section */}
        <section className="space-y-4">
          <h2 className="text-h3 font-semibold mb-4">Custom Styling</h2>
          <Card variant="elevated" padding="lg">
            <div className="flex flex-wrap gap-3">
              <Badge variant="completed" className="text-xs">
                Extra Small Text
              </Badge>
              <Badge variant="in-progress" className="px-4 py-2">
                More Padding
              </Badge>
              <Badge variant="verified" className="shadow-md">
                With Shadow
              </Badge>
              <Badge variant="default" className="uppercase tracking-wider">
                Uppercase
              </Badge>
            </div>
          </Card>
        </section>

        {/* Accessibility Note */}
        <Card variant="outline" padding="lg">
          <h3 className="text-h5 font-semibold mb-2">♿ Accessibility Features</h3>
          <ul className="text-body-sm text-gray-600 space-y-2 list-disc list-inside">
            <li>Icons have <code className="bg-gray-100 px-1 rounded">aria-hidden</code> to avoid screen reader duplication</li>
            <li>Color contrast meets WCAG AA standards (light backgrounds with darker text)</li>
            <li>Semantic HTML with <code className="bg-gray-100 px-1 rounded">&lt;span&gt;</code> element</li>
            <li>Custom aria-label can be added for additional context</li>
            <li>Small text (12px) is still readable with semi-bold font weight</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default BadgeShowcase;

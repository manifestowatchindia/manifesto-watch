import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

/**
 * CardShowcase - Visual demo of all Card component variations
 * This is for testing purposes only. Delete after verification.
 */
export const CardShowcase: React.FC = () => {
  const [clickCount, setClickCount] = React.useState(0);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-h1 text-brand-primary font-bold mb-8">Card Component Showcase</h1>

        {/* Variants Section */}
        <section className="space-y-4">
          <h2 className="text-h3 font-semibold mb-4">Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card variant="default">
              <h3 className="text-h5 font-semibold mb-2">Default Card</h3>
              <p className="text-body-sm text-gray-600">
                White background with subtle border. Good for general content containers.
              </p>
            </Card>

            <Card variant="elevated">
              <h3 className="text-h5 font-semibold mb-2">Elevated Card</h3>
              <p className="text-body-sm text-gray-600">
                White background with shadow. Creates depth and emphasis.
              </p>
            </Card>

            <Card variant="outline">
              <h3 className="text-h5 font-semibold mb-2">Outline Card</h3>
              <p className="text-body-sm text-gray-600">
                Transparent background with bold border. Lighter visual weight.
              </p>
            </Card>
          </div>
        </section>

        {/* Padding Sizes Section */}
        <section className="space-y-4">
          <h2 className="text-h3 font-semibold mb-4">Padding Sizes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card variant="elevated" padding="sm">
              <h3 className="text-h5 font-semibold mb-2">Small (p-4)</h3>
              <p className="text-body-sm">Compact spacing for tight layouts</p>
            </Card>

            <Card variant="elevated" padding="md">
              <h3 className="text-h5 font-semibold mb-2">Medium (p-6)</h3>
              <p className="text-body-sm">Default balanced spacing</p>
            </Card>

            <Card variant="elevated" padding="lg">
              <h3 className="text-h5 font-semibold mb-2">Large (p-8)</h3>
              <p className="text-body-sm">Generous spacing for emphasis</p>
            </Card>
          </div>
        </section>

        {/* Hover Effects Section */}
        <section className="space-y-4">
          <h2 className="text-h3 font-semibold mb-4">Hover Effects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card variant="default" hover>
              <h3 className="text-h5 font-semibold mb-2">Default + Hover</h3>
              <p className="text-body-sm text-gray-600">
                Hover over me! Shadow appears and card lifts.
              </p>
            </Card>

            <Card variant="elevated" hover>
              <h3 className="text-h5 font-semibold mb-2">Elevated + Hover</h3>
              <p className="text-body-sm text-gray-600">
                Shadow intensifies on hover for extra depth.
              </p>
            </Card>

            <Card variant="outline" hover>
              <h3 className="text-h5 font-semibold mb-2">Outline + Hover</h3>
              <p className="text-body-sm text-gray-600">
                Outline card gains shadow on hover.
              </p>
            </Card>
          </div>
        </section>

        {/* Interactive Cards Section */}
        <section className="space-y-4">
          <h2 className="text-h3 font-semibold mb-4">Interactive Cards (Clickable)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card
              variant="elevated"
              hover
              onClick={() => setClickCount(clickCount + 1)}
            >
              <h3 className="text-h5 font-semibold mb-2">Click Counter Card</h3>
              <p className="text-body-sm text-gray-600 mb-4">
                This card is clickable! Clicked {clickCount} times.
              </p>
              <p className="text-caption text-gray-500">
                Notice the focus ring when using keyboard navigation.
              </p>
            </Card>

            <Card
              variant="outline"
              hover
              onClick={() => alert('Navigation card clicked!')}
            >
              <h3 className="text-h5 font-semibold mb-2">Navigation Card</h3>
              <p className="text-body-sm text-gray-600">
                Click me to trigger an alert! Renders as a button element.
              </p>
            </Card>
          </div>
        </section>

        {/* Real-world Examples Section */}
        <section className="space-y-4">
          <h2 className="text-h3 font-semibold mb-4">Real-world Examples</h2>
          
          {/* Promise Card Example */}
          <Card variant="elevated" padding="lg" hover>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center text-white font-bold">
                  BJP
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-h5 font-semibold">Create 10 Million Jobs</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-caption font-semibold rounded-pill">
                    In Progress
                  </span>
                </div>
                <p className="text-body-sm text-gray-600 mb-3">
                  Government committed to creating 10 million jobs through infrastructure development 
                  and skill training programs across various sectors.
                </p>
                <div className="flex gap-2">
                  <span className="text-caption text-gray-500">📊 Category: Employment</span>
                  <span className="text-caption text-gray-500">📅 Timeline: 2024-2029</span>
                  <span className="text-caption text-gray-500">💰 Budget: ₹5,000 Cr</span>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="primary">View Details</Button>
                  <Button size="sm" variant="ghost">Add to Watchlist</Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Election Countdown Card Example */}
          <Card variant="default" padding="lg">
            <div className="text-center">
              <h3 className="text-h4 font-bold text-brand-primary mb-2">
                2024 Kerala Assembly Election
              </h3>
              <p className="text-body text-gray-600 mb-4">Countdown to Election Day</p>
              <div className="flex justify-center gap-4 mb-6">
                <div className="text-center">
                  <div className="text-display-sm font-bold text-brand-primary">45</div>
                  <div className="text-caption text-gray-500">Days</div>
                </div>
                <div className="text-center">
                  <div className="text-display-sm font-bold text-brand-primary">12</div>
                  <div className="text-caption text-gray-500">Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-display-sm font-bold text-brand-primary">34</div>
                  <div className="text-caption text-gray-500">Minutes</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center border-t pt-4">
                <div>
                  <div className="text-h5 font-bold">140</div>
                  <div className="text-caption text-gray-500">Constituencies</div>
                </div>
                <div>
                  <div className="text-h5 font-bold">2.5 Cr</div>
                  <div className="text-caption text-gray-500">Voters</div>
                </div>
                <div>
                  <div className="text-h5 font-bold">8</div>
                  <div className="text-caption text-gray-500">Major Parties</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Category Card Example */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card variant="outline" hover onClick={() => alert('Healthcare category')}>
              <div className="text-center">
                <div className="text-4xl mb-3">🏥</div>
                <h3 className="text-h5 font-semibold mb-2">Healthcare</h3>
                <p className="text-body-sm text-gray-600 mb-3">
                  45 promises tracked
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="text-caption text-gray-500 mt-2">65% completed</p>
              </div>
            </Card>

            <Card variant="outline" hover onClick={() => alert('Education category')}>
              <div className="text-center">
                <div className="text-4xl mb-3">📚</div>
                <h3 className="text-h5 font-semibold mb-2">Education</h3>
                <p className="text-body-sm text-gray-600 mb-3">
                  38 promises tracked
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <p className="text-caption text-gray-500 mt-2">45% completed</p>
              </div>
            </Card>

            <Card variant="outline" hover onClick={() => alert('Infrastructure category')}>
              <div className="text-center">
                <div className="text-4xl mb-3">🏗️</div>
                <h3 className="text-h5 font-semibold mb-2">Infrastructure</h3>
                <p className="text-body-sm text-gray-600 mb-3">
                  52 promises tracked
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
                <p className="text-caption text-gray-500 mt-2">78% completed</p>
              </div>
            </Card>
          </div>
        </section>

        {/* Custom Styling Examples */}
        <section className="space-y-4">
          <h2 className="text-h3 font-semibold mb-4">Custom Styling</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card
              variant="elevated"
              className="bg-gradient-to-br from-blue-50 to-blue-100"
            >
              <h3 className="text-h5 font-semibold mb-2">Custom Background</h3>
              <p className="text-body-sm text-gray-700">
                Card with gradient background using custom className.
              </p>
            </Card>

            <Card
              variant="outline"
              className="border-brand-primary hover:bg-brand-primary/5"
              hover
            >
              <h3 className="text-h5 font-semibold text-brand-primary mb-2">
                Branded Card
              </h3>
              <p className="text-body-sm text-gray-600">
                Custom border color and hover background.
              </p>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CardShowcase;

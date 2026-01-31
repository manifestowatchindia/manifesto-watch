import React, { useState, useEffect } from 'react';
import { ProgressRing } from './ui/ProgressRing';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

/**
 * ProgressRingShowcase - Visual demo of all ProgressRing component variations
 * This is for testing purposes only. Delete after verification.
 */
export const ProgressRingShowcase: React.FC = () => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    setIsAnimating(true);
    setAnimatedPercentage(0);
    const interval = setInterval(() => {
      setAnimatedPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnimating(false);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
  };

  useEffect(() => {
    // Auto-start animation on mount
    startAnimation();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-h1 text-brand-primary font-bold mb-8">ProgressRing Component Showcase</h1>

        {/* Color Gradients Section */}
        <section className="space-y-4">
          <h2 className="text-h3 font-semibold mb-4">Color Gradient Based on Percentage</h2>
          <Card variant="elevated" padding="lg">
            <p className="text-body-sm text-gray-600 mb-6">
              Colors automatically change based on completion percentage:
              Red (&lt;40%), Orange (40-69%), Green (≥70%)
            </p>
            <div className="flex flex-wrap justify-around gap-8">
              <div className="text-center">
                <ProgressRing percentage={25} label="Low" />
                <p className="text-caption text-gray-600 mt-2">25% - Red (Low)</p>
              </div>
              <div className="text-center">
                <ProgressRing percentage={50} label="Medium" />
                <p className="text-caption text-gray-600 mt-2">50% - Orange (Medium)</p>
              </div>
              <div className="text-center">
                <ProgressRing percentage={85} label="High" />
                <p className="text-caption text-gray-600 mt-2">85% - Green (High)</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Animated Demo Section */}
        <section className="space-y-4">
          <h2 className="text-h3 font-semibold mb-4">Smooth Animation Demo</h2>
          <Card variant="elevated" padding="lg">
            <div className="flex flex-col items-center gap-6">
              <ProgressRing 
                percentage={animatedPercentage} 
                label="Progress" 
                size={180}
                strokeWidth={12}
              />
              <Button 
                onClick={startAnimation} 
                disabled={isAnimating}
                variant="primary"
              >
                {isAnimating ? 'Animating...' : 'Restart Animation'}
              </Button>
              <p className="text-body-sm text-gray-600 text-center">
                Watch the ring smoothly transition through colors as it progresses from 0% to 100%
              </p>
            </div>
          </Card>
        </section>

        {/* Different Sizes Section */}
        <section className="space-y-4">
          <h2 className="text-h3 font-semibold mb-4">Configurable Sizes</h2>
          <Card variant="elevated" padding="lg">
            <div className="flex flex-wrap items-end justify-around gap-6">
              <div className="text-center">
                <ProgressRing percentage={75} size={60} strokeWidth={4} />
                <p className="text-caption text-gray-600 mt-2">Small (60px)</p>
              </div>
              <div className="text-center">
                <ProgressRing percentage={75} size={100} strokeWidth={6} />
                <p className="text-caption text-gray-600 mt-2">Medium (100px)</p>
              </div>
              <div className="text-center">
                <ProgressRing percentage={75} size={140} strokeWidth={8} label="Default" />
                <p className="text-caption text-gray-600 mt-2">Large (140px)</p>
              </div>
              <div className="text-center">
                <ProgressRing percentage={75} size={200} strokeWidth={12} label="Extra Large" />
                <p className="text-caption text-gray-600 mt-2">Extra Large (200px)</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Different Stroke Widths Section */}
        <section className="space-y-4">
          <h2 className="text-h3 font-semibold mb-4">Configurable Stroke Width</h2>
          <Card variant="elevated" padding="lg">
            <div className="flex flex-wrap justify-around gap-6">
              <div className="text-center">
                <ProgressRing percentage={70} size={120} strokeWidth={4} label="Thin" />
                <p className="text-caption text-gray-600 mt-2">Stroke: 4px</p>
              </div>
              <div className="text-center">
                <ProgressRing percentage={70} size={120} strokeWidth={8} label="Default" />
                <p className="text-caption text-gray-600 mt-2">Stroke: 8px (default)</p>
              </div>
              <div className="text-center">
                <ProgressRing percentage={70} size={120} strokeWidth={16} label="Thick" />
                <p className="text-caption text-gray-600 mt-2">Stroke: 16px</p>
              </div>
            </div>
          </Card>
        </section>

        {/* With and Without Labels Section */}
        <section className="space-y-4">
          <h2 className="text-h3 font-semibold mb-4">With Labels</h2>
          <Card variant="elevated" padding="lg">
            <div className="flex flex-wrap justify-around gap-6">
              <div className="text-center">
                <ProgressRing percentage={65} />
                <p className="text-caption text-gray-600 mt-2">No label</p>
              </div>
              <div className="text-center">
                <ProgressRing percentage={80} label="Complete" />
                <p className="text-caption text-gray-600 mt-2">With label</p>
              </div>
              <div className="text-center">
                <ProgressRing percentage={45} label="On Track" />
                <p className="text-caption text-gray-600 mt-2">Custom text</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Real-world Use Cases Section */}
        <section className="space-y-4">
          <h2 className="text-h3 font-semibold mb-4">Real-world Examples</h2>

          {/* Promise Tracker Dashboard */}
          <Card variant="elevated" padding="lg">
            <h3 className="text-h4 font-semibold mb-6">2024 Kerala Election - Promise Completion Tracker</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <ProgressRing percentage={85} label="Healthcare" size={140} />
                <Badge variant="completed" className="mt-3">On Target</Badge>
              </div>
              <div className="text-center">
                <ProgressRing percentage={65} label="Education" size={140} />
                <Badge variant="in-progress" className="mt-3">Progressing</Badge>
              </div>
              <div className="text-center">
                <ProgressRing percentage={45} label="Infrastructure" size={140} />
                <Badge variant="delayed" className="mt-3">Delayed</Badge>
              </div>
              <div className="text-center">
                <ProgressRing percentage={25} label="Agriculture" size={140} />
                <Badge variant="failed" className="mt-3">Behind</Badge>
              </div>
            </div>
          </Card>

          {/* Party Report Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card variant="default" padding="lg">
              <div className="flex items-center gap-6">
                <ProgressRing percentage={78} label="Overall" size={100} strokeWidth={10} />
                <div className="flex-1">
                  <h3 className="text-h5 font-semibold mb-2">BJP Performance 2019-2024</h3>
                  <p className="text-body-sm text-gray-600 mb-2">
                    78% of manifesto promises completed or in progress
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="completed">45 Done</Badge>
                    <Badge variant="in-progress">23 Active</Badge>
                    <Badge variant="delayed">8 Delayed</Badge>
                  </div>
                </div>
              </div>
            </Card>

            <Card variant="default" padding="lg">
              <div className="flex items-center gap-6">
                <ProgressRing percentage={62} label="Overall" size={100} strokeWidth={10} />
                <div className="flex-1">
                  <h3 className="text-h5 font-semibold mb-2">INC Performance 2015-2020</h3>
                  <p className="text-body-sm text-gray-600 mb-2">
                    62% of manifesto promises completed or in progress
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="completed">35 Done</Badge>
                    <Badge variant="in-progress">28 Active</Badge>
                    <Badge variant="delayed">12 Delayed</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Category Breakdown */}
          <Card variant="outline" padding="lg">
            <h3 className="text-h5 font-semibold mb-4">Promise Completion by Category</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="text-center">
                <ProgressRing percentage={92} size={80} strokeWidth={6} />
                <p className="text-caption font-semibold mt-2">Defense</p>
                <p className="text-caption text-gray-600">92%</p>
              </div>
              <div className="text-center">
                <ProgressRing percentage={85} size={80} strokeWidth={6} />
                <p className="text-caption font-semibold mt-2">Digital</p>
                <p className="text-caption text-gray-600">85%</p>
              </div>
              <div className="text-center">
                <ProgressRing percentage={78} size={80} strokeWidth={6} />
                <p className="text-caption font-semibold mt-2">Health</p>
                <p className="text-caption text-gray-600">78%</p>
              </div>
              <div className="text-center">
                <ProgressRing percentage={65} size={80} strokeWidth={6} />
                <p className="text-caption font-semibold mt-2">Education</p>
                <p className="text-caption text-gray-600">65%</p>
              </div>
              <div className="text-center">
                <ProgressRing percentage={48} size={80} strokeWidth={6} />
                <p className="text-caption font-semibold mt-2">Jobs</p>
                <p className="text-caption text-gray-600">48%</p>
              </div>
              <div className="text-center">
                <ProgressRing percentage={35} size={80} strokeWidth={6} />
                <p className="text-caption font-semibold mt-2">Farmers</p>
                <p className="text-caption text-gray-600">35%</p>
              </div>
            </div>
          </Card>

          {/* Individual Promise Card */}
          <Card variant="elevated" padding="lg" hover>
            <div className="flex items-start gap-4">
              <ProgressRing percentage={68} label="Done" size={100} strokeWidth={8} />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-h5 font-semibold">
                    Universal Healthcare Coverage for 100 Million Families
                  </h3>
                  <Badge variant="in-progress" icon={<span>⏳</span>}>In Progress</Badge>
                </div>
                <p className="text-body-sm text-gray-600 mb-3">
                  Comprehensive health insurance scheme covering hospitalization, medicines, 
                  and preventive care across government and private hospitals.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center border-t pt-3">
                  <div>
                    <div className="text-h5 font-bold text-brand-primary">68M</div>
                    <div className="text-caption text-gray-600">Families Enrolled</div>
                  </div>
                  <div>
                    <div className="text-h5 font-bold text-brand-primary">₹5,000 Cr</div>
                    <div className="text-caption text-gray-600">Budget Allocated</div>
                  </div>
                  <div>
                    <div className="text-h5 font-bold text-brand-primary">Dec 2025</div>
                    <div className="text-caption text-gray-600">Target Date</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Edge Cases Section */}
        <section className="space-y-4">
          <h2 className="text-h3 font-semibold mb-4">Edge Cases</h2>
          <Card variant="elevated" padding="lg">
            <div className="flex flex-wrap justify-around gap-6">
              <div className="text-center">
                <ProgressRing percentage={0} label="Not Started" />
                <p className="text-caption text-gray-600 mt-2">0%</p>
              </div>
              <div className="text-center">
                <ProgressRing percentage={1} label="Just Started" />
                <p className="text-caption text-gray-600 mt-2">1%</p>
              </div>
              <div className="text-center">
                <ProgressRing percentage={99} label="Almost Done" />
                <p className="text-caption text-gray-600 mt-2">99%</p>
              </div>
              <div className="text-center">
                <ProgressRing percentage={100} label="Completed" />
                <p className="text-caption text-gray-600 mt-2">100%</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Threshold Boundaries Section */}
        <section className="space-y-4">
          <h2 className="text-h3 font-semibold mb-4">Color Threshold Boundaries</h2>
          <Card variant="elevated" padding="lg">
            <p className="text-body-sm text-gray-600 mb-6">
              Testing exact threshold values where colors change
            </p>
            <div className="flex flex-wrap justify-around gap-4">
              <div className="text-center">
                <ProgressRing percentage={39} size={100} />
                <p className="text-caption text-gray-600 mt-2">39% - Red</p>
              </div>
              <div className="text-center">
                <ProgressRing percentage={40} size={100} />
                <p className="text-caption text-gray-600 mt-2">40% - Orange</p>
              </div>
              <div className="text-center">
                <ProgressRing percentage={69} size={100} />
                <p className="text-caption text-gray-600 mt-2">69% - Orange</p>
              </div>
              <div className="text-center">
                <ProgressRing percentage={70} size={100} />
                <p className="text-caption text-gray-600 mt-2">70% - Green</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Accessibility Features */}
        <Card variant="outline" padding="lg">
          <h3 className="text-h5 font-semibold mb-2">♿ Accessibility Features</h3>
          <ul className="text-body-sm text-gray-600 space-y-2 list-disc list-inside">
            <li>ARIA progressbar role with aria-valuenow, aria-valuemin, aria-valuemax</li>
            <li>Custom aria-label support for screen reader context</li>
            <li>Tabular numbers ensure consistent width for percentage text</li>
            <li>Smooth 500ms transition for visual feedback</li>
            <li>High color contrast for readability</li>
            <li>SVG rotated -90° so progress starts from top (12 o'clock position)</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default ProgressRingShowcase;

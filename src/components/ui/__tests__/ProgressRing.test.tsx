import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProgressRing } from '../ProgressRing';

describe('ProgressRing Component', () => {
  describe('Rendering', () => {
    it('renders correctly with percentage', () => {
      const { container } = render(<ProgressRing percentage={50} />);
      expect(container.querySelector('svg')).toBeInTheDocument();
      expect(screen.getByText('50%')).toBeInTheDocument();
    });

    it('renders as progressbar role', () => {
      render(<ProgressRing percentage={75} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toBeInTheDocument();
    });

    it('renders SVG with correct structure', () => {
      const { container } = render(<ProgressRing percentage={60} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      
      // Should have 2 circles (background + progress)
      const circles = container.querySelectorAll('circle');
      expect(circles).toHaveLength(2);
    });
  });

  describe('Percentage Display', () => {
    it('displays correct percentage text', () => {
      render(<ProgressRing percentage={85} />);
      expect(screen.getByText('85%')).toBeInTheDocument();
    });

    it('displays 0% for zero percentage', () => {
      render(<ProgressRing percentage={0} />);
      expect(screen.getByText('0%')).toBeInTheDocument();
    });

    it('displays 100% for full percentage', () => {
      render(<ProgressRing percentage={100} />);
      expect(screen.getByText('100%')).toBeInTheDocument();
    });

    it('clamps percentage below 0 to 0', () => {
      render(<ProgressRing percentage={-10} />);
      expect(screen.getByText('0%')).toBeInTheDocument();
    });

    it('clamps percentage above 100 to 100', () => {
      render(<ProgressRing percentage={150} />);
      expect(screen.getByText('100%')).toBeInTheDocument();
    });

    it('handles decimal percentages by displaying them', () => {
      render(<ProgressRing percentage={45.7} />);
      expect(screen.getByText('45.7%')).toBeInTheDocument();
    });
  });

  describe('Color Gradient Based on Percentage', () => {
    it('uses red color for percentage < 40', () => {
      const { container } = render(<ProgressRing percentage={30} />);
      const progressCircle = container.querySelectorAll('circle')[1];
      expect(progressCircle).toHaveAttribute('stroke', '#EF4444');
    });

    it('uses red color at exactly 39%', () => {
      const { container } = render(<ProgressRing percentage={39} />);
      const progressCircle = container.querySelectorAll('circle')[1];
      expect(progressCircle).toHaveAttribute('stroke', '#EF4444');
    });

    it('uses orange color for percentage 40-69', () => {
      const { container } = render(<ProgressRing percentage={50} />);
      const progressCircle = container.querySelectorAll('circle')[1];
      expect(progressCircle).toHaveAttribute('stroke', '#F59E0B');
    });

    it('uses orange color at exactly 40%', () => {
      const { container } = render(<ProgressRing percentage={40} />);
      const progressCircle = container.querySelectorAll('circle')[1];
      expect(progressCircle).toHaveAttribute('stroke', '#F59E0B');
    });

    it('uses orange color at exactly 69%', () => {
      const { container } = render(<ProgressRing percentage={69} />);
      const progressCircle = container.querySelectorAll('circle')[1];
      expect(progressCircle).toHaveAttribute('stroke', '#F59E0B');
    });

    it('uses green color for percentage >= 70', () => {
      const { container } = render(<ProgressRing percentage={80} />);
      const progressCircle = container.querySelectorAll('circle')[1];
      expect(progressCircle).toHaveAttribute('stroke', '#10B981');
    });

    it('uses green color at exactly 70%', () => {
      const { container } = render(<ProgressRing percentage={70} />);
      const progressCircle = container.querySelectorAll('circle')[1];
      expect(progressCircle).toHaveAttribute('stroke', '#10B981');
    });

    it('uses green color at 100%', () => {
      const { container } = render(<ProgressRing percentage={100} />);
      const progressCircle = container.querySelectorAll('circle')[1];
      expect(progressCircle).toHaveAttribute('stroke', '#10B981');
    });
  });

  describe('Configurable Size', () => {
    it('uses default size of 120 when not specified', () => {
      const { container } = render(<ProgressRing percentage={50} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '120');
      expect(svg).toHaveAttribute('height', '120');
    });

    it('accepts custom size', () => {
      const { container } = render(<ProgressRing percentage={50} size={200} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '200');
      expect(svg).toHaveAttribute('height', '200');
    });

    it('accepts small size', () => {
      const { container } = render(<ProgressRing percentage={50} size={60} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '60');
      expect(svg).toHaveAttribute('height', '60');
    });

    it('accepts large size', () => {
      const { container } = render(<ProgressRing percentage={50} size={300} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '300');
      expect(svg).toHaveAttribute('height', '300');
    });
  });

  describe('Configurable Stroke Width', () => {
    it('uses default stroke width of 8 when not specified', () => {
      const { container } = render(<ProgressRing percentage={50} />);
      const circles = container.querySelectorAll('circle');
      expect(circles[0]).toHaveAttribute('stroke-width', '8');
      expect(circles[1]).toHaveAttribute('stroke-width', '8');
    });

    it('accepts custom stroke width', () => {
      const { container } = render(<ProgressRing percentage={50} strokeWidth={12} />);
      const circles = container.querySelectorAll('circle');
      expect(circles[0]).toHaveAttribute('stroke-width', '12');
      expect(circles[1]).toHaveAttribute('stroke-width', '12');
    });

    it('accepts thin stroke width', () => {
      const { container } = render(<ProgressRing percentage={50} strokeWidth={4} />);
      const circles = container.querySelectorAll('circle');
      expect(circles[0]).toHaveAttribute('stroke-width', '4');
    });

    it('accepts thick stroke width', () => {
      const { container } = render(<ProgressRing percentage={50} strokeWidth={16} />);
      const circles = container.querySelectorAll('circle');
      expect(circles[0]).toHaveAttribute('stroke-width', '16');
    });
  });

  describe('Label Support', () => {
    it('displays label when provided', () => {
      render(<ProgressRing percentage={75} label="Complete" />);
      expect(screen.getByText('Complete')).toBeInTheDocument();
      expect(screen.getByText('75%')).toBeInTheDocument();
    });

    it('does not display label when not provided', () => {
      const { container } = render(<ProgressRing percentage={50} />);
      const texts = container.querySelectorAll('text');
      expect(texts).toHaveLength(1); // Only percentage text
    });

    it('displays custom label text', () => {
      render(<ProgressRing percentage={60} label="Progress" />);
      expect(screen.getByText('Progress')).toBeInTheDocument();
    });

    it('displays multi-word label', () => {
      render(<ProgressRing percentage={80} label="Almost Done" />);
      expect(screen.getByText('Almost Done')).toBeInTheDocument();
    });
  });

  describe('SVG Circle Calculations', () => {
    it('has correct circle radius calculation', () => {
      const { container } = render(<ProgressRing percentage={50} size={120} strokeWidth={8} />);
      const circles = container.querySelectorAll('circle');
      // radius = (size - strokeWidth) / 2 = (120 - 8) / 2 = 56
      expect(circles[0]).toHaveAttribute('r', '56');
      expect(circles[1]).toHaveAttribute('r', '56');
    });

    it('positions circles at center', () => {
      const { container } = render(<ProgressRing percentage={50} size={120} />);
      const circles = container.querySelectorAll('circle');
      // center = size / 2 = 60
      expect(circles[0]).toHaveAttribute('cx', '60');
      expect(circles[0]).toHaveAttribute('cy', '60');
      expect(circles[1]).toHaveAttribute('cx', '60');
      expect(circles[1]).toHaveAttribute('cy', '60');
    });

    it('has gray background circle', () => {
      const { container } = render(<ProgressRing percentage={50} />);
      const backgroundCircle = container.querySelectorAll('circle')[0];
      expect(backgroundCircle).toHaveAttribute('stroke', '#E5E7EB');
      expect(backgroundCircle).toHaveAttribute('fill', 'none');
    });

    it('progress circle has strokeLinecap round', () => {
      const { container } = render(<ProgressRing percentage={50} />);
      const progressCircle = container.querySelectorAll('circle')[1];
      expect(progressCircle).toHaveAttribute('stroke-linecap', 'round');
    });
  });

  describe('Animation', () => {
    it('progress circle has smooth transition classes', () => {
      const { container } = render(<ProgressRing percentage={50} />);
      const progressCircle = container.querySelectorAll('circle')[1];
      expect(progressCircle).toHaveClass('transition-all', 'duration-500', 'ease-out');
    });

    it('SVG is rotated -90 degrees to start from top', () => {
      const { container } = render(<ProgressRing percentage={50} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('transform', '-rotate-90');
    });
  });

  describe('Accessibility', () => {
    it('has progressbar role', () => {
      render(<ProgressRing percentage={65} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toBeInTheDocument();
    });

    it('has correct aria-valuenow', () => {
      render(<ProgressRing percentage={75} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '75');
    });

    it('has aria-valuemin of 0', () => {
      render(<ProgressRing percentage={50} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    });

    it('has aria-valuemax of 100', () => {
      render(<ProgressRing percentage={50} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuemax', '100');
    });

    it('has default aria-label with percentage', () => {
      render(<ProgressRing percentage={80} />);
      const progressbar = screen.getByLabelText('80% complete');
      expect(progressbar).toBeInTheDocument();
    });

    it('uses custom label in aria-label when provided', () => {
      render(<ProgressRing percentage={60} label="Tasks Done" />);
      const progressbar = screen.getByLabelText('Tasks Done');
      expect(progressbar).toBeInTheDocument();
    });

    it('announces clamped percentage to screen readers', () => {
      render(<ProgressRing percentage={150} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '100');
    });
  });

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      const { container } = render(<ProgressRing percentage={50} className="custom-class" />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('custom-class');
    });

    it('preserves base classes with custom className', () => {
      const { container } = render(<ProgressRing percentage={50} className="extra-margin" />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('extra-margin', 'inline-flex', 'items-center', 'justify-center');
    });

    it('spreads additional props', () => {
      const { container } = render(
        <ProgressRing percentage={50} data-testid="custom-ring" />
      );
      expect(screen.getByTestId('custom-ring')).toBeInTheDocument();
    });
  });

  describe('Real-world Use Cases', () => {
    it('displays promise completion rate', () => {
      render(<ProgressRing percentage={65} label="Completed" />);
      expect(screen.getByText('65%')).toBeInTheDocument();
      expect(screen.getByText('Completed')).toBeInTheDocument();
    });

    it('shows low completion with red color', () => {
      const { container } = render(<ProgressRing percentage={25} label="Behind Schedule" />);
      const progressCircle = container.querySelectorAll('circle')[1];
      expect(progressCircle).toHaveAttribute('stroke', '#EF4444');
      expect(screen.getByText('Behind Schedule')).toBeInTheDocument();
    });

    it('shows moderate completion with orange color', () => {
      const { container } = render(<ProgressRing percentage={55} label="On Track" />);
      const progressCircle = container.querySelectorAll('circle')[1];
      expect(progressCircle).toHaveAttribute('stroke', '#F59E0B');
      expect(screen.getByText('On Track')).toBeInTheDocument();
    });

    it('shows high completion with green color', () => {
      const { container } = render(<ProgressRing percentage={85} label="Excellent" />);
      const progressCircle = container.querySelectorAll('circle')[1];
      expect(progressCircle).toHaveAttribute('stroke', '#10B981');
      expect(screen.getByText('Excellent')).toBeInTheDocument();
    });

    it('works in a dashboard with multiple rings', () => {
      render(
        <>
          <ProgressRing percentage={45} label="Education" />
          <ProgressRing percentage={75} label="Healthcare" />
          <ProgressRing percentage={90} label="Infrastructure" />
        </>
      );
      expect(screen.getByText('45%')).toBeInTheDocument();
      expect(screen.getByText('75%')).toBeInTheDocument();
      expect(screen.getByText('90%')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles 0% correctly', () => {
      const { container } = render(<ProgressRing percentage={0} />);
      expect(screen.getByText('0%')).toBeInTheDocument();
      const progressCircle = container.querySelectorAll('circle')[1];
      // Should still render but with no visible progress
      expect(progressCircle).toBeInTheDocument();
    });

    it('handles 100% correctly', () => {
      const { container } = render(<ProgressRing percentage={100} />);
      expect(screen.getByText('100%')).toBeInTheDocument();
      const progressCircle = container.querySelectorAll('circle')[1];
      expect(progressCircle).toHaveAttribute('stroke', '#10B981');
    });

    it('handles very small size', () => {
      const { container } = render(<ProgressRing percentage={50} size={40} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '40');
    });

    it('handles very large size', () => {
      const { container } = render(<ProgressRing percentage={50} size={500} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '500');
    });
  });

  describe('Typography', () => {
    it('uses tabular numbers for percentage', () => {
      const { container } = render(<ProgressRing percentage={88} />);
      const percentageText = container.querySelector('text');
      expect(percentageText).toHaveClass('tabular-nums');
    });

    it('uses bold font for percentage', () => {
      const { container } = render(<ProgressRing percentage={75} />);
      const percentageText = container.querySelector('text');
      expect(percentageText).toHaveClass('font-bold');
    });

    it('uses medium font for label', () => {
      const { container } = render(<ProgressRing percentage={60} label="Progress" />);
      const texts = container.querySelectorAll('text');
      expect(texts[1]).toHaveClass('font-medium');
    });
  });
});

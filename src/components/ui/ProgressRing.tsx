import React from 'react';

export interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  className?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  percentage,
  size = 120,
  strokeWidth = 8,
  label,
  className = '',
  ...rest
}) => {
  // Clamp percentage between 0 and 100
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  // Calculate circle properties
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (clampedPercentage / 100) * circumference;

  // Determine color based on percentage thresholds
  const getColor = (pct: number): string => {
    if (pct < 40) return '#EF4444'; // red-500
    if (pct < 70) return '#F59E0B'; // orange-500
    return '#10B981'; // green-500
  };

  const color = getColor(clampedPercentage);

  // Calculate font size for percentage text based on ring size
  const fontSize = size * 0.25;
  const labelFontSize = size * 0.12;

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      role="progressbar"
      aria-valuenow={clampedPercentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label || `${clampedPercentage}% complete`}
      {...rest}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />

        {/* Center text */}
        <g className="transform rotate-90" transform={`rotate(90 ${size / 2} ${size / 2})`}>
          <text
            x={size / 2}
            y={size / 2}
            textAnchor="middle"
            dominantBaseline="central"
            className="font-bold tabular-nums"
            style={{
              fontSize: `${fontSize}px`,
              fill: color,
            }}
          >
            {clampedPercentage}%
          </text>
          {label && (
            <text
              x={size / 2}
              y={size / 2 + fontSize * 0.7}
              textAnchor="middle"
              dominantBaseline="central"
              className="font-medium"
              style={{
                fontSize: `${labelFontSize}px`,
                fill: '#6B7280',
              }}
            >
              {label}
            </text>
          )}
        </g>
      </svg>
    </div>
  );
};

export default ProgressRing;

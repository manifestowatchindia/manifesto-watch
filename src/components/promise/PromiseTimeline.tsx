import React from 'react';

/**
 * Promise Timeline Component
 * 
 * Displays a vertical timeline of promise implementation events
 * showing milestones, dates, and status updates
 * 
 * @example
 * <PromiseTimeline
 *   events={[
 *     { date: '2024-06-01', status: 'in-progress', description: 'Initiative launched' },
 *     { date: '2024-12-15', status: 'completed', description: 'First milestone achieved' }
 *   ]}
 * />
 */

export type PromiseStatus = 
  | 'completed' 
  | 'in-progress' 
  | 'delayed' 
  | 'not-started' 
  | 'partially-completed';

export interface TimelineEvent {
  date: string;
  status: PromiseStatus;
  description: string;
  details?: string;
}

export interface PromiseTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

const statusConfig = {
  completed: {
    color: 'green',
    icon: '✓',
    bgColor: 'bg-green-500',
    textColor: 'text-green-700',
    borderColor: 'border-green-500',
    lightBg: 'bg-green-50',
  },
  'in-progress': {
    color: 'blue',
    icon: '◐',
    bgColor: 'bg-blue-500',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-500',
    lightBg: 'bg-blue-50',
  },
  delayed: {
    color: 'orange',
    icon: '⏸',
    bgColor: 'bg-orange-500',
    textColor: 'text-orange-700',
    borderColor: 'border-orange-500',
    lightBg: 'bg-orange-50',
  },
  'not-started': {
    color: 'gray',
    icon: '○',
    bgColor: 'bg-gray-400',
    textColor: 'text-gray-700',
    borderColor: 'border-gray-400',
    lightBg: 'bg-gray-50',
  },
  'partially-completed': {
    color: 'yellow',
    icon: '◑',
    bgColor: 'bg-yellow-500',
    textColor: 'text-yellow-700',
    borderColor: 'border-yellow-500',
    lightBg: 'bg-yellow-50',
  },
} as const;

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-IN', options);
};

export const PromiseTimeline: React.FC<PromiseTimelineProps> = ({
  events,
  className = '',
}) => {
  if (!events || events.length === 0) {
    return (
      <div className={`text-center py-8 text-gray-500 ${className}`}>
        <p>No timeline events available</p>
      </div>
    );
  }

  // Sort events by date (most recent first)
  const sortedEvents = [...events].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className={`relative ${className}`} role="list" aria-label="Promise timeline">
      {sortedEvents.map((event, index) => {
        const config = statusConfig[event.status];
        const isLast = index === sortedEvents.length - 1;

        return (
          <div
            key={`${event.date}-${index}`}
            className="relative pb-8"
            role="listitem"
            aria-label={`${event.description} on ${formatDate(event.date)}`}
          >
            {/* Vertical connecting line */}
            {!isLast && (
              <div
                className={`absolute left-4 top-8 bottom-0 w-0.5 ${config.bgColor} opacity-30`}
                aria-hidden="true"
              />
            )}

            {/* Timeline node container */}
            <div className="relative flex items-start gap-4">
              {/* Status icon circle */}
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full ${config.bgColor} flex items-center justify-center text-white font-bold shadow-md z-10`}
                aria-hidden="true"
              >
                {config.icon}
              </div>

              {/* Event content */}
              <div className="flex-1 min-w-0">
                {/* Date label */}
                <div className="flex items-center gap-2 mb-2">
                  <time
                    className={`text-sm font-semibold ${config.textColor}`}
                    dateTime={event.date}
                  >
                    {formatDate(event.date)}
                  </time>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${config.lightBg} ${config.textColor} font-medium uppercase tracking-wide`}
                  >
                    {event.status.replace('-', ' ')}
                  </span>
                </div>

                {/* Description card */}
                <div
                  className={`p-4 rounded-lg border-l-4 ${config.borderColor} ${config.lightBg} shadow-sm`}
                >
                  <p className="text-gray-900 font-medium leading-relaxed">
                    {event.description}
                  </p>
                  {event.details && (
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                      {event.details}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PromiseTimeline;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Category, Promise as PromiseType } from '../lib/types';
import { promiseService } from '../services/promiseService';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const [promises, setPromises] = useState<PromiseType[]>([]);

  useEffect(() => {
    promiseService.getPromisesByCategory(category.id)
      .then((data) => {
        setPromises(data);
      })
      .catch(() => {
        // Silently handle errors - component will still render
      });
  }, [category.id]);

  const stats = promiseService.getStats(promises);

  // Icon mapping - using Font Awesome icons
  const iconMap: Record<string, string> = {
    'Construction': 'fa-tools',
    'Heart': 'fa-heartbeat',
    'GraduationCap': 'fa-graduation-cap',
    'TrendingUp': 'fa-chart-line',
    'Sprout': 'fa-seedling',
    'Shield': 'fa-shield-alt',
    'Users': 'fa-users',
    'Rocket': 'fa-rocket',
    'Building2': 'fa-building',
    'Leaf': 'fa-leaf',
    'Cpu': 'fa-microchip',
    'Scale': 'fa-balance-scale',
    'HandHeart': 'fa-hand-holding-heart',
    'ShieldCheck': 'fa-shield-alt',
    'MoreHorizontal': 'fa-ellipsis-h',
  };

  const iconClass = iconMap[category.icon] || 'fa-folder';

  return (
    <Link 
      to={`/government-dashboard/category/${category.slug}`}
      className="block group"
    >
      <div 
        className="h-full bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
        style={{
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
        }}
        onMouseEnter={(e) => {
          const rgb = category.color ? 
            `${parseInt(category.color.slice(1, 3), 16)}, ${parseInt(category.color.slice(3, 5), 16)}, ${parseInt(category.color.slice(5, 7), 16)}` : 
            '255, 69, 0';
          e.currentTarget.style.boxShadow = `0 12px 24px rgba(${rgb}, 0.3)`;
          e.currentTarget.style.borderColor = category.color || '#FF4500';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3)';
          e.currentTarget.style.borderColor = '#1f2937';
        }}
      >
        {/* Color Bar */}
        <div 
          className="h-1 w-full"
          style={{ backgroundColor: category.color || '#FF4500' }}
        />

        <div className="p-4">
          {/* Icon & Title */}
          <div className="flex items-start mb-3">
            <div 
              className="flex items-center justify-center w-14 h-14 rounded-xl mr-4 flex-shrink-0"
              style={{ backgroundColor: `${category.color || '#FF4500'}20` }}
            >
              <i 
                className={`fas ${iconClass} text-3xl`}
                style={{ color: category.color || '#FF4500' }} 
              />
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="text-white text-lg font-semibold leading-tight mb-2">
                {category.name}
              </h5>
              <p className="text-gray-400 text-sm leading-normal">
                {category.description}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-2 bg-black rounded-lg border border-gray-800">
                <div 
                  className="text-2xl font-bold"
                  style={{ color: category.color || '#FF4500' }}
                >
                  {stats.total}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">
                  Promises
                </div>
              </div>
              <div className="text-center p-2 bg-black rounded-lg border border-gray-800">
                <div className="text-2xl font-bold text-green-500">
                  {stats.measurablePercent}%
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">
                  Measurable
                </div>
              </div>
            </div>

            {/* Status Bar */}
            <div className="mt-3">
              <div className="h-2 bg-black rounded overflow-hidden flex">
                {Object.entries(stats.statusBreakdown).map(([status, count]) => {
                  const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
                  const statusColors: Record<string, string> = {
                    'Delivered': '#4CAF50',
                    'Under implementation': '#2196F3',
                    'Actioned': '#FF9800',
                    'Announced': '#9E9E9E',
                    'Deferred': '#F44336'
                  };
                  
                  if (percentage === 0) return null;
                  
                  return (
                    <div
                      key={status}
                      className="h-full"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: statusColors[status] || '#666'
                      }}
                      title={`${status}: ${count}`}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-600">
                <span>Status Distribution</span>
                <span className="text-gray-500 group-hover:text-gray-400 transition-colors">
                  View Details →
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

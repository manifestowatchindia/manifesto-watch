import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Category, Promise as PromiseType } from '../lib/types';
import { promiseService } from '../services/promiseService';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const [promises, setPromises] = useState<PromiseType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    promiseService.getPromisesByCategory(category.id).then((data) => {
      setPromises(data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
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
      className="text-decoration-none"
      style={{ display: 'block' }}
    >
      <div 
        className="card h-100 shadow-sm hover-lift"
        style={{
          backgroundColor: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: '16px',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)';
          e.currentTarget.style.boxShadow = `0 12px 24px rgba(${parseInt(category.color?.slice(1, 3) || 'FF', 16)}, ${parseInt(category.color?.slice(3, 5) || '45', 16)}, ${parseInt(category.color?.slice(5, 7) || '00', 16)}, 0.3)`;
          e.currentTarget.style.borderColor = category.color || '#FF4500';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3)';
          e.currentTarget.style.borderColor = '#333';
        }}
      >
        {/* Color Bar */}
        <div style={{
          height: '4px',
          backgroundColor: category.color || '#FF4500',
          width: '100%'
        }} />

        <div className="card-body p-4">
          {/* Icon & Title */}
          <div className="d-flex align-items-start mb-3">
            <div 
              className="d-flex align-items-center justify-content-center"
              style={{
                width: '56px',
                height: '56px',
                backgroundColor: `${category.color || '#FF4500'}20`,
                borderRadius: '12px',
                marginRight: '16px',
                flexShrink: 0
              }}
            >
              <i 
                className={`fas ${iconClass}`}
                style={{ 
                  fontSize: '28px', 
                  color: category.color || '#FF4500'
                }} 
              />
            </div>
            <div className="flex-grow-1">
              <h5 
                className="card-title mb-2"
                style={{ 
                  color: '#fff',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  lineHeight: '1.3'
                }}
              >
                {category.name}
              </h5>
              <p 
                className="text-muted small mb-0"
                style={{ 
                  color: '#aaa',
                  fontSize: '0.85rem',
                  lineHeight: '1.4'
                }}
              >
                {category.description}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4">
            <div className="row g-3">
              <div className="col-6">
                <div 
                  className="text-center p-2"
                  style={{
                    backgroundColor: '#0d0d0d',
                    borderRadius: '8px',
                    border: '1px solid #222'
                  }}
                >
                  <div 
                    style={{ 
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: category.color || '#FF4500'
                    }}
                  >
                    {stats.total}
                  </div>
                  <div 
                    style={{ 
                      fontSize: '0.75rem',
                      color: '#888',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      marginTop: '2px'
                    }}
                  >
                    Promises
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div 
                  className="text-center p-2"
                  style={{
                    backgroundColor: '#0d0d0d',
                    borderRadius: '8px',
                    border: '1px solid #222'
                  }}
                >
                  <div 
                    style={{ 
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: '#4CAF50'
                    }}
                  >
                    {stats.measurablePercent}%
                  </div>
                  <div 
                    style={{ 
                      fontSize: '0.75rem',
                      color: '#888',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      marginTop: '2px'
                    }}
                  >
                    Measurable
                  </div>
                </div>
              </div>
            </div>

            {/* Status Bar */}
            <div className="mt-3">
              <div 
                style={{
                  height: '8px',
                  backgroundColor: '#0d0d0d',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  display: 'flex'
                }}
              >
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
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: statusColors[status] || '#666',
                        height: '100%'
                      }}
                      title={`${status}: ${count}`}
                    />
                  );
                })}
              </div>
              <div 
                className="d-flex justify-content-between mt-2"
                style={{ fontSize: '0.7rem', color: '#666' }}
              >
                <span>Status Distribution</span>
                <span className="text-muted">View Details →</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

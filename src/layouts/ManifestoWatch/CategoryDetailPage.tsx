import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCategoryBySlug } from '../../data/categories';
import { promiseService } from '../../services/promiseService';
import SEO from '../../components/SEO';
import { Promise } from '../../lib/types';

interface PromiseDetailDrawerProps {
  promise: Promise;
  isOpen: boolean;
  onClose: () => void;
}

const PromiseDetailDrawer: React.FC<PromiseDetailDrawerProps> = ({ promise, isOpen, onClose }) => {
  if (!isOpen) return null;

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Delivered': '#4CAF50',
      'Under implementation': '#2196F3',
      'Actioned': '#FF9800',
      'Announced': '#9E9E9E',
      'Deferred': '#F44336'
    };
    return colors[status] || '#666';
  };

  const getProgressPercentage = (status: string): number => {
    const progress: Record<string, number> = {
      'Delivered': 100,
      'Under implementation': 60,
      'Actioned': 40,
      'Announced': 10,
      'Deferred': 0
    };
    return progress[status] || 0;
  };

  const getVerdict = (status: string): { text: string; color: string; icon: string } => {
    if (status === 'Delivered') {
      return { text: 'Completed', color: '#4CAF50', icon: 'fa-check-circle' };
    } else if (status === 'Deferred') {
      return { text: 'Not Completed', color: '#F44336', icon: 'fa-times-circle' };
    } else {
      return { text: 'In Progress', color: '#FF9800', icon: 'fa-spinner' };
    }
  };

  const progress = getProgressPercentage(promise.status);
  const verdict = getVerdict(promise.status);

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          zIndex: 1040,
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '600px',
          backgroundColor: '#1a1a1a',
          zIndex: 1050,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          overflowY: 'auto',
          boxShadow: '-4px 0 20px rgba(0,0,0,0.5)'
        }}
      >
        <div style={{ padding: '2rem' }}>
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
          >
            <i className="fas fa-times"></i>
          </button>

          {/* Promise Title */}
          <h3 style={{ color: '#FF4500', marginBottom: '1.5rem', paddingRight: '2rem' }}>
            {promise.title}
          </h3>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span style={{ color: '#aaa', fontSize: '0.9rem' }}>Progress</span>
              <span style={{ color: '#fff', fontSize: '1.2rem', fontWeight: '700' }}>{progress}%</span>
            </div>
            <div
              style={{
                height: '24px',
                backgroundColor: '#0d0d0d',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #333'
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  backgroundColor: getStatusColor(promise.status),
                  transition: 'width 0.5s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  color: '#fff'
                }}
              >
                {progress > 20 && `${progress}%`}
              </div>
            </div>
          </div>

          {/* Final Verdict */}
          <div
            className="mb-4 p-3"
            style={{
              backgroundColor: `${verdict.color}20`,
              border: `2px solid ${verdict.color}`,
              borderRadius: '12px'
            }}
          >
            <div className="d-flex align-items-center">
              <i
                className={`fas ${verdict.icon} fa-2x me-3`}
                style={{ color: verdict.color }}
              ></i>
              <div>
                <div style={{ color: '#aaa', fontSize: '0.8rem', marginBottom: '4px' }}>
                  Final Verdict
                </div>
                <div style={{ color: verdict.color, fontSize: '1.3rem', fontWeight: '700' }}>
                  {verdict.text}
                </div>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="row g-3 mb-4">
            <div className="col-6">
              <div
                className="p-3"
                style={{
                  backgroundColor: '#0d0d0d',
                  borderRadius: '8px',
                  border: '1px solid #333'
                }}
              >
                <div style={{ color: '#888', fontSize: '0.75rem', marginBottom: '4px' }}>
                  STATUS
                </div>
                <div style={{ color: getStatusColor(promise.status), fontWeight: '600' }}>
                  {promise.status}
                </div>
              </div>
            </div>
            <div className="col-6">
              <div
                className="p-3"
                style={{
                  backgroundColor: '#0d0d0d',
                  borderRadius: '8px',
                  border: '1px solid #333'
                }}
              >
                <div style={{ color: '#888', fontSize: '0.75rem', marginBottom: '4px' }}>
                  TIMELINE
                </div>
                <div style={{ color: '#fff', fontWeight: '600' }}>
                  {promise.timeline === '100d' ? '100 Days' : promise.timeline === '5yr' ? '5 Years' : 'Vision 2047'}
                </div>
              </div>
            </div>
            <div className="col-6">
              <div
                className="p-3"
                style={{
                  backgroundColor: '#0d0d0d',
                  borderRadius: '8px',
                  border: '1px solid #333'
                }}
              >
                <div style={{ color: '#888', fontSize: '0.75rem', marginBottom: '4px' }}>
                  TYPE
                </div>
                <div style={{ color: '#fff', fontWeight: '600', textTransform: 'capitalize' }}>
                  {promise.type}
                </div>
              </div>
            </div>
            <div className="col-6">
              <div
                className="p-3"
                style={{
                  backgroundColor: '#0d0d0d',
                  borderRadius: '8px',
                  border: '1px solid #333'
                }}
              >
                <div style={{ color: '#888', fontSize: '0.75rem', marginBottom: '4px' }}>
                  GEOGRAPHY
                </div>
                <div style={{ color: '#fff', fontWeight: '600', textTransform: 'capitalize' }}>
                  {promise.geography}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {promise.description && (
            <div className="mb-4">
              <h5 style={{ color: '#FF4500', fontSize: '1rem', marginBottom: '0.75rem' }}>
                Description
              </h5>
              <p style={{ color: '#ccc', lineHeight: '1.6' }}>
                {promise.description}
              </p>
            </div>
          )}

          {/* Sub Theme */}
          {promise.subTheme && (
            <div className="mb-4">
              <h5 style={{ color: '#FF4500', fontSize: '1rem', marginBottom: '0.75rem' }}>
                Sub-Theme
              </h5>
              <span
                className="badge"
                style={{
                  backgroundColor: '#FF450020',
                  color: '#FF4500',
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem',
                  border: '1px solid #FF4500'
                }}
              >
                {promise.subTheme}
              </span>
            </div>
          )}

          {/* Metrics */}
          {promise.measurable && promise.metric && (
            <div className="mb-4">
              <h5 style={{ color: '#FF4500', fontSize: '1rem', marginBottom: '0.75rem' }}>
                Measurable Metric
              </h5>
              <div
                className="p-3"
                style={{
                  backgroundColor: '#0d0d0d',
                  borderRadius: '8px',
                  border: '1px solid #4CAF50'
                }}
              >
                <div style={{ color: '#aaa', fontSize: '0.85rem', marginBottom: '4px' }}>
                  {promise.metric.label}
                </div>
                <div style={{ color: '#4CAF50', fontSize: '1.5rem', fontWeight: '700' }}>
                  {promise.metric.target} {promise.metric.unit}
                </div>
              </div>
            </div>
          )}

          {/* Budget */}
          {promise.hasBudgetMention && (
            <div className="mb-4">
              <div
                className="p-3"
                style={{
                  backgroundColor: '#2196F320',
                  borderRadius: '8px',
                  border: '1px solid #2196F3'
                }}
              >
                <i className="fas fa-dollar-sign me-2" style={{ color: '#2196F3' }}></i>
                <span style={{ color: '#fff' }}>Budget allocation mentioned</span>
              </div>
            </div>
          )}

          {/* Citations */}
          {promise.citations && promise.citations.length > 0 && (
            <div className="mb-4">
              <h5 style={{ color: '#FF4500', fontSize: '1rem', marginBottom: '0.75rem' }}>
                <i className="fas fa-link me-2"></i>
                Sources & Citations
              </h5>
              {promise.citations.map((citation, index) => (
                <a
                  key={index}
                  href={citation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-block mb-2 p-3"
                  style={{
                    backgroundColor: '#0d0d0d',
                    border: '1px solid #333',
                    borderRadius: '8px',
                    color: '#2196F3',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#2196F3';
                    e.currentTarget.style.backgroundColor = '#2196F310';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#333';
                    e.currentTarget.style.backgroundColor = '#0d0d0d';
                  }}
                >
                  <i className="fas fa-external-link-alt me-2"></i>
                  {citation.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export const CategoryDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = getCategoryBySlug(slug || '');
  const [selectedPromise, setSelectedPromise] = useState<Promise | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [allPromises, setAllPromises] = useState<Promise[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch promises when component mounts or category changes
  useEffect(() => {
    if (category) {
      setLoading(true);
      promiseService.getPromisesByCategory(category.id).then((promises) => {
        setAllPromises(promises);
        setLoading(false);
      }).catch((error) => {
        console.error('Error loading promises:', error);
        setLoading(false);
      });
    }
  }, [category]);  // Fixed: include full 'category' dependency

  if (!category) {
    return (
      <div style={{ backgroundColor: '#000', minHeight: '100vh', padding: '4rem 0' }}>
        <div className="container text-center">
          <h1 style={{ color: '#FF4500' }}>Category Not Found</h1>
          <Link to="/government-dashboard" className="btn btn-primary mt-3">
            <i className="fas fa-arrow-left me-2"></i>
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ backgroundColor: '#000', minHeight: '100vh', padding: '4rem 0' }}>
        <div className="container text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-white mt-3">Loading promises...</p>
        </div>
      </div>
    );
  }

  const stats = promiseService.getStats(allPromises);

  // Filter promises
  const filteredPromises = allPromises.filter((promise: Promise) => {
    const matchesSearch = 
      searchQuery === '' ||
      promise.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promise.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promise.subTheme?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || promise.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string): string => {
    const icons: Record<string, string> = {
      'Delivered': 'fa-check-circle',
      'Under implementation': 'fa-spinner',
      'Actioned': 'fa-play-circle',
      'Announced': 'fa-bullhorn',
      'Deferred': 'fa-times-circle'
    };
    return icons[status] || 'fa-circle';
  };

  const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
      'Delivered': '#4CAF50',
      'Under implementation': '#2196F3',
      'Actioned': '#FF9800',
      'Announced': '#9E9E9E',
      'Deferred': '#F44336'
    };
    return colors[status] || '#666';
  };

  const getProgressPercentage = (status: string): number => {
    const progress: Record<string, number> = {
      'Delivered': 100,
      'Under implementation': 60,
      'Actioned': 40,
      'Announced': 10,
      'Deferred': 0
    };
    return progress[status] || 0;
  };

  const getVerdict = (status: string): string => {
    if (status === 'Delivered') return 'Completed';
    if (status === 'Deferred') return 'Not Completed';
    return 'In Progress';
  };

  return (
    <>
      <SEO
        title={`${category.name} - Promises & Progress | Manifesto Watch`}
        description={`Track ${category.name} promises and their implementation progress. View detailed metrics, timelines, and status updates.`}
        canonicalUrl={`/government-dashboard/category/${category.slug}`}
      />

      <div style={{ backgroundColor: '#000', minHeight: '100vh', paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className="container">
          {/* Breadcrumb */}
          <nav className="mb-4" style={{ fontSize: '0.9rem' }}>
            <Link to="/government-dashboard" style={{ color: '#2196F3', textDecoration: 'none' }}>
              <i className="fas fa-home me-2"></i>
              Dashboard
            </Link>
            <span style={{ color: '#666', margin: '0 0.5rem' }}>/</span>
            <span style={{ color: '#aaa' }}>{category.name}</span>
          </nav>

          {/* Category Header */}
          <div
            className="mb-5 p-4"
            style={{
              backgroundColor: '#1a1a1a',
              borderRadius: '16px',
              border: `2px solid ${category.color}`,
              borderLeft: `8px solid ${category.color}`
            }}
          >
            <div className="row align-items-center">
              <div className="col-md-8">
                <h1 style={{ color: category.color, marginBottom: '0.5rem', fontSize: '2rem' }}>
                  {category.name}
                </h1>
                <p style={{ color: '#aaa', marginBottom: 0 }}>
                  {category.description}
                </p>
              </div>
              <div className="col-md-4">
                <div className="row g-2">
                  <div className="col-6">
                    <div className="text-center p-2" style={{ backgroundColor: '#0d0d0d', borderRadius: '8px' }}>
                      <div style={{ color: category.color, fontSize: '1.8rem', fontWeight: '700' }}>
                        {stats.total}
                      </div>
                      <div style={{ color: '#888', fontSize: '0.75rem' }}>Total Promises</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="text-center p-2" style={{ backgroundColor: '#0d0d0d', borderRadius: '8px' }}>
                      <div style={{ color: '#4CAF50', fontSize: '1.8rem', fontWeight: '700' }}>
                        {stats.measurablePercent}%
                      </div>
                      <div style={{ color: '#888', fontSize: '0.75rem' }}>Measurable</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div
            className="mb-4 p-3"
            style={{
              backgroundColor: '#1a1a1a',
              borderRadius: '12px',
              border: '1px solid #333'
            }}
          >
            <div className="row g-3 align-items-center">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Search promises..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    backgroundColor: '#0d0d0d',
                    border: '1px solid #444',
                    color: '#fff'
                  }}
                />
              </div>
              <div className="col-md-6">
                <select
                  className="form-select form-select-lg"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{
                    backgroundColor: '#0d0d0d',
                    border: '1px solid #444',
                    color: '#fff'
                  }}
                >
                  <option value="all">All Statuses</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Under implementation">Under Implementation</option>
                  <option value="Actioned">Actioned</option>
                  <option value="Announced">Announced</option>
                  <option value="Deferred">Deferred</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-3">
            <h5 style={{ color: '#aaa', fontWeight: '400' }}>
              <i className="fas fa-list me-2"></i>
              {filteredPromises.length} {filteredPromises.length === 1 ? 'Promise' : 'Promises'}
              {searchQuery && <span style={{ color: '#FF4500' }}> matching "{searchQuery}"</span>}
            </h5>
          </div>

          {/* Vertical Promise List */}
          <div className="row g-3">
            {filteredPromises.map((promise, index) => {
              const progress = getProgressPercentage(promise.status);
              const verdict = getVerdict(promise.status);
              const verdictColor = getStatusColor(promise.status);

              return (
                <div key={promise.id} className="col-12">
                  <div
                    className="card"
                    style={{
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #333',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={() => setSelectedPromise(promise)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = category.color || '#FF4500';
                      e.currentTarget.style.transform = 'translateX(8px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#333';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <div className="card-body p-4">
                      <div className="row align-items-center">
                        {/* Promise Number */}
                        <div className="col-auto">
                          <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                              width: '48px',
                              height: '48px',
                              backgroundColor: `${category.color}20`,
                              borderRadius: '50%',
                              border: `2px solid ${category.color}`
                            }}
                          >
                            <span style={{ color: category.color, fontWeight: '700', fontSize: '1.2rem' }}>
                              {index + 1}
                            </span>
                          </div>
                        </div>

                        {/* Promise Details */}
                        <div className="col">
                          <div className="row align-items-center">
                            {/* Title & Sub-theme */}
                            <div className="col-md-5">
                              <h5 style={{ color: '#fff', marginBottom: '0.25rem', fontSize: '1.1rem' }}>
                                {promise.title}
                              </h5>
                              {promise.subTheme && (
                                <span
                                  className="badge"
                                  style={{
                                    backgroundColor: '#0d0d0d',
                                    color: '#aaa',
                                    fontSize: '0.75rem',
                                    fontWeight: '400'
                                  }}
                                >
                                  {promise.subTheme}
                                </span>
                              )}
                            </div>

                            {/* Progress Bar */}
                            <div className="col-md-3">
                              <div className="mb-1" style={{ fontSize: '0.75rem', color: '#888' }}>
                                Progress: <strong style={{ color: '#fff' }}>{progress}%</strong>
                              </div>
                              <div
                                style={{
                                  height: '12px',
                                  backgroundColor: '#0d0d0d',
                                  borderRadius: '6px',
                                  overflow: 'hidden'
                                }}
                              >
                                <div
                                  style={{
                                    height: '100%',
                                    width: `${progress}%`,
                                    backgroundColor: getStatusColor(promise.status),
                                    transition: 'width 0.5s ease'
                                  }}
                                />
                              </div>
                            </div>

                            {/* Verdict */}
                            <div className="col-md-3">
                              <div
                                className="text-center p-2"
                                style={{
                                  backgroundColor: `${verdictColor}10`,
                                  border: `1px solid ${verdictColor}`,
                                  borderRadius: '8px'
                                }}
                              >
                                <i
                                  className={`fas ${getStatusIcon(promise.status)} me-2`}
                                  style={{ color: verdictColor }}
                                ></i>
                                <span style={{ color: verdictColor, fontWeight: '600', fontSize: '0.9rem' }}>
                                  {verdict}
                                </span>
                              </div>
                            </div>

                            {/* View Button */}
                            <div className="col-md-1 text-end">
                              <i className="fas fa-chevron-right" style={{ color: '#666' }}></i>
                            </div>
                          </div>

                          {/* Additional Info Row */}
                          <div className="row mt-3">
                            <div className="col">
                              <div className="d-flex gap-3 flex-wrap" style={{ fontSize: '0.85rem' }}>
                                <span style={{ color: '#888' }}>
                                  <i className="fas fa-clock me-1"></i>
                                  {promise.timeline === '100d' ? '100 Days' : promise.timeline === '5yr' ? '5 Years' : 'Vision 2047'}
                                </span>
                                <span style={{ color: '#888' }}>
                                  <i className="fas fa-tag me-1"></i>
                                  {promise.type}
                                </span>
                                {promise.measurable && (
                                  <span style={{ color: '#4CAF50' }}>
                                    <i className="fas fa-ruler me-1"></i>
                                    Measurable
                                  </span>
                                )}
                                {promise.hasBudgetMention && (
                                  <span style={{ color: '#2196F3' }}>
                                    <i className="fas fa-dollar-sign me-1"></i>
                                    Budget Allocated
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredPromises.length === 0 && (
            <div
              className="text-center p-5"
              style={{
                backgroundColor: '#1a1a1a',
                borderRadius: '16px',
                border: '1px dashed #444'
              }}
            >
              <i className="fas fa-search fa-3x mb-3" style={{ color: '#666' }}></i>
              <h3 style={{ color: '#aaa' }}>No promises found</h3>
              <p style={{ color: '#666' }}>Try adjusting your search or filter criteria</p>
              <button
                className="btn btn-outline-light mt-3"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Promise Detail Drawer */}
      <PromiseDetailDrawer
        promise={selectedPromise!}
        isOpen={!!selectedPromise}
        onClose={() => setSelectedPromise(null)}
      />
    </>
  );
};

import React, { useState, useMemo, useEffect } from 'react';
import { categories } from '../../data/categories';
import { CategoryCard } from '../../components/CategoryCard';
import { promiseService } from '../../services/promiseService';
import { Promise as PromiseType } from '../../lib/types';
import SEO from '../../components/SEO';

export const ManifestoWatchDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'measurable' | 'budget'>('all');
  const [promises, setPromises] = useState<PromiseType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    promiseService.getAllPromises().then((data) => {
      setPromises(data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  // Calculate overall stats
  const overallStats = useMemo(() => promiseService.getStats(promises), [promises]);

  // Filter categories based on search
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    
    const query = searchQuery.toLowerCase();
    return categories.filter(cat =>
      cat.name.toLowerCase().includes(query) ||
      cat.description?.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <>
      <SEO 
        title="Manifesto Watch Dashboard - 15 Categories | Track Government Promises"
        description="Comprehensive dashboard tracking government promises across 15 categories including Infrastructure, Health, Education, Economy, and more. Monitor progress with real-time data."
        canonicalUrl="/government-dashboard"
      />

      <div style={{ backgroundColor: '#000', minHeight: '100vh', paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className="container">
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="display-4 mb-3" style={{ color: '#FF4500', fontWeight: '700' }}>
              <i className="fas fa-chart-bar me-3"></i>
              Manifesto Watch Dashboard
            </h1>
            <p className="lead" style={{ color: '#aaa', fontSize: '1.2rem' }}>
              Track government promises across 15 comprehensive categories
            </p>
          </div>

          {/* Stats Cards */}
          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <div 
                className="card text-center p-4"
                style={{
                  backgroundColor: '#1a1a1a',
                  border: '2px solid #FF4500',
                  borderRadius: '16px'
                }}
              >
                <i className="fas fa-check-circle" style={{ fontSize: '3rem', color: '#FF4500', marginBottom: '1rem' }}></i>
                <h2 style={{ color: '#fff', fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                  {overallStats.total}
                </h2>
                <p style={{ color: '#aaa', fontSize: '1rem', marginBottom: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Total Promises
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div 
                className="card text-center p-4"
                style={{
                  backgroundColor: '#1a1a1a',
                  border: '2px solid #4CAF50',
                  borderRadius: '16px'
                }}
              >
                <i className="fas fa-ruler" style={{ fontSize: '3rem', color: '#4CAF50', marginBottom: '1rem' }}></i>
                <h2 style={{ color: '#fff', fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                  {overallStats.measurablePercent}%
                </h2>
                <p style={{ color: '#aaa', fontSize: '1rem', marginBottom: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Measurable
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div 
                className="card text-center p-4"
                style={{
                  backgroundColor: '#1a1a1a',
                  border: '2px solid #2196F3',
                  borderRadius: '16px'
                }}
              >
                <i className="fas fa-dollar-sign" style={{ fontSize: '3rem', color: '#2196F3', marginBottom: '1rem' }}></i>
                <h2 style={{ color: '#fff', fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                  {overallStats.withBudgetPercent}%
                </h2>
                <p style={{ color: '#aaa', fontSize: '1rem', marginBottom: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  With Budget
                </p>
              </div>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="mb-5">
            <div 
              className="card p-4"
              style={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '16px'
              }}
            >
              <div className="row g-3 align-items-center">
                <div className="col-md-6">
                  <div className="input-group input-group-lg">
                    <span 
                      className="input-group-text"
                      style={{
                        backgroundColor: '#0d0d0d',
                        border: '1px solid #444',
                        color: '#aaa'
                      }}
                    >
                      <i className="fas fa-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search categories..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        backgroundColor: '#0d0d0d',
                        border: '1px solid #444',
                        color: '#fff',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex gap-2 flex-wrap">
                    <button
                      className={`btn ${selectedFilter === 'all' ? 'btn-primary' : 'btn-outline-light'}`}
                      onClick={() => setSelectedFilter('all')}
                      style={{ flex: 1, minWidth: '120px' }}
                    >
                      <i className="fas fa-filter me-2"></i>
                      All Categories
                    </button>
                    <button
                      className={`btn ${selectedFilter === 'measurable' ? 'btn-success' : 'btn-outline-light'}`}
                      onClick={() => setSelectedFilter('measurable')}
                      style={{ flex: 1, minWidth: '120px' }}
                    >
                      <i className="fas fa-ruler me-2"></i>
                      Measurable
                    </button>
                    <button
                      className={`btn ${selectedFilter === 'budget' ? 'btn-info' : 'btn-outline-light'}`}
                      onClick={() => setSelectedFilter('budget')}
                      style={{ flex: 1, minWidth: '120px' }}
                    >
                      <i className="fas fa-dollar-sign me-2"></i>
                      With Budget
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="mb-4">
            <h2 className="h4 mb-4" style={{ color: '#FF4500', fontWeight: '600' }}>
              <i className="fas fa-th-large me-2"></i>
              {filteredCategories.length} {filteredCategories.length === 1 ? 'Category' : 'Categories'}
              {searchQuery && <span style={{ color: '#aaa', fontWeight: '400' }}> matching "{searchQuery}"</span>}
            </h2>
          </div>

          {filteredCategories.length > 0 ? (
            <div className="row g-4">
              {filteredCategories.map((category) => (
                <div key={category.id} className="col-lg-4 col-md-6">
                  <CategoryCard category={category} />
                </div>
              ))}
            </div>
          ) : (
            <div 
              className="text-center p-5"
              style={{
                backgroundColor: '#1a1a1a',
                borderRadius: '16px',
                border: '1px dashed #444'
              }}
            >
              <i className="fas fa-search fa-3x mb-3" style={{ color: '#666' }}></i>
              <h3 style={{ color: '#aaa', marginBottom: '1rem' }}>No categories found</h3>
              <p style={{ color: '#666' }}>Try adjusting your search query</p>
              <button
                className="btn btn-outline-light mt-3"
                onClick={() => setSearchQuery('')}
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Footer Info */}
          <div className="text-center mt-5 pt-4" style={{ borderTop: '1px solid #333' }}>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              <i className="fas fa-info-circle me-2"></i>
              Data updated regularly from official government sources and manifestos
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

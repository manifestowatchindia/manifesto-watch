import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { categories } from '../../data/categories';
import { getAggregatedStats } from '../../lib/data';
import { CategoryCard } from '../../components/CategoryCard';
import { Promise } from '../../lib/types';
import { promiseService } from '../../services/promiseService';

export const BJP2024Tracker: React.FC = () => {
  const [promises, setPromises] = useState<Promise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch promises from API
  useEffect(() => {
    const loadPromises = async () => {
      try {
        setLoading(true);
        const data = await promiseService.getAllPromises();
        setPromises(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load promises:', err);
        setError('Failed to load promises. Please ensure the backend is running.');
      } finally {
        setLoading(false);
      }
    };

    loadPromises();
  }, []);
  
  // Calculate overall statistics
  const overallStats = useMemo(() => {
    return getAggregatedStats(promises);
  }, [promises]);

  if (loading) {
    return (
      <div style={{ backgroundColor: '#000', minHeight: '100vh', paddingTop: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p style={{ color: '#aaa', marginTop: '1rem' }}>Loading promises...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ backgroundColor: '#000', minHeight: '100vh', paddingTop: '2rem' }}>
        <div className="container">
          <div className="alert alert-danger" role="alert">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="BJP+ (NDA) 2024 Manifesto Tracker - Track Election Promises | Manifesto Watch"
        description="Track BJP+ and NDA Alliance 2024 election manifesto promises and their implementation progress (2024-2029). Monitor 15 key categories including infrastructure, health, education, agriculture, and more."
        canonicalUrl="/manifestos/central/2024/bjp/15pointsversion"
      />

      <div style={{ backgroundColor: '#000', minHeight: '100vh', paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className="container">
          {/* Breadcrumb Navigation */}
          <nav className="mb-4" style={{ fontSize: '0.9rem' }}>
            <Link to="/" style={{ color: '#2196F3', textDecoration: 'none' }}>
              <i className="fas fa-home me-2"></i>
              Home
            </Link>
            <span style={{ color: '#666', margin: '0 0.5rem' }}>/</span>
            <Link to="/manifestos/central" style={{ color: '#2196F3', textDecoration: 'none' }}>
              Central Manifestos
            </Link>
            <span style={{ color: '#666', margin: '0 0.5rem' }}>/</span>
            <span style={{ color: '#aaa' }}>BJP+ 2024 Tracker</span>
          </nav>

          {/* Header Section */}
          <div
            className="mb-5 p-5"
            style={{
              backgroundColor: '#1a1a1a',
              borderRadius: '20px',
              border: '2px solid #FF9933',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Decorative elements */}
            <div
              style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, #FF9933 0%, transparent 70%)',
                opacity: 0.1
              }}
            ></div>
            <div
              style={{
                position: 'absolute',
                bottom: '-50px',
                left: '-50px',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, #138808 0%, transparent 70%)',
                opacity: 0.1
              }}
            ></div>

            <div className="row align-items-center position-relative">
              <div className="col-lg-8">
                <div className="d-flex align-items-center mb-3">
                  <div
                    className="me-3"
                    style={{
                      width: '4px',
                      height: '60px',
                      background: 'linear-gradient(to bottom, #FF9933, #fff, #138808)'
                    }}
                  ></div>
                  <div>
                    <h1
                      style={{
                        color: '#fff',
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        marginBottom: '0.5rem'
                      }}
                    >
                      BJP+ (NDA Alliance) 2024 Tracker
                    </h1>
                    <p style={{ color: '#FF9933', fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                      Lok Sabha Elections 2024 • Current Government (2024-2029)
                    </p>
                    <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: 0 }}>
                      <i className="fas fa-users me-2"></i>
                      Tracking: BJP, JD(U), Shiv Sena, LJP & other NDA partners
                    </p>
                  </div>
                </div>
                <p style={{ color: '#aaa', fontSize: '1rem', lineHeight: '1.6', marginBottom: 0 }}>
                  Track the implementation progress of BJP+ (NDA Alliance) 2024 election manifesto promises across 15 major categories. 
                  Monitor commitments, timelines, measurable targets, and real-time status updates of government initiatives from the current ruling coalition.
                </p>
              </div>

              <div className="col-lg-4 mt-4 mt-lg-0">
                <div className="row g-3">
                  <div className="col-6">
                    <div
                      className="text-center p-3"
                      style={{
                        backgroundColor: '#0d0d0d',
                        borderRadius: '12px',
                        border: '2px solid #FF9933'
                      }}
                    >
                      <div style={{ color: '#FF9933', fontSize: '2rem', fontWeight: '700' }}>
                        {overallStats.totalPromises}
                      </div>
                      <div style={{ color: '#888', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                        Total Promises
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div
                      className="text-center p-3"
                      style={{
                        backgroundColor: '#0d0d0d',
                        borderRadius: '12px',
                        border: '2px solid #4CAF50'
                      }}
                    >
                      <div style={{ color: '#4CAF50', fontSize: '2rem', fontWeight: '700' }}>
                        {overallStats.measurablePercent}%
                      </div>
                      <div style={{ color: '#888', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                        Measurable
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div
                      className="text-center p-3"
                      style={{
                        backgroundColor: '#0d0d0d',
                        borderRadius: '12px',
                        border: '2px solid #2196F3'
                      }}
                    >
                      <div style={{ color: '#2196F3', fontSize: '2rem', fontWeight: '700' }}>
                        {overallStats.withBudgetPercent}%
                      </div>
                      <div style={{ color: '#888', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                        With Budget
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div
                      className="text-center p-3"
                      style={{
                        backgroundColor: '#0d0d0d',
                        borderRadius: '12px',
                        border: '2px solid #138808'
                      }}
                    >
                      <div style={{ color: '#fff', fontSize: '2rem', fontWeight: '700' }}>
                        15
                      </div>
                      <div style={{ color: '#888', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                        Categories
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Status Distribution Bar */}
          <div
            className="mb-5 p-4"
            style={{
              backgroundColor: '#1a1a1a',
              borderRadius: '12px',
              border: '1px solid #333'
            }}
          >
            <h5 style={{ color: '#fff', marginBottom: '1.5rem' }}>
              <i className="fas fa-chart-bar me-2" style={{ color: '#FF9933' }}></i>
              Overall Implementation Status
            </h5>
            <div className="row g-3 align-items-center">
              <div className="col-md-9">
                <div
                  style={{
                    height: '40px',
                    backgroundColor: '#0d0d0d',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    display: 'flex'
                  }}
                >
                  {overallStats.statusBreakdown.Delivered > 0 && (
                    <div
                      style={{
                        width: `${overallStats.statusBreakdown.Delivered}%`,
                        backgroundColor: '#4CAF50',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: '0.85rem',
                        fontWeight: '600'
                      }}
                      title={`Delivered: ${overallStats.statusBreakdown.Delivered}%`}
                    >
                      {overallStats.statusBreakdown.Delivered > 5 && `${overallStats.statusBreakdown.Delivered}%`}
                    </div>
                  )}
                  {overallStats.statusBreakdown['Under implementation'] > 0 && (
                    <div
                      style={{
                        width: `${overallStats.statusBreakdown['Under implementation']}%`,
                        backgroundColor: '#2196F3',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: '0.85rem',
                        fontWeight: '600'
                      }}
                      title={`Under Implementation: ${overallStats.statusBreakdown['Under implementation']}%`}
                    >
                      {overallStats.statusBreakdown['Under implementation'] > 5 && `${overallStats.statusBreakdown['Under implementation']}%`}
                    </div>
                  )}
                  {overallStats.statusBreakdown.Actioned > 0 && (
                    <div
                      style={{
                        width: `${overallStats.statusBreakdown.Actioned}%`,
                        backgroundColor: '#FF9800',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: '0.85rem',
                        fontWeight: '600'
                      }}
                      title={`Actioned: ${overallStats.statusBreakdown.Actioned}%`}
                    >
                      {overallStats.statusBreakdown.Actioned > 5 && `${overallStats.statusBreakdown.Actioned}%`}
                    </div>
                  )}
                  {overallStats.statusBreakdown.Announced > 0 && (
                    <div
                      style={{
                        width: `${overallStats.statusBreakdown.Announced}%`,
                        backgroundColor: '#9E9E9E',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: '0.85rem',
                        fontWeight: '600'
                      }}
                      title={`Announced: ${overallStats.statusBreakdown.Announced}%`}
                    >
                      {overallStats.statusBreakdown.Announced > 5 && `${overallStats.statusBreakdown.Announced}%`}
                    </div>
                  )}
                  {overallStats.statusBreakdown.Deferred > 0 && (
                    <div
                      style={{
                        width: `${overallStats.statusBreakdown.Deferred}%`,
                        backgroundColor: '#F44336',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: '0.85rem',
                        fontWeight: '600'
                      }}
                      title={`Deferred: ${overallStats.statusBreakdown.Deferred}%`}
                    >
                      {overallStats.statusBreakdown.Deferred > 5 && `${overallStats.statusBreakdown.Deferred}%`}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-3">
                <div className="d-flex flex-column gap-1" style={{ fontSize: '0.75rem' }}>
                  <div className="d-flex align-items-center">
                    <div
                      style={{
                        width: '12px',
                        height: '12px',
                        backgroundColor: '#4CAF50',
                        borderRadius: '2px',
                        marginRight: '6px'
                      }}
                    ></div>
                    <span style={{ color: '#aaa' }}>Delivered</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <div
                      style={{
                        width: '12px',
                        height: '12px',
                        backgroundColor: '#2196F3',
                        borderRadius: '2px',
                        marginRight: '6px'
                      }}
                    ></div>
                    <span style={{ color: '#aaa' }}>Under Implementation</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <div
                      style={{
                        width: '12px',
                        height: '12px',
                        backgroundColor: '#FF9800',
                        borderRadius: '2px',
                        marginRight: '6px'
                      }}
                    ></div>
                    <span style={{ color: '#aaa' }}>Actioned</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Categories Section Header */}
          <div className="mb-4">
            <h2 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
              <i className="fas fa-th-large me-2" style={{ color: '#FF9933' }}></i>
              15 Promise Categories
            </h2>
            <p style={{ color: '#aaa' }}>
              Click on any category to view detailed promises, progress tracking, and implementation status
            </p>
          </div>

          {/* Category Cards Grid */}
          <div className="row g-4">
            {categories.map((category) => (
              <div key={category.id} className="col-12 col-md-6 col-lg-4">
                <CategoryCard category={category} />
              </div>
            ))}
          </div>

          {/* Information Banner */}
          <div
            className="mt-5 p-4"
            style={{
              backgroundColor: '#1a1a1a',
              borderRadius: '12px',
              border: '1px solid #333'
            }}
          >
            <div className="row align-items-center">
              <div className="col-md-1 text-center">
                <i className="fas fa-info-circle fa-2x" style={{ color: '#2196F3' }}></i>
              </div>
              <div className="col-md-11">
                <h5 style={{ color: '#fff', marginBottom: '0.5rem' }}>About This Tracker</h5>
                <p style={{ color: '#aaa', marginBottom: 0, lineHeight: '1.6' }}>
                  This tracker monitors the implementation of promises made in the BJP+ (NDA Alliance) 2024 Lok Sabha election manifesto. 
                  The NDA coalition, led by BJP with partners including JD(U), Shiv Sena, LJP, and others, forms the current government (2024-2029). 
                  Data is collected from official government sources, press releases, parliamentary records, and verified news reports. 
                  Each promise is categorized, tracked with measurable metrics where available, and updated regularly to reflect current status. 
                  Our goal is to promote transparency and enable citizens to hold their elected representatives accountable.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 text-center">
            <Link
              to="/manifestos/central"
              className="btn btn-outline-light me-3"
              style={{ textDecoration: 'none' }}
            >
              <i className="fas fa-arrow-left me-2"></i>
              Back to Central Manifestos
            </Link>
            <Link
              to="/government-dashboard"
              className="btn btn-light"
              style={{ textDecoration: 'none' }}
            >
              <i className="fas fa-chart-line me-2"></i>
              View Full Dashboard
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

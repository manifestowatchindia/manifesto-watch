import React, { useState } from 'react';
import SEO from '../../components/SEO';
import './GovernmentDashboard.css';

interface Promise {
    id: number;
    category: string;
    title: string;
    description: string;
    targetDate: string;
    status: 'Completed' | 'In Progress' | 'Delayed' | 'Not Started';
    progress: number; // 0-100
    lastUpdate: string;
    details: string;
}

interface Update {
    id: number;
    date: string;
    category: string;
    title: string;
    description: string;
    impact: 'High' | 'Medium' | 'Low';
}

export const GovernmentDashboard: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedStatus, setSelectedStatus] = useState<string>('All');

    // Central Government Promises Data
    const promises: Promise[] = [
        {
            id: 1,
            category: 'Infrastructure',
            title: 'National Highway Development',
            description: 'Construction of 25,000 km of National Highways',
            targetDate: 'March 2025',
            status: 'In Progress',
            progress: 78,
            lastUpdate: 'October 2025',
            details: '19,500 km completed. Major projects include Delhi-Mumbai Expressway (85% complete), Bangalore-Chennai Expressway (72% complete).'
        },
        {
            id: 2,
            category: 'Healthcare',
            title: 'Ayushman Bharat Expansion',
            description: 'Coverage for 50 crore families under PM-JAY',
            targetDate: 'December 2024',
            status: 'Completed',
            progress: 100,
            lastUpdate: 'September 2025',
            details: 'Target achieved with 51.2 crore families enrolled. 5.8 crore hospital admissions processed.'
        },
        {
            id: 3,
            category: 'Education',
            title: 'Digital Education Infrastructure',
            description: 'Smart classrooms in 1.5 lakh government schools',
            targetDate: 'June 2025',
            status: 'In Progress',
            progress: 65,
            lastUpdate: 'October 2025',
            details: '97,500 schools equipped with smart classrooms. Focus on rural areas with 42% coverage achieved.'
        },
        {
            id: 4,
            category: 'Economy',
            title: 'Make in India Manufacturing Hubs',
            description: '12 new manufacturing clusters across India',
            targetDate: 'March 2026',
            status: 'In Progress',
            progress: 55,
            lastUpdate: 'September 2025',
            details: '7 clusters operational (Tamil Nadu, Gujarat, Maharashtra). 45,000+ jobs created so far.'
        },
        {
            id: 5,
            category: 'Environment',
            title: 'Renewable Energy Target',
            description: '500 GW renewable energy capacity',
            targetDate: 'December 2030',
            status: 'In Progress',
            progress: 42,
            lastUpdate: 'October 2025',
            details: '210 GW achieved. Major solar and wind projects in Rajasthan, Gujarat, and Karnataka.'
        },
        {
            id: 6,
            category: 'Agriculture',
            title: 'Farmers Income Doubling',
            description: 'Double farmers income through MSP and market access',
            targetDate: 'December 2025',
            status: 'In Progress',
            progress: 68,
            lastUpdate: 'September 2025',
            details: 'Average farmer income increased by 68% since 2019. MSP increased for 23 crops.'
        },
        {
            id: 7,
            category: 'Infrastructure',
            title: 'Bharatmala Pariyojana',
            description: 'Development of 83,677 km of highways',
            targetDate: 'March 2027',
            status: 'In Progress',
            progress: 52,
            lastUpdate: 'October 2025',
            details: '43,512 km completed. Economic corridors and coastal roads under development.'
        },
        {
            id: 8,
            category: 'Housing',
            title: 'PM Awas Yojana Urban',
            description: 'Housing for all in urban areas - 1 crore houses',
            targetDate: 'December 2024',
            status: 'Completed',
            progress: 100,
            lastUpdate: 'August 2025',
            details: '1.02 crore houses constructed and delivered. Focus on EWS and LIG categories.'
        },
        {
            id: 9,
            category: 'Digital India',
            title: 'BharatNet Rural Connectivity',
            description: 'Broadband connectivity to 6 lakh villages',
            targetDate: 'June 2025',
            status: 'Delayed',
            progress: 72,
            lastUpdate: 'September 2025',
            details: '4.32 lakh villages connected. Delay due to terrain challenges in North-East states.'
        },
        {
            id: 10,
            category: 'Healthcare',
            title: 'AIIMS Expansion',
            description: 'Establish 22 new AIIMS across India',
            targetDate: 'December 2025',
            status: 'In Progress',
            progress: 45,
            lastUpdate: 'October 2025',
            details: '10 AIIMS operational, 8 under construction, 4 in planning phase.'
        },
        {
            id: 11,
            category: 'Water',
            title: 'Jal Jeevan Mission',
            description: 'Tap water connection to all rural households',
            targetDate: 'December 2024',
            status: 'Completed',
            progress: 100,
            lastUpdate: 'July 2025',
            details: '19.4 crore households connected. 100% coverage achieved in 10 states.'
        },
        {
            id: 12,
            category: 'Economy',
            title: 'Startup India Initiative',
            description: 'Support for 50,000 startups with funding and mentorship',
            targetDate: 'March 2025',
            status: 'Completed',
            progress: 100,
            lastUpdate: 'August 2025',
            details: '52,000+ startups recognized. ₹85,000 crore investment facilitated. 45 unicorns created.'
        }
    ];

    // Latest Updates Data
    const latestUpdates: Update[] = [
        {
            id: 1,
            date: 'October 10, 2025',
            category: 'Infrastructure',
            title: 'Delhi-Mumbai Expressway Phase 3 Inaugurated',
            description: 'PM inaugurated the 350 km stretch connecting Jaipur to Vadodara, reducing travel time by 4 hours.',
            impact: 'High'
        },
        {
            id: 2,
            date: 'October 8, 2025',
            category: 'Healthcare',
            title: 'AIIMS Darbhanga Becomes Fully Operational',
            description: 'All departments now functional with 750-bed capacity. OPD services started for all specialties.',
            impact: 'High'
        },
        {
            id: 3,
            date: 'October 5, 2025',
            category: 'Digital India',
            title: '5 Lakh Villages Achieve Digital Literacy',
            description: 'Under Digital Saksharta Abhiyan, 5 lakh villages now have 60%+ digitally literate population.',
            impact: 'Medium'
        },
        {
            id: 4,
            date: 'October 3, 2025',
            category: 'Environment',
            title: 'Solar Energy Milestone: 150 GW Achieved',
            description: 'India surpasses 150 GW solar capacity, ahead of schedule. World\'s 3rd largest solar power producer.',
            impact: 'High'
        },
        {
            id: 5,
            date: 'October 1, 2025',
            category: 'Agriculture',
            title: 'Kisan Credit Card Scheme Expanded',
            description: '3 crore new KCC issued. Interest subvention extended to fisheries and animal husbandry.',
            impact: 'Medium'
        },
        {
            id: 6,
            date: 'September 28, 2025',
            category: 'Education',
            title: 'National Digital Library Crosses 1 Crore Users',
            description: 'NDL platform now has 1.2 crore registered users with access to 5 crore+ digital resources.',
            impact: 'Medium'
        },
        {
            id: 7,
            date: 'September 25, 2025',
            category: 'Housing',
            title: 'PM Awas Yojana Rural Phase 2 Announced',
            description: 'Government approves construction of 2 crore additional houses in rural areas by 2029.',
            impact: 'High'
        },
        {
            id: 8,
            date: 'September 22, 2025',
            category: 'Economy',
            title: 'Manufacturing Sector Growth Hits 8.2%',
            description: 'Q2 2025 data shows robust manufacturing growth driven by electronics and automobile sectors.',
            impact: 'High'
        }
    ];

    // Category statistics
    const categories = ['All', 'Infrastructure', 'Healthcare', 'Education', 'Economy', 'Environment', 'Agriculture', 'Housing', 'Digital India', 'Water'];
    const statuses = ['All', 'Completed', 'In Progress', 'Delayed', 'Not Started'];

    // Filter promises
    const filteredPromises = promises.filter(promise => {
        const categoryMatch = selectedCategory === 'All' || promise.category === selectedCategory;
        const statusMatch = selectedStatus === 'All' || promise.status === selectedStatus;
        return categoryMatch && statusMatch;
    });

    // Calculate overall statistics
    const totalPromises = promises.length;
    const completedPromises = promises.filter(p => p.status === 'Completed').length;
    const inProgressPromises = promises.filter(p => p.status === 'In Progress').length;
    const delayedPromises = promises.filter(p => p.status === 'Delayed').length;
    const overallProgress = Math.round(promises.reduce((sum, p) => sum + p.progress, 0) / totalPromises);

    // Get status color
    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'Completed': return '#28a745';
            case 'In Progress': return '#007bff';
            case 'Delayed': return '#ffc107';
            case 'Not Started': return '#6c757d';
            default: return '#6c757d';
        }
    };

    // Get progress color
    const getProgressColor = (progress: number): string => {
        if (progress >= 80) return '#28a745';
        if (progress >= 50) return '#007bff';
        if (progress >= 30) return '#ffc107';
        return '#dc3545';
    };

    // Get impact badge color
    const getImpactColor = (impact: string): string => {
        switch (impact) {
            case 'High': return 'danger';
            case 'Medium': return 'warning';
            case 'Low': return 'info';
            default: return 'secondary';
        }
    };

    return (
        <div className="government-dashboard-page">
            <SEO 
                title="Central Government Dashboard | Promise Tracker | Manifesto Watch"
                description="Track central government promises, work progress, and latest updates. Monitor completion status of infrastructure, healthcare, education, and economic initiatives with real-time data."
                keywords="government promises, promise tracker, government work, central government, progress tracking, accountability, manifesto tracking, government dashboard"
                canonicalUrl="https://www.manifestowatch.in/government-dashboard"
            />

            <div className="container-fluid dashboard-container">
                {/* Header Section */}
                <div className="dashboard-header">
                    <div className="row align-items-center">
                        <div className="col-lg-8">
                            <h1 className="dashboard-title">
                                <i className="fas fa-chart-line me-3"></i>
                                Central Government Dashboard
                            </h1>
                            <p className="dashboard-subtitle">
                                Track promises, monitor progress, and stay updated with the latest government initiatives
                            </p>
                        </div>
                        <div className="col-lg-4 text-lg-end">
                            <div className="last-updated">
                                <i className="fas fa-clock me-2"></i>
                                Last Updated: October 11, 2025
                            </div>
                        </div>
                    </div>
                </div>

                {/* Overall Statistics Cards */}
                <div className="row statistics-section mb-4">
                    <div className="col-lg-3 col-md-6 mb-3">
                        <div className="stat-card stat-card-primary">
                            <div className="stat-icon">
                                <i className="fas fa-tasks"></i>
                            </div>
                            <div className="stat-content">
                                <h3 className="stat-number">{totalPromises}</h3>
                                <p className="stat-label">Total Promises</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-3">
                        <div className="stat-card stat-card-success">
                            <div className="stat-icon">
                                <i className="fas fa-check-circle"></i>
                            </div>
                            <div className="stat-content">
                                <h3 className="stat-number">{completedPromises}</h3>
                                <p className="stat-label">Completed</p>
                                <span className="stat-percentage">{Math.round((completedPromises / totalPromises) * 100)}%</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-3">
                        <div className="stat-card stat-card-info">
                            <div className="stat-icon">
                                <i className="fas fa-spinner"></i>
                            </div>
                            <div className="stat-content">
                                <h3 className="stat-number">{inProgressPromises}</h3>
                                <p className="stat-label">In Progress</p>
                                <span className="stat-percentage">{Math.round((inProgressPromises / totalPromises) * 100)}%</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-3">
                        <div className="stat-card stat-card-warning">
                            <div className="stat-icon">
                                <i className="fas fa-exclamation-triangle"></i>
                            </div>
                            <div className="stat-content">
                                <h3 className="stat-number">{delayedPromises}</h3>
                                <p className="stat-label">Delayed</p>
                                <span className="stat-percentage">{Math.round((delayedPromises / totalPromises) * 100)}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Overall Progress Bar */}
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="overall-progress-card">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-white mb-0">
                                    <i className="fas fa-chart-bar me-2"></i>
                                    Overall Completion Progress
                                </h4>
                                <span className="overall-percentage">{overallProgress}%</span>
                            </div>
                            <div className="progress overall-progress-bar">
                                <div 
                                    className="progress-bar progress-bar-striped progress-bar-animated"
                                    role="progressbar"
                                    style={{ 
                                        width: `${overallProgress}%`,
                                        backgroundColor: getProgressColor(overallProgress)
                                    }}
                                    aria-valuenow={overallProgress}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                >
                                    {overallProgress}%
                                </div>
                            </div>
                            <p className="progress-note mt-2 mb-0 text-white-50">
                                Average completion across all {totalPromises} tracked promises and initiatives
                            </p>
                        </div>
                    </div>
                </div>

                {/* Filters Section */}
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="filters-card">
                            <div className="row align-items-center">
                                <div className="col-md-6 mb-3 mb-md-0">
                                    <label className="filter-label">
                                        <i className="fas fa-filter me-2"></i>
                                        Filter by Category
                                    </label>
                                    <select 
                                        className="form-select filter-select"
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                    >
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="filter-label">
                                        <i className="fas fa-flag me-2"></i>
                                        Filter by Status
                                    </label>
                                    <select 
                                        className="form-select filter-select"
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                    >
                                        {statuses.map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content: Promises and Updates */}
                <div className="row">
                    {/* Promises List (Left Column) */}
                    <div className="col-lg-8 mb-4">
                        <div className="promises-section">
                            <div className="section-header">
                                <h3 className="section-title">
                                    <i className="fas fa-list-check me-2"></i>
                                    Government Promises Tracker
                                </h3>
                                <span className="results-count">{filteredPromises.length} promises</span>
                            </div>

                            <div className="promises-list">
                                {filteredPromises.map(promise => (
                                    <div key={promise.id} className="promise-card">
                                        <div className="promise-header">
                                            <div className="promise-title-section">
                                                <span className="promise-category-badge">
                                                    {promise.category}
                                                </span>
                                                <h5 className="promise-title">{promise.title}</h5>
                                            </div>
                                            <span 
                                                className="promise-status-badge"
                                                style={{ backgroundColor: getStatusColor(promise.status) }}
                                            >
                                                {promise.status}
                                            </span>
                                        </div>

                                        <p className="promise-description">{promise.description}</p>

                                        <div className="promise-progress-section">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <span className="progress-label">Progress</span>
                                                <span className="progress-percentage" style={{ color: getProgressColor(promise.progress) }}>
                                                    {promise.progress}%
                                                </span>
                                            </div>
                                            <div className="progress promise-progress-bar">
                                                <div 
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    style={{ 
                                                        width: `${promise.progress}%`,
                                                        backgroundColor: getProgressColor(promise.progress)
                                                    }}
                                                    aria-valuenow={promise.progress}
                                                    aria-valuemin={0}
                                                    aria-valuemax={100}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="promise-details">
                                            <p className="promise-detail-text">
                                                <i className="fas fa-info-circle me-2"></i>
                                                {promise.details}
                                            </p>
                                        </div>

                                        <div className="promise-footer">
                                            <div className="promise-meta">
                                                <span className="meta-item">
                                                    <i className="fas fa-calendar-alt me-1"></i>
                                                    Target: {promise.targetDate}
                                                </span>
                                                <span className="meta-item">
                                                    <i className="fas fa-clock me-1"></i>
                                                    Updated: {promise.lastUpdate}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Latest Updates (Right Column) */}
                    <div className="col-lg-4 mb-4">
                        <div className="updates-section">
                            <div className="section-header">
                                <h3 className="section-title">
                                    <i className="fas fa-newspaper me-2"></i>
                                    Latest Updates
                                </h3>
                            </div>

                            <div className="updates-list">
                                {latestUpdates.map(update => (
                                    <div key={update.id} className="update-card">
                                        <div className="update-header">
                                            <span className="update-date">
                                                <i className="fas fa-calendar me-1"></i>
                                                {update.date}
                                            </span>
                                            <span className={`badge bg-${getImpactColor(update.impact)} impact-badge`}>
                                                {update.impact} Impact
                                            </span>
                                        </div>
                                        <span className="update-category-tag">{update.category}</span>
                                        <h6 className="update-title">{update.title}</h6>
                                        <p className="update-description">{update.description}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Info Box */}
                            <div className="info-box mt-4">
                                <div className="info-box-header">
                                    <i className="fas fa-lightbulb me-2"></i>
                                    About This Dashboard
                                </div>
                                <div className="info-box-content">
                                    <p>This dashboard tracks major promises and initiatives of the Central Government. Data is updated regularly based on official government sources and public reports.</p>
                                    <ul className="info-list">
                                        <li><strong>Completed:</strong> Promise fully delivered</li>
                                        <li><strong>In Progress:</strong> Work ongoing, on schedule</li>
                                        <li><strong>Delayed:</strong> Behind original timeline</li>
                                        <li><strong>Not Started:</strong> Yet to be initiated</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

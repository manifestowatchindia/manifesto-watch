import React, { useState, useEffect } from 'react';
import { newsCache } from '../../utils/newsCache';

interface NewsArticle {
    title: string;
    link: string;
    pubDate: string;
    source: string;
    contentSnippet?: string;
}

export const NewsUpdates: React.FC = () => {
    const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedSource, setSelectedSource] = useState<'all' | 'hindu' | 'indianexpress'>('all');

    useEffect(() => {
        fetchNews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const parseRSSFeed = (xmlText: string, source: string): NewsArticle[] => {
        try {
            // Check if the content is base64 encoded
            if (xmlText.startsWith('data:application/rss+xml')) {
                // Extract base64 data and decode it
                const base64Data = xmlText.split(',')[1];
                xmlText = atob(base64Data);
            }

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
            
            // Check for XML parsing errors
            const parseError = xmlDoc.querySelector('parsererror');
            if (parseError) {
                console.error('XML Parse Error:', parseError.textContent);
                return [];
            }
            
            // Try both RSS 2.0 (item) and Atom (entry) formats
            let items = xmlDoc.querySelectorAll('item');
            if (items.length === 0) {
                items = xmlDoc.querySelectorAll('entry');
            }
            
            console.log(`Found ${items.length} items in ${source} feed`);
            const articles: NewsArticle[] = [];

            items.forEach((item, index) => {
                if (index < 10) { // Limit to 10 articles
                    // Try different tag names for title
                    const title = item.querySelector('title')?.textContent || 'No title';
                    
                    // Try different tag names for link
                    let link = item.querySelector('link')?.textContent || 
                               item.querySelector('link')?.getAttribute('href') || '#';
                    
                    // Clean up link if needed
                    link = link.trim();
                    
                    // Try different tag names for date
                    const pubDate = item.querySelector('pubDate')?.textContent || 
                                  item.querySelector('published')?.textContent ||
                                  item.querySelector('updated')?.textContent ||
                                  new Date().toISOString();
                    
                    // Try different tag names for description
                    const description = item.querySelector('description')?.textContent || 
                                      item.querySelector('summary')?.textContent ||
                                      item.querySelector('content')?.textContent || '';
                    
                    articles.push({
                        title,
                        link,
                        pubDate,
                        source,
                        contentSnippet: description.replace(/<[^>]*>/g, '').substring(0, 150) // Remove HTML tags
                    });
                }
            });

            console.log(`Parsed ${articles.length} articles from ${source}`);
            return articles;
        } catch (error) {
            console.error('Error parsing RSS feed:', error);
            return [];
        }
    };

    const fetchNews = async (forceRefresh: boolean = false) => {
        setLoading(true);
        setError(null);

        try {
            // Check cache first (unless force refresh)
            if (!forceRefresh) {
                const cachedNews = newsCache.get('all_news');
                if (cachedNews && cachedNews.length > 0) {
                    setNewsArticles(cachedNews);
                    setLoading(false);
                    return;
                }
            }

            const articles: NewsArticle[] = [];
            
            // Try multiple CORS proxies in case one fails
            const CORS_PROXIES = [
                'https://api.allorigins.win/get?url=',
                'https://corsproxy.io/?',
            ];
            
            let proxyIndex = 0;
            const CORS_PROXY = CORS_PROXIES[proxyIndex];

            // The Hindu RSS Feed - Politics section
            try {
                const hinduURL = encodeURIComponent('https://www.thehindu.com/news/national/politics/feeder/default.rss');
                console.log('Fetching The Hindu RSS...');
                const hinduResponse = await fetch(CORS_PROXY + hinduURL);
                
                if (!hinduResponse.ok) {
                    throw new Error(`HTTP error! status: ${hinduResponse.status}`);
                }
                
                const hinduData = await hinduResponse.json();
                console.log('The Hindu data received:', hinduData);
                console.log('The Hindu contents preview:', hinduData.contents?.substring(0, 200));
                
                if (hinduData && hinduData.contents) {
                    const hinduArticles = parseRSSFeed(hinduData.contents, 'The Hindu');
                    console.log('Parsed Hindu articles:', hinduArticles);
                    articles.push(...hinduArticles);
                }
            } catch (err) {
                console.error('Error fetching The Hindu RSS:', err);
            }

            // Indian Express RSS Feed - India Politics
            try {
                const expressURL = encodeURIComponent('https://indianexpress.com/section/india/feed/');
                console.log('Fetching Indian Express RSS...');
                const expressResponse = await fetch(CORS_PROXY + expressURL);
                
                if (!expressResponse.ok) {
                    throw new Error(`HTTP error! status: ${expressResponse.status}`);
                }
                
                const expressData = await expressResponse.json();
                console.log('Indian Express data received:', expressData);
                
                if (expressData && expressData.contents) {
                    const expressArticles = parseRSSFeed(expressData.contents, 'Indian Express');
                    console.log('Parsed Express articles:', expressArticles.length);
                    articles.push(...expressArticles);
                }
            } catch (err) {
                console.error('Error fetching Indian Express RSS:', err);
            }

            console.log('Total articles fetched:', articles.length);

            if (articles.length === 0) {
                console.warn('No articles fetched from RSS feeds. Using sample data.');
                
                // Fallback sample data for demonstration
                const sampleArticles: NewsArticle[] = [
                    {
                        title: 'Election Commission announces dates for upcoming state elections',
                        link: 'https://www.thehindu.com',
                        pubDate: new Date().toISOString(),
                        source: 'The Hindu',
                        contentSnippet: 'The Election Commission has announced the schedule for upcoming assembly elections in several states...'
                    },
                    {
                        title: 'Major political parties release manifestos for 2026 elections',
                        link: 'https://indianexpress.com',
                        pubDate: new Date(Date.now() - 3600000).toISOString(),
                        source: 'Indian Express',
                        contentSnippet: 'Political parties across the country have started releasing their manifestos ahead of the 2026 state elections...'
                    },
                    {
                        title: 'Parliament discusses key bills on electoral reforms',
                        link: 'https://www.thehindu.com',
                        pubDate: new Date(Date.now() - 7200000).toISOString(),
                        source: 'The Hindu',
                        contentSnippet: 'The Parliament is in session to discuss crucial electoral reform bills that could change the voting process...'
                    },
                    {
                        title: 'Political alliances form ahead of state polls',
                        link: 'https://indianexpress.com',
                        pubDate: new Date(Date.now() - 10800000).toISOString(),
                        source: 'Indian Express',
                        contentSnippet: 'Several political parties are forming alliances as they prepare for the upcoming state assembly elections...'
                    }
                ];
                
                setNewsArticles(sampleArticles);
                setError('Note: Showing sample news. RSS feeds may be temporarily unavailable. Click "Refresh News" to try again.');
            } else {
                // Sort by date (newest first)
                articles.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
                setNewsArticles(articles);
                
                // Cache the results
                newsCache.set('all_news', articles);
            }
        } catch (err) {
            console.error('Error fetching news:', err);
            setError('Failed to load news. Please check your internet connection.');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours} hours ago`;
        if (diffInHours < 48) return 'Yesterday';
        
        return date.toLocaleDateString('en-IN', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
        });
    };

    const filteredArticles = selectedSource === 'all' 
        ? newsArticles 
        : newsArticles.filter(article => 
            selectedSource === 'hindu' 
                ? article.source === 'The Hindu' 
                : article.source === 'Indian Express'
          );

    return (
        <div className="news-updates-page">
            {/* Hero Section */}
            <div className="news-hero-section">
                <div className="container">
                    <h1 className="news-hero-title">News & Updates</h1>
                    <p className="news-hero-subtitle">
                        Stay informed with the latest political news from India's most trusted sources
                    </p>
                </div>
            </div>

            {/* Filter Section */}
            <div className="container mt-5">
                <div className="news-filter-section">
                    <h5 className="mb-3">Filter by Source:</h5>
                    <div className="btn-group" role="group">
                        <button 
                            className={`btn ${selectedSource === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setSelectedSource('all')}
                        >
                            All Sources
                        </button>
                        <button 
                            className={`btn ${selectedSource === 'hindu' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setSelectedSource('hindu')}
                        >
                            The Hindu
                        </button>
                        <button 
                            className={`btn ${selectedSource === 'indianexpress' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setSelectedSource('indianexpress')}
                        >
                            Indian Express
                        </button>
                    </div>
                </div>

                {/* News Articles Grid */}
                <div className="row mt-5">
                    {loading ? (
                        <div className="col-12 text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="mt-3">Fetching latest news...</p>
                        </div>
                    ) : error ? (
                        <div className="col-12">
                            <div className="alert alert-danger" role="alert">
                                <i className="fas fa-exclamation-triangle me-2"></i>
                                {error}
                                <button 
                                    className="btn btn-sm btn-outline-danger ms-3"
                                    onClick={() => fetchNews(true)}
                                >
                                    Retry
                                </button>
                            </div>
                        </div>
                    ) : filteredArticles.length === 0 ? (
                        <div className="col-12 text-center py-5">
                            <i className="fas fa-newspaper fa-3x text-muted mb-3"></i>
                            <p className="text-muted">No news articles available for this filter.</p>
                        </div>
                    ) : (
                        filteredArticles.map((article, index) => (
                            <div key={index} className="col-md-6 col-lg-4 mb-4">
                                <div className="news-card">
                                    <div className="news-card-header">
                                        <span className={`news-source-badge ${article.source === 'The Hindu' ? 'badge-hindu' : 'badge-express'}`}>
                                            {article.source}
                                        </span>
                                        <span className="news-date">
                                            <i className="fas fa-clock me-1"></i>
                                            {formatDate(article.pubDate)}
                                        </span>
                                    </div>
                                    <h5 className="news-card-title">{article.title}</h5>
                                    {article.contentSnippet && (
                                        <p className="news-card-snippet">
                                            {article.contentSnippet.substring(0, 120)}...
                                        </p>
                                    )}
                                    <a 
                                        href={article.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="news-read-more"
                                    >
                                        Read Full Article 
                                        <i className="fas fa-external-link-alt ms-2"></i>
                                    </a>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Refresh Button */}
                {!loading && !error && (
                    <div className="text-center mt-4 mb-5">
                        <button 
                            className="btn btn-outline-primary"
                            onClick={() => fetchNews(true)}
                        >
                            <i className="fas fa-sync-alt me-2"></i>
                            Refresh News
                        </button>
                    </div>
                )}

                {/* Disclaimer */}
                <div className="news-disclaimer mt-5 mb-4">
                    <p className="text-muted small text-center">
                        <i className="fas fa-info-circle me-2"></i>
                        News headlines sourced from The Hindu and Indian Express. Click "Read Full Article" to view complete stories on their respective websites.
                        Manifesto Watch does not own or claim copyright over these news articles.
                    </p>
                </div>
            </div>
        </div>
    );
};

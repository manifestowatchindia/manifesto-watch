import React, { useState, useEffect } from 'react';
import { CacheManager } from '../services/api/cache-manager';

const CacheManagerShowcase: React.FC = () => {
  const [cacheManager] = useState(() => new CacheManager());
  const [stats, setStats] = useState(cacheManager.getStats());
  const [cacheKeys, setCacheKeys] = useState<string[]>([]);
  const [testKey, setTestKey] = useState('test-key');
  const [testValue, setTestValue] = useState('Hello, Cache!');
  const [testTTL, setTestTTL] = useState('300000'); // 5 minutes
  const [retrievedValue, setRetrievedValue] = useState<any>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      cacheManager.stopPeriodicCleanup();
      cacheManager.clear();
    };
  }, [cacheManager]);

  const updateDisplay = () => {
    setStats(cacheManager.getStats());
    setCacheKeys(cacheManager.getKeys());
  };

  const handleSet = () => {
    try {
      const ttl = parseInt(testTTL);
      cacheManager.set(testKey, testValue, ttl);
      setMessage(`✅ Set "${testKey}" with ${ttl}ms TTL`);
      updateDisplay();
    } catch (error) {
      setMessage(`❌ Error: ${error}`);
    }
  };

  const handleGet = () => {
    const value = cacheManager.get(testKey);
    setRetrievedValue(value);
    if (value !== null) {
      setMessage(`✅ Retrieved: "${value}"`);
    } else {
      setMessage(`❌ Key "${testKey}" not found or expired`);
    }
    updateDisplay();
  };

  const handleDelete = () => {
    const deleted = cacheManager.delete(testKey);
    if (deleted) {
      setMessage(`✅ Deleted "${testKey}"`);
    } else {
      setMessage(`❌ Key "${testKey}" not found`);
    }
    setRetrievedValue(null);
    updateDisplay();
  };

  const handleClearExpired = () => {
    const count = cacheManager.clearExpired();
    setMessage(`🧹 Removed ${count} expired entries`);
    updateDisplay();
  };

  const handleClear = () => {
    cacheManager.clear();
    setMessage('🗑️ Cache cleared');
    setRetrievedValue(null);
    updateDisplay();
  };

  const handleResetStats = () => {
    cacheManager.resetStats();
    setMessage('📊 Statistics reset');
    updateDisplay();
  };

  const handleLoadDemo = () => {
    // Load demo data
    cacheManager.set('user:1', { id: 1, name: 'Alice' }, 60000);
    cacheManager.set('user:2', { id: 2, name: 'Bob' }, 120000);
    cacheManager.set('api:promises', [{ id: 1 }, { id: 2 }], 300000);
    cacheManager.set('config', { theme: 'light', lang: 'en' }, 600000);
    cacheManager.set('temp-data', 'expires soon', 5000);
    
    // Simulate some cache hits/misses
    cacheManager.get('user:1');
    cacheManager.get('user:2');
    cacheManager.get('non-existent');
    
    setMessage('📦 Demo data loaded');
    updateDisplay();
  };

  const sizeInBytes = cacheManager.getSizeInBytes();
  const sizeInKB = (sizeInBytes / 1024).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🗄️ CacheManager Service
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Centralized caching service with TTL support, automatic expiration,
            and comprehensive statistics tracking.
          </p>
        </div>

        {/* Live Statistics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            📊 Live Cache Statistics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">{stats.size}</div>
              <div className="text-sm text-gray-600 mt-1">Entries</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-green-600">{stats.hits}</div>
              <div className="text-sm text-gray-600 mt-1">Hits</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-orange-600">{stats.misses}</div>
              <div className="text-sm text-gray-600 mt-1">Misses</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-red-600">{stats.expired}</div>
              <div className="text-sm text-gray-600 mt-1">Expired</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-purple-600">{stats.hitRate}%</div>
              <div className="text-sm text-gray-600 mt-1">Hit Rate</div>
            </div>
            <div className="bg-indigo-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-indigo-600">{sizeInKB}</div>
              <div className="text-sm text-gray-600 mt-1">KB</div>
            </div>
          </div>

          {/* Hit Rate Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Cache Hit Rate</span>
              <span>{stats.hitRate}% (Target: 70%+)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${
                  stats.hitRate >= 70
                    ? 'bg-green-500'
                    : stats.hitRate >= 50
                    ? 'bg-orange-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${Math.min(stats.hitRate, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Interactive Demo */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            🎮 Interactive Demo
          </h2>

          {/* Message Display */}
          {message && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-900">
              {message}
            </div>
          )}

          {/* Input Form */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cache Key
              </label>
              <input
                type="text"
                value={testKey}
                onChange={(e) => setTestKey(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., user:123"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Value
              </label>
              <input
                type="text"
                value={testValue}
                onChange={(e) => setTestValue(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Any value"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                TTL (milliseconds)
              </label>
              <input
                type="number"
                value={testTTL}
                onChange={(e) => setTestTTL(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="300000"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <button
              onClick={handleSet}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              💾 Set
            </button>
            <button
              onClick={handleGet}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              🔍 Get
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              🗑️ Delete
            </button>
            <button
              onClick={handleLoadDemo}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              📦 Load Demo
            </button>
          </div>

          {/* Utility Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <button
              onClick={handleClearExpired}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              🧹 Clear Expired
            </button>
            <button
              onClick={handleResetStats}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              📊 Reset Stats
            </button>
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              🗑️ Clear All
            </button>
          </div>

          {/* Retrieved Value Display */}
          {retrievedValue !== null && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="text-sm font-medium text-gray-700 mb-1">
                Retrieved Value:
              </div>
              <pre className="text-sm text-green-900 font-mono">
                {JSON.stringify(retrievedValue, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Cache Contents */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            📋 Cache Contents ({cacheKeys.length} entries)
          </h2>
          {cacheKeys.length > 0 ? (
            <div className="space-y-2">
              {cacheKeys.map((key) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <code className="text-sm text-gray-800">{key}</code>
                  <button
                    onClick={() => {
                      setTestKey(key);
                      handleGet();
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No entries in cache. Use "Load Demo" to add sample data.
            </div>
          )}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              ✨ Key Features
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700">
                  <strong>TTL Support:</strong> Automatic expiration with configurable time-to-live
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700">
                  <strong>Type Safety:</strong> Full TypeScript generics support
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700">
                  <strong>Statistics:</strong> Track hits, misses, hit rate, and size
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700">
                  <strong>Auto Cleanup:</strong> Periodic removal of expired entries (every 5 min)
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700">
                  <strong>Singleton Pattern:</strong> Single instance across the app
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700">
                  <strong>Size Monitoring:</strong> Track cache size in bytes
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              📖 Usage Example
            </h2>
            <pre className="text-sm bg-gray-50 p-4 rounded-lg overflow-x-auto border border-gray-200">
              <code className="text-gray-800">{`import cacheManager from 'services/api';

// Set with default TTL (5 minutes)
cacheManager.set('user:123', userData);

// Set with custom TTL (1 hour)
cacheManager.set(
  'config',
  configData,
  60 * 60 * 1000
);

// Get cached data
const user = cacheManager.get('user:123');

// Check if key exists
if (cacheManager.has('user:123')) {
  // Cache hit
}

// Get statistics
const stats = cacheManager.getStats();
console.log(\`Hit rate: \${stats.hitRate}%\`);

// Clear expired entries
cacheManager.clearExpired();`}</code>
            </pre>
          </div>
        </div>

        {/* API Reference */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            📚 API Reference
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Method
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Parameters
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Returns
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm font-mono text-blue-600">get&lt;T&gt;</td>
                  <td className="px-4 py-3 text-sm text-gray-600">key: string</td>
                  <td className="px-4 py-3 text-sm text-gray-600">T | null</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Get cached data</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm font-mono text-blue-600">set&lt;T&gt;</td>
                  <td className="px-4 py-3 text-sm text-gray-600">key, data, ttl?</td>
                  <td className="px-4 py-3 text-sm text-gray-600">void</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Store data with TTL</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-mono text-blue-600">has</td>
                  <td className="px-4 py-3 text-sm text-gray-600">key: string</td>
                  <td className="px-4 py-3 text-sm text-gray-600">boolean</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Check if key exists</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm font-mono text-blue-600">delete</td>
                  <td className="px-4 py-3 text-sm text-gray-600">key: string</td>
                  <td className="px-4 py-3 text-sm text-gray-600">boolean</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Delete entry</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-mono text-blue-600">clear</td>
                  <td className="px-4 py-3 text-sm text-gray-600">-</td>
                  <td className="px-4 py-3 text-sm text-gray-600">void</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Clear all entries</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm font-mono text-blue-600">clearExpired</td>
                  <td className="px-4 py-3 text-sm text-gray-600">-</td>
                  <td className="px-4 py-3 text-sm text-gray-600">number</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Remove expired entries</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-mono text-blue-600">getStats</td>
                  <td className="px-4 py-3 text-sm text-gray-600">-</td>
                  <td className="px-4 py-3 text-sm text-gray-600">CacheStats</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Get cache statistics</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm font-mono text-blue-600">resetStats</td>
                  <td className="px-4 py-3 text-sm text-gray-600">-</td>
                  <td className="px-4 py-3 text-sm text-gray-600">void</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Reset statistics</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-mono text-blue-600">getKeys</td>
                  <td className="px-4 py-3 text-sm text-gray-600">-</td>
                  <td className="px-4 py-3 text-sm text-gray-600">string[]</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Get all cache keys</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm font-mono text-blue-600">getSizeInBytes</td>
                  <td className="px-4 py-3 text-sm text-gray-600">-</td>
                  <td className="px-4 py-3 text-sm text-gray-600">number</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Get cache size</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Tips */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            💡 Performance Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <span className="text-2xl mr-3">🎯</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Target 70%+ Hit Rate</h3>
                <p className="text-sm text-gray-600">
                  Good hit rate indicates effective caching strategy
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3">⏱️</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Tune TTL Values</h3>
                <p className="text-sm text-gray-600">
                  Balance freshness vs. cache efficiency per endpoint
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3">🧹</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Auto Cleanup</h3>
                <p className="text-sm text-gray-600">
                  Runs every 5 minutes to remove expired entries
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3">📊</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Monitor Size</h3>
                <p className="text-sm text-gray-600">
                  Keep cache size reasonable to avoid memory issues
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CacheManagerShowcase;

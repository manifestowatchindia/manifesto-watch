# Quick Reference - Adding More News Sources

## 📰 How to Add More RSS Feeds

Want to add NDTV, Times of India, or other sources? Here's how:

### Step 1: Find RSS Feed URL

Popular Indian News RSS Feeds:
- **NDTV Politics**: `https://feeds.feedburner.com/ndtvnews-india-news`
- **Times of India**: `https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms`
- **Scroll.in**: `https://scroll.in/feeds/articles.rss`
- **The Wire**: `https://thewire.in/feed`

### Step 2: Update NewsUpdates.tsx

Add this code in the `fetchNews` function after the Indian Express section:

```typescript
// NDTV RSS Feed
try {
    const ndtvURL = encodeURIComponent('https://feeds.feedburner.com/ndtvnews-india-news');
    const ndtvFeed = await parser.parseURL(CORS_PROXY + ndtvURL);
    const ndtvArticles = ndtvFeed.items.slice(0, 10).map(item => ({
        title: item.title || 'No title',
        link: item.link || '#',
        pubDate: item.pubDate || new Date().toISOString(),
        source: 'NDTV',
        contentSnippet: item.contentSnippet || item.content?.substring(0, 150)
    }));
    articles.push(...ndtvArticles);
} catch (err) {
    console.error('Error fetching NDTV RSS:', err);
}
```

### Step 3: Add Filter Button

In the filter section, add:

```tsx
<button 
    className={`btn ${selectedSource === 'ndtv' ? 'btn-primary' : 'btn-outline-primary'}`}
    onClick={() => setSelectedSource('ndtv')}
>
    NDTV
</button>
```

### Step 4: Update TypeScript Type

Change the `selectedSource` state type:

```typescript
const [selectedSource, setSelectedSource] = useState<'all' | 'hindu' | 'indianexpress' | 'ndtv'>('all');
```

### Step 5: Update Filter Logic

In the `filteredArticles` logic:

```typescript
const filteredArticles = selectedSource === 'all' 
    ? newsArticles 
    : newsArticles.filter(article => {
        if (selectedSource === 'hindu') return article.source === 'The Hindu';
        if (selectedSource === 'indianexpress') return article.source === 'Indian Express';
        if (selectedSource === 'ndtv') return article.source === 'NDTV';
        return true;
    });
```

### Step 6: Add Badge Color in App.css

```css
.badge-ndtv {
  background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
  color: white;
}
```

### Step 7: Update Badge Logic

```tsx
<span className={`news-source-badge ${
    article.source === 'The Hindu' ? 'badge-hindu' : 
    article.source === 'Indian Express' ? 'badge-express' :
    article.source === 'NDTV' ? 'badge-ndtv' :
    'badge-default'
}`}>
    {article.source}
</span>
```

---

## 🎨 Color Scheme for Popular Sources

```css
/* The Hindu - Blue */
.badge-hindu {
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
}

/* Indian Express - Purple */
.badge-express {
  background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%);
}

/* NDTV - Red */
.badge-ndtv {
  background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
}

/* Times of India - Orange */
.badge-toi {
  background: linear-gradient(135deg, #ea580c 0%, #fb923c 100%);
}

/* The Wire - Green */
.badge-wire {
  background: linear-gradient(135deg, #059669 0%, #34d399 100%);
}

/* Scroll.in - Cyan */
.badge-scroll {
  background: linear-gradient(135deg, #0891b2 0%, #22d3ee 100%);
}
```

---

## ⚙️ Adjusting Cache Duration

In `src/utils/newsCache.ts`, change this line:

```typescript
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes
```

Examples:
- **5 minutes**: `5 * 60 * 1000`
- **15 minutes**: `15 * 60 * 1000`
- **30 minutes**: `30 * 60 * 1000`
- **1 hour**: `60 * 60 * 1000`

---

## 🔧 Troubleshooting

### RSS Feed Not Loading?
1. Check if the RSS URL is correct
2. Try the URL directly in browser
3. Some feeds might be region-locked
4. CORS proxy might be down (try alternative: `https://corsproxy.io/?`)

### Alternative CORS Proxies:
```typescript
// Option 1 (current)
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

// Option 2
const CORS_PROXY = 'https://corsproxy.io/?';

// Option 3
const CORS_PROXY = 'https://api.codetabs.com/v1/proxy?quest=';
```

### Cache Not Working?
- Check browser console for errors
- Clear localStorage: `localStorage.clear()`
- Check if localStorage is enabled in browser

---

## 📱 Testing New Sources

1. Add the source code
2. Open browser console (F12)
3. Look for any errors in the "Console" tab
4. Check "Network" tab for RSS feed requests
5. Verify articles appear on the page
6. Test filtering by that source

---

## 🚀 Pro Tips

1. **Limit Articles Per Source**: Keep `slice(0, 10)` or adjust as needed
2. **Error Handling**: Always wrap in try-catch
3. **Loading State**: Test with slow internet
4. **Mobile Testing**: Check on different screen sizes
5. **Cache Strategy**: Balance between freshness and performance

---

Happy Coding! 🎉

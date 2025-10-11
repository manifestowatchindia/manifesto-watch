# Image Requirements - Manifesto Watch

## 🖼️ Required Images for SEO & Design

### Social Media Images (High Priority for SEO)

#### 1. Open Graph Image
- **Filename**: `og-image.jpg`
- **Location**: `public/og-image.jpg`
- **Dimensions**: 1200 x 630 pixels
- **Format**: JPG (optimized for web)
- **Purpose**: Facebook, LinkedIn sharing preview
- **Design Guidelines**:
  - Include Manifesto Watch logo
  - Add tagline: "Track Political Manifestos & Promises in India"
  - Use brand colors: Orange (#FF4500) and Black (#000000)
  - Keep text large and readable
  - Center important content (safe zone: 1200 x 600)
  - Test preview at: https://developers.facebook.com/tools/debug/

#### 2. Twitter Card Image
- **Filename**: `twitter-card.jpg`
- **Location**: `public/twitter-card.jpg`
- **Dimensions**: 1200 x 628 pixels
- **Format**: JPG (optimized for web)
- **Purpose**: Twitter sharing preview
- **Design Guidelines**:
  - Similar to OG image
  - Slightly taller aspect ratio
  - Keep text within 1200 x 600 safe area
  - Test preview at: https://cards-dev.twitter.com/validator

#### 3. Logo (High Resolution)
- **Filename**: `logo.png`
- **Location**: `public/logo.png`
- **Dimensions**: 512 x 512 pixels (square)
- **Format**: PNG with transparent background
- **Purpose**: Schema.org structured data, general branding
- **Design Guidelines**:
  - High quality, crisp edges
  - Transparent background
  - Works on both light and dark backgrounds
  - Simple, recognizable design

---

## 🏞️ Election Card Images (Medium Priority)

These images will enhance the Upcoming Elections carousel on the homepage.

#### Required Election Images (8 total)

1. **Assam Election**
   - **Filename**: `assam-election.jpg`
   - **Location**: `public/static/images/assam-election.jpg`
   - **Dimensions**: 1200 x 800 pixels
   - **Suggestions**: 
     - Assam landscape (tea gardens, Brahmaputra river)
     - Or: State map silhouette
     - Or: Generic democracy/voting imagery

2. **Kerala Election**
   - **Filename**: `kerala-election.jpg`
   - **Location**: `public/static/images/kerala-election.jpg`
   - **Dimensions**: 1200 x 800 pixels
   - **Suggestions**: Backwaters, coconut trees, or state map

3. **Tamil Nadu Election**
   - **Filename**: `tamilnadu-election.jpg`
   - **Location**: `public/static/images/tamilnadu-election.jpg`
   - **Dimensions**: 1200 x 800 pixels
   - **Suggestions**: Temples, Marina Beach, or state map

4. **West Bengal Election**
   - **Filename**: `westbengal-election.jpg`
   - **Location**: `public/static/images/westbengal-election.jpg`
   - **Dimensions**: 1200 x 800 pixels
   - **Suggestions**: Victoria Memorial, Howrah Bridge, or state map

5. **Uttar Pradesh Election**
   - **Filename**: `uttarpradesh-election.jpg`
   - **Location**: `public/static/images/uttarpradesh-election.jpg`
   - **Dimensions**: 1200 x 800 pixels
   - **Suggestions**: Taj Mahal, Ganga, or state map

6. **Gujarat Election**
   - **Filename**: `gujarat-election.jpg`
   - **Location**: `public/static/images/gujarat-election.jpg`
   - **Dimensions**: 1200 x 800 pixels
   - **Suggestions**: Sabarmati Ashram, Rann of Kutch, or state map

7. **Punjab Election**
   - **Filename**: `punjab-election.jpg`
   - **Location**: `public/static/images/punjab-election.jpg`
   - **Dimensions**: 1200 x 800 pixels
   - **Suggestions**: Golden Temple, wheat fields, or state map

8. **Goa Election**
   - **Filename**: `goa-election.jpg`
   - **Location**: `public/static/images/goa-election.jpg`
   - **Dimensions**: 1200 x 800 pixels
   - **Suggestions**: Beaches, churches, or state map

**General Design Guidelines for Election Cards**:
- Add subtle dark overlay (rgba(0, 0, 0, 0.3))
- Ensure text readability
- Use high-quality, copyright-free images
- Keep file size under 300KB each
- Use JPG format for photos

---

## 🌟 Hero Section Image (Lower Priority)

#### Homepage Hero Background
- **Filename**: `democracy_v2.jpg`
- **Location**: `public/static/images/democracy_v2.jpg`
- **Dimensions**: 1920 x 1080 pixels (Full HD)
- **Format**: JPG (optimized for web)
- **Purpose**: Homepage hero section background
- **Design Guidelines**:
  - Abstract or symbolic representation of democracy
  - Not too busy (text needs to be readable on top)
  - Darker tones or add overlay for text contrast
  - Suggestions:
    * Indian Parliament building (subtle)
    * Voting hands
    * Abstract democratic symbols
    * Indian flag colors (abstract)
    * People in democracy theme

---

## 📸 Where to Find Copyright-Free Images

### Recommended Stock Photo Sites

1. **Unsplash** (https://unsplash.com/)
   - Completely free, high quality
   - Search: "india parliament", "voting", "democracy", "india states"

2. **Pexels** (https://www.pexels.com/)
   - Free stock photos
   - Good for state-specific images

3. **Pixabay** (https://pixabay.com/)
   - Free images and vectors
   - Good for maps and symbols

4. **Wikimedia Commons** (https://commons.wikimedia.org/)
   - Free images with proper attribution
   - Great for landmarks, state maps

### Design Tools (If Creating Custom Images)

1. **Canva** (https://www.canva.com/)
   - Easy drag-and-drop design
   - Templates for social media images
   - Free tier available

2. **Figma** (https://www.figma.com/)
   - Professional design tool
   - Free for personal use

3. **GIMP** (https://www.gimp.org/)
   - Free Photoshop alternative
   - Full-featured image editor

---

## ✅ Image Optimization Checklist

Before adding images to the project:

- [ ] Resize to exact dimensions listed above
- [ ] Optimize file size (use tools like TinyPNG, ImageOptim)
- [ ] Convert to WebP for better performance (optional but recommended)
- [ ] Test on both desktop and mobile
- [ ] Verify copyright/license
- [ ] Add proper attribution if required
- [ ] Use descriptive filenames (for SEO)

---

## 🔧 How to Add Images

### For Social Media Images (OG/Twitter/Logo):

1. Place files in `public/` folder:
   ```
   manifesto-watch/
   └── public/
       ├── og-image.jpg          ← Add this
       ├── twitter-card.jpg      ← Add this
       ├── logo.png              ← Add this
       ├── index.html
       └── ...
   ```

2. No code changes needed - already configured in:
   - `public/index.html` (base HTML)
   - `src/components/SEO.tsx` (React Helmet)

3. Test after deployment:
   - Facebook: https://developers.facebook.com/tools/debug/
   - Twitter: https://cards-dev.twitter.com/validator

### For Election Card Images:

1. Place files in `public/static/images/`:
   ```
   manifesto-watch/
   └── public/
       └── static/
           └── images/
               ├── assam-election.jpg          ← Add this
               ├── kerala-election.jpg         ← Add this
               ├── tamilnadu-election.jpg      ← Add this
               ├── westbengal-election.jpg     ← Add this
               ├── uttarpradesh-election.jpg   ← Add this
               ├── gujarat-election.jpg        ← Add this
               ├── punjab-election.jpg         ← Add this
               └── goa-election.jpg            ← Add this
   ```

2. Update `src/layouts/Homepage/UpcomingElections.tsx`:
   ```typescript
   const elections = [
     {
       state: 'Assam',
       date: 'March 2026',
       image: '/static/images/assam-election.jpg'  // Add this line
     },
     // ... repeat for other states
   ];
   ```

3. Update the carousel card to display images:
   ```tsx
   <div 
     className="election-card" 
     style={{
       backgroundImage: `url(${election.image})`,
       backgroundSize: 'cover',
       backgroundPosition: 'center'
     }}
   >
   ```

### For Hero Background Image:

1. Place file in `public/static/images/`:
   ```
   manifesto-watch/
   └── public/
       └── static/
           └── images/
               └── democracy_v2.jpg    ← Add this
   ```

2. Update `src/App.css` (search for `.hero-section`):
   ```css
   .hero-section {
     background-image: url('/static/images/democracy_v2.jpg');
     /* ... rest of the styles */
   }
   ```

---

## 📏 Quick Reference Table

| Image | Dimensions | Format | Priority | Location |
|-------|-----------|--------|----------|----------|
| OG Image | 1200x630 | JPG | HIGH ⚡ | `public/og-image.jpg` |
| Twitter Card | 1200x628 | JPG | HIGH ⚡ | `public/twitter-card.jpg` |
| Logo | 512x512 | PNG | HIGH ⚡ | `public/logo.png` |
| Election Cards (8) | 1200x800 | JPG | MEDIUM | `public/static/images/*.jpg` |
| Hero Background | 1920x1080 | JPG | LOW | `public/static/images/democracy_v2.jpg` |

---

## 🎨 Brand Colors Reference

Use these colors in all visual designs:

- **Primary Orange**: `#FF4500` (rgb(255, 69, 0))
- **Primary Black**: `#000000` (rgb(0, 0, 0))
- **Text White**: `#FFFFFF` (rgb(255, 255, 255))
- **Light Gray**: `#F8F9FA` (rgb(248, 249, 250))

---

## 💡 Pro Tips

1. **Social Media Images**:
   - Keep most important content in center 1200x600 area
   - Test on both dark and light backgrounds
   - Make sure text is readable at thumbnail size
   - Include your logo but don't make it too dominant

2. **Election Cards**:
   - Use consistent styling across all 8 cards
   - Dark overlay helps text readability
   - State-specific imagery makes it more engaging
   - Consider using illustrated state maps for consistency

3. **Hero Background**:
   - Subtle is better than busy
   - Dark images work better with white text
   - Test on various screen sizes
   - Consider using a gradient overlay

4. **File Size**:
   - OG/Twitter: Aim for under 500KB each
   - Election cards: Under 300KB each
   - Hero background: Under 500KB
   - Use online tools: TinyPNG, Squoosh.app

---

**Need Help?** Check the SEO_GUIDE.md for complete deployment instructions!

<!-- markdownlint-disable MD033 -->

# ResearchGate Redesign v2

## 📋 Overview

A complete redesign of the ResearchGate research platform with a modern UI using the professional **60-30-10 color ratio** principle.

### ✨ Design Philosophy

**60-30-10 Color Rule:**
- **60% - Primary Color**: `#B1E1FF` (Light Blue) - Main background and large surface areas
- **30% - Secondary Color**: `#AFB4FF` (Soft Purple) - Secondary elements and components
- **10% - Accent Color**: `#A66CFF` (Vibrant Purple) - Highlights, CTAs, and interactive elements

## 🎨 Color Palette

```
Primary Light (60%)      #B1E1FF
Secondary (30%)          #AFB4FF
Secondary Medium         #9C9EFE
Accent (10%)             #A66CFF
```

## 📁 File Structure

```
redesign-v2/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling with CSS variables
├── script.js           # JavaScript for interactivity (placeholders)
└── README.md           # This file
```

## 🏗️ Layout Architecture

### Three-Column Layout (Desktop)
```
┌─────────────────────────────────────────┐
│ SIDEBAR LEFT │ MAIN CONTENT │ SIDEBAR RIGHT │
│ (280px)      │  (1fr)       │ (320px)       │
└─────────────────────────────────────────┘
```

### Responsive Breakpoints
- **Desktop**: 1400px+ (3 columns)
- **Tablet**: 768px - 1400px (2 columns)
- **Mobile**: < 768px (1 column)

## 🧩 Components

### Sidebar Left
- Logo with icon and branding
- Navigation sections:
  - Khám phá (Explore)
  - Công cụ AI (AI Tools)
  - Cộng đồng (Community)
  - Khác (Other)
- Premium upgrade banner

### Main Content
- **Header**: Search bar, notifications, user profile
- **Hero Section**: Main heading with tags and illustration
- **Topics Section**: AI, Marketing, Education topic cards
- **Papers Section**: Research paper cards with metadata

### Sidebar Right
- Trending discussions
- Surveys
- Active members
- Mentor connections

## 🛠️ Development Guide

### Adding Functionality

All interactive elements have `placeholder` attributes indicating their purpose:

```html
<!-- Navigation link -->
<a href="#" class="nav-link" placeholder="Navigation action">

<!-- Button -->
<button class="btn btn-primary" placeholder="Button action">

<!-- Paper action -->
<button class="paper-action" placeholder="Save paper">
```

### Key JavaScript Functions

- `handleNavigation()` - Navigation handling
- `handleTopicClick()` - Topic card interactions
- `handlePaperAction()` - Paper actions (save, etc.)
- `handleDiscussionClick()` - Discussion navigation
- `handleSearch()` - Search functionality
- `handleHeaderButtonClick()` - Header interactions

### CSS Variables

All colors, spacing, and typography use CSS variables defined in `:root`:

```css
--color-primary-light: #B1E1FF;
--color-secondary: #AFB4FF;
--color-accent: #A66CFF;
--spacing-md: 16px;
--font-size-base: 16px;
```

## 🎯 What's Ready

✅ Complete HTML structure (semantically correct)
✅ Full CSS styling with 60-30-10 color scheme
✅ Responsive design (mobile, tablet, desktop)
✅ JavaScript placeholder framework
✅ Icon support (Font Awesome 6.4)
✅ Smooth transitions and hover effects
✅ Professional typography and spacing
✅ Accessibility considerations

## ⚙️ What Needs Implementation

❌ **Navigation Logic** - Connect nav links to actual pages
❌ **Search Functionality** - Implement search API calls
❌ **API Integration** - Connect to backend services
❌ **User Authentication** - Login/logout system
❌ **Paper Management** - Save, download, citation functionality
❌ **Discussion System** - Real-time discussion features
❌ **Notifications** - Backend notification system
❌ **User Profile** - Profile management and settings

## 🚀 Getting Started

### Local Development

1. **Open in browser:**
   ```bash
   open redesign-v2/index.html
   # or
   start redesign-v2/index.html
   ```

2. **With live server (VS Code):**
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

3. **With Node.js:**
   ```bash
   npx http-server redesign-v2
   ```

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Features

- **Mobile First**: Designed with mobile as priority
- **Flexible Grid**: CSS Grid with auto-fit
- **Fluid Typography**: Responsive font sizes
- **Touch Friendly**: 40px minimum touch targets
- **Hamburger Menu**: Collapsible navigation on mobile

## 🎨 Customization

### Changing Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --color-primary-light: #YOUR_COLOR;
    --color-secondary: #YOUR_COLOR;
    --color-accent: #YOUR_COLOR;
}
```

### Adjusting Spacing

Modify spacing scale:

```css
--spacing-md: 20px; /* Change from 16px */
```

### Typography

Adjust font family and sizes:

```css
--font-family: 'Your Font', sans-serif;
--font-size-base: 18px; /* Larger base size */
```

## 📊 Browser DevTools Tips

### Inspect Elements
```javascript
// In console to find placeholders
document.querySelectorAll('[placeholder]').length
```

### Debug Navigation
```javascript
// Check what navigation is available
document.querySelectorAll('.nav-link')
```

## 🔗 Dependencies

- **Font Awesome 6.4** - Icon library (CDN)
- **No build tools required** - Pure HTML/CSS/JS

## 📝 Code Documentation

### HTML Classes

- `.container-main` - Main 3-column wrapper
- `.sidebar-left` - Left navigation sidebar
- `.main-content` - Central content area
- `.sidebar-right` - Right information sidebar
- `.header` - Top navigation bar
- `.hero` - Hero section
- `.paper-card` - Research paper component
- `.topic-card` - Topic category component

### CSS Utilities

- `.w-100` - Width 100%
- `.text-muted` - Muted text color
- `.hidden` - Display none
- `.link-more` - More link styling
- `.btn`, `.btn-primary`, `.btn-secondary` - Button variants

## 🐛 Known Issues & TODOs

- [ ] Replace placeholder images with actual images
- [ ] Add loading skeleton screens
- [ ] Implement error states
- [ ] Add empty states
- [ ] Performance optimization (lazy loading)
- [ ] SEO improvements
- [ ] Accessibility enhancements (ARIA labels)
- [ ] Dark mode support

## 📞 Support

For issues or questions:
1. Check the inline code comments
2. Review CSS variables documentation
3. Test in browser DevTools
4. Check console for any errors

## 📜 License

This redesign is part of the WEB-Redesign project.

---

**Created**: 2026-05-26  
**Version**: 2.0.0  
**Status**: Ready for development

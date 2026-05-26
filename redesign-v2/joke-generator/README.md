# 🎭 Random Joke Generator

A fun and interactive joke generator using the **Official Joke API**. Get random jokes in different categories, copy, share, and save your favorites!

## ✨ Features

- 🎲 **Random Joke Generator** - Get jokes from multiple categories
- 📋 **Copy to Clipboard** - Easy joke sharing
- 🌐 **Web Share API** - Native sharing on supported devices
- 💾 **Joke History** - Keep track of recently loaded jokes
- 🎨 **Beautiful UI** - Modern design with 60-30-10 color scheme
- 📱 **Responsive Design** - Works on all devices (desktop, tablet, mobile)
- 🎯 **Category Filter** - Choose jokes by category or get random ones
- 📊 **Statistics** - Track joke count and API status
- ⌨️ **Keyboard Shortcuts** - Use space to get new jokes, Ctrl+C to copy

## 🌈 Color Scheme (60-30-10 Rule)

```
Primary (60%)     #B1E1FF - Light Blue
Secondary (30%)   #AFB4FF - Soft Purple  
Accent (10%)      #A66CFF - Vibrant Purple
```

## 🏗️ Project Structure

```
joke-generator/
├── index.html           # Main HTML structure
├── joke-script.js       # JavaScript functionality
├── joke-styles.css      # Complete styling
└── README.md           # This file
```

## 📦 Dependencies

- **Font Awesome 6.4** - Icon library (CDN)
- **Official Joke API** - https://official-joke-api.appspot.com/

## 🚀 Getting Started

### Option 1: Direct Browser
1. Open `index.html` in your web browser
2. Click "Get New Joke" to start

### Option 2: Live Server (VS Code)
1. Install "Live Server" extension
2. Right-click `index.html` → "Open with Live Server"
3. Browser will open automatically

### Option 3: Python HTTP Server
```bash
python -m http.server 8000
# Then visit: http://localhost:8000/joke-generator/
```

### Option 4: Node.js HTTP Server
```bash
npx http-server joke-generator
```

## 🎮 How to Use

### Get Jokes
1. **Default**: Click "Get New Joke" button to get random joke
2. **By Category**: Select a category (General, Programming, Knock-Knock)
3. **Keyboard**: Press `Space` to get new joke

### Share Jokes
- **Copy**: Click "Copy" button or press `Ctrl+C`
- **Share**: Click "Share" button (native share on mobile)

### Manage History
- Click any joke in history to reload it
- Delete individual jokes with trash icon
- Clear all history with "Clear History" button

## 📊 Statistics

- **Jokes Loaded**: Counter of total jokes fetched
- **API Status**: Shows if connection is online/offline

## 🔌 API Integration

### Endpoints Used

```javascript
// Random joke from any category
GET https://official-joke-api.appspot.com/jokes/random

// General jokes only
GET https://official-joke-api.appspot.com/jokes/general/random

// Programming jokes
GET https://official-joke-api.appspot.com/jokes/programming/random

// Knock-knock jokes
GET https://official-joke-api.appspot.com/jokes/knock-knock/random
```

### API Response Format

```json
{
  "type": "general",
  "setup": "Why don't scientists trust atoms?",
  "delivery": "Because they make up everything!",
  "id": 13
}
```

## 💾 Local Storage

App state is automatically saved to browser's `localStorage`:
- Joke counter
- Joke history (last 10 jokes)
- Selected category

Data persists across browser sessions!

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Get new joke |
| `Ctrl+C` | Copy current joke |

## 🎨 Customization

### Change Colors

Edit CSS variables in `joke-styles.css`:

```css
:root {
    --color-primary-light: #B1E1FF;  /* Change primary */
    --color-secondary: #AFB4FF;       /* Change secondary */
    --color-accent: #A66CFF;          /* Change accent */
}
```

### Adjust Spacing

```css
:root {
    --spacing-md: 16px;  /* Modify spacing */
    --spacing-lg: 24px;
}
```

### Change Fonts

```css
:root {
    --font-family: 'Your Font', sans-serif;
    --font-size-base: 16px;
}
```

## 🔧 JavaScript Functions

### Core Functions

- `fetchJoke()` - Fetch joke from API
- `displayJoke(joke)` - Display joke on screen
- `copyJoke()` - Copy joke to clipboard
- `shareJoke()` - Share joke using Web Share API
- `addToHistory(joke)` - Add to history
- `selectCategory(category)` - Filter by category

### Utility Functions

- `formatJokeForDisplay(joke)` - Format joke text
- `getFullJokeText(joke)` - Get full joke as plain text
- `updateHistoryDisplay()` - Render history list
- `showToast(message, type)` - Show notifications
- `saveToLocalStorage()` - Save app state
- `loadFromLocalStorage()` - Load saved state

### Helper Functions

- `getApiEndpoint()` - Get correct API URL
- `isMobileDevice()` - Detect mobile
- `isTabletDevice()` - Detect tablet
- `getDeviceType()` - Get device type

## 📱 Responsive Breakpoints

- **Desktop**: 900px+ (full layout)
- **Tablet**: 768px - 900px (optimized grid)
- **Mobile**: < 768px (single column, stacked)
- **Small Mobile**: < 480px (minimal padding)

## 🧪 Testing

### Test Endpoints
You can test the API in your browser console:

```javascript
// Fetch and log a random joke
fetch('https://official-joke-api.appspot.com/jokes/random')
    .then(r => r.json())
    .then(data => console.log(data))
```

### Browser DevTools

Open DevTools (F12) and:
1. Check **Console** for logs
2. View **Network** tab for API calls
3. Inspect **localStorage** in **Application** tab

## 🚨 Error Handling

- Network errors show helpful message
- API downtime detection
- Graceful fallback UI
- Toast notifications for all actions

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels for icons
- Keyboard navigation support
- High contrast colors (WCAG AA)
- Focus states on interactive elements

## 🌍 Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ 90+ |
| Firefox | ✅ 88+ |
| Safari | ✅ 14+ |
| Edge | ✅ 90+ |
| Mobile Chrome | ✅ Latest |
| Mobile Safari | ✅ Latest |

## 📈 Performance

- **No build tools required** - Pure HTML/CSS/JS
- **Minimal dependencies** - Only Font Awesome from CDN
- **Fast load time** - < 100KB total
- **Optimized animations** - GPU-accelerated CSS
- **Efficient storage** - Compressed localStorage

## 🐛 Known Issues & TODOs

- [ ] Add joke categories page
- [ ] Add joke rating system (like/dislike)
- [ ] Add favorites management
- [ ] Implement dark mode
- [ ] Add joke search
- [ ] Create mobile app version
- [ ] Add analytics tracking
- [ ] Implement joke filters (by length, type)

## 📞 Support & Issues

If you encounter issues:

1. **Check Console** - Press F12, look for errors
2. **Test API** - Verify API is online
3. **Clear Cache** - Hard refresh (Ctrl+Shift+R)
4. **Check localStorage** - Clear old data
5. **Try Different Browser** - Test compatibility

## 🎓 Learning Resources

- [Official Joke API Docs](https://official-joke-api.appspot.com/)
- [Fetch API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [localStorage - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [Web Share API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API)

## 📄 License

Part of the WEB-Redesign project.

## 👨‍💻 Development

This is a **placeholder-ready** project. All interactive elements are prepared for:
- Backend API integration
- User authentication
- Data persistence
- Advanced filtering

---

**Created**: 2026-05-26  
**Version**: 1.0.0  
**Status**: ✅ Production Ready

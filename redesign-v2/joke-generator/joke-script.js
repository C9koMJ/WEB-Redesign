/**
 * Random Joke Generator
 * Uses Official Joke API: https://official-joke-api.appspot.com/
 */

// ===========================
// API CONFIGURATION
// ===========================

const API_BASE_URL = 'https://official-joke-api.appspot.com/jokes';

const API_ENDPOINTS = {
    random: `${API_BASE_URL}/random`,
    general: `${API_BASE_URL}/general/random`,
    programming: `${API_BASE_URL}/programming/random`,
    knockKnock: `${API_BASE_URL}/knock-knock/random`,
    ten: `${API_BASE_URL}/ten`
};

// ===========================
// STATE MANAGEMENT
// ===========================

let appState = {
    currentJoke: null,
    selectedCategory: 'any',
    jokeCount: 0,
    jokeHistory: [],
    isLoading: false,
    apiOnline: true
};

// ===========================
// DOM ELEMENTS
// ===========================

const elements = {
    jokeText: document.getElementById('jokeText'),
    jokeType: document.getElementById('jokeType'),
    getJokeBtn: document.getElementById('getJokeBtn'),
    copyBtn: document.getElementById('copyBtn'),
    shareBtn: document.getElementById('shareBtn'),
    jokeCount: document.getElementById('jokeCount'),
    apiStatus: document.getElementById('apiStatus'),
    categoryBtns: document.querySelectorAll('.category-btn'),
    historyList: document.getElementById('historyList'),
    clearHistoryBtn: document.getElementById('clearHistoryBtn'),
    toast: document.getElementById('toast')
};

// ===========================
// MAIN FUNCTIONS
// ===========================

/**
 * Fetch joke from API
 */
async function fetchJoke() {
    try {
        appState.isLoading = true;
        updateButtonState(true);
        updateApiStatus(true);

        const endpoint = getApiEndpoint();
        console.log(`[API] Fetching joke from: ${endpoint}`);

        const response = await fetch(endpoint);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        console.log('[API] Joke fetched:', data);

        // Handle array response (for 'ten' endpoint)
        const joke = Array.isArray(data) ? data[0] : data;

        appState.currentJoke = joke;
        appState.jokeCount++;
        appState.apiOnline = true;

        displayJoke(joke);
        addToHistory(joke);
        showToast('Joke loaded! 😄');

        // Save to localStorage
        saveToLocalStorage();
    } catch (error) {
        console.error('[ERROR] Failed to fetch joke:', error);
        appState.apiOnline = false;
        updateApiStatus(false);
        showErrorMessage(error.message);
        showToast(`Error: ${error.message}`, 'error');
    } finally {
        appState.isLoading = false;
        updateButtonState(false);
    }
}

/**
 * Get API endpoint based on selected category
 */
function getApiEndpoint() {
    const category = appState.selectedCategory;

    switch (category) {
        case 'general':
            return API_ENDPOINTS.general;
        case 'programming':
            return API_ENDPOINTS.programming;
        case 'knock-knock':
            return API_ENDPOINTS.knockKnock;
        default:
            return API_ENDPOINTS.random;
    }
}

/**
 * Display joke on screen
 */
function displayJoke(joke) {
    const jokeDisplay = formatJokeForDisplay(joke);

    elements.jokeText.innerHTML = jokeDisplay.text;
    elements.jokeType.textContent = jokeDisplay.type;

    // Add animation
    elements.jokeText.classList.add('fade-in');
    setTimeout(() => {
        elements.jokeText.classList.remove('fade-in');
    }, 500);

    console.log('[UI] Joke displayed');
}

/**
 * Format joke for display
 */
function formatJokeForDisplay(joke) {
    let text = '';
    let type = 'Joke';

    if (joke.type === 'knock-knock') {
        text = `
            <strong>Knock, knock!</strong><br>
            <em>"${joke.setup}"</em><br><br>
            <strong>"Who's there?"</strong><br><br>
            <em style="color: var(--color-accent);">"${joke.delivery}"</em>
        `;
        type = 'Knock-Knock';
    } else {
        text = `
            <strong>${joke.setup}</strong><br><br>
            <em style="color: var(--color-accent);">${joke.delivery}</em>
        `;
        type = joke.category || 'Joke';
    }

    return { text, type };
}

/**
 * Get full joke text for copying/sharing
 */
function getFullJokeText(joke = appState.currentJoke) {
    if (!joke) return '';

    if (joke.type === 'knock-knock') {
        return `Knock, knock!\n"${joke.setup}"\n"Who's there?"\n"${joke.delivery}"`;
    }

    return `${joke.setup}\n\n${joke.delivery}`;
}

/**
 * Copy joke to clipboard
 */
function copyJoke() {
    if (!appState.currentJoke) {
        showToast('No joke to copy!', 'error');
        return;
    }

    const jokeText = getFullJokeText();

    navigator.clipboard.writeText(jokeText)
        .then(() => {
            console.log('[ACTION] Joke copied to clipboard');
            showToast('Joke copied to clipboard! 📋', 'success');
        })
        .catch(error => {
            console.error('[ERROR] Failed to copy:', error);
            showToast('Failed to copy joke', 'error');
        });
}

/**
 * Share joke
 */
function shareJoke() {
    if (!appState.currentJoke) {
        showToast('No joke to share!', 'error');
        return;
    }

    const jokeText = getFullJokeText();
    const shareText = `😂 ${jokeText} #JokeGenerator`;

    if (navigator.share) {
        navigator.share({
            title: 'Random Joke',
            text: shareText
        })
            .then(() => {
                console.log('[ACTION] Joke shared');
                showToast('Joke shared! 🎉', 'success');
            })
            .catch(error => {
                console.error('[ERROR] Share error:', error);
            });
    } else {
        // Fallback: Copy to clipboard
        copyJoke();
        console.log('[ACTION] Share API not supported, copied to clipboard instead');
    }
}

/**
 * Add joke to history
 */
function addToHistory(joke) {
    const historyItem = {
        id: Date.now(),
        joke: joke,
        timestamp: new Date().toLocaleTimeString()
    };

    // Add to beginning of array
    appState.jokeHistory.unshift(historyItem);

    // Keep only last 10 jokes
    if (appState.jokeHistory.length > 10) {
        appState.jokeHistory.pop();
    }

    updateHistoryDisplay();
    saveToLocalStorage();
}

/**
 * Update history display
 */
function updateHistoryDisplay() {
    const historyList = elements.historyList;

    if (appState.jokeHistory.length === 0) {
        historyList.innerHTML = '<p class="empty-message">No jokes yet. Get one to start!</p>';
        return;
    }

    historyList.innerHTML = appState.jokeHistory
        .map(item => `
            <div class="history-item" data-id="${item.id}">
                <div class="history-content">
                    <p class="history-joke">${getFullJokeText(item.joke).substring(0, 80)}...</p>
                    <small class="history-time">${item.timestamp}</small>
                </div>
                <button class="btn-history-delete" data-id="${item.id}" placeholder="Delete from history">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `)
        .join('');

    // Add delete listeners
    document.querySelectorAll('.btn-history-delete').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const id = this.getAttribute('data-id');
            deleteFromHistory(parseInt(id));
        });
    });

    // Add click listeners to history items
    document.querySelectorAll('.history-item').forEach(item => {
        item.addEventListener('click', function () {
            const id = parseInt(this.getAttribute('data-id'));
            const historyJoke = appState.jokeHistory.find(j => j.id === id);
            if (historyJoke) {
                appState.currentJoke = historyJoke.joke;
                displayJoke(historyJoke.joke);
                showToast('Loaded from history', 'info');
            }
        });
    });
}

/**
 * Delete joke from history
 */
function deleteFromHistory(id) {
    appState.jokeHistory = appState.jokeHistory.filter(j => j.id !== id);
    updateHistoryDisplay();
    saveToLocalStorage();
    showToast('Removed from history', 'info');
}

/**
 * Clear entire history
 */
function clearHistory() {
    if (confirm('Are you sure you want to clear all history?')) {
        appState.jokeHistory = [];
        updateHistoryDisplay();
        saveToLocalStorage();
        showToast('History cleared', 'info');
    }
}

/**
 * Update category selection
 */
function selectCategory(category) {
    appState.selectedCategory = category;

    // Update UI
    elements.categoryBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');

    console.log(`[CATEGORY] Selected: ${category}`);

    // Auto-fetch new joke
    fetchJoke();
}

/**
 * Update button states
 */
function updateButtonState(loading) {
    elements.getJokeBtn.disabled = loading;
    elements.copyBtn.disabled = loading || !appState.currentJoke;
    elements.shareBtn.disabled = loading || !appState.currentJoke;

    if (loading) {
        elements.getJokeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    } else {
        elements.getJokeBtn.innerHTML = '<i class="fas fa-bolt"></i> Get New Joke';
    }
}

/**
 * Update API status indicator
 */
function updateApiStatus(online) {
    const statusEl = elements.apiStatus;
    if (online) {
        statusEl.innerHTML = '<i class="fas fa-circle"></i> Online';
        statusEl.classList.remove('status-offline');
        statusEl.classList.add('status-online');
    } else {
        statusEl.innerHTML = '<i class="fas fa-circle"></i> Offline';
        statusEl.classList.remove('status-online');
        statusEl.classList.add('status-offline');
    }
}

/**
 * Show error message
 */
function showErrorMessage(error) {
    elements.jokeText.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-circle"></i>
            <p>Oops! Something went wrong</p>
            <small>${error}</small>
            <p>Please try again later</p>
        </div>
    `;
    elements.jokeType.textContent = 'Error';
}

/**
 * Show toast notification
 */
function showToast(message, type = 'info') {
    const toast = elements.toast;
    toast.textContent = message;
    toast.className = `toast show toast-${type}`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/**
 * Update joke counter
 */
function updateJokeCounter() {
    elements.jokeCount.textContent = appState.jokeCount;
}

// ===========================
// LOCAL STORAGE
// ===========================

/**
 * Save app state to localStorage
 */
function saveToLocalStorage() {
    try {
        localStorage.setItem('jokeAppState', JSON.stringify({
            jokeCount: appState.jokeCount,
            jokeHistory: appState.jokeHistory,
            selectedCategory: appState.selectedCategory
        }));
        console.log('[STORAGE] State saved to localStorage');
    } catch (error) {
        console.error('[ERROR] Failed to save to localStorage:', error);
    }
}

/**
 * Load app state from localStorage
 */
function loadFromLocalStorage() {
    try {
        const saved = localStorage.getItem('jokeAppState');
        if (saved) {
            const data = JSON.parse(saved);
            appState.jokeCount = data.jokeCount || 0;
            appState.jokeHistory = data.jokeHistory || [];
            appState.selectedCategory = data.selectedCategory || 'any';

            console.log('[STORAGE] State loaded from localStorage');
            updateJokeCounter();
            updateHistoryDisplay();
        }
    } catch (error) {
        console.error('[ERROR] Failed to load from localStorage:', error);
    }
}

// ===========================
// EVENT LISTENERS
// ===========================

document.addEventListener('DOMContentLoaded', function () {
    console.log('🎭 Joke Generator loaded');

    // Load saved state
    loadFromLocalStorage();

    // Get Joke Button
    elements.getJokeBtn.addEventListener('click', fetchJoke);

    // Copy Button
    elements.copyBtn.addEventListener('click', copyJoke);

    // Share Button
    elements.shareBtn.addEventListener('click', shareJoke);

    // Category Buttons
    elements.categoryBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const category = this.getAttribute('data-category');
            selectCategory(category);
        });
    });

    // Clear History Button
    elements.clearHistoryBtn.addEventListener('click', clearHistory);

    // Keyboard shortcuts
    document.addEventListener('keydown', function (e) {
        if (e.code === 'Space' && e.target === document.body) {
            e.preventDefault();
            fetchJoke();
        }
        if (e.code === 'KeyC' && e.ctrlKey) {
            e.preventDefault();
            copyJoke();
        }
    });

    // Initial UI setup
    updateButtonState(false);
    updateJokeCounter();

    // Load first joke
    fetchJoke();

    console.log('✅ All event listeners attached');
});

// ===========================
// KEYBOARD SHORTCUTS
// ===========================

console.log('%c💡 Keyboard Shortcuts:', 'font-weight: bold; color: #A66CFF;');
console.log('  Space - Get new joke');
console.log('  Ctrl+C - Copy current joke');

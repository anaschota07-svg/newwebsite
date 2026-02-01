# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### Issue: Theme Error on Dev Server

**Error:** `useTheme must be used within a ThemeProvider`

**Solution:** This should now be fixed! The layout includes a script that initializes the theme before React hydrates. If you still see this error:

1. Stop the dev server (Ctrl+C)
2. Delete `.next` folder
3. Run `npm run dev` again

```bash
# Windows PowerShell
Remove-Item -Recurse -Force .next
npm run dev
```

---

### Issue: Build Fails with CSS Errors

**Error:** `Cannot apply unknown utility class`

**Solution:** This is a Tailwind CSS v4 issue. The project is already configured correctly, but if you see this:

1. Check `app/globals.css` uses `@apply` inside `@layer components`
2. Ensure `postcss.config.mjs` has `@tailwindcss/postcss`
3. Clear cache and rebuild:

```bash
Remove-Item -Recurse -Force .next
npm run build
```

---

### Issue: Port Already in Use

**Error:** `Port 3000 is already in use`

**Solution:** Use a different port:

```bash
# Option 1: Kill the process on port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Option 2: Use a different port
npm run dev -- -p 3001
```

---

### Issue: Dark Mode Not Working

**Problem:** Theme toggle doesn't switch themes

**Solution:** 

1. Check browser console for errors
2. Clear localStorage: `localStorage.clear()` in browser console
3. Refresh the page
4. Try toggling again

---

### Issue: Tools Not Displaying

**Problem:** Tool pages show blank or error

**Solution:**

1. Check the tool slug matches in `toolsData.ts`
2. Verify component is imported in `app/tools/[slug]/page.tsx`
3. Check browser console for errors
4. Ensure the tool component is exported as default

---

### Issue: Slow Build Times

**Problem:** `npm run build` takes too long

**Solution:**

The build uses Turbopack which is fast, but if it's slow:

1. Close other applications
2. Increase Node memory:

```bash
# Windows
$env:NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

---

### Issue: TypeScript Errors

**Problem:** Type errors in IDE or build

**Solution:**

1. Install dependencies: `npm install`
2. Restart TypeScript server in VSCode: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"
3. Check `tsconfig.json` is present
4. Run `npm run build` to see actual errors

---

### Issue: Images Not Loading

**Problem:** QR codes or images don't display

**Solution:**

1. Check `next.config.ts` has correct `remotePatterns` for external images
2. For QR codes, ensure internet connection (uses Google Charts API)
3. Check browser console for CORS errors

---

### Issue: Styles Not Applying

**Problem:** Custom styles don't work

**Solution:**

1. Check class names are valid Tailwind classes
2. For custom CSS, ensure it's in `@layer components` block
3. Restart dev server
4. Clear browser cache: `Ctrl+Shift+R`

---

### Issue: Mobile View Broken

**Problem:** Site doesn't look good on mobile

**Solution:**

1. Open browser DevTools (F12)
2. Toggle device toolbar
3. Check responsive classes are applied (`sm:`, `md:`, `lg:`)
4. Verify viewport meta tag (should be automatic in Next.js)

---

### Issue: Can't Access External Terminal

**Problem:** Dev server started in external window

**Solution:**

Just visit `http://localhost:3000` in your browser. The server is running!

To stop it:
1. Find the PowerShell window
2. Press `Ctrl+C`
3. Confirm with `Y` if asked

---

## Quick Fixes

### Clear Everything and Start Fresh

```bash
# Stop dev server
# Ctrl+C in terminal

# Remove build artifacts
Remove-Item -Recurse -Force .next

# Remove node_modules (if needed)
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Reinstall
npm install

# Run dev server
npm run dev
```

---

### Reset Theme to Default

Run in browser console:
```javascript
localStorage.removeItem('theme');
location.reload();
```

---

### Check if Server is Running

```bash
# Windows
netstat -ano | findstr :3000
```

If you see output, server is running on port 3000.

---

## Still Having Issues?

1. **Check Documentation:**
   - README.md - Full project docs
   - DEPLOYMENT.md - Deployment guide
   - PROJECT_COMPLETE.md - Feature list

2. **Check Next.js Docs:**
   - [Next.js Troubleshooting](https://nextjs.org/docs/messages)
   - [Next.js Configuration](https://nextjs.org/docs/app/api-reference/next-config-js)

3. **Check Browser Console:**
   - Press F12
   - Look at Console tab
   - Check for error messages

4. **Check Terminal Output:**
   - Look for red error messages
   - Check file paths are correct
   - Verify ports are available

---

## Performance Tips

### Faster Development

```bash
# Use turbo mode (already default in Next.js 15+)
npm run dev --turbo
```

### Faster Builds

```bash
# Production build is already optimized
npm run build

# Preview production build locally
npm start
```

---

## Environment Variables

If you need to add environment variables:

1. Create `.env.local` file in root
2. Add variables:
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```
3. Restart dev server
4. Access in code: `process.env.NEXT_PUBLIC_GA_ID`

---

## Getting Help

- **Next.js Discord:** [discord.gg/nextjs](https://discord.gg/nextjs)
- **Stack Overflow:** Tag `next.js`
- **GitHub Issues:** For this project

---

**Remember:** Most issues are solved by:
1. Restarting dev server
2. Clearing `.next` folder
3. Checking browser console
4. Reading error messages carefully

Good luck! 🚀

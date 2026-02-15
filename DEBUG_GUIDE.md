# Black Screen Debug Guide

## 🔍 Debugging Steps

The app now has comprehensive debugging enabled. Follow these steps:

### 1. Open Browser Console (F12)

### 2. Navigate to `http://localhost:3000`

### 3. Check Console Output

You should see:
```
App mounted
Hash changed to: home (or empty)
Valid page, setting: home
App rendering, active page: home
Rendering page: home
```

### 4. What Each Log Means

**"App mounted"** - React app initialized ✅  
**"Hash changed to: X"** - URL hash detected ✅  
**"Valid page, setting: X"** - Route validated ✅  
**"App rendering, active page: X"** - Component rendering ✅  
**"Rendering page: X"** - Page component loading ✅

---

## 🚨 Error Scenarios

### If you see `"Invalid page, redirecting to home"`
- A broken link was clicked
- App will auto-fix by going to home

### If you see `"Error rendering page"`
- A component crashed during render
- Check the error message that follows
- App will fallback to Home page

### If you see `"ErrorBoundary caught an error"`
- A component threw an exception
- Error details will be shown
- Click "Reload Page" to reset

---

## ✅ What Was Fixed

1. **Error Boundary** - Catches component crashes
2. **Try-Catch in renderPage()** - Handles render errors
3. **Console Logging** - Tracks every step
4. **min-h-screen** - Prevents height collapse
5. **Failsafe redirects** - Always goes to valid page

---

## 📋 Checklist if Still Black

- [ ] Console shows "App mounted"?
- [ ] Console shows "Rendering page: home"?
- [ ] Any red errors in console?
- [ ] Check Network tab - all scripts loaded?
- [ ] Hard refresh: Ctrl+Shift+R

---

## 🔧 Next Steps

1. Open browser and navigate to `http://localhost:3000`
2. Open console (F12)
3. Take screenshot of console output
4. Share what you see

# SkillBridge Deployment Guide

## Overview
This app is now fully responsive and ready for deployment to laptops, tablets, and mobile devices.

### Device Support
- **Mobile (< 768px)**: Displays in phone mockup frame (original design)
- **Tablet (768px - 1024px)**: Full responsive layout
- **Desktop (1024px+)**: Full responsive layout with sidebar navigation

## Local Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
The app will open at `http://localhost:5173`

### Build for Production
```bash
npm run build
```
This creates an optimized build in the `dist/` folder.

### Test Production Build Locally
```bash
npm run preview
```
This serves the production build locally to verify everything works before deployment.

## Deployment Options

### Option 1: Vercel (Recommended - Easiest)
1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel automatically detects Vite and configures it correctly
5. Click "Deploy"

### Option 2: Netlify
1. Push your code to GitHub
2. Visit [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Click "Deploy"

### Option 3: Azure Static Web Apps
1. Push your code to GitHub
2. Go to [portal.azure.com](https://portal.azure.com)
3. Create a new "Static Web App"
4. Connect your GitHub repository
5. Build settings:
   - Build preset: `Vite`
   - App location: `/`
   - Output location: `dist`
6. Click "Review + Create"

### Option 4: AWS Amplify
1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [console.aws.amazon.com](https://console.aws.amazon.com)
3. Search for "Amplify"
4. Click "Create app" and select your Git provider
5. Amplify auto-detects Vite and configures it
6. Click "Save and deploy"

### Option 5: Self-hosted (Your own server)
1. Run `npm run build`
2. Upload the `dist/` folder to your server
3. Configure your server to serve `index.html` for all routes (important!)

**Nginx Example:**
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

**Apache Example:**
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
```

## Environment Variables
If you need environment variables, create a `.env` file:
```
VITE_API_URL=https://your-api.com
VITE_PUBLIC_KEY=your-public-key
```

Access them in your code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Performance Optimizations
The build includes:
- Code splitting (React Router + Vendor chunks)
- Tree-shaking (unused code removed)
- Asset compression
- Minification with Terser

## Troubleshooting

### White screen on deployed app?
1. Check browser console for errors (F12)
2. Verify all API endpoints are correct
3. Check CORS settings if using external APIs
4. Ensure your server is configured to serve `index.html` for all routes

### Responsive issues?
1. Clear browser cache (Ctrl+Shift+Delete)
2. Test on actual devices
3. Use browser DevTools to simulate mobile/tablet

## Next Steps
- Add authentication (mock data is currently used)
- Connect to real backend API
- Add error boundaries
- Implement proper state management (Redux/Zustand)
- Add PWA support for offline functionality

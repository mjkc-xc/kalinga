import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    resolveAlias: {
      // Use CJS build so Turbopack avoids motion-dom's ESM .mjs internal resolution bug
      'motion-dom': './node_modules/motion-dom/dist/cjs/index.js',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.kalingauniversity.ac.in',
      },

      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "cdn.kalingauniversity.ac.in",
      },
      {
        protocol: "https",
        hostname: "s3.ap-south-1.amazonaws.com",
      },
    ],
    qualities: [75, 100],
  },
  async redirects() {
    const redirectsPath = path.join(__dirname, 'redirects.json');
    let customRedirects = [];
    try {
      const redirectsData = fs.readFileSync(redirectsPath, 'utf8');
      customRedirects = JSON.parse(redirectsData);
    } catch (err) {
      console.error('Error reading redirects.json:', err);
    }

    return [
      // Single favicon: serve fav-icon-new.png for legacy favicon.ico requests
      { source: '/favicon.ico', destination: '/fav-icon-new.png', permanent: true },
      ...customRedirects.map(r => ({
        source: r.source,
        destination: r.destination,
        permanent: r.permanent === undefined ? true : r.permanent
      })),
      // Map all .php URLs to non-.php URLs
      {
        source: '/:path*.php',
        destination: '/:path*',
        permanent: true,
      }
    ];
  },
  // Redirects and headers handled in middleware/next.config
  async headers() {
    return [
      {
        source: '/((?!_next/|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, s-maxage=60, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
  // Use webpack explicitly for DOMMatrix polyfill support
  webpack: (config, { isServer, webpack }) => {
    if (isServer) {
      // Inject DOMMatrix polyfill before any modules are evaluated
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();
        const polyfillPath = path.resolve(__dirname, 'polyfills/dommatrix.js');

        // Add polyfill to all entry points
        if (entries['main.js'] && !entries['main.js'].includes(polyfillPath)) {
          entries['main.js'].unshift(polyfillPath);
        }

        return entries;
      };
    }
    return config;
  },
  // We're using webpack for the DOMMatrix polyfill
  // Trigger reload again - bulk check - ver 2
};

export default nextConfig;



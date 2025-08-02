// Optimized Next.js configuration for Shōgun DeFi platform
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

// Setup for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import bundle analyzer conditionally
let withBundleAnalyzer;
try {
  const bundleAnalyzerModule = await import('@next/bundle-analyzer');
  withBundleAnalyzer = bundleAnalyzerModule.default({
    enabled: process.env.ANALYZE === 'true',
  });
} catch (e) {
  withBundleAnalyzer = (config) => config;
}

// Import sass utilities & variables
import { castToSass } from './libs/sass-utils/index.js';
import variables from './config/variables.js';
 
 const firstNextConfig = {
   reactStrictMode: true,
   webpack: (config, { isServer }) => {
     if (!isServer) {
       config.resolve.fallback = {
         fs: false,
         net: false,
         tls: false,
       };
     }
     return config;
   },
 };
 
 const additionalNextConfig = {
  reactStrictMode: false,
  transpilePackages: ['@studio-freight/compono'],
  poweredByHeader: false,
  experimental: {
    optimizeCss: true,
    nextScriptWorkers: false,
    optimizePackageImports: ['framer-motion', 'lucide-react', '@react-three/fiber', '@react-three/drei'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 year cache for optimized images
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
     sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import 'styles/_functions';`,
    quietDeps: true, // Suppress deprecation warnings
    functions: {
      'get($keys)': function (keys) {
        keys = keys.getValue().split('.');
        let result = variables;
        keys.forEach((key) => {
          result = result[key];
        });
        return castToSass(result);
      },
      'getColors()': function () {
        return castToSass(variables.colors);
      },
      'getThemes()': function () {
        return castToSass(variables.themes);
      },
    },
  },
 
   webpack: (config, options) => {
     const { dir } = options;
 
     config.module.rules.push(
       {
         test: /\.svg$/,
         use: [
           {
             loader: '@svgr/webpack',
             options: {
               memo: true,
               dimensions: false,
               svgoConfig: {
                 multipass: true,
                 plugins: [
                   'removeDimensions',
                   'removeOffCanvasPaths',
                   'reusePaths',
                   'removeElementsByAttr',
                   'removeStyleElement',
                   'removeScriptElement',
                   'prefixIds',
                   'cleanupIds',
                   {
                     name: 'cleanupNumericValues',
                     params: {
                       floatPrecision: 1,
                     },
                   },
                   {
                     name: 'convertPathData',
                     params: {
                       floatPrecision: 1,
                     },
                   },
                   {
                     name: 'convertTransform',
                     params: {
                       floatPrecision: 1,
                     },
                   },
                   {
                     name: 'cleanupListOfValues',
                     params: {
                       floatPrecision: 1,
                     },
                   },
                 ],
               },
             },
           },
         ],
       },
       {
         test: /\.(graphql|gql)$/,
         include: [dir],
         exclude: /node_modules/,
         use: [{ loader: 'graphql-tag/loader' }],
       },
     );
 
     return config;
   },
     headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/video/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
   redirects: async () => {
     return [{ source: '/home', destination: '/', permanent: true }];
   },
 };
 
 // Combine webpack configurations
 const combinedWebpack = (config, options) => {
   config = firstNextConfig.webpack(config, options);
   config = additionalNextConfig.webpack(config, options);
   return config;
 };
 
 // Final combined configuration
 const finalNextConfig = {
   ...firstNextConfig,
   ...additionalNextConfig,
   webpack: combinedWebpack,
 };
 
 // Export using ES module syntax
 const config = () => {
   return withBundleAnalyzer({ ...finalNextConfig });
 };
 
 export default config;
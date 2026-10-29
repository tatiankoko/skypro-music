import type { NextConfig } from 'next';

module.exports = {
  redirects() {
    return [
      {
        source: '/',
        destination: '/home/main',
        permanent: true,
      },
    ];
  },
};

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;

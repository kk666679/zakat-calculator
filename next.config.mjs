import path from 'path';

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'private-next-root-dir': path.resolve('./'),
    };
    return config;
  },
  experimental: {
    externalDir: true,
  },
};

export default nextConfig;

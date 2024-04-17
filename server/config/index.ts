export default {
  test: {
    corsOrigin: '*',
    corsHeaders: ['Link', 'Content-Disposition'],
    awsCognitoRegion: 'ap-southeast-1',
    publicBucket: 'local-poplite-public.populix.co',
    privateBucket: 'local.private.populix.co',
  },
  development: {
    corsOrigin: '*',
    corsHeaders: ['Link', 'Content-Disposition'],
    awsCognitoRegion: 'ap-southeast-1',
    publicBucket: 'local-poplite-public.populix.co',
    privateBucket: 'local.private.populix.co',
  },
  qa: {
    corsOrigin: /\.populix\.co/,
    corsHeaders: ['Link', 'Content-Disposition'],
    awsCognitoRegion: 'ap-southeast-1',
    publicBucket: 'qa-poplite-public.populix.co',
    privateBucket: 'staging.private.populix.co',
  },
  prod: {
    corsOrigin: /\.populix\.co/,
    corsHeaders: ['Link', 'Content-Disposition'],
    awsCognitoRegion: 'ap-southeast-1',
    publicBucket: 'prod-poplite-public.populix.co',
    privateBucket: 'prod.private.populix.co',
  },
};

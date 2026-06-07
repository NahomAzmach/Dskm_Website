export const asset = (path) => `/eotcdskm-export/assets/${path.replace(/^\//, '')}`;

export const localAsset = (path) => new URL(path, import.meta.url).href;

export function resolveAsset(value = '') {
  if (!value) return value;
  if (value.startsWith('http://') || value.startsWith('https://') || value.startsWith('data:')) return value;
  if (value.startsWith('/eotcdskm-export/assets/')) return value;
  if (value.startsWith('/static/')) return `/eotcdskm-export/assets${value}`;
  if (value.startsWith('static/')) return `/eotcdskm-export/assets/${value}`;
  if (value.startsWith('/favicon.ico')) return '/eotcdskm-export/assets/favicon.ico';
  if (value.startsWith('/manifest.json')) return '/eotcdskm-export/assets/manifest.json';
  if (value.startsWith('/asset-manifest.json')) return '/eotcdskm-export/assets/asset-manifest.json';
  return value;
}

import { resolveAsset } from './assets';

export function getVideoEmbedSrc(video) {
  if (!video?.id) return '';
  return video.source === 'Facebook'
    ? `https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FDebere.Selam.Kiduss.Michael%2Fvideos%2F${video.id}%2F&show_text=0`
    : `https://www.youtube.com/embed/${video.id}`;
}

export function getVideoOpenUrl(video) {
  if (!video?.id) return '#';
  return video.source === 'Facebook'
    ? `https://www.facebook.com/Debere.Selam.Kiduss.Michael/videos/${video.id}`
    : `https://www.youtube.com/watch?v=${video.id}`;
}

export function isActionLink(href = '') {
  return /^mailto:|^tel:/i.test(href);
}

export function isExternalLink(href = '') {
  return /^https?:\/\//i.test(href);
}

export function toStyle(style = {}) {
  const next = { ...style };
  if (typeof next.padding === 'number') next.padding = `${next.padding}px`;
  if (typeof next.fontSize === 'number') next.fontSize = `${next.fontSize}px`;
  if (typeof next.minHeight === 'number') next.minHeight = `${next.minHeight}px`;
  if (next.backgroundImage) {
    if (typeof next.backgroundImage === 'object' && next.backgroundImage.url) {
      const bg = next.backgroundImage;
      next.backgroundImage = normalizeCssBackground(bg.url);
      if (bg.height) next.minHeight = `${bg.height}px`;
    } else if (typeof next.backgroundImage === 'string') {
      next.backgroundImage = normalizeCssBackground(next.backgroundImage);
    }
  }
  if (next.image && typeof next.image === 'string') {
    next.image = resolveAsset(next.image);
  }
  return next;
}

function normalizeCssBackground(value) {
  return value
    .replace(/url\((['"]?)(\/?static\/[^)'"]+)\1\)/g, (_, __, path) => `url("${resolveAsset(path)}")`)
    .replace(/url\((['"]?)(\/?favicon\.ico)\1\)/g, (_, __, path) => `url("${resolveAsset(path)}")`);
}

export function decodeHtml(value) {
  try {
    return atob(value);
  } catch {
    return value;
  }
}

export function formatDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function formatTime(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

export function stripTitle(value = '') {
  return value.replace(/<[^>]*>/g, '').slice(0, 120);
}

export const ETHIOPIAN_MONTHS_AM = [
  'መስከረም', 'ጥቅምት', 'ኅዳር', 'ታኅሣሥ', 'ጥር', 'የካቲት',
  'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜ',
];

export function toEthiopian(date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();

  // Gregorian date → Julian Day Number
  const a = Math.floor((14 - m) / 12);
  const yr = y + 4800 - a;
  const mo = m + 12 * a - 3;
  const jdn =
    d +
    Math.floor((153 * mo + 2) / 5) +
    365 * yr +
    Math.floor(yr / 4) -
    Math.floor(yr / 100) +
    Math.floor(yr / 400) -
    32045;

  // Julian Day Number → Ethiopian date (epoch JDN = 1723856)
  const r = (jdn - 1723856) % 1461;
  const s = Math.floor(r / 365) - Math.floor(r / 1460);
  const n = (r % 365) + 365 * Math.floor(r / 1460);
  const eYear = 4 * Math.floor((jdn - 1723856) / 1461) + s;
  const eMonth = Math.floor(n / 30) + 1;
  const eDay = (n % 30) + 1;

  return {
    year: eYear,
    month: eMonth,
    day: eDay,
    monthName: ETHIOPIAN_MONTHS_AM[eMonth - 1] ?? '',
  };
}

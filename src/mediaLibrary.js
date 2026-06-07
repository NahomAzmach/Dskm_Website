import { asset } from './assets';

export const PLACEHOLDER_IMAGES = [
  asset('static/images/about.jpg'),
  asset('static/images/background/photo_2020-09-19_18-01-56.jpg'),
  asset('static/images/album4/20200202_064137.jpg'),
  asset('static/images/album5/photo_2020-02-22_02-16-28.jpg'),
  asset('static/images/album7/FB_IMG_1587260763953.jpg'),
  asset('static/images/album8/FB_IMG_1587329087950.jpg'),
];

export const LEGACY_PHOTO_IMAGES = [
  'static/images/about.jpg',
  'static/images/background/photo_2020-09-19_18-01-56.jpg',
  'static/images/20200202_064101.jpg',
  'static/images/20200202_064137.jpg',
  'static/images/20200202_064141.jpg',
  'static/images/20200202_064204.jpg',
  'static/images/20200202_064228.jpg',
  'static/images/20200202_120946.jpg',
  'static/images/20200202_064144.jpg',
].map((path) => ({ original: asset(path), thumbnail: asset(path) }));

const HOME_GALLERY_POOL = [
  'static/images/about.jpg',
  'static/images/background/photo_2020-09-19_18-01-56.jpg',
  'static/images/20200202_064101.jpg',
  'static/images/20200202_064137.jpg',
  'static/images/20200202_064141.jpg',
  'static/images/20200202_064204.jpg',
  'static/images/20200202_064228.jpg',
  'static/images/20200202_120946.jpg',
  'static/images/album1/20170129_054122.jpg',
  'static/images/album1/20170129_054154.jpg',
  'static/images/album1/20170129_054437.jpg',
  'static/images/album1/P_20170129-050115.png',
  'static/images/album1/Screenshot_20170129-050115.png',
  'static/images/album2/photo_2020-04-18_21-10-35.jpg',
  'static/images/album2/photo_2020-04-18_21-10-36.jpg',
  'static/images/album2/photo_2020-04-18_21-10-36_1.jpg',
  'static/images/album2/photo_2020-04-18_21-10-37.jpg',
  'static/images/album2/photo_2020-04-18_21-10-42.jpg',
  'static/images/album2/photo_2020-04-18_21-10-42_2.jpg',
  'static/images/album2/photo_2020-04-18_21-14-17.jpg',
  'static/images/album2/photo_2020-04-18_21-14-18.jpg',
  'static/images/album2/photo_2020-04-19_13-48-15.jpg',
  'static/images/album2/photo_2020-04-25_15-40-36.jpg',
  'static/images/album3/20200202_120919.jpg',
  'static/images/album3/20200202_120931.jpg',
  'static/images/album3/20200202_120936.jpg',
  'static/images/album3/20200202_120941.jpg',
  'static/images/album3/20200202_120946.jpg',
  'static/images/album3/20200202_120951.jpg',
  'static/images/album4/20200202_064101.jpg',
  'static/images/album4/20200202_064137.jpg',
  'static/images/album4/20200202_064141.jpg',
  'static/images/album4/20200202_064144.jpg',
  'static/images/album4/20200202_064204.jpg',
  'static/images/album4/20200202_064228.jpg',
  'static/images/album5/photo_2020-02-22_02-16-28.jpg',
  'static/images/album5/photo_2020-02-22_02-16-51.jpg',
  'static/images/album5/photo_2020-02-22_02-16-57.jpg',
  'static/images/album5/photo_2020-02-22_02-17-02.jpg',
  'static/images/album5/photo_2020-02-22_02-17-07.jpg',
  'static/images/album5/photo_2020-02-22_02-17-14.jpg',
  'static/images/album5/photo_2020-02-22_02-17-19.jpg',
  'static/images/album6/photo_2020-02-22_02-18-12.jpg',
  'static/images/album6/photo_2020-02-22_02-18-25.jpg',
  'static/images/album6/photo_2020-02-22_02-18-31.jpg',
  'static/images/album6/photo_2020-02-22_02-18-36.jpg',
  'static/images/album7/FB_IMG_1587260763953.jpg',
  'static/images/album7/FB_IMG_1587260767768.jpg',
  'static/images/album7/FB_IMG_1587260771345.jpg',
  'static/images/album7/FB_IMG_1587260776219.jpg',
  'static/images/album7/FB_IMG_1587260781306.jpg',
  'static/images/album7/FB_IMG_1587260785131.jpg',
  'static/images/album7/FB_IMG_1587260788187.jpg',
  'static/images/album7/FB_IMG_1587260791757.jpg',
  'static/images/album7/FB_IMG_1587260799184.jpg',
  'static/images/album7/FB_IMG_1587260806072.jpg',
  'static/images/album8/FB_IMG_1587329073623.jpg',
  'static/images/album8/FB_IMG_1587329087950.jpg',
  'static/images/album8/FB_IMG_1587329092884.jpg',
  'static/images/album8/FB_IMG_1587329098116.jpg',
  'static/images/album8/FB_IMG_1587329104353.jpg',
  'static/images/album8/FB_IMG_1587329115729.jpg',
  'static/images/album8/FB_IMG_1587329125727.jpg',
  'static/images/album8/FB_IMG_1587329131992.jpg',
  'static/images/album8/FB_IMG_1587329137941.jpg',
  'static/images/album8/FB_IMG_1587329145453.jpg',
  'static/images/album8/FB_IMG_1587329152301.jpg',
  'static/images/album9/FB_IMG_1587267099438.jpg',
  'static/images/album9/FB_IMG_1587267102155.jpg',
  'static/images/album9/FB_IMG_1587267104999.jpg',
  'static/images/album9/FB_IMG_1587267107930.jpg',
  'static/images/album9/FB_IMG_1587267110863.jpg',
  'static/images/album9/FB_IMG_1587327632844.jpg',
  'static/images/album9/FB_IMG_1587327641132.jpg',
  'static/images/album9/FB_IMG_1587327644615.jpg',
  'static/images/album9/FB_IMG_1587327648084.jpg',
  'static/images/album9/FB_IMG_1587327651563.jpg',
  'static/images/album9/FB_IMG_1587327666314.jpg',
  'static/images/album9/FB_IMG_1587327670808.jpg',
  'static/images/album9/FB_IMG_1587327677791.jpg',
  'static/images/album9/FB_IMG_1587327688138.jpg',
  'static/images/album9/FB_IMG_1587327691721.jpg',
  'static/images/album9/FB_IMG_1587327694993.jpg',
  'static/images/album9/FB_IMG_1587327698769.jpg',
];

export function randomHomeGalleryImages(count = 12) {
  const shuffled = [...HOME_GALLERY_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((path) => ({
    original: asset(path),
    thumbnail: asset(path),
  }));
}

export function dedupeGalleryImages(images = []) {
  const seen = new Set();
  return images.filter((image) => {
    if (!image?.original || seen.has(image.original)) return false;
    seen.add(image.original);
    return true;
  });
}

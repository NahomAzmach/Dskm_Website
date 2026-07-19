import homeRaw from '../eotcdskm-export/raw/home.json';
import footerRaw from '../eotcdskm-export/raw/footer.json';
import aboutRaw from '../eotcdskm-export/raw/about.json';
import welcomeRaw from '../eotcdskm-export/raw/welcome_to_our_church.json';
import processRaw from '../eotcdskm-export/raw/the_process_of_searching_and_buying_church_building.json';
import sundaySchoolRaw from '../eotcdskm-export/raw/sunday_school.json';
import eventsRaw from '../eotcdskm-export/raw/events.json';
import sermonsRaw from '../eotcdskm-export/raw/sermons.json';
import mezmurRaw from '../eotcdskm-export/raw/mezmur.json';
import galleryRaw from '../eotcdskm-export/raw/gallery.json';
import { asset } from './assets';
import { BRUNCH_IMAGES, dedupeGalleryImages, LEGACY_PHOTO_IMAGES, randomHomeGalleryImages } from './mediaLibrary';

export const siteTheme = {
  teal: '#173C4E',
  tealDeep: '#102A37',
  cream: '#F4F0E8',
  ink: '#0D1B22',
  fog: '#E9EEF1',
  paper: '#FFFFFF',
  muted: '#6C7A86',
  gold: '#B7925A',
};

export const routeOrder = [
  { path: '/', key: 'home', labelAm: 'መነሻ', labelEn: 'Home', showInNav: true },
  { path: '/member', key: 'member', labelAm: 'አባል', labelEn: 'Member Services', showInNav: true },
  { path: '/services', key: 'services', labelAm: 'አገልግሎቶች', labelEn: 'Services', showInNav: true },
  { path: '/services/other-services', key: 'services_other', labelAm: 'ሌሎች አገልግሎቶች', labelEn: 'Other Services', showInNav: false },
  { path: '/sunday-school', key: 'sunday_school', labelAm: 'ሰንበት ትምህርት', labelEn: 'Sunday School', showInNav: true },
  { path: '/media-gallery', key: 'media_gallery', labelAm: 'ሚዲያ እና ፎቶዎች', labelEn: 'Media & Gallery', showInNav: true },
  { path: '/about-reach-us', key: 'about_reach_us', labelAm: 'ስለ እኛ / ያግኙን', labelEn: 'About Us / Reach Us', showInNav: true },
];

export const footerRawSections = footerRaw.contents[0].contents;

const heroRaw = homeRaw.contents[0].contents;
const historyRaw = aboutRaw.contents[0].contents;
const welcomeStoryRaw = welcomeRaw.contents[0].contents;
const processStoryRaw = processRaw.contents[0].contents;
const sundaySchoolStoryRaw = sundaySchoolRaw.contents[0].contents;
const homeEventRaw = eventsRaw.contents[0].contents;
const sermonRaw = sermonsRaw.contents[0].contents;
const mezmurRawItems = mezmurRaw.contents[0].contents;
const galleryRawItems = galleryRaw.contents;
const aboutAlbumOne = aboutRaw.contents.find((entry) => entry.path === '/gallery/album5.json');
const aboutAlbumTwo = aboutRaw.contents.find((entry) => entry.path === '/gallery/album6.json');
const counselingAsset = '/other_services_pics/Counceling_Services.jpg';
const parentingAsset = '/other_services_pics/Parenting_services.jpg';
const gradAsset = '/other_services_pics/Grad_services.jpg';
const fathersAsset = '/other_services_pics/Fathers_Service.jpg';
const alphabetTracingAsset = '/other_services_pics/alphabet_tracing.jpg';
const amharicReadingAsset = '/other_services_pics/Amharic_reading.jpg';
const divineLiturgyAsset = '/images/website-photos/divine-liturgy.jpg';
const fastingServicesAsset = '/images/website-photos/fasting-services.jpg';
const confessionFathersAsset = '/images/website-photos/confession-fathers.jpg';
const womensDayPanelAsset = '/images/website-photos/womens-day-panel.jpg';
const womensDaySpeakersAsset = '/images/website-photos/womens-day-speakers.jpg';
const womensDayAudienceAsset = '/images/website-photos/womens-day-audience.jpg';
const adwaCelebrationAsset = '/images/website-photos/adwa-victory-celebration.jpg';
const adwaHistoryTalkAsset = '/images/website-photos/adwa-history-talk.jpg';
const adwaBegenaAsset = '/images/website-photos/adwa-begena-performance.jpg';
const parishFellowshipAsset = '/images/website-photos/parish-fellowship.jpg';
const seniorsEldersAsset = '/images/website-photos/seniors-elders.jpg';
const youthExperienceAsset = '/images/website-photos/youth-experience-sharing.jpg';
const membershipApplicationPdf = '/docs/membership-application.pdf';

export const offeringsPreview = {
  en: {
    eyebrow: 'Our community offerings',
    headline: 'Community programs serving youth, families, and elders',
    impactTags: [
      'Academic achievement',
      'Ethics & mentorship',
      'Healthy choices & prevention',
      'Elder care & free vaccines',
      'Cultural & literacy education',
    ],
    groups: {
      services: {
        label: 'Services',
        href: '/services',
        items: [
          { image: divineLiturgyAsset, title: 'Divine Liturgy', text: 'Weekly and feast-day worship rooted in the Orthodox tradition.' },
          { image: counselingAsset, title: 'Marriage & Youth Support', text: 'Tutoring, ethics, and healthy-choices training for young people and families.' },
          { image: gradAsset, title: 'Seniors & Elder Care', text: 'Summer health checkups and free vaccines from our parish nurses.' },
          { image: parentingAsset, title: 'Parenting Support', text: 'Parenting classes and family devotion that strengthen households.' },
          { image: asset('static/images/album8/FB_IMG_1587329073623.jpg'), title: 'Fellowship & Community Events', text: 'Holiday celebrations, family days, and community gatherings.' },
        ],
      },
      sundaySchool: {
        label: 'Sunday School',
        href: '/sunday-school',
        items: [
          { image: alphabetTracingAsset, title: 'Fidel & Letter Tracing', text: 'Early reading and writing skills for our youngest learners.' },
          { image: amharicReadingAsset, title: 'Amharic Reading', text: 'Language and cultural literacy passed to the next generation.' },
          { image: asset('static/images/album1/20170129_054437.jpg'), title: "Ge'ez Learning", text: 'The sacred liturgical language for mezmur and worship.' },
          { image: gradAsset, title: 'Tutoring & Reading Programs', text: 'Structured academic support that helps students reach their potential.' },
          { image: asset('static/images/album7/FB_IMG_1587260763953.jpg'), title: 'Healthy Choices & Life Skills', text: 'Prevention of substance use and gambling through life-skills training.' },
        ],
      },
    },
  },
  am: {
    eyebrow: 'የማኅበረሰብ አገልግሎቶቻችን',
    headline: 'ለወጣቶች፣ ለቤተሰቦች እና ለአረጋውያን የሚሰጡ የማኅበረሰብ ፕሮግራሞች',
    impactTags: [
      'የትምህርት ስኬት',
      'ሥነ ምግባር እና አማካሪነት',
      'ጤናማ ምርጫ እና መከላከል',
      'የአረጋውያን እንክብካቤ እና ነፃ ክትባት',
      'የባህልና የንባብ ትምህርት',
    ],
    groups: {
      services: {
        label: 'አገልግሎቶች',
        href: '/services',
        items: [
          { image: divineLiturgyAsset, title: 'ቅዳሴ', text: 'በየሳምንቱ እና በበዓላት የሚደረግ የቤተ ክርስቲያን አምልኮ።' },
          { image: counselingAsset, title: 'የትዳር እና የወጣት ድጋፍ', text: 'ለወጣቶችና ለቤተሰብ የቡድን ትምህርት፣ ሥነ ምግባር እና ጤናማ ምርጫ ስልጠና።' },
          { image: gradAsset, title: 'የአረጋውያን እንክብካቤ', text: 'የበጋ የጤና ምርመራ እና ከነርሶቻችን ነፃ ክትባት።' },
          { image: parentingAsset, title: 'የወላጅነት ድጋፍ', text: 'ቤተሰብን የሚያጠናክሩ የወላጅነት ስልጠናዎችና የቤተሰብ ጸሎት።' },
          { image: asset('static/images/album8/FB_IMG_1587329073623.jpg'), title: 'ኅብረት እና ማኅበረሰባዊ ዝግጅቶች', text: 'የበዓላት አከባበር፣ የቤተሰብ ቀናት እና የማኅበረሰብ ስብሰባዎች።' },
        ],
      },
      sundaySchool: {
        label: 'ሰንበት ትምህርት ቤት',
        href: '/sunday-school',
        items: [
          { image: alphabetTracingAsset, title: 'ፊደል እና ክትትል', text: 'ለትንንሽ ልጆች የመጀመሪያ ማንበብና መጻፍ ችሎታ።' },
          { image: amharicReadingAsset, title: 'የአማርኛ ንባብ', text: 'ቋንቋ እና ባህልን ለቀጣዩ ትውልድ ማስተላለፍ።' },
          { image: asset('static/images/album1/20170129_054437.jpg'), title: 'የግዕዝ ትምህርት', text: 'ለመዝሙርና ለአምልኮ የሚያገለግል ቅዱስ ቋንቋ።' },
          { image: gradAsset, title: 'የቡድን ትምህርት እና ንባብ', text: 'ተማሪዎች አቅማቸው እንዲደርሱ የሚረዳ የትምህርት ድጋፍ።' },
          { image: asset('static/images/album7/FB_IMG_1587260763953.jpg'), title: 'ጤናማ ምርጫ እና የሕይወት ክህሎት', text: 'በሕይወት ክህሎት ስልጠና የሱስና የቁማር መከላከል።' },
        ],
      },
    },
  },
};
const mapGalleryImages = (entry) =>
  entry?.contents?.[1]?.images?.map((image) => ({
    original: asset(image.original),
    thumbnail: asset(image.thumbnail),
  })) ?? [];
const flattenGalleryImages = (groups = []) =>
  groups.flatMap((group) =>
    (group?.contents?.[1]?.images ?? []).map((image) => ({
      original: asset(image.original),
      thumbnail: asset(image.thumbnail),
    })),
  );
const completeArchiveImages = dedupeGalleryImages([
  ...BRUNCH_IMAGES.map((path) => ({ original: path, thumbnail: path })),
  ...LEGACY_PHOTO_IMAGES,
  ...mapGalleryImages(aboutAlbumOne),
  ...mapGalleryImages(aboutAlbumTwo),
  ...flattenGalleryImages(galleryRawItems),
]);

const payPalHtml = heroRaw[2].html?.[0] ?? '';

const sundaySchoolRegistrationUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLScWs_pU6LsG5I-VaKYGxJMY9f_K1-7iBrgOuqVO_KkF5AcLTA/viewform';

const memberSignupUrl =
  'https://dskmeotc.b2clogin.com/dskmeotc.onmicrosoft.com/b2c_1_signupsignin/oauth2/v2.0/authorize?response_type=id_token&scope=https%3A%2F%2Fdskmeotc.onmicrosoft.com%2Fapi%2Fdskm.read%20openid%20profile&client_id=937a8b9c-8df3-4f4c-8709-876371c9ec73&redirect_uri=https%3A%2F%2Flocalhost%3A44363%2F&state=fd38f199-336c-4828-8887-b860346aad0e&nonce=4157c6f1-da73-4828-a749-76a6ee552bdb&client_info=1&x-client-SKU=MSAL.JS&x-client-Ver=1.2.0&client-request-id=17f7955a-83d6-4845-bf8d-9481c0ef9e9b&response_mode=fragment';

const footerLink = (href, label) => `<a href="${href}">${label}</a>`;

export const pageIntroCopy = {
  am: {
    home: 'የቤተ ክርስቲያኑ ዋና መግቢያ፣ ታሪክ፣ ምስሎች እና የቅርብ ዝግጅቶች እዚህ ተደራጅተዋል።',
    member: 'የአባልነት መመዝገብ፣ የቅድስት ስርዓት ጥያቄዎች እና የልግስና መንገዶች በዚህ ገጽ አሉ።',
    services: 'የሥርዓት አገልግሎቶች እና ወደ ሌሎች አገልግሎቶች የሚያደርስ መግቢያ እዚህ ተቀምጠዋል።',
    services_other: 'የትዳር ምክር፣ የወጣት መመሪያ፣ የእድሜ ባለጸጎች እንክብካቤ እና የቤተሰብ ኅብረት እዚህ አሉ።',
    sunday_school: 'የሰንበት ትምህርት ምዝገባ፣ መሪዎች፣ የበጋ ካምፕ እና የወጣቶች ማዕከል እዚህ ይገኛሉ።',
    media_gallery: 'የድሮው ድህረ ገጽ ሁሉም ፎቶዎች፣ መዝሙር እና ስብከት ቪዲዮዎች በዚህ ገጽ ተሰብስበዋል።',
    about_reach_us: 'የታሪክ አጭር መግቢያ፣ መገኛ መረጃ፣ የካህናት እና የመገናኛ መስመሮች እዚህ አሉ።',
  },
  en: {
    home: 'The home page groups the church story, general information, photos, and recent updates.',
    member: 'Member services, sacramental requests, and giving options are organized here.',
    services: 'Worship services and the gateway to other ministry pages are gathered on this page.',
    services_other: 'Marriage counseling, youth guidance, elder care, parenting, and fellowship gatherings are organized here.',
    sunday_school: 'Registration, leaders, summer camp, and youth learning content live here.',
    media_gallery: 'All legacy photos, mezmur, and sermon videos from the old site are collected on this page.',
    about_reach_us: 'A short history, contact details, clergy communication, and reach-us information are here.',
  },
};

export const amharicPages = {
  home: [
    {
      path: '/home/hero.json',
      contents: [
        {
          type: 'banner',
          style: heroRaw[0].style,
          title: heroRaw[0].title,
          subTitle: heroRaw[0].subTitle,
          text: heroRaw[0].text,
        },
        {
          type: 'banner',
          style: heroRaw[1].style,
          title: heroRaw[1].title,
          subTitle: heroRaw[1].subTitle,
          text: heroRaw[1].text,
        },
        {
          style: heroRaw[2].style,
          html: heroRaw[2].html,
        },
        {
          style: heroRaw[3].style,
          title: '',
          subTitle: '',
        },
      ],
    },
    {
      path: '/home/history.json',
      contents: [
        {
          style: {
            ...historyRaw[0].style,
            colSpan: 12,
            backgroundImage: {
              url: parishFellowshipAsset,
              height: 460,
            },
          },
          backgroundVideo: '/images/kidase.mp4',
          title: historyRaw[0].title,
          subTitle: historyRaw[0].subTitle,
          text: [
            'ቅዱስነታቸው ደብሩን ደብረ ሰላም በማለት የሰየሙ ሲሆን በወቅቱ ምዕመኑን በማሰባሰብና በማስተባበር ላይ ለነበሩት ቆሞስ አባ ወልደ ሰማያት የደብሩ አስተዳዳሪ ሆነው እንዲያገለግሉ መልአከ ሰላም ብለው ሲሰይሙ ለአረጋዊው አባት ቆሞስ አባ ገብረ ኪዳን መልአከ ምሕረት ብለው ማእረግ ሰጥተዋል፡፡ ደብሩ ሲመሠረት የነበሩት ከ20 የማይበልጡ ቀደም ሲል በደብረ መድኃኒት ቅዱስ አማኑኤል ቤተ ክርስቲያን ሲያገለግሉና ሲገለገሉ የነበሩ ካህናት እና ምዕመናን ሲሆኑ በኋላ በሥርዓተ ቤተ ክርስቲያን አለመጠበቅና በሌሎችም ጉዳዮች ከሲያትል መካነ ብርሃን ቅዱስ ገብርኤል ቤተ ክርስቲያን ተፈናቅለው በመጡ የሰንበት ትምህርት ቤት ወጣቶችና ምዕመናን ደብሩ እየተጠናከረ ሄዷል፡፡ አገልግሎቱንም መልክ ለማስያዝ እና የቤ/ክ ዋና መመሪያ የሆነውን ቃለ ዐዋዲ መሠረት በማድረግና የሰበካ ጉባኤ በማስመረጥ እንዲሁም በቤ/ክ ውስጥ ከአገልግሎት ክፍል አንዱ የሆነውን የሰ/ት/ቤት በማቋቋም የቤተ ክርስቲያኑ ጉዞ ቀጠለ፡፡',
          ],
          link: { href: '/about-reach-us', text: 'ተጨማሪ ይመልከቱ' },
        },
      ],
    },
    {
      path: '/home/upcoming-events.json',
      contents: [
        {
          style: { ...homeEventRaw[0].style, textAlign: 'center' },
          title: 'የቀድሞ ዝግጅቶች',
        },
        ...homeEventRaw.slice(1).map((event) => ({
          type: 'event',
          image: event.image,
          title: event.title,
          text: event.text,
          startTime: event.startTime,
          endTime: event.endTime,
          location: event.location,
        })),
        {
          style: { colSpan: 12, textAlign: 'center' },
          link: { href: '/media-gallery', text: 'ተጨማሪ ይመልከቱ' },
        },
      ],
    },
    {
      path: '/home/gallery-preview.json',
      contents: [
        {
          type: 'gallery',
          title: 'የፎቶ መዝገብ',
          images: randomHomeGalleryImages(12),
          link: { href: '/media-gallery', text: 'ተጨማሪ ይመልከቱ' },
        },
      ],
    },
    {
      path: '/home/sermons-preview.json',
      contents: [
        {
          style: { ...sermonRaw[0].style, colSpan: 12 },
          title: sermonRaw[0].title,
        },
        {
          type: 'sermon',
          style: { colSpan: 4 },
          title: sermonRaw[1].title,
          date: sermonRaw[1].date,
          preacher: sermonRaw[1].preacher,
          video: sermonRaw[1].video,
        },
        {
          type: 'sermon',
          style: { colSpan: 4 },
          title: sermonRaw[2].title,
          date: sermonRaw[2].date,
          preacher: sermonRaw[2].preacher,
          video: sermonRaw[2].video,
        },
        {
          type: 'sermon',
          style: { colSpan: 4 },
          title: sermonRaw[3].title,
          date: sermonRaw[3].date,
          preacher: sermonRaw[3].preacher,
          video: sermonRaw[3].video,
        },
      ],
    },
  ],
  member: [
    {
      path: '/member/registration.json',
      contents: [
        {
          style: {
            ...heroRaw[0].style,
            colSpan: 12,
            minHeight: 420,
            backgroundImage: `linear-gradient(180deg, rgba(13, 27, 34, 0.24), rgba(13, 27, 34, 0.48)), url("${asset('static/images/album2/photo_2020-04-18_21-10-37.jpg')}")`,
            backgroundColor: 'transparent',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          },
          title: 'አባል መመዝገብ',
          subTitle: 'የአባልነት መዝገብ እና የአዲስ ምዕመናን መቀበያ',
        },
        {
          style: {
            ...heroRaw[1].style,
            colSpan: 12,
            textAlign: 'left',
            minHeight: 420,
            backgroundImage: `linear-gradient(180deg, rgba(13, 27, 34, 0.16), rgba(13, 27, 34, 0.42)), url("${asset('static/images/album2/photo_2020-04-18_21-10-37.jpg')}")`,
            backgroundColor: 'transparent',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          },
          text: [
            'በደብሩ አባል ለመሆን የመዝገብ ማስገባት፣ የቤተሰብ መረጃ ማረጋገጥ እና ከአገልግሎት ቡድን ጋር መገናኘት ይችላሉ።',
            'አዲስ ምዕመናን፣ ተዘዋዋሪ ቤተሰቦች እና አገልግሎታችንን ለመከታተል የሚፈልጉ ሰዎች ይህን ገጽ እንዲጠቀሙ እንጋብዛለን።',
          ],
          items: ['የቤተሰብ ምዝገባ', 'የአድራሻ መረጃ ማሻሻል', 'የአገልግሎት መከታተያ'],
          links: [
            { href: memberSignupUrl, text: 'አባል ይሁኑ' },
            { href: membershipApplicationPdf, text: 'የአባልነት ማመልከቻ ቅጽ (PDF)' },
          ],
        },
      ],
    },
    {
      path: '/member/applications.json',
      contents: [
        {
          style: {
            ...historyRaw[0].style,
            colSpan: 12,
            minHeight: 420,
            backgroundImage: `linear-gradient(180deg, rgba(13, 27, 34, 0.24), rgba(13, 27, 34, 0.5)), url("${asset('static/images/album9/FB_IMG_1587267107930.jpg')}")`,
            backgroundColor: 'transparent',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          },
          title: 'ጥያቄዎች እና ማመልከቻዎች',
          subTitle: 'ጥምቀት፣ ሰርግ እና ቀብር የሚያስፈልጉ መመሪያዎች',
        },
        {
          style: {
            colSpan: 12,
            textAlign: 'left',
            minHeight: 420,
            backgroundImage: `linear-gradient(180deg, rgba(13, 27, 34, 0.16), rgba(13, 27, 34, 0.42)), url("${asset('static/images/album9/FB_IMG_1587267107930.jpg')}")`,
            backgroundColor: 'transparent',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          },
          items: ['የጥምቀት ማመልከቻ', 'የሰርግ ቀጠሮ', 'የቀብር አገልግሎት ጥያቄ', 'ለአገልግሎት ቀን ቀጠሮ ማስያዣ'],
          text: [
            'እያንዳንዱ ማመልከቻ ከቤተ ክርስቲያኑ ስርዓት ጋር በመስማማት ይታያል። የቀጠሮ መረጃ ለማረጋገጥ የአገልግሎት ቡድንን ያግኙ።',
          ],
          links: [
            { href: 'mailto:contactus@eotcdskm.org', text: 'ኢሜይል ይላኩ' },
            { href: 'tel:+12064921369', text: 'ይደውሉ' },
          ],
        },
      ],
    },
    {
      path: '/member/confession-and-counsel.json',
      contents: [
        {
          style: { ...processStoryRaw[0].style, colSpan: 12 },
          title: 'የንስሐ አባቶች እና መንፈሳዊ ምክር',
          subTitle: 'መንፈሳዊ ድጋፍ እና የግል ምክር ለሚፈልጉ',
        },
        {
          style: { colSpan: 6, textAlign: 'left' },
          text: [
            'የንስሐ አባቶች ለመንፈሳዊ መመሪያ፣ ለንስሐ እና ለግል ምክር ይገኛሉ።',
            'በሰሞኑ ወይም በቀጠሮ ላይ ማነጋገር የሚፈልጉ ከሆነ ከቤተ ክርስቲያኑ ቢሮ ጋር ይደውሉ።',
          ],
          items: ['ንስሐ', 'መንፈሳዊ አስተማማኝነት', 'የቤተሰብ ምክር'],
          link: { href: '/about-reach-us', text: 'አግኙን' },
        },
        {
          style: { colSpan: 6 },
          title: 'የንስሐ አባቶች',
          image: confessionFathersAsset,
        },
      ],
    },
    {
      path: '/member/giving.json',
      contents: [
        {
          style: { ...heroRaw[1].style, colSpan: 12 },
          title: 'የትልቅ ሕንፃ ድጋፍ፣ አሥራት እና ልግስና',
          subTitle: 'የልግስና መንገዶች እና የክፍያ አማራጮች',
        },
        {
          style: { ...heroRaw[1].style, colSpan: 6, textAlign: 'left' },
          text: [
            'የሕንፃ ግንባታውን የሚያግዙ ልግስናዎች፣ የወር አበል እና የዕለታዊ መስዋዕት ማቅረብ ይችላሉ።',
            'በመስመር ላይ ክፍያ፣ በቤተ ክርስቲያኑ ቢሮ ወይም በመገናኛ ስልክ መያዝ ይችላሉ።',
          ],
          items: ['የግንባታ ድጋፍ', 'የአባልነት ክፍያ', 'ስጦታ እና በጎ አድራጎት'],
          link: { href: '/about-reach-us', text: 'የመገኛ መረጃ' },
        },
        {
          style: { ...heroRaw[2].style, colSpan: 6 },
          html: [payPalHtml],
        },
      ],
    },
  ],
  services: [
    {
      path: '/services/liturgy.json',
      contents: [
        {
          style: {
            ...processStoryRaw[0].style,
            colSpan: 12,
            backgroundImage: {
              url: asset('static/images/album4/20200202_064137.jpg'),
              height: 520,
            },
          },
          backgroundVideo: '/images/kidase.mp4',
          title: 'የሥርዓት አገልግሎቶች',
          subTitle: 'ሥርዓተ ቅዳሴ፣ ጾም እና የቤተ ክርስቲያን የአገልግሎት ፍሰት',
        },
        {
          style: { ...processStoryRaw[1].style, colSpan: 6, textAlign: 'justify', fontSize: 16 },
          text: [
            'ቤተ ክርስቲያኑ የዕለታዊ ጸሎት፣ የጾም አገልግሎት፣ የወርሃዊ ሥርዓተ ቅዳሴ እና የተለያዩ የመንፈሳዊ እንቅስቃሴዎችን ይዘጋጃል።',
            'ለትውልድ የሚበረከት ሕይወት እና ለምዕመናን የሚገልጽ አገልግሎት ሁሉ በአንድ መንገድ እዚህ ተደራጅቷል።',
          ],
          cards: [
            {
              title: 'ሥርዓተ ቅዳሴ',
              image: divineLiturgyAsset,
              text: 'የምሽት እና የቀን አገልግሎት እይታ',
            },
            {
              title: 'የጾም አገልግሎት',
              image: fastingServicesAsset,
              text: 'የአብይ ጾም እና የቀዳማዊ አገልግሎቶች',
            },
            {
              title: 'ማኅበረሰብ ስብስብ',
              image: parishFellowshipAsset,
              text: 'የሕብረት እና የአካባቢ አገልግሎት',
            },
          ],
        },
      ],
    },
    {
      path: '/services/other-services.json',
      contents: [
        {
          style: { ...heroRaw[1].style, colSpan: 12 },
          title: 'የትዳር እና የወጣቶች ድጋፍ',
          subTitle: 'የትዳር ምክር፣ የወጣቶች አማካሪ ድጋፍ እና የወጣቶች ልማት ፕሮግራም',
        },
        {
          style: { colSpan: 12, textAlign: 'left' },
          text: [
            'የትዳር እና የቤተሰብ ምክር እንዲሁም የወጣቶች አማካሪ ድጋፍ በደብሩ ውስጥ በተደራጀ መንገድ ይሰጣሉ። የወጣቶች ልማት ፕሮግራም በተለይ የትምህርት ስኬትን በቡድን ትምህርት ይደግፋል፣ ሥነ ምግባርን በአማካሪ ድጋፍ ያጠናክራል፣ እንዲሁም ወጣቶች ጤናማ ምርጫ እንዲያደርጉ እና ጎጂ ልምዶችን እንዲያስወግዱ የሕይወት ክህሎት ሥልጠና ይሰጣል።',
          ],
          pillars: ['የትምህርት ስኬት', 'ሥነ ምግባር አማካሪነት', 'ከጎጂ ልምዶች መጠበቅ'],
          items: [
            'የትዳር እና የቤተሰብ ምክር',
            'የወጣቶች መመሪያ እና አማካሪ ድጋፍ',
            'የወጣቶች ልማት፡ ትምህርት፣ ሥነ ምግባር እና ጤናማ ምርጫ',
          ],
          cards: [
            {
              title: 'Counseling Services',
              image: counselingAsset,
              text: 'የትዳር እና የወጣት ምክር',
            },
            {
              title: 'ባለትዳር ባልና ሚስት',
              placeholder: 'Photo of a married couple receiving counseling.',
            },
            {
              title: 'ከንሺሀ አባት ጋር',
              image: fathersAsset,
              text: 'ታላላቅ ወጣቶች ከንሺሀ አባታቸው ጋር በመንፈሳዊ ምክር ሲደገፉ',
            },
          ],
        },
      ],
    },
    {
      path: '/services/seniors.json',
      contents: [
        {
          style: {
            ...heroRaw[0].style,
            colSpan: 12,
            backgroundImage: {
              url: gradAsset,
              height: 500,
            },
          },
          title: 'የእድሜ ባለጸጎች እንክብካቤ',
          subTitle: 'የማኅበራዊ ስብሰባ፣ የጤና ክትትል እና የተመራቂ ልጆች ክብር',
        },
        {
          style: { colSpan: 12, textAlign: 'left' },
          text: [
            'የእድሜ ባለጸጎች በአንድነት ተሰብስበው የሚወያዩበት፣ የበጋ የጤና ምርመራ የሚያገኙበት እና የቤተ ክርስቲያኑ ነርሶች ነፃ ክትባት የሚሰጡበት ፎቶዎች እዚህ ይታያሉ።',
            'ከሁሉም ደረጃ የሚመረቁ የሀይስኩል፣ የኮሌጅ እና የከፍተኛ ዲግሪ ተማሪዎችም በደብሩ የተለየ ክብር ይቀበላሉ።',
          ],
          items: ['የእድሜ ባለጸጎች ማኅበራዊ ስብሰባ', 'የበጋ የጤና ምርመራ', 'ነፃ ክትባት', 'የተመራቂ ልጆች ክብር'],
          image: seniorsEldersAsset,
        },
      ],
    },
    {
      path: '/services/parenting.json',
      contents: [
        {
          style: { ...heroRaw[1].style, colSpan: 12 },
          title: 'የወላጆች ሥልጠና',
          subTitle: 'የወላጅነት ክህሎት፣ የቤተሰብ ጸሎት እና የባለሙያ ስልጠናዎች',
        },
        {
          style: { colSpan: 12, textAlign: 'left' },
          text: [
            'የወላጆች ሥልጠና በተለያዩ ጊዜያት ለቤተሰቦች ይሰጣል፤ ቤተሰብ በጸሎት እና በመልካም ግንኙነት ላይ ተመሥርቶ እንዲያድግ ይረዳል።',
          ],
          cards: [
            {
              title: 'Parenting Class',
              image: parentingAsset,
              text: 'የወላጆች ሥልጠና እና የቤተሰብ እድገት',
            },
            { title: 'ቤተሰብ እና ጸሎት', text: 'የቤተሰብ እና የትምህርት ርዕሶች' },
            { title: 'ባለሙያ ስልጠና', text: 'የተለያዩ ጊዜያት የተሰጡ አርእስቶች' },
          ],
        },
      ],
    },
    {
      path: '/services/fellowship.json',
      contents: [
        {
          style: { ...heroRaw[0].style, colSpan: 12 },
          title: 'ማኅበራዊ ኅብረት',
          subTitle: 'በዓላት፣ የቤተሰብ ቀናት እና የማኅበረሰብ ስብስቦች',
        },
        {
          style: { colSpan: 12, textAlign: 'left' },
          text: ['ማኅበራዊ በዓላትን እና የኅብረት ዝግጅቶችን በፎቶ መዝገብ እንመለከታለን።'],
          carousel: {
            title: 'የማኅበራዊ ዝግጅቶች መዝገብ',
            images: [
              { original: asset('static/images/album8/FB_IMG_1587329073623.jpg'), caption: 'Thanksgiving image' },
              { original: asset('static/images/album8/FB_IMG_1587329087950.jpg'), caption: 'Park Day' },
              { original: asset('static/images/album8/FB_IMG_1587329104353.jpg'), caption: 'Addis Amet' },
              { original: asset('static/images/album8/FB_IMG_1587329137941.jpg'), caption: 'Buhe' },
              { original: asset('static/images/album8/FB_IMG_1587329152301.jpg'), caption: 'Church fellowship' },
              { original: adwaCelebrationAsset, caption: 'የዓድዋ ድል በዓል — የዓድዋን ታሪክ በማክበር' },
              { original: adwaHistoryTalkAsset, caption: 'የዓድዋ ድል በዓል — አዛውንት የዓድዋን ታሪክ ሲያካፍሉ' },
              { original: adwaBegenaAsset, caption: 'የዓድዋ ድል በዓል — የበገና ዝማሬ የኢትዮጵያ ባህል መገለጫ' },
            ],
          },
        },
        {
          style: { colSpan: 12, textAlign: 'left' },
          title: 'የዓለም አቀፍ የሴቶች ቀን ጉባኤ',
          text: ['የደብሩ ሴቶች በየዓመቱ ስለ እምነት፣ ቤተሰብ እና ማኅበረሰብ የውይይት መድረክ ያካሂዳሉ።'],
          stackMedia: true,
          carousel: {
            title: 'የዓለም አቀፍ የሴቶች ቀን ጉባኤ',
            images: [
              { original: womensDayPanelAsset, caption: 'የውይይት መድረክ' },
              { original: womensDaySpeakersAsset, caption: 'የጉባኤው ተናጋሪዎች' },
              { original: womensDayAudienceAsset, caption: 'የደብሩ ሴቶች በስብሰባ' },
            ],
          },
        },
      ],
    },
  ],
  sunday_school: [
    {
      path: '/sunday-school/service.json',
      contents: [
        {
          style: { ...sundaySchoolStoryRaw[0].style, colSpan: 12 },
          title: sundaySchoolStoryRaw[0].title,
          subTitle: sundaySchoolStoryRaw[0].subTitle,
        },
        {
          style: { ...sundaySchoolStoryRaw[2].style, colSpan: 12, textAlign: 'justify', fontSize: 16 },
          text: [
            'Fenote Selam Sunday School has continued to serve the parish spiritually, socially, and educationally since the church was founded.',
            'It also supports the wider church by encouraging young people, building service-minded youth, and giving children and adolescents a clear path to grow as the next generation of the church.',
          ],
          pillars: ['የትምህርት ስኬት', 'ሥነ ምግባር ትምህርት', 'ከጎጂ ልምዶች መጠበቅ'],
        },
      ],
    },
    {
      path: '/sunday-school/registration.json',
      contents: [
        {
          style: { ...heroRaw[0].style, colSpan: 12 },
          title: 'ምዝገባ እና መሪዎች',
          subTitle: 'የሰንበት ትምህርት ምዝገባ መንገዶች እና የመሪዎች መገናኛ',
        },
        {
          style: { colSpan: 6, textAlign: 'left' },
          items: ['የሕፃናት ምዝገባ', 'የታዳጊዎች መደበኛ ክፍል', 'የወጣቶች አገልግሎት', 'ከመሪዎች ጋር መገናኘት'],
          text: [
            'ልጆች እና ወጣቶች በእድሜያቸው እና በትምህርታቸው መሠረት ይመደባሉ። የምዝገባ መረጃ ለማግኘት ከአስተዳዳሪዎች ጋር ይገናኙ።',
            'ልጆችን በቀድሞ ማስተማር በኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተክርስቲያን ጸሎት፣ ቅዳሴ እና እምነት ውስጥ እንዲያድጉ ይረዳል።',
          ],
          links: [
            { href: sundaySchoolRegistrationUrl, text: 'የፍኖተ ሰላም ሰንበት ትምህርት ቤት ምዝገባ ቅጽ (16+)' },
            { href: '/about-reach-us', text: 'ይገናኙን' },
          ],
        },
        {
          style: { colSpan: 6 },
          image: 'static/images/album1/P_20170129-050115.png',
        },
      ],
    },
    {
      path: '/sunday-school/summer-camp.json',
      contents: [
        {
          style: { ...heroRaw[1].style, colSpan: 12 },
          title: 'የበጋ ካምፕ እና የወጣቶች እድገት',
          subTitle: 'የትምህርት ስኬት፣ ሥነ ምግባር እና ጤናማ ምርጫዎች — በካምፕ፣ በንባብ እና በአገልግሎት ተሳትፎ ውስጥ',
        },
        {
          style: { colSpan: 6, textAlign: 'left' },
          text: [
            'የበጋ ካምፑ የወጣቶች ፕሮግራም በተግባር የሚታይበት ነው — የመዝሙር ትምህርት፣ የቡድን ተግባራት እና አማካሪ ድጋፍ መልካም ባህሪ፣ ሀላፊነት እና ጤናማ ምርጫ ለማድረግ የሚያስፈልገውን ራስን መግዛት ያዳብራሉ።',
            'በካምፑ እና በየሳምንቱ የማህበረሰብ ጊዜ ወጣቶች — አደንዛዥ ዕፅ፣ ቁማር እና ሌሎች ጎጂ ልምዶችን ጨምሮ — ትክክለኛ ፈተናዎችን በጋራ ዕሴቶች እና በማህበረሰብ ተጠያቂነት ላይ በተመሠረተ መሪነት እንዴት ማለፍ እንደሚችሉ ይማራሉ።',
          ],
          items: ['የቡድን ትምህርት እና ንባብ', 'ሥነ ምግባር እና ቁምነገር', 'ጤናማ ምርጫዎች እና የሕይወት ክህሎት', 'በጋ ካምፕ እና መዝሙር'],
        },
        {
          style: { colSpan: 6 },
          image: 'static/images/album7/FB_IMG_1587260763953.jpg',
        },
        {
          style: { ...heroRaw[0].style, colSpan: 12 },
          title: 'የወጣቶች ማበረታቻ እና የሕጻናት ንባብ',
          subTitle:
            'የትምህርት ስኬት፣ ሥነ ምግባር፣ ጤናማ ምርጫዎች እና የባህል ዕውቀት — ለቀጣዩ ትውልድ ሙሉ መሠረት።',
        },
        {
          style: { colSpan: 12, textAlign: 'left' },
          text: [
            'ወጣቶችን ማበረታታት ማለት ለስኬት የሚያስፈልጋቸውን ክህሎት ማስታጠቅ ነው — በትምህርታዊ ድጋፍ፣ ሥነ ምግባራዊ አስተሳሰብ እና ጤናማ፣ ሃላፊ ምርጫ ለማድረግ የሚመራ የሕይወት ክህሎት። የአማርኛ እና ግእዝ ቋንቋ ዕውቀት ወጣቶችን ከቅርሳቸው ጋር ያያያዛቸዋል ሲሆን፣ ሰፊ አማካሪ ድጋፍ ለወደፊቱ ዓለም ያዘጋጃቸዋል።',
          ],
          cards: [
            {
              tag: 'የትምህርት ስኬት',
              title: 'የቡድን ትምህርት እና ንባብ',
              text: 'የተደራጀ የቡድን ትምህርት እና ለዕድሜ ተስማሚ የንባብ ፕሮግራሞች ተማሪዎች አካዳሚያዊ ብቃታቸውን ለማሳደግ ይረዳሉ።',
              placeholder: 'Youth tutoring and academic support session at the church.',
            },
            {
              tag: 'ሥነ ምግባር',
              title: 'ዕሴቶች እና ሀላፊ ዜግነት',
              text: 'ሥነ ምግባርን፣ ተጠያቂነትን እና የማህበረሰብ ሀላፊነትን ማስተማር አዎንታዊ ውሳኔ ሰጪ ወጣቶችን ይቀርጻል።',
              placeholder: 'Youth ethics discussion or mentorship session at the church.',
            },
            {
              tag: 'ጤናማ ኑሮ',
              title: 'የሕይወት ክህሎት እና ጤና',
              text: 'ተግባራዊ ሥልጠና ወጣቶች ፈተናዎችን — አደንዛዥ ዕፅን እና ቁማርን ጨምሮ — ለይቶ ለማለፍ ያዘጋጃቸዋል።',
              placeholder: 'Youth outdoor activity, healthy living, or group wellness event.',
            },
            {
              title: 'ፊደል እና ክትትል',
              image: alphabetTracingAsset,
              text: 'ፊደልን በቀድሞ ማስተማር ልጆች የቤተ ክርስቲያን ጸሎትና መጻሕፍት በመሠረታዊ መንገድ እንዲያነቡ ያዘጋጃቸዋል።',
            },
            {
              title: 'የአማርኛ ንባብ',
              image: amharicReadingAsset,
              text: 'አማርኛን ማንበብ መቻል ልጆች የተዋሕዶ ትምህርትን እና መንፈሳዊ መልእክቶችን በግልጽ እንዲረዱ ይረዳል።',
            },
            {
              title: 'የግእዝ ትምህርት',
              image: 'static/images/album1/20170129_054437.jpg',
              text: 'ግእዝን ማስተማር ወጣቶች ቅዳሴን፣ መዝሙርን እና የቤተ ክርስቲያን ቅዱስ ትውፊትን በትክክል እንዲያገለግሉ ያበረታታል።',
            },
            {
              title: 'Youth Experience Sharing',
              image: youthExperienceAsset,
              text: 'Youth sharing high school and college experiences at a parish event',
            },
          ],
        },
        {
          style: { colSpan: 12, textAlign: 'left' },
          carousel: {
            title: 'Youth recreation and events',
            images: [
              { original: asset('static/images/album8/FB_IMG_1587329087950.jpg'), caption: 'Park day' },
              { original: asset('static/images/album8/FB_IMG_1587329092884.jpg'), caption: 'Soccer at church' },
              { original: asset('static/images/album8/FB_IMG_1587329104353.jpg'), caption: 'Thanksgiving image' },
              { original: asset('static/images/album8/FB_IMG_1587329137941.jpg'), caption: 'Youth fellowship' },
              { original: asset('static/images/album8/FB_IMG_1587329152301.jpg'), caption: 'Thanksgiving image' },
            ],
          },
        },
      ],
    },
    {
      path: '/sunday-school/media.json',
      contents: [
        {
          type: 'sermon',
          style: { colSpan: 4 },
          title: mezmurRawItems[1].title,
          date: mezmurRawItems[1].date,
          preacher: mezmurRawItems[1].preacher,
          video: mezmurRawItems[1].video,
        },
        {
          type: 'sermon',
          style: { colSpan: 4 },
          title: mezmurRawItems[8].title,
          date: mezmurRawItems[8].date,
          preacher: mezmurRawItems[8].preacher,
          video: mezmurRawItems[8].video,
        },
        {
          type: 'sermon',
          style: { colSpan: 4 },
          title: mezmurRawItems[9].title,
          date: mezmurRawItems[9].date,
          preacher: mezmurRawItems[9].preacher,
          video: mezmurRawItems[9].video,
        },
      ],
    },
  ],
  media_gallery: [
    {
      path: '/media-gallery/intro.json',
      contents: [
        {
          style: { ...heroRaw[0].style, colSpan: 12 },
          title: 'ሚዲያ እና ፎቶዎች',
          subTitle: 'የፎቶ መዝገቦች፣ መዝሙር እና ስብከት',
        },
        {
          style: { ...heroRaw[0].style, colSpan: 12, textAlign: 'left' },
          text: [
            'ከድሮው ድህረ ገጽ የተወሰዱ ሁሉም ፎቶዎች በዚህ ክፍል በተሟላ መዝገብ ተከማችተዋል።',
            'ከምድቦች ጋር የተያያዙ ፎቶዎች፣ የመዝሙር ቪዲዮዎች እና የስብከት መዝገቦች እዚህ ይገኛሉ።',
          ],
        },
      ],
    },
    {
      path: '/media-gallery/archive.json',
      contents: [
        {
          style: { textAlign: 'center' },
          title: 'የፎቶ መዝገብ ሙሉ ስብስብ',
        },
        {
          type: 'gallery',
          title: 'የድሮው ድህረ ገጽ ሁሉም ፎቶዎች',
          images: completeArchiveImages,
        },
      ],
    },
    {
      path: '/media-gallery/sermons.json',
      contents: [
        {
          style: { ...sermonRaw[0].style, colSpan: 12 },
          title: sermonRaw[0].title,
        },
        {
          type: 'sermon',
          style: { colSpan: 4 },
          title: sermonRaw[4].title,
          date: sermonRaw[4].date,
          preacher: sermonRaw[4].preacher,
          video: sermonRaw[4].video,
        },
        {
          type: 'sermon',
          style: { colSpan: 4 },
          title: sermonRaw[5].title,
          date: sermonRaw[5].date,
          preacher: sermonRaw[5].preacher,
          video: sermonRaw[5].video,
        },
        {
          type: 'sermon',
          style: { colSpan: 4 },
          title: sermonRaw[6].title,
          date: sermonRaw[6].date,
          preacher: sermonRaw[6].preacher,
          video: sermonRaw[6].video,
        },
      ],
    },
    {
      path: '/media-gallery/mezmur.json',
      contents: [
        {
          style: { ...mezmurRawItems[0].style, colSpan: 12 },
          title: mezmurRawItems[0].title,
          subTitle: mezmurRawItems[0].subTitle,
        },
        {
          type: 'sermon',
          style: { colSpan: 4 },
          title: mezmurRawItems[1].title,
          date: mezmurRawItems[1].date,
          preacher: mezmurRawItems[1].preacher,
          video: mezmurRawItems[1].video,
        },
        {
          type: 'sermon',
          style: { colSpan: 4 },
          title: mezmurRawItems[2].title,
          date: mezmurRawItems[2].date,
          preacher: mezmurRawItems[2].preacher,
          video: mezmurRawItems[2].video,
        },
        {
          type: 'sermon',
          style: { colSpan: 4 },
          title: mezmurRawItems[3].title,
          date: mezmurRawItems[3].date,
          preacher: mezmurRawItems[3].preacher,
          video: mezmurRawItems[3].video,
        },
      ],
    },
  ],
  about_reach_us: [
    {
      path: '/about-reach-us/history.json',
      contents: [
        {
          style: { ...historyRaw[0].style, colSpan: 12 },
          title: historyRaw[0].title,
          subTitle: historyRaw[0].subTitle,
        },
        {
          style: { ...historyRaw[2].style, colSpan: 12, textAlign: 'left' },
          text: historyRaw[2].text,
          link: { href: '/media-gallery', text: 'ፎቶዎች ይመልከቱ' },
        },
      ],
    },
    {
      path: '/about-reach-us/church-building.json',
      contents: [
        {
          style: { ...processStoryRaw[0].style, colSpan: 12 },
          title: processStoryRaw[0].title,
          subTitle: processStoryRaw[0].subTitle,
        },
        {
          style: { ...processStoryRaw[1].style, colSpan: 12, textAlign: 'justify', fontSize: 16 },
          text: processStoryRaw[1].text.slice(0, 2),
          link: { href: '/media-gallery', text: 'ፎቶዎች ይመልከቱ' },
        },
      ],
    },
    {
      path: '/about-reach-us/gallery-1.json',
      contents: [
        {
          style: { textAlign: 'center' },
          title: 'የአባቶች፣ ካህናት፣ ወንድሞች እና ዲያቆናት ቡድን',
        },
        {
          type: 'gallery',
          title: 'የአባቶች፣ ካህናት፣ ወንድሞች እና ዲያቆናት ቡድን',
          images: mapGalleryImages(aboutAlbumOne),
        },
      ],
    },
    {
      path: '/about-reach-us/gallery-2.json',
      contents: [
        {
          style: { textAlign: 'center' },
          title: 'የሰሜን ወሎ ሀገረ ስብከት አቡነ ኢረምያስ ከአገልጋይ ካህናት ጋር',
        },
        {
          type: 'gallery',
          title: 'የሰሜን ወሎ ሀገረ ስብከት አቡነ ኢረምያስ ከአገልጋይ ካህናት ጋር',
          images: mapGalleryImages(aboutAlbumTwo),
        },
      ],
    },
    {
      path: '/about-reach-us/welcome-story.json',
      contents: [
        {
          style: { ...welcomeStoryRaw[0].style, colSpan: 12 },
          title: 'የቤተ ክርስቲያኑ ታሪክ',
          subTitle: welcomeStoryRaw[0].subTitle,
        },
        {
          style: { ...welcomeStoryRaw[1].style, colSpan: 12, textAlign: 'justify' },
          text: welcomeStoryRaw[1].text,
        },
      ],
    },
    {
      path: '/about-reach-us/contact.json',
      contents: [
        {
          style: { ...heroRaw[0].style, colSpan: 12 },
          title: 'መገኛ እና ግንኙነት',
          subTitle: 'የቤተ ክርስቲያኑ አድራሻ፣ ስልክ እና ኢሜይል',
        },
        {
          style: { colSpan: 6, textAlign: 'left' },
          items: ['23010 84th Ave W, Edmonds, WA 98026', '(206) 492-1369', 'contactus@eotcdskm.org'],
          text: [
            'ለመንፈሳዊ ምክር፣ ለማመልከቻ ወይም ለአገልግሎት ቀጠሮ ቢፈልጉ በእነዚህ መንገዶች ይደውሉ።',
          ],
          link: { href: 'mailto:contactus@eotcdskm.org', text: 'ኢሜይል ይላኩ' },
        },
        {
          style: { colSpan: 6 },
          title: 'የሰበካ ጉባኤ የግንኙነት መረጃ',
          image: '/images/website-photos/dskm-brunch-2.jpg',
        },
      ],
    },
    {
      path: '/about-reach-us/faq.json',
      contents: [
        {
          style: { ...heroRaw[1].style, colSpan: 12 },
          title: 'FAQ እና የካህናት መገናኛ',
          subTitle: 'በተደጋጋሚ የሚጠየቁ ጉዳዮች እና የአገልግሎት መስመሮች',
        },
        {
          style: { colSpan: 12, textAlign: 'left' },
          items: [
            'ቀጠሮ እንዴት እጀምራለሁ?',
            'ለአባልነት የሚያስፈልጉት ምንድን ናቸው?',
            'ለጥምቀት ወይም ለሰርግ ምን መያዝ እችላለሁ?',
            'የንስሐ አባቶች መያዝ እንዴት ነው?',
          ],
          text: [
            'እያንዳንዱ ጥያቄ በቤተ ክርስቲያኑ ቢሮ ይመለሳል። የትዕዛዝ እና የአገልግሎት መስመሮችን ለመረዳት ከአገልጋዮች ጋር ይገናኙ።',
          ],
        },
      ],
    },
    {
      path: '/about-reach-us/leadership.json',
      contents: [
        {
          style: { ...footerRawSections[0].style, colSpan: 12 },
          title: 'ካህናት እና የአገልግሎት ምድቦች',
          subTitle: 'ትምህርት፣ ሥርዓት፣ የሰንበት ትምህርት እና የማኅበረሰብ አገልግሎት',
        },
        {
          style: { colSpan: 6, textAlign: 'left' },
          items: footerRawSections[0].text,
          text: [
            'እነዚህ ክፍሎች በቤተ ክርስቲያኑ ውስጥ የተለያዩ አገልግሎቶችን ይሸፍናሉ።',
          ],
        },
        {
          style: { colSpan: 6, textAlign: 'left' },
          items: footerRawSections[1].text,
          text: ['ለሰንበት ትምህርት ቤት አባላት እና ወጣቶች የተዘጋጀ መንገድ።'],
        },
      ],
    },
  ],
};

export const englishPages = {
  home: [
    {
      path: '/home/hero.json',
      contents: [
        {
          type: 'banner',
          style: heroRaw[0].style,
          title: 'The Ethiopian Orthodox Tewahedo Debre Selam Saint Michael Church of Seattle',
          subTitle: '',
          text: [
            'The Ethiopian Orthodox Tewahedo Debre Selam Saint Michael Church in Seattle, Washington was established on October 12, 1996 E.C. / 2003 A.D. by the will of God, with the blessing and paternal guidance of His Holiness Abune Mathias I, who was then the Archbishop of the North American Diocese and is now the sixth Patriarch of Ethiopia.',
          ],
        },
        {
          type: 'banner',
          style: heroRaw[1].style,
          title: '',
          subTitle: '',
          text: [
            'Please support the multipurpose building being constructed at our parish for children\'s classrooms, and for the residence of the fathers and guests.',
          ],
        },
        {
          style: heroRaw[2].style,
          html: [payPalHtml],
        },
        {
          style: heroRaw[3].style,
          title: '',
          subTitle: '',
        },
      ],
    },
    {
      path: '/home/history.json',
      contents: [
        {
          style: {
            ...historyRaw[0].style,
            colSpan: 12,
            backgroundImage: {
              url: parishFellowshipAsset,
              height: 460,
            },
          },
          title: 'A Brief History of Our Church',
          subTitle:
            'The Ethiopian Orthodox Tewahedo Debre Selam Saint Michael Church in Seattle, Washington was established on October 12, 1996 E.C. / 2003 A.D. by the will of God, with the blessing and paternal guidance of His Holiness Abune Mathias I, who was then the Archbishop of the North American Diocese and is now the sixth Patriarch of Ethiopia.',
          text: [
            'His Holiness named the parish Debre Selam. He also blessed and appointed the then organizers of the congregation, who were working to gather and coordinate the faithful: the venerable Father Wolde Semayat was appointed as the parish administrator with the title Melake Selam, and the elder Father Gebre Kidan was given the rank of Melake Mihret.',
            'At the time of its founding, the parish had fewer than 20 priests and faithful who had previously served and worshipped at Debre Medhanit Kidus Emmanuel Church. Later, after disagreements over liturgical order and other matters, young people from the Sunday school and faithful who had been displaced from Seattle Mekane Birhan Kidus Gebriel Church joined, and the parish continued to grow stronger.',
            'The work of the church was then organized by forming a parish council based on the Qale Awadi, the main church guideline, and by establishing the Sunday school as one of the parish service departments. The parish began by renting a room in an Elcentro Delarazo hall every Sunday from 6:00 a.m. to 12:00 p.m., and from that small beginning the church grew into the home of worship it is today.',
          ],
          link: { href: '/about-reach-us', text: 'Read more' },
        },
      ],
    },
    {
      path: '/home/upcoming-events.json',
      contents: [
        {
          style: { ...homeEventRaw[0].style, textAlign: 'center' },
          title: 'Upcoming Events',
        },
        ...homeEventRaw.slice(1).map((event) => ({
          type: 'event',
          image: event.image,
          title: 'Special Training on the Holy Liturgy',
          text: [
            'For all Orthodox believers in Seattle and the surrounding area, we have prepared a special training focused on the Holy Liturgy. The training will take place every Friday from February 20 to April 2 and will run for six consecutive weeks.',
          ],
          startTime: event.startTime,
          endTime: event.endTime,
          location: event.location,
        })),
        {
          style: { colSpan: 12, textAlign: 'center' },
          link: { href: '/media-gallery', text: 'See more' },
        },
      ],
    },
    {
      path: '/home/gallery-preview.json',
      contents: [
        {
          type: 'gallery',
          title: 'Photo archive',
          images: randomHomeGalleryImages(12),
          link: { href: '/media-gallery', text: 'See more' },
        },
      ],
    },
    {
      path: '/home/sermons-preview.json',
      contents: [
        {
          style: { ...sermonRaw[0].style, colSpan: 12 },
          title: 'Spiritual Teachings',
        },
        {
          type: 'sermon',
          style: { colSpan: 4 },
          title: 'He was waiting for the consolation of Israel.',
          date: '2020-02-16T00:00:00',
          preacher: 'By Deacon Eshitu Janfa',
          video: { id: '499862114240966', source: 'Facebook' },
        },
        {
          type: 'sermon',
          style: { colSpan: 4 },
          title: 'The Apparition of Mary',
          date: '2020-02-02T00:00:00',
          preacher: '(Annual Feast)',
          video: { id: '490645851829259', source: 'Facebook' },
        },
        {
          type: 'sermon',
          style: { colSpan: 4 },
          title: 'Pure Branch',
          date: '2020-02-02T00:00:00',
          preacher: 'By Elder Priest Abba Hailemikael',
          video: { id: '490603081833536', source: 'Facebook' },
        },
      ],
    },
  ],
  member: [
    {
      path: '/member/registration.json',
      contents: [
        {
          style: {
            ...heroRaw[0].style,
            colSpan: 12,
            minHeight: 420,
            backgroundImage: `linear-gradient(180deg, rgba(13, 27, 34, 0.22), rgba(13, 27, 34, 0.45)), url("${asset('static/images/album2/photo_2020-04-18_21-10-37.jpg')}")`,
            backgroundColor: 'transparent',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          },
          title: 'Membership Registration',
          subTitle: 'Member records and a welcome path for new parishioners',
        },
        {
          style: {
            ...heroRaw[1].style,
            colSpan: 12,
            textAlign: 'left',
            minHeight: 420,
            backgroundColor: 'transparent',
            backgroundImage: `linear-gradient(180deg, rgba(13, 27, 34, 0.16), rgba(13, 27, 34, 0.42)), url("${asset('static/images/album2/photo_2020-04-18_21-10-37.jpg')}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          },
          text: [
            'Registering as a member helps the church keep your family information and service needs up to date.',
            'New families, returning parishioners, and anyone who wants to follow the life of the parish are welcome here.',
          ],
          items: ['Family registration', 'Address updates', 'Service follow-up'],
          links: [
            { href: memberSignupUrl, text: 'Become a member' },
            { href: membershipApplicationPdf, text: 'Membership application form (PDF)' },
          ],
        },
      ],
    },
    {
      path: '/member/applications.json',
      contents: [
        {
          style: {
            ...historyRaw[0].style,
            colSpan: 12,
            minHeight: 420,
            backgroundImage: `linear-gradient(180deg, rgba(13, 27, 34, 0.24), rgba(13, 27, 34, 0.5)), url("${asset('static/images/album9/FB_IMG_1587267107930.jpg')}")`,
            backgroundColor: 'transparent',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          },
          title: 'Applications and Requests',
          subTitle: 'Guidance for baptism, wedding, and funeral requests',
        },
        {
          style: {
            colSpan: 12,
            textAlign: 'left',
            minHeight: 420,
            backgroundColor: 'transparent',
            backgroundImage: `linear-gradient(180deg, rgba(13, 27, 34, 0.16), rgba(13, 27, 34, 0.42)), url("${asset('static/images/album9/FB_IMG_1587267107930.jpg')}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          },
          items: ['Baptism request', 'Wedding scheduling', 'Funeral service request', 'Appointment for a service date'],
          text: [
            'Each request is reviewed according to church order. Contact the service team to confirm availability and guidance.',
          ],
          links: [
            { href: 'mailto:contactus@eotcdskm.org', text: 'Email the church' },
            { href: 'tel:+12064921369', text: 'Call the church' },
          ],
        },
      ],
    },
    {
      path: '/member/confession-and-counsel.json',
      contents: [
        {
          style: { ...processStoryRaw[0].style, colSpan: 12 },
          title: 'Confession Fathers and Spiritual Counsel',
          subTitle: 'Spiritual support and personal guidance for parishioners',
        },
        {
          style: { colSpan: 6, textAlign: 'left' },
          text: [
            'Confession fathers are available for spiritual direction, confession, and personal counsel.',
            'If you want to speak during the week or set an appointment, call the parish office.',
          ],
          items: ['Confession', 'Spiritual guidance', 'Family counsel'],
          link: { href: '/about-reach-us', text: 'Contact us' },
        },
        {
          style: { colSpan: 6 },
          title: 'Neseha Abat (Confession Fathers)',
          image: confessionFathersAsset,
        },
      ],
    },
    {
      path: '/member/giving.json',
      contents: [
        {
          style: { ...heroRaw[1].style, colSpan: 12 },
          title: 'Tithes, Donations, and Payment Options',
          subTitle: 'Ways to support the building fund and parish ministry',
        },
        {
          style: { ...heroRaw[1].style, colSpan: 6, textAlign: 'left' },
          text: [
            'You can give toward the building fund, monthly dues, and daily offerings.',
            'Online payment, parish office gifts, or direct contact with the church are all available.',
          ],
          items: ['Building support', 'Member dues', 'Gifts and charity'],
          link: { href: '/about-reach-us', text: 'Contact details' },
        },
        {
          style: { ...heroRaw[2].style, colSpan: 6 },
          html: [payPalHtml],
        },
      ],
    },
  ],
  services: [
    {
      path: '/services/liturgy.json',
      contents: [
        {
          style: {
            ...processStoryRaw[0].style,
            colSpan: 12,
            backgroundImage: {
              url: asset('static/images/album4/20200202_064137.jpg'),
              height: 520,
            },
          },
          backgroundVideo: '/images/kidase.mp4',
          title: 'Services & Worship',
          subTitle: 'Liturgy, fasting seasons, and the flow of parish worship',
        },
        {
          style: { ...processStoryRaw[1].style, colSpan: 12, textAlign: 'justify', fontSize: 16 },
          text: [
            'The church organizes daily prayers, fasting services, monthly liturgy, and a range of spiritual activities. Parishioners who want to follow a service schedule can contact the ministry team for details.',
          ],
          stackMedia: true,
          cards: [
            {
              title: 'Divine Liturgy',
              image: divineLiturgyAsset,
              text: 'Weekly and feast-day worship',
            },
            {
              title: 'Fasting Services',
              image: fastingServicesAsset,
              text: 'Prayer and worship through the fasting seasons',
            },
            {
              title: 'Parish Fellowship',
              image: parishFellowshipAsset,
              text: 'Community service and shared ministry',
            },
          ],
        },
      ],
    },
    {
      path: '/services/other-services.json',
      contents: [
        {
          style: { ...heroRaw[1].style, colSpan: 12 },
          title: 'Marriage & Youth Support',
          subTitle: 'Marriage counseling, youth guidance, and the youth development program',
        },
        {
          style: { colSpan: 12, textAlign: 'left' },
          text: [
            'Marriage and family counseling, along with youth guidance and mentoring, are organized here as a dedicated ministry. The youth development program specifically supports academic achievement through tutoring, builds ethics and character through mentorship, and provides life-skills training that helps young people make healthy choices and avoid harmful behaviors — including substance use and gambling.',
          ],
          pillars: ['Academic achievement', 'Ethics & mentorship', 'Healthy choices & prevention'],
          items: [
            'Marriage and family counseling',
            'Youth guidance and mentoring',
            'Youth development: tutoring, ethics, and healthy-choices training',
          ],
          stackMedia: true,
          cards: [
            {
              title: 'Counseling Services',
              image: counselingAsset,
              text: 'Marriage and youth support',
            },
            {
              title: 'Married Couples',
              placeholder: 'Photo of a married couple receiving counseling.',
            },
            {
              title: 'With Their Nisseha Abat',
              image: fathersAsset,
              text: 'Older youth receiving spiritual guidance from their Nisseha Abat',
            },
          ],
        },
      ],
    },
    {
      path: '/services/seniors.json',
      contents: [
        {
          style: {
            ...heroRaw[0].style,
            colSpan: 12,
            backgroundImage: {
              url: gradAsset,
              height: 500,
            },
          },
          title: 'Seniors & Elder Care',
          subTitle: 'Social engagement, health checkups, and celebrating our graduating seniors',
        },
        {
          style: { colSpan: 12, textAlign: 'left' },
          text: [
            'Senior gatherings, summer health checkups, and free vaccines administered by our parish nurses are shown here.',
            'Graduating high school, college, and graduate school seniors at every level are also recognized and celebrated as part of the parish family.',
          ],
          items: ['Senior social engagement', 'Summer health checkups', 'Free vaccines', 'Senior appreciation for graduates'],
          image: seniorsEldersAsset,
        },
      ],
    },
    {
      path: '/services/parenting.json',
      contents: [
        {
          style: { ...heroRaw[1].style, colSpan: 12 },
          title: 'Parenting Support',
          subTitle: 'Parenting classes, family devotion, and ongoing professional training',
        },
        {
          style: { colSpan: 12, textAlign: 'left' },
          text: [
            'Parenting training is offered to families throughout the year, helping households grow together in prayer and healthy relationships.',
          ],
          cards: [
            {
              title: 'Parenting Class',
              image: parentingAsset,
              text: 'Parenting training and family growth',
            },
            { title: 'Family & Devotion', text: 'Family life and formation topics' },
            { title: 'Professional Training', text: 'Sessions offered at different times of the year' },
          ],
        },
      ],
    },
    {
      path: '/services/fellowship.json',
      contents: [
        {
          style: { ...heroRaw[0].style, colSpan: 12 },
          title: 'Fellowship & Community Events',
          subTitle: 'Holidays, family days, and community gatherings',
        },
        {
          style: { colSpan: 12, textAlign: 'left' },
          text: ['Social holidays and fellowship gatherings are preserved here in a photo archive.'],
          carousel: {
            title: 'Social gatherings archive',
            images: [
              { original: asset('static/images/album8/FB_IMG_1587329073623.jpg'), caption: 'Thanksgiving image' },
              { original: asset('static/images/album8/FB_IMG_1587329087950.jpg'), caption: 'Park Day' },
              { original: asset('static/images/album8/FB_IMG_1587329104353.jpg'), caption: 'Addis Amet' },
              { original: asset('static/images/album8/FB_IMG_1587329137941.jpg'), caption: 'Buhe' },
              { original: asset('static/images/album8/FB_IMG_1587329152301.jpg'), caption: 'Church fellowship' },
              { original: adwaCelebrationAsset, caption: 'Adwa Victory Celebration — honoring the history of the Adwa Victory' },
              { original: adwaHistoryTalkAsset, caption: 'Adwa Victory Celebration — an elder shares the history of Adwa' },
              { original: adwaBegenaAsset, caption: 'Adwa Victory Celebration — begena performance celebrating Ethiopian cultural heritage' },
            ],
          },
        },
        {
          style: { colSpan: 12, textAlign: 'left' },
          title: 'International Women’s Day Conference',
          text: ['Women of the parish gather each year for a panel discussion on faith, family, and community.'],
          stackMedia: true,
          carousel: {
            title: 'International Women’s Day Conference',
            images: [
              { original: womensDayPanelAsset, caption: 'Panel discussion' },
              { original: womensDaySpeakersAsset, caption: 'Conference speakers' },
              { original: womensDayAudienceAsset, caption: 'Women of the parish gathered' },
            ],
          },
        },
      ],
    },
  ],
  sunday_school: [
    {
      path: '/sunday-school/service.json',
      contents: [
        {
          style: { ...sundaySchoolStoryRaw[0].style, colSpan: 12 },
          title: 'Sunday School Service',
          subTitle:
            'Fenote Selam Sunday School has provided strong spiritual service since the parish was founded. On the occasion of its fifth anniversary, His Grace Abune Marcos, then Bishop of the California and Northwest American Diocese, named it “Fenote Selam.”',
        },
        {
          style: { ...sundaySchoolStoryRaw[2].style, colSpan: 12, textAlign: 'justify', fontSize: 16 },
          text: [
            'Fenote Selam Sunday School has continued to serve the parish spiritually, socially, and educationally since the church was founded.',
            'It also supports the wider church by encouraging young people, building service-minded youth, and giving children and adolescents a clear path to grow as the next generation of the church.',
          ],
          pillars: ['Academic achievement', 'Ethics instruction', 'Substance & gambling prevention'],
        },
      ],
    },
    {
      path: '/sunday-school/registration.json',
      contents: [
        {
          style: { ...heroRaw[0].style, colSpan: 12 },
          title: 'Registration and Leaders',
          subTitle: 'Sunday school registration paths and the people who lead them',
        },
        {
          style: { colSpan: 6, textAlign: 'left' },
          items: ['Children registration', 'Teen class placement', 'Youth service', 'Meet the leaders'],
          text: [
            'Children and youth are grouped according to age and school level. Contact the administrators for registration details.',
            'Teaching children early helps them grow in the prayers, liturgy, and faith of the Ethiopian Orthodox Tewahedo Church.',
          ],
          links: [
            { href: sundaySchoolRegistrationUrl, text: 'Fenote Selam Sunday School registration form (16+)' },
            { href: '/about-reach-us', text: 'Get in touch' },
          ],
        },
        {
          style: { colSpan: 6 },
          image: 'static/images/album1/P_20170129-050115.png',
        },
      ],
    },
    {
      path: '/sunday-school/summer-camp.json',
      contents: [
        {
          style: { ...heroRaw[1].style, colSpan: 12 },
          title: 'Summer Camp and Youth Formation',
          subTitle: 'Academic growth, character formation, and healthy choices — woven through camp, reading, and service',
        },
        {
          style: { colSpan: 6, textAlign: 'left' },
          text: [
            'Summer camp brings the youth program to life — mezmur training, group activities, and mentorship that build character, responsibility, and the discipline to make healthy choices.',
            'Through camp and weekly community time, young people learn to navigate real pressures, including substance use, gambling, and risk-taking, with guidance rooted in shared values and community accountability.',
          ],
          items: ['Peer tutoring and reading', 'Ethics and character building', 'Healthy choices and life skills', 'Summer camp and mezmur'],
        },
        {
          style: { colSpan: 6 },
          image: 'static/images/album7/FB_IMG_1587260763953.jpg',
        },
        {
          style: { ...heroRaw[0].style, colSpan: 12 },
          title: 'Youth Empowerment and Childhood Literacy',
          subTitle: 'Academic achievement, ethical instruction, healthy choices, and cultural literacy — a complete foundation for the next generation.',
        },
        {
          style: { colSpan: 12, textAlign: 'left' },
          text: [
            "Empowering youth means equipping them with the tools to succeed — through academic support, ethical reasoning, and life skills that guide healthy, responsible choices. Cultural literacy in Amharic and Ge'ez grounds them in their heritage while broader mentorship prepares them for the world.",
          ],
          cards: [
            {
              tag: 'Academic Achievement',
              title: 'Tutoring & Reading Programs',
              text: 'Structured peer tutoring and age-appropriate reading tracks help students grow academically and reach their full potential in school and beyond.',
              placeholder: 'Youth tutoring and academic support session at the church.',
            },
            {
              tag: 'Ethics & Character',
              title: 'Values and Responsible Citizenship',
              text: 'Instruction in ethics, accountability, and community responsibility shapes youth who make thoughtful decisions and contribute positively to society.',
              placeholder: 'Youth ethics discussion or mentorship session at the church.',
            },
            {
              tag: 'Healthy Choices',
              title: 'Life Skills & Wellness',
              text: 'Practical training helps young people recognize and navigate risks — including substance use and gambling — so they grow up grounded, resilient, and healthy.',
              placeholder: 'Youth outdoor activity, healthy living, or group wellness event.',
            },
            {
              title: 'Fidel and Tracing',
              image: alphabetTracingAsset,
              text: 'Teaching fidel early helps children read prayers and church texts with confidence in the Ethiopian Orthodox Tewahedo tradition.',
            },
            {
              title: 'Amharic Reading',
              image: amharicReadingAsset,
              text: 'Learning to read Amharic helps children understand Orthodox teachings and spiritual messages more clearly.',
            },
            {
              title: 'Ge’ez Learning',
              image: 'static/images/album1/20170129_054437.jpg',
              text: 'Teaching Ge’ez prepares youth to serve the liturgy, mezmur, and sacred tradition of the Church more faithfully.',
            },
            {
              title: 'Youth Experience Sharing',
              image: youthExperienceAsset,
              text: 'Youth sharing high school and college experiences at a parish event',
            },
          ],
        },
        {
          style: { colSpan: 12, textAlign: 'left' },
          carousel: {
            title: 'Youth recreation and events',
            images: [
              { original: asset('static/images/album8/FB_IMG_1587329087950.jpg'), caption: 'Park day' },
              { original: asset('static/images/album8/FB_IMG_1587329092884.jpg'), caption: 'Soccer at church' },
              { original: asset('static/images/album8/FB_IMG_1587329104353.jpg'), caption: 'Thanksgiving image' },
              { original: asset('static/images/album8/FB_IMG_1587329137941.jpg'), caption: 'Youth fellowship' },
              { original: asset('static/images/album8/FB_IMG_1587329152301.jpg'), caption: 'Thanksgiving image' },
            ],
          },
        },
      ],
    },
    {
      path: '/sunday-school/media.json',
      contents: [
        {
          type: 'sermon',
          style: { colSpan: 4 },
          title: mezmurRawItems[1].title,
          date: mezmurRawItems[1].date,
          preacher: mezmurRawItems[1].preacher,
          video: mezmurRawItems[1].video,
        },
        {
          type: 'sermon',
          style: { colSpan: 4 },
          title: mezmurRawItems[8].title,
          date: mezmurRawItems[8].date,
          preacher: mezmurRawItems[8].preacher,
          video: mezmurRawItems[8].video,
        },
        {
          type: 'sermon',
          style: { colSpan: 4 },
          title: mezmurRawItems[9].title,
          date: mezmurRawItems[9].date,
          preacher: mezmurRawItems[9].preacher,
          video: mezmurRawItems[9].video,
        },
      ],
    },
  ],
  media_gallery: [
    {
      path: '/media-gallery/intro.json',
      contents: [
        {
          style: { ...heroRaw[0].style, colSpan: 12 },
          title: 'Media & Gallery',
          subTitle: 'Photo archives, mezmur, and sermon videos',
        },
        {
          style: { ...heroRaw[0].style, colSpan: 12, textAlign: 'left' },
          text: [
            'All legacy photos from the old site are preserved here in one archive.',
            'Photo sets tied to the church’s history, services, and community events are grouped alongside mezmur and sermon videos.',
          ],
        },
      ],
    },
    {
      path: '/media-gallery/archive.json',
      contents: [
        {
          style: { textAlign: 'center' },
          title: 'Complete Photo Archive',
        },
        {
          type: 'gallery',
          title: 'Complete Photo Archive',
          images: completeArchiveImages,
        },
      ],
    },
    {
      path: '/media-gallery/sermons.json',
      contents: [
        {
          style: { ...sermonRaw[0].style, colSpan: 12 },
          title: 'Spiritual Teachings',
        },
        {
          type: 'sermon',
          style: { colSpan: 4 },
          title: 'He was waiting for the consolation of Israel.',
          date: '2020-02-16T00:00:00',
          preacher: 'By Deacon Eshitu Janfa',
          video: { id: '499862114240966', source: 'Facebook' },
        },
        {
          type: 'sermon',
          style: { colSpan: 4 },
          title: 'The Apparition of Mary',
          date: '2020-02-02T00:00:00',
          preacher: '(Annual Feast)',
          video: { id: '490645851829259', source: 'Facebook' },
        },
        {
          type: 'sermon',
          style: { colSpan: 4 },
          title: 'Pure Branch',
          date: '2020-02-02T00:00:00',
          preacher: 'By Elder Priest Abba Hailemikael',
          video: { id: '490603081833536', source: 'Facebook' },
        },
      ],
    },
    {
      path: '/media-gallery/mezmur.json',
      contents: [
        {
          style: { ...mezmurRawItems[0].style, colSpan: 12 },
          title: 'Mezmur',
          subTitle: 'By Fenote Selam Children’s Sunday School',
        },
        {
          type: 'sermon',
          style: { colSpan: 4 },
          title: 'Christ was baptized, Christ was born',
          date: '2020-02-27T00:00:00',
          preacher: '',
          video: { id: '749Pg-SoyNM' },
        },
        {
          type: 'sermon',
          style: { colSpan: 4 },
          title: 'Christ was baptized, Christ was born',
          date: '2020-02-02T00:00:00',
          preacher: 'By the children’s choir',
          video: { id: 'eCkVpcAduR0' },
        },
        {
          type: 'sermon',
          style: { colSpan: 4 },
          title: '',
          date: '2020-01-07T00:00:00',
          preacher: '',
          video: { id: 'IgSxnmH0ND4' },
        },
      ],
    },
  ],
  about_reach_us: [
    {
      path: '/about-reach-us/history.json',
      contents: [
        {
          style: { ...historyRaw[0].style, colSpan: 12 },
          title: 'A Brief History of Our Church',
          subTitle:
            'The Ethiopian Orthodox Tewahedo Debre Selam Saint Michael Church in Seattle, Washington was established on October 12, 1996 E.C. / 2003 A.D. by the will of God, with the blessing and paternal guidance of His Holiness Abune Mathias I, who was then the Archbishop of the North American Diocese and is now the sixth Patriarch of Ethiopia.',
        },
        {
          style: { ...historyRaw[2].style, colSpan: 12, textAlign: 'left' },
          text: [
            'His Holiness named the parish Debre Selam. He also blessed and appointed the then organizers of the congregation, who were working to gather and coordinate the faithful: the venerable Father Wolde Semayat was appointed as the parish administrator with the title Melake Selam, and the elder Father Gebre Kidan was given the rank of Melake Mihret.',
            'At the time of its founding, the parish had fewer than 20 priests and faithful who had previously served and worshipped at Debre Medhanit Kidus Emmanuel Church. Later, after disagreements over liturgical order and other matters, young people from the Sunday school and faithful who had been displaced from Seattle Mekane Birhan Kidus Gebriel Church joined, and the parish continued to grow stronger.',
            'The work of the church was then organized by forming a parish council based on the Qale Awadi, the main church guideline, and by establishing the Sunday school as one of the parish service departments.',
          ],
          link: { href: '/media-gallery', text: 'View gallery' },
        },
      ],
    },
    {
      path: '/about-reach-us/church-building.json',
      contents: [
        {
          style: { ...processStoryRaw[0].style, colSpan: 12 },
          title: 'The Process of Searching for and Purchasing a Church Building',
          subTitle:
            'The parish grew by first renting a hall, then organizing a building committee, and finally purchasing a church home of its own.',
        },
        {
          style: { ...processStoryRaw[1].style, colSpan: 12, textAlign: 'justify', fontSize: 16 },
          text: [
            'The church first found a hall in the center of the city that could ease the shortage of space and allow worship to continue while the parish kept growing.',
            'Although the hall was rented and needed cleaning and modest repairs, it allowed the parish to continue its monthly services, fasting prayers, special gospel gatherings, and other parish ministries at the times they were needed.',
          ],
          link: { href: '/media-gallery', text: 'View photos' },
        },
      ],
    },
    {
      path: '/about-reach-us/welcome-story.json',
      contents: [
        {
          style: { ...welcomeStoryRaw[0].style, colSpan: 12 },
          title: 'Church History',
          subTitle: welcomeStoryRaw[0].subTitle,
        },
        {
          style: { ...welcomeStoryRaw[1].style, colSpan: 12, textAlign: 'justify' },
          text: [
            'His Holiness named the parish Debre Selam. He blessed the organizers who were working to gather and coordinate the faithful, appointing the venerable Father Wolde Semayat as the parish administrator with the title Melake Selam and granting the elder Father Gebre Kidan the rank of Melake Mihret.',
            'At the time of its founding, the parish had fewer than 20 clergy and faithful who had previously served at Debre Medhanit Kidus Emmanuel Church. Later, Sunday school youth and faithful who had been displaced from Seattle Mekane Birhan Kidus Gebriel Church joined the parish, and it continued to grow. The work of the church was organized by adopting the Qale Awadi as the main guideline, electing a parish council, and establishing the Sunday school as one of the service departments.',
          ],
        },
      ],
    },
    {
      path: '/about-reach-us/contact.json',
      contents: [
        {
          style: { ...heroRaw[0].style, colSpan: 12 },
          title: 'Reach Us',
          subTitle: 'Church address, phone number, and email',
        },
        {
          style: { colSpan: 6, textAlign: 'left' },
          items: ['23010 84th Ave W, Edmonds, WA 98026', '(206) 492-1369', 'contactus@eotcdskm.org'],
          text: ['Call or email for spiritual counsel, applications, or service appointments.'],
          link: { href: 'mailto:contactus@eotcdskm.org', text: 'Send email' },
        },
        {
          style: { colSpan: 6 },
          title: 'Sebeke Gubae Contacts',
          image: '/images/website-photos/dskm-brunch-2.jpg',
        },
      ],
    },
    {
      path: '/about-reach-us/faq.json',
      contents: [
        {
          style: { ...heroRaw[1].style, colSpan: 12 },
          title: 'FAQ and Clergy Communication',
          subTitle: 'Frequently asked questions and service contact points',
        },
        {
          style: { colSpan: 12, textAlign: 'left' },
          items: [
            'How do I book an appointment?',
            'What do I need for membership?',
            'What should I bring for baptism or wedding requests?',
            'How do I contact the confession fathers?',
          ],
          text: [
            'Each request is handled by the parish office. Contact the service team to understand schedules, requirements, and parish order.',
          ],
        },
      ],
    },
    {
      path: '/about-reach-us/leadership.json',
      contents: [
        {
          style: { ...footerRawSections[0].style, colSpan: 12 },
          title: 'Clergy and Ministry Areas',
          subTitle: 'Teaching, liturgy, Sunday school, and community service',
        },
        {
          style: { colSpan: 6, textAlign: 'left' },
          items: ['Gospel teaching', 'Liturgical teaching', 'Liturgy', 'Christian doctrine', 'Funeral rites', 'Counsel of the elders'],
          text: ['These service areas cover much of parish life beyond Sunday worship.'],
        },
        {
          style: { colSpan: 6, textAlign: 'left' },
          items: ['Youth', 'Adolescents', 'Children'],
          text: ['Sunday school is organized for all ages with age-specific teaching and care.'],
        },
      ],
    },
  ],
};

export const footerSectionsByLang = {
  am: [
    {
      ...footerRawSections[0],
      text: [
        ...footerRawSections[0].text,
        footerLink('/services#liturgy', 'የሥርዓት አገልግሎት'),
        footerLink('/services#other-services', 'ሌሎች አገልግሎቶች'),
        footerLink('/member#registration', 'አባልነት መመዝገብ'),
      ],
    },
    {
      ...footerRawSections[1],
      text: [
        footerLink('/sunday-school#service', 'የሰንበት ትምህርት አገልግሎት'),
        footerLink('/sunday-school#registration', 'ምዝገባ እና መሪዎች'),
        footerLink('/sunday-school#summer-camp', 'የበጋ ካምፕ እና የወጣቶች እድገት'),
      ],
    },
    footerRawSections[2],
    {
      ...footerRawSections[3],
      title: 'ያግኙን',
    },
  ],
  en: [
    {
      ...footerRawSections[0],
      title: 'Services',
      text: [
        'Gospel teaching',
        'Liturgical teaching',
        'Liturgy',
        'Christian doctrine',
        'Funeral rites',
        'Counsel of the elders',
        footerLink('/services#liturgy', 'Services & Worship'),
        footerLink('/services#other-services', 'Other Services'),
        footerLink('/member#registration', 'Member Services'),
      ],
    },
    {
      ...footerRawSections[1],
      title: 'Sunday School',
      text: [
        footerLink('/sunday-school#service', 'Sunday School Service'),
        footerLink('/sunday-school#registration', 'Registration and Leaders'),
        footerLink('/sunday-school#summer-camp', 'Summer Camp and Youth Formation'),
      ],
    },
    {
      ...footerRawSections[2],
      title: 'Address',
      text: ['23010 84th Ave W,', 'Edmonds, WA', '98026'],
    },
    {
      ...footerRawSections[3],
      title: 'Contact us',
      text: ['(206) 492-1369', 'contactus@eotcdskm.org'],
      html: footerRawSections[3].html,
    },
  ],
};

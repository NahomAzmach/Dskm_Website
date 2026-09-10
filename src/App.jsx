import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  ChevronDown,
  Facebook,
  ExternalLink,
  ImageIcon,
  Menu,
  Languages,
  CalendarDays,
  MapPin,
  Phone,
} from 'lucide-react';
import {
  amharicPages,
  englishPages,
  footerSectionsByLang,
  pageIntroCopy,
  routeOrder,
  homeQuickLinks,
  offeringsPreview,
} from './content';
import { asset, resolveAsset, thumbAsset } from './assets';
import { PLACEHOLDER_IMAGES } from './mediaLibrary';
import {
  decodeHtml,
  formatDate,
  formatTime,
  getVideoEmbedSrc,
  getVideoOpenUrl,
  isActionLink,
  isDocumentLink,
  isExternalLink,
  stripTitle,
  toEthiopian,
} from './siteUtils';
import eventsData from './events.json';

const PAGE_COPY = {
  am: pageIntroCopy.am,
  en: pageIntroCopy.en,
};

const HEADER_NAV = routeOrder
  .filter((route) => route.showInNav !== false)
  .map((route) => ({ path: route.path, key: route.key, labelAm: route.labelAm, labelEn: route.labelEn }));

const SOCIAL = {
  phone: '(206) 492-1369',
  email: 'us.secretary@eotcdskm.org',
  address: '23010 84th Ave W, Edmonds, WA 98026',
};

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('eotcdskm-lang') || 'en');
  useEffect(() => {
    localStorage.setItem('eotcdskm-lang', lang);
    document.documentElement.lang = lang === 'am' ? 'am' : 'en';
  }, [lang]);

  return (
    <SiteFrame lang={lang} setLang={setLang} />
  );
}

function SiteFrame({ lang, setLang }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const pages = lang === 'am' ? amharicPages : englishPages;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  const currentRoute = routeOrder.find((route) => route.path === location.pathname) ?? routeOrder[0];
  const intro = PAGE_COPY[lang][currentRoute.key] || '';

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="topbar">
        <div className="brand-row">
          <button className="brand-mark" onClick={() => navigate('/')} type="button" aria-label="Go home">
            <span className="brand-mark__logo-wrap">
              <img className="brand-mark__logo" src={asset('favicon.ico')} alt="" aria-hidden="true" />
            </span>
            <span className="brand-mark__text">
              <strong>{lang === 'am' ? 'ደብረ ሰላም ቅዱስ ሚካኤል' : 'Debre Selam Kidus Michael'}</strong>
              <span>{lang === 'am' ? 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን' : 'Ethiopian Orthodox Tewahedo Church'}</span>
            </span>
          </button>

          <div className="toolbar-actions">
            <LangSwitch lang={lang} setLang={setLang} />
            <MobileNav items={HEADER_NAV} lang={lang} />
          </div>
        </div>

        <nav className="desktop-nav" aria-label="Primary">
          {HEADER_NAV.map((item) => {
            const sections = ROUTE_SECTIONS[item.key];
            const label = lang === 'am' ? item.labelAm : item.labelEn;
            if (sections?.length) {
              return <NavDropdown key={item.path} item={item} label={label} sections={sections} lang={lang} />;
            }
            return (
              <NavLink key={item.path} to={item.path} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                {label}
              </NavLink>
            );
          })}
        </nav>
      </header>

      <main id="main-content" className="main-content">
        {isHome ? (
          <HomeHero lang={lang} />
        ) : (
          <section className="page-intro">
            <div className="page-intro__inner">
              <p className="eyebrow">{lang === 'am' ? 'የቤተ ክርስቲያኑ መረጃ' : 'Church information'}</p>
              <h1>{lang === 'am' ? currentRoute.labelAm : currentRoute.labelEn}</h1>
              <p>{intro}</p>
            </div>
          </section>
        )}

        <Routes>
          {routeOrder.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<ContentPage routeKey={route.key} pages={pages} lang={lang} isHome={route.key === 'home'} />}
            />
          ))}
        </Routes>
      </main>

      <Footer lang={lang} />
    </div>
  );
}

function LangSwitch({ lang, setLang }) {
  return (
    <div className="lang-switch" role="group" aria-label="Language toggle">
      <button type="button" className={lang === 'am' ? 'selected' : ''} onClick={() => setLang('am')}>
        አማርኛ
      </button>
      <button type="button" className={lang === 'en' ? 'selected' : ''} onClick={() => setLang('en')}>
        English
      </button>
      <Languages className="lang-icon" aria-hidden="true" />
    </div>
  );
}

function NavDropdown({ item, label, sections, lang }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="nav-dropdown"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <NavLink
        to={item.path}
        className={({ isActive }) => `nav-link nav-dropdown__toggle ${isActive ? 'active' : ''}`}
        onClick={() => setOpen(false)}
        aria-expanded={open}
      >
        <span>{label}</span>
        <ChevronDown size={14} aria-hidden="true" />
      </NavLink>
      {open && (
        <div className="nav-dropdown__panel">
          {sections.map((section) => (
            <a
              key={section.anchor}
              className="nav-dropdown__link"
              href={`${item.path}#${section.anchor}`}
              onClick={() => setOpen(false)}
            >
              {lang === 'am' ? section.am : section.en}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileNav({ items, lang }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const close = () => {
    setOpen(false);
    setExpanded(null);
  };

  return (
    <div className="mobile-nav">
      <button type="button" className="menu-button" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <Menu size={18} />
      </button>
      {open && (
        <div className="mobile-nav__panel">
          {items.map((item) => {
            const sections = ROUTE_SECTIONS[item.key];
            const label = lang === 'am' ? item.labelAm : item.labelEn;
            if (sections?.length) {
              const isExpanded = expanded === item.key;
              return (
                <div key={item.path} className="mobile-nav__group">
                  <div className="mobile-nav__row">
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `mobile-nav__link ${isActive ? 'active' : ''}`}
                      onClick={close}
                    >
                      {label}
                    </NavLink>
                    <button
                      type="button"
                      className="mobile-nav__expand"
                      aria-expanded={isExpanded}
                      aria-label={lang === 'am' ? 'ንዑስ ክፍሎችን አሳይ' : 'Show sub-sections'}
                      onClick={() => setExpanded(isExpanded ? null : item.key)}
                    >
                      <ChevronDown size={16} className={isExpanded ? 'is-open' : ''} />
                    </button>
                  </div>
                  {isExpanded && (
                    <div className="mobile-nav__sublist">
                      {sections.map((section) => (
                        <a
                          key={section.anchor}
                          className="mobile-nav__sublink"
                          href={`${item.path}#${section.anchor}`}
                          onClick={close}
                        >
                          {lang === 'am' ? section.am : section.en}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `mobile-nav__link ${isActive ? 'active' : ''}`}
                onClick={close}
              >
                {label}
              </NavLink>
            );
          })}
        </div>
      )}
    </div>
  );
}

const ROUTE_SECTIONS = {
  home: [
    { anchor: 'history', am: 'ታሪክ', en: 'History' },
    { anchor: 'upcoming-events', am: 'ቀጣይ ዝግጅቶች', en: 'Upcoming Events' },
    { anchor: 'gallery-preview', am: 'ፎቶዎች', en: 'Gallery' },
  ],
  member: [
    { anchor: 'registration', am: 'ምዝገባ', en: 'Registration' },
    { anchor: 'applications', am: 'ማመልከቻዎች', en: 'Applications' },
    { anchor: 'confession-and-counsel', am: 'ንስሐ እና ምክር', en: 'Confession & Counsel' },
    { anchor: 'giving', am: 'መዋጮ', en: 'Giving' },
  ],
  services: [
    { anchor: 'liturgy', am: 'ሥርዓተ አገልግሎት', en: 'Worship & Liturgy' },
    { anchor: 'other-services', am: 'ወጣቶች እና ትዳር', en: 'Marriage & Youth' },
    { anchor: 'seniors', am: 'የእድሜ ባለጸጎች', en: 'Seniors & Elder Care' },
    { anchor: 'health-day', am: 'የጤና ቀን', en: 'Health Day' },
    { anchor: 'parenting', am: 'የወላጆች ሥልጠና', en: 'Parenting' },
    { anchor: 'fellowship', am: 'ማኅበራዊ ኅብረት', en: 'Fellowship & Events' },
  ],
  sunday_school: [
    { anchor: 'service', am: 'አገልግሎት', en: 'Service' },
    { anchor: 'registration', am: 'ምዝገባ እና መሪዎች', en: 'Registration & Leaders' },
    { anchor: 'summer-camp', am: 'የበጋ ካምፕ እና እድገት', en: 'Summer Camp & Formation' },
  ],
  media_gallery: [
    { anchor: 'intro', am: 'መግቢያ', en: 'Overview' },
    { anchor: 'archive', am: 'የፎቶ መዝገብ', en: 'Photo Archive' },
  ],
  about_reach_us: [
    { anchor: 'history', am: 'ታሪክ', en: 'History' },
    { anchor: 'contact', am: 'አድራሻ', en: 'Contact' },
    { anchor: 'faq', am: 'ተደጋጋሚ ጥያቄዎች', en: 'FAQ' },
  ],
};

function SectionJumpNav({ links, lang }) {
  return (
    <nav className="section-jumpnav" aria-label={lang === 'am' ? 'በገጽ ላይ ዝውውር' : 'Jump to section'}>
      {links.map((link) => (
        <a key={link.anchor} className="section-jumpnav__link" href={`#${link.anchor}`}>
          {lang === 'am' ? link.am : link.en}
        </a>
      ))}
    </nav>
  );
}

function ContentPage({ routeKey, pages, lang, isHome }) {
  const groups = pages[routeKey] || [];
  const sectionLinks = ROUTE_SECTIONS[routeKey];
  const visibleGroups = isHome
    ? groups.slice(1).filter((group) => group.path !== '/home/upcoming-events.json')
    : groups;
  const plan = buildPagePlan(visibleGroups);

  return (
    <div className={`page page-${routeKey} ${isHome ? 'page-home' : ''}`}>
      {sectionLinks && <SectionJumpNav links={sectionLinks} lang={lang} />}
      {isHome && groups[0]?.contents && (
        <HomeFeatureGrid lang={lang} donateBlock={groups[0].contents[1]} donateHtml={groups[0].contents[2]} />
      )}
      {isHome && <HomeQuickLinks lang={lang} />}
      {isHome && <HomeCalendarSection lang={lang} events={eventsData} />}
      {visibleGroups.map((group, index) => (
        <ContentGroup
          key={group.path || index}
          group={group}
          groupIndex={index}
          lang={lang}
          routeKey={routeKey}
          isHome={isHome}
          plan={plan[index]}
        />
      ))}
    </div>
  );
}

function HomeHero({ lang }) {
  const pages = lang === 'am' ? amharicPages : englishPages;
  const hero = pages.home?.[0]?.contents?.[0];
  const history = pages.home?.[1]?.contents?.[0];

  return (
    <section className="home-hero">
      <div className="home-hero__inner">
        <div className="home-hero__copy">
          <p className="eyebrow">{lang === 'am' ? 'የቤተ ክርስቲያኑ ዋና መግቢያ' : 'Church home and ministry'}</p>
          <h1>{hero?.title}</h1>
          <div className="hero-actions">
            <Link className="hero-action hero-action--solid" to="/about-reach-us">
              {lang === 'am' ? 'ስለ እኛ' : 'About'}
            </Link>
            <Link className="hero-action" to="/services">
              {lang === 'am' ? 'አገልግሎቶች' : 'Services'}
            </Link>
            <Link className="hero-action" to="/media-gallery">
              {lang === 'am' ? 'ፎቶዎች' : 'Gallery'}
            </Link>
          </div>

          <div className="hero-chips">
            <HeroChip icon={<MapPin size={15} />} label="Edmonds, WA" />
            <HeroChip icon={<CalendarDays size={15} />} label={lang === 'am' ? 'አገልግሎቶች እና ዝግጅቶች' : 'Services and events'} />
            <HeroChip icon={<Phone size={15} />} label="(206) 492-1369" />
          </div>
        </div>

        <div className="home-hero__panel">
          <div className="hero-art hero-art--large">
            <img
              src={asset('static/images/background/photo_2020-09-19_18-01-56.jpg')}
              alt={stripTitle(hero?.title)}
              fetchpriority="high"
              decoding="async"
              width="1063"
              height="1280"
            />
            <div className="hero-art__caption">
              <span>{lang === 'am' ? 'የቤተ ክርስቲያኑ እይታ' : 'Church view'}</span>
              <strong>{lang === 'am' ? 'እምነት፣ ታሪክ እና አገልግሎት' : 'Faith, history, and service'}</strong>
            </div>
          </div>

          <div className="hero-stack">
            <OfferingsPreview lang={lang} />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroChip({ icon, label }) {
  return (
    <span className="hero-chip">
      {icon}
      {label}
    </span>
  );
}

function OfferingsPreview({ lang }) {
  const data = offeringsPreview[lang] || offeringsPreview.en;
  const tabKeys = Object.keys(data.groups);
  const [activeTab, setActiveTab] = useState(tabKeys[0]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const group = data.groups[activeTab] || data.groups[tabKeys[0]];
  const items = group.items;

  useEffect(() => {
    if (paused || items.length < 2) return undefined;
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, 4000);
    return () => window.clearInterval(interval);
  }, [paused, items.length, activeTab]);

  const handleTab = (key) => {
    setActiveTab(key);
    setIndex(0);
    setPaused(true);
  };

  const item = items[index % items.length];

  return (
    <article className="offerings-preview">
      <header className="offerings-preview__header">
        <span className="offerings-preview__eyebrow">{data.eyebrow}</span>
        <h3 className="offerings-preview__headline">{data.headline}</h3>
        <ul className="offerings-preview__tags">
          {data.impactTags.map((tag) => (
            <li key={tag} className="offerings-preview__tag">{tag}</li>
          ))}
        </ul>
      </header>

      <nav className="offerings-preview__tabs" aria-label={data.eyebrow}>
        {tabKeys.map((key) => (
          <button
            key={key}
            type="button"
            className={`offerings-preview__tab ${key === activeTab ? 'is-active' : ''}`}
            aria-pressed={key === activeTab}
            onClick={() => handleTab(key)}
          >
            {data.groups[key].label}
          </button>
        ))}
      </nav>

      <Link className="offerings-preview__page-link" to={group.href}>
        {lang === 'am' ? `ወደ ${group.label} ገጽ ይሂዱ` : `Visit the ${group.label} page`}
        <ChevronRight size={14} />
      </Link>

      {item && (
        <Link className="offerings-preview__feature" to={group.href}>
          <span className="offerings-preview__media">
            <img key={`${activeTab}-${item.image}`} src={thumbAsset(item.image)} alt={stripTitle(item.title)} loading="lazy" decoding="async" />
          </span>
          <span className="offerings-preview__copy">
            <strong key={`${activeTab}-${item.title}`}>{item.title}</strong>
            <p>{item.text}</p>
          </span>
          <span className="offerings-preview__dots" aria-hidden="true">
            {items.map((dotItem, dotIndex) => (
              <span key={dotItem.title} className={`offerings-preview__dot ${dotIndex === index ? 'is-active' : ''}`} />
            ))}
          </span>
        </Link>
      )}
    </article>
  );
}

function HomeQuickLinks({ lang }) {
  const links = homeQuickLinks[lang] || homeQuickLinks.en;
  return (
    <section className="home-quick-links">
      <div className="home-quick-links__inner">
        {links.map((item) => (
          <a key={item.href} className="home-feature home-quick-link" href={item.href} target="_blank" rel="noreferrer">
            <strong>{item.title}</strong>
            <p>{item.text}</p>
            <span className="home-quick-link__cta">
              {item.cta}
              <ExternalLink size={14} />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

// The church story belongs to the history section and the About page; the
// homepage keeps only the building-fund appeal that has nowhere else to live.
function HomeFeatureGrid({ lang, donateBlock, donateHtml }) {
  return (
    <section className="home-feature-grid">
      <div className="home-feature-grid__inner">
        <article className="home-feature home-feature--donate">
          {donateBlock?.text?.[0] && <p>{donateBlock.text[0]}</p>}
          <div className="home-feature__html" dangerouslySetInnerHTML={{ __html: decodeHtml(donateHtml?.html?.[0] || '') }} />
        </article>
      </div>
    </section>
  );
}

/* ── Layout vocabulary ─────────────────────────────────────────────
   Pages read as compositions rather than stacks of cards. One group of
   source blocks becomes one section: an opening (a full-bleed feature
   banner or a plain editorial heading) followed by rows that alternate
   between split, stacked, and prose treatments.                        */

const WIDE_MEDIA = new Set(['clips', 'carousel', 'cards', 'ladder']);

function mediaKind(block) {
  if (block.placeholder) return 'placeholder';
  if (block.videoClips?.length) return 'clips';
  if (block.carousel?.images?.length) return 'carousel';
  if (block.ladder?.length) return 'ladder';
  if (block.cards?.length) return 'cards';
  if (block.video) return 'video';
  if (block.image) return 'figure';
  return '';
}

// Portrait-shaped photographs lose their subject in the default banner band.
function blockBackdropZoom(block) {
  const bg = block?.style?.backgroundImage;
  return typeof bg === 'object' && bg?.zoom ? bg.zoom : '';
}

function blockBackdrop(block) {
  const special = getSpecialBannerBackdrop(block?.title);
  if (special) return special;
  const bg = block?.style?.backgroundImage;
  if (!bg) return '';
  // The source data stores a plain path, a css url(), or a gradient stacked
  // on top of one — all of them under either a string or a { url } object.
  const value = typeof bg === 'object' ? bg.url || '' : bg;
  if (!value) return '';
  const match = /url\((["']?)([^"')]+)\1\)/.exec(value);
  if (match) return resolveAsset(match[2]);
  return value.includes('gradient(') ? '' : resolveAsset(value);
}

// A block carrying nothing but a heading is the section's opening line.
function isHeadingBlock(block) {
  if (!block || block.type || !block.title) return false;
  return !(
    block.text?.length ||
    block.items?.length ||
    block.cards?.length ||
    block.carousel?.images?.length ||
    block.videoClips?.length ||
    block.html?.length ||
    block.image ||
    block.video ||
    block.placeholder ||
    block.link ||
    block.links?.length
  );
}

// A lone captioned photograph is the section's picture, not a separate item.
function isCaptionFigure(block) {
  return (
    !block.type &&
    Boolean(block.image) &&
    Boolean(block.title) &&
    !block.subTitle &&
    !block.text?.length &&
    !block.items?.length &&
    !block.link &&
    !block.links?.length
  );
}

// A photograph anchors a page only once. Repeated backdrops in the source data
// become plain headings; an unused backdrop on a body block is promoted into a
// real image beside the text; and a heading with no picture of its own adopts
// the section's standalone photograph instead of leaving it stranded below.
function buildPagePlan(groups) {
  const used = new Set();
  return groups.map((group) => {
    const blocks = group.contents || [];
    const lead = isHeadingBlock(blocks[0]) ? blocks[0] : null;
    const body = lead ? blocks.slice(1) : blocks;

    let backdrop = lead ? blockBackdrop(lead) : '';
    const video = lead?.backgroundVideo || '';
    const key = video || backdrop;
    let feature = Boolean(key) && !used.has(key);
    if (key) used.add(key);

    let liftedIndex = -1;
    if (lead && !key) {
      const index = body.findIndex(isCaptionFigure);
      const url = index === -1 ? '' : resolveAsset(body[index].image);
      if (url && !used.has(url)) {
        used.add(url);
        backdrop = url;
        feature = true;
        liftedIndex = index;
      }
    }

    const promoted = visibleBody(body, liftedIndex).map((block) => {
      if (block.type || mediaKind(block)) return '';
      const url = blockBackdrop(block);
      if (!url || used.has(url)) return '';
      used.add(url);
      return url;
    });

    return { feature, backdrop, video, promoted, liftedIndex, zoom: lead ? blockBackdropZoom(lead) : '' };
  });
}

function visibleBody(body, liftedIndex) {
  return liftedIndex === -1 ? body : body.filter((_, index) => index !== liftedIndex);
}

// Blocks the source data marks as half-width pair up into one row;
// consecutive sermons collect into a featured media wall.
function buildRows(blocks) {
  const rows = [];
  let pair = null;
  let wall = null;

  for (const block of blocks) {
    if (block.type === 'sermon') {
      pair = null;
      if (!wall) {
        wall = { kind: 'wall', blocks: [] };
        rows.push(wall);
      }
      wall.blocks.push(block);
      continue;
    }
    wall = null;

    const span = Number(block.style?.colSpan) || 12;
    if (!block.type && span <= 6) {
      if (!pair) {
        pair = { kind: 'pair', blocks: [] };
        rows.push(pair);
      }
      pair.blocks.push(block);
      if (pair.blocks.length === 2) pair = null;
      continue;
    }

    pair = null;
    rows.push({ kind: 'full', blocks: [block] });
  }

  return rows.map((row) => (row.kind === 'pair' && row.blocks.length === 1 ? { kind: 'full', blocks: row.blocks } : row));
}

function ContentGroup({ group, groupIndex, lang, routeKey, isHome, plan }) {
  const blocks = group.contents || [];
  const anchor = group.path?.split('/').filter(Boolean).pop()?.replace(/\.json$/, '') || `${routeKey}-${groupIndex}`;
  const lead = isHeadingBlock(blocks[0]) ? blocks[0] : null;
  const body = visibleBody(lead ? blocks.slice(1) : blocks, plan?.liftedIndex ?? -1);
  const promoted = plan?.promoted || [];

  const navSection = ROUTE_SECTIONS[routeKey]?.find((section) => section.anchor === anchor);
  const eyebrow = navSection ? (lang === 'am' ? navSection.am : navSection.en) : '';
  const number = isHome ? '' : String(groupIndex + 1).padStart(2, '0');
  const flip = groupIndex % 2 === 1;

  const rows = buildRows(body);
  let bodyIndex = 0;

  return (
    <Reveal as="section" id={anchor} className={`section ${plan?.feature ? 'section--feature' : ''}`}>
      {lead &&
        (plan?.feature ? (
          <FeatureBanner block={lead} image={plan.backdrop} video={plan.video} zoom={plan.zoom} eyebrow={eyebrow} number={number} />
        ) : (
          <SectionIntro block={lead} eyebrow={eyebrow} number={number} />
        ))}

      {rows.length > 0 && (
        <div className="section__body">
          {rows.map((row, rowIndex) => {
            const first = bodyIndex;
            bodyIndex += row.blocks.length;

            if (row.kind === 'wall') {
              return <MediaWall key={rowIndex} blocks={row.blocks} lang={lang} />;
            }
            if (row.kind === 'pair') {
              // Only swap column order when a photograph is what moves;
              // two text columns would just read out of sequence.
              const pairFlip = flip && row.blocks.some((block) => mediaKind(block));
              return (
                <div key={rowIndex} className={`row-pair ${pairFlip ? 'row-pair--flip' : ''}`}>
                  {row.blocks.map((block, index) => (
                    <Block key={index} block={block} lang={lang} layout="pair" promotedImage={promoted[first + index]} />
                  ))}
                </div>
              );
            }

            const block = row.blocks[0];
            if (isHeadingBlock(block)) {
              return <SectionIntro key={rowIndex} block={block} nested />;
            }
            return (
              <Block
                key={rowIndex}
                block={block}
                lang={lang}
                layout="full"
                flip={flip}
                promotedImage={promoted[first]}
                leadTitle={lead?.title || ''}
              />
            );
          })}
        </div>
      )}
    </Reveal>
  );
}

function SectionEyebrow({ number, label }) {
  if (!number && !label) return null;
  return (
    <p className="section-eyebrow">
      {number && <span className="section-eyebrow__num">{number}</span>}
      {label && <span className="section-eyebrow__label">{label}</span>}
    </p>
  );
}

function SectionIntro({ block, eyebrow, number, nested = false }) {
  return (
    <div className={`section-intro ${nested ? 'section-intro--nested' : ''}`}>
      {!nested && <SectionEyebrow number={number} label={eyebrow} />}
      {block.title && <h2 className="section-intro__title">{block.title}</h2>}
      {block.subTitle && <p className="section-intro__lead">{block.subTitle}</p>}
    </div>
  );
}

function FeatureBanner({ block, image, video, zoom, eyebrow, number }) {
  const source = video ? resolveAsset(video) : '';
  return (
    <div className="feature-banner">
      <div className={`feature-banner__media ${zoom === 'out' ? 'feature-banner__media--wide-crop' : ''}`}>
        {source ? (
          <LazyBackgroundVideo src={source} poster={image} />
        ) : (
          image && <img src={image} alt="" aria-hidden="true" loading="lazy" decoding="async" />
        )}
      </div>
      <div className="feature-banner__panel">
        <SectionEyebrow number={number} label={eyebrow} />
        {block.title && <h2 className="feature-banner__title">{block.title}</h2>}
        {block.subTitle && <p className="feature-banner__lead">{block.subTitle}</p>}
      </div>
    </div>
  );
}

// Gentle fade-in as a section enters the viewport. Content renders visible
// by default, so a missing IntersectionObserver can never hide the page.
function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null);
  // Decided during the first render so the section never paints at full
  // opacity and then blinks out before the transition starts.
  const [state, setState] = useState(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return 'idle';
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'idle' : 'pending';
  });

  useEffect(() => {
    const node = ref.current;
    if (!node || state !== 'pending') return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setState('in');
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [state]);

  const revealClass = state === 'pending' ? 'reveal' : state === 'in' ? 'reveal reveal--in' : '';
  return (
    <Tag ref={ref} className={`${className} ${revealClass}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}

function Block({ block, lang, layout = 'full', flip = false, promotedImage = '', leadTitle = '' }) {
  if (!block) return null;
  if (block.type === 'gallery') return <GalleryBlock block={block} lang={lang} leadTitle={leadTitle} />;
  if (block.type === 'event') return <EventBlock block={block} lang={lang} />;
  if (block.type === 'sermon') return <SermonBlock block={block} lang={lang} />;
  if (block.faq?.length) return <FaqList items={block.faq} />;

  const image = block.image || promotedImage;
  const kind = mediaKind(block) || (promotedImage ? 'figure' : '');
  const wide = WIDE_MEDIA.has(kind) || Boolean(block.stackMedia);
  const hasCopy = Boolean(
    block.title ||
      block.subTitle ||
      block.text?.length ||
      block.items?.length ||
      block.pillars?.length ||
      block.html?.length ||
      block.link ||
      block.links?.length
  );
  const captionOnly =
    kind === 'figure' && block.title && !block.subTitle && !block.text?.length && !block.items?.length && !block.link && !block.links?.length;

  const media = block.placeholder ? (
    <PlaceholderVisual text={block.placeholder} />
  ) : block.videoClips?.length ? (
    <VideoClipStrip clips={block.videoClips} />
  ) : block.carousel?.images?.length ? (
    <CarouselStrip title={block.carousel.title || block.title} images={block.carousel.images} />
  ) : block.ladder?.length ? (
    <FeatureLadder items={block.ladder} />
  ) : block.cards?.length ? (
    <PhotoMosaic cards={block.cards} />
  ) : block.video ? (
    <VideoEmbed video={block.video} />
  ) : image ? (
    <img src={resolveAsset(image)} alt={stripTitle(block.title)} loading="lazy" decoding="async" />
  ) : null;

  if (captionOnly) {
    return (
      <figure className={`figure-block figure-block--${layout}`}>
        {media}
        <figcaption>{block.title}</figcaption>
      </figure>
    );
  }

  const isSplit = layout === 'full' && Boolean(kind) && !wide;
  const classNames = [
    'block',
    `block--${layout}`,
    kind ? `block--${kind}` : 'block--prose',
    isSplit ? 'block--split' : '',
    isSplit && flip ? 'block--flip' : '',
    wide && kind ? 'block--wide' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      {hasCopy && (
        <div className="block__copy">
          {block.title && <h3 className="block__title">{block.title}</h3>}
          {block.subTitle && <p className="block__lead">{block.subTitle}</p>}
          {Array.isArray(block.text) &&
            block.text.map((text, index) => (
              <p key={index} className="block__text">
                {text}
              </p>
            ))}
          {Array.isArray(block.pillars) && block.pillars.length > 0 && (
            <div className="pillar-row">
              {block.pillars.map((pillar, index) => (
                <span key={index} className="pillar-chip">
                  {pillar}
                </span>
              ))}
            </div>
          )}
          {block.items && (
            <ul className="bullet-list">
              {block.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
          {block.link && <CtaLink link={block.link} />}
          {Array.isArray(block.links) && block.links.length > 0 && (
            <div className="cta-links">
              {block.links.map((link, index) => (
                <CtaLink key={index} link={link} />
              ))}
            </div>
          )}
          {block.html && <div className="rich-html" dangerouslySetInnerHTML={{ __html: decodeHtml(block.html[0]) }} />}
        </div>
      )}
      {media && <div className="block__media">{media}</div>}
    </div>
  );
}

function CtaLink({ link }) {
  const href = link?.href || '#';
  const openInNewTab = isExternalLink(href) || isDocumentLink(href);
  const externalIcon = openInNewTab || isActionLink(href);
  const isInternal = href.startsWith('/') && !isActionLink(href) && !isDocumentLink(href);
  const content = (
    <>
      <span>{link.text}</span>
      {externalIcon ? <ExternalLink size={15} /> : <ChevronRight size={15} />}
    </>
  );

  if (isInternal) {
    return (
      <Link className="cta-link" to={href}>
        {content}
      </Link>
    );
  }
  return (
    <a className="cta-link" href={href} target={openInNewTab ? '_blank' : undefined} rel={openInNewTab ? 'noreferrer' : undefined}>
      {content}
    </a>
  );
}

function LazyBackgroundVideo({ src, poster }) {
  const wrapRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node || visible) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setVisible(true);
      },
      { rootMargin: '200px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div ref={wrapRef} className="banner-video-wrap" aria-hidden="true">
      {visible ? (
        <video
          className="banner-video"
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          tabIndex={-1}
        />
      ) : (
        poster && <img className="banner-video" src={poster} alt="" />
      )}
    </div>
  );
}

function getSpecialBannerBackdrop(title = '') {
  const value = title.toLowerCase();
  if (value.includes('የቤተ ክርስቲያናችን ምሥረታ አጭር ታሪክ') || value.includes('a brief history of our church')) {
    return resolveAsset('/images/website-photos/fasting-services.jpg');
  }
  if (value.includes('የፈተና ጊዜያት') || value.includes('times of trial')) {
    return asset('static/images/album2/photo_2020-04-18_21-10-42.jpg');
  }
  return '';
}

function EventBlock({ block, lang }) {
  const media = block.placeholder ? (
    <PlaceholderVisual text={block.placeholder} compact />
  ) : (
    <img src={thumbAsset(block.image)} alt={stripTitle(block.title)} loading="lazy" decoding="async" />
  );

  return (
    <article className="event-item">
      <div className="event-item__media">{media}</div>
      <div className="event-item__body">
        <p className="item-meta">
          <span>
            <CalendarDays size={14} aria-hidden="true" />
            {formatDate(block.startTime)}
          </span>
          <span>
            <MapPin size={14} aria-hidden="true" />
            {block.location}
          </span>
        </p>
        <h3>{block.title}</h3>
        {block.text?.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
        <p className="event-item__time">
          {formatTime(block.startTime)} - {formatTime(block.endTime)}
        </p>
      </div>
    </article>
  );
}

// One recording carries the section; the rest sit beneath it, smaller.
function MediaWall({ blocks, lang }) {
  const [featured, ...rest] = blocks;
  return (
    <div className="media-wall">
      <SermonBlock block={featured} lang={lang} featured />
      {rest.length > 0 && (
        <div className="media-wall__rest">
          {rest.map((block, index) => (
            <SermonBlock key={index} block={block} lang={lang} />
          ))}
        </div>
      )}
    </div>
  );
}

function SermonBlock({ block, lang, featured = false }) {
  const embedSrc = getVideoEmbedSrc(block.video);

  return (
    <article className={`media-item ${featured ? 'media-item--featured' : ''}`}>
      <div className="media-item__frame">
        <iframe
          src={embedSrc}
          title={block.title || 'media'}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
      <div className="media-item__body">
        <p className="item-meta">
          <span>
            <CalendarDays size={14} aria-hidden="true" />
            {formatDate(block.date)}
          </span>
          {block.preacher && (
            <span>
              <Facebook size={14} aria-hidden="true" />
              {block.preacher}
            </span>
          )}
        </p>
        {block.title && <h3>{block.title}</h3>}
        {block.categories && <p>{block.categories}</p>}
        <a className="text-link" href={getVideoOpenUrl(block.video)} target="_blank" rel="noreferrer">
          <span>{lang === 'am' ? 'መክፈቻ' : 'Open video'}</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </article>
  );
}

// Two ways to show photographs. A curated set gets the editorial treatment:
// every tenth image anchors a two-row block, the rest fall in around it. The
// exhaustive archive stays behind a disclosure and opens as a contact sheet,
// so the page leads with its best work instead of its longest list.
function GalleryBlock({ block, lang, leadTitle = '' }) {
  const [open, setOpen] = useState(false);
  const images = block.images || [];
  const collapsible = Boolean(block.collapsible);
  // A short set reads better as even rows; a deep archive earns its anchors.
  const compact = images.length <= 16;
  // The section heading already says this; don't print the title twice.
  const title = block.title && block.title !== leadTitle ? block.title : '';
  const count = images.length;
  const expandLabel = block.expandText || (lang === 'am' ? 'ሁሉንም ፎቶዎች ይመልከቱ' : 'Browse all photographs');
  const collapseLabel = block.collapseText || (lang === 'am' ? 'ዝጋ' : 'Close');

  return (
    <div className={`photo-archive ${collapsible ? 'photo-archive--collapsible' : ''}`}>
      {(title || block.link) && (
        <div className="photo-archive__header">
          {title && <h3>{title}</h3>}
          {block.link && (
            <a className="text-link" href={block.link.href}>
              <span>{block.link.text}</span>
              <ChevronRight size={14} />
            </a>
          )}
        </div>
      )}

      {collapsible && (
        <button type="button" className="photo-archive__toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
          <span>{open ? collapseLabel : `${expandLabel} (${count})`}</span>
          <ChevronDown size={16} className={open ? 'is-open' : ''} aria-hidden="true" />
        </button>
      )}

      {(!collapsible || open) && (
        <div
          className={`photo-archive__grid ${compact && !collapsible ? 'photo-archive__grid--rows' : ''} ${
            collapsible ? 'photo-archive__grid--contact' : ''
          }`}
        >
          {images.map((image, index) => (
            <figure key={index} className="photo-archive__tile">
              <img
                src={thumbAsset(image.thumbnail || image.original)}
                alt={`${block.title || 'gallery'} ${index + 1}`}
                loading="lazy"
                decoding="async"
              />
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}

// Questions answer themselves on demand. <details> carries the open state,
// the keyboard behaviour, and the screen-reader semantics without any script.
function FaqList({ items = [] }) {
  return (
    <div className="faq-list">
      {items.map((item) => (
        <details key={item.q} className="faq-item">
          <summary className="faq-item__question">
            <span>{item.q}</span>
            <ChevronDown size={18} aria-hidden="true" />
          </summary>
          <p className="faq-item__answer">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

// Pattern A repeated: each item alternates picture and words across the row,
// with a slight inset each way so the column edges stagger down the page.
function FeatureLadder({ items = [] }) {
  return (
    <div className="feature-ladder">
      {items.map((item, index) => {
        const images = (item.images?.length ? item.images : [item.image]).filter(Boolean);
        return (
          <article key={index} className="feature-ladder__row">
            <div className={`feature-ladder__media feature-ladder__media--n${images.length}`}>
              {images.map((src, imageIndex) => (
                <img key={src} src={thumbAsset(src)} alt={imageIndex === 0 ? stripTitle(item.title) : ''} loading="lazy" decoding="async" />
              ))}
            </div>
            <div className="feature-ladder__copy">
              {item.tag && <span className="feature-ladder__tag">{item.tag}</span>}
              {item.title && <h4>{item.title}</h4>}
              {item.text && <p>{item.text}</p>}
            </div>
          </article>
        );
      })}
    </div>
  );
}

// Cards keep their meaning as discrete items but lose the boxed chrome:
// the photograph is the tile, and the count drives an asymmetric rhythm.
function PhotoMosaic({ cards = [] }) {
  const count = Math.min(cards.length, 8);
  return (
    <div className={`photo-mosaic photo-mosaic--n${count}`}>
      {cards.map((card, index) => {
        if (card.placeholder) {
          return (
            <div key={index} className="photo-mosaic__tile photo-mosaic__tile--placeholder">
              <PlaceholderVisual text={card.placeholder} compact />
            </div>
          );
        }

        const image = card.image ? thumbAsset(card.image) : '';
        return (
          <article key={index} className={`photo-mosaic__tile ${image ? '' : 'photo-mosaic__tile--plain'}`}>
            {image && <img src={image} alt={stripTitle(card.title)} loading="lazy" decoding="async" />}
            <div className="photo-mosaic__copy">
              {card.tag && <span className="photo-mosaic__tag">{card.tag}</span>}
              {card.title && <h4>{card.title}</h4>}
              {card.text && <p>{card.text}</p>}
            </div>
          </article>
        );
      })}
    </div>
  );
}

function VideoClipStrip({ clips = [] }) {
  return (
    <div className="video-clip-strip">
      {clips.map((clip) => (
        <figure key={clip.src} className="video-clip">
          <video src={clip.src} poster={clip.poster} controls playsInline preload="none" />
          {clip.caption && <figcaption>{clip.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

function CarouselStrip({ title, images = [] }) {
  return (
    <div className="photo-strip" aria-label={title || 'Image carousel'}>
      <div className="photo-strip__track">
        {images.map((image, index) => (
          <figure key={index} className="photo-strip__item">
            <img src={thumbAsset(image.thumbnail || image.original)} alt={`${title || 'image'} ${index + 1}`} loading="lazy" decoding="async" />
            {image.caption && <figcaption>{image.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </div>
  );
}

function PlaceholderVisual({ text, compact = false }) {
  const [imageIndex, setImageIndex] = useState(() => Math.floor(Math.random() * PLACEHOLDER_IMAGES.length));

  useEffect(() => {
    if (PLACEHOLDER_IMAGES.length < 2) return undefined;
    const interval = window.setInterval(() => {
      setImageIndex((current) => {
        let next = current;
        while (next === current) {
          next = Math.floor(Math.random() * PLACEHOLDER_IMAGES.length);
        }
        return next;
      });
    }, 6000);
    return () => window.clearInterval(interval);
  }, []);

  const image = PLACEHOLDER_IMAGES[imageIndex % PLACEHOLDER_IMAGES.length];
  const placeholder = typeof text === 'string' ? { label: 'Photo placeholder', title: 'Insert the requested image here', text } : text || {};
  return (
    <div
      className={`placeholder-visual ${compact ? 'placeholder-visual--compact' : ''} placeholder-visual--photo`}
      role="note"
      aria-label={placeholder.label || 'Photo placeholder'}
      style={{ backgroundImage: `linear-gradient(180deg, rgba(13, 27, 34, 0.18), rgba(13, 27, 34, 0.62)), url("${thumbAsset(image)}")` }}
    >
      <span>{placeholder.label || 'Photo placeholder'}</span>
      <strong>{placeholder.title || 'Insert the requested image here'}</strong>
      <p>{placeholder.text || ''}</p>
    </div>
  );
}

const DAY_HEADERS_AM = ['እ', 'ሰ', 'ማ', 'ረ', 'ሐ', 'አ', 'ቅ'];
const DAY_HEADERS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function CalendarWidget({ lang, events = [] }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(null);

  const eventsByDate = {};
  for (const ev of events) {
    const key = ev.date;
    if (!eventsByDate[key]) eventsByDate[key] = [];
    eventsByDate[key].push(ev);
  }

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
    setSelectedDay(null);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
    setSelectedDay(null);
  }

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const gregDate = new Date(viewYear, viewMonth, 1);
  const ethHeader = toEthiopian(gregDate);
  const ethEnd = toEthiopian(new Date(viewYear, viewMonth, daysInMonth));

  let headerLabel;
  if (lang === 'am') {
    const sameMonth = ethHeader.month === ethEnd.month;
    if (sameMonth) {
      headerLabel = `${ethHeader.monthName} ${ethHeader.year} (${gregDate.toLocaleString('en-US', { month: 'long' })} ${viewYear})`;
    } else {
      headerLabel = `${ethHeader.monthName}–${ethEnd.monthName} ${ethHeader.year} (${gregDate.toLocaleString('en-US', { month: 'long' })} ${viewYear})`;
    }
  } else {
    headerLabel = `${gregDate.toLocaleString('en-US', { month: 'long' })} ${viewYear}`;
  }

  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  function dayKey(d) {
    return `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  }

  const selectedKey = selectedDay ? dayKey(selectedDay) : null;
  const selectedEvents = selectedKey ? (eventsByDate[selectedKey] || []) : [];

  const dayHeaders = lang === 'am' ? DAY_HEADERS_AM : DAY_HEADERS_EN;

  return (
    <section className="calendar-widget">
      <div className="calendar-widget__inner">
        <div className="calendar-widget__title-row">
          <h2 className="calendar-widget__section-title">
            {lang === 'am' ? 'የቤተ ክርስቲያን መርሃ ግብር' : 'Church Calendar'}
          </h2>
        </div>

        <div className="calendar-card">
          <div className="cal-header">
            <button type="button" className="cal-nav" onClick={prevMonth} aria-label="Previous month">‹</button>
            <span className="cal-month-label">{headerLabel}</span>
            <button type="button" className="cal-nav" onClick={nextMonth} aria-label="Next month">›</button>
          </div>

          <div className="cal-grid">
            {dayHeaders.map(h => (
              <div key={h} className="cal-day-header">{h}</div>
            ))}
            {cells.map((d, i) => {
              if (d === null) return <div key={`empty-${i}`} className="cal-cell cal-cell--empty" />;
              const key = dayKey(d);
              const hasEvents = !!eventsByDate[key];
              const isToday = key === todayKey;
              const isSelected = d === selectedDay;
              return (
                <button
                  key={key}
                  type="button"
                  className={`cal-cell${isToday ? ' cal-cell--today' : ''}${isSelected ? ' cal-cell--selected' : ''}${hasEvents ? ' cal-cell--has-events' : ''}`}
                  onClick={() => setSelectedDay(isSelected ? null : d)}
                  aria-label={`${d}${hasEvents ? ', has events' : ''}`}
                  aria-pressed={isSelected}
                >
                  <span className="cal-cell__num">{d}</span>
                  {hasEvents && <span className="cal-cell__dot" aria-hidden="true" />}
                </button>
              );
            })}
          </div>

          {selectedEvents.length > 0 && (
            <div className="cal-event-list">
              {selectedEvents.map(ev => (
                <div key={ev.id} className="cal-event-item">
                  <div className="cal-event-item__time">
                    {ev.startTime}{ev.endTime ? ` – ${ev.endTime}` : ''}
                  </div>
                  <div className="cal-event-item__title">
                    {lang === 'am' ? ev.titleAm : ev.titleEn}
                  </div>
                  {ev.location && (
                    <div className="cal-event-item__location">
                      <MapPin size={12} aria-hidden="true" />
                      {ev.location}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function UpcomingEventsPane({ lang, events = [] }) {
  const today = new Date();
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const upcoming = events
    .filter((ev) => ev.date >= todayKey)
    .sort((a, b) => (a.date === b.date ? a.startTime.localeCompare(b.startTime) : a.date.localeCompare(b.date)))
    .slice(0, 5);

  return (
    <aside className="upcoming-events-pane">
      <div className="upcoming-events-pane__card">
        <h2 className="upcoming-events-pane__title">
          {lang === 'am' ? 'መጪ ዝግጅቶች' : 'Upcoming Events'}
        </h2>

        {upcoming.length === 0 && (
          <p className="upcoming-events-pane__empty">
            {lang === 'am' ? 'በቅርቡ የታቀዱ ዝግጅቶች የሉም።' : 'No upcoming events scheduled right now.'}
          </p>
        )}

        <ul className="upcoming-events-pane__list">
          {upcoming.map((ev) => (
            <li key={ev.id} className="upcoming-event-card">
              <div className="upcoming-event-card__date">
                <CalendarDays size={14} aria-hidden="true" />
                {formatDate(ev.date)}
              </div>
              <h3 className="upcoming-event-card__title">{lang === 'am' ? ev.titleAm : ev.titleEn}</h3>
              <div className="upcoming-event-card__time">
                {ev.startTime}{ev.endTime ? ` – ${ev.endTime}` : ''}
              </div>
              {ev.location && (
                <div className="upcoming-event-card__location">
                  <MapPin size={12} aria-hidden="true" />
                  {ev.location}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function HomeCalendarSection({ lang, events }) {
  return (
    <section id="upcoming-events" className="home-calendar-section">
      <div className="home-calendar-section__inner">
        <CalendarWidget lang={lang} events={events} />
        <UpcomingEventsPane lang={lang} events={events} />
      </div>
    </section>
  );
}

function Footer({ lang }) {
  const raw = footerSectionsByLang[lang];
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        {raw.map((section, index) => (
          <div key={index} className={`footer-card ${(section.text?.length || 0) >= 6 ? 'footer-card--split' : ''}`}>
            <div className="footer-card__title">
              <FooterGlyph title={section.title} />
              <h4>{section.title}</h4>
            </div>
            {section.text && (
              <ul>
                {section.text.map((item, itemIndex) => (
                  <li key={itemIndex} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            )}
            {section.html && (
              <div className="footer-html" dangerouslySetInnerHTML={{ __html: decodeHtml(section.html[0]) }} />
            )}
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <div>
          <strong>{lang === 'am' ? 'ደብረ ሰላም ቅዱስ ሚካኤል' : 'Debre Selam Kidus Michael'}</strong>
          <span>{lang === 'am' ? 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን' : 'Ethiopian Orthodox Tewahedo Church'}</span>
        </div>
        <div className="footer-contact">
          <span>{SOCIAL.phone}</span>
          <span>{SOCIAL.email}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterGlyph({ title }) {
  const t = (title || '').toLowerCase();
  if (t.includes('address') || t.includes('አድራሻ')) return <MapPin size={18} aria-hidden="true" />;
  if (t.includes('contact') || t.includes('contact us') || t.includes('phone') || title?.includes('ያግኙ')) return <Phone size={18} aria-hidden="true" />;
  if (t.includes('sunday') || t.includes('ሰንበት')) return <ImageIcon size={18} aria-hidden="true" />;
  return <CalendarDays size={18} aria-hidden="true" />;
}

function VideoEmbed({ video }) {
  const src = getVideoEmbedSrc(video);
  return (
    <div className="video-embed">
      <iframe
        src={src}
        title={video?.id || 'video'}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}

export default App;

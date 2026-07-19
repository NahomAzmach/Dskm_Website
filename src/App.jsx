import { useEffect, useState } from 'react';
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
  offeringsPreview,
} from './content';
import { asset, resolveAsset } from './assets';
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
  toStyle,
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
  email: 'contactus@eotcdskm.org',
  address: '23010 84th Ave W, Edmonds, WA 98026',
};

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('eotcdskm-lang') || 'am');
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
              <strong>dskm</strong>
              <span>{lang === 'am' ? 'የተዋሕዶ ቤተ ክርስቲያን' : 'Debre Selam Kidus Michael'}</span>
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
    { anchor: 'sermons-preview', am: 'ስብከቶች', en: 'Sermons' },
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
    { anchor: 'parenting', am: 'የወላጆች ሥልጠና', en: 'Parenting' },
    { anchor: 'fellowship', am: 'ማኅበራዊ ኅብረት', en: 'Fellowship & Events' },
  ],
  sunday_school: [
    { anchor: 'service', am: 'አገልግሎት', en: 'Service' },
    { anchor: 'registration', am: 'ምዝገባ እና መሪዎች', en: 'Registration & Leaders' },
    { anchor: 'summer-camp', am: 'የበጋ ካምፕ እና እድገት', en: 'Summer Camp & Formation' },
    { anchor: 'media', am: 'መዝሙር', en: 'Mezmur' },
  ],
  media_gallery: [
    { anchor: 'intro', am: 'መግቢያ', en: 'Overview' },
    { anchor: 'archive', am: 'የፎቶ መዝገብ', en: 'Photo Archive' },
    { anchor: 'sermons', am: 'ስብከቶች', en: 'Sermons' },
    { anchor: 'mezmur', am: 'መዝሙር', en: 'Mezmur' },
  ],
  about_reach_us: [
    { anchor: 'history', am: 'ታሪክ', en: 'History' },
    { anchor: 'church-building', am: 'ቤተ ክርስቲያኑ ግንባታ', en: 'Building the Church' },
    { anchor: 'welcome-story', am: 'የእንኳን ደህና መጡ', en: 'Our Story' },
    { anchor: 'contact', am: 'አድራሻ', en: 'Contact' },
    { anchor: 'faq', am: 'ተደጋጋሚ ጥያቄዎች', en: 'FAQ' },
    { anchor: 'leadership', am: 'መሪዎች', en: 'Leadership' },
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

  return (
    <div className={`page page-${routeKey} ${isHome ? 'page-home' : ''}`}>
      {sectionLinks && <SectionJumpNav links={sectionLinks} lang={lang} />}
      {isHome && groups[0]?.contents && (
        <HomeFeatureGrid
          lang={lang}
          heroBlock={groups[0].contents[0]}
          donateBlock={groups[0].contents[1]}
          donateHtml={groups[0].contents[2]}
        />
      )}
      {isHome && <HomeCalendarSection lang={lang} events={eventsData} />}
      {(isHome ? groups.slice(1).filter((group) => group.path !== '/home/upcoming-events.json') : groups).map((group, index) => (
        <ContentGroup key={group.path || index} group={group} groupIndex={index} lang={lang} routeKey={routeKey} isHome={isHome} />
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
          <p className="hero-lead">{hero?.text?.[0]}</p>
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
            <img src={asset('static/images/background/photo_2020-09-19_18-01-56.jpg')} alt={stripTitle(hero?.title)} />
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

      {item && (
        <Link className="offerings-preview__feature" to={group.href}>
          <span className="offerings-preview__media">
            <img key={`${activeTab}-${item.image}`} src={resolveAsset(item.image)} alt={stripTitle(item.title)} loading="lazy" />
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

function HomeFeatureGrid({ lang, heroBlock, donateBlock, donateHtml }) {
  return (
    <section className="home-feature-grid">
      <div className="home-feature-grid__inner">
        <article className="home-feature home-feature--wide">
          {heroBlock?.title && <h2>{heroBlock.title}</h2>}
          {heroBlock?.text?.[0] && <p>{heroBlock.text[0]}</p>}
          {heroBlock?.text?.[1] && <p>{heroBlock.text[1]}</p>}
        </article>

        <article className="home-feature home-feature--donate">
          {donateBlock?.text?.[0] && <p>{donateBlock.text[0]}</p>}
          <div className="home-feature__html" dangerouslySetInnerHTML={{ __html: decodeHtml(donateHtml?.html?.[0] || '') }} />
        </article>
      </div>
    </section>
  );
}

function ContentGroup({ group, groupIndex, lang, routeKey, isHome }) {
  const firstBlock = group.contents?.[0];
  const groupTitle = firstBlock?.title || group.path?.split('/').filter(Boolean).pop() || '';
  const groupAnchor = group.path?.split('/').filter(Boolean).pop()?.replace(/\.json$/, '') || `${routeKey}-${groupIndex}`;

  return (
    <section id={groupAnchor} className={`content-group ${groupIndex === 0 && isHome ? 'content-group--hero' : ''}`}>
      <div className="content-group__inner">
        {group.contents?.map((block, index) => (
          <Block
            key={`${group.path || routeKey}-${index}`}
            block={block}
            lang={lang}
            groupTitle={groupTitle}
            isHero={groupIndex === 0 && isHome && index === 0}
          />
        ))}
      </div>
    </section>
  );
}

function Block({ block, lang, isHero }) {
  if (!block) return null;
  if (block.type === 'gallery') return <GalleryBlock block={block} lang={lang} />;
  if (block.type === 'event') return <EventBlock block={block} lang={lang} />;
  if (block.type === 'sermon') return <SermonBlock block={block} lang={lang} />;

  const style = toStyle(block.style);
  const backdrop = getSpecialBannerBackdrop(block.title);
  const themedStyle = backdrop
    ? {
        ...style,
        backgroundColor: 'transparent',
        backgroundImage: `url("${backdrop}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }
    : style;
  const hasBackgroundImage = Boolean(style.backgroundImage);
  const hasMedia = Boolean(block.image || block.video || block.placeholder || block.cards?.length || block.carousel?.images?.length);
  const stackMedia = Boolean(block.stackMedia);
  const bg = style.backgroundImage;
  const hasBackgroundVideo = Boolean(block.backgroundVideo);
  const backgroundPoster = block.style?.backgroundImage?.url ? resolveAsset(block.style.backgroundImage.url) : undefined;
  const isDarkHero = Boolean(bg) || isHero || Boolean(backdrop) || hasBackgroundVideo;
  const sectionClass = [
    'banner-block',
    isDarkHero ? 'banner-block--hero' : '',
    backdrop || hasBackgroundImage ? 'banner-block--image-bg' : '',
    hasBackgroundVideo ? 'banner-block--video' : '',
    style.maxHeight || style.overflowY === 'auto' ? 'banner-block--scroll' : '',
    block.html ? 'banner-block--html' : '',
    hasMedia ? 'banner-block--media' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const media = block.placeholder ? (
    <PlaceholderVisual text={block.placeholder} />
  ) : block.carousel?.images?.length ? (
    <CarouselStrip title={block.carousel.title || block.title} images={block.carousel.images} />
  ) : block.cards?.length ? (
    <CardCluster cards={block.cards} />
  ) : block.video ? (
    <VideoEmbed video={block.video} />
  ) : block.image ? (
    <figure className="media-figure">
      <img src={resolveAsset(block.image)} alt={stripTitle(block.title)} loading="lazy" />
    </figure>
  ) : null;

  const renderCtaLink = (link, index) => {
    const href = link?.href || '#';
    const openInNewTab = isExternalLink(href) || isDocumentLink(href);
    const externalIcon = openInNewTab || isActionLink(href);
    const isInternal = href.startsWith('/') && !isActionLink(href) && !isDocumentLink(href);
    const content = (
      <>
        <span>{link.text}</span>
        {externalIcon ? <ExternalLink size={16} /> : <ChevronRight size={16} />}
      </>
    );
    if (isInternal) {
      return (
        <Link key={index} className="cta-link" to={href}>
          {content}
        </Link>
      );
    }
    return (
      <a
        key={index}
        className="cta-link"
        href={href}
        target={openInNewTab ? '_blank' : undefined}
        rel={openInNewTab ? 'noreferrer' : undefined}
      >
        {content}
      </a>
    );
  };

  return (
    <section className={sectionClass} style={themedStyle}>
      {hasBackgroundVideo && (
        <video
          className="banner-video"
          src={resolveAsset(block.backgroundVideo)}
          poster={backgroundPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        />
      )}
      <div className="banner-block__inner">
          <div className={`banner-copy ${hasMedia && !stackMedia ? 'banner-copy--split' : ''}`}>
          {block.title && <h2 className="block-title">{block.title}</h2>}
          {block.subTitle && <p className="block-subtitle">{block.subTitle}</p>}
          {Array.isArray(block.text) &&
            block.text.map((text, index) => (
              <p key={index} className="block-text">
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
          {block.link && renderCtaLink(block.link)}
          {Array.isArray(block.links) && block.links.length > 0 && <div className="cta-links">{block.links.map(renderCtaLink)}</div>}
          {block.html && (
            <div className="rich-html" dangerouslySetInnerHTML={{ __html: decodeHtml(block.html[0]) }} />
          )}
        </div>
        {hasMedia && <div className="banner-media">{media}</div>}
      </div>
    </section>
  );
}

function getSpecialBannerBackdrop(title = '') {
  const value = title.toLowerCase();
  if (value.includes('የቤተ ክርስቲያናችን ምሥረታ አጭር ታሪክ') || value.includes('a brief history of our church')) {
    return asset('static/images/album4/20200202_064137.jpg');
  }
  if (value.includes('የፈተና ጊዜያት') || value.includes('times of trial')) {
    return asset('static/images/album2/photo_2020-04-18_21-10-42.jpg');
  }
  if (value.includes('የሰንበት ትምህርት ቤት አገልግሎት') || value.includes('sunday school service')) {
    return asset('static/images/album5/photo_2020-02-22_02-16-28.jpg');
  }
  return '';
}

function EventBlock({ block, lang }) {
  const media = block.placeholder ? (
    <PlaceholderVisual text={block.placeholder} compact />
  ) : (
    <img src={resolveAsset(block.image)} alt={stripTitle(block.title)} loading="lazy" />
  );

  return (
    <section className="card-section">
      <div className="card card--event">
        <div className={`card__media ${block.placeholder ? 'card__media--placeholder' : ''}`}>{media}</div>
        <div className="card__body">
          <div className="meta-row">
            <span className="meta-pill">
              <CalendarDays size={14} />
              {formatDate(block.startTime)}
            </span>
            <span className="meta-pill">
              <MapPin size={14} />
            {block.location}
          </span>
          </div>
          <h3>{block.title}</h3>
          {block.text?.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
          <div className="time-range">
            {formatTime(block.startTime)} - {formatTime(block.endTime)}
          </div>
        </div>
      </div>
    </section>
  );
}

function SermonBlock({ block, lang }) {
  const isFacebook = block.video?.source === 'Facebook';
  const embedSrc = getVideoEmbedSrc(block.video);

  return (
    <section className="card-section">
      <article className="card card--media">
        <div className="card__media card__media--embed">
          <iframe
            src={embedSrc}
            title={block.title || 'media'}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
        <div className="card__body">
          <div className="meta-row">
            <span className="meta-pill">
              <CalendarDays size={14} />
              {formatDate(block.date)}
            </span>
            {block.preacher && (
              <span className="meta-pill">
                <Facebook size={14} />
                {block.preacher}
              </span>
            )}
          </div>
          {block.title && <h3>{block.title}</h3>}
          {block.categories && <p>{block.categories}</p>}
          <a
            className="cta-link"
            href={getVideoOpenUrl(block.video)}
            target="_blank"
            rel="noreferrer"
          >
            <span>{lang === 'am' ? 'መክፈቻ' : 'Open video'}</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </article>
    </section>
  );
}

function GalleryBlock({ block, lang }) {
  return (
    <section className="gallery-section">
      <div className="gallery-header">
        {block.title && <h3 className="gallery-title">{block.title}</h3>}
        {block.link && (
          <a className="gallery-link" href={block.link.href}>
            <span>{block.link.text}</span>
            <ChevronRight size={16} />
          </a>
        )}
      </div>
      <div className="gallery-grid">
        {block.images?.map((image, index) => (
          <figure key={index} className="gallery-tile">
            <img src={resolveAsset(image.original)} alt={`${block.title || 'gallery'} ${index + 1}`} loading="lazy" />
          </figure>
        ))}
      </div>
    </section>
  );
}

function CardCluster({ cards = [] }) {
  return (
    <div className="card-cluster">
      {cards.map((card, index) => {
        if (card.placeholder) {
          return (
            <div key={index} className="card-cluster__tile card-cluster__tile--placeholder">
              <PlaceholderVisual text={card.placeholder} compact />
            </div>
          );
        }

        const image = card.image ? resolveAsset(card.image) : '';
        const style = image ? { backgroundImage: `linear-gradient(180deg, rgba(13,27,34,0.08), rgba(13,27,34,0.55)), url("${image}")` } : undefined;

        return (
          <article key={index} className="card-cluster__tile" style={style}>
            <div className="card-cluster__overlay">
              {card.tag && <span className="card-cluster__tag">{card.tag}</span>}
              {card.title && <h4>{card.title}</h4>}
              {card.text && <p>{card.text}</p>}
            </div>
          </article>
        );
      })}
    </div>
  );
}

function CarouselStrip({ title, images = [] }) {
  return (
    <div className="carousel-strip" aria-label={title || 'Image carousel'}>
      <div className="carousel-strip__track">
        {images.map((image, index) => (
          <figure key={index} className="carousel-strip__item">
            <img src={resolveAsset(image.original)} alt={`${title || 'image'} ${index + 1}`} loading="lazy" />
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
      style={{ backgroundImage: `linear-gradient(180deg, rgba(13, 27, 34, 0.18), rgba(13, 27, 34, 0.62)), url("${image}")` }}
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
          <div key={index} className="footer-card">
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
          <strong>dskm</strong>
          <span>{lang === 'am' ? 'የተዋሕዶ አገልግሎት እና ሕብረት' : 'Orthodox worship and community'}</span>
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

# EOTCDSKM Website Rebuild Requirements

## 1. Project Summary

Rebuild the current `eotcdskm.org` church website into a more professional, modern, and maintainable experience while preserving the church’s identity, community purpose, and essential contact information.

This document is based on publicly accessible information about the organization and its listings, not on a private source-code scrape. The site appears to represent an Ethiopian Orthodox Tewahedo church community in Edmonds, Washington.

## 2. Known Public Facts

- Organization names used publicly include:
  - St Michael Ethiopian Orthodox Tewahda Church
  - Ethiopian Orthodox Tewahedo Seattle Debre Salam Saint Michael Church
  - Debre Mihret Kidus Michael Eot CH
  - E O T Debre Selam St Michael Church
- Primary public address:
  - 23010 84th Ave W, Edmonds, WA 98026
- Public phone numbers found in directory listings vary:
  - (206) 492-1369
  - (206) 349-0915
- The organization is a 501(c)(3) church and public descriptions emphasize:
  - worship and fellowship
  - sacraments and liturgical services
  - spiritual guidance and religious education
  - children and cultural education
  - charitable support for the wider Ethiopian Orthodox community

## 3. Product Goals

1. Present the church as credible, calm, welcoming, and current.
2. Make it easy for visitors to find service times, address, contact info, donations, and events.
3. Provide a content structure that can support ongoing updates without developer help.
4. Improve visual quality, typography, spacing, and mobile usability.
5. Keep the Ethiopian Orthodox identity visible without looking dated or cluttered.

## 4. Scope

### In scope

- New homepage
- About / history
- Service schedule / liturgy info
- Events / calendar
- News / announcements
- Donations / giving
- Gallery / media
- Contact / directions
- Mobile-first responsive layout
- Accessibility and SEO improvements

### Out of scope for the first pass

- Membership portal
- User accounts
- Donations processing backend rewrite unless already required
- Complex multilingual content management workflows

## 5. Information Architecture

The new site should use a simple, predictable navigation model:

- Home
- About
- Services
- Events
- Sermons / Media
- Donations
- Gallery
- Contact

Optional secondary items:

- Ministries
- Sunday School
- Announcements
- FAQ
- Directions

## 6. Page Requirements

### 6.1 Home

The homepage should:

- identify the church clearly on first view
- show service times or a clear link to them
- show the address and a contact method
- feature a primary call to action for donations, contact, or visiting in person
- include a short welcome message and a brief mission statement
- include one section for upcoming events or announcements
- include a section for photo or video highlights

### 6.2 About

The About page should:

- explain who the church is
- summarize Orthodox identity and mission
- include church history or timeline content
- include leadership info if approved for public display
- include a clear statement of community purpose

### 6.3 Services

The Services page should:

- list weekly worship times
- list special services and feast-day observances
- explain what visitors should expect
- provide parking, arrival, and dress guidance if needed
- include rules for livestream or recording if applicable

### 6.4 Events

The Events page should:

- show upcoming events in a calendar or list format
- support recurring events
- support past-event archives optionally
- support event detail pages with date, time, location, and notes

### 6.5 Sermons / Media

The Media page should:

- support sermon audio, video, or livestream embeds
- support downloadable media only if required
- organize media by date and category
- avoid clutter and broken embeds on mobile

### 6.6 Donations

The Donations page should:

- explain how to give
- support online giving links if available
- support text, phone, or mail-based giving instructions
- reassure visitors about trust and transparency
- optionally include a short note on where donations go

### 6.7 Gallery

The Gallery page should:

- show church photos, feast days, community events, and liturgical moments
- support simple filtering by category if there is enough content
- preserve image quality without heavy layout shifts

### 6.8 Contact / Directions

The Contact page should:

- display the address prominently
- display a verified phone number
- include email if available
- embed a map or provide a map link
- provide service-hour and visit-hour information if approved
- include a contact form if the church wants inbound inquiries

## 7. Content Requirements

The site should support the following content types:

- announcements
- service times
- feast-day notices
- event listings
- sermon posts
- photo galleries
- donation instructions
- ministry descriptions
- contact details

Content should be editable by non-technical staff through a CMS or structured admin workflow.

## 8. Design Requirements

The redesign should feel:

- clean
- reverent
- modern
- trustworthy
- accessible

Design should avoid:

- dated church-template visuals
- heavy gradients
- overly decorative layouts
- low-contrast text
- dense walls of text on the homepage

Visual direction:

- restrained color palette with strong contrast
- use church-appropriate imagery
- generous whitespace
- consistent typographic hierarchy
- clear buttons and links
- simple iconography where useful

## 9. Mobile Requirements

The site must work well on phones first.

- primary information must be visible without excessive scrolling
- nav must collapse cleanly
- buttons must be large enough to tap
- maps, images, and embeds must not overflow the viewport
- long names and titles must wrap cleanly

## 10. Accessibility Requirements

The rebuilt site should meet baseline accessibility expectations:

- semantic headings
- keyboard navigable menus
- sufficient color contrast
- alt text for meaningful images
- labels for form fields
- visible focus states
- readable type sizes

## 11. Technical Requirements

- responsive front end
- CMS-backed content for announcements, events, media, and pages
- fast loading on mobile networks
- image optimization
- SEO-friendly URLs and metadata
- open graph metadata for sharing
- analytics support if desired
- secure forms and anti-spam measures

## 12. SEO Requirements

- preserve and clean up important page titles
- create indexable pages for core church content
- add structured metadata for organization, address, and events where applicable
- ensure contact information is machine-readable
- support sitemap generation

## 13. Migration Requirements

If the old site already contains content, migration should:

- inventory all current pages, posts, images, and documents
- identify duplicate or outdated content
- map old URLs to new URLs
- preserve any externally linked resources that still matter
- verify phone numbers, address, and service times before publishing

## 14. Risks and Open Questions

- The public listings show conflicting phone numbers, so the correct primary contact number must be verified before launch.
- The current site was not crawlable in this environment, so a full content audit of the live pages still needs to be done manually.
- Multilingual support may be needed, but language priorities should be confirmed.
- Donation and media workflows depend on the tools the church wants to use.

## 15. Acceptance Criteria

The rebuild is complete when:

- the site looks modern and consistent on desktop and mobile
- visitors can find worship, contact, and donation information within one or two clicks
- content can be updated without code changes
- accessibility basics are in place
- the site preserves the church’s public identity while presenting it more professionally

## 16. Public Sources Reviewed

- Apple Maps listing for the church: https://maps.apple.com/place?place-id=I479A637E63B714B1
- Waze listing: https://www.waze.com/live-map/directions/united-states/washington/esperance/st-michael-ethiopian-orthodox-tewahedo-church?to=place.ChIJTRqwVoMakFQRvJODXSTgDX4
- Charity Navigator profile: https://www.charitynavigator.org/index.cfm?bay=search.profile&ein=201848483
- Charity Navigator profile for a related listing: https://www.charitynavigator.org/ein/383810576
- ProPublica Nonprofit Explorer: https://projects.propublica.org/nonprofits/organizations/201848483
- CauseIQ profiles:
  - https://www.causeiq.com/organizations/st-michael-ethiopian-orthodox-tewahda-church%2C201848483/
  - https://www.causeiq.com/organizations/debre-mihret-kidus-mikael-eotc-in-seattle%2C383810576/


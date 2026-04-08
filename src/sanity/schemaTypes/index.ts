import { type SchemaTypeDefinition } from 'sanity'

//documents
import site from './documents/site'
import page from './documents/page'
import globalModule from './documents/global-module'
import blogPost from './documents/blog.post'
import blogCategory from './documents/blog.category'
import navigation from './documents/navigation'
import redirect from './documents/redirect'

// miscellaneous
import announcement from './misc/announcement'
import logo from './misc/logo'
import person from './misc/person'
import pricing from './misc/pricing'
import reputation from './misc/reputation'
import testimonial from './misc/testimonial'

// objects
import cta from './objects/cta'
import icon from './objects/icon'
import img from './objects/img'
import link from './objects/link'
import linkList from './objects/link.list'
import metadata from './objects/metadata'
import moduleOptions from './objects/module-options'
import { resourceItem, resourceSection } from './modules/resources'
import statistics from './fragments/statistics'
import phone from './fragments/phone'
import inflow from './fragments/inflow'
import organisationInfo from './fragments/organisation-info'
import emailCta from './fragments/email-cta'
import people from './fragments/people'
import youtube from './fragments/youtube'

// modules
import accordionList from './modules/accordion-list'
import blogFrontpage from './modules/blog-frontpage'
import blogList from './modules/blog-list'
import blogPostContent from './modules/blog-post-content'
import breadcrumbs from './modules/breadcrumbs'
import callout from './modules/callout'
import cardList from './modules/card-list'
import creativeModule from './modules/creative'
import customHtml from './modules/custom-html'
import flagList from './modules/flag-list'
import hero from './modules/hero'
import heroSaas from './modules/hero.saas'
import heroSplit from './modules/hero.split'
import logoList from './modules/logo-list'
import map from './modules/map'
import organisation from './modules/organisation'
import personList from './modules/person-list'
import pricingList from './modules/pricing-list'
import richtextModule from './modules/richtext-module'
import scheduleModule from './modules/schedule-module'
import searchModule from './modules/search-module'
import staffProfiles from './modules/staff-profiles'
import statList from './modules/stat-list'
import stepList from './modules/step-list'
import tabbedContent from './modules/tabbed-content'
import testimonialFeatured from './modules/testimonial.featured'
import testimonialList from './modules/testimonial-list'
import chapter from './modules/chapter'
import founders from './modules/founders'
import resources from './modules/resources'
import annualSurvey from './modules/annual-survey'
import brand from './modules/brand'
import brandVideo from './modules/brand-video'
import chapterSattelite from './modules/chapter-satellite'
import satellite from './modules/satellite'
import getCertified from './modules/get-certified'
import goals from './modules/goals'
import behindTheSeams from './modules/behind-the-seams'
import mediaGrid from './modules/media-grid'
import highlights from './modules/highlights'

export const schemaTypes: SchemaTypeDefinition[] = [
  // documents
  site,
  page,
  globalModule,
  blogPost,
  blogCategory,
  navigation,

  // miscellaneous
  announcement,
  redirect,
  logo,
  person,
  pricing,
  reputation,
  testimonial,

  // objects
  cta,
  icon,
  img,
  link,
  linkList,
  metadata,
  moduleOptions,
  resourceItem,
  resourceSection,
  statistics,
  phone,
  inflow,
  organisationInfo,
  emailCta,
  people,
  youtube,

  // modules
  accordionList,
  blogFrontpage,
  blogList,
  blogPostContent,
  breadcrumbs,
  callout,
  cardList,
  creativeModule,
  customHtml,
  flagList,
  hero,
  heroSaas,
  heroSplit,
  logoList,
  map,
  organisation,
  personList,
  pricingList,
  richtextModule,
  scheduleModule,
  searchModule,
  staffProfiles,
  statList,
  stepList,
  tabbedContent,
  testimonialFeatured,
  testimonialList,
  chapter,
  founders,
  resources,
  annualSurvey,
  brand,
  brandVideo,
  chapterSattelite,
  satellite,
  getCertified,
  goals,
  behindTheSeams,
  mediaGrid,
  highlights,
]

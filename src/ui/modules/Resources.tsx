import React from 'react'
import moduleProps from '@/lib/moduleProps'

interface ResourceItem {
  _key?: string
  title: string
  version?: string
  file?: {
    url: string
  }
  url?: string
}

interface ResourceSection {
  sectionTitle: string
  items: ResourceItem[]
}

interface ResourcesModuleProps {
  title: string
  newResources: ResourceSection
  updatedResources: ResourceSection
  link: Sanity.Link
}

const ResourceSection: React.FC<{ section: ResourceSection; link?: Sanity.Link }> = ({ section, link }) => (
  <div className="flex flex-col justify-between">
    <div>
      {section.sectionTitle && <h3 className="h4 mb-20 md:mb-40">{section.sectionTitle}</h3>}
      <div className="-mx-16 overflow-hidden overflow-x-auto px-16 md:-mx-32 md:px-32 lg:overflow-visible">
        <div className="flex w-fit gap-20 lg:grid lg:w-full lg:grid-cols-[repeat(auto-fill,174px)] xl:grid-cols-3">
          {section.items?.map((item) => (
            <div
              key={item._key}
              className="bg-accent relative flex h-232 w-174 shrink-0 flex-col items-center justify-between bg-[url(/assets/book-cover.jpg)] bg-cover px-15 pt-30 pb-20 text-center text-white lg:w-auto"
            >
              {item.title && <h4 className="text-16 -tracking-1 line-clamp-5 leading-[1.5] font-bold wrap-anywhere underline">{item.title}</h4>}
              {item.version && <span className="text-14 -tracking-1 leading-[1.5]">{item.version}</span>}

              {item?.file?.url && (
                <a
                  href={item.file.url}
                  download
                  className="group absolute inset-0 transition hover:shadow-[6px_6px_20px_10px_rgba(0,0,0,0.2)]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="fp-text-body2 text-jet absolute -right-12 -bottom-18 z-10 flex items-center gap-8 bg-white py-8 pr-19 pl-12 opacity-0 transition-opacity group-hover:opacity-100">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5m0 0 5-5m-5 5V4" stroke="#363636" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Download
                  </span>
                </a>
              )}

              {item?.url && (
                <a
                  href={item.url}
                  download
                  className="group absolute inset-0 transition hover:shadow-[6px_6px_20px_10px_rgba(0,0,0,0.2)]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="fp-text-body2 text-jet absolute -right-12 -bottom-18 z-10 flex items-center gap-8 bg-white py-8 pr-19 pl-12 opacity-0 transition-opacity group-hover:opacity-100">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 14L21 3" stroke="#363636" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M21 8V3H16" stroke="#363636" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M10 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-4" stroke="#363636" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Open
                  </span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    {link?.type === 'external' && link.external && (
      <a
        href={link.external}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-accent h5 hover:bg-accent/90 mt-40 block px-6 py-13 text-center text-white normal-case transition-colors"
      >
        {link.label || 'View More Resources'}
      </a>
    )}
  </div>
)

const Resources: React.FC<ResourcesModuleProps> = ({ title, newResources, updatedResources, link, ...props }) => {
  return (
    <section className="overflow-hidden py-40 md:py-80" {...moduleProps(props)}>
      <div className="fp-container">
        {title && <h2 className="h2 mb-40">{title}</h2>}
        <div className="relative grid gap-40 xl:grid-cols-2 xl:gap-160">
          <div className="border-bright-gray absolute top-0 -bottom-80 left-1/2 z-0 hidden w-1 border-r border-dashed xl:block"></div>
          {newResources && <ResourceSection section={newResources} />}
          {updatedResources && <ResourceSection link={link} section={updatedResources} />}
        </div>
      </div>
    </section>
  )
}

export default Resources

export default function Toggle() {
  return (
    <div className="flex items-center justify-between">
      <span className="fp-text-body2 header-closed:hidden max-md:anim-fade-to-r md:hidden">Table of contents</span>
      <label className="ml-auto flex w-fit [grid-area:toggle]">
        <input id="header-toggle" type="checkbox" hidden />
        <span className="text-16 header-open:bg-white header-open:text-accent ml-auto hidden w-fit items-center gap-4 border border-white px-16 py-9 text-base/24 text-white transition hover:bg-white/5 md:flex">
          Table of contents
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 8H14.0534L9.5267 14L5 8Z" fill="currentColor" />
          </svg>
        </span>
        <span className="md:hidden">
          <svg className="header-open:hidden" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.666 15H31.3327M12.666 22H31.3327M12.666 29H31.3327" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg className="header-closed:hidden" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 14L30 30M14 30L30 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        {/*<span className="header-open:hidden">Open</span>*/}
        {/*<span className="header-closed:hidden">Close</span>*/}
      </label>
    </div>
  )
}

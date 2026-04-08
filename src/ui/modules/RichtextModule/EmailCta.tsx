import React from 'react'

interface EmailCtaProps {
  value: {
    label: string
    email: string
  }
}

const EmailCta = ({ value }: EmailCtaProps) => {
  const { label, email } = value

  return (
    label &&
    email && (
      <div className="my-40 md:my-80">
        <a
          href={`mailto:${email}`}
          target="_blank"
          className="border-accent group/email-box flex flex-row items-start gap-10 border border-dashed px-10 py-8 !text-current !no-underline md:flex-row md:gap-28 md:p-23 lg:items-center"
        >
          <svg className="text-accent h-32 w-32 shrink-0 md:h-44 md:w-44" width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M40.3337 14.1289V31.4814C40.3337 32.8843 39.7977 34.2342 38.8353 35.2549C37.8729 36.2756 36.5568 36.8899 35.1563 36.9722L34.8337 36.9814H9.16699C7.76411 36.9815 6.41421 36.4455 5.39351 35.4831C4.37281 34.5206 3.75846 33.2045 3.67616 31.8041L3.66699 31.4814V14.1289L20.9828 25.6734L21.1955 25.7944C21.4461 25.9169 21.7214 25.9805 22.0003 25.9805C22.2793 25.9805 22.5545 25.9169 22.8052 25.7944L23.0178 25.6734L40.3337 14.1289Z"
              fill="currentColor"
            />
            <path
              d="M34.8333 7.64844C36.8133 7.64844 38.5494 8.69344 39.5174 10.2646L21.9999 21.9429L4.48242 10.2646C4.94209 9.51801 5.57365 8.89217 6.32439 8.43931C7.07513 7.98644 7.92328 7.71967 8.79809 7.66127L9.16659 7.64844H34.8333Z"
              fill="currentColor"
            />
          </svg>
          <p className="h5 flex flex-col items-start gap-4 normal-case no-underline lg:flex-row lg:items-center lg:gap-12">
            <span>{label}</span>
            <span className="link group-hover/email-box:no-underline">{email}</span>
          </p>
        </a>
      </div>
    )
  )
}

export default EmailCta

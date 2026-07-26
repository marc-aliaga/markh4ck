import React from "react";

export const ContactIcon = ({ ...props }) => {
  return (
    <svg width="112" height="112" fill="none" {...props}>
      <path
        d="M49.596 32.108c1.902-.968 3.94-1.495 6.064-1.495 1.716 0 3.364.34 4.91.969 7.475 3.024 12.928 12.775 12.928 24.327 0 11.552-5.453 21.303-12.928 24.327-1.563.629-3.21.968-4.91.968-2.123 0-4.179-.526-6.064-1.495m0-47.6c5.436 3.516 9.309 12.842 9.309 23.8 0 10.957-3.873 20.284-9.31 23.8m0-47.6c-1.495-.969-3.108-1.496-4.79-1.496-2.243 0-4.366.952-6.252 2.617m11.043 46.48c-1.495.968-3.11 1.494-4.791 1.494-2.243 0-4.366-.934-6.252-2.616m0-45.358c3.415 4.128 5.776 12.74 5.776 22.679m-5.776-22.68c3.432 4.146 5.776 12.742 5.776 22.68m-5.776-22.68c-1.393-1.664-2.956-2.616-4.604-2.616-2.514 0-4.824 2.192-6.625 5.827 1.46 4.638 2.395 11.637 2.395 19.469m14.61 0c0 9.938-2.344 18.534-5.776 22.68m5.776-22.68c0 9.938-2.361 18.551-5.776 22.68m0 0c-1.393 1.664-2.956 2.615-4.604 2.615-2.531 0-4.824-2.191-6.625-5.827m2.395-19.468c0 7.831-.934 14.83-2.395 19.468m2.395-19.468c0-7.832-.917-14.83-2.378-19.469-1.155-3.635-2.634-5.827-4.247-5.827-3.67 0-6.643 11.331-6.643 25.296 0 13.964 2.973 25.295 6.643 25.295 1.613 0 3.091-2.191 4.23-5.827M77.37 30.613a25.62 25.62 0 0 0-5.86.68c9.496 2.65 16.563 12.656 16.563 24.616 0 11.96-7.05 21.966-16.564 24.616 1.886.441 3.84.68 5.861.68 13.965 0 25.296-11.332 25.296-25.296 0-13.965-11.314-25.296-25.296-25.296Zm10.72 25.296c0-11.96-7.067-21.966-16.58-24.616a18.75 18.75 0 0 0-4.995-.68c-2.055 0-4.06.34-5.946.969 7.458 3.024 12.928 12.775 12.928 24.327 0 11.552-5.453 21.303-12.928 24.327a18.72 18.72 0 0 0 10.94.289c9.514-2.65 16.581-12.657 16.581-24.616ZM12.24 30.613c-1.597 0-2.905 11.331-2.905 25.296 0 13.964 1.308 25.295 2.905 25.295 1.596 0 2.904-11.33 2.904-25.295 0-13.965-1.29-25.296-2.905-25.296Z"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  );
};

export const ArrowIcon = ({ ...props }) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/sg"
      {...props}
    >
      <path
        d="M24 12L16 20L24 28"
        stroke="currentColor"
        stroke-width="2"
      ></path>
    </svg>
  );
};

export const PlayIcon = ({ ...props }) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 8.5L16 12L10 15.5V8.5Z" fill="currentColor" />
    </svg>
  );
};

export const ChevronDownIcon = ({ ...props }) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const LockIcon = ({ ...props }) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect
        x="5"
        y="11"
        width="14"
        height="9"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 11V7.5C8 5.29 9.79 3.5 12 3.5C14.21 3.5 16 5.29 16 7.5V11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const CheckIcon = ({ ...props }) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M5 12.5L9.5 17L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const DownloadIcon = ({ ...props }) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 4V15M12 15L8 11M12 15L16 11M5 17V18C5 18.5304 5.21071 19.0391 5.58579 19.4142C5.96086 19.7893 6.46957 20 7 20H17C17.5304 20 18.0391 19.7893 18.4142 19.4142C18.7893 19.0391 19 18.5304 19 18V17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

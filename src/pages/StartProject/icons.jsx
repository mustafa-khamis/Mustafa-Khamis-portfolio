import React from "react";

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const CATEGORY_ICONS = {
  globe: (
    <svg {...base}>
      <circle cx="12" cy="12" r="9" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <path d="M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9s1.3-6.4 3.8-9z" />
    </svg>
  ),
  device: (
    <svg {...base}>
      <rect x="7" y="2.5" width="10" height="19" rx="2.2" />
      <line x1="10.5" y1="18.2" x2="13.5" y2="18.2" />
    </svg>
  ),
  gears: (
    <svg {...base}>
      <circle cx="9" cy="9" r="2.6" />
      <path d="M9 3.7v1.4M9 12.9v1.4M3.7 9h1.4M12.9 9h1.4M5.3 5.3l1 1M11.7 11.7l1 1M12.7 5.3l-1 1M6.3 11.7l-1 1" />
      <circle cx="16.5" cy="16.5" r="2.2" />
      <path d="M16.5 12.3v1.1M16.5 19.6v1.1M12.3 16.5h1.1M19.6 16.5h1.1M13.8 13.8l.8.8M18.4 18.4l.8.8M19.2 13.8l-.8.8M14.6 18.4l-.8.8" />
    </svg>
  ),
  spark: (
    <svg {...base}>
      <path d="M12 3l1.8 5.6L19.5 10.4 13.8 12.2 12 18l-1.8-5.8L4.5 10.4l5.7-1.8z" />
    </svg>
  ),
  layers: (
    <svg {...base}>
      <path d="M12 3l8.5 4.6L12 12.2 3.5 7.6z" />
      <path d="M3.5 12.4L12 17l8.5-4.6" />
      <path d="M3.5 17.2L12 21.8l8.5-4.6" />
    </svg>
  ),
  arrow: (
    <svg {...base}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  check: (
    <svg {...base}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  back: (
    <svg {...base}>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  ),
};

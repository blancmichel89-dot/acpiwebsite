function base(props) {
  return { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", ...props };
}

export function KitchenIcon(props) {
  return (
    <svg {...base(props)}>
      <path d="M4 10h16v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9Z" />
      <path d="M4 10 6 4h12l2 6" />
      <path d="M9 14h6" />
      <path d="M9 17h6" />
    </svg>
  );
}

export function RenovationIcon(props) {
  return (
    <svg {...base(props)}>
      <path d="M14.5 3.5 20.5 9.5 9.5 20.5 3.5 14.5 14.5 3.5Z" />
      <path d="M13 5 19 11" />
      <path d="M6 15l3 3" />
    </svg>
  );
}

export function BathroomIcon(props) {
  return (
    <svg {...base(props)}>
      <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z" />
      <path d="M6 12V6a2 2 0 0 1 3.2-1.6" />
      <path d="M9 6h.01" />
      <path d="M3 19h18" />
    </svg>
  );
}

export function AtticIcon(props) {
  return (
    <svg {...base(props)}>
      <path d="M3 11 12 4l9 7" />
      <path d="M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9" />
      <path d="M9.5 20v-5.5h5V20" />
    </svg>
  );
}

export function InsulationIcon(props) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="5" width="17" height="14" rx="2" />
      <path d="M3.5 9.5h17" />
      <path d="M3.5 14h17" />
      <path d="M8 5v14" />
    </svg>
  );
}

export function PaintIcon(props) {
  return (
    <svg {...base(props)}>
      <path d="M6 3h9v6a2 2 0 0 1-2 2h-1v4.5a3 3 0 1 1-4 0V11H7a2 2 0 0 1-2-2V5" />
      <path d="M6 3v2" />
    </svg>
  );
}

export function CheckIcon(props) {
  return (
    <svg {...base({ width: 18, height: 18, strokeWidth: 2.4, ...props })}>
      <path d="M4 12.5 9 17.5 20 6.5" />
    </svg>
  );
}

export function PhoneIcon(props) {
  return (
    <svg {...base({ width: 18, height: 18, ...props })}>
      <path d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2 4 1.5V18a2 2 0 0 1-2 2C10.5 20 4 13.5 4 6a2 2 0 0 1 1-2Z" />
    </svg>
  );
}

export function MailIcon(props) {
  return (
    <svg {...base({ width: 18, height: 18, ...props })}>
      <rect x="3.5" y="5" width="17" height="14" rx="2" />
      <path d="M4 6.5 12 13l8-6.5" />
    </svg>
  );
}

export function PinIcon(props) {
  return (
    <svg {...base({ width: 18, height: 18, ...props })}>
      <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.4" />
    </svg>
  );
}

export function MenuIcon(props) {
  return (
    <svg {...base({ width: 22, height: 22, ...props })}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props) {
  return (
    <svg {...base({ width: 22, height: 22, ...props })}>
      <path d="M5 5l14 14" />
      <path d="M19 5 5 19" />
    </svg>
  );
}

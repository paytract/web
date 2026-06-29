export interface Country {
  code: string;
  flag: string;
  name: string;
  iso: string;
}

export const COUNTRIES: Country[] = [
  { code: "+234", flag: "🇳🇬", name: "Nigeria", iso: "NG" },
  { code: "+1", flag: "🇺🇸", name: "United States", iso: "US" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom", iso: "GB" },
  { code: "+233", flag: "🇬🇭", name: "Ghana", iso: "GH" },
  { code: "+254", flag: "🇰🇪", name: "Kenya", iso: "KE" },
];

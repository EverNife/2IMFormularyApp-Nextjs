export interface Menu {
  id: number;
  path: string;
  label: string;
  subMenu?: Menu[];
}

export interface SiteHeader {
  menu: Menu[];
  mobileMenu: Menu[];
}

export interface Author {
  name: string;
  websiteUrl: string;
  address: string;
}

export interface SiteSettings {
  name: string;
  description: string;
  id: string;
  canonical: string;
  author: Author;
}


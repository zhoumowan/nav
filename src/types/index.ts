export type Category = string;

export interface Site {
  id: string;
  title: string;
  description: string;
  url: string;
  category: Category;
  tags: string[];
  icon?: string;
}

export interface CategoryItem {
  id: Category;
  label: string;
  icon: string;
}

export const CATEGORIES: CategoryItem[] = [
  { id: 'AI', label: 'AI', icon: 'lucide:sparkles' },
  { id: 'Frontend', label: 'Frontend', icon: 'lucide:monitor' },
  { id: 'Backend', label: 'Backend', icon: 'lucide:server' },
  { id: 'Design', label: 'Design', icon: 'lucide:palette' },
  { id: 'Deployment', label: 'Deployment', icon: 'lucide:rocket' },
  { id: 'Tools', label: 'Tools', icon: 'lucide:wrench' },
  { id: 'Open Source', label: 'Open Source', icon: 'lucide:github' },
];

// Make categories flexible: use string-based categories and derive a category list from sites.

export const KNOWN_CATEGORY_ICONS: Record<string, string> = {
  AI: 'lucide:sparkles',
  Frontend: 'lucide:monitor',
  Backend: 'lucide:server',
  Design: 'lucide:palette',
  Deployment: 'lucide:rocket',
  Tools: 'lucide:wrench',
  'Open Source': 'lucide:github',
};

export function deriveCategories(sites: Site[]): CategoryItem[] {
  const map = new Map<string, CategoryItem>();
  sites.forEach((s) => {
    const key = s.category || 'Tools';
    if (!map.has(key)) {
      map.set(key, {
        id: key,
        label: key,
        icon: KNOWN_CATEGORY_ICONS[key] || 'lucide:tag',
      });
    }
  });
  return Array.from(map.values()).sort((a, b) => a.label.localeCompare(b.label));
}

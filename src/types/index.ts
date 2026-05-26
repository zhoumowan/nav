export interface Site {
  id: string;
  title: string;
  description: string;
  url: string;
  category: Category;
  tags: string[];
  icon?: string;
}

export type Category =
  | 'AI'
  | 'Frontend'
  | 'Backend'
  | 'Design'
  | 'Deployment'
  | 'Tools'
  | 'Open Source'
  ;

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

export interface Site {
  id: string;
  title: string;
  description: string;
  url: string;
  category: Category;
  tags: string[];
  icon?: string;
  featured: boolean;
  createdAt: Date;
}

export type Category =
  | 'AI'
  | 'Frontend'
  | 'Backend'
  | 'Design'
  | 'DevOps'
  | 'Inspiration'
  | 'Blog'
  | 'Tools'
  | 'Open Source'
  | 'Productivity';

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
  { id: 'DevOps', label: 'DevOps', icon: 'lucide:cloud' },
  { id: 'Inspiration', label: 'Inspiration', icon: 'lucide:lightbulb' },
  { id: 'Blog', label: 'Blog', icon: 'lucide:book-open' },
  { id: 'Tools', label: 'Tools', icon: 'lucide:wrench' },
  { id: 'Open Source', label: 'Open Source', icon: 'lucide:github' },
  { id: 'Productivity', label: 'Productivity', icon: 'lucide:zap' },
];

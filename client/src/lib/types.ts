export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Task {
  id: string;
  columnId: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  assignees: string[]; // User IDs
  tags: string[];
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export interface Board {
  id: string;
  title: string;
  description: string;
  columns: Record<string, Column>;
  columnOrder: string[];
  tasks: Record<string, Task>;
  members: string[]; // User IDs
  background?: string;
}

// Initial Mock Data
export const MOCK_USERS: Record<string, User> = {
  'u1': { id: 'u1', name: 'Alex Chen', email: 'alex@example.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
  'u2': { id: 'u2', name: 'Sarah Jones', email: 'sarah@example.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  'u3': { id: 'u3', name: 'Mike Ross', email: 'mike@example.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
};

export const INITIAL_BOARD: Board = {
  id: 'b1',
  title: 'Product Launch 🚀',
  description: 'Q4 Marketing and Development Tasks',
  members: ['u1', 'u2', 'u3'],
  columns: {
    'c1': { id: 'c1', title: 'To Do', taskIds: ['t1', 't2'] },
    'c2': { id: 'c2', title: 'In Progress', taskIds: ['t3'] },
    'c3': { id: 'c3', title: 'Review', taskIds: ['t4'] },
    'c4': { id: 'c4', title: 'Done', taskIds: ['t5'] },
  },
  columnOrder: ['c1', 'c2', 'c3', 'c4'],
  tasks: {
    't1': { id: 't1', columnId: 'c1', title: 'Design System Audit', description: 'Review current components and identify inconsistencies.', priority: 'medium', assignees: ['u1'], tags: ['Design'] },
    't2': { id: 't2', columnId: 'c1', title: 'Competitor Analysis', description: 'Deep dive into top 3 competitors.', priority: 'low', assignees: ['u2'], tags: ['Strategy'] },
    't3': { id: 't3', columnId: 'c2', title: 'Implement Auth Flow', description: 'Connect Firebase authentication.', priority: 'high', assignees: ['u1', 'u3'], tags: ['Dev', 'Backend'] },
    't4': { id: 't4', columnId: 'c3', title: 'Landing Page Copy', description: 'Draft content for the new hero section.', priority: 'medium', assignees: ['u2'], tags: ['Content'] },
    't5': { id: 't5', columnId: 'c4', title: 'Setup Repo', description: 'Initialize git repository and CI/CD.', priority: 'high', assignees: ['u3'], tags: ['DevOps'] },
  },
};

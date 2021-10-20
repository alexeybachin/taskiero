import 'react';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    _priority?: string;
  }

  interface EventTarget extends EventTarget {
    title: HTMLInputElement;
    description: HTMLInputElement;
  }
}

export interface TaskType {
  id: number;
  status: string;
  title: string;
  description: string;
  priority: number;
  isCollapsed: boolean;
}

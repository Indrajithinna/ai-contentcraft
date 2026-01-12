export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select';
  placeholder?: string;
  options?: string[]; // For select type
  required?: boolean;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  icon: string; // Identifier for the icon component
  color: string; // Tailwind color class for icon background
  type?: 'text' | 'image' | 'audio'; // Defaults to 'text'
  promptTemplate: string; // Template string with placeholders like ${topic}
  fields: FormField[];
}

export interface HistoryItem {
  id: string;
  templateName: string;
  content: string;
  createdAt: string;
  inputs: Record<string, any>;
}
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      contact_messages: {
        Row: {
          created_at: string | null;
          email: string;
          id: number;
          is_read: boolean;
          message: string;
          name: string;
        };
        Insert: {
          created_at?: string | null;
          email: string;
          id?: never;
          is_read?: boolean;
          message: string;
          name: string;
        };
        Update: {
          created_at?: string | null;
          email?: string;
          id?: never;
          is_read?: boolean;
          message?: string;
          name?: string;
        };
        Relationships: [];
      };
      faqs: {
        Row: {
          answer: string;
          category: string | null;
          created_at: string | null;
          id: number;
          is_active: boolean;
          question: string;
          sort_order: number;
          updated_at: string | null;
        };
        Insert: {
          answer: string;
          category?: string | null;
          created_at?: string | null;
          id?: never;
          is_active?: boolean;
          question: string;
          sort_order?: number;
          updated_at?: string | null;
        };
        Update: {
          answer?: string;
          category?: string | null;
          created_at?: string | null;
          id?: never;
          is_active?: boolean;
          question?: string;
          sort_order?: number;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      partners: {
        Row: {
          created_at: string | null;
          id: number;
          is_active: boolean;
          label: string | null;
          logo_url: string | null;
          name: string;
          short_description: string | null;
          sort_order: number;
          type: string | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: never;
          is_active?: boolean;
          label?: string | null;
          logo_url?: string | null;
          name: string;
          short_description?: string | null;
          sort_order?: number;
          type?: string | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: never;
          is_active?: boolean;
          label?: string | null;
          logo_url?: string | null;
          name?: string;
          short_description?: string | null;
          sort_order?: number;
          type?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      portfolios: {
        Row: {
          category: string | null;
          created_at: string | null;
          id: number;
          is_active: boolean;
          sort_order: number;
          summary: string | null;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          category?: string | null;
          created_at?: string | null;
          id?: never;
          is_active?: boolean;
          sort_order?: number;
          summary?: string | null;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          category?: string | null;
          created_at?: string | null;
          id?: never;
          is_active?: boolean;
          sort_order?: number;
          summary?: string | null;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      settings: {
        Row: {
          created_at: string | null;
          email: string | null;
          id: number;
          logo_url: string | null;
          name: string;
          updated_at: string | null;
          wa: string | null;
        };
        Insert: {
          created_at?: string | null;
          email?: string | null;
          id?: number;
          logo_url?: string | null;
          name?: string;
          updated_at?: string | null;
          wa?: string | null;
        };
        Update: {
          created_at?: string | null;
          email?: string | null;
          id?: number;
          logo_url?: string | null;
          name?: string;
          updated_at?: string | null;
          wa?: string | null;
        };
        Relationships: [];
      };
      testimonials: {
        Row: {
          created_at: string | null;
          id: number;
          is_active: boolean;
          name: string;
          quote: string;
          role: string | null;
          sort_order: number;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: never;
          is_active?: boolean;
          name: string;
          quote: string;
          role?: string | null;
          sort_order?: number;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: never;
          is_active?: boolean;
          name?: string;
          quote?: string;
          role?: string | null;
          sort_order?: number;
          updated_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};

export type TableRow<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type TableInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type TableUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];

export type Setting = TableRow<'settings'>;
export type Testimonial = TableRow<'testimonials'>;
export type Partner = TableRow<'partners'>;
export type Portfolio = TableRow<'portfolios'>;
export type Faq = TableRow<'faqs'>;
export type ContactMessage = TableRow<'contact_messages'>;

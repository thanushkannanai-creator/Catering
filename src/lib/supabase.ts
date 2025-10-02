import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface GalleryImage {
  id: string;
  title: string;
  alt_text: string;
  image_url: string;
  category: 'Wedding' | 'Corporate' | 'Private' | 'Outdoor' | 'Luxury';
  created_at: string;
}

export interface Testimonial {
  id: string;
  reviewer_name: string;
  content: string;
  video_url?: string;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  thumbnail_url: string;
  excerpt: string;
  content: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  via_whatsapp: boolean;
  created_at: string;
}

export interface MenuItem {
  id: string;
  category: 'Vegetarian' | 'Non-Vegetarian' | 'Desserts';
  name: string;
  description: string;
  image_url: string;
  created_at: string;
}

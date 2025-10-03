import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Image, MessageSquare, FileText, Mail, Utensils } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { GalleryManager } from '../components/admin/GalleryManager';
import { TestimonialManager } from '../components/admin/TestimonialManager';
import { BlogManager } from '../components/admin/BlogManager';
import { MenuManager } from '../components/admin/MenuManager';
import { InquiriesViewer } from '../components/admin/InquiriesViewer';

export function AdminDashboard() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [stats, setStats] = useState({
    galleryImages: 0,
    testimonials: 0,
    blogPosts: 0,
    menuItems: 0,
    inquiries: 0
  });
  const [activeTab, setActiveTab] = useState<'gallery' | 'testimonials' | 'blog' | 'menu' | 'inquiries'>('gallery');

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchStats();
  }, [user, navigate]);

  const fetchStats = async () => {
    const [gallery, testimonials, blog, menu, inquiries] = await Promise.all([
      supabase.from('gallery_images').select('id', { count: 'exact', head: true }),
      supabase.from('testimonials').select('id', { count: 'exact', head: true }),
      supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
      supabase.from('menu_items').select('id', { count: 'exact', head: true }),
      supabase.from('contact_inquiries').select('id', { count: 'exact', head: true })
    ]);

    setStats({
      galleryImages: gallery.count || 0,
      testimonials: testimonials.count || 0,
      blogPosts: blog.count || 0,
      menuItems: menu.count || 0,
      inquiries: inquiries.count || 0
    });
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const tabs = [
    { id: 'gallery', label: 'Gallery', icon: Image, count: stats.galleryImages },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare, count: stats.testimonials },
    { id: 'blog', label: 'Blog Posts', icon: FileText, count: stats.blogPosts },
    { id: 'menu', label: 'Menu Items', icon: Utensils, count: stats.menuItems },
    { id: 'inquiries', label: 'Inquiries', icon: Mail, count: stats.inquiries }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50">
      <header className="bg-white shadow-md border-b border-amber-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-sm text-gray-600 mt-1">Manage shanvikcateringevents.com</p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all hover:scale-105"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.div
                key={tab.id}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`rounded-xl shadow-lg p-6 cursor-pointer transition-all ${
                  isActive
                    ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white'
                    : 'bg-white hover:shadow-xl'
                }`}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
              >
                <div className="flex flex-col items-center text-center">
                  <Icon className={isActive ? 'text-white' : 'text-amber-600'} size={32} />
                  <span className={`text-3xl font-bold mt-3 ${isActive ? 'text-white' : 'text-gray-800'}`}>
                    {tab.count}
                  </span>
                  <h3 className={`text-sm font-semibold mt-2 ${isActive ? 'text-white' : 'text-gray-700'}`}>
                    {tab.label}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          {activeTab === 'gallery' && <GalleryManager />}
          {activeTab === 'testimonials' && <TestimonialManager />}
          {activeTab === 'blog' && <BlogManager />}
          {activeTab === 'menu' && <MenuManager />}
          {activeTab === 'inquiries' && <InquiriesViewer />}
        </motion.div>
      </div>
    </div>
  );
}

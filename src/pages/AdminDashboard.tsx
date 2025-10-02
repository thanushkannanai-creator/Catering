import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Image, MessageSquare, FileText, Mail, Upload } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export function AdminDashboard() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [stats, setStats] = useState({
    galleryImages: 0,
    testimonials: 0,
    blogPosts: 0,
    inquiries: 0
  });
  const [activeTab, setActiveTab] = useState<'gallery' | 'testimonials' | 'blog' | 'inquiries'>('gallery');

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchStats();
  }, [user, navigate]);

  const fetchStats = async () => {
    const [gallery, testimonials, blog, inquiries] = await Promise.all([
      supabase.from('gallery_images').select('id', { count: 'exact', head: true }),
      supabase.from('testimonials').select('id', { count: 'exact', head: true }),
      supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
      supabase.from('contact_inquiries').select('id', { count: 'exact', head: true })
    ]);

    setStats({
      galleryImages: gallery.count || 0,
      testimonials: testimonials.count || 0,
      blogPosts: blog.count || 0,
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
    { id: 'inquiries', label: 'Inquiries', icon: Mail, count: stats.inquiries }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-sm text-gray-600">Manage your catering website</p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition-colors"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.div
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg shadow-md p-6 cursor-pointer"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className="text-amber-600" size={32} />
                  <span className="text-3xl font-bold text-gray-800">{tab.count}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-700">{tab.label}</h3>
              </motion.div>
            );
          })}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              {tabs.find(t => t.id === activeTab)?.label}
            </h2>
            <button className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors">
              <Upload size={20} />
              Add New
            </button>
          </div>

          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">Content management interface for {activeTab}</p>
            <p className="text-sm mt-2">Upload and manage your {activeTab} here</p>
          </div>
        </div>
      </div>
    </div>
  );
}

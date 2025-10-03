import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageSquare, Calendar, Trash2 } from 'lucide-react';
import { supabase, ContactInquiry } from '../../lib/supabase';

export function InquiriesViewer() {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    const { data, error } = await supabase
      .from('contact_inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setInquiries(data);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this inquiry?')) {
      const { error } = await supabase
        .from('contact_inquiries')
        .delete()
        .eq('id', id);

      if (!error) {
        fetchInquiries();
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Contact Inquiries</h2>
        <div className="bg-amber-100 text-amber-700 px-4 py-2 rounded-lg font-semibold">
          {inquiries.length} Total
        </div>
      </div>

      <div className="space-y-4">
        {inquiries.map((inquiry) => (
          <motion.div
            key={inquiry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-1">{inquiry.name}</h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <a href={`mailto:${inquiry.email}`} className="hover:text-amber-600">
                      {inquiry.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    <a href={`tel:${inquiry.phone}`} className="hover:text-amber-600">
                      {inquiry.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{formatDate(inquiry.created_at)}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDelete(inquiry.id)}
                className="text-red-600 hover:text-red-700 transition-colors"
                title="Delete inquiry"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-2">
                <MessageSquare size={16} className="text-gray-500 mt-1" />
                <p className="text-gray-700 flex-1">{inquiry.message}</p>
              </div>
            </div>

            <div className="flex gap-2">
              {inquiry.via_whatsapp && (
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  <Phone size={14} />
                  WhatsApp Requested
                </span>
              )}
              <a
                href={`https://wa.me/919840650939?text=Hi ${inquiry.name}, regarding your inquiry...`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                <Phone size={16} />
                Contact via WhatsApp
              </a>
              <a
                href={`mailto:${inquiry.email}`}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Mail size={16} />
                Send Email
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {inquiries.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Mail size={48} className="mx-auto mb-4 text-gray-400" />
          <p>No inquiries yet. They will appear here when customers contact you.</p>
        </div>
      )}
    </div>
  );
}

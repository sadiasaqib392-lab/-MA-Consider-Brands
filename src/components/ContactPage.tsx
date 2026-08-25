import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Phone,
  Mail,
  Send,
  CheckCircle2,
  Clock,
  Globe,
  MessageSquare,
  HelpCircle
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Tool Inquiries & Product Information',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Missing Information', 'Please fill in all required fields.', 'warning');
      return;
    }

    setIsSubmitted(true);
    showToast('Message Sent', 'Thank you! Your message has been routed to our customer support desk.');
  };

  return (
    <div className="bg-zinc-950 min-h-screen py-12 px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Direct Customer Support</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-100 font-display tracking-tight">
            Contact MA Consider Brands
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Have questions about a MA CONSIDER tool, order tracking, battery compatibility, or contractor bulk purchases? Get in touch with our team directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-6 shadow-xl">
              <h2 className="text-lg font-bold text-zinc-100 font-display border-b border-zinc-800 pb-3">
                Store Contact Information
              </h2>

              <div className="space-y-4 text-xs">
                {/* Phone */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800">
                  <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-zinc-400 font-semibold block">Phone Support</span>
                    <a
                      href="tel:+923155959375"
                      className="text-sm font-bold text-zinc-100 hover:text-amber-400 transition-colors font-mono"
                    >
                      +92 315 5959375
                    </a>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                      Direct voice & WhatsApp inquiries for quick assistance
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800">
                  <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-zinc-400 font-semibold block">Email Support</span>
                    <a
                      href="mailto:chabidjani06@gmail.com"
                      className="text-sm font-bold text-zinc-100 hover:text-amber-400 transition-colors"
                    >
                      chabidjani06@gmail.com
                    </a>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                      We respond to email inquiries within 24 business hours
                    </p>
                  </div>
                </div>

                {/* Primary Market */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800">
                  <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-zinc-400 font-semibold block">Primary Fulfillment Market</span>
                    <span className="text-sm font-bold text-zinc-100">
                      United States of America
                    </span>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                      Nationwide delivery via commercial freight & express courier
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800">
                  <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-zinc-400 font-semibold block">Customer Desk Hours</span>
                    <span className="text-zinc-200 font-medium">
                      Mon – Sat: 8:00 AM – 8:00 PM (EST)
                    </span>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                      Online webstore is open 24/7 for order processing
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl">
              {isSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-400/15 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-100 font-display">
                    Thank You, Message Received!
                  </h3>
                  <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                    We have received your message regarding <strong>{formData.subject}</strong>. A member of the MA Consider Brands support team will respond to <strong>{formData.email}</strong> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: 'Tool Inquiries & Product Information',
                        message: ''
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-lg bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-100 font-display mb-1">
                      Send Us a Direct Message
                    </h3>
                    <p className="text-zinc-400 text-xs mb-4">
                      Fill out the form below and we will get back to you promptly.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-zinc-300 font-semibold mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Michael Stewart"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-300 font-semibold mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="michael@contracting.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-zinc-300 font-semibold mb-1">Phone Number (Optional)</label>
                      <input
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-300 font-semibold mb-1">Inquiry Subject *</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:border-amber-400 focus:outline-none"
                      >
                        <option>Tool Inquiries & Product Information</option>
                        <option>Order Tracking & Shipping Status</option>
                        <option>Contractor Bulk & Commercial Quotes</option>
                        <option>30-Day Returns & Exchanges</option>
                        <option>General Support Question</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">Your Message *</label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Please describe your question or specify the tool model numbers you need help with..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

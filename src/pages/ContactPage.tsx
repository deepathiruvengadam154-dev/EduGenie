import { useState, type FormEvent } from 'react';
import { Mail, MessageSquare, User, Send, MapPin, Phone, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.message.trim()) errs.message = 'Message is required';
    else if (form.message.trim().length < 10) errs.message = 'Message must be at least 10 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!validate()) return;

    try {
      const contacts = JSON.parse(localStorage.getItem('edugenie_contacts') || '[]');
      contacts.push({ ...form, submittedAt: new Date().toISOString() });
      localStorage.setItem('edugenie_contacts', JSON.stringify(contacts));
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setError('Failed to submit. Please try again.');
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="absolute -top-12 left-0 h-64 w-64 rounded-full bg-accent-200/30 blur-3xl dark:bg-accent-900/20" />
        <div className="container-max relative px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold text-brand-600 dark:text-brand-400">CONTACT</span>
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
              Get in Touch
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-gray-600 dark:text-gray-300">
              Have a question or feedback? We'd love to hear from you. Fill out the form below and we'll
              get back to you soon.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Contact Info */}
            <div className="space-y-4">
              {[
                { icon: Mail, title: 'Email Us', value: 'support@edugenie.com', desc: 'We reply within 24 hours' },
                { icon: Phone, title: 'Call Us', value: '+1 (555) 123-4567', desc: 'Mon-Fri, 9am-6pm EST' },
                { icon: MapPin, title: 'Visit Us', value: '123 Education Street, Learning City', desc: 'Suite 400, Academic Building' },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className="card p-6 animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 dark:bg-brand-900/30">
                    <item.icon className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                  </div>
                  <h3 className="mt-4 font-bold text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="mt-1 text-sm font-medium text-brand-600 dark:text-brand-400">{item.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="card p-8">
                {submitted && (
                  <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 animate-fade-in">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                    Message sent successfully! We'll get back to you soon.
                  </div>
                )}

                {error && (
                  <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => {
                          setForm({ ...form, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        placeholder="Your name"
                        className={`input-field pl-10 ${errors.name ? 'border-red-400' : ''}`}
                      />
                    </div>
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => {
                          setForm({ ...form, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        placeholder="your@email.com"
                        className={`input-field pl-10 ${errors.email ? 'border-red-400' : ''}`}
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <textarea
                        rows={5}
                        value={form.message}
                        onChange={(e) => {
                          setForm({ ...form, message: e.target.value });
                          if (errors.message) setErrors({ ...errors, message: '' });
                        }}
                        placeholder="Your message..."
                        className={`input-field pl-10 resize-none ${errors.message ? 'border-red-400' : ''}`}
                      />
                    </div>
                    {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                  </div>

                  <button type="submit" className="btn-primary w-full">
                    <Send className="h-4 w-4" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

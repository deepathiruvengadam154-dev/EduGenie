import { useState, type FormEvent } from 'react';
import { UserPlus, Mail, Lock, User, Building2, Calendar, AlertCircle, CheckCircle2, GraduationCap } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { navigate } from '@/lib/router';
import type { User as UserType } from '@/types';

const departments = ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Civil', 'Electrical'];
const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

export default function RegisterPage() {
  const { register } = useAuth();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    department: '',
    year: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required';
    else if (form.fullName.trim().length < 2) errs.fullName = 'Name must be at least 2 characters';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (!form.department) errs.department = 'Please select a department';
    if (!form.year) errs.year = 'Please select a year';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    if (!validate()) return;

    const newUser: UserType = {
      fullName: form.fullName.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
      department: form.department,
      year: form.year,
      createdAt: new Date().toISOString(),
    };

    const result = register(newUser);
    if (!result.success) {
      setSubmitError(result.error || 'Registration failed');
      return;
    }

    setShowSuccess(true);
    setTimeout(() => navigate('dashboard'), 1200);
  };

  const update = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  if (showSuccess) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4">
        <div className="text-center animate-scale-in">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-900/30">
            <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Registration Successful!</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="card p-8">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 shadow-lg shadow-brand-600/30">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Create Account</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Join EduGenie and start learning smarter
            </p>
          </div>

          {submitError && (
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => update('fullName', e.target.value)}
                  placeholder="John Doe"
                  className={`input-field pl-10 ${errors.fullName ? 'border-red-400' : ''}`}
                />
              </div>
              {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="john@example.com"
                  className={`input-field pl-10 ${errors.email ? 'border-red-400' : ''}`}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => update('password', e.target.value)}
                  placeholder="Min. 6 characters"
                  className={`input-field pl-10 ${errors.password ? 'border-red-400' : ''}`}
                />
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Department</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <select
                  value={form.department}
                  onChange={(e) => update('department', e.target.value)}
                  className={`input-field pl-10 ${errors.department ? 'border-red-400' : ''}`}
                >
                  <option value="">Select department</option>
                  {departments.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              {errors.department && <p className="mt-1 text-xs text-red-500">{errors.department}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Year</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <select
                  value={form.year}
                  onChange={(e) => update('year', e.target.value)}
                  className={`input-field pl-10 ${errors.year ? 'border-red-400' : ''}`}
                >
                  <option value="">Select year</option>
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              {errors.year && <p className="mt-1 text-xs text-red-500">{errors.year}</p>}
            </div>

            <button type="submit" className="btn-primary w-full">
              <UserPlus className="h-4 w-4" />
              Register
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{' '}
            <button onClick={() => navigate('login')} className="font-semibold text-brand-600 hover:underline dark:text-brand-400">
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

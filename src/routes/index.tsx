import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage';
import { ProtectedRoute } from './ProtectedRoute';
import { Loader2 } from 'lucide-react';

// Lazy loading admin pages
const AdminLayout = lazy(() =>
  import('../pages/admin/AdminLayout').then((m) => ({ default: m.AdminLayout }))
);
const Login = lazy(() =>
  import('../pages/admin/Login').then((m) => ({ default: m.Login }))
);
const Dashboard = lazy(() =>
  import('../pages/admin/Dashboard').then((m) => ({ default: m.Dashboard }))
);
const SettingsPage = lazy(() =>
  import('../pages/admin/Settings').then((m) => ({ default: m.SettingsPage }))
);
const TestimonialsList = lazy(() =>
  import('../pages/admin/testimonials/List').then((m) => ({ default: m.TestimonialsList }))
);
const PartnersList = lazy(() =>
  import('../pages/admin/partners/List').then((m) => ({ default: m.PartnersList }))
);
const PortfoliosList = lazy(() =>
  import('../pages/admin/portfolios/List').then((m) => ({ default: m.PortfoliosList }))
);
const FaqsList = lazy(() =>
  import('../pages/admin/faqs/List').then((m) => ({ default: m.FaqsList }))
);
const MessagesList = lazy(() =>
  import('../pages/admin/messages/List').then((m) => ({ default: m.MessagesList }))
);

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
    <div className="flex flex-col items-center gap-3">
      <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
      <span className="text-xs text-slate-500 dark:text-slate-400">Memuat halaman...</span>
    </div>
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="testimonials" element={<TestimonialsList />} />
            <Route path="partners" element={<PartnersList />} />
            <Route path="portfolios" element={<PortfoliosList />} />
            <Route path="faqs" element={<FaqsList />} />
            <Route path="messages" element={<MessagesList />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route>

        {/* Catch-all redirect to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

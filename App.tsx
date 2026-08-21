import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AppProvider } from '@/context/AppContext';
import { ToastProvider } from '@/components/ui/Toast';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/pages/HomePage';
import { ExplorePage } from '@/pages/ExplorePage';
import { CarDetailsPage } from '@/pages/CarDetailsPage';
import { ComparePage } from '@/pages/ComparePage';
import { WishlistPage } from '@/pages/WishlistPage';
import { TestDrivePage } from '@/pages/TestDrivePage';
import { EnquiryPage } from '@/pages/EnquiryPage';
import { BrandsPage } from '@/pages/BrandsPage';
import { LoginPage } from '@/pages/LoginPage';
import { AdminLayout } from '@/pages/admin/AdminLayout';
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { AdminCarsPage } from '@/pages/admin/AdminCarsPage';
import { AdminCarFormPage } from '@/pages/admin/AdminCarFormPage';
import { AdminBrandsPage } from '@/pages/admin/AdminBrandsPage';
import { AdminCategoriesPage } from '@/pages/admin/AdminCategoriesPage';
import { AdminEnquiriesPage } from '@/pages/admin/AdminEnquiriesPage';
import { AdminTestDrivesPage } from '@/pages/admin/AdminTestDrivesPage';
import { AdminCustomersPage } from '@/pages/admin/AdminCustomersPage';
import { AdminSettingsPage } from '@/pages/admin/AdminSettingsPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <ToastProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Admin routes (no customer navbar/footer) */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="cars" element={<AdminCarsPage />} />
              <Route path="cars/new" element={<AdminCarFormPage />} />
              <Route path="cars/:id/edit" element={<AdminCarFormPage />} />
              <Route path="brands" element={<AdminBrandsPage />} />
              <Route path="categories" element={<AdminCategoriesPage />} />
              <Route path="enquiries" element={<AdminEnquiriesPage />} />
              <Route path="test-drives" element={<AdminTestDrivesPage />} />
              <Route path="customers" element={<AdminCustomersPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>

            {/* Login */}
            <Route path="/login" element={<CustomerLayout><LoginPage /></CustomerLayout>} />

            {/* Customer routes */}
            <Route path="/" element={<CustomerLayout><HomePage /></CustomerLayout>} />
            <Route path="/explore" element={<CustomerLayout><ExplorePage /></CustomerLayout>} />
            <Route path="/car/:id" element={<CustomerLayout><CarDetailsPage /></CustomerLayout>} />
            <Route path="/compare" element={<CustomerLayout><ComparePage /></CustomerLayout>} />
            <Route path="/wishlist" element={<CustomerLayout><WishlistPage /></CustomerLayout>} />
            <Route path="/test-drive" element={<CustomerLayout><TestDrivePage /></CustomerLayout>} />
            <Route path="/enquiry" element={<CustomerLayout><EnquiryPage /></CustomerLayout>} />
            <Route path="/brands" element={<CustomerLayout><BrandsPage /></CustomerLayout>} />
            <Route path="*" element={<CustomerLayout><HomePage /></CustomerLayout>} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AppProvider>
  );
}

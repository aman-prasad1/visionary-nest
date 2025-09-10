import { Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import PageTransition from './components/PageTransition';
import PaperCanvas from './components/PaperCanvas';
import { usePageTransition } from './hooks/usePageTransition';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Browse = lazy(() => import('./pages/Browse'));
const Auth = lazy(() => import('./pages/Auth'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const CreatePortfolio = lazy(() => import('./pages/CreatePortfolio'));
const Profile = lazy(() => import('./pages/Profile'));
const Students = lazy(() => import('./pages/Students'));
const Recruiters = lazy(() => import('./pages/Recruiters'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const MainLandingPage = lazy(() => import('./components/main-landingpage'));
const VisionaryNestLandingPage = lazy(() => import('./components/ui/VisionaryNestLandingPage'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
  </div>
);

function App() {
  const location = useLocation();
  usePageTransition();

  return (
    <Layout>
      <PaperCanvas />
      <PageTransition>
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/" element={<MainLandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />
            <Route path="/students" element={<Students />} />
            <Route path="/recruiters" element={<Recruiters />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:userId" element={<Portfolio />} />
            <Route path="/visionary-nest" element={<VisionaryNestLandingPage />} />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreatePortfolio />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            {/* Catch-all route for 404s */}
            <Route 
              path="*" 
              element={
                <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center text-white">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                    <p className="text-gray-300 mb-8">The page you're looking for doesn't exist.</p>
                    <a href="/" className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition-colors">
                      Go Home
                    </a>
                  </div>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </PageTransition>
    </Layout>
  );
}

export default App;

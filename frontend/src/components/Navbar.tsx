import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Input, Dropdown, Avatar } from 'antd';
import { SearchOutlined, UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import VisionaryNestLogo from './ui/VisionaryNestLogo';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'My Profile',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'portfolio',
      icon: <UserOutlined />,
      label: 'View Portfolio',
      onClick: () => navigate(`/portfolio/${user?.username}`),
    },
    {
      key: 'edit',
      icon: <SettingOutlined />,
      label: 'Edit Portfolio',
      onClick: () => navigate('/create'),
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  const navLinks = [
    { to: '/browse', text: 'Browse Portfolios' },
    { to: '/students', text: 'For Students' },
    { to: '/recruiters', text: 'For Recruiters' },
  ];

  if (isAuthenticated) {
    navLinks.push({ to: '/create', text: 'Create Portfolio' });
  }

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-black/20 backdrop-blur-xl px-4 sm:px-6 md:px-8 py-4 shadow-2xl shadow-purple-500/10 sticky top-0 z-50 border-b border-white/10"
        style={{
          background: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <RouterLink to="/visionary-nest" onClick={() => setIsMenuOpen(false)}>
            <VisionaryNestLogo />
          </RouterLink>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8 list-none">
            {navLinks.map((link) => (
              <li key={link.to}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <RouterLink
                    to={link.to}
                    className="font-medium text-white/80 hover:text-white hover:no-underline transition-all duration-300 relative group"
                  >
                    {link.text}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
                  </RouterLink>
                </motion.div>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Enhanced Search Bar */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.02 }}
              className="relative hidden sm:block"
            >
              <Input
                placeholder="Search..."
                allowClear
                prefix={<SearchOutlined className="text-gray-400" />}
                className="w-32 md:w-48 h-10 bg-white/10 border-white/20 text-white rounded-lg focus:ring-purple-500"
              />
            </motion.div>

            {/* Auth Buttons and User Dropdown */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
                  <motion.div
                    className="flex items-center gap-3 cursor-pointer p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Avatar src={user?.avatar?.public_url} icon={<UserOutlined />} size="small" />
                    <span className="hidden lg:block text-white font-medium">
                      {user?.fullname || user?.username}
                    </span>
                  </motion.div>
                </Dropdown>
              ) : (
                <>
                  <RouterLink to="/auth">
                    <Button ghost className="text-white border-white/80 hover:text-white hover:border-purple-400 hover:bg-purple-500/20 rounded-md transition-colors duration-300">Login</Button>
                  </RouterLink>
                  <RouterLink to="/auth">
                    <Button type="primary" className="bg-gradient-to-r from-purple-500 to-blue-500">Sign Up</Button>
                  </RouterLink>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-[72px] left-0 w-full h-[calc(100vh-72px)] bg-black/80 backdrop-blur-lg z-40 p-6"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link) => (
                <RouterLink
                  key={link.to}
                  to={link.to}
                  className="text-2xl font-bold text-white/80 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.text}
                </RouterLink>
              ))}
              <div className="mt-8 flex items-center gap-4">
                {isAuthenticated ? (
                   <Dropdown menu={{ items: userMenuItems }} placement="topCenter" arrow>
                     <motion.div
                       className="flex items-center flex-col gap-2 cursor-pointer"
                       whileHover={{ scale: 1.05 }}
                     >
                       <Avatar src={user?.avatar?.public_url} icon={<UserOutlined />} size="large" />
                       <span className="text-white font-medium">{user?.fullname || user?.username}</span>
                     </motion.div>
                   </Dropdown>
                ) : (
                  <>
                    <RouterLink to="/auth" onClick={() => setIsMenuOpen(false)}>
                      <Button ghost size="large" className="text-white/80 border-white/80 hover:text-white hover:border-purple-400 hover:bg-purple-500/20 rounded-md text-xl transition-colors duration-300">Login</Button>
                    </RouterLink>
                    <RouterLink to="/auth" onClick={() => setIsMenuOpen(false)}>
                      <Button type="primary" size="large" className="bg-gradient-to-r from-purple-500 to-blue-500 text-xl">Sign Up</Button>
                    </RouterLink>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AuthProvider } from './contexts/AuthContext';
import { LenisProvider, useLenis } from './contexts/LenisContext';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

// Ant Design + theme
import 'antd/dist/reset.css';
import { App as AntApp, ConfigProvider, theme as antdTheme } from 'antd';

// Smooth scrolling
import Lenis from '@studio-freight/lenis';

const AppWithLenis = () => {
  const { isLenisEnabled } = useLenis();

  useEffect(() => {
    // Disable Lenis entirely to fix scrolling issues
    // The native browser scrolling with CSS scroll-behavior: smooth is sufficient
    return;
  }, [isLenisEnabled]);

  return <App />;
};

const Root = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <ConfigProvider
            theme={{
              algorithm: antdTheme.defaultAlgorithm,
              token: { colorPrimary: '#7c3aed', borderRadius: 8 },
            }}
          >
            <AntApp>
              <ErrorBoundary>
                <LenisProvider>
                  <AppWithLenis />
                </LenisProvider>
              </ErrorBoundary>
            </AntApp>
          </ConfigProvider>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const existingRoot = (rootElement as any)._reactInternalInstance;
let root;

if (existingRoot) {
  root = { render: (element: React.ReactElement) => { return; } };
} else {
  root = createRoot(rootElement);
}

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
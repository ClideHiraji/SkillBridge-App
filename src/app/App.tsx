import { RouterProvider } from 'react-router';
import { router } from './routes';
import { useResponsive } from '../hooks/useResponsive';
import { Toaster } from 'sonner';

function MobilePhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative bg-white overflow-hidden flex flex-col"
      style={{
        width: 390,
        height: 844,
        maxHeight: '100dvh',
        maxWidth: '100vw',
      }}
    >
      {/* App content - full screen */}
      <div className="flex-1 overflow-hidden min-h-0">
        {children}
      </div>
    </div>
  );
}

export default function App() {
  const { isMobile } = useResponsive();

  return (
    <div className="w-screen h-screen">
      {isMobile ? (
        // Mobile: Show phone mockup centered
        <div className="flex items-center justify-center h-full" style={{ background: '#0d0f1a' }}>
          <MobilePhoneFrame>
            <RouterProvider router={router} />
          </MobilePhoneFrame>
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-medium"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            SkillBridge MVP — Interactive Prototype
          </div>
        </div>
      ) : (
        // Desktop/Tablet: Full responsive layout
        <div className="w-screen h-screen flex flex-col" style={{ background: '#f8f9fa' }}>
          <RouterProvider router={router} />
        </div>
      )}
      <Toaster position="top-right" />
    </div>
  );
}

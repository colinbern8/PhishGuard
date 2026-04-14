import { RouterProvider } from 'react-router';
import { router } from './routes.tsx';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from './lib/theme-provider';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="phishguard-ui-theme">
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
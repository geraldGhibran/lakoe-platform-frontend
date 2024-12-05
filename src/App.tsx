import { RouterProvider } from 'react-router-dom';
import { Providers } from './provider';
import { router } from './routes';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <Providers>
      <Toaster />
      <RouterProvider router={router} />
    </Providers>
  );
}

export default App;

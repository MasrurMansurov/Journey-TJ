import { GlobalStyles, CssBaseline } from '@mui/material';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
  import { ThemeProvider } from '@mui/material/styles';
  import { lightTheme, darkTheme } from './theme/theme';
import { useCities } from './store/Cities';
import { Suspense, lazy } from 'react';
import Loading from './components/shared/Loading/Loading';

const Home = lazy(() => import('./pages/home/Home'));
const Cities = lazy(() => import('./pages/cities/Cities'));
const About = lazy(() => import('./pages/about/About'));
const City = lazy(() => import('./pages/country/City'));
const Layout = lazy(() => import('./layout/Layout'));

const App = () => {
  const { isDarkMode } = useCities();

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Suspense fallback={<Loading />}>
          <Layout />
        </Suspense>
      ),
      children: [
        {
          path: '/',
          element: (
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          )
        },
        {
          path: '/cities',
          element: (
            <Suspense fallback={<Loading />}>
              <Cities />
            </Suspense>
          )
        },
        {
          path: '/about',
          element: (
            <Suspense fallback={<Loading />}>
              <About />
            </Suspense>
          )
        },
        {
          path: '/city/:name',
          element: (
            <Suspense fallback={<Loading />}>
              <City />
            </Suspense>
          )
        },
      ],
    },
    {
      path: '/loginSingUp',
      element: (
        <Suspense fallback={<Loading />}>
          <LogInSingUp />
        </Suspense>
      )
    }
  ]);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: isDarkMode ? '#2d2d2d' : 'white' } }} />
      <Suspense fallback={<div>Loading app...</div>}>
        </Suspense>
        <GlobalStyles styles={{ body: { backgroundColor: isDarkMode? '#2d2d2d' : 'white' } }} />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;

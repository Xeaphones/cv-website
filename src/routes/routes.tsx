import type { RouteObject } from 'react-router-dom';
import Home from '../pages/home';
import Projects from '../pages/project';
import Contact from '../pages/contact';
import More from '../pages/more';
import Error404 from '../pages/404';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'projects',
    element: <Projects />,
  },
  {
    path: 'contact',
    element: <Contact />,
  },
  {
    path: 'more',
    element: <More />,
  },
  {
    path: '*',
    element: <Error404 />
  }
];
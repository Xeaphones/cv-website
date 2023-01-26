import type { RouteObject } from 'react-router-dom';
import Home from '../pages/home';
import Projects from '../pages/project';
import Contact from '../pages/contact';
import More from '../pages/more';

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
];
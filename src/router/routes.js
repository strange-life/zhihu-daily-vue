import Default from 'layouts/Default';
import Index from 'pages/Index/Index';

const routes = [
  {
    path: '/',
    component: Default,
    children: [{ path: '', name: 'index', component: Index }],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404'),
  });
}

export default routes;

import Home from 'pages/Home/Home';
import Story from 'pages/Story/Story';

const Comment = () => import('pages/Comment/Comment');
const Error404 = () => import('pages/Error404');

export default [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/story/:id',
    name: 'story',
    component: Story,
    props(route) {
      return { id: Number(route.params.id) };
    },
  },
  {
    path: '/comment/:id',
    name: 'comment',
    component: Comment,
    props(route) {
      return { id: Number(route.params.id) };
    },
  },
  {
    path: '*',
    component: Error404,
  },
];

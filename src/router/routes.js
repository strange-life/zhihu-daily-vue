import Default from 'layouts/Default';
import { Home, HomeNavigation } from 'pages/Home';
import { Story, StoryNavigation } from 'pages/Story';

const Error404 = () => import('pages/Error404');

export default [
  {
    path: '/',
    component: Default,
    children: [
      { path: '', name: 'index', components: { default: Home, navigation: HomeNavigation } },
      {
        path: '/story/:id',
        name: 'story',
        components: { default: Story, navigation: StoryNavigation },
        props: {
          default(route) {
            return { id: Number(route.params.id) };
          },
          navigation(route) {
            return { id: Number(route.params.id) };
          },
        },
      },
    ],
  },
  {
    path: '*',
    component: Error404,
  },
];

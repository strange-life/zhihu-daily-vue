import Default from 'layouts/Default';
import Index from 'pages/Index/Index';
import IndexNavigation from 'pages/Index/components/IndexNavigation';
import Story from 'pages/Story/Story';
import StoryNavigation from 'pages/Story/components/StoryNavigation';

const Error404 = () => import('pages/Error404');

export default [
  {
    path: '/',
    component: Default,
    children: [
      { path: '', name: 'index', components: { default: Index, navigation: IndexNavigation } },
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

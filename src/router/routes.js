import Default from 'layouts/Default';
import Index from 'pages/Index/Index';
import IndexNavigation from 'pages/Index/components/IndexNavigation';
import Story from 'pages/Story/Story';
import StoryNavigation from 'pages/Story/components/StoryNavigation';

const routes = [
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
          navigation: false,
        },
      },
    ],
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

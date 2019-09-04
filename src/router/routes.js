import store from 'src/store';
import Default from 'layouts/Default';
import { Home, HomeNavigation } from 'pages/Home';
import { Story, StoryNavigation } from 'pages/Story';
import { Comment, CommentNavigation, CommentModule } from 'pages/Comment';

const Error404 = () => import('pages/Error404');

export default [
  {
    path: '/',
    component: Default,
    children: [
      {
        path: '',
        name: 'home',
        components: { default: Home, navigation: HomeNavigation },
      },
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
      {
        path: '/comment/:id',
        name: 'comment',
        components: { default: Comment, navigation: CommentNavigation },
        props: {
          default(route) {
            return { id: Number(route.params.id) };
          },
          navigation(route) {
            return { id: Number(route.params.id) };
          },
        },
        async beforeEnter(to, from, next) {
          if (!store.state.comment) {
            store.registerModule('comment', (await CommentModule()).default);
          }

          next();
        },
      },
    ],
  },
  {
    path: '*',
    component: Error404,
  },
];

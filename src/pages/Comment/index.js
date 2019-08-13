const Comment = () => import(/* webpackChunkName: "comment" */ './Comment');
const CommentNavigation = () => import(/* webpackChunkName: "comment" */ './CommentNavigation');
const CommentModule = () => import(/* webpackChunkName: "comment" */ './store');

export { Comment, CommentNavigation, CommentModule };

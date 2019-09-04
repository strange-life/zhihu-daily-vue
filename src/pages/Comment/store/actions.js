import axios from 'axios';
import { proxyImage } from 'src/utils';

export async function getComments({ commit }, id) {
  const {
    data: { comments },
  } = await axios.get(`/comment/${id}`);

  comments.forEach((comment) => {
    comment.avatar = proxyImage(comment.avatar);
  });

  commit('setComments', comments);
}

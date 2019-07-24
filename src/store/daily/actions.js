import { axios } from 'boot/axios';
import { proxyImage, parseDate } from 'src/utils';

export async function getTopStories({ commit }) {
  const {
    data: { top_stories: topStories },
  } = await axios.get('news');

  topStories.forEach((story) => {
    story.image = proxyImage(story.image);
  });

  commit('setTopStories', topStories);
  commit('setCurrentStoryId', topStories[0].id);
}

export async function getDailies({ getters, commit }, index) {
  const {
    data: { date, stories },
  } = await axios.get('before', {
    params: {
      date: getters.currentDate,
    },
  });
  const dateText = parseDate(date);

  stories.forEach((story) => {
    story.image = proxyImage(story.images[0]);
  });

  commit('setDaily', {
    index,
    data: {
      date,
      dateText,
      stories,
    },
  });
}

<template>
  <q-page>
    <q-pull-to-refresh @refresh="refresh" style="min-height:inherit;">
      <story-carousel
        v-model="currentStoryId"
        :stories="topStories"
        @detail="getStory"
      />
    </q-pull-to-refresh>
  </q-page>
</template>

<script>
import StoryCarousel from './components/StoryCarousel';

export default {
  name: 'PageIndex',
  components: { StoryCarousel },
  data() {
    return {
      topStories: [],
      currentStoryId: 0,
      news: [],
    };
  },
  mounted() {
    this.getNews();
  },
  methods: {
    async refresh(done) {
      await this.getNews();
      done();
    },
    async getNews() {
      try {
        const {
          data: { date, stories, top_stories: topStories },
        } = await this.$axios.get('news');

        topStories.forEach((story) => {
          story.image = `${
            window.location.origin
          }/.netlify/functions/images?src=${story.image}`;
        });

        this.topStories = topStories;
        this.currentStoryId = topStories[0].id;
        this.news = [{ date, stories }];
      } catch (error) {
        this.$q.notify('获取新闻列表失败');
      }
    },
    getStory(id) {
      console.log(`storyId: ${id}`);
    },
  },
};
</script>

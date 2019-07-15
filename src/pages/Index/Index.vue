<template>
  <q-pull-to-refresh @refresh="refresh">
    <q-infinite-scroll :offset="30" ref="infiniteScroll" @load="getNews">
      <q-page>
        <story-carousel
          v-model="currentStoryId"
          :stories="topStories"
          @detail="getStory"
        />

        <story-list :news="news" @detail="getStory" />
      </q-page>

      <template v-slot:loading>
        <div class="flex justify-center">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </q-pull-to-refresh>
</template>

<script>
import StoryCarousel from './components/StoryCarousel';
import StoryList from './components/StoryList';

export default {
  name: 'PageIndex',
  components: { StoryCarousel, StoryList },
  data() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const date = String(tomorrow.getDate()).padStart(2, '0');
    const tomorrowText = `${tomorrow.getFullYear()}${month}${date}`;

    return {
      topStories: [],
      currentStoryId: 0,
      news: [],
      currentDate: tomorrowText,
      tomorrow: tomorrowText,
      dateReg: /^(\d{4})(\d{2})(\d{2})$/,
      weekDays: [
        '星期日',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
      ],
    };
  },
  mounted() {
    this.getTopStories();
  },
  methods: {
    async refresh(done) {
      this.news = [];
      this.currentDate = this.tomorrow;
      this.$refs.infiniteScroll.reset();
      this.$refs.infiniteScroll.poll();
      await this.getTopStories();
      done();
    },
    async getTopStories() {
      try {
        const {
          data: { top_stories: topStories },
        } = await this.$axios.get('news');

        topStories.forEach((story) => {
          story.image = this.$utils.proxyImage(story.image);
        });

        this.topStories = topStories;
        this.currentStoryId = topStories[0].id;
      } catch (error) {
        this.$q.notify('获取轮播新闻失败');
      }
    },
    async getNews(index, done) {
      try {
        const {
          data: { date, stories },
        } = await this.$axios.get('before', {
          params: {
            date: this.currentDate,
          },
        });
        const [, year, month, day] = this.dateReg.exec(date);
        const dateText = `${month}月${day}日 ${
          this.weekDays[new Date(year, Number(month) - 1, day).getDay()]
        }`;

        stories.forEach((story) => {
          story.image = this.$utils.proxyImage(story.images[0]);
        });
        this.currentDate = date;
        this.$set(this.news, index - 1, { date, dateText, stories });
      } catch (error) {
        done(true);
        this.$q.notify('获取新闻列表失败');
      } finally {
        done(this.currentDate < '20130520');
      }
    },
    getStory(id) {
      this.$router.push({ name: 'story', params: { id } });
    },
  },
};
</script>

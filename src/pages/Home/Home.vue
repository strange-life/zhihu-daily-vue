<template>
  <q-pull-to-refresh @refresh="refresh">
    <q-infinite-scroll :offset="30" ref="infiniteScroll" @load="getDailies">
      <q-page>
        <story-carousel
          :value="currentStoryId"
          @input="setCurrentStoryId"
          :stories="topStories"
          @detail="goStory"
        />

        <story-list :dailies="dailies" @detail="goStory" />
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
// eslint-disable-next-line
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import StoryCarousel from './components/StoryCarousel';
import StoryList from './components/StoryList';

export default {
  name: 'PageHome',
  components: { StoryCarousel, StoryList },
  computed: {
    ...mapState('home', ['topStories', 'currentStoryId', 'dailies']),
    ...mapGetters('home', ['currentDate']),
  },
  mounted() {
    this.getTopStories();
  },
  methods: {
    ...mapMutations('home', ['setCurrentStoryId', 'setDailies']),
    ...mapActions('home', {
      getTopStoriesAction: 'getTopStories',
      getDailiesAction: 'getDailies',
    }),
    async refresh(done) {
      this.setDailies([]);
      this.$refs.infiniteScroll.reset();
      this.$refs.infiniteScroll.poll();
      await this.getTopStories();
      done();
    },
    async getTopStories() {
      try {
        await this.getTopStoriesAction();
      } catch (error) {
        this.$q.notify('获取轮播新闻失败');
      }
    },
    async getDailies(index, done) {
      try {
        await this.getDailiesAction(index);
        done(this.currentDate < '20130520');
      } catch (error) {
        done(true);
        this.$q.notify('获取新闻列表失败');
      }
    },
    goStory(id) {
      this.$router.push({ name: 'story', params: { id } });
    },
  },
};
</script>

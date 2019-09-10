<template>
  <layout-default>
    <template #header>
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="drawerActive = true" aria-label="Menu" />

        <q-toolbar-title>首页</q-toolbar-title>
      </q-toolbar>
    </template>

    <q-pull-to-refresh @refresh="refresh">
      <q-drawer v-model="drawerActive" bordered>
        <q-list>
          <q-item-label header>知乎日报</q-item-label>

          <q-item :to="{ name: 'home' }" @click.native="drawerActive = false">
            <q-item-section avatar class="items-center">
              <q-icon name="home" />
            </q-item-section>

            <q-item-section>
              <q-item-label>首页</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>

      <q-carousel
        :value="currentStoryId"
        @input="setCurrentStoryId"
        animated
        infinite
        swipeable
        transition-prev="slide-right"
        transition-next="slide-left"
        autoplay
        height="200px"
      >
        <q-carousel-slide
          v-for="story of topStories"
          :key="story.id"
          :name="story.id"
          :img-src="story.image"
          @click="goStory(story.id)"
        >
          <div
            class="absolute-bottom q-mb-md q-px-xs text-subtitle1 text-white bg-dimmed"
          >{{ story.title }}</div>
        </q-carousel-slide>

        <template #control>
          <q-carousel-control
            position="bottom"
            :offset="[4, 4]"
            class="flex justify-center items-center"
          >
            <div
              v-for="story of topStories"
              :key="story.id"
              :class="[$style.dot, story.id === currentStoryId ? 'bg-grey-3' : 'bg-grey-5']"
              class="q-mx-xs"
            ></div>
          </q-carousel-control>
        </template>
      </q-carousel>

      <q-infinite-scroll :offset="30" ref="infiniteScroll" @load="getDailies">
        <q-list padding class="q-mx-md">
          <template v-for="daily of dailies">
            <q-item-label :key="daily.date" header>{{ daily.dateText }}</q-item-label>

            <q-item
              v-for="story of daily.stories"
              :key="story.id"
              :to="{ name: 'story', params: { id: story.id } }"
            >
              <q-item-section thumbnail>
                <img :src="story.image" style="width:auto;" />
              </q-item-section>

              <q-item-section>{{ story.title }}</q-item-section>
            </q-item>
          </template>
        </q-list>

        <template #loading>
          <div class="flex justify-center">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </q-pull-to-refresh>
  </layout-default>
</template>

<script>
// eslint-disable-next-line
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'PageHome',
  data() {
    return {
      drawerActive: this.$q.platform.is.desktop,
    };
  },
  computed: {
    ...mapState('home', ['topStories', 'currentStoryId', 'dailies']),
    ...mapGetters('home', ['currentDate']),
  },
  async mounted() {
    if (!this.topStories.length) {
      this.$q.loading.show();
      try {
        await this.getTopStories();
      } catch (error) {
        this.$q.notify('获取轮播日报失败');
      } finally {
        this.$q.loading.hide();
      }
    }
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

<style lang="stylus" module>
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
</style>

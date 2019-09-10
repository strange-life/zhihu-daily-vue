<template>
  <layout-default>
    <template #header>
      <q-toolbar>
        <q-btn flat dense round icon="arrow_back" @click="$router.back()" />
        <q-space />
        <q-btn
          flat
          dense
          icon="comment"
          :label="extra.comments || '...'"
          :to="{ name: 'comment', params: { id } }"
        />
        <q-btn flat dense icon="thumb_up_alt" :label="extra.popularity || '...'" />
      </q-toolbar>
    </template>

    <q-parallax :speed="0.3" :height="200">
      <template #media>
        <img :src="story.image" :alt="story.title" style="max-width:100%;" />
      </template>

      <div class="absolute-bottom q-px-md q-py-xs bg-dimmed">
        <div class="text-h6 text-white">{{ story.title }}</div>
        <div class="text-grey-5 text-right">{{ story.image_source }}</div>
      </div>
    </q-parallax>

    <article id="story" v-html="story.body"></article>

    <q-item v-if="story.section" clickable v-ripple class="q-mx-md">
      <q-item-section thumbnail>
        <img :src="story.section.thumbnail" style="width:auto;" />
      </q-item-section>

      <q-item-section>本文来自: {{ story.section.name }} • 合集</q-item-section>

      <q-item-section side>
        <q-icon name="arrow_forward_ios" />
      </q-item-section>
    </q-item>
  </layout-default>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'PageStory',
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState('story', ['story', 'extra']),
  },
  async mounted() {
    this.getExtra(this.id);

    if (this.id !== this.story.id) {
      this.$q.loading.show();
      this.setStory({});

      try {
        await this.getStory(this.id);
      } catch (error) {
        this.$q.notify('获取文章失败');
      } finally {
        this.$q.loading.hide();
      }
    }
  },
  destroyed() {
    this.setExtra({});
  },
  methods: {
    ...mapMutations('story', ['setStory', 'setExtra']),
    ...mapActions('story', ['getStory', 'getExtra']),
  },
};
</script>

<style src="src/css/story.styl" lang="stylus"></style>

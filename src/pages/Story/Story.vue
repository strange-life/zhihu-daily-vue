<template>
  <q-page>
    <q-parallax :speed="0.3" :height="200">
      <template v-slot:media>
        <img :src="story.image" :alt="story.title" style="max-width:100%;" />
      </template>

      <template v-slot:default>
        <div class="absolute-bottom q-px-md q-py-xs bg-dimmed">
          <div class="text-h6 text-white">{{ story.title }}</div>
          <div class="text-grey-5 text-right">{{ story.image_source }}</div>
        </div>
      </template>
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
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'PageStory',
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState('story', ['story']),
  },
  async mounted() {
    try {
      await this.getStory(this.id);
    } catch (error) {
      this.$q.notify('获取文章内容失败');
    }
  },
  methods: {
    ...mapActions('story', ['getStory']),
  },
};
</script>

<style src="src/css/story.styl" lang="stylus"></style>

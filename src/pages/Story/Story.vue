<template>
  <q-page>
    <div id="story" v-html="story.body"></div>
  </q-page>
</template>

<script>
export default {
  name: 'PageStory',
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      story: {},
    };
  },
  mounted() {
    this.getStory();
  },
  methods: {
    async getStory() {
      try {
        const { data: story } = await this.$axios.get('news', {
          params: { id: this.id },
        });

        story.body = story.body.replace(/<script.*<\/script>/g, '');
        story.body = story.body.replace(
          /<div class="img-place-holder"><\/div>/,
          '',
        );
        story.body = story.body.replace(
          /<img(.*)src="(.*)"(.*)>/g,
          (match, p1, p2, p3) => `<img${p1}src="${this.$utils.proxyImage(p2)}"${p3}>`,
        );

        this.story = story;
      } catch (error) {
        this.$q.notify('获取文章内容失败');
      }
    },
  },
};
</script>

<style src="src/css/story.styl" lang="stylus"></style>

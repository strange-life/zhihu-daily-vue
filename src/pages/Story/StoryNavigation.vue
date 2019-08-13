<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn flat dense round icon="arrow_back" @click="$router.back()" />
      <q-space />
      <q-btn flat dense icon="comment" :label="extra.comments" @click="goComment" />
      <q-btn flat dense icon="thumb_up_alt" :label="extra.popularity" />
    </q-toolbar>
  </q-header>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'StoryNavigation',
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState('story', ['extra']),
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'home') {
      this.setExtra({});
    }

    next();
  },
  async mounted() {
    try {
      await this.getExtra(this.id);
    } catch (error) {
      this.$q.notify('获取文章点赞数评论数失败');
    }
  },
  methods: {
    ...mapMutations('story', ['setExtra']),
    ...mapActions('story', ['getExtra']),
    goComment() {
      this.$router.push({ name: 'comment', params: { id: this.id } });
    },
  },
};
</script>

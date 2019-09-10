<template>
  <layout-default>
    <template #header>
      <q-toolbar>
        <q-btn flat dense round icon="arrow_back" @click="$router.back()" />
        <q-toolbar-title style="font-size: 16px;">{{ comments.length }}条点评</q-toolbar-title>
      </q-toolbar>
    </template>

    <q-list>
      <q-item v-for="comment of comments" :key="comment.id">
        <q-item-section top avatar>
          <q-avatar>
            <img :src="comment.avatar" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ comment.author }}</q-item-label>
          <q-item-label caption>{{ comment.content }}</q-item-label>
          <q-item-label caption>{{ comment.time | time }}</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>
            <q-icon name="thumb_up_alt" />
            {{ comment.likes }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </layout-default>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import CommentModule from './store';

export default {
  name: 'PageComment',
  filters: {
    time(value) {
      const date = new Date(value);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();

      return `${String(month).padStart(2, '0')}-${day} ${hours}:${minutes}`;
    },
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState('comment', ['comments']),
  },
  beforeCreate() {
    this.$store.registerModule('comment', CommentModule);
  },
  async mounted() {
    this.$q.loading.show();
    try {
      await this.getComments(this.id);
    } catch (error) {
      this.$q.notify('获取评论失败');
    } finally {
      this.$q.loading.hide();
    }
  },
  destroyed() {
    this.setComments([]);
    this.$store.unregisterModule('comment');
  },
  methods: {
    ...mapMutations('comment', ['setComments']),
    ...mapActions('comment', ['getComments']),
  },
};
</script>

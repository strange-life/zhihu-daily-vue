<template>
  <q-page>
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
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'PageComment',
  filters: {
    time(value) {
      const date = new Date(value);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();

      return `${month}-${day} ${hours}:${minutes}`;
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
  mounted() {
    this.getComments(this.id);
  },
  methods: {
    ...mapActions('comment', ['getComments']),
  },
};
</script>

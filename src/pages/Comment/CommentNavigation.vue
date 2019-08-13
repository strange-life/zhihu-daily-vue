<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn flat dense round icon="arrow_back" @click="$router.back()" />
      <q-toolbar-title style="font-size: 16px;">{{ comments.length }}条点评</q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'CommentNavigation',
  computed: {
    ...mapState('comment', ['comments']),
  },
};
</script>

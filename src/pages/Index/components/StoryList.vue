<template functional>
  <q-list padding class="q-mx-md">
    <template v-for="news of props.news">
      <q-item-label :key="news.date" header>{{ news.dateText }}</q-item-label>

      <q-item
        v-for="story of news.stories"
        :key="story.id"
        clickable
        v-ripple
        @click="listeners.detail(story.id)"
      >
        <q-item-section thumbnail>
          <img :src="story.image" />
        </q-item-section>

        <q-item-section>{{ story.title }}</q-item-section>
      </q-item>
    </template>
  </q-list>
</template>

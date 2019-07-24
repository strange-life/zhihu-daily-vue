<template functional>
  <q-list padding class="q-mx-md">
    <template v-for="daily of props.dailies">
      <q-item-label :key="daily.date" header>{{ daily.dateText }}</q-item-label>

      <q-item
        v-for="story of daily.stories"
        :key="story.id"
        clickable
        v-ripple
        @click="listeners.detail(story.id)"
      >
        <q-item-section thumbnail>
          <img :src="story.image" style="width:auto;" />
        </q-item-section>

        <q-item-section>{{ story.title }}</q-item-section>
      </q-item>
    </template>
  </q-list>
</template>

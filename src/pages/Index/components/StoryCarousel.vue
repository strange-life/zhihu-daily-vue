<template functional>
  <q-carousel
    :value="props.value"
    @input="listeners.input"
    animated
    infinite
    swipeable
    transition-prev="slide-right"
    transition-next="slide-left"
    autoplay
    height="200px"
  >
    <q-carousel-slide
      v-for="story of props.stories"
      :key="story.id"
      :name="story.id"
      :img-src="story.image"
      @click="listeners.detail(story.id)"
    >
      <div
        class="absolute-bottom q-mb-md q-px-xs text-subtitle1 text-white caption"
      >
        {{ story.title }}
      </div>
    </q-carousel-slide>

    <template v-slot:control>
      <q-carousel-control
        position="bottom"
        :offset="[4, 4]"
        class="flex justify-center items-center"
      >
        <div
          v-for="story of props.stories"
          :key="story.id"
          :class="[story.id === props.value ? 'bg-grey-3' : 'bg-grey-5']"
          class="q-mx-xs dot"
        ></div>
      </q-carousel-control>
    </template>
  </q-carousel>
</template>

<style lang="stylus" scoped>
.caption {
  background-color: $dimmed-background;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
</style>

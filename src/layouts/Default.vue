<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        />

        <q-toolbar-title>
          首页
        </q-toolbar-title>

        <q-btn flat round dense icon="more_vert" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header>知乎日报</q-item-label>

        <q-item :to="{ name: 'index' }" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>

          <q-item-section>
            <q-item-label>首页</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'LayoutDefault',
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
    };
  },
};
</script>

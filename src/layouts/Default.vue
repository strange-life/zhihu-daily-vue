<template>
  <q-layout view="lHh Lpr lFf">
    <router-view name="navigation" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'LayoutDefault',
};
</script>

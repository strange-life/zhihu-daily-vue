<template functional>
  <q-header elevated>
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="arrow_back"
        @click="parent.$router.back()"
      />
    </q-toolbar>
  </q-header>
</template>

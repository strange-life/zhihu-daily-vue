<template functional>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <slot name="header" />
    </q-header>

    <q-page-container>
      <q-page>
        <slot />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

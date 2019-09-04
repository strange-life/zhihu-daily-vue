<template>
  <div class="fixed-center text-center">
    <img src="~assets/sad.svg" style="display:block;width:30vw;max-width:150px;" />
    <p class="text-faded">
      Sorry, nothing here...
      <strong>(404)</strong>
    </p>
    <q-btn color="secondary" style="width:200px;" @click="$router.push('/')">Go back</q-btn>
  </div>
</template>

<script>
export default {
  name: 'Error404',
};
</script>

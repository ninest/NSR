<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    },
  }
}
</script>

<template>
  <div class="calc" id="calc">
    <iframe 
      id='iframe'
      :src="url" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
    ></iframe>
  </div>
</template>

<style lang="scss" scoped>
.calc  {
  border-radius: var(--b-r); 
  width: 100%;
  height: 450px;
  overflow: scroll;

  iframe {
    width: 100%;
    height: 540px;
    margin-top: -90px;
  }
}
</style>
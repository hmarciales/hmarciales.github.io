<template lang="pug">
#colophon-content
  .logo(style="width: 100%;")
    a(href='https://www.vsp.tu-berlin.de' target="_blank")
      img(src="@/assets/images/tu-logo.png")
  .professor Kai Nagel, Professor

  .team TU VSP

  p Hugo Castro
  p Gregor Leich


  .team Contact

  p.nonbreak: a(href="mailto:castro@vsp.tu-berlin.de") Email

  .team Projektpartner


  a(href='https://mobilityinstitute.com/' target="_blank")
    img(src="@/assets/images/vsp-logo.png")

</template>

<script lang="ts">
export default {
  name: 'Colophon',
  components: {},
}
</script>

<style scoped lang="scss">
@import '@/styles.scss';

#colophon-content {
  padding-top: 2rem;
  width: 16rem;
}

.colophon .professor {
  width: max-content;
  margin: 1rem 0 1rem auto;
  font-weight: bold;
  color: $bannerHighlight;
}

.colophon .team {
  margin-top: 1.5rem;
  margin-bottom: 0.25rem;
  font-weight: bold;
  color: $bannerHighlight;
}

.colophon p {
  margin-bottom: 0px;
}

.colophon a {
  font-size: 0.85rem;
}

.partners {
  margin-bottom: 2rem;

  p {
    line-height: 1rem;
    padding-top: 0.75rem;
  }
}

.nonbreak {
  width: max-content;
  margin-left: auto;
}

@media only screen and (max-width: 640px) {
}
</style>

<script setup lang="ts">

const props = withDefaults(
    defineProps<{
      title?: string
      description?: string

    }>(),
    {
      title: undefined,
      description: undefined
    }
)
</script>

<template>
<section>
  <div
      v-if="props.title || props.description"
      class="text_content" >
    <h2 data-offset="20"
        data-delay="50"
        class="one_time_animation fade_up"
        v-if="props.title" v-observe-visibility>{{props.title}}</h2>
    <p data-offset="20"
       data-delay="100"
       class="one_time_animation fade_up"  v-if="props.description" v-observe-visibility>{{props.description}}</p>
  </div>
<slot/>
</section>
</template>

<style scoped>
section{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--section-gap);
  max-width: 200rem;
  margin: 0 auto;
  background-color: var(--background);
}
.hero_section{
  width: 100%;
  padding-top: 20rem ;
  background-color: var(--background);
}

#faq{
  align-items: center;
}

.text_content{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  font-size: var(--font-size-title-s);
  text-align: center;
}
h2{
  font-size: var(--font-size-title-l);
}

#trial_block {
  background: var(--gradient-button);
  color: var(--white);
  position: relative;
}
#trial_block .text_content , #trial_block :deep(.buttons){
  position: relative;
  z-index: 2;
}
#trial_block::after{
  content: "";
  position: absolute;
  width:100vw;
  height: 100%;
  background: var(--gradient-button);
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
}

@media (max-width: 850px) {
  .hero_section{
    padding-top: 15rem;
    padding-bottom: 10rem;

  }
}
</style>
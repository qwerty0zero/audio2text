<script setup lang="ts">
import CloudIcon from "~/assets/icons/stage-cards/cloud.svg"
import DownloadIcon from "~/assets/icons/stage-cards/download.svg"
import MagicIcon from "~/assets/icons/stage-cards/magic.svg"

const props = withDefaults(defineProps<{
  tag?: string;
  element: {
    svgLink?: string;
    color?: string;
    title?: string;
    description?: string;
  }
}>(), {
  tag: 'article'
})

const isIconKey = (link: string) => {
  return ['cloud', 'download', 'magic'].includes(link)
}

const getIconComponent = (key: string) => {
  const map: Record<string, any> = {
    cloud: CloudIcon,
    download: DownloadIcon,
    magic: MagicIcon
  }
  return map[key]
}
</script>
<template>
  <component
      :is="tag"
      class="base_card one_time_animation fade_up"
      v-observe-visibility :data-delay="50"
      :style="{
      backgroundColor: element.color ? `var(--${element.color}-light)` : 'var(--background-accent)'
    }"
  >
    <component
        v-if="isIconKey(element.svgLink)"
        :is="getIconComponent(element.svgLink)"
        :style="{ color: `var(--${element.scgColor})` }"

    />
    <span
        v-else-if="element.svgLink"
        class="card_icon"
        :style="{ backgroundColor: `var(--${element.color})` }"
    >

      <img :src="element.svgLink" alt="" />
    </span>
    <h3 v-observe-visibility:data-delay="75" class="one_time_animation fade_up">{{ element.title }}</h3>
    <p v-observe-visibility :data-delay="75" class="one_time_animation fade_up">{{ element.description }}</p>
  </component>
</template>

<style scoped>
.base_card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 4rem;
  gap: 1rem;
  border-radius: 1rem;
  font-size: var(--font-size-title-m);
  background: var(--background-accent);
}
.base_card.stage_card {
  border: 2px solid var(--border-color);
  box-shadow: 0px 12px 6px -18px var(--dark-blue);
  align-items: center;
  text-align: center;
}
.stage_card svg {
  width: 6rem;
  height: 6rem;
}
h3{
  font-size: var(--font-size-title-m-l);
}
.card_icon{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  border-radius: 1rem;
}
img{
  width: 3.2rem;
}





@media screen and (max-width: 1200px){
  .card_icon{
    padding: 1.5rem;
  }
  img{
    width: 3rem;
  }
  .stage_card svg {
    width: 5rem;
    height: 5rem;
  }
}
@media screen and (max-width: 1000px){
  .base_card.stage_card {
    padding: 2rem;
  }

}

@media screen and (max-width: 850px){
  .base_card{
    padding: 2rem;
  }
  .card_icon{
    padding: 1rem;
    border-radius: 0.5rem;
  }
  img{
    width:2.5rem;
  }

}
</style>
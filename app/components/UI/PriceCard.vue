<script setup lang="ts">
import { useCurrency } from '~/composables/useCurrency';
import BaseButton from "~/components/UI/BaseButton.vue";
import CheckIcon from "~/assets/icons/check.svg"
import {type PriceKey, prices} from "~/data/prices";

const { convertAndFormat } = useCurrency();

const props = defineProps<{
  element: {
    title: string;
    plan?: string;
    description: string;
    subTitle?: string;
    feature?: [];
    class?: string;
    button: {
      text: string;
      onClick?: string;
      type?: string;
      link?: string;
      class?: string;
    };
  }
}>()
const displayPrice = computed(() => {

  const planKey = props.element.plan as PriceKey | undefined;
  if (!planKey || prices[planKey] === undefined) {
    return '';
  }
  const rawPrice = prices[planKey];

  return convertAndFormat(rawPrice);
})

</script>

<template>
<li class="price_card one_time_animation fade_up" v-observe-visibility :data-delay="50" :class="element.class">
  <div class="description">
    <h3>{{element.title}}</h3>
    <span >{{displayPrice}}</span>
    <p>{{element.description}}</p>
  </div>

  <span v-if="element.subTitle" class="sub_title">{{element.subTitle}}</span>
  <ul class="feature_list">
    <li v-for="(feature, index) in element.feature" :key="index" v-observe-visibility :data-delay="25 + index*25"
        class="one_time_animation fade_up">

        <CheckIcon v-if="feature.exist"/>
        <span v-else>
          &#10005;
        </span>

      {{feature.description}}
    </li>
  </ul>

  <BaseButton :data="element.button">
    {{element.button.text}}
  </BaseButton>
</li>
</template>

<style scoped>
.price_card, .description, ul{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.price_card{
  background-color: var(--background-accent);
  border: 1px solid var(--border-color);
  padding: 3rem 2rem;
  border-radius: 1rem;
  gap: 4rem;
  position: relative;
  grid-row: 2;
  height: 100%;
}
.price_card.primary{
  padding: 4rem ;
  height: 110%;
  background: var(--gradient-button);
}
.light .price_card.primary{
  color: var(--white);
}
h3{
  font-size: var(--font-size-title-l);
}

.description p{
  font-size: var(--font-size-text);
}
.description span{
  font-size: var(--font-size-title-xxl);
  font-weight: bold;
}
.sub_title{
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 0.5rem;
  font-size: var(--font-size-title-m);
  background-color: var(--yellow);
  color: var(--dark-blue);
  border-radius: 2rem;
}
ul{
  align-self: flex-start;
  align-items: flex-start;
  gap: 2rem;
}
li{
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: var(--font-size-text);
}
li>svg{
  color: var(--green);
}
li>span{
  color: var(--dark-gray);
}

@media screen and (max-width: 1200px){
  .price_card , .price_card.primary{
    padding: 3rem;
  }
}

@media screen and (max-width: 1100px){
  .price_card , .price_card.primary{
    padding: 2rem;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: auto auto;
   align-items: start;
    gap: 2rem;
  }
  .description{
    grid-area: 1 / 1 / 3 / 2;
    align-self: center;
    align-items: start;
    min-width: 20rem;
  }
  h3{
    overflow-wrap: break-word;
    word-break: break-all;
  }
  .feature_list{
    grid-area: 1 / 2 / 2 / 4;
  }
  .price_plan .full_width{
    grid-area: 2 / 2 / 3 / 4;
    margin: 0;
  }
  .price_plan{
    display: flex;
    flex-direction: column;
  }
}
@media screen and (max-width: 900px){
  .price_card , .price_card.primary{
    display: flex;
    flex-direction: column;
  }
  .description{
  align-items: center;
  }
  .feature_list{
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }

  .price_plan .full_width{

  }
}
@media screen and (max-width: 600px){
  .feature_list{

    grid-template-columns: repeat(2, minmax(0, 1fr));

  }

}
</style>
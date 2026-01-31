<script setup lang="ts">
import { useI18n } from '#imports'
import BaseSection from "~/components/UI/BaseSection.vue";
import HeroBlock from "~/components/UI/HeroBlock.vue";
import BaseCard from "~/components/UI/BaseCard.vue";
import FaqItem from "~/components/UI/FaqItem.vue";
import PriceCard from "~/components/UI/PriceCard.vue";
import BaseButton from "~/components/UI/BaseButton.vue";
const { $t } = useI18n()

useHead({
  title: computed(() => $t('metaTags.title')),
  meta: [
    {
      name: 'description',
      content: computed(() => $t('metaTags.description'))
    }
  ]
})
</script>

<template>
<main>
  <BaseSection id="hero" class="hero_section">
    <HeroBlock/>
  </BaseSection>
  <BaseSection
  id="feature"
  :title="$t('feature.title')"
  :description="$t('feature.description')"
  >
    <ul class="cards">
      <BaseCard
          v-for="(el, index) in $t('feature.card')"
          :key="index"
          :element="el"
          tag="li"
          class="feature_card"
      />
    </ul>

  </BaseSection>
  <BaseSection
  id="price_plan"
  :title="$t('pricePlan.title')"
  :description="$t('pricePlan.description')"
  >
    <ul class="price_plan">

      <PriceCard
          v-for="(element, index) in $t('pricePlan.plan')" :key="index"
          :element
      />
    </ul>

  </BaseSection>
  <BaseSection
      id="stage"
      :title="$t('stageOfWork.title')"
      :description="$t('stageOfWork.description')">
    <div class="stage_of_work">
      <div class="cards_stage">
        <span
        v-for="(el, index) in $t('stageOfWork.card')"
        :key="index"
        :style="{  gridColumn: index+1, gridRow: 1 }"
        :class=" 'cards_stage_index--'+(index+1)"
        class="one_time_animation fade_up"
        v-observe-visibility :data-delay="25+index*25"
        >{{index+1}}</span>
        <BaseCard
            v-for="(el, index) in $t('stageOfWork.card')"
            :key="index"
            :element="el"
            :style="{  gridColumn: index+1, gridRow: 2 }"
            :class=" 'cards_stage--'+(index+1)"
            class="stage_card"
        />
      </div>
    </div>

  </BaseSection>
  <BaseSection
  id="faq"
  :title="$t('faq.title')"
  :description="$t('faq.description')"
  >
    <div class="faqs">
      <FaqItem
          v-for="(el, index) in $t('faq.faqItem')"
          :key="index"
          :element="el"
          v-observe-visibility :data-delay="50 + index*50"
          class="one_time_animation fade_up"
      />
    </div>
  </BaseSection>
  <BaseSection
  :title="$t('freeTrial.title')"
  :description="$t('freeTrial.description')"
  id="trial_block"
  >
    <div class="buttons">
      <BaseButton v-for="(el, index) in $t('freeTrial.buttons')" :key="index"
      :data="el"
      >
        {{el.text}}
      </BaseButton>
    </div>
  </BaseSection>
</main>
</template>

<style scoped>
.cards, .price_plan {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
}
.price_plan{
  align-items: center;
}
.cards_stage{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 3.2rem;
  width: 100%;

}
.cards_stage span{
  text-align: center;
  font-weight: 700;
  font-size: var(--font-size-title-m-l);
  margin: 0 auto;
  width: 8rem;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: var(--white);
}
.cards_stage_index--1{
  background-color: var(--gradient-indigo);
}
.cards_stage_index--2{
  background-color: var(--gradient-purple);
}
.cards_stage_index--3{
  background-color: var(--gradient-pink);
}
.cards_stage--2{
  position: relative;
}

.cards_stage--2::before{
  content: "";
  top: -1rem;
  left: 50%;
  position: absolute;
  width: 120%;
  height: 0.5rem;
  transform: translate(-50%, 0);
  background: var(--gradient-primary);
  border-radius: 0.8rem;
  z-index: 10;
}
.stage_of_work hr{
  width: 66%;
  margin: 0 auto;
  height: 0.5rem;
  background: var(--gradient-primary);
  border-radius: 0.5rem;
}
.faqs{
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

#trial_block{
  background: var(--gradient-button);
  color: var(--white);
}
#trial_block .buttons{
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  align-items: center;
}

@media screen and (max-width: 1200px){
  .cards_stage{
    gap: 2.5rem;
  }
  .cards_stage span{
    width: 7rem;
  }
}
@media screen and (max-width: 1100px){
  .price_plan{
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}
@media screen and (max-width: 1000px){
  .cards {
    grid-template-columns: 1fr 1fr;
  }
  .cards_stage{
    display: flex;
    flex-direction: column;
  }
  .cards_stage>span{
    display: none;
  }
  .cards_stage--2::before {
    display: none;
  }
}

@media screen and (max-width: 650px){
  .cards {
    grid-template-columns: 1fr ;
  }

}
</style>
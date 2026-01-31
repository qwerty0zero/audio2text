<script setup lang="ts">
import { useI18n } from '#imports'
import BaseButton from "~/components/UI/BaseButton.vue";
import CheckIcon from "~/assets/icons/check.svg"
import DownloadIcon from "~/assets/icons/download.svg"
import InfoIcon from "~/assets/icons/info-circle.svg"
import LightningIcon from "~/assets/icons/lightning.svg"
import ShareIcon from "~/assets/icons/share.svg"
const { $t } = useI18n()
</script>

<template>
  <div class="hero_block">
    <div class="hero_info">
      <p class="additional_info row_group one_time_animation fade_up"
         v-observe-visibility
      >
        <InfoIcon/>
        {{$t('main.additional_info')}}</p>
      <h1>
        <span v-for="(el, index) in $t('main.title')" :key="index"
              v-observe-visibility
              class="one_time_animation fade_up"
        :data-delay="50 +index*50"
        >
          {{el}}
          <br>
        </span>

      </h1>
      <h2
          v-observe-visibility
          class="one_time_animation fade_up"
          :data-delay="100"

      >{{$t('main.description')}}</h2>
      
      <div class="row_group one_time_animation fade_up"
           v-observe-visibility
           :data-delay="100"
      >

        <BaseButton
        v-for="(button, index) in $t('main.buttons')" :key="index"
        :data="button">
          {{button.text}}
        </BaseButton>
      </div>
      <div class="feature_info row_group fade_up one_time_animation "
           v-observe-visibility
           :data-delay="100">
        <p  v-for="(info, index) in $t('main.info')" :key="index" class="row_group">
          <CheckIcon/>
           {{info}}
        </p>
      </div>
    </div>
    <div class="example_info one_time_animation fade_up" v-observe-visibility :data-delay="50">
      <div class="meta_info row_group one_time_animation fade_up" v-observe-visibility>
        <div class="meta_image">
          <span class="info">
            <InfoIcon/>
          </span>
        </div>
        <div class="meta_text">
          <p class="name">{{$t('main.example.metaInfo.title')}}</p>
          <div class="meta_properties">
            <span class="durration">{{$t('main.example.metaInfo.time')}}</span>
            <span> * </span>
            <span class="size">{{$t('main.example.metaInfo.size')}}</span>
          </div>
        </div>
        <span class="checkIcon">
         <CheckIcon/>

        </span>

      </div>

      <div class="encryption_info">
        <p class="one_time_animation fade_up" v-observe-visibility>{{$t('main.example.encryption.title' )}}</p>
        <ul>
          <li class="row_group one_time_animation fade_up"
              v-for="(el, index) in $t('main.example.encryption.topic')" :key="index"
              v-observe-visibility
              :data-delay="50 +index*50"

          >
            <time :datetime="el.time">{{el.time}}</time>
            <p>{{el.text}}</p>
          </li>
        </ul>
      </div>
      <div class="buttons row_group one_time_animation fade_up" v-observe-visibility>
        <BaseButton
            v-for="(button, index) in $t('main.example.buttons')" :key="index"
            :data="button">
          <DownloadIcon v-if="button.svgLink === 'download'" />
          <ShareIcon v-else />
          <p v-if="button.text">{{button.text}}</p>
          </BaseButton>
      </div>

      <div class="additional_feature row_group " >
        <LightningIcon class="lightning_icon " />
        <div class="additional_feature_info ">
          <p>{{$t('main.example.info.title')}}</p>
          <p>
            {{$t('main.example.info.text')}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero_block{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5rem;
}
.hero_info{
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 515px;
}
h1{
  font-size: var(--font-size-h1);
  white-space: pre-line;
}
h1 span:last-child{
  color: var(--accent);
}
h2{
  font-size: var(--font-size-h2);
}
p{
  font-size: var(--font-size-additional-text);
}

.additional_info{
  background: var(--accent-light);
  color: var(--accent);
  border-radius: 2rem;
  padding: 0.5rem 1.5rem;
  width: fit-content;
}

.row_group{
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
  align-items: center;
}
.additional_info.row_group, .additional_feature.row_group{
  gap: 1rem;
}
.feature_info svg{
  color: var(--green);
  font-size: var(--font-size-additional-text);
  width: 1.4rem;
  height: 1.4rem;

}
.example_info{
  border: 1px solid var(--border-color);
  background: var(--background-accent);
  padding: 4rem;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-shadow: 0px 12px 26px -18px var(--dark-blue);
  position: relative;

}
.checkIcon{
  margin-left: auto;
  color: var(--green);
  background-color: var(--green-light);
  padding: 1.2rem;
  border-radius: 50%;
}

.encryption_info{
  background: var(--background-alt);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  border-radius: 1rem;
}
.encryption_info ul{
  display: flex;
  flex-direction: column;
  gap: 1.5em;
}
.encryption_info li{
  align-items: center;
}
.meta_image{
  background: var(--gradient-button);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  aspect-ratio: 1 / 1;

}

.info{
  font-size: var(--font-size-text);
  color: var(--background-accent);
}
svg{
  width: 1.6rem;
  height: 1.6rem;
}
.info svg{
  color: var(--white);
}
.additional_feature{
  border: 1px solid var(--border-color);
  background: var(--background-accent);
  width: fit-content;
  padding: 1rem 2rem;
  border-radius: 1rem;
  box-shadow: 0 12px 26px -18px var(--dark-blue);

  position: absolute;
  top: 0;
  right: 0;
  transform: translate(30%, -50%);
  z-index: 2;
}
.lightning_icon{
  color: var(--yellow);
  height: 3.2rem;
  width: unset;
}
@media screen and (max-width: 1200px) {
  .hero_block{
    gap: 2rem;
  }
  .hero_info{
    max-width: 450px;
  }
  .additional_feature {
    transform: translate(10%, -50%);
  }
}
@media (max-width: 850px) {
  .example_info{
    display: none;
  }
  .hero_info{
    max-width: 100%;
  }
}
</style>
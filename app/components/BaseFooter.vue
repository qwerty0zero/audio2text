<script setup lang="ts">
import { useI18n } from '#imports'
import CurrencySwitcher from "~/components/UI/CurrencySwitcher.vue";
import ThemeSwitcher from "~/components/Forms/ThemeSwitcher.vue";
import LanguageSwitcher from "~/components/Forms/LanguageSwitcher.vue";
import BaseButton from "~/components/UI/BaseButton.vue";

const { $t} = useI18n()
</script>

<template>
  <footer role="contentinfo" itemscope itemtype="https://schema.org/WPFooter" class="site-footer" id="footer">

    <div class="footer-container">

      <div class="footer-brand one_time_animation fade_up"  v-observe-visibility :data-delay="50"itemscope itemtype="https://schema.org/Organization">
        <BaseButton class="brand-link" aria-label="AudioText - на главную" :data="{to:'hero',class:'brand-link',localScroll:true}">
          <span>
          <img src="/icons/mic.svg" alt="">
          </span>
          <h3 itemprop="name" class="brand-name">{{$t('footer.title')}}</h3>
        </BaseButton>

        <p itemprop="description" class="brand-desc">
          {{$t('footer.description')}}
        </p>
         <a :href="`mailto:`+$t('email')" class="email">{{$t('email')}}</a>
        <div class="selectors">
          <CurrencySwitcher/>
          <LanguageSwitcher/>
          <ThemeSwitcher/>
        </div>
      </div>
      <nav class="footer-nav" aria-label="Footer navigation">
        <div class="nav-column" v-for="(el, index) in $t('footer.navigation')" :key="index">
          <h4 class="nav-title one_time_animation fade_up"
              v-observe-visibility :data-delay="25">{{el.title}}</h4>
          <ul class="nav-list">
            <li  v-for="(navLink, index) in el.link" :key="index" class="one_time_animation fade_up"
                 v-observe-visibility :data-delay="25+index*25">
              <a  class="line_animation" href="#" target="_blank" rel="noopener noreferrer">
              <span class="span_link">
                {{navLink.title}}
              </span>
              </a></li>
          </ul>
        </div>
      </nav>
    </div>
    <hr>
    <div class="footer-bottom container">
      <small class="copyright">
        &copy; 2026 AudioText. Все права защищены.
      </small>

    </div>
  </footer>
</template>

<style scoped>
footer{
  width: 100%;
  max-width: 200rem;
  margin: 0 auto;
  height: 100%;
  background-color: var(--dark-blue);
  color: var(--white);
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding-bottom: 3rem;
}
.footer-container, .footer-nav{
  display: flex;
  flex-direction: row;
  gap: 2rem;
}
.footer-container{
  gap: 5rem;
}
.footer-nav{
  justify-content: space-around;
  width: 100%;
}
.footer-brand{
  max-width: 40rem;
  gap: 1.5rem;
}
.footer-brand, .nav-column, .nav-list{
  display: flex;
  gap: 1rem;
  flex-direction: column;
}
.brand-link,  .selectors{
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;
}

 .selectors{
  justify-content: flex-start;
  padding: 0;
  margin-top: auto;
}
.brand-link span{
  background-color: var(--accent);
  border-radius: 0.5rem;
  padding: 1rem;

}
.brand-link img{
  height: 1.6rem;
}
nav a, p, .brand-desc{
  font-size: var(--font-size-additional-text);
}
p, .brand-desc{
  opacity: 0.6;
}
h3, h4{
  font-size: var(--font-size-title-m-l);
}
li{
  display: flex;
}
.email{
  transition: 0.3s;
  color: var(--text-color-light);
  font-size: var(--font-size-additional-text);


}
.email:hover{
  color: var(--white);
}
.span_link{
  position: relative;
}
.span_link::after{
  position: absolute;
  content: "";
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 0.2rem;
  background-color: var(--white);
  opacity: 0;
  transition: 0.3s;
}
.line_animation:hover .span_link:after{
  opacity: 1;
  bottom: -0.3rem;

}

a.line_animation{
  color: var(--text-color-light);
  width: 100%;
}
a:hover, a:active, a:focus{
  transition: 0.3s;
  color: var(--white);
}

hr{
  width: 100%;
  height: 1px;
  background: var(--white);
  opacity: 0.6;
}
.language ul{
  width: 100%;
}


#footer .footer-container , #footer .footer-bottom, hr{
  position: relative;
  z-index: 2;
}
#footer::after{
  content: "";
  position: absolute;
  width:100vw;
  height: 100%;
  background: var(--dark-blue);
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
}

footer :deep(select){
  background-color: var(--light-blue);
  color: var(--white);
  border: 2px solid rgba(255, 255, 255, 0.1);
}
footer :deep(select){
  background-color: var(--light-blue);
  color: var(--white);
  border: 2px solid rgba(255, 255, 255, 0.1);
}
footer :deep(select:is(:hover, :active, :focus)){
  background-color: var(--dark-blue);

}
@media screen and (max-width: 1200px){
  .footer-container{
    gap: 2rem;
  }
}

@media screen and (max-width: 900px){
  footer{
    gap: 2rem;
    align-items: center;
  }
  .footer-container{
    flex-direction: column-reverse;
    align-items: flex-start;
    width: fit-content;
  }

  .footer-nav {
    justify-content: flex-start;
    gap: 5rem;
    width: unset;
  }
}
@media screen and (max-width: 460px){
  .footer-nav {
    gap: 2rem;
  }
}

</style>
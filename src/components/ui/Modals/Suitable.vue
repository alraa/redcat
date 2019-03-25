<template>
  <div class="popup">
    <div class="fit-popup">
      <div class="fit-popup-wrapper">
        <div class="popup__close">
          <span class="icon-close-popup" @click="cancel"></span>
        </div>

        <div class="size-popup__header" v-if="!errorSize">По нашему мненинию, вам лучше всего подойдет размер:</div>

        <div class="fit-popup__size">{{modal.size}}</div>

        <div class="fit-popup__input-cont" v-if="!errorSize">
          <div class="fit-popup__input-wrapper">
            <ul class="fit-popup__list">
              <li class="fit-popup__item">
                <div class="fit-popup__item-header">80% клиентов подходит размер {{modal.size}}.</div>
                <div class="fit-popup__item-scale">
                  <div class="fit-popup__item-bar"></div>
                </div>
              </li>

              <!--<li class="fit-popup__item">-->
                <!--<div class="fit-popup__item-header">20% клиентов подходит размер L.</div>-->
                <!--<div class="fit-popup__item-scale">-->
                  <!--<div class="fit-popup__item-bar"></div>-->
                <!--</div>-->
              <!--</li>-->
            </ul>
            <div class="fit-popup__item-info">Не волнуйтесь, эту информацию видите только вы!</div>
            <!--<div class="fit-popup__item-header">Редактировать информацию</div>-->
          </div>
        </div>

        <div class="fit-popup__btn">
          <a href="#" class="button" @click.prevent="cancel">Продолжить покупки</a>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Suitable',
  props: {
    modal: [Object, Boolean],
    success: Function,
    cancel: Function
  },
  methods: {
    ...mapActions(['postCallbackForm'])
  },
  computed: {
    errorSize () {
      return this.modal.size === 'Данного размена не найдено ('
    }
  }
}
</script>

<style scoped>

</style>

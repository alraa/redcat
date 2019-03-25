<template>
  <div class="box-field">
    <label class="box-field__label">Категория</label>
    <div class="box-field__input">
      <div @click.prevent="open = !open" class="cust-select cust-select-xs" :class="{'open-select': open}">
        <div class="cust-select-title js-cust-select">
          <span>Обувь</span>
          <i class="icon-bottom-arrow"></i>
        </div>
        <div class="cust-select-dropdown">
          <ul class="cust-select-list js-select-list">
            <li class="cust-select-list__item">
              <a href="#" class="cust-select-list__link">Одежда</a>
            </li>
            <li class="cust-select-list__item ">
              <a href="#" class="cust-select-list__link">Кепки</a>
            </li>
            <li class="cust-select-list__item">
              <a href="#" class="cust-select-list__link">Носки</a>
            </li>
            <li class="cust-select-list__item active">
              <a href="#" class="cust-select-list__link">Обувь</a>
            </li>
            <li class="cust-select-list__item ">
              <a href="#" class="cust-select-list__link">Парки</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'customSelect',
  data () {
    return {
      open: false
    }
  }
}
</script>

<style scoped>

</style>

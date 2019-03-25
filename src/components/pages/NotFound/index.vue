<template>
	<div>
    <banner />
    <div class="box-error">
      <div class="wrapper">
        <div class="box-error__left">
          <img src="~@/assets/img/404-error_left.svg" alt="">
        </div>
        <div class="box-error__right">
          <div class="box-error__title">ОШИБКА</div>
          <div class="box-error__img">
            <img src="~@/assets/img/404-error_right.png" alt="">
          </div>
          <div class="box-error__subtitle">Страница не найдена</div>
          <p>Данная страница отсутствует,  <br>Вы можете <router-link to="/">перейти на главную</router-link> или</p>
          <div class="box-error__link">
            <router-link to="/catalog">Перейти к каталогу</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  mounted() {
    this.$nextTick(() => {
      $(document).trigger('ready');
    })
  },
}
</script>

<style scoped>

</style>

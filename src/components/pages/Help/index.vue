<template>
  <div>

    <banner/>

    <div class="cataloge-nav-wrapper">
      <div class="wrapper">
        <div class="help__header">{{bread[0].name}}</div>
      </div>
    </div>

    <breadcrumb :info="bread"/>

    <div class="wrapper">
        <div class="help-container">
          <div class="help-top">
            <div class="help-block">
              <div class="help-block__img">
                <img src="~@/assets/img/help_1.png" alt="">
              </div>
              <div class="help-block__header">Доставка</div>
              <ul class="help-block__list">
                <li class="help-block__item">
                  <router-link to="help/category/sfsdfsdfsdf" class="help-block__link">1. Обычная доставка почтой</router-link>
                </li>
                <li class="help-block__item">
                  <router-link to="help/category/sfsdfsdfsdf" class="help-block__link">2. Ускоренная доставка EMS + курьер от почты России</router-link>
                </li>
                <li class="help-block__item">
                  <router-link to="help/category/sfsdfsdfsdf" class="help-block__link">3. Трек коды</router-link>
                </li>
              </ul>
              <router-link to="help/category" class="help-block__btn">Смотреть все</router-link>
            </div>

            <div class="help-block">
              <div class="help-block__img">
                <img src="~@/assets/img/help_2.png" alt="">
              </div>
              <div class="help-block__header">Оплата</div>
              <ul class="help-block__list">
                <li class="help-block__item"><a href="#" class="help-block__link">1. Способы оплаты</a></li>
                <li class="help-block__item"><a href="#" class="help-block__link">2. Когда производится дплата</a></li>
              </ul>
              <router-link to="help/payment" class="help-block__btn">Смотреть все</router-link>
            </div>

            <div class="help-block">
              <div class="help-block__img">
                <img src="~@/assets/img/help_3.png" alt="">
              </div>
              <div class="help-block__header">Отзывы</div>
              <ul class="help-block__list">
                <li class="help-block__item"><a href="#" class="help-block__link">1. Отзывы в группе vk</a></li>
                <li class="help-block__item"><a href="#" class="help-block__link">2. Альбом с любительскими фото перед отправкой</a></li>
                <li class="help-block__item"><a href="#" class="help-block__link">3. Любительские видео обзоры</a> </li>
              </ul>

            </div>

            <div class="help-block">
              <div class="help-block__img">
                <img src="~@/assets/img/help_4.png" alt="">
              </div>
              <div class="help-block__header">Обмен/возврат</div>
              <ul class="help-block__list">
                <li class="help-block__item"><a href="#" class="help-block__link">1. Как осуществляется возврат (получение денег обратно)</a></li>
                <li class="help-block__item"><a href="#" class="help-block__link">2. Осуществляется замена (замена товара что вы получили на другой)</a></li>
                <li class="help-block__item"><a href="#" class="help-block__link">3. Условия возврата</a></li>
              </ul>

            </div>

            <div class="help-block">
              <div class="help-block__img">
                <img src="~@/assets/img/help_5.png" alt="">
              </div>
              <div class="help-block__header">Товары</div>
              <ul class="help-block__list">
                <li class="help-block__item"><a href="#" class="help-block__link">1. Таблица размеров</a></li>
                <li class="help-block__item"><a href="#" class="help-block__link">2. Какие размеры указаны на сайте</a></li>
                <li class="help-block__item"><a href="#" class="help-block__link">3. Оригинал или копия?</a></li>
              </ul>

            </div>

            <div class="help-block">
              <div class="help-block__img">
                <img src="~@/assets/img/help_6.png" alt="">
              </div>
              <div class="help-block__header">Проблема с заказами</div>
              <ul class="help-block__list">
                <li class="help-block__item"><a href="#" class="help-block__link">1. Недоставющий товар</a></li>
                <li class="help-block__item"><a href="#" class="help-block__link">2. Неправильный товар</a></li>
              </ul>
              <a href="#" class="help-block__btn">Смотреть все</a>
            </div>
          </div>

          <div class="help-section__header">Пошаговый алгоритм от оформления заказа до его получения</div>

          <div class="help-top help-middle">
            <div class="help-block">
              <div class="help-block__header">Этап 1</div>
              <div class="help-block__img">
                <img src="~@/assets/img/help_7.png" alt="">
              </div>
              <ul class="help-block__list">
                <li class="help-block__item">Оформление заказа</li>
              </ul>
              <div class="help-block__btn" @click="openModal({type: 'help', title: 'Оформление заказа', text: textPopup, url: require('@/assets/img/help_7.png')})">Смотреть все</div>
            </div>

            <div class="help-block">
              <div class="help-block__header">Этап 2</div>
              <div class="help-block__img">
                <img src="~@/assets/img/help_8.png" alt="">
              </div>
              <ul class="help-block__list">
                <li class="help-block__item">Оформление заказа и оплата</li>
              </ul>
              <div class="help-block__btn">Смотреть все</div>
            </div>

            <div class="help-block">
              <div class="help-block__header">Этап 3</div>
              <div class="help-block__img">
                <img src="~@/assets/img/help_9.png" alt="">
              </div>
              <ul class="help-block__list">
                <li class="help-block__item">Получение трек кода</li>
              </ul>
              <div class="help-block__btn" @click="openModal({type: 'help', title: 'Получения трек кода', text: textPopup, url: require('@/assets/img/help_9.png')})">Смотреть все</div>
            </div>

            <div class="help-block">
              <div class="help-block__header">Этап 4</div>
              <div class="help-block__img">
                <img src="~@/assets/img/help_10.png" alt="">
              </div>
              <ul class="help-block__list">
                <li class="help-block__item">Ожидаем и отслеживаем посылку</li>
              </ul>
              <div class="help-block__btn">Смотреть все</div>
            </div>

            <div class="help-block">
              <div class="help-block__header">Этап 5</div>
              <div class="help-block__img">
                <img src="~@/assets/img/help_11.png" alt="">
              </div>
              <ul class="help-block__list">
                <li class="help-block__item">Забираем посылку, радуемся!</li>
              </ul>
              <div class="help-block__btn">Смотреть все</div>
            </div>

            <div class="help-block">
              <div class="help-block__header">Этап 6</div>
              <div class="help-block__img">
                <img src="~@/assets/img/help_12.png" alt="">
              </div>
              <ul class="help-block__list">
                <li class="help-block__item">Замена/возврат</li>
              </ul>
              <div class="help-block__btn">Смотреть все</div>
            </div>
          </div>

          <div class="help-section__header">Как происходит процесс покупки в Red Cat Store</div>

          <div class="help-video" style="background: url(~@/assets/img/help-video.png) no-repeat 50% 50%;">
            <a href="#"></a>
          </div>

          <div class="help-section__header">Если у вас остались вопросы на которые вы не смогли найти ответы - напишите нам, мы с радостью ответим</div>

          <div class="help-bottom help-top">
            <div class="help-block">
              <div class="help-block__img">
                <img src="~@/assets/img/help_mail.png" alt="">
              </div>
              <div class="help-block__header">Red_cat_store@mail.ru</div>
              <a href="#" class="help-block__btn">Написать</a>
            </div>

            <div class=" help-block">
              <div class="help-block__img">
                <img src="~@/assets/img/help_vk.png" alt="">
              </div>
              <div class="help-block__header">vk.com/sasharedcat</div>
              <a href="#" class="help-block__btn">Написать</a>
            </div>
          </div>

        </div>
      </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'index',
  data () {
    return {
      textPopup: JSON.stringify(`<p>После оформления и оплаты заказы через 3-5 дней вы получите трек код для отслеживания. Трек код это код состоящий из цифр и букв который позволяет вам отслеживать местоположение вашей посылки. Трек код выглядит вот так - <span>«LZ347074891CN»</span>.</p>
          <p>Следить за перемещением своей посылки можно ЗДЕСЬ —-> pochta.ru или 17track.net. Первые две недели или около того, информации по треку может и не быть вовсе.<br>Это нормально.</p>
          <p>Если ПОЛНОСТЬЮ отсутствует какая-либо информация по трек-номеру после двух недель - напишите пожалуйста в поддержку.</p>`)
    }
  },
  computed: {
    bread () {
      return [
        {
          link: false,
          name: this.$route.name
        }
      ]
    }
  },
  methods: {
    ...mapMutations('modals', ['openModal'])
  }
}
</script>

<style scoped>

</style>

<template>
    <ul class="category-list order-list  discount-category">
        <li class="order-list__item" v-for="(item, index) in category" :key="index">
            <a class="order-list__link">{{item.name}}</a>
        </li>
        <li class="order-list__item">
          <span class="order-list__link add-discount-form">
          <textarea class="form-control" v-model="newCategory"></textarea>
          <button class="btn btn-border" @click.prevent="addCategory">Добавить тип</button>
          </span>
        </li>
    </ul>
</template>
<script>
export default {
  name: 'discount-category',
  data () {
    return {
      newCategory: '',
      category: [
        {
          name: 'Все скидки и бонусы'
        },
        {
          name: 'Обычные скидки'
        },
        {
          name: 'Скидки и бонусы  по сумме заказа'
        },
        {
          name: 'Скидки и бонусы по купонам'
        },
        {
          name: 'Скидки и бонусы по группе клиентов'
        }
      ]
    }
  },
  methods: {
    addCategory () {
      this.category = [...this.category, {name: this.newCategory}]
      this.newCategory = ''
    }
  }
}
</script>

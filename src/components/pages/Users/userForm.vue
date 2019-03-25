<template>
  <form>
    <div class="white-item">
      <div class="box-field">
        <label class="box-field__label">{{edit ? 'Редактирование' : 'Добавление нового пользвателя'}}</label>
        <div class="box-field__input">
          <input type="text" class="form-control" v-model="form.name" placeholder="Введите имя">
        </div>
        <div class="box-field__input">
          <input type="text" class="form-control" v-model="form.email" placeholder="Введите e-mail">
        </div>
        <span class="box-field__text">Пароль будет сгенерирован и выслан на указанный электронный адрес</span>
      </div>
      <ul class="list-check list-check-block" v-if="!edit">
        <li class="list-check__item">
          <label class="check-table">
            <input type="checkbox" v-model="form.accountMeta.confirmed" checked name="check_1">
            <span class="check-table__icon"></span>
            <span class="label-text">Получать уведомления</span>
          </label>
        </li>
      </ul>
    </div>
    <div class="white-item">
      <div class="box-field__label">Права пользователя</div>
      <ul class="list-check list-check-block">
        <li class="list-check__item">
          <label class="check-table">
            <input type="checkbox" v-model="form.accountMeta.admin" checked name="check_1">
            <span class="check-table__icon"></span>
            <span class="label-text">Администратор</span>
          </label>
        </li>
        <li class="list-check__item">
          <label class="check-table">
            <input type="checkbox" v-model="form.accountMeta.providers" name="check_1">
            <span class="check-table__icon"></span>
            <span class="label-text">Доступ к Поставщикам</span>
          </label>
        </li>
        <li class="list-check__item">
          <label class="check-table">
            <input type="checkbox" v-model="form.accountMeta.offers" name="check_1">
            <span class="check-table__icon"></span>
            <span class="label-text">Доступ в раздел Заказы</span>
          </label>
        </li>
        <li class="list-check__item">
          <label class="check-table">
            <input type="checkbox" v-model="form.accountMeta.clients" name="check_1">
            <span class="check-table__icon"></span>
            <span class="label-text">Доступ в раздел Клиенты</span>
          </label>
        </li>
        <li class="list-check__item">
          <label class="check-table">
            <input type="checkbox" v-model="form.accountMeta.items" name="check_1">
            <span class="check-table__icon"></span>
            <span class="label-text">Доступ в раздел Товары</span>
          </label>
        </li>
      </ul>
    </div>
    <div class="user-btn">
      <a href="#" @click.prevent="editClear" class="link-black">Отмена</a>
      <button class="btn-big-black" @click.prevent="updateUser" v-if="edit">Сохранить</button>
      <button class="btn-big-black" @click.prevent="createUser" v-else>Создать</button>
    </div>
  </form>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import * as Api from '@/api'
export default {
  name: 'userForm',
  data () {
    return {
      form: {
        name: '',
        email: '',
        accountMeta: {
          admin: false,
          providers: false,
          offers: false,
          clients: false,
          items: false,
          confirmed: false
        }
      }
    }
  },
  computed: {
    ...mapState('users', ['edit', 'userToEdit'])
  },
  watch: {
    edit (val) {
      if (val) {
        this.form.accountMeta = this.userToEdit.accountMeta
        this.form.email = this.userToEdit.email
        this.form.name = this.userToEdit.personMeta.name
      } else {
        this.form = {
          name: '',
          email: '',
          accountMeta: {
            admin: false,
            providers: false,
            offers: false,
            clients: false,
            items: false,
            confirmed: false
          }
        }
      }
    }
  },
  methods: {
    ...mapMutations('users', ['setEdit', 'clearEdit']),
    createUser () {
      Api.createUser(this.form)
        .then(() => {
          this.$emit('form-update')
          this.editClear()
          this.form.name = ''
          this.form.email = ''
        })
    },
    updateUser () {
      Api.updateUser(this.userToEdit._id, this.form)
        .then(() => {
          this.$emit('form-update')
          this.editClear()
        })
    },
    editClear () {
      this.setEdit(false)
      this.clearEdit()
    }
  }
}
</script>

<style scoped>

</style>

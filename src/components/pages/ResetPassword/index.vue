<template>
  <div>
    <banner />
    <breadcrumb :info="bread"/>
    <div class="reset">
      <div class="wrapper reset__wrapper">
        <form class="reset__form" @submit.prevent="savePassword">
          <div class="reset__title">
            Введите новый пароль
          </div>
          <div class="reset__password" :class="{'reset__password_not-valid': errors.has('password')}">
            <label class="reset__label-password">
              Введите пароль
            </label>
            <input v-validate="'required|min:6'" v-model="password" name="password" :type="typePassword" ref="password"  class="reset__input-password" placeholder="*************" required>
            <div class="reset__password-icon">
              <i class="icon-eye" @click.prevent="passwordToggle"></i>
            </div>
          </div>
          <div class="reset__password-confirm" :class="{'reset__password-confirm_not-valid': errors.has('password_confirmation')}">
            <label class="reset__label-password-confirm">
              Повторите пароль
            </label>
            <input v-validate="'required|confirmed:password'" v-model="passwordConfirm" name="password_confirmation" :type="typePasswordConfirm"  data-vv-as="password" class="reset__input-password-confirm" placeholder="*************" required>
            <div class="reset__password-icon">
              <i class="icon-eye" @click.prevent="passwordToggleConfirm"></i>
            </div>
            <span>Пароли не совпадают</span>
          </div>
          <div class="reset__submit-container">
            <input type="submit" class="reset__submit" value="Сохранить" :disabled="!isFormValid">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import * as Api from '@/api'
export default {
  name: 'index',
  data () {
    return {
      password: '',
      passwordConfirm: '',
      showPassword: true,
      showPasswordConfirm: true
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
    },
    isFormValid () {
      return Object.keys(this.fields).every(key => this.fields[key].valid)
    },
    typePassword () {
      return this.showPassword ? 'password' : 'text'
    },
    typePasswordConfirm () {
      return this.showPasswordConfirm ? 'password' : 'text'
    }
  },
  methods: {
    passwordToggle () {
      this.showPassword = !this.showPassword
    },
    passwordToggleConfirm () {
      this.showPasswordConfirm = !this.showPasswordConfirm
    },
    savePassword () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          Api.resetPassword({ 'password': this.password })
          alert('Form Submitted!')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

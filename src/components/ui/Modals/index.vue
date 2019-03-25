<template>
 <div>
    <authorization-form
      :modal="modal"
      v-if="modal.type === 'authorization'"
      :success="successModal"
      :cancel="cancelModal"
    />
    <RegistrationForm
      :modal="modal"
      v-if="modal.type === 'registration'"
      :success="successModal"
      :cancel="cancelModal"
    />

    <Offer
      :modal="modal"
      v-if="modal.type === 'offer'"
      :success="successModal"
      :cancel="cancelModal"
    />
    <Chart
      :modal="modal"
      v-if="modal.type === 'chart'"
      :success="successModal"
      :cancel="cancelModal"
    />

    <Calc
      :modal="modal"
      v-if="modal.type === 'calc'"
      :success="successModal"
      :cancel="cancelModal"
    />
    <ErrorModal
      :modal="modal"
      v-if="modal.type === 'error'"
      :success="successModal"
      :cancel="cancelModal"
    />
    <Suitable
      :modal="modal"
      v-if="modal.type === 'suitable'"
      :success="successModal"
      :cancel="cancelModal"
    />
   <Help
     :modal="modal"
     v-if="modal.type === 'help'"
     :success="successModal"
     :cancel="cancelModal"
   />
 </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  components: {
    AuthorizationForm: () => import('./Authorization.vue'),
    RegistrationForm: () => import('./Registration.vue'),
    Offer: () => import('./Offer.vue'),
    Chart: () => import('./Chart.vue'),
    Calc: () => import('./Calc.vue'),
    ErrorModal: () => import('./Error.vue'),
    Suitable: () => import('./Suitable.vue'),
    Help: () => import('./Help.vue')
  },

  data: () => ({
    cancellable: true
  }),

  computed: {
    ...mapState('modals', ['list']),

    modal () {
      if (this.list.length === 0) return false
      return this.list[this.list.length - 1]
    }
  },

  methods: {
    ...mapMutations('modals', ['closeModal']),
    cancelModal () {
      if (typeof this.modal.cancellable !== 'undefined' && !this.modal.cancellable) {
        return
      }
      let cancel = this.modal.cancel || function () {}
      cancel()
      this.closeModal(this.list.length - 1)
    },

    successModal (item) {
      let success = this.modal.success || function () {}
      this.closeModal(this.list.length - 1)
      success(item)
    }

  }
}
</script>

<style>
</style>

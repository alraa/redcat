<template>
    <div class="one-order-title">
        <select-dropdown :selects="['Отгружен',20,30,40,50]" :active="'Отгружен'"/>
        <select-dropdown :selects="['Оплачен',20,30,40,50]" :active="'Оплачен'"/>
        <div class="one-order-date">
            <label>
                <input type="text" id="datepicker" value="15/08/18">
                <i class="icon-small-calendar"></i>
            </label>
        </div>
        <span class="one-order-title__inf">(с банковской карты Visa, MasterCard или Maestro, транзакция №4887423)</span>
    </div>
</template>
<script>
import SelectDropdown from '@/components/ui/SelectDropdown/index'
import datepicker from '@/mixins/datepicker'
export default {
  name: 'order-table-filter',
  components: { SelectDropdown },
  mixins: [datepicker]
}
</script>

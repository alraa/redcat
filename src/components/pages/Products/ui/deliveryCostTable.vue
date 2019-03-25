<template>
  <div class="box-form-row">
    <table class="table">
      <thead>
        <tr>
          <td>Название</td>
          <td>Цена</td>
          <td>Итого</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span>Россия</span> STD-Express
          </td>
          <td>{{cost('russia','express', weight)}}</td>
          <td>{{cost('russia','express', weight) + price}}</td>
        </tr>
        <tr>
          <td>
            <span>Россия</span> STD-Standart
          </td>
          <td>{{cost('russia','standart', weight)}}</td>
          <td>{{cost('russia','standart', weight) + price}}</td>
        </tr>
        <tr>
          <td>
            <span>Беларусь</span> STD-Express
          </td>
          <td>{{cost('belarus','express', weight)}}</td>
          <td>{{cost('belarus','express', weight) + price}}</td>
        </tr>
        <tr>
          <td>
            <span>Беларусь</span> STD-Standart
          </td>
          <td>{{cost('belarus','standart', weight)}}</td>
          <td>{{cost('belarus','standart', weight) + price}}</td>
        </tr>
        <tr>
          <td>
            <span>Казахстан</span> STD-Standart
          </td>
          <td>{{cost('kasakhstan','standart', weight)}}</td>
          <td>{{cost('kasakhstan','standart', weight) + price}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import cost from './deliveryCounter.js'
export default {
	name: 'customSelect',
	props: ['weight', 'price'],
	data() {
		return {}
	},
	methods: {
		cost: cost,
	},
}
</script>

<style lang="scss" scoped>
.table {
	width: 100%;
	td {
		padding: 4px;
	}
	thead {
		padding: 4px;
		td {
			font-size: 90%;
		}
	}
	tbody {
		td {
			&:first-child {
				font-size: 80%;
				> span {
					color: gray;
				}
			}
			&:not(:first-child) {
				font-weight: bold;
			}
		}
	}
}
</style>

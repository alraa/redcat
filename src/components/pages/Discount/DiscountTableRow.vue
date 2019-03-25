<template>
    <li class="table-list__item">
        <div class="col col_1">
            <label class="check-table">
                <input type="checkbox">
                <span class="check-table__icon"></span>
            </label>
        </div>
        <div class="col col_2">Обычные скидки и бонусы</div>
        <div class="col col_3">Летняя скидка на все футболки</div>
        <div class="col col_4"><input type="text" class="change-input"
                                      value="01.06.18 - 18.06.18" disabled></div>
        <div class="col col_5">
            <div class="cust-select cust-select-xs ">
                <div class="cust-select-title js-cust-select">
                    <span>Все розничные клиенты</span>
                    <i class="icon-bottom-arrow"></i>
                </div>
                <div class="cust-select-dropdown">
                    <ul class="cust-select-list js-select-list">
                        <li class="cust-select-list__item active">
                            <a href="#" class="cust-select-list__link">Одежда</a>
                        </li>
                        <li class="cust-select-list__item ">
                            <a href="#" class="cust-select-list__link">Кепки</a>
                        </li>
                        <li class="cust-select-list__item">
                            <a href="#" class="cust-select-list__link">Носки</a>
                        </li>
                        <li class="cust-select-list__item ">
                            <a href="#" class="cust-select-list__link">Обувь</a>
                        </li>
                        <li class="cust-select-list__item ">
                            <a href="#" class="cust-select-list__link">Парки</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col col_6"><input type="text" class="change-input" value="10%"
                                      disabled></div>
        <div class="col col_7"><a href="#">Носки Supreme</a> в подарок</div>
        <div class="col col_8">-</div>
        <div class="col col_9">
            <label class="switch">
                <input type="checkbox" checked>
                <span class="switch__icon"></span>
            </label>
        </div>
        <div class="col col_10">
            <ul class="order-links">
                <li class="order-links__item order-links__item_edit">
                    <a href="#" class="order-links__link js-edit-row"><i
                            class="icon-edit"></i></a>
                </li>
                <li class="order-links__item order-links__item_save">
                    <a href="#" class="order-links__link js-save-row"><i
                            class="icon-checked"></i></a>
                </li>
            </ul>
        </div>
    </li>
</template>
<script>
export default {
  name: 'discountTableRow'
}
</script>

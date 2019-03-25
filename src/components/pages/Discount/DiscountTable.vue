<template>
    <div class="table-list-wrap">
        <div class="table-list-scroll js-scroll-horizont">
            <ul class="table-list table-one-order table-discount">
                <li class="table-list__item table-list__item_title">
                    <div class="col col_1">
                        <label class="check-table">
                            <input type="checkbox">
                            <span class="check-table__icon"></span>
                        </label>
                    </div>
                    <div class="col col_2">Тип</div>
                    <div class="col col_3">Название</div>
                    <div class="col col_4">Период</div>
                    <div class="col col_5">Группа клиентов</div>
                    <div class="col col_6">Скидка</div>
                    <div class="col col_7">Бонус</div>
                    <div class="col col_8">Промо-код</div>
                    <div class="col col_9">Статус</div>
                    <div class="col col_10"></div>
                </li>
                <discountTableRow/>
                <li class="table-list__item">
                    <div class="col col_1">
                        <label class="check-table">
                            <input type="checkbox">
                            <span class="check-table__icon"></span>
                        </label>
                    </div>
                    <div class="col col_2">Скидки и бонусы по купонам</div>
                    <div class="col col_3">Бесплатная доставка от 8 тыс.</div>
                    <div class="col col_4"><input type="text" class="change-input" value="-"
                                                  disabled></div>
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
                    <div class="col col_6"><input type="text" class="change-input" value="-"
                                                  disabled></div>
                    <div class="col col_7"><a href="#">Носки Gucci</a> Доставка 0р</div>
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
                <li class="table-list__item">
                    <div class="col col_1">
                        <label class="check-table">
                            <input type="checkbox">
                            <span class="check-table__icon"></span>
                        </label>
                    </div>
                    <div class="col col_2">Скидки и бонусы по купонам</div>
                    <div class="col col_3">Купон на первую покупку</div>
                    <div class="col col_4"><input type="text" class="change-input"
                                                  value="14.06.18 - 30.06.18" disabled></div>
                    <div class="col col_5">
                        <div class="cust-select cust-select-xs ">
                            <div class="cust-select-title js-cust-select">
                                <span>Только новые (розница)</span>
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
                    <div class="col col_6"><input type="text" class="change-input" value="20%"
                                                  disabled></div>
                    <div class="col col_7">-</div>
                    <div class="col col_8">RCS1</div>
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
                <li class="table-list__item">
                    <div class="col col_1">
                        <label class="check-table">
                            <input type="checkbox">
                            <span class="check-table__icon"></span>
                        </label>
                    </div>
                    <div class="col col_2">Скидки и бонусы по группе клиентов</div>
                    <div class="col col_3">Скидка постоянным покупателям</div>
                    <div class="col col_4"><input type="text" class="change-input" value="-"
                                                  disabled></div>
                    <div class="col col_5">
                        <div class="cust-select cust-select-xs ">
                            <div class="cust-select-title js-cust-select">
                                <span>5 и более заказов  (розница)</span>
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
                    <div class="col col_6"><input type="text" class="change-input" value="5%"
                                                  disabled></div>
                    <div class="col col_7">-</div>
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
                <li class="table-list__item">
                    <div class="col col_1">
                        <label class="check-table">
                            <input type="checkbox">
                            <span class="check-table__icon"></span>
                        </label>
                    </div>
                    <div class="col col_2">Скидки и бонусы по купонам</div>
                    <div class="col col_3">Купон на первую покупку</div>
                    <div class="col col_4"><input type="text" class="change-input"
                                                  value="14.06.18 - 30.06.18" disabled></div>
                    <div class="col col_5">
                        <div class="cust-select cust-select-xs ">
                            <div class="cust-select-title js-cust-select">
                                <span>Только новые (розница)</span>
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
                    <div class="col col_6"><input type="text" class="change-input" value="20%"
                                                  disabled></div>
                    <div class="col col_7">-</div>
                    <div class="col col_8">RCS1</div>
                    <div class="col col_9">
                        <label class="switch">
                            <input type="checkbox">
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
                <li class="table-list__item">
                    <div class="col col_1">
                        <label class="check-table">
                            <input type="checkbox">
                            <span class="check-table__icon"></span>
                        </label>
                    </div>
                    <div class="col col_2">Скидки и бонусы по группе клиентов</div>
                    <div class="col col_3">Скидка постоянным покупателям</div>
                    <div class="col col_4"><input type="text" class="change-input" value="-"
                                                  disabled></div>
                    <div class="col col_5">
                        <div class="cust-select cust-select-xs ">
                            <div class="cust-select-title js-cust-select">
                                <span>5 и более заказов  (розница)</span>
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
                    <div class="col col_6"><input type="text" class="change-input" value="5%"
                                                  disabled></div>
                    <div class="col col_7">-</div>
                    <div class="col col_8">-</div>
                    <div class="col col_9">
                        <label class="switch">
                            <input type="checkbox">
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
                <li class="table-list__item">
                    <div class="col col_1">
                        <label class="check-table">
                            <input type="checkbox">
                            <span class="check-table__icon"></span>
                        </label>
                    </div>
                    <div class="col col_2">Скидки и бонусы по купонам</div>
                    <div class="col col_3">Купон на первую покупку</div>
                    <div class="col col_4"><input type="text" class="change-input"
                                                  value="14.06.18 - 30.06.18" disabled></div>
                    <div class="col col_5">
                        <div class="cust-select cust-select-xs ">
                            <div class="cust-select-title js-cust-select">
                                <span>Только новые (розница)</span>
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
                    <div class="col col_6"><input type="text" class="change-input" value="20%"
                                                  disabled></div>
                    <div class="col col_7">-</div>
                    <div class="col col_8">RCS1</div>
                    <div class="col col_9">
                        <label class="switch">
                            <input type="checkbox">
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
                <li class="table-list__item">
                    <div class="col col_1">
                        <label class="check-table">
                            <input type="checkbox">
                            <span class="check-table__icon"></span>
                        </label>
                    </div>
                    <div class="col col_2">Скидки и бонусы по группе клиентов</div>
                    <div class="col col_3">Скидка постоянным покупателям</div>
                    <div class="col col_4"><input type="text" class="change-input" value="-"
                                                  disabled></div>
                    <div class="col col_5">
                        <div class="cust-select cust-select-xs ">
                            <div class="cust-select-title js-cust-select">
                                <span>5 и более заказов  (розница)</span>
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
                    <div class="col col_6"><input type="text" class="change-input" value="5%"
                                                  disabled></div>
                    <div class="col col_7">-</div>
                    <div class="col col_8">-</div>
                    <div class="col col_9">
                        <label class="switch">
                            <input type="checkbox">
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
            </ul>
        </div>
    </div>
</template>
<script>
import DiscountTableRow from '@/components/pages/Discount/DiscountTableRow'
import scrollbar from '@/mixins/custom-scrollbar'
export default {
  name: 'discountTable',
  components: { DiscountTableRow },
  mixins: [scrollbar]
}
</script>

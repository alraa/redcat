<template>
  <div class="layout__cont add-product-wrap">
    <form>
      <div class="add-product">
        <div class="add-product__col add-product__col_1">
          <div class="white-item">
            <ul class="list-check">
              <li class="list-check__item">
                <label class="check-table">
                  <input type="checkbox" v-model="form.published" name="check_published">
                  <span class="check-table__icon"></span>
                  <span class="label-text">Опубликовать сразу</span>
                </label>
              </li>
            </ul>
            <div class="box-form-row">
              <div class="box-form-row__col" style="width: 150px;">
                <label class="box-field__label" style="white-space: nowrap">Код товара</label>
                <div class="box-field__input">
                  <input type="text" v-model="form.code" class="form-control">
                </div>
              </div>
              <div class="box-form-row__col" style="width: 100%">
                <colorSelect @showAlert="showPicker = true" :items="colors" v-model="form.color_ids" />
              </div>
            </div>
            <div class="box-form-row">
              <div class="box-form-row__col">
                <div class="box-field__input" style="display: flex">
                  <label
                    v-for="(color, index) in form.color_ids"
                    class="choice-color"
                    v-if="colors.indexOf(color + 1)"
                    :style="'background:' + (colors.filter(el => el._id === color))[0].hex + '; border: 1px solid black;margin-top: 0;margin-left: 0; margin-right: 8px ' "
                    :key="index"
                  >
                  </label>
                </div>
              </div>
            </div>
            <div class="box-field">
              <label for="name-product" class="box-field__label">Название товара</label>
              <div class="box-field__input">
                <input type="text" v-model="form.name" class="form-control" id="name-product">
              </div>
            </div>
            <div class="box-field">
              <label for="name-product" class="box-field__label">Ссылка</label>
              <div class="box-field__input">
                <input type="text" v-model="form.alt" class="form-control" id="alt-product">
              </div>
            </div>
            <categorySelect :items="productCategories" v-model="form.category_id"/>
            <subCategorySelect :items="productSubCategories" :parent="form.category_id" v-model="form.subcategory_id"/>
            <brandSelect :items="productBrands" v-model="form.brand_ids"/>
            <div class="box-form-row">
              <div class="box-form-row__col">
                <label class="box-field__label">Ширина,<br>см</label>
                <div class="box-field__input">
                  <input v-model="form.sizeX" type="text" class="form-control">
                </div>
              </div>
              <div class="box-form-row__col">
                <label class="box-field__label">Высота,<br>см</label>
                <div class="box-field__input">
                  <input v-model="form.sizeY" type="text" class="form-control">
                </div>
              </div>
              <div class="box-form-row__col">
                <label class="box-field__label">Длинна,<br>см</label>
                <div class="box-field__input">
                  <input type="text" v-model="form.sizeZ" class="form-control">
                </div>
              </div>
              <div class="box-form-row__col">
                <label class="box-field__label">Вес,<br>грамм</label>
                <div class="box-field__input">
                  <input type="text" v-model="form.weight" class="form-control">
                </div>
              </div>
            </div>
            <div class="box-form-row-title">ПОЛ</div>
            <ul class="list-check">
              <li class="list-check__item">
                <label class="check-table">
                  <input type="radio" v-model="form.sex" value="male" name="check_2">
                  <span class="check-table__icon"></span>
                  <span class="label-text">Мужской</span>
                </label>
              </li>
              <li class="list-check__item">
                <label class="check-table">
                  <input type="radio" v-model="form.sex" value="female" name="check_2">
                  <span class="check-table__icon"></span>
                  <span class="label-text">Женский</span>
                </label>
              </li>
              <li class="list-check__item">
                <label class="check-table">
                  <input type="radio" v-model="form.sex" value="unisex" name="check_2">
                  <span class="check-table__icon"></span>
                  <span class="label-text">Унисекс</span>
                </label>
              </li>
            </ul>
            <div class="box-form-row-title">СЕЗОН</div>
            <ul class="list-check">
              <li class="list-check__item">
                <label class="check-table">
                  <input type="checkbox" v-model="form.seasons.winter" checked name="check_3">
                  <span class="check-table__icon"></span>
                  <span class="label-text">Зима</span>
                </label>
              </li>
              <li class="list-check__item">
                <label class="check-table">
                  <input type="checkbox" v-model="form.seasons.spring" name="check_3">
                  <span class="check-table__icon"></span>
                  <span class="label-text">Весна</span>
                </label>
              </li>
              <li class="list-check__item">
                <label class="check-table">
                  <input type="checkbox" v-model="form.seasons.summer" name="check_3">
                  <span class="check-table__icon"></span>
                  <span class="label-text">Лето</span>
                </label>
              </li>
              <li class="list-check__item">
                <label class="check-table">
                  <input type="checkbox" v-model="form.seasons.autumn" name="check_3">
                  <span class="check-table__icon"></span>
                  <span class="label-text">Осень</span>
                </label>
              </li>
            </ul>
            <ul class="tabs">
              <li><a :class="{'active': selectedQuality === 'middle', 'muted': !this.form.qualities.middle.site}" href="#" @click.prevent="selectedQuality = 'middle'">Среднее</a></li>
              <li><a :class="{'active': selectedQuality === 'high', 'muted': !this.form.qualities.high.site}" href="#" @click.prevent="selectedQuality = 'high'">Высокое</a></li>
              <li><a :class="{'active': selectedQuality === 'premium', 'muted': !this.form.qualities.premium.site}" href="#" @click.prevent="selectedQuality = 'premium'">Премиум</a></li>
            </ul>
            <div class="box-form-row">
              <div class="box-form-row__col">
                <label class="box-field__label">Себестоимость,<br>руб</label>
                <div class="box-field__input">
                  <input v-model.number="form.qualities[selectedQuality].self" type="text" class="form-control" @keyup="changedSelfPrice()">
                </div>
              </div>
              <div class="box-form-row__col">
                <label class="box-field__label">Наценка,<br>руб</label>
                <div class="box-field__input">
                  <input v-model.number="form.qualities[selectedQuality].overprice" type="text" class="form-control" @keyup="changedOverprice()">
                </div>
              </div>
              <div class="box-form-row__col">
                <label class="box-field__label">Цена,<br>руб</label>
                <div class="box-field__input">
                  <input v-model.number="form.qualities[selectedQuality].site" type="text" class="form-control" @keyup="changedSitePrice()">
                </div>
              </div>
            </div>
            <deliveryCostsTable :weight="form.weight / 1000 || 0" :price="form.qualities[selectedQuality].site || 0" />
            <div class="box-field">
              <label for="name-product" class="box-field__label">Ссылка на видео</label>
              <div class="box-field__input">
                <input type="text" v-model="form.qualities[selectedQuality].video" class="form-control" id="video">
              </div>
            </div>
            <div class="box-field">
              <div class="box-field__label">Добавить изображение</div>
              <draggable v-model="form.qualities[selectedQuality].images">
                <transition-group>
                  <div class="img-preview" v-for="(image, key) in form.qualities[selectedQuality].images" :key="image">
                    <div class="del" @click.prevent="form.qualities[selectedQuality].images.splice(key, 1)">X</div>
                    <a href="#" @click.prevent="openCrop(image, key)" target="_blank"><img :src="image" alt=""></a>
                  </div>
                </transition-group>
              </draggable>
              <div class="box-field__input">
                <label class="load-file">
                  <i class="icon-add"></i>
                  <input type="file" multiple @change="setQualityImage($event.target.name, $event.target.files)">
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="add-product__col add-product__col_2">
          <div class="white-item">
            <div class="box-field">
              <label for="desc-product" class="box-field__label">Краткое описание</label>
              <div class="box-field__input">
                <textarea v-model="form.shortDescription" class="form-control" id="desc-product"></textarea>
              </div>
            </div>
            <div class="box-field">
              <label for="full-desc-product" class="box-field__label">Полное описание</label>
              <div class="box-field__input">
                <textarea v-model="form.fullDescription" class="form-control form-control-big-desc" id="full-desc-product"></textarea>
              </div>
            </div>
            <div class="box-field" style="display: flex;flex-wrap: wrap;">
              <label class="check-table" style="display: flex; margin: 1px 2px 2px 2px;" v-for="(value, key) in sizes_footwear" :key="key">
                <input type="checkbox" v-model="form.sizes" :value="key" >
                <span class="check-table__icon"></span>
                <span class="label-text" style="display: flex; margin: 1px 2px 2px 2px;">{{value}}</span>
              </label>
            </div>

            <div class="box-field" style="display: flex; flex-wrap: wrap;">
              <label class="check-table" style="display: flex; margin:0 4px 4px 0" v-for="(value, key) in sizes_clothes" :key="key">
                <input type="checkbox" v-model="form.sizes" :value="key" >
                <span class="check-table__icon"></span>
                <span class="label-text" style="font-size: 10px; margin: 2px">{{value}}</span>
              </label>
            </div>

            <div class="box-field" style="display: flex; flex-wrap: wrap;" v-if="customSize">
              <label class="check-table" style="display: flex; margin:0 4px 4px 0" v-for="(value, key) in customSize" :key="key">
                <input type="checkbox" v-model="form.sizes" :value="key" >
                <span class="check-table__icon"></span>
                <span class="label-text" style="font-size: 10px; margin: 2px">{{value}}</span>
              </label>
            </div>

            <select-size :title="'Добавить размер'" @value="sizeCustomAdd"/>

          </div>

          <div class="white-item">
            <div class="box-field">
              <label for="desc-product" class="box-field__label box-field__label_2">Фото поставщика</label>
              <div class="box-field__input">
                <input type="text" v-model="form.provider.name" class="form-control" placeholder="Введтие название поставщика">
              </div>
              <div class="box-field__input">
                <label class="load-file load-file-full">
                  <i class="icon-add"></i>
                  <span class="load-file__text">Перетащите сюда фото либо загрузите с пк</span>
                  <input type="file" multiple @change="setProvider($event.target.name, $event.target.files)">
                </label>
              </div>
              <div class="img-preview" v-for="(image, key) in form.provider.photos" :key="key">
                <div class="del" @click.prevent=" form.provider.photos.splice(key, 1)">X</div>
                <img :src="image" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="add-product__col add-product__col_3">
          <div class="add-product__col_tablet">
            <div class="white-item">
              <div class="box-field">
                <label for="desc-product" class="box-field__label">360 - обзор</label>
                <div class="box-field__input box-field__input_border">
                  <label class="load-file load-file-sm">
                    <i class="icon-add"></i>
                    <input type="file">
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="add-product__col_tablet">
            <div class="white-item">
              <div class="box-field__label">Добавить образ</div>
              <ul class="menu-tabs">
                <li v-for="(item, index) in form.images" :class="{'active' : activeImage === index}" @click.prevent="activeImage = index" :key="index">
                  № {{index + 1}}
                  <span @click.stop="form.images.splice(index, 1)" class="close">+</span>
                </li>
              </ul>
              <div v-for="(item, index) in form.images" v-show="activeImage === index" :key="index">
                <categorySelect :items="productCategories" v-model="form.images[index].category_id"/>
                <subCategorySimple :items="productSubCategories" :parent="form.images[index].category_id" v-model="form.images[index].subcategory_id"/>
                <productSelect :category="form.images[index].category_id" :subCategory="form.images[index].subcategory_id" v-model="form.images[index].item_id"/>
                <qualitySelect v-model="form.images[index].quality" />
              </div>
              <button class="btn-big-black" @click.prevent="form.images.push( {category_id: '', subcategory_id: '', item_id: '', quality: ''})">Добавить</button>
            </div>
          </div>
          <div class="add-product__col_tablet">
            <div class="white-item">
              <div class="box-field__label">Возможно Вам может понравится</div>
              <ul class="menu-tabs">
                <li v-for="(item, index) in form.youMightLike" :class="{'active' : activeLike === index}" :key="index" @click.prevent="activeLike = index">
                  № {{index + 1}}
                  <span @click.stop="form.youMightLike.splice(index, 1)" class="close">+</span>
                </li>
              </ul>
              <div v-for="(item, index) in form.youMightLike" v-show="activeLike === index" :key="index">
                <categorySelect :items="productCategories" v-model="form.youMightLike[index].category_id"/>
                <subCategorySimple :items="productSubCategories" :parent="form.youMightLike[index].category_id" v-model="form.youMightLike[index].subcategory_id"/>
                <productSelect :category="form.youMightLike[index].category_id" :subCategory="form.youMightLike[index].subcategory_id" v-model="form.youMightLike[index].item_id"/>
                <qualitySelect v-model="form.youMightLike[index].quality" />
              </div>
              <button class="btn-big-black" @click.prevent="form.youMightLike.push( {category_id: '', subcategory_id: '', item_id: '', quality: ''})">Добавить</button>
            </div>
          </div>
          <div class="add-product__col_tablet">
            <button @click.prevent="createProductIn()" class="btn-big-black">Добавить товар</button>
          </div>
        </div>
      </div>
    </form>
    <ColorpickerModal @close="showPicker = false" v-if="showPicker"/>
    <CropModal @close="showCrop = false" :img="imageToCrop" @update="updateImage" :id="imageToCropIndex" v-if="showCrop" />
  </div>
</template>

<script>
import categorySelect from '../ui/categorySelect'
import colorSelect from '../ui/colorSelect'
import subCategorySelect from '../ui/subCategorySelect'
import brandSelect from '../ui/brandSelect'
import productSelect from '../ui/productSelect'
import ColorpickerModal from '../ui/ColorpickerModal'
import CropModal from '../ui/CropModal'
import subCategorySimple from '../ui/subCategorySimple'
import deliveryCostsTable from '../ui/deliveryCostTable'
import qualitySelect from '../ui/qualitySelect'
import {mapActions, mapState} from 'vuex'
import translit from 'cyrillic-to-translit-js'
import selectSize from '@/components/ui/SelectSise'
import _ from 'object-get'
import draggable from 'vuedraggable'
import * as Api from '@/api'

export default {
  name: 'AddProduct',
  components: {
    categorySelect,
    subCategorySelect,
    brandSelect,
    subCategorySimple,
    productSelect,
    deliveryCostsTable,
    qualitySelect,
    colorSelect,
    ColorpickerModal,
    draggable,
    CropModal,
    selectSize
  },
  data () {
    return {
      productCategory: {},
      form: {
        published: true,
        code: '',
        name: '',
        alt: '',
        category_id: '',
        subcategory_id: '',
        brand_id: '',
        color_id: '',
        sex: 'unisex', // dont remove
        sizes: [],
        seasons: {
          winter: false,
          spring: false,
          summer: false,
          autumn: false
        },
        shortDescription: '',
        fullDescription: '',
        review360: '',
        sizeX: '',
        sizeY: '',
        sizeZ: '',
        weight: '',
        qualities: {
          middle: {
            self: '',
            site: '',
            overprice: '',
            video: '',
            images: []
          },
          high: {
            self: '',
            site: '',
            overprice: '',
            video: '',
            images: []
          },
          premium: {
            self: '',
            site: '',
            overprice: '',
            video: '',
            images: []
          }
        },
        provider: {
          name: '',
          photos: []
        },
        images: [],
        youMightLike: []
      },
      selectedQuality: 'high',
      sizes_footwear: {
        xs: '140-149 (XS)',
        s: '150-159 (S)',
        m: '160-170 (M)',
        l: '171-175 (L)',
        xl: '176-180 (XL)',
        xxl: '181-185 (XXL)',
        xxxl: '186-190 (XXXL)'
      },
      sizes_clothes: {
        '36': '36 EUR (22.5CM)',
        '37': '37 EUR (23CM)',
        '38': '38 EUR (24CM)',
        '39': '39 EUR (24.5CM)',
        '40': '40 EUR (25CM)',
        '41': '41 EUR (26CM)',
        '42': '42 EUR (26.5CM)',
        '43': '43 EUR ( 27CM)',
        '44': '44 EUR (28CM)',
        '45': '45 EUR (29CM)',
        '46': '46 EUR (30CM)'
      },
      customSize: {},
      activeImage: 0,
      activeLike: 0,
      imageToCrop: '',
      showPicker: false,
      showCrop: false,
      imageToCropIndex: 0
    }
  },
  computed: {
    ...mapState('products', ['productCategories', 'productSubCategories', 'productBrands', 'colors']),
    getImageHex () {
      let index = this.colors.findIndex((color) => {
        return color._id === this.form.color_id
      })
      if (index + 1) {
        return this.colors[index].hex
      }
      return ''
    }
  },
  created () {
    this.getCategories()
    this.getSubCategories()
    this.getBrands()
    this.getColors()
    Api.getNextItemCode()
      .then(res => { this.form.code = res.result.code })
      .catch(err => console.log('error while getting next code', err))
  },
  watch: {
    'form.name' () {
      this.form.alt = translit().transform(this.form.name, '-') + this.form.code
    },
    'form.code' () {
      this.form.alt = translit().transform(this.form.name, '-') + this.form.code
    }
  },
  methods: {
    ...mapActions('products', ['getCategories', 'getSubCategories', 'getBrands', 'createProduct', 'getColors']),
    ...mapActions(['uploadFile']),
    _: _,
    sizeCustomAdd (value) {
      if (value === '') return
      this.form.sizes.push(value)
      this.sizeCustom()
    },
    sizeCustom () {
      this.form.sizes
        .filter(item => !Object.keys(this.sizes_clothes).includes(item))
        .filter(item => !Object.keys(this.sizes_footwear).includes(item))
        .forEach(item => { this.customSize[item] = item })
    },
    setQualityImage (fieldName, fileList) {
      // handle file changes

      if (!fileList.length) return
      // append the files to FormData
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          let file = new FormData()
          file.append('file', fileList[x], fileList[x].name)
          this.uploadFile(file)
            .then(res => {
              this.form.qualities[this.selectedQuality].images.push(res.link)
            })
        })
    },
    setProvider (fieldName, fileList) {
      if (!fileList.length) return
      // append the files to FormData
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          let file = new FormData()
          file.append('file', fileList[x], fileList[x].name)
          this.uploadFile(file)
            .then(res => {
              this.form.provider.photos.push(res.link)
            })
        })
    },

    createProductIn () {
      this.createProduct(this.form)
        .then(res => {
          switch (res.code) {
            case null:
              this.$router.push({ path: '/products', query: {fetch: '1'} })
              break
            case 'duplicate_code':
              alert('Ошибка: найден дубликат кода товара, нельзя опубликовать в таком виде')
              break
            case 'duplicate_name':
              alert('Ошибка: найден дубликат имени, нельзя опубликовать в таком виде')
              break
            case 'duplicate_alt':
              alert('Ошибка: найден дубликат ссылки, нельзя опубликовать в таком виде')
              break
            default:
              // TODO: handle more errors
              break
          }
        })
    },

    updateImage (e) {
      // console.log(e)
      this.showCrop = false
      this.form.qualities[this.selectedQuality].images[e.index] = e.link
    },

    openCrop (link, index) {
      this.imageToCrop = link
      this.imageToCropIndex = index
      this.showCrop = true
    },

    recalculateQuality (quality) {
      this.form.qualities[quality].site = this.form.qualities[quality].self + this.form.overprice + this.form.deliveryPrice
    },

    changedOverprice () {
      this.form.qualities[this.selectedQuality].site = +this.form.qualities[this.selectedQuality].overprice + +this.form.qualities[this.selectedQuality].self
    },
    changedSitePrice () {
      this.form.qualities[this.selectedQuality].overprice = +this.form.qualities[this.selectedQuality].site - +this.form.qualities[this.selectedQuality].self
    },
    changedSelfPrice () {
      this.form.qualities[this.selectedQuality].site = +this.form.qualities[this.selectedQuality].self + +this.form.qualities[this.selectedQuality].overprice
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  padding: 5px 0;
  margin: 20px 0;
  display: flex;
  li {
    text-align: center;
    width: 100%;
    a {
      display: block;
      color: #191919;
      font-size: 13px;
      font-weight: 300;
      line-height: 18px;
      border-bottom: 2px solid transparent;
      position: relative;
      &.active{
        border-bottom: 2px solid black;
      }
      &.muted {
        font-size: 85%;
        color: gray;
        top: 3px;
      }
    }
  }
}

.img-preview {
  display: inline-block;
  border: 1px dashed gainsboro;
  position: relative;
  .del {
    font-weight: bold;
    color: black;
    position: absolute;
    top: 2px;
    right: 2px;
    cursor: pointer;
    padding: 2px;
    background: #fff;
  }
  img {
    width: 80px;
    height: 87px;
  }
}

  .menu-tabs{
    display: flex;
    width: 100%;
    text-align: center;
    flex-wrap: wrap;
    margin-bottom: 15px;
    li{
      cursor: pointer;
      margin-top: 10px;
      width: calc(20% - 10px);
      padding: 10px;
      margin-right: 10px;
      border: 1px solid black;
      border-radius: 3px;
      transition: all 0.2s ease;
      position: relative;
      .close {
        color: white;
        position: absolute;
        width: 15px;
        height: 15px;
        line-height: 15px;
        top: -7.5px;
        z-index: 99;
        right: -7.5px;
        background: red;
        border-radius: 50%;
        transform: rotate(45deg);
      }
      &:hover {
        background: black;
        color: white;
      }
      &.active {
        background: black;
        color: white;
      }
    }
  }
</style>

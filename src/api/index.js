import axios from 'axios'

import qs from 'query-string'
let request = axios.create({
  baseURL: `http://localhost:8000/api`
})

const err = (err) => {
  console.log(err)
  throw err
}

export function loginUser (form) {
  return request.post('/public/login', form)
    .then(res => res.data.result)
    .catch(err)
}

export function resetPassword (newPassword) {
  return request.post(`/user/change-password`, newPassword)
    .then(res => res.data.result)
    .catch(err)
}

export function createUser (form) {
  return request.post('/public/registration', form)
    .then(res => res.data.result)
    .catch(err)
}

export function confirmUser (secret) {
  return request.get(`/public/confirm-registration?secret=${secret}`)
    .then(res => res.data.result)
    .catch(err)
}

export function getProducts (query) {
  return request.get('/public/restful/item' + (query ? '?' + qs.stringify(query) : ''))
    .then(res => res.data.result)
    .catch(err)
}

export function getProductByAlt (params) {
  return request.get('/public/restful/item/alt/' + params)
    .then(res => res.data.result)
    .catch(err)
}

export function getProductById (params) {
  return request.get('/public/restful/item/_id/' + params)
    .then(res => res.data.result)
    .catch(err)
}

export function getProductsByIds (ids) {
  // написал с первого раза, GG EZ
  return request.get('/public/restful/item/' + (Array.isArray(ids) ? ids : [ids]).reduce((acc, val) => acc + `_id=${val}&`, '?').slice(0, -1))
    .then(res => res.data.result)
    .catch(err)
}

export function setNewUserData (personMeta) {
  return request.put(`/user/restful/profile/me`, { personMeta })
    .then(res => res.data.result)
    .catch(err)
}

export function getCard () {
  return request.get(`/user/restful/profile/me/basket`)
    .then(res => res.data.result)
    .catch(err)
}

export function deleteCardItem (id) {
  return request.delete(`/user/restful/profile/me/basket/item/${id}`)
    .then(res => res.data.result)
    .catch(err)
}

export function getUserinfo () {
  return request.get(`/user/restful/profile/me`)
    .then(res => res.data.result)
    .catch(err)
}

export function addItemToBasket (form) {
  console.log(form)
  return request.post(`/user/restful/profile/me/basket/item`, form)
    .then(res => res.data.result)
    .catch(err)
}

export function updateCard (form) {
  return request.put(`/user/restful/profile/me/basket`, form)
    .then(res => res.data.result)
    .catch(err)
}

export function addOffer (form) {
  return request.post(`/user/create-order`, form)
    .then(res => res.data.result)
    .catch(err)
}

export function getCategories () {
  return request.get(`/public/restful/category`)
    .then(res => res.data.result)
    .catch(err)
}

export function getSubcategories () {
  return request.get(`/public/restful/subcategory`)
    .then(res => res.data.result)
    .catch(err)
}

export function getBrands () {
  return request.get(`/public/restful/brand`)
    .then(res => res.data.result)
    .catch(err)
}

export function getColors () {
  return request.get(`/public/restful/color`)
    .then(res => res.data.result)
    .catch(err)
}

export function countDeliveryPrice ({ type, weight, country }) {
  return request.get(`/public/count-delivery-price?type=${type}&weight=${weight}&country=${country}`)
    .then(res => res.data.result)
    .catch(err)
}

export function getUserOrders () {
  return request.get(`/user/restful/order/my`)
    .then(res => res.data.result)
    .catch(err)
}

export function getUserOrder (id) {
  return request.get(`/user/restful/order/my/${id}`)
    .then(res => res.data.result)
    .catch(err)
}

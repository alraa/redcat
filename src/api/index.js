import axios from 'axios'
import qs from 'querystring'

const baseLink = 'http://localhost:8000/'

const request = axios.create({
  baseURL: baseLink + 'api'
})

axios.defaults.headers.common['token'] = localStorage.getItem('redCatToken')

const err = (err) => {
  console.log(err)
  throw err
}

// this is login admin
export function loginUser (form) {
  return request.post('/public/login?admin', form)
    .then(res => {
      return res.data.result
    })
    .catch(err)
}

export function uploadFile (file) {
  return request.post(`/admin/file`, file)
    .then(res => res.data.result)
    .catch(err)
}

export function uploadFile64 (file) {
  return request.post(`/admin/file64`, file)
    .then(res => res.data.result)
    .catch(err)
}

export function createProduct (form) {
  return request.post(`/admin/restful/item`, form)
    .then(res => res.data)
    .catch(err)
}

export function updateProduct (form) {
  return request.put(`/admin/restful/item/${form._id}`, form)
    .then(res => res.data)
    .catch(err)
}

export function getCategories () {
  return request.get(`/public/restful/category`)
    .then(res => res.data.result)
    .catch(err)
}

export function getSubCategories () {
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

export function createSubcategory (name) {
  return request.post(`/admin/restful/subcategory`, name)
    .then(res => res.data.result)
    .catch(err)
}

export function getAllProducts (query) {
  return request.get(`/admin/restful/item` + (query ? '?' + qs.stringify(query) : ''))
    .then(res => res.data.result)
    .catch(err)
}

export function getAllUsers () {
  return request.get(`/admin/restful/user?admin`)
    .then(res => res.data.result)
    .catch(err)
}

export function createUser (form) {
  return request.post(`/admin/manually-create-account`, form)
    .then(res => res.data.result)
    .catch(err)
}

export function updateUser (id, form) {
  return request.put(`/admin/restful/user/` + id, form)
    .then(res => res.data.result)
    .catch(err)
}
export function deleteUser (id) {
  // console.log(id, 'delete id')
  return request.delete(`/admin/restful/user/` + id)
    .then(res => res.data.result)
    .catch(err)
}

export function userInfo () {
  return request.get(`user/restful/profile/me?admin`)
    .then(res => res.data.result)
    .catch(err)
}

export function resetPassword (data) {
  return request.post(`/public/reset-password-request`, data)
}

export function getAllProductsForSelect (params) {
  return request.get(`/admin/restful/item${params}`)
    .then(res => res.data.result)
    .catch(err)
}

export function getOrders () {
  return request.get(`/admin/restful/order`)
    .then(res => res.data.result)
    .catch(err)
}

export function getSingleProduct (id) {
  return request.get(`/admin/restful/item/_id/${id}`)
    .then(res => res.data.result)
    .catch(err)
}

export function createBrand (name) {
  return request.post(`/admin/restful/brand`, name)
    .then(res => res.data.result)
    .catch(err)
}

export function getProductById (id) {
  return request.get(`/admin/restful/item/_id/${id}`)
    .then(res => res.data.result)
    .catch(err)
}

export function deleteFromTable (ids) {
  return request.post(`/admin/restful/item/action-many/remove`, ids)
    .then(res => res.data.result)
    .catch(err)
}

export function hideFromTable (ids) {
  return request.post(`/admin/restful/item/action-many/hide`, ids)
    .then(res => res.data.result)
    .catch(err)
}

export function showFromTable (ids) {
  return request.post(`/admin/restful/item/action-many/show`, ids)
    .then(res => res.data.result)
    .catch(err)
}

export function getNextItemCode () {
  return request.get(`/admin/restful/item/next-code`)
    .then(res => res.data)
    .catch(err)
}

export function createColor (form) {
  return request.post(`/admin/restful/color`, form)
    .then(res => res.data)
    .catch(err)
}

export function removeBrand (_id) {
  return request.delete(`/admin/restful/brand/` + _id)
    .then(res => res.data)
    .catch(err)
}

export function removeColor (_id) {
  return request.delete(`/admin/restful/color/` + _id)
    .then(res => res.data)
    .catch(err)
}

export function removeSubcategory (_id) {
  return request.delete(`/admin/restful/subcategory/` + _id)
    .then(res => res.data)
    .catch(err)
}

export function getOrder (options) {
  return request.get('/admin/restful/order', options)
    .then(res => res.data)
    .catch(err)
}

export function getOrderId (id) {
  return request.get(`/admin/restful/order/${id}`)
    .then(res => res.data)
    .catch(err)
}

export function getOrderProducts (id) {
  return request.get(`/admin/restful/order/${id}/items`)
    .then(res => res.data)
    .catch(err)
}
export function getOrderProductsIds (ids) {
  return request.get('/public/restful/order/' + (Array.isArray(ids) ? ids : [ids]).reduce((acc, val) => acc + `_id=${val}&`, '?').slice(0, -1))
    .then(res => res.data)
    .catch(err)
}

export function ordersWith () {
  return request.get(`/admin/restful/orders-with-items/`)
    .then(res => res.data)
    .catch(err)
}

export function getOrdersByIds (ids) {
  return request.get('/public/restful/item/' + (Array.isArray(ids) ? ids : [ids]).reduce((acc, val) => acc + `_id=${val}&`, '?').slice(0, -1))
    .then(res => res.data)
    .catch(err)
}

export function updateOrder (data, id) {
  return request.put(`/admin/restful/order/${id}`, data)
}

export function changeProductStatus (order, id, status) {
  return request.post(`/admin/restful/order/${order}/item/${id}/set-status/${status}`)
    .then(res => res.data.result)
    .catch(err)
}

export function confirmMessage (orderId, itemId) {
  return request.post(`/admin/restful/order/${orderId}/item/${itemId}/confirm-out-of-stock`)
}

import {LOGINUSER , CART_ADD , CART_DELETE , CART_QE,CART,CartTotal} from '../Constants/index'

export function LoginUser(user) {
  return { type: LOGINUSER, user }
}

export function CARTadd(product) {
  return { type: CART_ADD, product }
}

export function CARTdelete(product) {
  return { type: CART_DELETE, product }
}

export function CARTqe(product) {
  return { type: CART_QE, product }
}

export function CARTTotal(product) {
  return { type: CartTotal, product }
}

export function CART(product) {
  return { type: CART, product }
}

// export function toggleTodo(index) {
//   return { type: TOGGLE_TODO, index }
// }


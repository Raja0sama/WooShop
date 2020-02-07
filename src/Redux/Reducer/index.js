import { combineReducers } from 'redux'
import {LOGINUSER,CART,CART_ADD,CART_DELETE,CART_QE,CartTotal} from '../Constants/index'


function authentication(state = [], action) {
  switch (action.type) {
    case LOGINUSER:
      return {
            user: action.user,
        }
      
    // case TOGGLE_TODO:
    //   return state.map((todo, index) => {
    //     if (index === action.index) {
    //       return Object.assign({}, todo, {
    //         completed: !todo.completed
    //       })
    //     }
    //     return todo
    //   })
    default:
      return state
  }
}


function Cart(state = { cart : [],total : 0 }, action) {
  switch (action.type) {
    
    case CART_ADD:
      let a = state.cart
      let addedItem = a.find(item=> item.id === action.product.id)
      if(state.cart.indexOf(addedItem) == -1){
        a.push(action.product)
      }else{
        const b = state.cart.indexOf(addedItem)
        state.cart[b].Q = action.product.Q + state.cart[b].Q
      }
    return {
        ...state,
        cart : a
      }
    case CART_DELETE:
       state.cart.splice(action.product, 1)
      return {
        ...state
      }
      case CartTotal:
         
          return {
            ...state,
            total : action.product
          }
    default:
      return state
  }
}

const Auth = combineReducers({
    authentication,Cart
})

export default Auth
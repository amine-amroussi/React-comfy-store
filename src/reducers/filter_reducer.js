import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    const products = action.payload;
    // Get max price
    let getPrices = products.map(p => p.price)
    const maxPrice = Math.max(...getPrices)
    // console.log(maxPrice);
    return {...state , 
      filtred_products : products ,
      all_products : products ,
      filters : {...state.filters , price : maxPrice , max_price : maxPrice}
    }
  }
  if (action.type === SET_GRIDVIEW) {
    return {...state , isGridView : true}
  }
  if (action.type === SET_LISTVIEW) {
    return {...state , isGridView : false}
  }
  if(action.type === UPDATE_SORT){
    const value = action.payload;

    return {...state , sortedBy : value}
  }
  if (action.type === SORT_PRODUCTS) {
    const {sortedBy , filtred_products} = state;
    let tempProducts = [...filtred_products];
    if (sortedBy === "price-lowest") {
        tempProducts = tempProducts.sort((a,b)=> {
          return a.price - b.price
        })
    }
    if (sortedBy === "price-highest") {
      tempProducts = tempProducts.sort((a,b)=> {
        return b.price - a.price
      })
    }
    if (sortedBy === "name-a") {
      tempProducts = tempProducts.sort((a,b)=> {
        return a.name.localeCompare(b.name)
      })
    }
    if (sortedBy === "name-z") {
      tempProducts = tempProducts.sort((a,b)=> {
        return b.name.localeCompare(a.name)
      })
    }
    return {...state , filtred_products : tempProducts}
  }
  if (action.type === UPDATE_FILTERS) {
    const {value , name} = action.payload

    return {...state , filters:{...state.filters , [name] : value}}
  }
  if (action.type === FILTER_PRODUCTS) {
    const {all_products} = state;
    const {text , company , category , color , price , shipping} = state.filters
    let tempProducts = [...all_products];
    // text
    if (text) {
      tempProducts = tempProducts.filter(product => {
        return product.name.toLowerCase().startsWith(text)
      })
    }

    // Category
    if(category !== "all") 
    {
      tempProducts = tempProducts.filter(product => {
        return product.category === category
      })
    }

    // Company 
    if (company !== "all") {
      tempProducts = tempProducts.filter(product => {
        return product.company === company
      })
    }

    // Colors 
    if (color !== "all") {
      tempProducts = tempProducts.filter(product => product.colors.find(clr => clr === color))
    }

    // Prices
    if (price) {
      tempProducts = tempProducts.filter(product => product.price <= price)
    }

    // Shipping 
    if (shipping) {
      tempProducts = tempProducts.filter(product => product.shipping === true)
    }

    return {...state , filtred_products : tempProducts}
  }
  if (action.type === CLEAR_FILTERS) {
    return {...state , 
      filters : {
        ...state.filters,
        text : "",
        company : "all",
        color : "all",
        category : "all",
        price : state.filters.max_price,
        shipping : false,
      }
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer

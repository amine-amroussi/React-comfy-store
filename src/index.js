import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ProductsProvider } from './context/products_context'
import { FilterProvider } from './context/filter_context'
import { CartProvider } from './context/cart_context'
import { UserProvider } from './context/user_context'
import { Auth0Provider } from '@auth0/auth0-react'

// Domain : dev-iu9mndf9.us.auth0.com
// Client id : xA57iQpddBeDI62FyUd0ZMSiRqMzL3ZB

ReactDOM.render(
    <Auth0Provider
    domain ={process.env.REACT_APP_AUTH_DOMAIN}
    clientId ={process.env.REACT_APP_AUTH_CLIENT_ID}
    cacheLocation = "localstorage"
    redirectUri = {window.location.origin}
    >
        <UserProvider>
            <ProductsProvider>
                <FilterProvider>
                    <CartProvider>
                        <App />
                    </CartProvider>
                </FilterProvider>
            </ProductsProvider>
        </UserProvider>
    </Auth0Provider>
    , document.getElementById('root'))

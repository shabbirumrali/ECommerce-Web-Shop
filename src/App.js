import React, { useState, useEffect } from 'react'
import { commerce } from './lib/commerce'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Products, Navbar, Cart, Checkout } from './components'

const App = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})

  
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())
    
  }
  
  const fetchProducts = async () => {
    const { data } = await commerce.products.list()
    
    setProducts(data)
  }
  
  const handleAddToCart = async (productId, quantity) => {
    const response = await commerce.cart.add(productId, quantity);

    setCart(response);
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity })

    setCart(response)
  }

  const handleRemoveFromCart = async (productId) => {
    const response = await commerce.cart.remove(productId)

    setCart(response)
  }

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty()

    setCart(cart)
  }


  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])

  console.log("cart", cart)
  return (
    <div>
      <BrowserRouter>
        <Navbar totalItems={cart.total_items} />

        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>
          <Route exact path='/cart'>
            <Cart 
              cart={cart}
              path="/cart"
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />
          </Route>
          <Route exact path='/checkout'>
            <Checkout />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
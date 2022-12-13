import React, { useState, useEffect } from 'react'
import { commerce } from './lib/commerce'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Products, Navbar, Cart } from './components'

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
    const item = await commerce.cart.add(productId, quantity);

    setCart(item);
  }


  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])

  console.log("cart", cart)
  return (
    <div>
      <BrowserRouter>
        <Navbar totalItems={cart.total_unique_items} />

        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>
          <Route>
            <Cart cart={cart} path="/cart"/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
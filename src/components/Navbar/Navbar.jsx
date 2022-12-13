import React from 'react'
import {AppBar, Toolbar, IconButton, MenuItem, Menu, Typography, Badge } from '@material-ui/core'

// Image and icons
import { ShoppingCart } from '@material-ui/icons'
import logo from '../../assets/commerce.png'

// styles
import useStyles from './styles'
import { Link } from 'react-router-dom'

const Navbar = ({ totalItems }) => {
    const classes = useStyles()
  return (
    <>
        <AppBar position="fixed" className={classes.appBar} color="inherit">
            <Toolbar>
                <Typography variant="h6" className={classes.title} color="inherit" >
                    <Link to="/">
                        <img src={logo} alt="commerce js" height="25px" className={classes.image} />
                        Web Shop
                    </Link>
                </Typography>
                <div className={classes.grow}>
                    <div className={classes.button}>
                        <Link to="/cart">
                        <IconButton aria-label="Show Cart Items" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                        </Link>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    </>
  )
}

export default Navbar
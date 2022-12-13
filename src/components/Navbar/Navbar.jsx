import React from 'react'
import {AppBar, Toolbar, IconButton, MenuItem, Menu, Typography, Badge } from '@material-ui/core'

// Image and icons
import { ShoppingCart } from '@material-ui/icons'
import logo from '../../assets/commerce.png'

// styles
import useStyles from './styles'

const Navbar = () => {
    const classes = useStyles()
  return (
    <>
        <AppBar position="fixed" className={classes.appBar} color="inherit">
            <Toolbar>
                <Typography variant="h6" className={classes.title} color="inherit" >
                    <img src={logo} alt="commerce js" height="25px" className={classes.image} />
                    Web Shop
                </Typography>
                <div className={classes.grow}>
                    <div className={classes.button}>
                        <IconButton aria-label="Show Cart Items" color="inherit">
                            <Badge badgeContent={2} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    </>
  )
}

export default Navbar
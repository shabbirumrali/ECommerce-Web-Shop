import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'

import useStyles from './styles'

const Product = ({ product }) => {
    const classes = useStyles()
    
  return (
    <Card className={classes.root}>
        <CardMedia className={classes.media} image={product.image.url} title={product.name}  />
        <CardContent>
            <div className={classes.cardContent}>
                <Typography varient="h3" gutterBottom component="h3" >
                    {product.name}
                </Typography>
                <Typography varient="h3" gutterBottom component="h3" >
                    {product.price.formatted_with_symbol}
                </Typography>
            </div>
            <Typography dangerouslySetInnerHTML={{ __html: product.description }} varient="body2" color="textSecondary" component="p" />
        </CardContent>

        <CardActions disableSpacing className={classes.cardActions} >
            <IconButton aria-label="Add to Cart">
                <AddShoppingCart />
            </IconButton>
        </CardActions>
    </Card>
  )
}

export default Product
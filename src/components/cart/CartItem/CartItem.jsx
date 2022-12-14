import React from 'react'
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core'

// styles
import useStyles from './styles'

const CartItem = ({ item, handleUpdateCartQty, handleRemoveFromCart }) => {
    const classes = useStyles()

  return (
    <Card>
        <CardMedia image={item.image.url} alt={item.name} className={classes.media} />

        <CardContent className={classes.cardContent}>
            <Typography variant="h4">{item.name}</Typography>
            <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
        </CardContent>

        <CardActions className={classes.cardActions}>
            <div className={classes.buttons}>
                <Button type="button" onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)} size="small">-</Button>
                <Typography>{item.quantity}</Typography>
                <Button type="button" onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)} size="small">+</Button>
            </div>
            <Button variant="contained" type="button" color='secondary' onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
        </CardActions>
    </Card>
  )
}

export default CartItem
import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core'
import Confirmation from '../Confirmation'
import PaymentForm from '../PaymentForm'
import AddressForm from '../AddressForm'
import { commerce } from '../../../lib/commerce'

// styles
import useStyles from './styles'

const steps = ['Shipping address', 'Payment details']

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
  const [activeStep, setActiveStep] = useState(0)
  const [checkoutToken, setCheckoutToken] = useState(null)
  const [shippingData, setShippingData] = useState({})
  const classes = useStyles()

  
  useEffect(() => {
    const generateToken = async () => {
      try{
        const token = await commerce.checkout.generateToken(cart.id, { type: 'cart'})
        setCheckoutToken(token)
      }catch(err) {
        console.log("Error", err.message)
      }
    }
    generateToken()
  }, [cart])
  
  const nextStep = () => setActiveStep(prevActiveStep => prevActiveStep + 1)
  const backStep = () => setActiveStep(prevActiveStep => prevActiveStep - 1)
  
  const next = (data) => {
    setShippingData(data)
    
    nextStep()
  }
  

  const Form = () => activeStep === 0
  ? <AddressForm checkoutToken={checkoutToken} next={next} />
  : <PaymentForm nextStep={nextStep} onCaptureCheckout={onCaptureCheckout} shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} />
  
  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant='h4' align='center'>Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(step => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          { activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form /> }
        </Paper>
      </main>
    </>
  )
}

export default Checkout
import React, { useState } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core'
import PaymentForm from '../PaymentForm'
import AddressForm from '../AddressForm'
import Confirmation from '../Confirmation'
// styles
import useStyles from './styles'
import { act } from '@testing-library/react'

const steps = ['Shipping address', 'Payment details']

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0)
  const classes = useStyles()
  const Form = () => activeStep === 0
    ? <AddressForm />
    : <PaymentForm />

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
          { activeStep === steps.length ? <Confirmation /> : <Form /> }
        </Paper>
      </main>
    </>
  )
}

export default Checkout
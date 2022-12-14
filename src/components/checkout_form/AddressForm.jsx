import React, { useState } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import CustomTextField from './CustomTextField'

import { commerce } from '../../lib/commerce'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const AddressForm = ({ checkoutToken, next }) => {
    const [shippingCountries, setShippingCountries] = useState([])
    const [shippingCountry, setShippingCountry] = useState('')
    
    const [shippingSubDivisions, setShippingSubDivisions] = useState([])
    const [shippingSubDivision, setShippingSubDivision] = useState('')
    
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption, setShippingOption] = useState('')
    
    console.log("shipping options---", shippingOptions)
    const methods = useForm()

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)

        setShippingCountries(countries)
        // returns [al, fg, in]
        setShippingCountry(Object.keys(countries)[0])
    }

    const fetchSubDivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode)

        console.log("country subdivision detail", subdivisions)
        setShippingSubDivisions(subdivisions)
        setShippingSubDivision(Object.keys(subdivisions)[0])
    }

    const fetchShippingOption = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region })
        setShippingOptions(options)
        setShippingOption(options[0].id)
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken)
    }, [])

    useEffect(() => {
        if(shippingCountry) fetchSubDivisions(shippingCountry)
    }, [shippingCountry])

    useEffect(() => {
        if(shippingSubDivision) fetchShippingOption(checkoutToken.id, shippingCountry, shippingSubDivision )
    }, [shippingSubDivision])

  return (
    <>
        <Typography variant='h6' gutterBottom>Shipping Address</Typography>
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit((data) => next(...data, shippingCountry, shippingSubDivision, shippingOption ))}>
                <Grid container spacing={3}>
                    <CustomTextField name='firstName' label='First Name' />
                    <CustomTextField name='lastName' label='Last Name' />
                    <CustomTextField name='address' label='Address' />
                    <CustomTextField name='email' label='Email' />
                    <CustomTextField name='city' label='City' />
                    <CustomTextField name='zip' label='ZIP / Postal code' />
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Country</InputLabel>
                        <Select value={shippingCountry} fullWidth onChange={e => setShippingCountry(e.target.value)}>
                            { Object
                                .entries(shippingCountries)
                                .map(([code, countryName]) => ({
                                    id: code,
                                    label: countryName
                                }))
                                .map(item => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.label}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Subdivision</InputLabel>
                        <Select value={shippingSubDivision} fullWidth onChange={e => setShippingSubDivision(e.target.value)}>
                            { Object
                                .entries(shippingSubDivisions)
                                .map(([code, subDivCode]) => ({
                                    id: code,
                                    label: subDivCode
                                }))
                                .map((subDiv) => (
                                    <MenuItem key={subDiv.id} value={subDiv.id}>
                                        {subDiv.label}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Options</InputLabel>
                        <Select value={shippingOption} fullWidth onChange={e => shippingOption(e.target.value)}>
                            {shippingOptions
                                .map((sO) => ({
                                    id: sO.id,
                                    label: `${sO.description} - (${sO.price.formatted_with_symbol})`
                                }))
                                .map(item => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.label}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </Grid>
                </Grid>
                <br />
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <Button variant='outline' component={Link} to='/' >Back to cart</Button>
                    <Button type='submit' variant='contained' color="primary">Next</Button>
                </div>
            </form>
        </FormProvider>
    </>
  )
}

export default AddressForm
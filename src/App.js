import React, { useState, useEffect } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import './App.css' 

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [convertedAmount, setConvertedAmount] = useState(null)
  const [exchangeRate, setExchangeRate] = useState(null)

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          `https://open.er-api.com/v6/latest/${fromCurrency}`
        )
        const data = await response.json()
        const rate = data.rates[toCurrency]
        setExchangeRate(rate)
      } catch (error) {
        console.error('Error fetching exchange rates:', error)
      }
    }

    fetchExchangeRate()
  }, [fromCurrency, toCurrency])

  const handleAmountChange = e => {
    setAmount(e.target.value)
  }

  const handleFromCurrencyChange = e => {
    setFromCurrency(e.target.value)
  }

  const handleToCurrencyChange = e => {
    setToCurrency(e.target.value)
  }

  const convertCurrency = () => {
    if (exchangeRate) {
      const result = amount * exchangeRate
      setConvertedAmount(result.toFixed(2))
    }
  }

  return (
    <Container className='container'>
      <Row className='justify-content-center'>
        <Col xs={12} md={8} lg={6}>
          <h1>Currency Converter</h1>
          <Form>
            <Form.Group className='form-group'>
              <Form.Label>Amount:</Form.Label>
              <Form.Control
                type='number'
                value={amount}
                onChange={handleAmountChange}
                className='amount-input'
              />
            </Form.Group>

            <div className='manual-amounts-container'>
              <p>Or choose a predefined amount:</p>
              <div className='amount-buttons'>
                {[10, 20, 50, 100, 200, 500, 1000, 2000].map(presetAmount => (
                  <Button
                    key={presetAmount}
                    variant='outline-secondary'
                    onClick={() => setAmount(presetAmount)}
                  >
                    {presetAmount}
                  </Button>
                ))}
              </div>
            </div>

            <div className='select-container'>
              <Form.Group className='form-group'>
                <Form.Label>From Currency:</Form.Label>
                <Form.Control
                  as='select'
                  value={fromCurrency}
                  onChange={handleFromCurrencyChange}
                >
                  <option value='USD'>United States Dollar</option>
                  <option value='EUR'>Euro</option>
                  <option value='GBP'>Great Britain Pound</option>
                  <option value='JPY'>Japanese Yen</option>
                  <option value='AUD'>Australian Dollar</option>
                  <option value='CAD'>Canadian Dollar</option>
                  <option value='CHF'>Swiss Franc</option>
                  <option value='CNY'>Chinese Yuan</option>
                  <option value='PKR'>Pakistani Rupee</option>
                  <option value='BRL'>Brazilian Real</option>
                  <option value='RUB'>Russian Ruble</option>
                  <option value='TRY'>Turkish Lira</option>
                  <option value='ZAR'>South African Rand</option>
                  <option value='MXN'>Mexican Peso</option>
                  <option value='SGD'>Singapore Dollar</option>
                  <option value='NZD'>New Zealand Dollar</option>
                  <option value='SEK'>Swedish Krona</option>
                  <option value='NOK'>Norwegian Krone</option>
                  <option value='DKK'>Danish Krone</option>
                  <option value='HKD'>Hong Kong Dollar</option>
                </Form.Control>
              </Form.Group>

              <Form.Group className='form-group'>
                <Form.Label>To Currency:</Form.Label>
                <Form.Control
                  as='select'
                  value={toCurrency}
                  onChange={handleToCurrencyChange}
                >
                  <option value='EUR'>Euro</option>
                  <option value='USD'>United States Dollar</option>
                  <option value='GBP'>Great Britain Pound</option>
                  <option value='JPY'>Japanese Yen</option>
                  <option value='AUD'>Australian Dollar</option>
                  <option value='CAD'>Canadian Dollar</option>
                  <option value='CHF'>Swiss Franc</option>
                  <option value='CNY'>Chinese Yuan</option>
                  <option value='PKR'>Pakistani Rupee</option>
                  <option value='BRL'>Brazilian Real</option>
                  <option value='RUB'>Russian Ruble</option>
                  <option value='TRY'>Turkish Lira</option>
                  <option value='ZAR'>South African Rand</option>
                  <option value='MXN'>Mexican Peso</option>
                  <option value='SGD'>Singapore Dollar</option>
                  <option value='NZD'>New Zealand Dollar</option>
                  <option value='SEK'>Swedish Krona</option>
                  <option value='NOK'>Norwegian Krone</option>
                  <option value='DKK'>Danish Krone</option>
                  <option value='HKD'>Hong Kong Dollar</option>
                </Form.Control>
              </Form.Group>
            </div>
            <div className='button-container'>
              <Button variant='primary' onClick={convertCurrency}>
                Convert
              </Button>
            </div>
          </Form>

          {convertedAmount !== null && (
            <div className='result-container'>
              <p>
                Converted Amount: {convertedAmount} {toCurrency}
              </p>
            </div>
          )}
        </Col>
      </Row>
      <p>
        Exchange Rate may not be correct.
        <br />
        This is just a Practice Website.
      </p>
    </Container>
  )
}

export default CurrencyConverter

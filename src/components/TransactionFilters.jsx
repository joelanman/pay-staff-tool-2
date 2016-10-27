import React, { Component } from 'react'
import PropTypes from '../propTypes'
import InputText from './InputText'
import DatePicker from 'react-datepicker'
import moment from 'moment'
window.moment = moment
import 'react-datepicker/dist/react-datepicker.css'

export default class TransactionFilters extends Component {
  static propTypes = {
    applyFilter: PropTypes.bool.isRequired,
    handleFilterButtonClick: PropTypes.func.isRequired,
    handleEmailButtonClick: PropTypes.func.isRequired,
    handleCardTypeChange: PropTypes.func.isRequired,
    handlePaymentStatusChange: PropTypes.func.isRequired,
    handleReferenceNumberChange: PropTypes.func.isRequired,
    handleEmailChange: PropTypes.func.isRequired,
    cardType: PropTypes.oneOf([
      'All types',
      'Visa',
      'Mastercard',
      'American Express',
      'JCB',
      "Diner's Club",
      'Discover',
      'Union Pay'
    ]).isRequired,
    paymentStatus: PropTypes.oneOf([
      'All transactions',
      'In progress',
      'Successful',
      'Failed',
      'Refunds'
    ]).isRequired,
    minDate: PropTypes.instanceOf(moment).isRequired,
    maxDate: PropTypes.instanceOf(moment).isRequired,
    fromDate: PropTypes.instanceOf(moment).isRequired,
    fromTime: PropTypes.string.isRequired,
    toDate: PropTypes.instanceOf(moment).isRequired,
    toTime: PropTypes.string.isRequired,
    handleFromDateChange: PropTypes.func.isRequired,
    handleFromTimeChange: PropTypes.func.isRequired,
    handleToDateChange: PropTypes.func.isRequired,
    handleToTimeChange: PropTypes.func.isRequired,
    referenceNumber: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    handleResetFilters: PropTypes.func.isRequired
  }

  render () {
    const {
      referenceNumber, handleReferenceNumberChange, handleFilterButtonClick,
      email, handleEmailChange, handleEmailButtonClick,
      handleCardTypeChange, handlePaymentStatusChange, cardType, paymentStatus,
      fromDate, fromTime, toDate, toTime,
      handleFromDateChange, handleFromTimeChange, handleToDateChange, handleToTimeChange,
      applyFilter, handleResetFilters, minDate, maxDate
    } = this.props

    return <div>
      <div className='overview'>
        <h2 className='heading-medium staff-subheading'>Filter transactions list</h2>
      </div>
      <div className='filter-section'>
        <div className='column-quarter filter-fields'>
          <div className='form-group'>
            <label className='form-label-bold' htmlFor='ref'>
              Reference number
              <span className='form-hint'>Enter full or partial details</span>
            </label>
            <InputText
              id='ref-or-email'
              onChange={handleReferenceNumberChange}
              onSubmit={handleFilterButtonClick}
              value={referenceNumber}
            />
          </div>
        </div>
        <div className='column-quarter filter-fields'>
          <div className='form-group'>
            <label className='form-label-bold' htmlFor='email'>
              email
              <span className='form-hint'>Enter full or partial details</span>
            </label>
            <InputText
              id='ref-or-email'
              onChange={handleEmailChange}
              onSubmit={handleEmailButtonClick}
              value={email}
            />
          </div>
        </div>
        <div className='column-quarter filter-fields'>
          <div className='form-group'>
            <label className='form-label-bold' htmlFor='payment-status'>
              Payment status
              <span className='form-hint'>Select an option</span>
            </label>
            <div className='dropdown'>
              <select
                className='form-control dropdown-list'
                id='payment-status'
                onChange={handlePaymentStatusChange}
                value={paymentStatus}
              >
                <option value='All transactions'>All transactions</option>
                <option value='In progress'>In progress</option>
                <option value='Successful'>Successful</option>
                <option value='Failed'>Failed</option>
                <option value='Refunds'>Refunds</option>
              </select>
            </div>
          </div>
        </div>

        <div className='column-quarter filter-fields'>
          <div className='form-group'>
            <label className='form-label-bold' htmlFor='card-type'>
              Card type
              <span className='form-hint'>Select an option</span>
            </label>
            <div className='dropdown'>
              <select
                className='form-control dropdown-list'
                id='card-type'
                onChange={handleCardTypeChange}
                value={cardType}
              >
                <option value='All types'>All types</option>
                <option value='Visa'>Visa</option>
                <option value='Mastercard'>Mastercard</option>
                <option value='American Express'>American Express</option>
                <option value='JCB'>JCB</option>
                <option value="Diner's Club">Diners Club</option>
                <option value='Discover'>Discover</option>
                <option value='Union Pay'>Union Pay</option>
              </select>
            </div>
          </div>
        </div>
        <div className='column-three-quarters filter-fields'>
          <div className='form-group'>
            <legend className='form-label-bold date-label'>Date range</legend>
            <div className='form-date'>
              <div className='form-group'>
                <p className='form-hint'><label htmlFor='date-from-date'>Date</label></p>
                <DatePicker
                  className='form-control'
                  dateFormat='DD/MM/YYYY'
                  id='date-from-date'
                  minDate={minDate}
                  maxDate={toDate}
                  onChange={handleFromDateChange}
                  selected={fromDate}
                  todayButton={'Today'}
                />
                <p className='form-hint-small'>eg 25/11/2015</p>
              </div>
              <div className='form-group'>
                <p className='form-hint'><label htmlFor='date-from-time'>Time</label></p>
                <InputText
                  id='date-from-time'
                  onChange={handleFromTimeChange}
                  value={fromTime}
                  onSubmit={handleFilterButtonClick}
                />
                <p className='form-hint-small'>eg 9:30:00</p>
              </div>
              <div className='datetime-seperator'>
                <p>to</p>
              </div>
              <div className='form-group'>
                <p className='form-hint'><label htmlFor='date-to-date'>Date</label></p>
                <DatePicker
                  className='form-control'
                  dateFormat='DD/MM/YYYY'
                  id='date-to-date'
                  minDate={fromDate}
                  maxDate={maxDate}
                  onChange={handleToDateChange}
                  selected={toDate}
                  todayButton={'Today'}
                />
                <p className='form-hint-small'>eg 27/11/2015</p>
              </div>
              <div className='form-group'>
                <p className='form-hint'><label htmlFor='date-to-time'>Time</label></p>
                <InputText
                  id='date-to-time'
                  onChange={handleToTimeChange}
                  value={toTime}
                  onSubmit={handleFilterButtonClick}
                />
                <p className='form-hint-small'>eg 15:00:00</p>
              </div>
            </div>
          </div>
        </div>
        <div className='column-quarter filter-fields'>
          <div className='form-group filter-button'>
            <button
              className='button filter-button'
              onClick={handleFilterButtonClick}
            >
              Filter
            </button>
            {(applyFilter)
              ? <a href='#' onClick={handleResetFilters}>Reset all filters</a>
              : null
            }
          </div>
        </div>
      </div>
    </div>
  }
}

import React, { Component } from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import PropTypes from '../propTypes'
import FormattedTime from './FormattedTime'

export default class TransactionRow extends Component {
  static propTypes = {
    handleClick: PropTypes.func.isRequired,
    transaction: PropTypes.transaction.isRequired
  }

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  render () {
    const {reference, email, amount, card, status, subStatus, startDate, refundSucceed, refundMessage} = this.props.transaction

    let date = startDate
    if (status === 'Refunded') {
      date = refundSucceed
    }

    return <tr
      onClick={this.props.handleClick}
      className='clickable-row'
    >
      <td>{ reference }</td>
      <td className='overflow-ellipsis'>{ email }</td>
      <td>£{ amount }.00</td>
      <td>{ card }</td>
      <td>
        { status }
        {(status === 'Failed')
          ? <span className='error-code'>{ subStatus }</span>
          : null
        }
        {(status === 'Refunded')
          ? <span className='refund-label'>{ refundMessage }</span>
          : null
        }
      </td>
      <td><FormattedTime time={date} /></td>
    </tr>
  }
}

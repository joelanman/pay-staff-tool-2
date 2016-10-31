import React, { Component } from 'react'
import PropTypes from '../propTypes'
import FormattedTime from './FormattedTime'

export default class TransactionDetail extends Component {
  static propTypes = {
    handleBackClick: PropTypes.func.isRequired,
    transaction: PropTypes.transaction.isRequired
  }

  render () {
    const {handleBackClick, transaction} = this.props
    const {reference, email, amount, status, card, startDate, payId,
      authSucceed, authSubmit, startEnter, paySubmit, paySucceed,
      failed, failReason, provider, gatewayId, subStatus} = transaction

    return <div>
      <div className='overview'>
        <div className='back'>
          <a href='#' onClick={handleBackClick}>◀ Back</a>
        </div>
        <h2 className='heading-medium staff-subheading'>
          Transaction detail
        </h2>
      </div>
      <div className='column-three-quarters filter-fields'>
        <div id='detail-item'>
          <table>
            <tbody>
              <tr>
                <td>Reference number:</td>
                <td>{reference}</td>
              </tr>
              <tr>
                <td>Email address:</td>
                <td>{email}</td>
              </tr>
              <tr>
                <td>Amount:</td>
                <td>£{amount}.00</td>
              </tr>
              <tr>
                <td>Status:</td>
                <td>{status} {(subStatus) ? `(${subStatus})` : ''}</td>
              </tr>
              <tr>
                <td>Type:</td>
                <td>{card}</td>
              </tr>
              <tr>
                <td>Time:</td>
                <td><FormattedTime time={startDate} /></td>
              </tr>
              <tr>
                <td>Provider:</td>
                <td>{provider}</td>
              </tr>
              <tr>
                <td>Provider ID:</td>
                <td>{gatewayId}</td>
              </tr>
              <tr>
                <td>GOV.UK payment ID:</td>
                <td>{payId}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className='trans-evs-heading heading-medium'>Transaction events</h2>
        <table>
          <tbody>
            {(!isNaN(refundSucceed)
              ? <tr>
                <td>Full refund successful</td>
                <td>–£{amount}.00</td>
                <td><FormattedTime time={refundSuccess} /></td>
              </tr>
              : null
            }
            {(!isNaN(refundSubmit))
              ? <tr>
                <td>Full refund initiated</td>
                <td>–£{amount}.00</td>
                <td><FormattedTime time={refundSubmit} /></td>
              </tr>
              : null
            }
            {(!isNaN(failed))
              ? <tr>
                <td>{failReason}</td>
                <td>£{amount}.00</td>
                <td><FormattedTime time={failed} /></td>
              </tr>
              : null
            }
            {(!isNaN(paySucceed))
              ? <tr>
                <td>Payment successful</td>
                <td>£{amount}.00</td>
                <td><FormattedTime time={paySucceed} /></td>
              </tr>
              : null
            }
            {(!isNaN(paySubmit))
              ? <tr>
                <td>Payment submitted</td>
                <td>£{amount}.00</td>
                <td><FormattedTime time={paySubmit} /></td>
              </tr>
              : null
            }
            {(!isNaN(authSucceed))
              ? <tr>
                <td>Authorisation succeeded</td>
                <td>£{amount}.00</td>
                <td><FormattedTime time={authSucceed} /></td>
              </tr>
              : null
            }
            {(!isNaN(authSubmit))
              ? <tr>
                <td>Card details submitted for authorisation</td>
                <td>£{amount}.00</td>
                <td><FormattedTime time={authSubmit} /></td>
              </tr>
              : null
            }
            {(!isNaN(startEnter))
              ? <tr>
                <td>User entering card details</td>
                <td>£{amount}.00</td>
                <td><FormattedTime time={startEnter} /></td>
              </tr>
              : null
            }
            {(!isNaN(startDate))
              ? <tr>
                <td>Payment created</td>
                <td>£{amount}.00</td>
                <td><FormattedTime time={startDate} /></td>
              </tr>
              : null
            }
          </tbody>
        </table>
      </div>
    </div>
  }
}

import React, { Component } from 'react'
import PropTypes from '../propTypes'
import TransactionRow from './TransactionRow'

export default class TransactionList extends Component {
  static propTypes = {
    handleTransactionClick: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    transactions: PropTypes.arrayOf(PropTypes.transaction).isRequired
  }

  render () {
    const {transactions, loading} = this.props

    return <div>
      <div className='column-three-quarters filter-fields'>
        <h2 className='heading-small'>
          {transactions.length} {(transactions.length === 1) ? 'transaction' : 'transactions'}
        </h2>
      </div>
      <div className='table-list'>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Reference number</th>
              <th scope='col'>Email address</th>
              <th scope='col'>Amount</th>
              <th scope='col'>Card type</th>
              <th scope='col' className='status-column'>Payment status</th>
              <th scope='col'>Date created</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tr, idx) => {
              const handleClick = () => this.props.handleTransactionClick(idx)
              return <TransactionRow
                handleClick={handleClick}
                key={idx}
                transaction={tr}
              />
            })}
          </tbody>
        </table>
        {(loading)
          ? <div className='pre-load-marker'>
            <img src='/public/images/ring.gif' alt='Loading spinner' />
            <p>Fetching data from Google Sheets</p>
          </div>
          : null
        }
      </div>
    </div>
  }
}

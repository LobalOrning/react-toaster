import React, { Component } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import * as _ from 'lodash'
import styled from 'styled-components'
import ToasterTile from './ToasterTile'

class Toaster extends Component {
  render () {
    const sorted = _.sortBy(this.props.toasts, ['duration'])
    const toasts = sorted.map(toast => (
      <ToasterTile key={toast.id} toast={toast} handleRemoveOnClick={this.props.handleRemoveOnClick} />
    ))
    return (
      <ul className={this.props.className}>
        <CSSTransitionGroup
          transitionName="toaster"
          transitionAppear={true}
          transitionAppearTimeout={750}
          transitionEnter={true}
          transitionEnterTimeout={750}
          transitionLeave={true}
          transitionLeaveTimeout={200}>
            {toasts}
        </CSSTransitionGroup>
      </ul>
    )
  }
}

const StyledToaster = styled(Toaster)`
  list-style: none;
  float: right;
`

export default StyledToaster

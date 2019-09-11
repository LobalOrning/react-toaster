import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'

const handleColorType = type => {
    switch (type) {
        case 'success':
            return 'color: #3c763d; background-color: #dff0d8; border-color: #d6e9c6;'
        case 'info':
            return 'color: #31708f; background-color: #d9edf7; border-color: #bce8f1;'
        case 'error':
            return 'color: #a94442; background-color: #f2dede; border-color: #ebccd1;'
        default:
            return 'color: #000; background: #fff; border-color: #e3e3e3;'
    }
}

class ToasterTile extends Component {
  DEFAULT_DURATION = 10000

  state = {
    secondsLeft: this.props.toast.duration ? this.props.toast.duration : this.DEFAULT_DURATION / 1000
  }

  componentDidMount() {
    const duration = this.props.toast.duration ? this.props.toast.duration * 1000 : this.DEFAULT_DURATION

    // start remove timer
    this.timer = setTimeout(() => {
      this.props.handleRemoveOnClick(this.props.toast.id)
    }, duration)

    // start counter
    this.interval = setInterval(() => {
      if (this.state.secondsLeft >= 1) {
        this.setState({ secondsLeft: this.state.secondsLeft - 1 })
      }
    }, 1000)
  }
  componentWillUnmount() {
    clearTimeout(this.timer)
    clearInterval(this.interval)
  }
  onMouseEnter() {
    clearTimeout(this.timer)
    clearInterval(this.interval)
  }
  onMouseLeave() {
    const duration = this.state.secondsLeft

    // start timer again
    this.timer = setTimeout(() => {
      this.props.handleRemoveOnClick(this.props.toast.id)
    }, duration * 1000)

    // start interval again
    this.setState({ secondsLeft: duration })
    this.interval = setInterval(() => {
      if (this.state.secondsLeft >= 1) {
        this.setState({ secondsLeft: this.state.secondsLeft - 1 })
      }
    }, 1000)
  }
  render() {
    const { toast, className, handleRemoveOnClick } = this.props
    return (
      <li
        className={className}
        onMouseEnter={() => this.onMouseEnter()}
        onMouseLeave={() => this.onMouseLeave()}
      >
        { toast.text} {this.state.secondsLeft}
        <span onClick={() => handleRemoveOnClick(toast.id)}>&times;</span>
      </li>
    )
  }
}

const bounceIn = keyframes`
  0% {
    transform: translateX(200px);
  }
  50% {
    transform: translateX(-10px);
  }
  80% {
    transform: translateX(0px);
  }
  90%{
    transform: translateX(5px);
  }
  100% {
    transform: translateX(0px);
  }
`
const shake = keyframes`
  0% {
    opacity: 1;
    transform: translateX(20px);
  }
  25% {
    opacity: .75;
    transform: translateX(0px);
  }
  50%{
    opacity: .5;
    transform: translateX(-20px);
  }
  100% {
    opacity: .5;
    transform: translateX(0px);
  }
`
const StyledToasterTile = styled(ToasterTile)`
  ${props => handleColorType(props.toast.type)};
  position: relative;
  height: 50px;
  width:  250px;
  border: 1px solid;
  border-radius: 4px;
  padding: 5px;
  margin: 20px;
  font-family: arial, 'sans-serif';
  font-size: 14px;
  box-shadow: 5px 4px 5px 0px #ccc;
  opacity: 1;

  &.toaster-appear: {
    opacity: 0.01;
  }

  &.toaster-appear.toaster-appear-active {
    opacity: 1;
    animation: ${bounceIn} 750ms ease-in;
  }

  &.toaster-enter: {
    opacity: 0.01;
  }

  &.toaster-enter.toaster-enter-active {
    opacity: 1;
    animation: ${bounceIn} 750ms ease-in;
  }

  &.toaster-leave: {
  }

  &.toaster-leave.toaster-leave-active {
    animation: ${shake} 200ms linear;
  }
`
export default StyledToasterTile

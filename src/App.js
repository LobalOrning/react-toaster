import React, { Component } from 'react'
import Toaster from './component/Toaster'

const toasts = [
  { id: 0, text: 'Hi' },
  { id: 1, text: 'Info 👻', type: 'info', duration: 6 },
  { id: 2, text: 'Success', type: 'success', duration: 8 },
  { id: 3, text: 'Failure', type: 'error', duration: 10 }
]

class App extends Component {
  state = {
    toasts: toasts
  }
  handleRemove= id => {
    const index = this.state.toasts.findIndex(t => { return t.id === id })
    const newToasts = [
      ...this.state.toasts.slice(0, index),
      ...this.state.toasts.slice(index + 1)
    ]
    this.setState({ toasts: newToasts })
  }
  render() {
    return (
      <Toaster toasts={this.state.toasts} handleRemoveOnClick={this.handleRemove} handleTileTimeout={this.handleRemove} />
    )
  }
}

export default App

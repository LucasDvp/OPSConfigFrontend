import React, { Component } from 'react'
import './App.css'
import SettingMenu from './components/SettingMenu'

class App extends Component {
  state = {
    isOpen: false
  }
  openMenu = () => {
    const tmp = this.state.isOpen
    this.setState({
      isOpen : !tmp
    })
  }
  render() {
    return (
      <div className="App">
        <SettingMenu />
      </div>
    )
  }
}

export default App

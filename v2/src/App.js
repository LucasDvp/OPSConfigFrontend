import React from 'react'
import './App.css'
import NewMetadata from './components/NewMetadata'
import OldMetadata from './components/OldMetadata'
import { BrowserRouter as Router, Route } from 'react-router-dom'


const OldConfig = () => <h2>hehe</h2>
export default function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path='/' component={NewMetadata}/>
        <Route path='/old' component={OldMetadata}/>
      </div>
    </Router>
  )
}
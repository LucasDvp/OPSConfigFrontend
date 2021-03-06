import React from 'react'
import './App.css'
import NewMetadata from './components/NewMetadata'
import Metadata from './components/Metadata'
import Functional from './components/Functional';
import { BrowserRouter as Router, Route } from 'react-router-dom'

export default function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path='/' component={NewMetadata}/>
        <Route path='/metadata' component={Metadata}/>
        <Route path='/manage' component={Functional}/>
      </div>
    </Router>
  )
}
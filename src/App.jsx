import Footer from './components/Footer'
import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Settings from './pages/Settings'
import './App.css'

const App = () => {
  return (
    <HashRouter basename='/'>
      <div className='flex flex-col justify-between min-h-screen'>
        <main>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/settings' component={Settings} />
          </Switch>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}

export default App

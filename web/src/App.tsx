import React from 'react'
import Rotate from './Rotate'
import AppleImages from '../../web/src/assets/apples'

import './App.scss'

const App = () => (
  <div className="app">
    <header>
      <Rotate className="app__image" images={AppleImages} />
    </header>
  </div>
)

export default App;

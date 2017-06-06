import 'es6-shim';
import React from 'react'
import {render} from 'react-dom'
import './style/index.css';
import './style/grid.css';
import './style/iconfont/iconfont.css'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import reducer from './reducers'
import Root from './Root'

const middleware = [thunk]
middleware.push(createLogger())

const store = createStore(reducer, applyMiddleware(...middleware))

render(
  <Provider store={store}>
      <Root/>
  </Provider>,
document.getElementById('root'))

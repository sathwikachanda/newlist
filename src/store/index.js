import { createStore, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { listReducer } from './reducer'

export const store = createStore(listReducer, applyMiddleware(thunk)) 
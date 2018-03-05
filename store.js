import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
/*
Get teh store ready.
The root component creates the store, telling it what root reducer to use, using createStore.
This root reducer already has a team of reducers which report to it.
It assembled that team of reducers using combineReaders*/
export default createStore(reducers, applyMiddleware(thunk))
/* USING THUNK TO HANLE THE ASYNCHRONOUS STUFF WHEN TALKING TO THE BROWSER*/

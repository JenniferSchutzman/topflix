import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux' /* PART OF THE BINDER */
import store from './store'
import { BrowserRouter, Route } from 'react-router-dom'
import Index from './pages/index'
import Search from './pages/search'
/* THIS IS WHERE THE APPLICATION BEGINS!!!
THe provider creates what's basically a newtork to update the components.
Smart components connect to newtork using connect(), which ensures they'll get status updates
*/
const App = () => {
  return (
    <Provider store={store}>
      {' '}
      /*HERE WE WRAP THE WHOLE APP AROUND THE STORE; which is the
      BrowswerRouter. The Broswer Router expects a div with route paths. This is
      simliar to when we set up endpoints in the API */
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Index} />
          <Route path="/search" component={Search} />
        </div>
      </BrowserRouter>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))

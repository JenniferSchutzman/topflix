import React from 'react'
import { connect } from 'react-redux'

import HeaderBar from '../../components/header-bar'
import Card from '../../components/card'
import { TextField, Button, List, ListItem } from 't63'
import { search } from '../db'
import R from 'ramda'
const { map } = R
/*
The search function takes in a prop.query
There is a text bod and a button that says Search on it.
When text field changes, (everytime a letter or space is changed!),
then we are activating "handleChange".
handleChange function is defined below taking in e, and dispatching
an action request
with a type and a payload, sending it off to the store.

In the TextField the value is coming in off of props.query (not necessarily just what's being typed in).
This is then used to display to the value text.
This <TextField/> is a controlled input, telling it waht to what for and what to display.

Further down, you will see the function mapStateToProps which maps the state, turning it
into a prop called query and a prop called searchResults.  For these 2 props, look at below function.

WHEN THE SEARCH BUTTON IS HIT, YOU ACTIVATE 'ONSUBMIT' YOU ARE TAKING IN THE SEARCH PROP
*/
const Search = props => {
  return (
    <section>
      <HeaderBar navLeft="/" iconLeft="chevron-left" title="Search" />
      <form className="pa4" onSubmit={props.search}>
        <TextField
          value={props.query}
          onChange={props.handleChange}
          name="Search"
          helpTxt="Enter a name of a movie and press ENTER"
        />
        <Button>Search</Button>
      </form>
      {map(
        m => <Card onClick={props.add(m, props.history)} key={m.id} {...m} />,
        props.results
      )}
    </section>
  )
}
/*  This connector is what helps you connect react to your redux state store */
const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(Search)

/*  HERE WE TAKE IN THE SEARCH RESULT STATE, TURN IT INTO A QUERY PROP,
AND A QUERY CALLED SEARCHRESULTS */
function mapStateToProps(state) {
  return {
    query: state.search,
    results: state.searchResults
  }
}
/*   ADDING A MOVIE   */
function mapActionsToProps(dispatch) {
  return {
    handleChange: e => {
      dispatch({ type: 'SET_SEARCH', payload: e.target.value })
    },
    search: e => {
      e.preventDefault()
      dispatch(search)
    },
    add: (movie, history) => e => {
      dispatch({ type: 'ADD_MOVIE', payload: movie })
      dispatch({ type: 'SET_SEARCH', payload: '' })
      history.push('/')
    }
  }
}

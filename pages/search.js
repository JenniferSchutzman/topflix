import React from 'react'
import { connect } from 'react-redux'
import HeaderBar from '../../components/header-bar'
import Card from '../../components/card'
import { TextField, Button, List, ListItem } from 't63'
import { search } from '../db'
import R from 'ramda'
const { map } = R
/*
-   The search function takes in a prop.query
-   There is a text body and a button that says Search on it.
-   When text field changes, (everytime a letter or space is changed!),
        then we are activating "handleChange".
        handleChange function is defined below taking in e, and dispatching
        an action request
        with a type and a payload, sending it off to the store.

-   In the TextField the value is coming in off of props.query (not necessarily just what's being typed in).
-   This is then used to display to the value text.
-   This <TextField/> is a controlled input, telling it waht to what for and what to display.

Further down, you will see the function mapStateToProps which maps the state, turning it
into a prop called query and a prop called searchResults.  For these 2 props, look at below function.

WHEN THE SEARCH BUTTON IS HIT, YOU ACTIVATE 'ONSUBMIT' YOU ARE TAKING IN THE SEARCH PROP
*/
const Search = props => {
  return (
    <section>
      /* CREATING A HEADER BAR WITH THE NAME SEARCH NAVGITATING FROM THE LEFT
      WITH /' */
      <HeaderBar navLeft="/" iconLeft="chevron-left" title="Search" />
      /* HERE WE CREATE A FORM WITH A T63 TEXT FIELD NAMED SEARCH WHERE THE
      SEARCH TEXT WILL NOW BE CALLED "ONSUBMIT" - ONSUBMIT */
      <form className="pa4" onSubmit={props.search}>
        <TextField
          value={props.query}
          onChange={props.handleChange}
          name="Search"
          helpTxt="Enter a name of a movie and press ENTER"
        />
        /* NOW IN THE FORM, WE ARE CREATING A BUTTON NAMED SEARCH*/
        <Button>Search</Button>
      </form>
      /* NOW WE ARE MAPPING THE PROPS.RESULTS FROM THE MAPTACTIONSTOPROPS
      FUNCTION*/
      {map(
        /*
        - NOW WE ARE CREATING ONCLICK, BY TAKING ALL THE PROPS FROM MOVIE ID SELECTED AND ADDING IT TO THE HISTORY
        - THE RESULT WILL THEN BE A CARD */
        movie => (
          <Card onClick={props.add(m, props.history)} key={m.id} {...m} />
        ),
        props.results
      )}
    </section>
  )
}
/*  THIS CONNECTER IS EXACTLY WHERE YOU CONNECT REACT TO YOUR REDUX STATE STORE */
const connector = connect(mapStateToProps, mapActionsToProps)

/*
- WE ARE ACTUALLY PICKING WHAT WE ARE CALLING THE PROPS THAT WE ARE GOING TO THEN PUT ON A QUERY
- THIS "QUERY" AND "RESULTS" WILL THEN LATER BE ATTACHED TO THE PROP PARAMETER ABOVE IN THE SEARCH FUNCTION
- HERE WE TAKE IN THE SEARCH RESULT STATE, TURN IT INTO A QUERY PROP, AND A QUERY CALLED "SEARCHRESULTS" */
function mapStateToProps(state) {
  return {
    /* THIS STATE.SEARCH IS THE FIRST POINT OF ENTRY WHEN TYPED, THEN THE QUERY LATER REPRESENTS IT AS "VALUE"*/
    query: state.search,
    results: state.searchResults
  }
}
/*   ADDING A MOVIE
- ACCEPTING A DISTPATCH ARGUEMENT FROM ..... WHICH IS AN OBJECT AND RETURNING AN OBJECT WITH THE NEW MERGED PROPS
-
-  */
function mapActionsToProps(dispatch) {
  return {
    /*HANDLECHANGE IS NOW A PROP WE'VE ADDED TO THE EVENT OBJECT
    THIS HANDLES THE CHANGE OF THE TEXT BOX BEING TYPED IN (IN THE ABOVE TEXT FIELD'S ONCHANGE) */
    handleChange: e => {
      /*  DISPATCH HAS TO SEND AN OBJECT ACTION WITH TYPE AND PAYLOAD
      -  THE SET_SEARCH TYPE WAS CREATED IN THE CONSTANTS FILE
      - THE TARGET IS THE DOM ELEMENT SO THE PAYLOAD TAKES THE E WITH DOM OBEJCT VALUE  */
      dispatch({ type: 'SET_SEARCH', payload: e.target.value })
    },
    search: e => {
      /*  THIS IS HANDLING A FORM SUBMIT, WHICH PREVENTS THE DEFAULT FORM SUBMIT BEHAVIOR
      IT PERFORMS A SERACH OF THE MOVIES BY MAKING A CALL TO THE API
      ASYNCHRONOUS CALL, IF SUCCESSFUL...DISPATCH AN ACTION  */
      e.preventDefault()
      dispatch(search)
    },
    /*THIS IS WHERE REDUX IS ADDING THE MOVIE FROM THE SEARCH RESULT*/
    add: (movie, history) => e => {
      /*  */
      dispatch({ type: 'ADD_MOVIE', payload: movie })
      /* IN THE SET_SEARCH DISPATCH WE ARE DELETEING THE TEXT BOX BY TURNING IT INTO AN EMTPY STRING */
      dispatch({ type: 'SET_SEARCH', payload: '' })
      /*  TELLING HISTORY TO PUSH AND GO BACK TO HOME '/' WHERE THERE IS A LIST OF FAVORITE MOVIES ALREADY */
      history.push('/')
    }

    }
  }
}

export default connector(Search)

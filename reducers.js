import { combineReducers } from 'redux'
import R from 'ramda'
const { append, assoc, compose } = R
import cuid from 'cuid'
import { ADD_MOVIE } from './constants'
/*1.) THE SETUP
Get the store ready.
The root component creates the store, telling it what root reducer to use, using createSTore()
*/
const app = (state = { title: 'Favorite Movies' }, action) => state
/*THESE REDUCERS BELOW ARE ALL JAVASCRIPT FUNCTIONS */

/*
- First reducer here is called movies, handling an array.
- See the 2 parameters: state obejct  & an action object
- An action has 2 properties on it: a type and a payload
Payload (optional) is
Returns new state
Switch is like a big else if statement.  Here it is testing
Going to take each of the props in the assoc section, and add the new prop for that movie object
Appending it to teh state (the array of movies), returning a new array with teh added movies
(append is adding to copy of the array)
The data coming into the movie function is the action.payload
It will look like this coming in:
{type: ADD_MOVIE, payload: {Title: "The creature..", Year: "1952", Poster: "some url"}}
*/
const movies = (state = defaultMovies(), action) => {
  switch (action.type) {
    case 'ADD_MOVIE':
      return append(
        /*  BEFORE EACH PROP IS APPENDED FROM STATE, WE NEED TO FIRST FIX THE PROPS FORMATTING  TO BE CONSISTANT; I.E. 'Title', not 'title' and 'id' not 'imDB'*/
        compose(
          assoc('title', action.payload.Title),
          assoc('year', action.payload.Year),
          assoc('poster', action.payload.Poster),
          assoc('id', cuid())
        )({}),
        state
      )
    default:
      return state
  }
}
/*   This reducer handles a single movie
ONly returns the movie
*/
const movie = (state = defaultMovies()[0], action) => {
  switch (action.type) {
    case 'SET_MOVIE':
      return action.payload
    default:
      return state
  }
}
/*
- '' in the param means that if no one passes a value for state (i.e. there is no search term entered), then it defaults to an empty string
- Think of 'switch' as 'if'.  So IF (action.type) is case 'SET_SEARCH', return that action object's payload
- THE ACTION.PAYLOAD IS THE NEW DATA COMING IN
*/
const search = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEARCH':
      return action.payload
    default:
      return state
  }
}
/* SEARCHRESULTS FUNCTION IS AN EMPTY ARRAY UNTIL GIVEN AN ACTION AND THE STATE CHANGES
-   */
const searchResults = (state = [], action) => {
  switch (action.type) {
    case 'SET_RESULTS':
      return action.payload
    default:
      return state
  }
}
/*  AT THE END OF THE REDUCER PAGE, YOU ALWAYS HAVE TO COMBINE THEM FOR THE ROOT REDUCER    */
export default combineReducers({ app, movies, movie, search, searchResults })

function defaultMovies() {
  return [
    {
      id: 1,
      title: 'What about Bob?',
      year: '1991',
      poster:
        'https://images-na.ssl-images-amazon.com/images/M/MV5BMTQxMjU2ODk4N15BMl5BanBnXkFtZTgwODQzNTcxMTE@._V1_SX300.jpg'
    },
    {
      id: 2,
      title: 'Groundhog Day',
      year: '1993',
      poster:
        'https://images-na.ssl-images-amazon.com/images/M/MV5BZWIxNzM5YzQtY2FmMS00Yjc3LWI1ZjUtNGVjMjMzZTIxZTIxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'
    },
    {
      id: 3,
      title: 'Ghostbusters',
      year: '1984',
      poster:
        'https://images-na.ssl-images-amazon.com/images/M/MV5BMTkxMjYyNzgwMl5BMl5BanBnXkFtZTgwMTE3MjYyMTE@._V1_SX300.jpg'
    }
  ]
}

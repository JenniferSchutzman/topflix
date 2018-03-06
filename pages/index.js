import React from 'react'
import { connect } from 'react-redux'
import R from 'ramda'
import HeaderBar from '../../components/header-bar'
import { List, ListItem } from 't63'
const { map } = R
/*
this Page function will return a JSX element in <section>

In the list we are looking at the movie id & title proprs as the key

When this HeaderBar 4 lines down is clicked, it is navigated to search and open the search page
*/
const Page = props => {
  return (
    <section>
      <HeaderBar title={props.title} navRight="/search" iconRight="search" />
      {
        <List className="avenir">
          {map(m => <ListItem key={m.id}>{m.title}</ListItem>, props.movies)}
        </List>
      }
    </section>
  )
}

const connector = connect(mapStateToProps)
export default connector(Page)
/*  conncertor is a higher order component bc it accepts a component and emits a component */
/*  There is a piece of state called movies coming in as an array of movies,
but then we named it mvoies in this return.  Then it will be available on
the component as a prop becuase it will now be merged.   */
function mapStateToProps(state) {
  return {
    title: state.app.title,
    movies: state.movies
  }
}

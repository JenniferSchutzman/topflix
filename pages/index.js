import React from 'react'
import { connect } from 'react-redux'
import R from 'ramda'
import HeaderBar from '../../components/header-bar'
import { List, ListItem } from 't63'
const { map } = R
/*
this Page function will return a JSX element in <section>


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

function mapStateToProps(state) {
  return {
    title: state.app.title,
    movies: state.movies
  }
}

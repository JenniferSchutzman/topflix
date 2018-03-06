import React from 'react'

import { Link } from 'react-router-dom'
import Header from './header'
import Title from './title'
import Icon from './icon'

/*
- In JSX it will look like this:
      <headerBar navLeft="" navRight=""  iconLeft="" inconRight="" title="Top Flix" />

- pr and pl is just the padding

*/
export default props => {
  return (
    <Header>
      /* THIS P12 IS JUST A PADDING SETTING FRMO TACHYONS, SAYING PAD IT ALL AT
      THAT LEVEL */
      <div className="pl2">
        {props.navLeft && (
          <Link to={props.navLeft}>
            <Icon value={props.iconLeft} />
          </Link>
        )}
      </div>
      <Title>{props.title}</Title>
      <div className="pr2">
        {props.navRight && (
          <Link to={props.navRight}>
            <Icon value={props.iconRight} />
          </Link>
        )}
      </div>
    </Header>
  )
}

import React from 'react'
/* this Icon function is taking in the props and returning a white icon
in the string template, we are expecting to type out whatever the value is of the icon prop*/
export default props => {
  return <i className={`white ion-${props.value} f3b . v-ns f4 lh-title mr2`} />
}

import React from 'react'

/* whenever this component is called upon, it will now show all of the children too 
because of the inserted {props.children} */
export default props => {
  return <h1 className="tracked ttu tc f3-ns f4 lh-title">{props.children}</h1>
}

/*    HERE WE ARE WANTING TO MAKE AN API CALL */
const url = 'https://movie-search.jrs.camp/'
/*  THIS IS THE ACCESS CARD TO PROIVE PERMISSION TO ENTER THE API EDITING - WE WILL PASS IT AS A Bearer TOKEN AUTHORIZATION HEADER  */
const JWT =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqcnMuY2FtcCIsImlhdCI6MTQ5ODg2OTM0MiwiZXhwIjoxNTkzNTYzNzQyLCJhdWQiOiJtdXNpYy1zZWFyY2guanJzLmNhbXAiLCJzdWIiOiIxMjM0In0.XtmiG7OD3pGdS748IC4CRJp_qUa7A_JvtNu2G_GcIP8'
import fetch from 'isomorphic-fetch'

/*
- A THUNK FUNCTION ALWAYS TAKES IN 2 PARAMENTS ( DISPATCH , GETSTATE )
- DISPATCH LETS YOU DISPATH THINGS
- GETSTATE RETURNS THE OBJECT THAT IS STATE
*/

export const search = (dispatch, getState) => {
  /*  FIRST WE GET HTE SEARCH VALUE FROM STATE */
  const query = getState().search
  /*  THEN WE ARE SETTING OF THE FORMAT OF THE SEARCH QUERY IN THE BROWSER AS THE PARAMENTER FOR FETCH -- HTTPS:MOVIE-SEARCH.JRS.CAMP/Q=GHOSTBUSTERS  */
  return (
    fetch(`${url}/?q=${query}`, {
      /* FETCH WILL MAKE AN ASYNCHRONOUS CALL, RETURNING A PROMISE */
      headers: {
        /* THROUGH THIS OBJECT WE CAN DEFINE OUR HEADERS OF CONTENT-TYPE AND AUTHORIZATION*/
        'content-type': 'application/json',
        authorization: 'Bearer ' + JWT
      }
    })
      /* IMMEDIAETLY TAKE THE RESULT IN TEXT AND CONVERT IT TO A JSON OBJECT */
      .then(res => res.json())
      .then(
        results =>
          /* ALWAYS DISPATCH AM ACTION, WHICH TAKES IN A TYPE AND PAYLOAD */
          dispatch({ type: 'SET_RESULTS', payload: results.Search })
        /* THE PAYLOAD TAKES IN THE RESULT OBJECT, TO THE SEARCH PROP, WHICH THEN GIVES YOU AN ARRAY OF MOVIES!!!*/
      )
  )
}

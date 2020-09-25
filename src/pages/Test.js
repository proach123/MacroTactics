import React from 'react'
import {useParams} from 'react-router-dom'

const Test = () => {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { id } = useParams();

    console.log(id)
  
    return (
      <div>
        <h3>Name: {id}</h3>
      </div>
    );
  }

  export default Test
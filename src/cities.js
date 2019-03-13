import React from 'react'
import { PropTypes } from 'prop-types'

const Cities = ({ cities, cityClicked }) => {
  return <ul>
    {
      cities.map(city => <li key={`${city.name}`} onClick={() => cityClicked(city.zip)}>
        {`${city.name}, ${city.state}`}
        </li>
      )
    }
  </ul>
}

Cities.propTypes = {
  cities: PropTypes.array.isRequired,
}

export default Cities

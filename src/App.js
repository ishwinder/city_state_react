import React, { Component } from 'react'

import Cities from './cities'

import './App.css'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = { cities: [], zip: '', error: false }
    this.locateZip = this.locateZip.bind(this)
  }

  addToList = (place, zip) => {
    const { cities } = this.state

    cities.push({
      name: place['place name'],
      state: place['state abbreviation'],
      zip,
    })

    this.setState({ cities })
  }

  locateZip() {
    const { zip, cities } = this.state

    // Cons of not using dispatch. Coding getting complex quickly with all the validations in place.
    // Have to check zip here as well or call saveZip at submit as well
    if (zip.trim() !== '') {
      const zip_exists = cities.findIndex((c) => c.zip === zip)

      if(zip_exists === -1) {
        fetch(`https://api.zippopotam.us/us/${zip}`)
          .then(res => res.json())
          .then(res => {
            this.addToList(res.places[0], zip)
            this.setState({ zip: '' })
          })
          .catch(error =>  {
            console.log(`Got Error executing the query: ${error}`)
            this.setState({ error })
          })
      }
      else {
        this.setState({ error: 'Number is already in the list'})
      }
    }
    else {
      this.setState({ error: 'Please input the zip code'})
    }
  }

  saveZip = (ev) => {
    if (ev.target.value.trim() === '') {
      this.setState({ error: 'Please input the zip code'})
      return
    }
    this.setState({ zip: ev.target.value, error: false })
  }

  // Handler function for child to call when the city is clicked
  cityClicked = (zip) => {
    this.setState({ zip })
  }

  render() {
    const { cities, error, zip } = this.state

    return (
      <div className="App">
        <input type="number" onChange={this.saveZip} value={zip} />
        <button onClick={this.locateZip} > Go </button>
        {error && <Error error = {error} /> }
        <Cities cities={cities} cityClicked={this.cityClicked} />
      </div>
    );
  }
}

const Error = ({ error }) => <div style={{color: 'red'}}>{error}</div>

export default App;

import React from 'react';
import { Grid } from 'semantic-ui-react';
import '../styles/App.css';
import Header from './Header.js';
import Search from './Search.js';
import LowInventory from './LowInventory';
import InventoryOnOrder from './OnOrderInventory';


class App extends React.Component {
  constructor() {
    super();
    
    this.addToOnOrder = this.addToOnOrder.bind(this);
    this.state = {
      allProducts: {},
      lowInventory: {},
      onOrderInventory: {}
    }
  }

  componentWillMount() {
    fetch(`https://649c403b.ngrok.io/api/products`)
      .then(response => {
        if (!response.ok) {
          throw Error("request failed")
        }
        return response
      })
      .then(results => results.json())
      .then(results => {
        this.setState({
          lowInventory: results
        })
      });

      fetch(`https://649c403b.ngrok.io/api/onOrder`)
      .then(response => {
        if (!response.ok) {
          throw Error("request failed")
        }
        return response
      })
      .then(results => results.json())
      .then(results => {
        this.setState({
          onOrderInventory: results
        })
      });
  }

  addToOnOrder(sku, count){
    fetch(`https://649c403b.ngrok.io/api/products/${sku}/${count}`, {
      method: 'PATCH'
  })
    .then(response => {
      if (!response.ok) {
        throw Error("request failed")
      }
      return response
    })
  };

  render() {
    return (
      <div className="App">
        <Header />
        <p className="App-intro">
          Welcome to Small Shop Inventory
        </p>
        <Search results={this.state.lowInventory}/>
        <Grid>
          <LowInventory lowInventory={this.state.lowInventory} />
          <InventoryOnOrder 
            onOrder={this.state.onOrderInventory}
            addToOnOrder={this.addToOnOrder}
          />
        </Grid>
      </div>
    );
  }
}

export default App;

import React from 'react';
import { Grid } from 'semantic-ui-react';
import '../styles/App.css';
import Search from './Search.js';
import LowInventory from './LowInventory';
import InventoryOnOrder from './OnOrderInventory';


class Home extends React.Component {
  constructor() {
    super();
    
    this.addToOnOrder = this.addToOnOrder.bind(this);
    this.getOnorderProducts = this.getOnorderProducts.bind(this);
    this.state = {
      allProducts: {},
      lowInventory: {},
      onOrderInventory: {}
    }
  }

  componentWillMount() {
    fetch(`https://560e7881.ngrok.io/api/products`)
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

      this.getOnorderProducts();
  }

  getOnorderProducts() {
    fetch(`https://560e7881.ngrok.io/api/onOrder`)
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

  addToOnOrder(variantId, count){
    fetch(`https://560e7881.ngrok.io/api/onOrder/${variantId}/${count}`, {
      method: 'POST'
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
      <div>
        <p className="App-intro">
          Welcome to Small Shop Inventory
        </p>
        <Search results={this.state.lowInventory}/>
        <Grid>
          <LowInventory lowInventory={this.state.lowInventory} />
          <InventoryOnOrder 
            onOrder={this.state.onOrderInventory}
            addToOnOrder={this.addToOnOrder}
            getOnorderProducts={this.getOnorderProducts}
          />
        </Grid>
      </div>
    );
  }
}

export default Home;
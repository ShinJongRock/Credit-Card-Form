import React from 'react';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "FULL NAME",
      input: "XXXX XXXX XXXX XXXX",
      expiry: "MM/YY",
      ccv: "CVC",
      errormsg: []
    };
  }

  getValue = event => {
    event.target.value = event.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
    this.setState({
      input: event.target.value
    });
  };

  getExpiry = event => {
    this.setState({
      expiry: event.target.value
    });
  };

  getCcv = event => {
    this.setState({
      ccv: event.target.value
    });
  };

  getName = event => {
    this.setState({
      name: event.target.value
    });
    
  };

  subForm = event => {
    event.preventDefault();
    const name= document.getElementById('name');
    const input = document.getElementById('card');
    const cvc = document.getElementById('cvc');
    const exp = document.getElementById('exp');
    if (name.value.trim() === '') {
      this.setState({
        errormsg: "Name is required"
     })
     name.style.border="1px solid red"
    }else if(input.value.trim() === "") {
      this.setState({
        errormsg: "Please enter a valid card number"
      })  
      input.style.border="1px solid red"
      
    } else if (cvc.value.trim().length !== 3) {
      this.setState({
        errormsg: "Please enter a valid cvc number"
      })  
      
    }else if(exp.value.trim().length !== 5) {
      this.setState({
        errormsg: "Please enter a valid expiry date in format MM/YY"
      })  
      
    } else {
      document.getElementById('success').style.display="block"
    }
  };

  continueShopping = () => {
    window.location.reload(true);
  }

  render() {
    return (
      <div className="App">

        <div className="cc">
          <h1>DEVBANK</h1>
          <img id="mc" src="/img/mc.png"/>
          <div id="cardinfo">
          <h3>{this.state.input}</h3>
          <h3 style={{textTransform:"uppercase"}}>{this.state.name}</h3>
          
          <div className="row">
          <p id="expiry">{this.state.expiry}</p>
          <p>{this.state.ccv}</p>
          </div>
          </div>

        </div>

      <div className="formwrapper">
        <form onSubmit={this.subForm}>
          <label for="name">Card Holder</label>
          <input id="name" onChange={this.getName} type="text" placeholder="Enter full name"/>
          <label for="card">Credit Card Number</label>
          <input id="card" onChange={this.getValue} maxlength="19" type="text"  placeholder="Enter card number" />
          
          <div className="row" id="expcvc">
          <label id="explabel" for="exp">Valid until</label>
          <input id="exp" onChange={this.getExpiry} maxlength="5" type="text" placeholder="mm/yy" />
          <label id="cvclabel" for="cvc">CVC</label>
          <input id="cvc" onChange={this.getCcv} maxlength="3" type="text" placeholder="cvc"/>
          </div>

          <button onSubmit={this.subForm}>PURCHASE</button>
          
        </form>
        <h4 id="errormsg">{this.state.errormsg}</h4>
      </div>

      <div style={{display:"none"}} id="success">
        <h2>THANK YOU FOR YOUR PURCHASE <span id="nametag">{this.state.name}</span></h2>
        <button onClick={this.continueShopping}>CONTINUE SHOPPING</button>
      </div>

      </div>
    );
  }
}

export default App;

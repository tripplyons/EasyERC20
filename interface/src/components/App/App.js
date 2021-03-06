import "./App.css";
import React from "react";
import CreationForm from "../CreationForm/CreationForm";
import Container from "../Container/Container";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {provider: null};
  }

  render() {
    return (
      <Container>
        <h1>EasyERC20 (<a href="https://github.com/tripplyons/EasyERC20">GitHub</a>)</h1>
        <p>Create ERC20 tokens through an easy-to-use decentralized app</p>
        <h2>Directions</h2>
        <ol>
          <li>Connect to MetaMask and customize your token.</li>
          <li>Click submit and wait for your transaction to be confirmed by the network.</li>
          <li>Click "Add to MetaMask" on the popup after confirmation.</li>
        </ol>
        <CreationForm provider={this.state.provider}></CreationForm>

        <p><b>For more complex requests, message me at Skewbed#1836 on Discord.</b></p>
      </Container>
    );
  }
};
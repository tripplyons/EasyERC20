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
        <h1><a href="https://github.com/tripplyons/EasyERC20">EasyERC20</a></h1>
        <h2>Directions</h2>
        <ol>
          <li>Connect to MetaMask and customize your token.</li>
          <li>Click submit and wait for your transaction to be confirmed by the network.</li>
          <li>Click "Add to MetaMask" on the popup after confirmation.</li>
        </ol>
        <CreationForm provider={this.state.provider}></CreationForm>

        <p><b>For more complex requests, message me at SKΞWBΞD#1836 on Discord.</b></p>
      </Container>
    );
  }
};
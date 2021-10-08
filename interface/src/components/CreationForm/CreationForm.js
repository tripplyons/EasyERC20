import "./CreationForm.css";
import React from "react";
import { ethers } from "ethers";
import LabeledTextInput from "../LabeledTextInput/LabeledTextInput";
import LabeledSelectInput from "../LabeledSelectInput/LabeledSelectInput";
import ConnectToMetaMask from "../ConnectToMetaMask/ConnectToMetaMask";
import Button from "../Button/Button";
import Swal from "sweetalert2";
import NETWORKS from "../../data/networks.json";
import FACTORY_ABI from "../../data/abi/EasyERC20Factory.json";

export default class CreationForm extends React.Component {
  constructor(props) {
    super(props);

    this.alertButtonColor = "#6699ff";

    this.state = {
      name: "",
      symbol: "",
      supply: "",
      network: NETWORKS[0].name,
      provider: null
    };
  }

  async connectToMetaMask() {
    await window.ethereum.request({ method: "eth_requestAccounts" })
    this.setState({
      provider: new ethers.providers.Web3Provider(window.ethereum)
    });
  }

  stateCallback() {
    console.log(this.state)
  }

  errorMessage(message) {
    console.error("EasyERC20 Error Message:", message)

    Swal.fire({
      title: "Error!",
      text: message,
      icon: "error",
      confirmButtonText: "Okay",
      confirmButtonColor: this.alertButtonColor
    });
  }

  async submitTransaction(network, name, symbol, supply) {
    let networkProperties = NETWORKS.filter(x => x.name === network)[0];

    const { chainId } = await this.state.provider.getNetwork();

    if(chainId !== networkProperties.chainId) {
      this.errorMessage("Incorrect MetaMask Network Selected");
      return;
    }

    let contract = new ethers.Contract(networkProperties.address, FACTORY_ABI, this.state.provider);
    let accounts = await this.state.provider.listAccounts();
    let signer = await this.state.provider.getSigner(accounts[0]);
    contract = contract.connect(signer);

    let tx = await contract.createToken(name, symbol, supply.toString() + "0".repeat(18), {
      value: networkProperties.fee
    });
    let completedTx = await tx.wait();
    let tokenAddress = completedTx.logs.filter(log => log.address.toLowerCase() === networkProperties.address.toLowerCase())[0].topics[1];
    tokenAddress = '0x' + tokenAddress.slice(-40)

    await Swal.fire({
      title: "Done!",
      text: "Your token address is "+tokenAddress,
      icon: "success",
      confirmButtonText: "Add to MetaMask",
      confirmButtonColor: this.alertButtonColor
    });

    let wasAdded = false;
    while(!wasAdded) {
      wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenAddress,
            symbol: symbol,
            decimals: 18,
            // image: tokenImage, // A string url of the token logo
          },
        },
      });
    }
  }

  submit() {
    if(this.state.provider == null) {
      this.errorMessage("MetaMask not connected");
      return;
    }

    let name = this.state.name;
    if(name.length === 0) {
      this.errorMessage("Name is empty");
      return;
    }

    let symbol = this.state.symbol;
    if(symbol.length === 0) {
      this.errorMessage("Symbol is empty");
      return;
    }

    let supply = parseInt(this.state.supply);
    if(isNaN(supply) || supply.toString() !== this.state.supply) {
      this.errorMessage("Supply is not a valid whole number");
      return;
    }

    this.submitTransaction(this.state.network, name, symbol, supply);
  }

  render() {
    return (
      <div className="CreationForm">
        <h2>Connect to MetaMask:</h2>
        <ConnectToMetaMask onClick={this.connectToMetaMask.bind(this)} provider={this.state.provider} />
        <h2>Create Your Token:</h2>
        <LabeledTextInput
          value={this.state.name}
          onInput={text => {
            this.setState({name: text}, this.stateCallback)
          }}
        >
          What name do you want for your token?<br />(Bitcoin, Ethereum, etc.)
        </LabeledTextInput>
        <LabeledTextInput
          value={this.state.symbol}
          onInput={text => {
            this.setState({symbol: text}, this.stateCallback)
          }}
        >
          What ticker symbol do you want for your token?<br />(BTC, ETH, etc.)
        </LabeledTextInput>
        <LabeledTextInput
          value={this.state.supply}
          onInput={text => {
            this.setState({supply: text}, this.stateCallback)
          }}
        >
          How much supply do you want for your token?<br />(a whole number of full tokens)
        </LabeledTextInput>
        <LabeledSelectInput
          value={this.state.network}
          onChange={value => {
            this.setState({network: value}, this.stateCallback)
          }}
          options={NETWORKS.map(network => network.name)}
        >
          What network do you want to deploy your token to?
        </LabeledSelectInput>
        <Button onClick={this.submit.bind(this)}>
          Submit
        </Button>
      </div>
    );
  }
};
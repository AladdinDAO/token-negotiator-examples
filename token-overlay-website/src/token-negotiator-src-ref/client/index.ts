// @ts-nocheck
import { ethers } from "ethers";
import { getTokens } from "../core/index";
import { config } from "../config/index";
import OverlayService from "./overlayService";
import { getCookie } from "../utils/index";
export class Client {

  constructor(filter = {}, tokenName, options = {}) {
    if (!tokenName) throw new Error('Please provide token name.');
    if (options.useOverlay === true && !options.tokenSelectorContainer) throw new Error('tokenSelectorContainer is a required parameter when useOverlay is true.');
    this.tokenName = tokenName;
    this.config = config[tokenName];
    this.options = options;
    this.filter = filter;
    // onload get Tokens from blockchain and from iframe/s
    this.tokens = [];
  }

  // negotiates using both passive and active flows.
  async negotiate() {
    if(this.options.useOverlay === true){
      await this.negotiateViaOverlay();
    } else {
      const tokens = await this.negotiateViaOutlet();
      return tokens;
    }
  }
  
  async negotiateViaOutlet() {
    // TODO should get onchain tokens
    const tokens = await getTokens({
      filter: this.filter,
      tokenName: this.config.tokenName,
      tokensOrigin: this.config.tokenOrigin,
      localStorageItemName: this.config.localStorageItemName,
      tokenParser: this.config.tokenParser,
      unsignedTokenDataName: this.config.unsignedTokenDataName
    });
    return tokens;
  }

  async negotiateViaOverlay() {

    // TODO should get onchain tokens

    // For now just get one token
    const tokens = await getTokens({
      filter: this.filter,
      tokenName: this.config.tokenName,
      tokensOrigin: this.config.tokenOrigin,
      localStorageItemName: this.config.localStorageItemName,
      tokenParser: this.config.tokenParser,
      unsignedTokenDataName: this.config.unsignedTokenDataName
    });
    // For now this only gets one token
    this.tokens.push(tokens);
    // 
    const overlayService = new OverlayService(this.config, this.options, this.filter); 
    // Provide methods to Client Module of OverlayService.
    this.overlayClickHandler = overlayService.overlayClickHandler;
    this.openOverlay = overlayService.openOverlay;
  }

  // Common Client Functions - Active + Passive Flows.

  async connectMetamaskAndGetAddress() {
    if (!window.ethereum) throw new Error('Please install metamask to continue.');
    const userAddresses = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if (!userAddresses || !userAddresses.length) throw new Error("Active Wallet required");
    return userAddresses[0];
  }

  async signMessageWithBrowserWallet(message) {
    await this.connectMetamaskAndGetAddress();
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    return await signer.signMessage(message);
  }

  // TODO implement this:
  async authenticate({unsignedToken, unEndPoint}) {
    if(!unsignedToken || !unEndPoint) return { status: false, useEthKey: null, proof: null };
    try {
      let useEthKey = await this.getChallengeSigned(unEndPoint);
      const attestedAddress = await this.validateUseEthKey(unEndPoint, useEthKey);
      const walletAddress = await this.connectMetamaskAndGetAddress();
      if (walletAddress.toLowerCase() !== attestedAddress.toLowerCase()) throw new Error('useEthKey validation failed.');
      // @ts-ignore
      // this.useEthKey = useEthKey; // TODO use this to speed up authentication process.
      const tokenProof = await this.getTokenProofFromOutlet(
        this.config.tokenOrigin, 
        this.config.localStorageItemName, 
        unsignedToken
      );
      return { status: true, useEthKey: useEthKey, proof: tokenProof };
    } catch (e) {
      console.error(e);
      return e;
    }
  }

  async getTokenProofFromOutlet = (tokensOrigin, localStorageItemName, unsignedToken) => {
    this.getTokenProofFromOutletIframe(tokensOrigin, localStorageItemName, unsignedToken);
    return new Promise((resolve, reject) => {
      window.addEventListener('message', function(event) { 
        if(event.data.evt === 'setTokenProof') {
          resolve(event.data.tokenProof);
        }
      }, false);
    })
  }

  // gets the token proof from the outlet iframe
  // async getTokenProofFromOutletIframe = (tokensOrigin, localStorageItemName, unsignedToken) => {
  //   return new Promise((resolve, reject) => {
  //     const iframe = document.createElement('iframe');
  //     iframe.src = tokensOrigin;
  //     iframe.style.width = '1px';
  //     iframe.style.height = '1px';
  //     iframe.style.opacity = '0';
  //     document.body.appendChild(iframe);
  //     iframe.onload = () => {
  //       iframe.contentWindow.postMessage({
  //         evt: 'getTokenProof',
  //         localStorageItemName: localStorageItemName,
  //         unsignedToken: unsignedToken
  //       }, tokensOrigin);
  //       resolve(true);
  //     };
  //   });
  // }

  async validateUseEthKey(endPoint, data){
    try {
      const response = await fetch(endPoint, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      const json = await response.json();
      return json.address;
    } catch (e) {
      return {
        success: false,
        message: "validate ethkey request failed"
      }
    }
  }

  async getUnpredictableNumber(endPoint) {
    try {
      const response = await fetch(endPoint);
      const json = await response.json();
      json.success = true;
      return json;
    } catch (e) {
      return {
        success: false,
        message: "UN request failed"
      }
    }
  }

  // Add New Attestations from Client 
  // It's recomended that this is done via 
  // a magic link only.
  addTokenThroughIframe(magicLink: any) {
    const iframe = document.createElement('iframe');
    iframe.src = magicLink;
    iframe.style.width = '1px';
    iframe.style.height = '1px';
    iframe.style.opacity = '0';
    document.body.appendChild(iframe);
  }

  ethKeyIsValid(ethKey) {
    return ethKey.expiry >= Date.now();
  }

  async getChallengeSigned(unEndPoint) {
    // const storageEthKeys = localStorage.getItem(this.config.localStorageEthKeyItemName);
    const storageEthKeys = getCookie(this.config.localStorageEthKeyItemName);
    let ethKeys = (storageEthKeys && storageEthKeys.length) ? JSON.parse(storageEthKeys) : {};
    try {
      let address = await this.connectMetamaskAndGetAddress();
      address = address.toLowerCase();
      let useEthKey;
      if (ethKeys && ethKeys[address] && !this.ethKeyIsValid(ethKeys[address])) {
        delete ethKeys[address];
      }
      if (ethKeys && ethKeys[address]) {
        useEthKey = ethKeys[address];
      } else {
        useEthKey = await this.signNewChallenge(unEndPoint);
        if (useEthKey) {
          ethKeys[useEthKey.address.toLowerCase()] = useEthKey;
          // localStorage.setItem(this.config.localStorageEthKeyItemName, JSON.stringify(ethKeys));
          document.cookie = `${this.config.localStorageEthKeyItemName}=${JSON.stringify(ethKeys)}; max-age=31536000; SameSite=None; Secure`;
        }
      }
      return useEthKey;
    } catch (e) {
      console.error(e);
      throw new Error(e.message);
    }
  }

  async signNewChallenge(unEndPoint) {
    let res = await this.getUnpredictableNumber(unEndPoint);
    const { number:UN, randomness, domain, expiration:expiry, messageToSign } = res;
    let signature = await this.signMessageWithBrowserWallet(messageToSign);
    const msgHash = ethers.utils.hashMessage(messageToSign);
    const msgHashBytes = ethers.utils.arrayify(msgHash);
    const recoveredAddress = ethers.utils.recoverAddress(msgHashBytes, signature);
    return {
      address: recoveredAddress,
      expiry,
      domain,
      randomness,
      signature,
      UN
    };
  }

}

// @ts-nocheck
// OutletService enscapsulates resources to use the negotiator service (outlet)
// - reads tokens from query string
// - provides tokens through an iframe

import {
  readTokens
} from '../core';

import { base64ToUint8array, compareObjects } from '../utils/index';
class OutletService {

  constructor(config, Authenticator) {
    if(config && Authenticator){
      this.config = config;
      this.authenticator = new Authenticator();
    } else {
      console.warn('OutletService: Please provide the config and Authenticator to use this module service');
    }
  };

  rawTokenCheck(unsignedToken, localStorageItemName, tokenParser) {
    // need to be able to install this module:
    let rawTokenData = this.getRawToken(unsignedToken, localStorageItemName, tokenParser);
    if(!rawTokenData) return null;
    let base64ticket = rawTokenData.token;
    let ticketSecret = rawTokenData.secret;
    let tokenObj = {
        ticketBlob: base64ticket,
        ticketSecret: ticketSecret,
        attestationOrigin: this.config.attestationOrigin,
    };
    if (rawTokenData && rawTokenData.id)
        tokenObj.email = rawTokenData.id;
    if (rawTokenData && rawTokenData.magic_link)
        tokenObj.magicLink = rawTokenData.magic_link;

    // * call back flow.
    this.authenticator.getAuthenticationBlob(tokenObj, () => {
      this.eventSender.emitTokenProof(tokenProof);
    });
  }

  getRawToken(unsignedToken, localStorageItemName, tokenParser) {
    if (!unsignedToken || !Object.keys(unsignedToken).length) return;
        let tokensOutput = readTokens(localStorageItemName);
        if (tokensOutput.success && !tokensOutput.noTokens) {
            let rawTokens = tokensOutput.tokens;
            let token = {};
            if (rawTokens.length) {
                rawTokens.forEach(tokenData => {
                    if (tokenData.token) {
                        let decodedToken = new tokenParser(base64ToUint8array(tokenData.token).buffer);
                        if (decodedToken && decodedToken[this.config.unsignedTokenDataName]) {
                            let decodedTokenData = decodedToken[this.config.unsignedTokenDataName];
                            if (compareObjects(decodedTokenData, unsignedToken)) token = tokenData;
                        }
                    }
                });
            }
            return token;
        }
        else {
            return null;
        }
  }

}

export default OutletService;

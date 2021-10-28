var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AsnProp, AsnPropTypes } from "@peculiar/asn1-schema";
import { Proof } from "./ProofOfExponentASN";
import { MyAttestation, PublicKeyInfoValue } from "./AttestationFramework";
export class UseAttestation {
}
__decorate([
    AsnProp({ type: MyAttestation })
], UseAttestation.prototype, "attestation", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Integer })
], UseAttestation.prototype, "type", void 0);
__decorate([
    AsnProp({ type: Proof })
], UseAttestation.prototype, "proof", void 0);
__decorate([
    AsnProp({ type: PublicKeyInfoValue })
], UseAttestation.prototype, "sessionKey", void 0);

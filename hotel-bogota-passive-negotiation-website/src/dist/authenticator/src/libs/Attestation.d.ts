import { Extensions } from "../asn1/shemas/AuthenticationFramework";
import { KeyPair } from "./KeyPair";
export declare class Attestation {
    static OID_OCTETSTRING: string;
    protected version: number;
    protected serialNumber: any;
    protected signingAlgorithm: string;
    protected issuer: string;
    private notValidBefore;
    private notValidAfter;
    protected subject: string;
    protected subjectKey: KeyPair;
    private smartcontracts;
    private dataObject;
    protected commitment: Uint8Array;
    protected extensions: Extensions;
    private signedInfo;
    constructor();
    fromBytes(uint8bytes: Uint8Array): void;
    isValidX509(): boolean;
    getDerEncoding(): string;
    getCommitment(): Uint8Array;
    getNotValidBefore(): number;
    setNotValidBefore(d: number): void;
    getNotValidAfter(): number;
    setNotValidAfter(d: number): void;
    getSubjectPublicKeyInfo(): KeyPair;
    checkValidity(): boolean;
    getExtensions(): Extensions;
    setVersion(version: number): void;
    getVersion(): number;
    setSubject(subject: string): void;
    getSubject(): string;
    setSigningAlgorithm(alg: string): void;
    getPrehash(): Uint8Array;
    getSigningAlgorithm(): string;
}

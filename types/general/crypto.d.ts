declare module 'edgeros:crypto' {
  export * from 'crypto';
}

declare module "crypto" {
  import { Buffer } from 'buffer';
  import * as stream from 'edgeros:stream';

  type BinaryLike = string | EdgerOS.ArrayBufferView;

  type BufferString = string | Buffer;

  type HmacEncoding = 'hex' | 'base64';

  type KeyType = 'rsa' | 'dsa' | 'ec' | 'ed25519' | 'ed448' | 'x25519' | 'x448';
  type KeyFormat = 'pem' | 'der';

  type KeyObjectType = 'public' | 'private';

  type AlgorithmType = 'aes-128-ecb'
  | 'aes-192-ecb'
  | 'aes-256-ecb'
  | 'aes-128-cbc'
  | 'aes-192-cbc'
  | 'aes-256-cbc'
  | 'aes-128-cfb128'
  | 'aes-192-cfb128'
  | 'aes-256-cfb128'
  | 'aes-128-ctr'
  | 'aes-192-ctr'
  | 'aes-256-ctr'
  | 'aes-128-gcm'
  | 'aes-192-gcm'
  | 'aes-256-gcm'
  | 'aes-128-ccm'
  | 'aes-192-ccm'
  | 'aes-256-ccm'
  | 'camellia-128-ecb'
  | 'camellia-192-ecb'
  | 'camellia-256-ecb'
  | 'camellia-128-cbc'
  | 'camellia-192-cbc'
  | 'camellia-256-cbc'
  | 'camellia-128-cfb128'
  | 'camellia-192-cfb128'
  | 'camellia-256-cfb128'
  | 'camellia-128-ctr'
  | 'camellia-192-ctr'
  | 'camellia-256-ctr'
  | 'camellia-128-gcm'
  | 'camellia-192-gcm'
  | 'camellia-256-gcm'
  | 'camellia-128-ccm'
  | 'camellia-192-ccm'
  | 'camellia-256-ccm'
  | 'des-ecb'
  | 'des-cbc'
  | 'des-ede-ecb'
  | 'des-ede-cbc'
  | 'des-ede3-ecb'
  | 'des-ede3-cbc'
  | 'blowfish-ecb'
  | 'blowfish-cbc'
  | 'blowfish-cfb64'
  | 'blowfish-ctr'
  | 'arc4-128';

  interface KeyExportOptions<T extends KeyFormat> {
    type: 'pkcs1' | 'spki' | 'pkcs8' | 'sec1';
    format: T;
    cipher?: string;
    passphrase?: string | Buffer;
  }

  class KeyObject {
    private constructor();
    asymmetricKeyType?: KeyType;
    /**
     * For asymmetric keys, this property represents the size of the embedded key in
     * bytes. This property is `undefined` for symmetric keys.
     */
    asymmetricKeySize?: number;
    export(options: KeyExportOptions<'pem'>): string | Buffer;
    export(options?: KeyExportOptions<'der'>): Buffer;
    type: KeyObjectType;
    encrypt(str: string): Buffer;
    encrypt(buff: Buffer, offset?: number, length?: number): Buffer;
    decrypt(buff: Buffer, offset?: number, length?: number): Buffer;
  }

  class Hash {
    /**
     * Updates the Hash object with the given data.
     *
     * @param data Updates the object with the data. If there is already data in the object, concatenates them.
     */
    update(data: string | Buffer): void;

    /**
     * Returns an encoded hash of the input data as a string or Buffer.
     *
     * @param encoding Encodes the result of the hashing to the given format. Can be {'hex' | 'base64'}.
     *                 If no encoding is given, or the given encoding doesn't match the known formats,
     *                 returns the raw hash in a Buffer. default: return buffer.
     */
    digest(encoding?: string): string | Buffer;

    /**
     * Returns an encoded hash of the input data as a string or Buffer.
     *
     * @param file A file that needs to calculate a hash value.
     * @param encoding Encodes the result of the hashing to the given format.
     *                 Can be {'hex' | 'base64'}. If no encoding is given, or the given encoding doesn't match the known formats,
     */
    digestFile(file: string, encoding?: string): string | Buffer;

    /**
     * Reset the internal state of the hash object,
     * and the hash object can perform update() and digest() operations again.
     */
    restart(): void;
  }

  class Hmac extends stream.Transform {
    private constructor();
    update(data: BinaryLike): Hmac;
    digest(encoding: HmacEncoding): BufferString;
    digestFile(file: string, encoding?: HmacEncoding): BufferString;
    restart(): void;
  }

  class Verify extends stream.Writable {
    /**
     * Updates the Verify object with the given data.
     *
     * @param data Updates the object with the data. If there is already data in the object, concatenates them.
     */
    update(data: string | Buffer): void;

    /**
     * Verifies the signature against the publicKey using the data added with verify.update().
     *
     * Returns: {Boolean} true if the verification succeeds, false otherwise.
     *
     * @param publicKey A valid RSA Public key.
     * @param signature A base64 encoded rsa-sha1 or rsa-sha256 signature.
     * @param signatureEncoding Signature encoding default: base64
     */
    verify(publicKey: string, signature: string, signatureEncoding?: string): boolean;

    /**
     * Verifies the signature against the publicKey using the data from file.
     *
     * Returns: {Boolean} true if the verification succeeds, false otherwise.
     *
     * @param file A file that needs to verify signature.
     * @param publicKey A valid RSA Public key.
     * @param signature A base64 encoded rsa-sha1 or rsa-sha256 signature.
     * @param signatureEncoding Signature encoding. default: base64
     */
    verifyFile(file: string, publicKey: string, signature: string, signatureEncoding?: string): boolean;
  }

  class AES {
    /**
     * Encrypt a string with AES. The bytes length of the string is preferably 16 bytes aligned.
     * If not, the encryption program will automatically fill 0 append to string,
     * ensuring 16-byte alignment for encryption. Return buffer length is 16 bytes aligned.
     *
     * Returns: {Buffer} Encrypted data.
     *
     * @param str string that needs to be encrypted.
     */
    encode(str: string): Buffer;

    /**
     * Encrypt data with AES. The bytes length is preferably 16 bytes aligned.
     * If not, the encryption program will automatically fill 0 append to buffer data,
     * ensuring 16-byte alignment for encryption. Return buffer length is 16 bytes aligned.
     *
     * Returns: {Buffer} Encrypted data.
     *
     * @param buffer The data that needs to be encrypted.
     * @param offset Buffer offset. default:0.
     * @param length Read length. default:buffer.length.
     *
     */
    encode(buffer: Buffer, offset?: number, length?: number): Buffer;

    /**
     * Decrypt data with AES. The bytes length is preferably 16 bytes aligned.
     * If not, the decryption program will automatically fill 0 append to buffer data,
     * ensuring 16-byte alignment for decryption. Return buffer length is 16 bytes aligned.
     *
     * Returns: {Buffer} Decrypted data.
     *
     * @param buffer The data that needs to be decrypted.
     * @param offset Buffer offset. default:0.
     * @param length Read length. default:buffer.length.
     *
     */
    decode(buffer: Buffer, offset?: number, length?: number): Buffer;
  }

  class Sign extends stream.Writable {
    update(data: BufferString): void;
    sign(privateKey: BufferString | KeyObject, passwd?: string, outputEncoding?: string): BufferString;
    signFile(file: string, publicKey: BufferString | KeyObject): BufferString;
    restart(): void;
  }

  class Cipher extends stream.Transform {
    final(outputEncoding?: string): BufferString;
    update(data: BufferString, inputEncoding?: string, outputEncoding?: string): BufferString;
    setAAD(buff: Buffer, options?: object): this;
    /**
     * setAutoPadding
     * @param autoPadding Auto padding. default: true.
     */
    setAutoPadding(autoPadding?: boolean): this;
    getAuthTag(): Buffer;
    restart(): void;
  }

  class Decipher extends stream.Transform {
    final(outputEncoding?: string): BufferString;
    update(data: BufferString, inputEncoding?: string, outputEncoding?: string): BufferString;
    setAAD(buff: Buffer, options?: object): this;
    /**
     * setAutoPadding
     * @param autoPadding Auto padding. default: true.
     */
    setAutoPadding(autoPadding?: boolean): this;
    setAuthTag(buff: Buffer): this;
    restart(): void;
  }

  /**
   * Get the currently supported hash algorithm list.
   *
   * Returns: {Array} A supported hash algorithm list array.
   */
  function getHashes(): object[];

  /**
   * Create a hash algorithm object. Current support hash algorithms include: 'md5', 'ripemd160', 'sha1', 'sha256', 'sha384', 'sha512'.
   *
   * Returns: {object} Hash object.
   *
   * @param hashtype Type of hash algorithm.
   * @param hmackey Specify HMAC key if HMAC encoding is used. default: undefined, do not use hmac.
   */
  function createHash(hashtype: string, hmackey?: string | Buffer): Hash;

  /**
   * Create a hash algorithm with HMAC object. Current support hash algorithms include: 'md5', 'ripemd160', 'sha1', 'sha256', 'sha384', 'sha512'.
   *
   * @param {string} hashtype Type of hash algorithm.
   * @param {(string | Buffer)} [hmackey] Specify HMAC key if HMAC encoding is used.
   * @returns {Hmac} Hash object.
   */
  function createHmac(hashtype: string, hmackey?: string | Buffer): Hmac;

  /**
   * Creates and returns a Verify object.
   *
   * Returns: {object} Verify object.
   *
   * @param hashType Hash type of the signature. {sha1 | sha256 | sha512}.
   * @param hmackey Specify HMAC key if HMAC encoding is used. default: undefined, do not use hmac.
   */
  function createVerify(hashType: string, hmackey?: string | Buffer): Verify;

  /**
   * Creates and returns a Signature object.
   *
   * @param {string} hashType Hash type of the signature: 'sha1', 'sha256', 'sha384' or 'sha512'.
   * @param {(string | Buffer)} [hmackey] Specify HMAC key if HMAC encoding is used. default: undefined, do not use hmac.
   * @returns {Sign} Signature object.
   */
  function createSign(hashType: string, hmackey?: string | Buffer): Sign;

  /**
   * Create and return a `Cipher` object using the given `algorithm`, `key` and initialization vector(iv).
   *
   * @param {string} algorithm Cipher algorithm.
   * @param {(Buffer | string)} key Cipher key.
   * @param {(Buffer | string)} iv Cipher initialization vector.
   * @param {*} [options] Other options. default: no options.
   * @returns {Cipher} Cipher object.
   */
  function createCipheriv(algorithm: AlgorithmType, key: Buffer | string, iv: Buffer | string, options?: any): Cipher;

  /**
   * Create and return a `Decipher` object using the given `algorithm`, `key` and initialization vector(iv).
   *
   * @param {string} algorithm Decipher algorithm.
   * @param {(Buffer | string)} key Decipher key.
   * @param {(Buffer | string)} iv Decipher initialization vector.
   * @param {*} [options] Other options. default: no options.
   * @returns {Decipher} Decipher object.
   */
  function createDecipheriv(algorithm: string, key: Buffer | string, iv: Buffer | string, options?: any): Decipher;

  interface keyPairOptions {
    modulusLength: number;
    publicKey: string;
    privateKey: string;
  }
  enum keyPairType {
    'rsa', 'ec'
  }
  interface Pair {
    publicKey: string;
    privateKey: string;
  }

  interface certificateObject {
    version: number; // Certificate version: 1, 2, 3.
    serial: string; // Certificate serial number.
    issuer: string; // Issuer of this certificate
    subject: string; // Subject name
    validFrom: Date; // Validity time begin.
    validTo: Date; // Validity time to
    sigAlgorithm: string; // Signature algorithm.
    keySize: number; // Key size bits.
    basicConstraints: {
      CA: boolean; // Is it a CA certificate
      maxPath: number; // Max path length.
    };
    keyUsage: {
      digitalSignature: boolean; // Digital signature.
      nonRepudiation: boolean; // Non repudiation.
      keyEncipherment: boolean; // Key encipherment.
      dataEncipherment: boolean; // Data encipherment.
      keyAgreement: boolean; // Key agreement.
      keyCertSignature: boolean; // key cert signature.
      crlSignature: boolean; // Crl signature.
      encipherOnly: boolean; // Encipher only.
      decipherOnly: boolean; // Decipher only.
    };
    info: string; // All information string
  }

  /**
   * Generates a new asymmetric key pair of the given type. RSA, EC are currently supported.
   *
   * @param {keyPairOptions} type Must be 'rsa' or 'ec'.
   * @param {keyPairOptions} [opt] Key options.
   * @returns {Pair} Pair of keys.
   */
  function generateKeyPair(type: 'rsa' | 'ec', opt?: keyPairOptions): Pair;

  /**
   * Check whether the private key is valid, and return this private key if it is valid.
   *
   * @param {string} privateKey Private key string.
   * @param {string} [passwd] Private key passwd.
   * @returns {KeyObject} Private key object.
   */
  function createPrivateKey(privateKey: string, passwd?: string): KeyObject;

  /**
   * Creates and returns a public key object.
   *
   * @param {string} privateKey Private key string.
   * @param {string} passwd Private key passwd.
   * @returns {KeyObject} Public key object.
   */
  function createPublicKey(privateKey: string, passwd: string): KeyObject;

  /**
   * Use private key for data encryption. TODO: mix
   *
   * @param {(KeyObject | string)} privateKey Private key.
   * @param {Buffer} buff Data that needs to be encrypted.
   * @returns {Buffer} Encrypted data.
   */
  function privateDecrypt(privateKey: KeyObject | string, buff: Buffer): Buffer;

  /**
   * Use private key for data decryption. TODO: mix
   *
   * @param {(KeyObject | string)} privateKey Private key.
   * @param {Buffer} buff Data that needs to be decrypted.
   * @returns {Buffer} Decrypted data.
   */
  function privateEncrypt(privateKey: KeyObject | string, buff: Buffer): Buffer;

  /**
   * Use public key for data encryption. TODO: mix
   *
   * @param {(KeyObject | string)} publicKey Public key.
   * @param {Buffer} buff Data that needs to be encrypted.
   * @returns {Buffer} Encrypted data.
   */
  function publicDecrypt(publicKey: KeyObject | string, buff: Buffer): Buffer;

  /**
   * Use public key for data decryption. TODO: mix
   *
   * @param {(KeyObject | string)} publicKey Public key.
   * @param {Buffer} buff Data that needs to be decryped.
   * @returns {Buffer} Decrypted data.
   */
  function publicEncrypt(publicKey: KeyObject | string, buff: Buffer): Buffer;

  /**
   * Create a buffer of the specified size and fill it with random data
   *
   * @param size Buffer size (MAX: 256KB).
   */
  function randomBytes(size: number): Buffer;

  /**
   * This function is similar to `crypto.randomBytes()` but requires the first argument to be a `Buffer` that will be filled.
   *
   * @param buff Buffer for random data.
   * @param offset Buffer offset. default:0.
   * @param size Random data length limit. default:buffer.length.
   */
  function randomFill(buff: Buffer, offset?: number, size?: number): Buffer;

  /**
   * Get the total number of current credit certificates in the system
   *
   * @returns {number} Number of certificates.
   */
  function creditCertNum(): number;

  /**
   * Get the specified credit certificate information.
   *
   * @param {number} index Certificate index.
   * @returns {certificateObject} Credit certificate infomation.
   */
  function creditCertInfo(index: number): certificateObject;

  /**
   * Scrypt is a password-based key derivation function, the purpose is to make brute force cracking impossible.
   * The `salt` should be as unique as possible.
   * It is recommended that the `salt` value be random and at least 16 bytes long.
   *
   * @param {(string | Buffer)} passwd Password.
   * @param {(string | Buffer)} salt Salt.
   * @param {number} keylen Key length in bytes.
   * @returns {Buffer} Key buffer.
   */
  function scrypt(passwd: string | Buffer, salt: string | Buffer, keylen: number): Buffer;
}

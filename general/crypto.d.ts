declare module 'edgeros:crypto' {
  export * from 'crypto'
}

declare module "crypto" {

  class Hash {
    /**
     * Updates the Hash object with the given data.
     * 
     * @param data {Buffer} | {String} Updates the object with the data. If there is already data in the object, concatenates them.
     */
    update(data: string | Buffer): void;

    /**
     * Returns an encoded hash of the input data as a string or Buffer.
     * 
     * @param encoding {String} Encodes the result of the hashing to the given format. Can be {'hex' | 'base64'}. 
     *                 If no encoding is given, or the given encoding doesn't match the known formats, 
     *                 returns the raw hash in a Buffer. default: return buffer.
     */
    digest(encoding: string): string | Buffer;

    /**
     * Returns an encoded hash of the input data as a string or Buffer.
     * 
     * @param file {String} A file that needs to calculate a hash value.
     * @param encoding {String} Encodes the result of the hashing to the given format. 
     *                 Can be {'hex' | 'base64'}. If no encoding is given, or the given encoding doesn't match the known formats, 
     */
    digestFile(file: String, encoding?: number): string | Buffer;
  }

  class verify {

    /**
     * Updates the Verify object with the given data.
     * 
     * @param data {Buffer} | {String} Updates the object with the data. If there is already data in the object, concatenates them.
     */
    update(data: string | Buffer): void;

    /**
     * Verifies the signature against the publicKey using the data added with verify.update().
     * 
     * Returns: {Boolean} true if the verification succeeds, false otherwise.
     * 
     * @param publicKey {String} | {Buffer} A valid RSA Public key.
     * @param signature {String} | {Buffer} A base64 encoded rsa-sha1 or rsa-sha256 signature.
     */
    verify(publicKey: string, signature: string): boolean;

    /**
     * Verifies the signature against the publicKey using the data from file.
     * 
     * Returns: {Boolean} true if the verification succeeds, false otherwise.
     * 
     * @param file {String} A file that needs to verify signature.
     * @param publicKey {String} | {Buffer} A valid RSA Public key.
     * @param signature {String} | {Buffer} A base64 encoded rsa-sha1 or rsa-sha256 signature.
     */
    verifyFile(file: String, publicKey: string, signature: string): boolean;

    /**
     * Verifies the signature against the publicKey using the data from file hash.
     * 
     * Returns: {Boolean} true if the verification succeeds, false otherwise.
     * 
     * @param hash {Buffer} A file hash that needs to verify signature.
     * @param publicKey {String} | {Buffer} A valid RSA Public key.
     * @param signature {String} | {Buffer} A base64 encoded rsa-sha1 or rsa-sha256 signature.
     */
    verifyFile(hash: Buffer, publicKey: string, signature: string): boolean;
  }

  class AES {

    /**
     * Encrypt a string with AES. The bytes length of the string is preferably 16 bytes aligned. 
     * If not, the encryption program will automatically fill 0 append to string, 
     * ensuring 16-byte alignment for encryption. Return buffer length is 16 bytes aligned.
     * 
     * Returns: {Buffer} Encrypted data.
     * 
     * @param str {String} String that needs to be encrypted.
     */
    encode(str: string): Buffer;

    /**
     * Encrypt data with AES. The bytes length is preferably 16 bytes aligned. 
     * If not, the encryption program will automatically fill 0 append to buffer data, 
     * ensuring 16-byte alignment for encryption. Return buffer length is 16 bytes aligned.
     * 
     * Returns: {Buffer} Encrypted data.
     * 
     * @param buffer {Buffer} The data that needs to be encrypted.
     * @param offset {Integer} Buffer offset. default:0.
     * @param length {Integer} Read length. default:buffer.length.
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
     * @param buffer {Buffer} The data that needs to be decrypted.
     * @param offset {Integer} Buffer offset. default:0.
     * @param length {Integer} Read length. default:buffer.length.
     * 
     */
    decode(buffer: Buffer, offset?: number, length?: number): Buffer;
  }

  /**
   * Get the currently supported hash algorithm list.
   * 
   * Returns: {Array} A supported hash algorithm list array.
   */
  function getHashes(): Array<object>;

  /**
   * Create a hash algorithm object. Current support hash algorithms include: 'md5', 'sha1', 'sha256', 'sha512'.
   * 
   * Returns: {Object} Hash object.
   * 
   * @param hashtype {String} Type of hash algorithm.
   * @param hmackey {String} | {Buffer} Specify HMAC key if HMAC encoding is used. default: undefined, do not use hmac.
   */
  function createHash(hashtype: string, hmackey?: string): Hash;

  /**
   * Creates and returns a Verify object.
   * 
   * Returns: {Object} Verify object.
   * 
   * @param hashType {String} Hash type of the signature. {sha1 | sha256 | sha512}.
   * @param hmackey {String} | {Buffer} Specify HMAC key if HMAC encoding is used. default: undefined, do not use hmac.
   */
  function createVerify(hashType: string, hmackey?: string): verify;

  /**
   * Create AES encryption and decryption object.
   * 
   * Returns: {Object} AES encryption and decryption object.
   * 
   * @param key {String} | {Buffer} AES encryption and decryption key.
   * @param keyBits {Integer} Key bits length, support: 128, 192, 256.
   */
  function createAescrypto(key: string, keyBits: number): AES;
}

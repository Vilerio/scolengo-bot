import { DocumentObject, Options } from './types';
/**
 * Deserialize a JSON:API response
 *
 * @param response
 * @param options
 */
export declare function deserialize<TEntity, TExtraOptions = unknown>(response: DocumentObject, options?: Options<TExtraOptions>): TEntity | TEntity[] | undefined;

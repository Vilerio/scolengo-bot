import { ContextBuilder } from './context';
import { DocumentObject, SerializeOptions } from './types';
/**
 * Create a ContextBuilder, used to configure the transformation
 */
export declare function transform<TEntity, TExtraOptions = unknown>(): ContextBuilder<TEntity, TExtraOptions>;
/**
 * Serialize the entity
 *
 * @param data entity to be serialized
 * @param type type of the entity
 * @param options options used in the serialization
 */
export declare function serialize<TEntity, TExtraOptions = unknown>(data: TEntity, type: string, options?: SerializeOptions<TExtraOptions>): DocumentObject;

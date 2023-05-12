import { AttributesObject, Options } from './types';
export declare abstract class Transformer<TEntity, TExtraOptions> {
    type: string;
    relationships: TransformerRelationships<TEntity, TExtraOptions>;
    abstract transform(entity: TEntity, options: Options<TExtraOptions>): AttributesObject;
    constructor();
}
export type TransformerRelationships<TEntity, TExtraOptions> = Record<string, RelationshipTransformerInfoFunction<TEntity, TExtraOptions>>;
export type RelationshipTransformerInfoFunction<TEntity, TExtraOptions> = (entity: TEntity, options: Options<TExtraOptions>) => RelationshipTransformerInfo<TExtraOptions>;
export type RelationshipTransformerInfo<TExtraOptions, T = unknown> = {
    input: T;
    transformer: Transformer<T, TExtraOptions>;
    included: boolean;
};

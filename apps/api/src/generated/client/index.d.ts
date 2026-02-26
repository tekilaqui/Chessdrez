
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model PuzzleAttempt
 * 
 */
export type PuzzleAttempt = $Result.DefaultSelection<Prisma.$PuzzleAttemptPayload>
/**
 * Model Puzzle
 * 
 */
export type Puzzle = $Result.DefaultSelection<Prisma.$PuzzlePayload>
/**
 * Model Game
 * 
 */
export type Game = $Result.DefaultSelection<Prisma.$GamePayload>
/**
 * Model Move
 * 
 */
export type Move = $Result.DefaultSelection<Prisma.$MovePayload>
/**
 * Model Opening
 * 
 */
export type Opening = $Result.DefaultSelection<Prisma.$OpeningPayload>
/**
 * Model OpeningProgress
 * 
 */
export type OpeningProgress = $Result.DefaultSelection<Prisma.$OpeningProgressPayload>
/**
 * Model UserRepertoire
 * 
 */
export type UserRepertoire = $Result.DefaultSelection<Prisma.$UserRepertoirePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.puzzleAttempt`: Exposes CRUD operations for the **PuzzleAttempt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PuzzleAttempts
    * const puzzleAttempts = await prisma.puzzleAttempt.findMany()
    * ```
    */
  get puzzleAttempt(): Prisma.PuzzleAttemptDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.puzzle`: Exposes CRUD operations for the **Puzzle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Puzzles
    * const puzzles = await prisma.puzzle.findMany()
    * ```
    */
  get puzzle(): Prisma.PuzzleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.game`: Exposes CRUD operations for the **Game** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Games
    * const games = await prisma.game.findMany()
    * ```
    */
  get game(): Prisma.GameDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.move`: Exposes CRUD operations for the **Move** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Moves
    * const moves = await prisma.move.findMany()
    * ```
    */
  get move(): Prisma.MoveDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.opening`: Exposes CRUD operations for the **Opening** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Openings
    * const openings = await prisma.opening.findMany()
    * ```
    */
  get opening(): Prisma.OpeningDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.openingProgress`: Exposes CRUD operations for the **OpeningProgress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OpeningProgresses
    * const openingProgresses = await prisma.openingProgress.findMany()
    * ```
    */
  get openingProgress(): Prisma.OpeningProgressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userRepertoire`: Exposes CRUD operations for the **UserRepertoire** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserRepertoires
    * const userRepertoires = await prisma.userRepertoire.findMany()
    * ```
    */
  get userRepertoire(): Prisma.UserRepertoireDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.4.0
   * Query Engine version: ab56fe763f921d033a6c195e7ddeb3e255bdbb57
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    PuzzleAttempt: 'PuzzleAttempt',
    Puzzle: 'Puzzle',
    Game: 'Game',
    Move: 'Move',
    Opening: 'Opening',
    OpeningProgress: 'OpeningProgress',
    UserRepertoire: 'UserRepertoire'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "puzzleAttempt" | "puzzle" | "game" | "move" | "opening" | "openingProgress" | "userRepertoire"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      PuzzleAttempt: {
        payload: Prisma.$PuzzleAttemptPayload<ExtArgs>
        fields: Prisma.PuzzleAttemptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PuzzleAttemptFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PuzzleAttemptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PuzzleAttemptFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PuzzleAttemptPayload>
          }
          findFirst: {
            args: Prisma.PuzzleAttemptFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PuzzleAttemptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PuzzleAttemptFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PuzzleAttemptPayload>
          }
          findMany: {
            args: Prisma.PuzzleAttemptFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PuzzleAttemptPayload>[]
          }
          create: {
            args: Prisma.PuzzleAttemptCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PuzzleAttemptPayload>
          }
          createMany: {
            args: Prisma.PuzzleAttemptCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PuzzleAttemptCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PuzzleAttemptPayload>[]
          }
          delete: {
            args: Prisma.PuzzleAttemptDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PuzzleAttemptPayload>
          }
          update: {
            args: Prisma.PuzzleAttemptUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PuzzleAttemptPayload>
          }
          deleteMany: {
            args: Prisma.PuzzleAttemptDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PuzzleAttemptUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PuzzleAttemptUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PuzzleAttemptPayload>[]
          }
          upsert: {
            args: Prisma.PuzzleAttemptUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PuzzleAttemptPayload>
          }
          aggregate: {
            args: Prisma.PuzzleAttemptAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePuzzleAttempt>
          }
          groupBy: {
            args: Prisma.PuzzleAttemptGroupByArgs<ExtArgs>
            result: $Utils.Optional<PuzzleAttemptGroupByOutputType>[]
          }
          count: {
            args: Prisma.PuzzleAttemptCountArgs<ExtArgs>
            result: $Utils.Optional<PuzzleAttemptCountAggregateOutputType> | number
          }
        }
      }
      Puzzle: {
        payload: Prisma.$PuzzlePayload<ExtArgs>
        fields: Prisma.PuzzleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PuzzleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PuzzlePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PuzzleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PuzzlePayload>
          }
          findFirst: {
            args: Prisma.PuzzleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PuzzlePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PuzzleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PuzzlePayload>
          }
          findMany: {
            args: Prisma.PuzzleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PuzzlePayload>[]
          }
          create: {
            args: Prisma.PuzzleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PuzzlePayload>
          }
          createMany: {
            args: Prisma.PuzzleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PuzzleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PuzzlePayload>[]
          }
          delete: {
            args: Prisma.PuzzleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PuzzlePayload>
          }
          update: {
            args: Prisma.PuzzleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PuzzlePayload>
          }
          deleteMany: {
            args: Prisma.PuzzleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PuzzleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PuzzleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PuzzlePayload>[]
          }
          upsert: {
            args: Prisma.PuzzleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PuzzlePayload>
          }
          aggregate: {
            args: Prisma.PuzzleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePuzzle>
          }
          groupBy: {
            args: Prisma.PuzzleGroupByArgs<ExtArgs>
            result: $Utils.Optional<PuzzleGroupByOutputType>[]
          }
          count: {
            args: Prisma.PuzzleCountArgs<ExtArgs>
            result: $Utils.Optional<PuzzleCountAggregateOutputType> | number
          }
        }
      }
      Game: {
        payload: Prisma.$GamePayload<ExtArgs>
        fields: Prisma.GameFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          findFirst: {
            args: Prisma.GameFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          findMany: {
            args: Prisma.GameFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          create: {
            args: Prisma.GameCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          createMany: {
            args: Prisma.GameCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          delete: {
            args: Prisma.GameDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          update: {
            args: Prisma.GameUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          deleteMany: {
            args: Prisma.GameDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GameUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          upsert: {
            args: Prisma.GameUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          aggregate: {
            args: Prisma.GameAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGame>
          }
          groupBy: {
            args: Prisma.GameGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameCountArgs<ExtArgs>
            result: $Utils.Optional<GameCountAggregateOutputType> | number
          }
        }
      }
      Move: {
        payload: Prisma.$MovePayload<ExtArgs>
        fields: Prisma.MoveFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MoveFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MoveFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovePayload>
          }
          findFirst: {
            args: Prisma.MoveFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MoveFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovePayload>
          }
          findMany: {
            args: Prisma.MoveFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovePayload>[]
          }
          create: {
            args: Prisma.MoveCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovePayload>
          }
          createMany: {
            args: Prisma.MoveCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MoveCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovePayload>[]
          }
          delete: {
            args: Prisma.MoveDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovePayload>
          }
          update: {
            args: Prisma.MoveUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovePayload>
          }
          deleteMany: {
            args: Prisma.MoveDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MoveUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MoveUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovePayload>[]
          }
          upsert: {
            args: Prisma.MoveUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovePayload>
          }
          aggregate: {
            args: Prisma.MoveAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMove>
          }
          groupBy: {
            args: Prisma.MoveGroupByArgs<ExtArgs>
            result: $Utils.Optional<MoveGroupByOutputType>[]
          }
          count: {
            args: Prisma.MoveCountArgs<ExtArgs>
            result: $Utils.Optional<MoveCountAggregateOutputType> | number
          }
        }
      }
      Opening: {
        payload: Prisma.$OpeningPayload<ExtArgs>
        fields: Prisma.OpeningFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OpeningFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpeningPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OpeningFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpeningPayload>
          }
          findFirst: {
            args: Prisma.OpeningFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpeningPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OpeningFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpeningPayload>
          }
          findMany: {
            args: Prisma.OpeningFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpeningPayload>[]
          }
          create: {
            args: Prisma.OpeningCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpeningPayload>
          }
          createMany: {
            args: Prisma.OpeningCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OpeningCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpeningPayload>[]
          }
          delete: {
            args: Prisma.OpeningDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpeningPayload>
          }
          update: {
            args: Prisma.OpeningUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpeningPayload>
          }
          deleteMany: {
            args: Prisma.OpeningDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OpeningUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OpeningUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpeningPayload>[]
          }
          upsert: {
            args: Prisma.OpeningUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpeningPayload>
          }
          aggregate: {
            args: Prisma.OpeningAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOpening>
          }
          groupBy: {
            args: Prisma.OpeningGroupByArgs<ExtArgs>
            result: $Utils.Optional<OpeningGroupByOutputType>[]
          }
          count: {
            args: Prisma.OpeningCountArgs<ExtArgs>
            result: $Utils.Optional<OpeningCountAggregateOutputType> | number
          }
        }
      }
      OpeningProgress: {
        payload: Prisma.$OpeningProgressPayload<ExtArgs>
        fields: Prisma.OpeningProgressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OpeningProgressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpeningProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OpeningProgressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpeningProgressPayload>
          }
          findFirst: {
            args: Prisma.OpeningProgressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpeningProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OpeningProgressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpeningProgressPayload>
          }
          findMany: {
            args: Prisma.OpeningProgressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpeningProgressPayload>[]
          }
          create: {
            args: Prisma.OpeningProgressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpeningProgressPayload>
          }
          createMany: {
            args: Prisma.OpeningProgressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OpeningProgressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpeningProgressPayload>[]
          }
          delete: {
            args: Prisma.OpeningProgressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpeningProgressPayload>
          }
          update: {
            args: Prisma.OpeningProgressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpeningProgressPayload>
          }
          deleteMany: {
            args: Prisma.OpeningProgressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OpeningProgressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OpeningProgressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpeningProgressPayload>[]
          }
          upsert: {
            args: Prisma.OpeningProgressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpeningProgressPayload>
          }
          aggregate: {
            args: Prisma.OpeningProgressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOpeningProgress>
          }
          groupBy: {
            args: Prisma.OpeningProgressGroupByArgs<ExtArgs>
            result: $Utils.Optional<OpeningProgressGroupByOutputType>[]
          }
          count: {
            args: Prisma.OpeningProgressCountArgs<ExtArgs>
            result: $Utils.Optional<OpeningProgressCountAggregateOutputType> | number
          }
        }
      }
      UserRepertoire: {
        payload: Prisma.$UserRepertoirePayload<ExtArgs>
        fields: Prisma.UserRepertoireFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserRepertoireFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRepertoirePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserRepertoireFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRepertoirePayload>
          }
          findFirst: {
            args: Prisma.UserRepertoireFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRepertoirePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserRepertoireFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRepertoirePayload>
          }
          findMany: {
            args: Prisma.UserRepertoireFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRepertoirePayload>[]
          }
          create: {
            args: Prisma.UserRepertoireCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRepertoirePayload>
          }
          createMany: {
            args: Prisma.UserRepertoireCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserRepertoireCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRepertoirePayload>[]
          }
          delete: {
            args: Prisma.UserRepertoireDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRepertoirePayload>
          }
          update: {
            args: Prisma.UserRepertoireUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRepertoirePayload>
          }
          deleteMany: {
            args: Prisma.UserRepertoireDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserRepertoireUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserRepertoireUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRepertoirePayload>[]
          }
          upsert: {
            args: Prisma.UserRepertoireUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRepertoirePayload>
          }
          aggregate: {
            args: Prisma.UserRepertoireAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserRepertoire>
          }
          groupBy: {
            args: Prisma.UserRepertoireGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserRepertoireGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserRepertoireCountArgs<ExtArgs>
            result: $Utils.Optional<UserRepertoireCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    puzzleAttempt?: PuzzleAttemptOmit
    puzzle?: PuzzleOmit
    game?: GameOmit
    move?: MoveOmit
    opening?: OpeningOmit
    openingProgress?: OpeningProgressOmit
    userRepertoire?: UserRepertoireOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    gamesAsBlack: number
    gamesAsWhite: number
    puzzleAttempts: number
    openingProgress: number
    repertoire: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gamesAsBlack?: boolean | UserCountOutputTypeCountGamesAsBlackArgs
    gamesAsWhite?: boolean | UserCountOutputTypeCountGamesAsWhiteArgs
    puzzleAttempts?: boolean | UserCountOutputTypeCountPuzzleAttemptsArgs
    openingProgress?: boolean | UserCountOutputTypeCountOpeningProgressArgs
    repertoire?: boolean | UserCountOutputTypeCountRepertoireArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGamesAsBlackArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGamesAsWhiteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPuzzleAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PuzzleAttemptWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOpeningProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OpeningProgressWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRepertoireArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRepertoireWhereInput
  }


  /**
   * Count Type PuzzleCountOutputType
   */

  export type PuzzleCountOutputType = {
    attempts: number
  }

  export type PuzzleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attempts?: boolean | PuzzleCountOutputTypeCountAttemptsArgs
  }

  // Custom InputTypes
  /**
   * PuzzleCountOutputType without action
   */
  export type PuzzleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PuzzleCountOutputType
     */
    select?: PuzzleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PuzzleCountOutputType without action
   */
  export type PuzzleCountOutputTypeCountAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PuzzleAttemptWhereInput
  }


  /**
   * Count Type GameCountOutputType
   */

  export type GameCountOutputType = {
    moves: number
  }

  export type GameCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    moves?: boolean | GameCountOutputTypeCountMovesArgs
  }

  // Custom InputTypes
  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCountOutputType
     */
    select?: GameCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeCountMovesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MoveWhereInput
  }


  /**
   * Count Type OpeningCountOutputType
   */

  export type OpeningCountOutputType = {
    progress: number
    repertoire: number
  }

  export type OpeningCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    progress?: boolean | OpeningCountOutputTypeCountProgressArgs
    repertoire?: boolean | OpeningCountOutputTypeCountRepertoireArgs
  }

  // Custom InputTypes
  /**
   * OpeningCountOutputType without action
   */
  export type OpeningCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpeningCountOutputType
     */
    select?: OpeningCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OpeningCountOutputType without action
   */
  export type OpeningCountOutputTypeCountProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OpeningProgressWhereInput
  }

  /**
   * OpeningCountOutputType without action
   */
  export type OpeningCountOutputTypeCountRepertoireArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRepertoireWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    elo: number | null
    puzzleRating: number | null
    puzzleStreak: number | null
    puzzleSolved: number | null
    puzzleFailed: number | null
  }

  export type UserSumAggregateOutputType = {
    elo: number | null
    puzzleRating: number | null
    puzzleStreak: number | null
    puzzleSolved: number | null
    puzzleFailed: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    elo: number | null
    puzzleRating: number | null
    puzzleStreak: number | null
    puzzleSolved: number | null
    puzzleFailed: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    elo: number | null
    puzzleRating: number | null
    puzzleStreak: number | null
    puzzleSolved: number | null
    puzzleFailed: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    elo: number
    puzzleRating: number
    puzzleStreak: number
    puzzleSolved: number
    puzzleFailed: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    elo?: true
    puzzleRating?: true
    puzzleStreak?: true
    puzzleSolved?: true
    puzzleFailed?: true
  }

  export type UserSumAggregateInputType = {
    elo?: true
    puzzleRating?: true
    puzzleStreak?: true
    puzzleSolved?: true
    puzzleFailed?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    elo?: true
    puzzleRating?: true
    puzzleStreak?: true
    puzzleSolved?: true
    puzzleFailed?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    elo?: true
    puzzleRating?: true
    puzzleStreak?: true
    puzzleSolved?: true
    puzzleFailed?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    elo?: true
    puzzleRating?: true
    puzzleStreak?: true
    puzzleSolved?: true
    puzzleFailed?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    name: string | null
    elo: number
    puzzleRating: number
    puzzleStreak: number
    puzzleSolved: number
    puzzleFailed: number
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    elo?: boolean
    puzzleRating?: boolean
    puzzleStreak?: boolean
    puzzleSolved?: boolean
    puzzleFailed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    gamesAsBlack?: boolean | User$gamesAsBlackArgs<ExtArgs>
    gamesAsWhite?: boolean | User$gamesAsWhiteArgs<ExtArgs>
    puzzleAttempts?: boolean | User$puzzleAttemptsArgs<ExtArgs>
    openingProgress?: boolean | User$openingProgressArgs<ExtArgs>
    repertoire?: boolean | User$repertoireArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    elo?: boolean
    puzzleRating?: boolean
    puzzleStreak?: boolean
    puzzleSolved?: boolean
    puzzleFailed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    elo?: boolean
    puzzleRating?: boolean
    puzzleStreak?: boolean
    puzzleSolved?: boolean
    puzzleFailed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    elo?: boolean
    puzzleRating?: boolean
    puzzleStreak?: boolean
    puzzleSolved?: boolean
    puzzleFailed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "name" | "elo" | "puzzleRating" | "puzzleStreak" | "puzzleSolved" | "puzzleFailed" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gamesAsBlack?: boolean | User$gamesAsBlackArgs<ExtArgs>
    gamesAsWhite?: boolean | User$gamesAsWhiteArgs<ExtArgs>
    puzzleAttempts?: boolean | User$puzzleAttemptsArgs<ExtArgs>
    openingProgress?: boolean | User$openingProgressArgs<ExtArgs>
    repertoire?: boolean | User$repertoireArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      gamesAsBlack: Prisma.$GamePayload<ExtArgs>[]
      gamesAsWhite: Prisma.$GamePayload<ExtArgs>[]
      puzzleAttempts: Prisma.$PuzzleAttemptPayload<ExtArgs>[]
      openingProgress: Prisma.$OpeningProgressPayload<ExtArgs>[]
      repertoire: Prisma.$UserRepertoirePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      name: string | null
      elo: number
      puzzleRating: number
      puzzleStreak: number
      puzzleSolved: number
      puzzleFailed: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    gamesAsBlack<T extends User$gamesAsBlackArgs<ExtArgs> = {}>(args?: Subset<T, User$gamesAsBlackArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    gamesAsWhite<T extends User$gamesAsWhiteArgs<ExtArgs> = {}>(args?: Subset<T, User$gamesAsWhiteArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    puzzleAttempts<T extends User$puzzleAttemptsArgs<ExtArgs> = {}>(args?: Subset<T, User$puzzleAttemptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PuzzleAttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    openingProgress<T extends User$openingProgressArgs<ExtArgs> = {}>(args?: Subset<T, User$openingProgressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OpeningProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    repertoire<T extends User$repertoireArgs<ExtArgs> = {}>(args?: Subset<T, User$repertoireArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRepertoirePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly elo: FieldRef<"User", 'Int'>
    readonly puzzleRating: FieldRef<"User", 'Int'>
    readonly puzzleStreak: FieldRef<"User", 'Int'>
    readonly puzzleSolved: FieldRef<"User", 'Int'>
    readonly puzzleFailed: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.gamesAsBlack
   */
  export type User$gamesAsBlackArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    where?: GameWhereInput
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    cursor?: GameWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * User.gamesAsWhite
   */
  export type User$gamesAsWhiteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    where?: GameWhereInput
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    cursor?: GameWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * User.puzzleAttempts
   */
  export type User$puzzleAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PuzzleAttempt
     */
    select?: PuzzleAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PuzzleAttempt
     */
    omit?: PuzzleAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PuzzleAttemptInclude<ExtArgs> | null
    where?: PuzzleAttemptWhereInput
    orderBy?: PuzzleAttemptOrderByWithRelationInput | PuzzleAttemptOrderByWithRelationInput[]
    cursor?: PuzzleAttemptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PuzzleAttemptScalarFieldEnum | PuzzleAttemptScalarFieldEnum[]
  }

  /**
   * User.openingProgress
   */
  export type User$openingProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpeningProgress
     */
    select?: OpeningProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpeningProgress
     */
    omit?: OpeningProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpeningProgressInclude<ExtArgs> | null
    where?: OpeningProgressWhereInput
    orderBy?: OpeningProgressOrderByWithRelationInput | OpeningProgressOrderByWithRelationInput[]
    cursor?: OpeningProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OpeningProgressScalarFieldEnum | OpeningProgressScalarFieldEnum[]
  }

  /**
   * User.repertoire
   */
  export type User$repertoireArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRepertoire
     */
    select?: UserRepertoireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRepertoire
     */
    omit?: UserRepertoireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRepertoireInclude<ExtArgs> | null
    where?: UserRepertoireWhereInput
    orderBy?: UserRepertoireOrderByWithRelationInput | UserRepertoireOrderByWithRelationInput[]
    cursor?: UserRepertoireWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserRepertoireScalarFieldEnum | UserRepertoireScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model PuzzleAttempt
   */

  export type AggregatePuzzleAttempt = {
    _count: PuzzleAttemptCountAggregateOutputType | null
    _avg: PuzzleAttemptAvgAggregateOutputType | null
    _sum: PuzzleAttemptSumAggregateOutputType | null
    _min: PuzzleAttemptMinAggregateOutputType | null
    _max: PuzzleAttemptMaxAggregateOutputType | null
  }

  export type PuzzleAttemptAvgAggregateOutputType = {
    rating: number | null
    delta: number | null
  }

  export type PuzzleAttemptSumAggregateOutputType = {
    rating: number | null
    delta: number | null
  }

  export type PuzzleAttemptMinAggregateOutputType = {
    id: string | null
    userId: string | null
    puzzleId: string | null
    success: boolean | null
    rating: number | null
    delta: number | null
    createdAt: Date | null
  }

  export type PuzzleAttemptMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    puzzleId: string | null
    success: boolean | null
    rating: number | null
    delta: number | null
    createdAt: Date | null
  }

  export type PuzzleAttemptCountAggregateOutputType = {
    id: number
    userId: number
    puzzleId: number
    success: number
    rating: number
    delta: number
    createdAt: number
    _all: number
  }


  export type PuzzleAttemptAvgAggregateInputType = {
    rating?: true
    delta?: true
  }

  export type PuzzleAttemptSumAggregateInputType = {
    rating?: true
    delta?: true
  }

  export type PuzzleAttemptMinAggregateInputType = {
    id?: true
    userId?: true
    puzzleId?: true
    success?: true
    rating?: true
    delta?: true
    createdAt?: true
  }

  export type PuzzleAttemptMaxAggregateInputType = {
    id?: true
    userId?: true
    puzzleId?: true
    success?: true
    rating?: true
    delta?: true
    createdAt?: true
  }

  export type PuzzleAttemptCountAggregateInputType = {
    id?: true
    userId?: true
    puzzleId?: true
    success?: true
    rating?: true
    delta?: true
    createdAt?: true
    _all?: true
  }

  export type PuzzleAttemptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PuzzleAttempt to aggregate.
     */
    where?: PuzzleAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PuzzleAttempts to fetch.
     */
    orderBy?: PuzzleAttemptOrderByWithRelationInput | PuzzleAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PuzzleAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PuzzleAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PuzzleAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PuzzleAttempts
    **/
    _count?: true | PuzzleAttemptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PuzzleAttemptAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PuzzleAttemptSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PuzzleAttemptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PuzzleAttemptMaxAggregateInputType
  }

  export type GetPuzzleAttemptAggregateType<T extends PuzzleAttemptAggregateArgs> = {
        [P in keyof T & keyof AggregatePuzzleAttempt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePuzzleAttempt[P]>
      : GetScalarType<T[P], AggregatePuzzleAttempt[P]>
  }




  export type PuzzleAttemptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PuzzleAttemptWhereInput
    orderBy?: PuzzleAttemptOrderByWithAggregationInput | PuzzleAttemptOrderByWithAggregationInput[]
    by: PuzzleAttemptScalarFieldEnum[] | PuzzleAttemptScalarFieldEnum
    having?: PuzzleAttemptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PuzzleAttemptCountAggregateInputType | true
    _avg?: PuzzleAttemptAvgAggregateInputType
    _sum?: PuzzleAttemptSumAggregateInputType
    _min?: PuzzleAttemptMinAggregateInputType
    _max?: PuzzleAttemptMaxAggregateInputType
  }

  export type PuzzleAttemptGroupByOutputType = {
    id: string
    userId: string
    puzzleId: string
    success: boolean
    rating: number
    delta: number
    createdAt: Date
    _count: PuzzleAttemptCountAggregateOutputType | null
    _avg: PuzzleAttemptAvgAggregateOutputType | null
    _sum: PuzzleAttemptSumAggregateOutputType | null
    _min: PuzzleAttemptMinAggregateOutputType | null
    _max: PuzzleAttemptMaxAggregateOutputType | null
  }

  type GetPuzzleAttemptGroupByPayload<T extends PuzzleAttemptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PuzzleAttemptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PuzzleAttemptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PuzzleAttemptGroupByOutputType[P]>
            : GetScalarType<T[P], PuzzleAttemptGroupByOutputType[P]>
        }
      >
    >


  export type PuzzleAttemptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    puzzleId?: boolean
    success?: boolean
    rating?: boolean
    delta?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    puzzle?: boolean | PuzzleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["puzzleAttempt"]>

  export type PuzzleAttemptSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    puzzleId?: boolean
    success?: boolean
    rating?: boolean
    delta?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    puzzle?: boolean | PuzzleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["puzzleAttempt"]>

  export type PuzzleAttemptSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    puzzleId?: boolean
    success?: boolean
    rating?: boolean
    delta?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    puzzle?: boolean | PuzzleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["puzzleAttempt"]>

  export type PuzzleAttemptSelectScalar = {
    id?: boolean
    userId?: boolean
    puzzleId?: boolean
    success?: boolean
    rating?: boolean
    delta?: boolean
    createdAt?: boolean
  }

  export type PuzzleAttemptOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "puzzleId" | "success" | "rating" | "delta" | "createdAt", ExtArgs["result"]["puzzleAttempt"]>
  export type PuzzleAttemptInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    puzzle?: boolean | PuzzleDefaultArgs<ExtArgs>
  }
  export type PuzzleAttemptIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    puzzle?: boolean | PuzzleDefaultArgs<ExtArgs>
  }
  export type PuzzleAttemptIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    puzzle?: boolean | PuzzleDefaultArgs<ExtArgs>
  }

  export type $PuzzleAttemptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PuzzleAttempt"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      puzzle: Prisma.$PuzzlePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      puzzleId: string
      success: boolean
      rating: number
      delta: number
      createdAt: Date
    }, ExtArgs["result"]["puzzleAttempt"]>
    composites: {}
  }

  type PuzzleAttemptGetPayload<S extends boolean | null | undefined | PuzzleAttemptDefaultArgs> = $Result.GetResult<Prisma.$PuzzleAttemptPayload, S>

  type PuzzleAttemptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PuzzleAttemptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PuzzleAttemptCountAggregateInputType | true
    }

  export interface PuzzleAttemptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PuzzleAttempt'], meta: { name: 'PuzzleAttempt' } }
    /**
     * Find zero or one PuzzleAttempt that matches the filter.
     * @param {PuzzleAttemptFindUniqueArgs} args - Arguments to find a PuzzleAttempt
     * @example
     * // Get one PuzzleAttempt
     * const puzzleAttempt = await prisma.puzzleAttempt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PuzzleAttemptFindUniqueArgs>(args: SelectSubset<T, PuzzleAttemptFindUniqueArgs<ExtArgs>>): Prisma__PuzzleAttemptClient<$Result.GetResult<Prisma.$PuzzleAttemptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PuzzleAttempt that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PuzzleAttemptFindUniqueOrThrowArgs} args - Arguments to find a PuzzleAttempt
     * @example
     * // Get one PuzzleAttempt
     * const puzzleAttempt = await prisma.puzzleAttempt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PuzzleAttemptFindUniqueOrThrowArgs>(args: SelectSubset<T, PuzzleAttemptFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PuzzleAttemptClient<$Result.GetResult<Prisma.$PuzzleAttemptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PuzzleAttempt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PuzzleAttemptFindFirstArgs} args - Arguments to find a PuzzleAttempt
     * @example
     * // Get one PuzzleAttempt
     * const puzzleAttempt = await prisma.puzzleAttempt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PuzzleAttemptFindFirstArgs>(args?: SelectSubset<T, PuzzleAttemptFindFirstArgs<ExtArgs>>): Prisma__PuzzleAttemptClient<$Result.GetResult<Prisma.$PuzzleAttemptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PuzzleAttempt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PuzzleAttemptFindFirstOrThrowArgs} args - Arguments to find a PuzzleAttempt
     * @example
     * // Get one PuzzleAttempt
     * const puzzleAttempt = await prisma.puzzleAttempt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PuzzleAttemptFindFirstOrThrowArgs>(args?: SelectSubset<T, PuzzleAttemptFindFirstOrThrowArgs<ExtArgs>>): Prisma__PuzzleAttemptClient<$Result.GetResult<Prisma.$PuzzleAttemptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PuzzleAttempts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PuzzleAttemptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PuzzleAttempts
     * const puzzleAttempts = await prisma.puzzleAttempt.findMany()
     * 
     * // Get first 10 PuzzleAttempts
     * const puzzleAttempts = await prisma.puzzleAttempt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const puzzleAttemptWithIdOnly = await prisma.puzzleAttempt.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PuzzleAttemptFindManyArgs>(args?: SelectSubset<T, PuzzleAttemptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PuzzleAttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PuzzleAttempt.
     * @param {PuzzleAttemptCreateArgs} args - Arguments to create a PuzzleAttempt.
     * @example
     * // Create one PuzzleAttempt
     * const PuzzleAttempt = await prisma.puzzleAttempt.create({
     *   data: {
     *     // ... data to create a PuzzleAttempt
     *   }
     * })
     * 
     */
    create<T extends PuzzleAttemptCreateArgs>(args: SelectSubset<T, PuzzleAttemptCreateArgs<ExtArgs>>): Prisma__PuzzleAttemptClient<$Result.GetResult<Prisma.$PuzzleAttemptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PuzzleAttempts.
     * @param {PuzzleAttemptCreateManyArgs} args - Arguments to create many PuzzleAttempts.
     * @example
     * // Create many PuzzleAttempts
     * const puzzleAttempt = await prisma.puzzleAttempt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PuzzleAttemptCreateManyArgs>(args?: SelectSubset<T, PuzzleAttemptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PuzzleAttempts and returns the data saved in the database.
     * @param {PuzzleAttemptCreateManyAndReturnArgs} args - Arguments to create many PuzzleAttempts.
     * @example
     * // Create many PuzzleAttempts
     * const puzzleAttempt = await prisma.puzzleAttempt.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PuzzleAttempts and only return the `id`
     * const puzzleAttemptWithIdOnly = await prisma.puzzleAttempt.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PuzzleAttemptCreateManyAndReturnArgs>(args?: SelectSubset<T, PuzzleAttemptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PuzzleAttemptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PuzzleAttempt.
     * @param {PuzzleAttemptDeleteArgs} args - Arguments to delete one PuzzleAttempt.
     * @example
     * // Delete one PuzzleAttempt
     * const PuzzleAttempt = await prisma.puzzleAttempt.delete({
     *   where: {
     *     // ... filter to delete one PuzzleAttempt
     *   }
     * })
     * 
     */
    delete<T extends PuzzleAttemptDeleteArgs>(args: SelectSubset<T, PuzzleAttemptDeleteArgs<ExtArgs>>): Prisma__PuzzleAttemptClient<$Result.GetResult<Prisma.$PuzzleAttemptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PuzzleAttempt.
     * @param {PuzzleAttemptUpdateArgs} args - Arguments to update one PuzzleAttempt.
     * @example
     * // Update one PuzzleAttempt
     * const puzzleAttempt = await prisma.puzzleAttempt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PuzzleAttemptUpdateArgs>(args: SelectSubset<T, PuzzleAttemptUpdateArgs<ExtArgs>>): Prisma__PuzzleAttemptClient<$Result.GetResult<Prisma.$PuzzleAttemptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PuzzleAttempts.
     * @param {PuzzleAttemptDeleteManyArgs} args - Arguments to filter PuzzleAttempts to delete.
     * @example
     * // Delete a few PuzzleAttempts
     * const { count } = await prisma.puzzleAttempt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PuzzleAttemptDeleteManyArgs>(args?: SelectSubset<T, PuzzleAttemptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PuzzleAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PuzzleAttemptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PuzzleAttempts
     * const puzzleAttempt = await prisma.puzzleAttempt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PuzzleAttemptUpdateManyArgs>(args: SelectSubset<T, PuzzleAttemptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PuzzleAttempts and returns the data updated in the database.
     * @param {PuzzleAttemptUpdateManyAndReturnArgs} args - Arguments to update many PuzzleAttempts.
     * @example
     * // Update many PuzzleAttempts
     * const puzzleAttempt = await prisma.puzzleAttempt.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PuzzleAttempts and only return the `id`
     * const puzzleAttemptWithIdOnly = await prisma.puzzleAttempt.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PuzzleAttemptUpdateManyAndReturnArgs>(args: SelectSubset<T, PuzzleAttemptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PuzzleAttemptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PuzzleAttempt.
     * @param {PuzzleAttemptUpsertArgs} args - Arguments to update or create a PuzzleAttempt.
     * @example
     * // Update or create a PuzzleAttempt
     * const puzzleAttempt = await prisma.puzzleAttempt.upsert({
     *   create: {
     *     // ... data to create a PuzzleAttempt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PuzzleAttempt we want to update
     *   }
     * })
     */
    upsert<T extends PuzzleAttemptUpsertArgs>(args: SelectSubset<T, PuzzleAttemptUpsertArgs<ExtArgs>>): Prisma__PuzzleAttemptClient<$Result.GetResult<Prisma.$PuzzleAttemptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PuzzleAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PuzzleAttemptCountArgs} args - Arguments to filter PuzzleAttempts to count.
     * @example
     * // Count the number of PuzzleAttempts
     * const count = await prisma.puzzleAttempt.count({
     *   where: {
     *     // ... the filter for the PuzzleAttempts we want to count
     *   }
     * })
    **/
    count<T extends PuzzleAttemptCountArgs>(
      args?: Subset<T, PuzzleAttemptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PuzzleAttemptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PuzzleAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PuzzleAttemptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PuzzleAttemptAggregateArgs>(args: Subset<T, PuzzleAttemptAggregateArgs>): Prisma.PrismaPromise<GetPuzzleAttemptAggregateType<T>>

    /**
     * Group by PuzzleAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PuzzleAttemptGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PuzzleAttemptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PuzzleAttemptGroupByArgs['orderBy'] }
        : { orderBy?: PuzzleAttemptGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PuzzleAttemptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPuzzleAttemptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PuzzleAttempt model
   */
  readonly fields: PuzzleAttemptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PuzzleAttempt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PuzzleAttemptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    puzzle<T extends PuzzleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PuzzleDefaultArgs<ExtArgs>>): Prisma__PuzzleClient<$Result.GetResult<Prisma.$PuzzlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PuzzleAttempt model
   */
  interface PuzzleAttemptFieldRefs {
    readonly id: FieldRef<"PuzzleAttempt", 'String'>
    readonly userId: FieldRef<"PuzzleAttempt", 'String'>
    readonly puzzleId: FieldRef<"PuzzleAttempt", 'String'>
    readonly success: FieldRef<"PuzzleAttempt", 'Boolean'>
    readonly rating: FieldRef<"PuzzleAttempt", 'Int'>
    readonly delta: FieldRef<"PuzzleAttempt", 'Int'>
    readonly createdAt: FieldRef<"PuzzleAttempt", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PuzzleAttempt findUnique
   */
  export type PuzzleAttemptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PuzzleAttempt
     */
    select?: PuzzleAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PuzzleAttempt
     */
    omit?: PuzzleAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PuzzleAttemptInclude<ExtArgs> | null
    /**
     * Filter, which PuzzleAttempt to fetch.
     */
    where: PuzzleAttemptWhereUniqueInput
  }

  /**
   * PuzzleAttempt findUniqueOrThrow
   */
  export type PuzzleAttemptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PuzzleAttempt
     */
    select?: PuzzleAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PuzzleAttempt
     */
    omit?: PuzzleAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PuzzleAttemptInclude<ExtArgs> | null
    /**
     * Filter, which PuzzleAttempt to fetch.
     */
    where: PuzzleAttemptWhereUniqueInput
  }

  /**
   * PuzzleAttempt findFirst
   */
  export type PuzzleAttemptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PuzzleAttempt
     */
    select?: PuzzleAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PuzzleAttempt
     */
    omit?: PuzzleAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PuzzleAttemptInclude<ExtArgs> | null
    /**
     * Filter, which PuzzleAttempt to fetch.
     */
    where?: PuzzleAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PuzzleAttempts to fetch.
     */
    orderBy?: PuzzleAttemptOrderByWithRelationInput | PuzzleAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PuzzleAttempts.
     */
    cursor?: PuzzleAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PuzzleAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PuzzleAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PuzzleAttempts.
     */
    distinct?: PuzzleAttemptScalarFieldEnum | PuzzleAttemptScalarFieldEnum[]
  }

  /**
   * PuzzleAttempt findFirstOrThrow
   */
  export type PuzzleAttemptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PuzzleAttempt
     */
    select?: PuzzleAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PuzzleAttempt
     */
    omit?: PuzzleAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PuzzleAttemptInclude<ExtArgs> | null
    /**
     * Filter, which PuzzleAttempt to fetch.
     */
    where?: PuzzleAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PuzzleAttempts to fetch.
     */
    orderBy?: PuzzleAttemptOrderByWithRelationInput | PuzzleAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PuzzleAttempts.
     */
    cursor?: PuzzleAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PuzzleAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PuzzleAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PuzzleAttempts.
     */
    distinct?: PuzzleAttemptScalarFieldEnum | PuzzleAttemptScalarFieldEnum[]
  }

  /**
   * PuzzleAttempt findMany
   */
  export type PuzzleAttemptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PuzzleAttempt
     */
    select?: PuzzleAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PuzzleAttempt
     */
    omit?: PuzzleAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PuzzleAttemptInclude<ExtArgs> | null
    /**
     * Filter, which PuzzleAttempts to fetch.
     */
    where?: PuzzleAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PuzzleAttempts to fetch.
     */
    orderBy?: PuzzleAttemptOrderByWithRelationInput | PuzzleAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PuzzleAttempts.
     */
    cursor?: PuzzleAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PuzzleAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PuzzleAttempts.
     */
    skip?: number
    distinct?: PuzzleAttemptScalarFieldEnum | PuzzleAttemptScalarFieldEnum[]
  }

  /**
   * PuzzleAttempt create
   */
  export type PuzzleAttemptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PuzzleAttempt
     */
    select?: PuzzleAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PuzzleAttempt
     */
    omit?: PuzzleAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PuzzleAttemptInclude<ExtArgs> | null
    /**
     * The data needed to create a PuzzleAttempt.
     */
    data: XOR<PuzzleAttemptCreateInput, PuzzleAttemptUncheckedCreateInput>
  }

  /**
   * PuzzleAttempt createMany
   */
  export type PuzzleAttemptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PuzzleAttempts.
     */
    data: PuzzleAttemptCreateManyInput | PuzzleAttemptCreateManyInput[]
  }

  /**
   * PuzzleAttempt createManyAndReturn
   */
  export type PuzzleAttemptCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PuzzleAttempt
     */
    select?: PuzzleAttemptSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PuzzleAttempt
     */
    omit?: PuzzleAttemptOmit<ExtArgs> | null
    /**
     * The data used to create many PuzzleAttempts.
     */
    data: PuzzleAttemptCreateManyInput | PuzzleAttemptCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PuzzleAttemptIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PuzzleAttempt update
   */
  export type PuzzleAttemptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PuzzleAttempt
     */
    select?: PuzzleAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PuzzleAttempt
     */
    omit?: PuzzleAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PuzzleAttemptInclude<ExtArgs> | null
    /**
     * The data needed to update a PuzzleAttempt.
     */
    data: XOR<PuzzleAttemptUpdateInput, PuzzleAttemptUncheckedUpdateInput>
    /**
     * Choose, which PuzzleAttempt to update.
     */
    where: PuzzleAttemptWhereUniqueInput
  }

  /**
   * PuzzleAttempt updateMany
   */
  export type PuzzleAttemptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PuzzleAttempts.
     */
    data: XOR<PuzzleAttemptUpdateManyMutationInput, PuzzleAttemptUncheckedUpdateManyInput>
    /**
     * Filter which PuzzleAttempts to update
     */
    where?: PuzzleAttemptWhereInput
    /**
     * Limit how many PuzzleAttempts to update.
     */
    limit?: number
  }

  /**
   * PuzzleAttempt updateManyAndReturn
   */
  export type PuzzleAttemptUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PuzzleAttempt
     */
    select?: PuzzleAttemptSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PuzzleAttempt
     */
    omit?: PuzzleAttemptOmit<ExtArgs> | null
    /**
     * The data used to update PuzzleAttempts.
     */
    data: XOR<PuzzleAttemptUpdateManyMutationInput, PuzzleAttemptUncheckedUpdateManyInput>
    /**
     * Filter which PuzzleAttempts to update
     */
    where?: PuzzleAttemptWhereInput
    /**
     * Limit how many PuzzleAttempts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PuzzleAttemptIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PuzzleAttempt upsert
   */
  export type PuzzleAttemptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PuzzleAttempt
     */
    select?: PuzzleAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PuzzleAttempt
     */
    omit?: PuzzleAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PuzzleAttemptInclude<ExtArgs> | null
    /**
     * The filter to search for the PuzzleAttempt to update in case it exists.
     */
    where: PuzzleAttemptWhereUniqueInput
    /**
     * In case the PuzzleAttempt found by the `where` argument doesn't exist, create a new PuzzleAttempt with this data.
     */
    create: XOR<PuzzleAttemptCreateInput, PuzzleAttemptUncheckedCreateInput>
    /**
     * In case the PuzzleAttempt was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PuzzleAttemptUpdateInput, PuzzleAttemptUncheckedUpdateInput>
  }

  /**
   * PuzzleAttempt delete
   */
  export type PuzzleAttemptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PuzzleAttempt
     */
    select?: PuzzleAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PuzzleAttempt
     */
    omit?: PuzzleAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PuzzleAttemptInclude<ExtArgs> | null
    /**
     * Filter which PuzzleAttempt to delete.
     */
    where: PuzzleAttemptWhereUniqueInput
  }

  /**
   * PuzzleAttempt deleteMany
   */
  export type PuzzleAttemptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PuzzleAttempts to delete
     */
    where?: PuzzleAttemptWhereInput
    /**
     * Limit how many PuzzleAttempts to delete.
     */
    limit?: number
  }

  /**
   * PuzzleAttempt without action
   */
  export type PuzzleAttemptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PuzzleAttempt
     */
    select?: PuzzleAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PuzzleAttempt
     */
    omit?: PuzzleAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PuzzleAttemptInclude<ExtArgs> | null
  }


  /**
   * Model Puzzle
   */

  export type AggregatePuzzle = {
    _count: PuzzleCountAggregateOutputType | null
    _avg: PuzzleAvgAggregateOutputType | null
    _sum: PuzzleSumAggregateOutputType | null
    _min: PuzzleMinAggregateOutputType | null
    _max: PuzzleMaxAggregateOutputType | null
  }

  export type PuzzleAvgAggregateOutputType = {
    rating: number | null
    ratingDeviation: number | null
  }

  export type PuzzleSumAggregateOutputType = {
    rating: number | null
    ratingDeviation: number | null
  }

  export type PuzzleMinAggregateOutputType = {
    id: string | null
    fen: string | null
    solution: string | null
    rating: number | null
    ratingDeviation: number | null
    themes: string | null
    createdAt: Date | null
  }

  export type PuzzleMaxAggregateOutputType = {
    id: string | null
    fen: string | null
    solution: string | null
    rating: number | null
    ratingDeviation: number | null
    themes: string | null
    createdAt: Date | null
  }

  export type PuzzleCountAggregateOutputType = {
    id: number
    fen: number
    solution: number
    rating: number
    ratingDeviation: number
    themes: number
    createdAt: number
    _all: number
  }


  export type PuzzleAvgAggregateInputType = {
    rating?: true
    ratingDeviation?: true
  }

  export type PuzzleSumAggregateInputType = {
    rating?: true
    ratingDeviation?: true
  }

  export type PuzzleMinAggregateInputType = {
    id?: true
    fen?: true
    solution?: true
    rating?: true
    ratingDeviation?: true
    themes?: true
    createdAt?: true
  }

  export type PuzzleMaxAggregateInputType = {
    id?: true
    fen?: true
    solution?: true
    rating?: true
    ratingDeviation?: true
    themes?: true
    createdAt?: true
  }

  export type PuzzleCountAggregateInputType = {
    id?: true
    fen?: true
    solution?: true
    rating?: true
    ratingDeviation?: true
    themes?: true
    createdAt?: true
    _all?: true
  }

  export type PuzzleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Puzzle to aggregate.
     */
    where?: PuzzleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Puzzles to fetch.
     */
    orderBy?: PuzzleOrderByWithRelationInput | PuzzleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PuzzleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Puzzles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Puzzles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Puzzles
    **/
    _count?: true | PuzzleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PuzzleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PuzzleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PuzzleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PuzzleMaxAggregateInputType
  }

  export type GetPuzzleAggregateType<T extends PuzzleAggregateArgs> = {
        [P in keyof T & keyof AggregatePuzzle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePuzzle[P]>
      : GetScalarType<T[P], AggregatePuzzle[P]>
  }




  export type PuzzleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PuzzleWhereInput
    orderBy?: PuzzleOrderByWithAggregationInput | PuzzleOrderByWithAggregationInput[]
    by: PuzzleScalarFieldEnum[] | PuzzleScalarFieldEnum
    having?: PuzzleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PuzzleCountAggregateInputType | true
    _avg?: PuzzleAvgAggregateInputType
    _sum?: PuzzleSumAggregateInputType
    _min?: PuzzleMinAggregateInputType
    _max?: PuzzleMaxAggregateInputType
  }

  export type PuzzleGroupByOutputType = {
    id: string
    fen: string
    solution: string
    rating: number
    ratingDeviation: number
    themes: string
    createdAt: Date
    _count: PuzzleCountAggregateOutputType | null
    _avg: PuzzleAvgAggregateOutputType | null
    _sum: PuzzleSumAggregateOutputType | null
    _min: PuzzleMinAggregateOutputType | null
    _max: PuzzleMaxAggregateOutputType | null
  }

  type GetPuzzleGroupByPayload<T extends PuzzleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PuzzleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PuzzleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PuzzleGroupByOutputType[P]>
            : GetScalarType<T[P], PuzzleGroupByOutputType[P]>
        }
      >
    >


  export type PuzzleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fen?: boolean
    solution?: boolean
    rating?: boolean
    ratingDeviation?: boolean
    themes?: boolean
    createdAt?: boolean
    attempts?: boolean | Puzzle$attemptsArgs<ExtArgs>
    _count?: boolean | PuzzleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["puzzle"]>

  export type PuzzleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fen?: boolean
    solution?: boolean
    rating?: boolean
    ratingDeviation?: boolean
    themes?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["puzzle"]>

  export type PuzzleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fen?: boolean
    solution?: boolean
    rating?: boolean
    ratingDeviation?: boolean
    themes?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["puzzle"]>

  export type PuzzleSelectScalar = {
    id?: boolean
    fen?: boolean
    solution?: boolean
    rating?: boolean
    ratingDeviation?: boolean
    themes?: boolean
    createdAt?: boolean
  }

  export type PuzzleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fen" | "solution" | "rating" | "ratingDeviation" | "themes" | "createdAt", ExtArgs["result"]["puzzle"]>
  export type PuzzleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attempts?: boolean | Puzzle$attemptsArgs<ExtArgs>
    _count?: boolean | PuzzleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PuzzleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PuzzleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PuzzlePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Puzzle"
    objects: {
      attempts: Prisma.$PuzzleAttemptPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fen: string
      solution: string
      rating: number
      ratingDeviation: number
      themes: string
      createdAt: Date
    }, ExtArgs["result"]["puzzle"]>
    composites: {}
  }

  type PuzzleGetPayload<S extends boolean | null | undefined | PuzzleDefaultArgs> = $Result.GetResult<Prisma.$PuzzlePayload, S>

  type PuzzleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PuzzleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PuzzleCountAggregateInputType | true
    }

  export interface PuzzleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Puzzle'], meta: { name: 'Puzzle' } }
    /**
     * Find zero or one Puzzle that matches the filter.
     * @param {PuzzleFindUniqueArgs} args - Arguments to find a Puzzle
     * @example
     * // Get one Puzzle
     * const puzzle = await prisma.puzzle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PuzzleFindUniqueArgs>(args: SelectSubset<T, PuzzleFindUniqueArgs<ExtArgs>>): Prisma__PuzzleClient<$Result.GetResult<Prisma.$PuzzlePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Puzzle that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PuzzleFindUniqueOrThrowArgs} args - Arguments to find a Puzzle
     * @example
     * // Get one Puzzle
     * const puzzle = await prisma.puzzle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PuzzleFindUniqueOrThrowArgs>(args: SelectSubset<T, PuzzleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PuzzleClient<$Result.GetResult<Prisma.$PuzzlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Puzzle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PuzzleFindFirstArgs} args - Arguments to find a Puzzle
     * @example
     * // Get one Puzzle
     * const puzzle = await prisma.puzzle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PuzzleFindFirstArgs>(args?: SelectSubset<T, PuzzleFindFirstArgs<ExtArgs>>): Prisma__PuzzleClient<$Result.GetResult<Prisma.$PuzzlePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Puzzle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PuzzleFindFirstOrThrowArgs} args - Arguments to find a Puzzle
     * @example
     * // Get one Puzzle
     * const puzzle = await prisma.puzzle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PuzzleFindFirstOrThrowArgs>(args?: SelectSubset<T, PuzzleFindFirstOrThrowArgs<ExtArgs>>): Prisma__PuzzleClient<$Result.GetResult<Prisma.$PuzzlePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Puzzles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PuzzleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Puzzles
     * const puzzles = await prisma.puzzle.findMany()
     * 
     * // Get first 10 Puzzles
     * const puzzles = await prisma.puzzle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const puzzleWithIdOnly = await prisma.puzzle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PuzzleFindManyArgs>(args?: SelectSubset<T, PuzzleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PuzzlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Puzzle.
     * @param {PuzzleCreateArgs} args - Arguments to create a Puzzle.
     * @example
     * // Create one Puzzle
     * const Puzzle = await prisma.puzzle.create({
     *   data: {
     *     // ... data to create a Puzzle
     *   }
     * })
     * 
     */
    create<T extends PuzzleCreateArgs>(args: SelectSubset<T, PuzzleCreateArgs<ExtArgs>>): Prisma__PuzzleClient<$Result.GetResult<Prisma.$PuzzlePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Puzzles.
     * @param {PuzzleCreateManyArgs} args - Arguments to create many Puzzles.
     * @example
     * // Create many Puzzles
     * const puzzle = await prisma.puzzle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PuzzleCreateManyArgs>(args?: SelectSubset<T, PuzzleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Puzzles and returns the data saved in the database.
     * @param {PuzzleCreateManyAndReturnArgs} args - Arguments to create many Puzzles.
     * @example
     * // Create many Puzzles
     * const puzzle = await prisma.puzzle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Puzzles and only return the `id`
     * const puzzleWithIdOnly = await prisma.puzzle.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PuzzleCreateManyAndReturnArgs>(args?: SelectSubset<T, PuzzleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PuzzlePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Puzzle.
     * @param {PuzzleDeleteArgs} args - Arguments to delete one Puzzle.
     * @example
     * // Delete one Puzzle
     * const Puzzle = await prisma.puzzle.delete({
     *   where: {
     *     // ... filter to delete one Puzzle
     *   }
     * })
     * 
     */
    delete<T extends PuzzleDeleteArgs>(args: SelectSubset<T, PuzzleDeleteArgs<ExtArgs>>): Prisma__PuzzleClient<$Result.GetResult<Prisma.$PuzzlePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Puzzle.
     * @param {PuzzleUpdateArgs} args - Arguments to update one Puzzle.
     * @example
     * // Update one Puzzle
     * const puzzle = await prisma.puzzle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PuzzleUpdateArgs>(args: SelectSubset<T, PuzzleUpdateArgs<ExtArgs>>): Prisma__PuzzleClient<$Result.GetResult<Prisma.$PuzzlePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Puzzles.
     * @param {PuzzleDeleteManyArgs} args - Arguments to filter Puzzles to delete.
     * @example
     * // Delete a few Puzzles
     * const { count } = await prisma.puzzle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PuzzleDeleteManyArgs>(args?: SelectSubset<T, PuzzleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Puzzles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PuzzleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Puzzles
     * const puzzle = await prisma.puzzle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PuzzleUpdateManyArgs>(args: SelectSubset<T, PuzzleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Puzzles and returns the data updated in the database.
     * @param {PuzzleUpdateManyAndReturnArgs} args - Arguments to update many Puzzles.
     * @example
     * // Update many Puzzles
     * const puzzle = await prisma.puzzle.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Puzzles and only return the `id`
     * const puzzleWithIdOnly = await prisma.puzzle.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PuzzleUpdateManyAndReturnArgs>(args: SelectSubset<T, PuzzleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PuzzlePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Puzzle.
     * @param {PuzzleUpsertArgs} args - Arguments to update or create a Puzzle.
     * @example
     * // Update or create a Puzzle
     * const puzzle = await prisma.puzzle.upsert({
     *   create: {
     *     // ... data to create a Puzzle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Puzzle we want to update
     *   }
     * })
     */
    upsert<T extends PuzzleUpsertArgs>(args: SelectSubset<T, PuzzleUpsertArgs<ExtArgs>>): Prisma__PuzzleClient<$Result.GetResult<Prisma.$PuzzlePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Puzzles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PuzzleCountArgs} args - Arguments to filter Puzzles to count.
     * @example
     * // Count the number of Puzzles
     * const count = await prisma.puzzle.count({
     *   where: {
     *     // ... the filter for the Puzzles we want to count
     *   }
     * })
    **/
    count<T extends PuzzleCountArgs>(
      args?: Subset<T, PuzzleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PuzzleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Puzzle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PuzzleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PuzzleAggregateArgs>(args: Subset<T, PuzzleAggregateArgs>): Prisma.PrismaPromise<GetPuzzleAggregateType<T>>

    /**
     * Group by Puzzle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PuzzleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PuzzleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PuzzleGroupByArgs['orderBy'] }
        : { orderBy?: PuzzleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PuzzleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPuzzleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Puzzle model
   */
  readonly fields: PuzzleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Puzzle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PuzzleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attempts<T extends Puzzle$attemptsArgs<ExtArgs> = {}>(args?: Subset<T, Puzzle$attemptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PuzzleAttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Puzzle model
   */
  interface PuzzleFieldRefs {
    readonly id: FieldRef<"Puzzle", 'String'>
    readonly fen: FieldRef<"Puzzle", 'String'>
    readonly solution: FieldRef<"Puzzle", 'String'>
    readonly rating: FieldRef<"Puzzle", 'Int'>
    readonly ratingDeviation: FieldRef<"Puzzle", 'Int'>
    readonly themes: FieldRef<"Puzzle", 'String'>
    readonly createdAt: FieldRef<"Puzzle", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Puzzle findUnique
   */
  export type PuzzleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Puzzle
     */
    select?: PuzzleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Puzzle
     */
    omit?: PuzzleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PuzzleInclude<ExtArgs> | null
    /**
     * Filter, which Puzzle to fetch.
     */
    where: PuzzleWhereUniqueInput
  }

  /**
   * Puzzle findUniqueOrThrow
   */
  export type PuzzleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Puzzle
     */
    select?: PuzzleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Puzzle
     */
    omit?: PuzzleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PuzzleInclude<ExtArgs> | null
    /**
     * Filter, which Puzzle to fetch.
     */
    where: PuzzleWhereUniqueInput
  }

  /**
   * Puzzle findFirst
   */
  export type PuzzleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Puzzle
     */
    select?: PuzzleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Puzzle
     */
    omit?: PuzzleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PuzzleInclude<ExtArgs> | null
    /**
     * Filter, which Puzzle to fetch.
     */
    where?: PuzzleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Puzzles to fetch.
     */
    orderBy?: PuzzleOrderByWithRelationInput | PuzzleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Puzzles.
     */
    cursor?: PuzzleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Puzzles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Puzzles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Puzzles.
     */
    distinct?: PuzzleScalarFieldEnum | PuzzleScalarFieldEnum[]
  }

  /**
   * Puzzle findFirstOrThrow
   */
  export type PuzzleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Puzzle
     */
    select?: PuzzleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Puzzle
     */
    omit?: PuzzleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PuzzleInclude<ExtArgs> | null
    /**
     * Filter, which Puzzle to fetch.
     */
    where?: PuzzleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Puzzles to fetch.
     */
    orderBy?: PuzzleOrderByWithRelationInput | PuzzleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Puzzles.
     */
    cursor?: PuzzleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Puzzles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Puzzles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Puzzles.
     */
    distinct?: PuzzleScalarFieldEnum | PuzzleScalarFieldEnum[]
  }

  /**
   * Puzzle findMany
   */
  export type PuzzleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Puzzle
     */
    select?: PuzzleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Puzzle
     */
    omit?: PuzzleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PuzzleInclude<ExtArgs> | null
    /**
     * Filter, which Puzzles to fetch.
     */
    where?: PuzzleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Puzzles to fetch.
     */
    orderBy?: PuzzleOrderByWithRelationInput | PuzzleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Puzzles.
     */
    cursor?: PuzzleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Puzzles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Puzzles.
     */
    skip?: number
    distinct?: PuzzleScalarFieldEnum | PuzzleScalarFieldEnum[]
  }

  /**
   * Puzzle create
   */
  export type PuzzleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Puzzle
     */
    select?: PuzzleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Puzzle
     */
    omit?: PuzzleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PuzzleInclude<ExtArgs> | null
    /**
     * The data needed to create a Puzzle.
     */
    data: XOR<PuzzleCreateInput, PuzzleUncheckedCreateInput>
  }

  /**
   * Puzzle createMany
   */
  export type PuzzleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Puzzles.
     */
    data: PuzzleCreateManyInput | PuzzleCreateManyInput[]
  }

  /**
   * Puzzle createManyAndReturn
   */
  export type PuzzleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Puzzle
     */
    select?: PuzzleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Puzzle
     */
    omit?: PuzzleOmit<ExtArgs> | null
    /**
     * The data used to create many Puzzles.
     */
    data: PuzzleCreateManyInput | PuzzleCreateManyInput[]
  }

  /**
   * Puzzle update
   */
  export type PuzzleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Puzzle
     */
    select?: PuzzleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Puzzle
     */
    omit?: PuzzleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PuzzleInclude<ExtArgs> | null
    /**
     * The data needed to update a Puzzle.
     */
    data: XOR<PuzzleUpdateInput, PuzzleUncheckedUpdateInput>
    /**
     * Choose, which Puzzle to update.
     */
    where: PuzzleWhereUniqueInput
  }

  /**
   * Puzzle updateMany
   */
  export type PuzzleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Puzzles.
     */
    data: XOR<PuzzleUpdateManyMutationInput, PuzzleUncheckedUpdateManyInput>
    /**
     * Filter which Puzzles to update
     */
    where?: PuzzleWhereInput
    /**
     * Limit how many Puzzles to update.
     */
    limit?: number
  }

  /**
   * Puzzle updateManyAndReturn
   */
  export type PuzzleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Puzzle
     */
    select?: PuzzleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Puzzle
     */
    omit?: PuzzleOmit<ExtArgs> | null
    /**
     * The data used to update Puzzles.
     */
    data: XOR<PuzzleUpdateManyMutationInput, PuzzleUncheckedUpdateManyInput>
    /**
     * Filter which Puzzles to update
     */
    where?: PuzzleWhereInput
    /**
     * Limit how many Puzzles to update.
     */
    limit?: number
  }

  /**
   * Puzzle upsert
   */
  export type PuzzleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Puzzle
     */
    select?: PuzzleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Puzzle
     */
    omit?: PuzzleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PuzzleInclude<ExtArgs> | null
    /**
     * The filter to search for the Puzzle to update in case it exists.
     */
    where: PuzzleWhereUniqueInput
    /**
     * In case the Puzzle found by the `where` argument doesn't exist, create a new Puzzle with this data.
     */
    create: XOR<PuzzleCreateInput, PuzzleUncheckedCreateInput>
    /**
     * In case the Puzzle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PuzzleUpdateInput, PuzzleUncheckedUpdateInput>
  }

  /**
   * Puzzle delete
   */
  export type PuzzleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Puzzle
     */
    select?: PuzzleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Puzzle
     */
    omit?: PuzzleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PuzzleInclude<ExtArgs> | null
    /**
     * Filter which Puzzle to delete.
     */
    where: PuzzleWhereUniqueInput
  }

  /**
   * Puzzle deleteMany
   */
  export type PuzzleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Puzzles to delete
     */
    where?: PuzzleWhereInput
    /**
     * Limit how many Puzzles to delete.
     */
    limit?: number
  }

  /**
   * Puzzle.attempts
   */
  export type Puzzle$attemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PuzzleAttempt
     */
    select?: PuzzleAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PuzzleAttempt
     */
    omit?: PuzzleAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PuzzleAttemptInclude<ExtArgs> | null
    where?: PuzzleAttemptWhereInput
    orderBy?: PuzzleAttemptOrderByWithRelationInput | PuzzleAttemptOrderByWithRelationInput[]
    cursor?: PuzzleAttemptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PuzzleAttemptScalarFieldEnum | PuzzleAttemptScalarFieldEnum[]
  }

  /**
   * Puzzle without action
   */
  export type PuzzleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Puzzle
     */
    select?: PuzzleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Puzzle
     */
    omit?: PuzzleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PuzzleInclude<ExtArgs> | null
  }


  /**
   * Model Game
   */

  export type AggregateGame = {
    _count: GameCountAggregateOutputType | null
    _avg: GameAvgAggregateOutputType | null
    _sum: GameSumAggregateOutputType | null
    _min: GameMinAggregateOutputType | null
    _max: GameMaxAggregateOutputType | null
  }

  export type GameAvgAggregateOutputType = {
    aiLevel: number | null
  }

  export type GameSumAggregateOutputType = {
    aiLevel: number | null
  }

  export type GameMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    whitePlayerId: string | null
    blackPlayerId: string | null
    pgn: string | null
    fen: string | null
    result: string | null
    status: string | null
    source: string | null
    aiLevel: number | null
    timeControl: string | null
  }

  export type GameMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    whitePlayerId: string | null
    blackPlayerId: string | null
    pgn: string | null
    fen: string | null
    result: string | null
    status: string | null
    source: string | null
    aiLevel: number | null
    timeControl: string | null
  }

  export type GameCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    whitePlayerId: number
    blackPlayerId: number
    pgn: number
    fen: number
    result: number
    status: number
    source: number
    aiLevel: number
    timeControl: number
    _all: number
  }


  export type GameAvgAggregateInputType = {
    aiLevel?: true
  }

  export type GameSumAggregateInputType = {
    aiLevel?: true
  }

  export type GameMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    whitePlayerId?: true
    blackPlayerId?: true
    pgn?: true
    fen?: true
    result?: true
    status?: true
    source?: true
    aiLevel?: true
    timeControl?: true
  }

  export type GameMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    whitePlayerId?: true
    blackPlayerId?: true
    pgn?: true
    fen?: true
    result?: true
    status?: true
    source?: true
    aiLevel?: true
    timeControl?: true
  }

  export type GameCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    whitePlayerId?: true
    blackPlayerId?: true
    pgn?: true
    fen?: true
    result?: true
    status?: true
    source?: true
    aiLevel?: true
    timeControl?: true
    _all?: true
  }

  export type GameAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Game to aggregate.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Games
    **/
    _count?: true | GameCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GameAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GameSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameMaxAggregateInputType
  }

  export type GetGameAggregateType<T extends GameAggregateArgs> = {
        [P in keyof T & keyof AggregateGame]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGame[P]>
      : GetScalarType<T[P], AggregateGame[P]>
  }




  export type GameGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameWhereInput
    orderBy?: GameOrderByWithAggregationInput | GameOrderByWithAggregationInput[]
    by: GameScalarFieldEnum[] | GameScalarFieldEnum
    having?: GameScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameCountAggregateInputType | true
    _avg?: GameAvgAggregateInputType
    _sum?: GameSumAggregateInputType
    _min?: GameMinAggregateInputType
    _max?: GameMaxAggregateInputType
  }

  export type GameGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    whitePlayerId: string | null
    blackPlayerId: string | null
    pgn: string | null
    fen: string
    result: string | null
    status: string
    source: string | null
    aiLevel: number | null
    timeControl: string | null
    _count: GameCountAggregateOutputType | null
    _avg: GameAvgAggregateOutputType | null
    _sum: GameSumAggregateOutputType | null
    _min: GameMinAggregateOutputType | null
    _max: GameMaxAggregateOutputType | null
  }

  type GetGameGroupByPayload<T extends GameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameGroupByOutputType[P]>
            : GetScalarType<T[P], GameGroupByOutputType[P]>
        }
      >
    >


  export type GameSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    whitePlayerId?: boolean
    blackPlayerId?: boolean
    pgn?: boolean
    fen?: boolean
    result?: boolean
    status?: boolean
    source?: boolean
    aiLevel?: boolean
    timeControl?: boolean
    blackPlayer?: boolean | Game$blackPlayerArgs<ExtArgs>
    whitePlayer?: boolean | Game$whitePlayerArgs<ExtArgs>
    moves?: boolean | Game$movesArgs<ExtArgs>
    _count?: boolean | GameCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["game"]>

  export type GameSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    whitePlayerId?: boolean
    blackPlayerId?: boolean
    pgn?: boolean
    fen?: boolean
    result?: boolean
    status?: boolean
    source?: boolean
    aiLevel?: boolean
    timeControl?: boolean
    blackPlayer?: boolean | Game$blackPlayerArgs<ExtArgs>
    whitePlayer?: boolean | Game$whitePlayerArgs<ExtArgs>
  }, ExtArgs["result"]["game"]>

  export type GameSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    whitePlayerId?: boolean
    blackPlayerId?: boolean
    pgn?: boolean
    fen?: boolean
    result?: boolean
    status?: boolean
    source?: boolean
    aiLevel?: boolean
    timeControl?: boolean
    blackPlayer?: boolean | Game$blackPlayerArgs<ExtArgs>
    whitePlayer?: boolean | Game$whitePlayerArgs<ExtArgs>
  }, ExtArgs["result"]["game"]>

  export type GameSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    whitePlayerId?: boolean
    blackPlayerId?: boolean
    pgn?: boolean
    fen?: boolean
    result?: boolean
    status?: boolean
    source?: boolean
    aiLevel?: boolean
    timeControl?: boolean
  }

  export type GameOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "whitePlayerId" | "blackPlayerId" | "pgn" | "fen" | "result" | "status" | "source" | "aiLevel" | "timeControl", ExtArgs["result"]["game"]>
  export type GameInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    blackPlayer?: boolean | Game$blackPlayerArgs<ExtArgs>
    whitePlayer?: boolean | Game$whitePlayerArgs<ExtArgs>
    moves?: boolean | Game$movesArgs<ExtArgs>
    _count?: boolean | GameCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GameIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    blackPlayer?: boolean | Game$blackPlayerArgs<ExtArgs>
    whitePlayer?: boolean | Game$whitePlayerArgs<ExtArgs>
  }
  export type GameIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    blackPlayer?: boolean | Game$blackPlayerArgs<ExtArgs>
    whitePlayer?: boolean | Game$whitePlayerArgs<ExtArgs>
  }

  export type $GamePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Game"
    objects: {
      blackPlayer: Prisma.$UserPayload<ExtArgs> | null
      whitePlayer: Prisma.$UserPayload<ExtArgs> | null
      moves: Prisma.$MovePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      whitePlayerId: string | null
      blackPlayerId: string | null
      pgn: string | null
      fen: string
      result: string | null
      status: string
      source: string | null
      aiLevel: number | null
      timeControl: string | null
    }, ExtArgs["result"]["game"]>
    composites: {}
  }

  type GameGetPayload<S extends boolean | null | undefined | GameDefaultArgs> = $Result.GetResult<Prisma.$GamePayload, S>

  type GameCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GameFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GameCountAggregateInputType | true
    }

  export interface GameDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Game'], meta: { name: 'Game' } }
    /**
     * Find zero or one Game that matches the filter.
     * @param {GameFindUniqueArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameFindUniqueArgs>(args: SelectSubset<T, GameFindUniqueArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Game that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GameFindUniqueOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameFindUniqueOrThrowArgs>(args: SelectSubset<T, GameFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Game that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameFindFirstArgs>(args?: SelectSubset<T, GameFindFirstArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Game that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameFindFirstOrThrowArgs>(args?: SelectSubset<T, GameFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Games that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Games
     * const games = await prisma.game.findMany()
     * 
     * // Get first 10 Games
     * const games = await prisma.game.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameWithIdOnly = await prisma.game.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameFindManyArgs>(args?: SelectSubset<T, GameFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Game.
     * @param {GameCreateArgs} args - Arguments to create a Game.
     * @example
     * // Create one Game
     * const Game = await prisma.game.create({
     *   data: {
     *     // ... data to create a Game
     *   }
     * })
     * 
     */
    create<T extends GameCreateArgs>(args: SelectSubset<T, GameCreateArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Games.
     * @param {GameCreateManyArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameCreateManyArgs>(args?: SelectSubset<T, GameCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Games and returns the data saved in the database.
     * @param {GameCreateManyAndReturnArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Games and only return the `id`
     * const gameWithIdOnly = await prisma.game.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameCreateManyAndReturnArgs>(args?: SelectSubset<T, GameCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Game.
     * @param {GameDeleteArgs} args - Arguments to delete one Game.
     * @example
     * // Delete one Game
     * const Game = await prisma.game.delete({
     *   where: {
     *     // ... filter to delete one Game
     *   }
     * })
     * 
     */
    delete<T extends GameDeleteArgs>(args: SelectSubset<T, GameDeleteArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Game.
     * @param {GameUpdateArgs} args - Arguments to update one Game.
     * @example
     * // Update one Game
     * const game = await prisma.game.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameUpdateArgs>(args: SelectSubset<T, GameUpdateArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Games.
     * @param {GameDeleteManyArgs} args - Arguments to filter Games to delete.
     * @example
     * // Delete a few Games
     * const { count } = await prisma.game.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameDeleteManyArgs>(args?: SelectSubset<T, GameDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Games
     * const game = await prisma.game.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameUpdateManyArgs>(args: SelectSubset<T, GameUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Games and returns the data updated in the database.
     * @param {GameUpdateManyAndReturnArgs} args - Arguments to update many Games.
     * @example
     * // Update many Games
     * const game = await prisma.game.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Games and only return the `id`
     * const gameWithIdOnly = await prisma.game.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GameUpdateManyAndReturnArgs>(args: SelectSubset<T, GameUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Game.
     * @param {GameUpsertArgs} args - Arguments to update or create a Game.
     * @example
     * // Update or create a Game
     * const game = await prisma.game.upsert({
     *   create: {
     *     // ... data to create a Game
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Game we want to update
     *   }
     * })
     */
    upsert<T extends GameUpsertArgs>(args: SelectSubset<T, GameUpsertArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCountArgs} args - Arguments to filter Games to count.
     * @example
     * // Count the number of Games
     * const count = await prisma.game.count({
     *   where: {
     *     // ... the filter for the Games we want to count
     *   }
     * })
    **/
    count<T extends GameCountArgs>(
      args?: Subset<T, GameCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GameAggregateArgs>(args: Subset<T, GameAggregateArgs>): Prisma.PrismaPromise<GetGameAggregateType<T>>

    /**
     * Group by Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameGroupByArgs['orderBy'] }
        : { orderBy?: GameGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GameGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Game model
   */
  readonly fields: GameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Game.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    blackPlayer<T extends Game$blackPlayerArgs<ExtArgs> = {}>(args?: Subset<T, Game$blackPlayerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    whitePlayer<T extends Game$whitePlayerArgs<ExtArgs> = {}>(args?: Subset<T, Game$whitePlayerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    moves<T extends Game$movesArgs<ExtArgs> = {}>(args?: Subset<T, Game$movesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Game model
   */
  interface GameFieldRefs {
    readonly id: FieldRef<"Game", 'String'>
    readonly createdAt: FieldRef<"Game", 'DateTime'>
    readonly updatedAt: FieldRef<"Game", 'DateTime'>
    readonly whitePlayerId: FieldRef<"Game", 'String'>
    readonly blackPlayerId: FieldRef<"Game", 'String'>
    readonly pgn: FieldRef<"Game", 'String'>
    readonly fen: FieldRef<"Game", 'String'>
    readonly result: FieldRef<"Game", 'String'>
    readonly status: FieldRef<"Game", 'String'>
    readonly source: FieldRef<"Game", 'String'>
    readonly aiLevel: FieldRef<"Game", 'Int'>
    readonly timeControl: FieldRef<"Game", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Game findUnique
   */
  export type GameFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game findUniqueOrThrow
   */
  export type GameFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game findFirst
   */
  export type GameFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game findFirstOrThrow
   */
  export type GameFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game findMany
   */
  export type GameFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Games to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game create
   */
  export type GameCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The data needed to create a Game.
     */
    data: XOR<GameCreateInput, GameUncheckedCreateInput>
  }

  /**
   * Game createMany
   */
  export type GameCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[]
  }

  /**
   * Game createManyAndReturn
   */
  export type GameCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Game update
   */
  export type GameUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The data needed to update a Game.
     */
    data: XOR<GameUpdateInput, GameUncheckedUpdateInput>
    /**
     * Choose, which Game to update.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game updateMany
   */
  export type GameUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Games.
     */
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyInput>
    /**
     * Filter which Games to update
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to update.
     */
    limit?: number
  }

  /**
   * Game updateManyAndReturn
   */
  export type GameUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * The data used to update Games.
     */
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyInput>
    /**
     * Filter which Games to update
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Game upsert
   */
  export type GameUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The filter to search for the Game to update in case it exists.
     */
    where: GameWhereUniqueInput
    /**
     * In case the Game found by the `where` argument doesn't exist, create a new Game with this data.
     */
    create: XOR<GameCreateInput, GameUncheckedCreateInput>
    /**
     * In case the Game was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameUpdateInput, GameUncheckedUpdateInput>
  }

  /**
   * Game delete
   */
  export type GameDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter which Game to delete.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game deleteMany
   */
  export type GameDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Games to delete
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to delete.
     */
    limit?: number
  }

  /**
   * Game.blackPlayer
   */
  export type Game$blackPlayerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Game.whitePlayer
   */
  export type Game$whitePlayerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Game.moves
   */
  export type Game$movesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Move
     */
    select?: MoveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Move
     */
    omit?: MoveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoveInclude<ExtArgs> | null
    where?: MoveWhereInput
    orderBy?: MoveOrderByWithRelationInput | MoveOrderByWithRelationInput[]
    cursor?: MoveWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MoveScalarFieldEnum | MoveScalarFieldEnum[]
  }

  /**
   * Game without action
   */
  export type GameDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
  }


  /**
   * Model Move
   */

  export type AggregateMove = {
    _count: MoveCountAggregateOutputType | null
    _avg: MoveAvgAggregateOutputType | null
    _sum: MoveSumAggregateOutputType | null
    _min: MoveMinAggregateOutputType | null
    _max: MoveMaxAggregateOutputType | null
  }

  export type MoveAvgAggregateOutputType = {
    ply: number | null
    evalBefore: number | null
    evalAfter: number | null
    delta: number | null
  }

  export type MoveSumAggregateOutputType = {
    ply: number | null
    evalBefore: number | null
    evalAfter: number | null
    delta: number | null
  }

  export type MoveMinAggregateOutputType = {
    id: string | null
    gameId: string | null
    ply: number | null
    fen: string | null
    san: string | null
    uci: string | null
    evalBefore: number | null
    evalAfter: number | null
    delta: number | null
    classification: string | null
    createdAt: Date | null
  }

  export type MoveMaxAggregateOutputType = {
    id: string | null
    gameId: string | null
    ply: number | null
    fen: string | null
    san: string | null
    uci: string | null
    evalBefore: number | null
    evalAfter: number | null
    delta: number | null
    classification: string | null
    createdAt: Date | null
  }

  export type MoveCountAggregateOutputType = {
    id: number
    gameId: number
    ply: number
    fen: number
    san: number
    uci: number
    evalBefore: number
    evalAfter: number
    delta: number
    classification: number
    createdAt: number
    _all: number
  }


  export type MoveAvgAggregateInputType = {
    ply?: true
    evalBefore?: true
    evalAfter?: true
    delta?: true
  }

  export type MoveSumAggregateInputType = {
    ply?: true
    evalBefore?: true
    evalAfter?: true
    delta?: true
  }

  export type MoveMinAggregateInputType = {
    id?: true
    gameId?: true
    ply?: true
    fen?: true
    san?: true
    uci?: true
    evalBefore?: true
    evalAfter?: true
    delta?: true
    classification?: true
    createdAt?: true
  }

  export type MoveMaxAggregateInputType = {
    id?: true
    gameId?: true
    ply?: true
    fen?: true
    san?: true
    uci?: true
    evalBefore?: true
    evalAfter?: true
    delta?: true
    classification?: true
    createdAt?: true
  }

  export type MoveCountAggregateInputType = {
    id?: true
    gameId?: true
    ply?: true
    fen?: true
    san?: true
    uci?: true
    evalBefore?: true
    evalAfter?: true
    delta?: true
    classification?: true
    createdAt?: true
    _all?: true
  }

  export type MoveAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Move to aggregate.
     */
    where?: MoveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Moves to fetch.
     */
    orderBy?: MoveOrderByWithRelationInput | MoveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MoveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Moves from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Moves.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Moves
    **/
    _count?: true | MoveCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MoveAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MoveSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MoveMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MoveMaxAggregateInputType
  }

  export type GetMoveAggregateType<T extends MoveAggregateArgs> = {
        [P in keyof T & keyof AggregateMove]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMove[P]>
      : GetScalarType<T[P], AggregateMove[P]>
  }




  export type MoveGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MoveWhereInput
    orderBy?: MoveOrderByWithAggregationInput | MoveOrderByWithAggregationInput[]
    by: MoveScalarFieldEnum[] | MoveScalarFieldEnum
    having?: MoveScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MoveCountAggregateInputType | true
    _avg?: MoveAvgAggregateInputType
    _sum?: MoveSumAggregateInputType
    _min?: MoveMinAggregateInputType
    _max?: MoveMaxAggregateInputType
  }

  export type MoveGroupByOutputType = {
    id: string
    gameId: string
    ply: number
    fen: string
    san: string | null
    uci: string | null
    evalBefore: number | null
    evalAfter: number | null
    delta: number | null
    classification: string | null
    createdAt: Date
    _count: MoveCountAggregateOutputType | null
    _avg: MoveAvgAggregateOutputType | null
    _sum: MoveSumAggregateOutputType | null
    _min: MoveMinAggregateOutputType | null
    _max: MoveMaxAggregateOutputType | null
  }

  type GetMoveGroupByPayload<T extends MoveGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MoveGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MoveGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MoveGroupByOutputType[P]>
            : GetScalarType<T[P], MoveGroupByOutputType[P]>
        }
      >
    >


  export type MoveSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    ply?: boolean
    fen?: boolean
    san?: boolean
    uci?: boolean
    evalBefore?: boolean
    evalAfter?: boolean
    delta?: boolean
    classification?: boolean
    createdAt?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["move"]>

  export type MoveSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    ply?: boolean
    fen?: boolean
    san?: boolean
    uci?: boolean
    evalBefore?: boolean
    evalAfter?: boolean
    delta?: boolean
    classification?: boolean
    createdAt?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["move"]>

  export type MoveSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    ply?: boolean
    fen?: boolean
    san?: boolean
    uci?: boolean
    evalBefore?: boolean
    evalAfter?: boolean
    delta?: boolean
    classification?: boolean
    createdAt?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["move"]>

  export type MoveSelectScalar = {
    id?: boolean
    gameId?: boolean
    ply?: boolean
    fen?: boolean
    san?: boolean
    uci?: boolean
    evalBefore?: boolean
    evalAfter?: boolean
    delta?: boolean
    classification?: boolean
    createdAt?: boolean
  }

  export type MoveOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "gameId" | "ply" | "fen" | "san" | "uci" | "evalBefore" | "evalAfter" | "delta" | "classification" | "createdAt", ExtArgs["result"]["move"]>
  export type MoveInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
  }
  export type MoveIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
  }
  export type MoveIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
  }

  export type $MovePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Move"
    objects: {
      game: Prisma.$GamePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      gameId: string
      ply: number
      fen: string
      san: string | null
      uci: string | null
      evalBefore: number | null
      evalAfter: number | null
      delta: number | null
      classification: string | null
      createdAt: Date
    }, ExtArgs["result"]["move"]>
    composites: {}
  }

  type MoveGetPayload<S extends boolean | null | undefined | MoveDefaultArgs> = $Result.GetResult<Prisma.$MovePayload, S>

  type MoveCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MoveFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MoveCountAggregateInputType | true
    }

  export interface MoveDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Move'], meta: { name: 'Move' } }
    /**
     * Find zero or one Move that matches the filter.
     * @param {MoveFindUniqueArgs} args - Arguments to find a Move
     * @example
     * // Get one Move
     * const move = await prisma.move.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MoveFindUniqueArgs>(args: SelectSubset<T, MoveFindUniqueArgs<ExtArgs>>): Prisma__MoveClient<$Result.GetResult<Prisma.$MovePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Move that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MoveFindUniqueOrThrowArgs} args - Arguments to find a Move
     * @example
     * // Get one Move
     * const move = await prisma.move.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MoveFindUniqueOrThrowArgs>(args: SelectSubset<T, MoveFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MoveClient<$Result.GetResult<Prisma.$MovePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Move that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoveFindFirstArgs} args - Arguments to find a Move
     * @example
     * // Get one Move
     * const move = await prisma.move.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MoveFindFirstArgs>(args?: SelectSubset<T, MoveFindFirstArgs<ExtArgs>>): Prisma__MoveClient<$Result.GetResult<Prisma.$MovePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Move that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoveFindFirstOrThrowArgs} args - Arguments to find a Move
     * @example
     * // Get one Move
     * const move = await prisma.move.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MoveFindFirstOrThrowArgs>(args?: SelectSubset<T, MoveFindFirstOrThrowArgs<ExtArgs>>): Prisma__MoveClient<$Result.GetResult<Prisma.$MovePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Moves that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoveFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Moves
     * const moves = await prisma.move.findMany()
     * 
     * // Get first 10 Moves
     * const moves = await prisma.move.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const moveWithIdOnly = await prisma.move.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MoveFindManyArgs>(args?: SelectSubset<T, MoveFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Move.
     * @param {MoveCreateArgs} args - Arguments to create a Move.
     * @example
     * // Create one Move
     * const Move = await prisma.move.create({
     *   data: {
     *     // ... data to create a Move
     *   }
     * })
     * 
     */
    create<T extends MoveCreateArgs>(args: SelectSubset<T, MoveCreateArgs<ExtArgs>>): Prisma__MoveClient<$Result.GetResult<Prisma.$MovePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Moves.
     * @param {MoveCreateManyArgs} args - Arguments to create many Moves.
     * @example
     * // Create many Moves
     * const move = await prisma.move.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MoveCreateManyArgs>(args?: SelectSubset<T, MoveCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Moves and returns the data saved in the database.
     * @param {MoveCreateManyAndReturnArgs} args - Arguments to create many Moves.
     * @example
     * // Create many Moves
     * const move = await prisma.move.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Moves and only return the `id`
     * const moveWithIdOnly = await prisma.move.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MoveCreateManyAndReturnArgs>(args?: SelectSubset<T, MoveCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Move.
     * @param {MoveDeleteArgs} args - Arguments to delete one Move.
     * @example
     * // Delete one Move
     * const Move = await prisma.move.delete({
     *   where: {
     *     // ... filter to delete one Move
     *   }
     * })
     * 
     */
    delete<T extends MoveDeleteArgs>(args: SelectSubset<T, MoveDeleteArgs<ExtArgs>>): Prisma__MoveClient<$Result.GetResult<Prisma.$MovePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Move.
     * @param {MoveUpdateArgs} args - Arguments to update one Move.
     * @example
     * // Update one Move
     * const move = await prisma.move.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MoveUpdateArgs>(args: SelectSubset<T, MoveUpdateArgs<ExtArgs>>): Prisma__MoveClient<$Result.GetResult<Prisma.$MovePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Moves.
     * @param {MoveDeleteManyArgs} args - Arguments to filter Moves to delete.
     * @example
     * // Delete a few Moves
     * const { count } = await prisma.move.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MoveDeleteManyArgs>(args?: SelectSubset<T, MoveDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Moves.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoveUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Moves
     * const move = await prisma.move.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MoveUpdateManyArgs>(args: SelectSubset<T, MoveUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Moves and returns the data updated in the database.
     * @param {MoveUpdateManyAndReturnArgs} args - Arguments to update many Moves.
     * @example
     * // Update many Moves
     * const move = await prisma.move.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Moves and only return the `id`
     * const moveWithIdOnly = await prisma.move.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MoveUpdateManyAndReturnArgs>(args: SelectSubset<T, MoveUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Move.
     * @param {MoveUpsertArgs} args - Arguments to update or create a Move.
     * @example
     * // Update or create a Move
     * const move = await prisma.move.upsert({
     *   create: {
     *     // ... data to create a Move
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Move we want to update
     *   }
     * })
     */
    upsert<T extends MoveUpsertArgs>(args: SelectSubset<T, MoveUpsertArgs<ExtArgs>>): Prisma__MoveClient<$Result.GetResult<Prisma.$MovePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Moves.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoveCountArgs} args - Arguments to filter Moves to count.
     * @example
     * // Count the number of Moves
     * const count = await prisma.move.count({
     *   where: {
     *     // ... the filter for the Moves we want to count
     *   }
     * })
    **/
    count<T extends MoveCountArgs>(
      args?: Subset<T, MoveCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MoveCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Move.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoveAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MoveAggregateArgs>(args: Subset<T, MoveAggregateArgs>): Prisma.PrismaPromise<GetMoveAggregateType<T>>

    /**
     * Group by Move.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoveGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MoveGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MoveGroupByArgs['orderBy'] }
        : { orderBy?: MoveGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MoveGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMoveGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Move model
   */
  readonly fields: MoveFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Move.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MoveClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    game<T extends GameDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GameDefaultArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Move model
   */
  interface MoveFieldRefs {
    readonly id: FieldRef<"Move", 'String'>
    readonly gameId: FieldRef<"Move", 'String'>
    readonly ply: FieldRef<"Move", 'Int'>
    readonly fen: FieldRef<"Move", 'String'>
    readonly san: FieldRef<"Move", 'String'>
    readonly uci: FieldRef<"Move", 'String'>
    readonly evalBefore: FieldRef<"Move", 'Float'>
    readonly evalAfter: FieldRef<"Move", 'Float'>
    readonly delta: FieldRef<"Move", 'Float'>
    readonly classification: FieldRef<"Move", 'String'>
    readonly createdAt: FieldRef<"Move", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Move findUnique
   */
  export type MoveFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Move
     */
    select?: MoveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Move
     */
    omit?: MoveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoveInclude<ExtArgs> | null
    /**
     * Filter, which Move to fetch.
     */
    where: MoveWhereUniqueInput
  }

  /**
   * Move findUniqueOrThrow
   */
  export type MoveFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Move
     */
    select?: MoveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Move
     */
    omit?: MoveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoveInclude<ExtArgs> | null
    /**
     * Filter, which Move to fetch.
     */
    where: MoveWhereUniqueInput
  }

  /**
   * Move findFirst
   */
  export type MoveFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Move
     */
    select?: MoveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Move
     */
    omit?: MoveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoveInclude<ExtArgs> | null
    /**
     * Filter, which Move to fetch.
     */
    where?: MoveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Moves to fetch.
     */
    orderBy?: MoveOrderByWithRelationInput | MoveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Moves.
     */
    cursor?: MoveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Moves from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Moves.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Moves.
     */
    distinct?: MoveScalarFieldEnum | MoveScalarFieldEnum[]
  }

  /**
   * Move findFirstOrThrow
   */
  export type MoveFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Move
     */
    select?: MoveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Move
     */
    omit?: MoveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoveInclude<ExtArgs> | null
    /**
     * Filter, which Move to fetch.
     */
    where?: MoveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Moves to fetch.
     */
    orderBy?: MoveOrderByWithRelationInput | MoveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Moves.
     */
    cursor?: MoveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Moves from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Moves.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Moves.
     */
    distinct?: MoveScalarFieldEnum | MoveScalarFieldEnum[]
  }

  /**
   * Move findMany
   */
  export type MoveFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Move
     */
    select?: MoveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Move
     */
    omit?: MoveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoveInclude<ExtArgs> | null
    /**
     * Filter, which Moves to fetch.
     */
    where?: MoveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Moves to fetch.
     */
    orderBy?: MoveOrderByWithRelationInput | MoveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Moves.
     */
    cursor?: MoveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Moves from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Moves.
     */
    skip?: number
    distinct?: MoveScalarFieldEnum | MoveScalarFieldEnum[]
  }

  /**
   * Move create
   */
  export type MoveCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Move
     */
    select?: MoveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Move
     */
    omit?: MoveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoveInclude<ExtArgs> | null
    /**
     * The data needed to create a Move.
     */
    data: XOR<MoveCreateInput, MoveUncheckedCreateInput>
  }

  /**
   * Move createMany
   */
  export type MoveCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Moves.
     */
    data: MoveCreateManyInput | MoveCreateManyInput[]
  }

  /**
   * Move createManyAndReturn
   */
  export type MoveCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Move
     */
    select?: MoveSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Move
     */
    omit?: MoveOmit<ExtArgs> | null
    /**
     * The data used to create many Moves.
     */
    data: MoveCreateManyInput | MoveCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoveIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Move update
   */
  export type MoveUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Move
     */
    select?: MoveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Move
     */
    omit?: MoveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoveInclude<ExtArgs> | null
    /**
     * The data needed to update a Move.
     */
    data: XOR<MoveUpdateInput, MoveUncheckedUpdateInput>
    /**
     * Choose, which Move to update.
     */
    where: MoveWhereUniqueInput
  }

  /**
   * Move updateMany
   */
  export type MoveUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Moves.
     */
    data: XOR<MoveUpdateManyMutationInput, MoveUncheckedUpdateManyInput>
    /**
     * Filter which Moves to update
     */
    where?: MoveWhereInput
    /**
     * Limit how many Moves to update.
     */
    limit?: number
  }

  /**
   * Move updateManyAndReturn
   */
  export type MoveUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Move
     */
    select?: MoveSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Move
     */
    omit?: MoveOmit<ExtArgs> | null
    /**
     * The data used to update Moves.
     */
    data: XOR<MoveUpdateManyMutationInput, MoveUncheckedUpdateManyInput>
    /**
     * Filter which Moves to update
     */
    where?: MoveWhereInput
    /**
     * Limit how many Moves to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoveIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Move upsert
   */
  export type MoveUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Move
     */
    select?: MoveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Move
     */
    omit?: MoveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoveInclude<ExtArgs> | null
    /**
     * The filter to search for the Move to update in case it exists.
     */
    where: MoveWhereUniqueInput
    /**
     * In case the Move found by the `where` argument doesn't exist, create a new Move with this data.
     */
    create: XOR<MoveCreateInput, MoveUncheckedCreateInput>
    /**
     * In case the Move was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MoveUpdateInput, MoveUncheckedUpdateInput>
  }

  /**
   * Move delete
   */
  export type MoveDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Move
     */
    select?: MoveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Move
     */
    omit?: MoveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoveInclude<ExtArgs> | null
    /**
     * Filter which Move to delete.
     */
    where: MoveWhereUniqueInput
  }

  /**
   * Move deleteMany
   */
  export type MoveDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Moves to delete
     */
    where?: MoveWhereInput
    /**
     * Limit how many Moves to delete.
     */
    limit?: number
  }

  /**
   * Move without action
   */
  export type MoveDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Move
     */
    select?: MoveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Move
     */
    omit?: MoveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoveInclude<ExtArgs> | null
  }


  /**
   * Model Opening
   */

  export type AggregateOpening = {
    _count: OpeningCountAggregateOutputType | null
    _min: OpeningMinAggregateOutputType | null
    _max: OpeningMaxAggregateOutputType | null
  }

  export type OpeningMinAggregateOutputType = {
    eco: string | null
    name: string | null
    fenRoot: string | null
    dataJson: string | null
  }

  export type OpeningMaxAggregateOutputType = {
    eco: string | null
    name: string | null
    fenRoot: string | null
    dataJson: string | null
  }

  export type OpeningCountAggregateOutputType = {
    eco: number
    name: number
    fenRoot: number
    dataJson: number
    _all: number
  }


  export type OpeningMinAggregateInputType = {
    eco?: true
    name?: true
    fenRoot?: true
    dataJson?: true
  }

  export type OpeningMaxAggregateInputType = {
    eco?: true
    name?: true
    fenRoot?: true
    dataJson?: true
  }

  export type OpeningCountAggregateInputType = {
    eco?: true
    name?: true
    fenRoot?: true
    dataJson?: true
    _all?: true
  }

  export type OpeningAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Opening to aggregate.
     */
    where?: OpeningWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Openings to fetch.
     */
    orderBy?: OpeningOrderByWithRelationInput | OpeningOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OpeningWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Openings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Openings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Openings
    **/
    _count?: true | OpeningCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OpeningMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OpeningMaxAggregateInputType
  }

  export type GetOpeningAggregateType<T extends OpeningAggregateArgs> = {
        [P in keyof T & keyof AggregateOpening]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOpening[P]>
      : GetScalarType<T[P], AggregateOpening[P]>
  }




  export type OpeningGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OpeningWhereInput
    orderBy?: OpeningOrderByWithAggregationInput | OpeningOrderByWithAggregationInput[]
    by: OpeningScalarFieldEnum[] | OpeningScalarFieldEnum
    having?: OpeningScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OpeningCountAggregateInputType | true
    _min?: OpeningMinAggregateInputType
    _max?: OpeningMaxAggregateInputType
  }

  export type OpeningGroupByOutputType = {
    eco: string
    name: string
    fenRoot: string
    dataJson: string
    _count: OpeningCountAggregateOutputType | null
    _min: OpeningMinAggregateOutputType | null
    _max: OpeningMaxAggregateOutputType | null
  }

  type GetOpeningGroupByPayload<T extends OpeningGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OpeningGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OpeningGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OpeningGroupByOutputType[P]>
            : GetScalarType<T[P], OpeningGroupByOutputType[P]>
        }
      >
    >


  export type OpeningSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eco?: boolean
    name?: boolean
    fenRoot?: boolean
    dataJson?: boolean
    progress?: boolean | Opening$progressArgs<ExtArgs>
    repertoire?: boolean | Opening$repertoireArgs<ExtArgs>
    _count?: boolean | OpeningCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["opening"]>

  export type OpeningSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eco?: boolean
    name?: boolean
    fenRoot?: boolean
    dataJson?: boolean
  }, ExtArgs["result"]["opening"]>

  export type OpeningSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eco?: boolean
    name?: boolean
    fenRoot?: boolean
    dataJson?: boolean
  }, ExtArgs["result"]["opening"]>

  export type OpeningSelectScalar = {
    eco?: boolean
    name?: boolean
    fenRoot?: boolean
    dataJson?: boolean
  }

  export type OpeningOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"eco" | "name" | "fenRoot" | "dataJson", ExtArgs["result"]["opening"]>
  export type OpeningInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    progress?: boolean | Opening$progressArgs<ExtArgs>
    repertoire?: boolean | Opening$repertoireArgs<ExtArgs>
    _count?: boolean | OpeningCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OpeningIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type OpeningIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OpeningPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Opening"
    objects: {
      progress: Prisma.$OpeningProgressPayload<ExtArgs>[]
      repertoire: Prisma.$UserRepertoirePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      eco: string
      name: string
      fenRoot: string
      dataJson: string
    }, ExtArgs["result"]["opening"]>
    composites: {}
  }

  type OpeningGetPayload<S extends boolean | null | undefined | OpeningDefaultArgs> = $Result.GetResult<Prisma.$OpeningPayload, S>

  type OpeningCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OpeningFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OpeningCountAggregateInputType | true
    }

  export interface OpeningDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Opening'], meta: { name: 'Opening' } }
    /**
     * Find zero or one Opening that matches the filter.
     * @param {OpeningFindUniqueArgs} args - Arguments to find a Opening
     * @example
     * // Get one Opening
     * const opening = await prisma.opening.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OpeningFindUniqueArgs>(args: SelectSubset<T, OpeningFindUniqueArgs<ExtArgs>>): Prisma__OpeningClient<$Result.GetResult<Prisma.$OpeningPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Opening that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OpeningFindUniqueOrThrowArgs} args - Arguments to find a Opening
     * @example
     * // Get one Opening
     * const opening = await prisma.opening.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OpeningFindUniqueOrThrowArgs>(args: SelectSubset<T, OpeningFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OpeningClient<$Result.GetResult<Prisma.$OpeningPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Opening that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpeningFindFirstArgs} args - Arguments to find a Opening
     * @example
     * // Get one Opening
     * const opening = await prisma.opening.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OpeningFindFirstArgs>(args?: SelectSubset<T, OpeningFindFirstArgs<ExtArgs>>): Prisma__OpeningClient<$Result.GetResult<Prisma.$OpeningPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Opening that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpeningFindFirstOrThrowArgs} args - Arguments to find a Opening
     * @example
     * // Get one Opening
     * const opening = await prisma.opening.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OpeningFindFirstOrThrowArgs>(args?: SelectSubset<T, OpeningFindFirstOrThrowArgs<ExtArgs>>): Prisma__OpeningClient<$Result.GetResult<Prisma.$OpeningPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Openings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpeningFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Openings
     * const openings = await prisma.opening.findMany()
     * 
     * // Get first 10 Openings
     * const openings = await prisma.opening.findMany({ take: 10 })
     * 
     * // Only select the `eco`
     * const openingWithEcoOnly = await prisma.opening.findMany({ select: { eco: true } })
     * 
     */
    findMany<T extends OpeningFindManyArgs>(args?: SelectSubset<T, OpeningFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OpeningPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Opening.
     * @param {OpeningCreateArgs} args - Arguments to create a Opening.
     * @example
     * // Create one Opening
     * const Opening = await prisma.opening.create({
     *   data: {
     *     // ... data to create a Opening
     *   }
     * })
     * 
     */
    create<T extends OpeningCreateArgs>(args: SelectSubset<T, OpeningCreateArgs<ExtArgs>>): Prisma__OpeningClient<$Result.GetResult<Prisma.$OpeningPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Openings.
     * @param {OpeningCreateManyArgs} args - Arguments to create many Openings.
     * @example
     * // Create many Openings
     * const opening = await prisma.opening.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OpeningCreateManyArgs>(args?: SelectSubset<T, OpeningCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Openings and returns the data saved in the database.
     * @param {OpeningCreateManyAndReturnArgs} args - Arguments to create many Openings.
     * @example
     * // Create many Openings
     * const opening = await prisma.opening.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Openings and only return the `eco`
     * const openingWithEcoOnly = await prisma.opening.createManyAndReturn({
     *   select: { eco: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OpeningCreateManyAndReturnArgs>(args?: SelectSubset<T, OpeningCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OpeningPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Opening.
     * @param {OpeningDeleteArgs} args - Arguments to delete one Opening.
     * @example
     * // Delete one Opening
     * const Opening = await prisma.opening.delete({
     *   where: {
     *     // ... filter to delete one Opening
     *   }
     * })
     * 
     */
    delete<T extends OpeningDeleteArgs>(args: SelectSubset<T, OpeningDeleteArgs<ExtArgs>>): Prisma__OpeningClient<$Result.GetResult<Prisma.$OpeningPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Opening.
     * @param {OpeningUpdateArgs} args - Arguments to update one Opening.
     * @example
     * // Update one Opening
     * const opening = await prisma.opening.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OpeningUpdateArgs>(args: SelectSubset<T, OpeningUpdateArgs<ExtArgs>>): Prisma__OpeningClient<$Result.GetResult<Prisma.$OpeningPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Openings.
     * @param {OpeningDeleteManyArgs} args - Arguments to filter Openings to delete.
     * @example
     * // Delete a few Openings
     * const { count } = await prisma.opening.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OpeningDeleteManyArgs>(args?: SelectSubset<T, OpeningDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Openings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpeningUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Openings
     * const opening = await prisma.opening.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OpeningUpdateManyArgs>(args: SelectSubset<T, OpeningUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Openings and returns the data updated in the database.
     * @param {OpeningUpdateManyAndReturnArgs} args - Arguments to update many Openings.
     * @example
     * // Update many Openings
     * const opening = await prisma.opening.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Openings and only return the `eco`
     * const openingWithEcoOnly = await prisma.opening.updateManyAndReturn({
     *   select: { eco: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OpeningUpdateManyAndReturnArgs>(args: SelectSubset<T, OpeningUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OpeningPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Opening.
     * @param {OpeningUpsertArgs} args - Arguments to update or create a Opening.
     * @example
     * // Update or create a Opening
     * const opening = await prisma.opening.upsert({
     *   create: {
     *     // ... data to create a Opening
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Opening we want to update
     *   }
     * })
     */
    upsert<T extends OpeningUpsertArgs>(args: SelectSubset<T, OpeningUpsertArgs<ExtArgs>>): Prisma__OpeningClient<$Result.GetResult<Prisma.$OpeningPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Openings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpeningCountArgs} args - Arguments to filter Openings to count.
     * @example
     * // Count the number of Openings
     * const count = await prisma.opening.count({
     *   where: {
     *     // ... the filter for the Openings we want to count
     *   }
     * })
    **/
    count<T extends OpeningCountArgs>(
      args?: Subset<T, OpeningCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OpeningCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Opening.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpeningAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OpeningAggregateArgs>(args: Subset<T, OpeningAggregateArgs>): Prisma.PrismaPromise<GetOpeningAggregateType<T>>

    /**
     * Group by Opening.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpeningGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OpeningGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OpeningGroupByArgs['orderBy'] }
        : { orderBy?: OpeningGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OpeningGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOpeningGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Opening model
   */
  readonly fields: OpeningFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Opening.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OpeningClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    progress<T extends Opening$progressArgs<ExtArgs> = {}>(args?: Subset<T, Opening$progressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OpeningProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    repertoire<T extends Opening$repertoireArgs<ExtArgs> = {}>(args?: Subset<T, Opening$repertoireArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRepertoirePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Opening model
   */
  interface OpeningFieldRefs {
    readonly eco: FieldRef<"Opening", 'String'>
    readonly name: FieldRef<"Opening", 'String'>
    readonly fenRoot: FieldRef<"Opening", 'String'>
    readonly dataJson: FieldRef<"Opening", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Opening findUnique
   */
  export type OpeningFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Opening
     */
    select?: OpeningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Opening
     */
    omit?: OpeningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpeningInclude<ExtArgs> | null
    /**
     * Filter, which Opening to fetch.
     */
    where: OpeningWhereUniqueInput
  }

  /**
   * Opening findUniqueOrThrow
   */
  export type OpeningFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Opening
     */
    select?: OpeningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Opening
     */
    omit?: OpeningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpeningInclude<ExtArgs> | null
    /**
     * Filter, which Opening to fetch.
     */
    where: OpeningWhereUniqueInput
  }

  /**
   * Opening findFirst
   */
  export type OpeningFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Opening
     */
    select?: OpeningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Opening
     */
    omit?: OpeningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpeningInclude<ExtArgs> | null
    /**
     * Filter, which Opening to fetch.
     */
    where?: OpeningWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Openings to fetch.
     */
    orderBy?: OpeningOrderByWithRelationInput | OpeningOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Openings.
     */
    cursor?: OpeningWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Openings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Openings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Openings.
     */
    distinct?: OpeningScalarFieldEnum | OpeningScalarFieldEnum[]
  }

  /**
   * Opening findFirstOrThrow
   */
  export type OpeningFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Opening
     */
    select?: OpeningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Opening
     */
    omit?: OpeningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpeningInclude<ExtArgs> | null
    /**
     * Filter, which Opening to fetch.
     */
    where?: OpeningWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Openings to fetch.
     */
    orderBy?: OpeningOrderByWithRelationInput | OpeningOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Openings.
     */
    cursor?: OpeningWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Openings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Openings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Openings.
     */
    distinct?: OpeningScalarFieldEnum | OpeningScalarFieldEnum[]
  }

  /**
   * Opening findMany
   */
  export type OpeningFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Opening
     */
    select?: OpeningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Opening
     */
    omit?: OpeningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpeningInclude<ExtArgs> | null
    /**
     * Filter, which Openings to fetch.
     */
    where?: OpeningWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Openings to fetch.
     */
    orderBy?: OpeningOrderByWithRelationInput | OpeningOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Openings.
     */
    cursor?: OpeningWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Openings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Openings.
     */
    skip?: number
    distinct?: OpeningScalarFieldEnum | OpeningScalarFieldEnum[]
  }

  /**
   * Opening create
   */
  export type OpeningCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Opening
     */
    select?: OpeningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Opening
     */
    omit?: OpeningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpeningInclude<ExtArgs> | null
    /**
     * The data needed to create a Opening.
     */
    data: XOR<OpeningCreateInput, OpeningUncheckedCreateInput>
  }

  /**
   * Opening createMany
   */
  export type OpeningCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Openings.
     */
    data: OpeningCreateManyInput | OpeningCreateManyInput[]
  }

  /**
   * Opening createManyAndReturn
   */
  export type OpeningCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Opening
     */
    select?: OpeningSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Opening
     */
    omit?: OpeningOmit<ExtArgs> | null
    /**
     * The data used to create many Openings.
     */
    data: OpeningCreateManyInput | OpeningCreateManyInput[]
  }

  /**
   * Opening update
   */
  export type OpeningUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Opening
     */
    select?: OpeningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Opening
     */
    omit?: OpeningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpeningInclude<ExtArgs> | null
    /**
     * The data needed to update a Opening.
     */
    data: XOR<OpeningUpdateInput, OpeningUncheckedUpdateInput>
    /**
     * Choose, which Opening to update.
     */
    where: OpeningWhereUniqueInput
  }

  /**
   * Opening updateMany
   */
  export type OpeningUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Openings.
     */
    data: XOR<OpeningUpdateManyMutationInput, OpeningUncheckedUpdateManyInput>
    /**
     * Filter which Openings to update
     */
    where?: OpeningWhereInput
    /**
     * Limit how many Openings to update.
     */
    limit?: number
  }

  /**
   * Opening updateManyAndReturn
   */
  export type OpeningUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Opening
     */
    select?: OpeningSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Opening
     */
    omit?: OpeningOmit<ExtArgs> | null
    /**
     * The data used to update Openings.
     */
    data: XOR<OpeningUpdateManyMutationInput, OpeningUncheckedUpdateManyInput>
    /**
     * Filter which Openings to update
     */
    where?: OpeningWhereInput
    /**
     * Limit how many Openings to update.
     */
    limit?: number
  }

  /**
   * Opening upsert
   */
  export type OpeningUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Opening
     */
    select?: OpeningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Opening
     */
    omit?: OpeningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpeningInclude<ExtArgs> | null
    /**
     * The filter to search for the Opening to update in case it exists.
     */
    where: OpeningWhereUniqueInput
    /**
     * In case the Opening found by the `where` argument doesn't exist, create a new Opening with this data.
     */
    create: XOR<OpeningCreateInput, OpeningUncheckedCreateInput>
    /**
     * In case the Opening was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OpeningUpdateInput, OpeningUncheckedUpdateInput>
  }

  /**
   * Opening delete
   */
  export type OpeningDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Opening
     */
    select?: OpeningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Opening
     */
    omit?: OpeningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpeningInclude<ExtArgs> | null
    /**
     * Filter which Opening to delete.
     */
    where: OpeningWhereUniqueInput
  }

  /**
   * Opening deleteMany
   */
  export type OpeningDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Openings to delete
     */
    where?: OpeningWhereInput
    /**
     * Limit how many Openings to delete.
     */
    limit?: number
  }

  /**
   * Opening.progress
   */
  export type Opening$progressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpeningProgress
     */
    select?: OpeningProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpeningProgress
     */
    omit?: OpeningProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpeningProgressInclude<ExtArgs> | null
    where?: OpeningProgressWhereInput
    orderBy?: OpeningProgressOrderByWithRelationInput | OpeningProgressOrderByWithRelationInput[]
    cursor?: OpeningProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OpeningProgressScalarFieldEnum | OpeningProgressScalarFieldEnum[]
  }

  /**
   * Opening.repertoire
   */
  export type Opening$repertoireArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRepertoire
     */
    select?: UserRepertoireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRepertoire
     */
    omit?: UserRepertoireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRepertoireInclude<ExtArgs> | null
    where?: UserRepertoireWhereInput
    orderBy?: UserRepertoireOrderByWithRelationInput | UserRepertoireOrderByWithRelationInput[]
    cursor?: UserRepertoireWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserRepertoireScalarFieldEnum | UserRepertoireScalarFieldEnum[]
  }

  /**
   * Opening without action
   */
  export type OpeningDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Opening
     */
    select?: OpeningSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Opening
     */
    omit?: OpeningOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpeningInclude<ExtArgs> | null
  }


  /**
   * Model OpeningProgress
   */

  export type AggregateOpeningProgress = {
    _count: OpeningProgressCountAggregateOutputType | null
    _avg: OpeningProgressAvgAggregateOutputType | null
    _sum: OpeningProgressSumAggregateOutputType | null
    _min: OpeningProgressMinAggregateOutputType | null
    _max: OpeningProgressMaxAggregateOutputType | null
  }

  export type OpeningProgressAvgAggregateOutputType = {
    progress: number | null
  }

  export type OpeningProgressSumAggregateOutputType = {
    progress: number | null
  }

  export type OpeningProgressMinAggregateOutputType = {
    id: string | null
    userId: string | null
    eco: string | null
    progress: number | null
    history: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OpeningProgressMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    eco: string | null
    progress: number | null
    history: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OpeningProgressCountAggregateOutputType = {
    id: number
    userId: number
    eco: number
    progress: number
    history: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OpeningProgressAvgAggregateInputType = {
    progress?: true
  }

  export type OpeningProgressSumAggregateInputType = {
    progress?: true
  }

  export type OpeningProgressMinAggregateInputType = {
    id?: true
    userId?: true
    eco?: true
    progress?: true
    history?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OpeningProgressMaxAggregateInputType = {
    id?: true
    userId?: true
    eco?: true
    progress?: true
    history?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OpeningProgressCountAggregateInputType = {
    id?: true
    userId?: true
    eco?: true
    progress?: true
    history?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OpeningProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OpeningProgress to aggregate.
     */
    where?: OpeningProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OpeningProgresses to fetch.
     */
    orderBy?: OpeningProgressOrderByWithRelationInput | OpeningProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OpeningProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OpeningProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OpeningProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OpeningProgresses
    **/
    _count?: true | OpeningProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OpeningProgressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OpeningProgressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OpeningProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OpeningProgressMaxAggregateInputType
  }

  export type GetOpeningProgressAggregateType<T extends OpeningProgressAggregateArgs> = {
        [P in keyof T & keyof AggregateOpeningProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOpeningProgress[P]>
      : GetScalarType<T[P], AggregateOpeningProgress[P]>
  }




  export type OpeningProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OpeningProgressWhereInput
    orderBy?: OpeningProgressOrderByWithAggregationInput | OpeningProgressOrderByWithAggregationInput[]
    by: OpeningProgressScalarFieldEnum[] | OpeningProgressScalarFieldEnum
    having?: OpeningProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OpeningProgressCountAggregateInputType | true
    _avg?: OpeningProgressAvgAggregateInputType
    _sum?: OpeningProgressSumAggregateInputType
    _min?: OpeningProgressMinAggregateInputType
    _max?: OpeningProgressMaxAggregateInputType
  }

  export type OpeningProgressGroupByOutputType = {
    id: string
    userId: string
    eco: string
    progress: number
    history: string | null
    createdAt: Date
    updatedAt: Date
    _count: OpeningProgressCountAggregateOutputType | null
    _avg: OpeningProgressAvgAggregateOutputType | null
    _sum: OpeningProgressSumAggregateOutputType | null
    _min: OpeningProgressMinAggregateOutputType | null
    _max: OpeningProgressMaxAggregateOutputType | null
  }

  type GetOpeningProgressGroupByPayload<T extends OpeningProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OpeningProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OpeningProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OpeningProgressGroupByOutputType[P]>
            : GetScalarType<T[P], OpeningProgressGroupByOutputType[P]>
        }
      >
    >


  export type OpeningProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    eco?: boolean
    progress?: boolean
    history?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    opening?: boolean | OpeningDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["openingProgress"]>

  export type OpeningProgressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    eco?: boolean
    progress?: boolean
    history?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    opening?: boolean | OpeningDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["openingProgress"]>

  export type OpeningProgressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    eco?: boolean
    progress?: boolean
    history?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    opening?: boolean | OpeningDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["openingProgress"]>

  export type OpeningProgressSelectScalar = {
    id?: boolean
    userId?: boolean
    eco?: boolean
    progress?: boolean
    history?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OpeningProgressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "eco" | "progress" | "history" | "createdAt" | "updatedAt", ExtArgs["result"]["openingProgress"]>
  export type OpeningProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    opening?: boolean | OpeningDefaultArgs<ExtArgs>
  }
  export type OpeningProgressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    opening?: boolean | OpeningDefaultArgs<ExtArgs>
  }
  export type OpeningProgressIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    opening?: boolean | OpeningDefaultArgs<ExtArgs>
  }

  export type $OpeningProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OpeningProgress"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      opening: Prisma.$OpeningPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      eco: string
      progress: number
      history: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["openingProgress"]>
    composites: {}
  }

  type OpeningProgressGetPayload<S extends boolean | null | undefined | OpeningProgressDefaultArgs> = $Result.GetResult<Prisma.$OpeningProgressPayload, S>

  type OpeningProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OpeningProgressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OpeningProgressCountAggregateInputType | true
    }

  export interface OpeningProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OpeningProgress'], meta: { name: 'OpeningProgress' } }
    /**
     * Find zero or one OpeningProgress that matches the filter.
     * @param {OpeningProgressFindUniqueArgs} args - Arguments to find a OpeningProgress
     * @example
     * // Get one OpeningProgress
     * const openingProgress = await prisma.openingProgress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OpeningProgressFindUniqueArgs>(args: SelectSubset<T, OpeningProgressFindUniqueArgs<ExtArgs>>): Prisma__OpeningProgressClient<$Result.GetResult<Prisma.$OpeningProgressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OpeningProgress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OpeningProgressFindUniqueOrThrowArgs} args - Arguments to find a OpeningProgress
     * @example
     * // Get one OpeningProgress
     * const openingProgress = await prisma.openingProgress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OpeningProgressFindUniqueOrThrowArgs>(args: SelectSubset<T, OpeningProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OpeningProgressClient<$Result.GetResult<Prisma.$OpeningProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OpeningProgress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpeningProgressFindFirstArgs} args - Arguments to find a OpeningProgress
     * @example
     * // Get one OpeningProgress
     * const openingProgress = await prisma.openingProgress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OpeningProgressFindFirstArgs>(args?: SelectSubset<T, OpeningProgressFindFirstArgs<ExtArgs>>): Prisma__OpeningProgressClient<$Result.GetResult<Prisma.$OpeningProgressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OpeningProgress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpeningProgressFindFirstOrThrowArgs} args - Arguments to find a OpeningProgress
     * @example
     * // Get one OpeningProgress
     * const openingProgress = await prisma.openingProgress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OpeningProgressFindFirstOrThrowArgs>(args?: SelectSubset<T, OpeningProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma__OpeningProgressClient<$Result.GetResult<Prisma.$OpeningProgressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OpeningProgresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpeningProgressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OpeningProgresses
     * const openingProgresses = await prisma.openingProgress.findMany()
     * 
     * // Get first 10 OpeningProgresses
     * const openingProgresses = await prisma.openingProgress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const openingProgressWithIdOnly = await prisma.openingProgress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OpeningProgressFindManyArgs>(args?: SelectSubset<T, OpeningProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OpeningProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OpeningProgress.
     * @param {OpeningProgressCreateArgs} args - Arguments to create a OpeningProgress.
     * @example
     * // Create one OpeningProgress
     * const OpeningProgress = await prisma.openingProgress.create({
     *   data: {
     *     // ... data to create a OpeningProgress
     *   }
     * })
     * 
     */
    create<T extends OpeningProgressCreateArgs>(args: SelectSubset<T, OpeningProgressCreateArgs<ExtArgs>>): Prisma__OpeningProgressClient<$Result.GetResult<Prisma.$OpeningProgressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OpeningProgresses.
     * @param {OpeningProgressCreateManyArgs} args - Arguments to create many OpeningProgresses.
     * @example
     * // Create many OpeningProgresses
     * const openingProgress = await prisma.openingProgress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OpeningProgressCreateManyArgs>(args?: SelectSubset<T, OpeningProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OpeningProgresses and returns the data saved in the database.
     * @param {OpeningProgressCreateManyAndReturnArgs} args - Arguments to create many OpeningProgresses.
     * @example
     * // Create many OpeningProgresses
     * const openingProgress = await prisma.openingProgress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OpeningProgresses and only return the `id`
     * const openingProgressWithIdOnly = await prisma.openingProgress.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OpeningProgressCreateManyAndReturnArgs>(args?: SelectSubset<T, OpeningProgressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OpeningProgressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OpeningProgress.
     * @param {OpeningProgressDeleteArgs} args - Arguments to delete one OpeningProgress.
     * @example
     * // Delete one OpeningProgress
     * const OpeningProgress = await prisma.openingProgress.delete({
     *   where: {
     *     // ... filter to delete one OpeningProgress
     *   }
     * })
     * 
     */
    delete<T extends OpeningProgressDeleteArgs>(args: SelectSubset<T, OpeningProgressDeleteArgs<ExtArgs>>): Prisma__OpeningProgressClient<$Result.GetResult<Prisma.$OpeningProgressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OpeningProgress.
     * @param {OpeningProgressUpdateArgs} args - Arguments to update one OpeningProgress.
     * @example
     * // Update one OpeningProgress
     * const openingProgress = await prisma.openingProgress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OpeningProgressUpdateArgs>(args: SelectSubset<T, OpeningProgressUpdateArgs<ExtArgs>>): Prisma__OpeningProgressClient<$Result.GetResult<Prisma.$OpeningProgressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OpeningProgresses.
     * @param {OpeningProgressDeleteManyArgs} args - Arguments to filter OpeningProgresses to delete.
     * @example
     * // Delete a few OpeningProgresses
     * const { count } = await prisma.openingProgress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OpeningProgressDeleteManyArgs>(args?: SelectSubset<T, OpeningProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OpeningProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpeningProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OpeningProgresses
     * const openingProgress = await prisma.openingProgress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OpeningProgressUpdateManyArgs>(args: SelectSubset<T, OpeningProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OpeningProgresses and returns the data updated in the database.
     * @param {OpeningProgressUpdateManyAndReturnArgs} args - Arguments to update many OpeningProgresses.
     * @example
     * // Update many OpeningProgresses
     * const openingProgress = await prisma.openingProgress.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OpeningProgresses and only return the `id`
     * const openingProgressWithIdOnly = await prisma.openingProgress.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OpeningProgressUpdateManyAndReturnArgs>(args: SelectSubset<T, OpeningProgressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OpeningProgressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OpeningProgress.
     * @param {OpeningProgressUpsertArgs} args - Arguments to update or create a OpeningProgress.
     * @example
     * // Update or create a OpeningProgress
     * const openingProgress = await prisma.openingProgress.upsert({
     *   create: {
     *     // ... data to create a OpeningProgress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OpeningProgress we want to update
     *   }
     * })
     */
    upsert<T extends OpeningProgressUpsertArgs>(args: SelectSubset<T, OpeningProgressUpsertArgs<ExtArgs>>): Prisma__OpeningProgressClient<$Result.GetResult<Prisma.$OpeningProgressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OpeningProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpeningProgressCountArgs} args - Arguments to filter OpeningProgresses to count.
     * @example
     * // Count the number of OpeningProgresses
     * const count = await prisma.openingProgress.count({
     *   where: {
     *     // ... the filter for the OpeningProgresses we want to count
     *   }
     * })
    **/
    count<T extends OpeningProgressCountArgs>(
      args?: Subset<T, OpeningProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OpeningProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OpeningProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpeningProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OpeningProgressAggregateArgs>(args: Subset<T, OpeningProgressAggregateArgs>): Prisma.PrismaPromise<GetOpeningProgressAggregateType<T>>

    /**
     * Group by OpeningProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpeningProgressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OpeningProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OpeningProgressGroupByArgs['orderBy'] }
        : { orderBy?: OpeningProgressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OpeningProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOpeningProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OpeningProgress model
   */
  readonly fields: OpeningProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OpeningProgress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OpeningProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    opening<T extends OpeningDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OpeningDefaultArgs<ExtArgs>>): Prisma__OpeningClient<$Result.GetResult<Prisma.$OpeningPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OpeningProgress model
   */
  interface OpeningProgressFieldRefs {
    readonly id: FieldRef<"OpeningProgress", 'String'>
    readonly userId: FieldRef<"OpeningProgress", 'String'>
    readonly eco: FieldRef<"OpeningProgress", 'String'>
    readonly progress: FieldRef<"OpeningProgress", 'Float'>
    readonly history: FieldRef<"OpeningProgress", 'String'>
    readonly createdAt: FieldRef<"OpeningProgress", 'DateTime'>
    readonly updatedAt: FieldRef<"OpeningProgress", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OpeningProgress findUnique
   */
  export type OpeningProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpeningProgress
     */
    select?: OpeningProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpeningProgress
     */
    omit?: OpeningProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpeningProgressInclude<ExtArgs> | null
    /**
     * Filter, which OpeningProgress to fetch.
     */
    where: OpeningProgressWhereUniqueInput
  }

  /**
   * OpeningProgress findUniqueOrThrow
   */
  export type OpeningProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpeningProgress
     */
    select?: OpeningProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpeningProgress
     */
    omit?: OpeningProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpeningProgressInclude<ExtArgs> | null
    /**
     * Filter, which OpeningProgress to fetch.
     */
    where: OpeningProgressWhereUniqueInput
  }

  /**
   * OpeningProgress findFirst
   */
  export type OpeningProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpeningProgress
     */
    select?: OpeningProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpeningProgress
     */
    omit?: OpeningProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpeningProgressInclude<ExtArgs> | null
    /**
     * Filter, which OpeningProgress to fetch.
     */
    where?: OpeningProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OpeningProgresses to fetch.
     */
    orderBy?: OpeningProgressOrderByWithRelationInput | OpeningProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OpeningProgresses.
     */
    cursor?: OpeningProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OpeningProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OpeningProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OpeningProgresses.
     */
    distinct?: OpeningProgressScalarFieldEnum | OpeningProgressScalarFieldEnum[]
  }

  /**
   * OpeningProgress findFirstOrThrow
   */
  export type OpeningProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpeningProgress
     */
    select?: OpeningProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpeningProgress
     */
    omit?: OpeningProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpeningProgressInclude<ExtArgs> | null
    /**
     * Filter, which OpeningProgress to fetch.
     */
    where?: OpeningProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OpeningProgresses to fetch.
     */
    orderBy?: OpeningProgressOrderByWithRelationInput | OpeningProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OpeningProgresses.
     */
    cursor?: OpeningProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OpeningProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OpeningProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OpeningProgresses.
     */
    distinct?: OpeningProgressScalarFieldEnum | OpeningProgressScalarFieldEnum[]
  }

  /**
   * OpeningProgress findMany
   */
  export type OpeningProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpeningProgress
     */
    select?: OpeningProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpeningProgress
     */
    omit?: OpeningProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpeningProgressInclude<ExtArgs> | null
    /**
     * Filter, which OpeningProgresses to fetch.
     */
    where?: OpeningProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OpeningProgresses to fetch.
     */
    orderBy?: OpeningProgressOrderByWithRelationInput | OpeningProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OpeningProgresses.
     */
    cursor?: OpeningProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OpeningProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OpeningProgresses.
     */
    skip?: number
    distinct?: OpeningProgressScalarFieldEnum | OpeningProgressScalarFieldEnum[]
  }

  /**
   * OpeningProgress create
   */
  export type OpeningProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpeningProgress
     */
    select?: OpeningProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpeningProgress
     */
    omit?: OpeningProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpeningProgressInclude<ExtArgs> | null
    /**
     * The data needed to create a OpeningProgress.
     */
    data: XOR<OpeningProgressCreateInput, OpeningProgressUncheckedCreateInput>
  }

  /**
   * OpeningProgress createMany
   */
  export type OpeningProgressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OpeningProgresses.
     */
    data: OpeningProgressCreateManyInput | OpeningProgressCreateManyInput[]
  }

  /**
   * OpeningProgress createManyAndReturn
   */
  export type OpeningProgressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpeningProgress
     */
    select?: OpeningProgressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OpeningProgress
     */
    omit?: OpeningProgressOmit<ExtArgs> | null
    /**
     * The data used to create many OpeningProgresses.
     */
    data: OpeningProgressCreateManyInput | OpeningProgressCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpeningProgressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OpeningProgress update
   */
  export type OpeningProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpeningProgress
     */
    select?: OpeningProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpeningProgress
     */
    omit?: OpeningProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpeningProgressInclude<ExtArgs> | null
    /**
     * The data needed to update a OpeningProgress.
     */
    data: XOR<OpeningProgressUpdateInput, OpeningProgressUncheckedUpdateInput>
    /**
     * Choose, which OpeningProgress to update.
     */
    where: OpeningProgressWhereUniqueInput
  }

  /**
   * OpeningProgress updateMany
   */
  export type OpeningProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OpeningProgresses.
     */
    data: XOR<OpeningProgressUpdateManyMutationInput, OpeningProgressUncheckedUpdateManyInput>
    /**
     * Filter which OpeningProgresses to update
     */
    where?: OpeningProgressWhereInput
    /**
     * Limit how many OpeningProgresses to update.
     */
    limit?: number
  }

  /**
   * OpeningProgress updateManyAndReturn
   */
  export type OpeningProgressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpeningProgress
     */
    select?: OpeningProgressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OpeningProgress
     */
    omit?: OpeningProgressOmit<ExtArgs> | null
    /**
     * The data used to update OpeningProgresses.
     */
    data: XOR<OpeningProgressUpdateManyMutationInput, OpeningProgressUncheckedUpdateManyInput>
    /**
     * Filter which OpeningProgresses to update
     */
    where?: OpeningProgressWhereInput
    /**
     * Limit how many OpeningProgresses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpeningProgressIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OpeningProgress upsert
   */
  export type OpeningProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpeningProgress
     */
    select?: OpeningProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpeningProgress
     */
    omit?: OpeningProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpeningProgressInclude<ExtArgs> | null
    /**
     * The filter to search for the OpeningProgress to update in case it exists.
     */
    where: OpeningProgressWhereUniqueInput
    /**
     * In case the OpeningProgress found by the `where` argument doesn't exist, create a new OpeningProgress with this data.
     */
    create: XOR<OpeningProgressCreateInput, OpeningProgressUncheckedCreateInput>
    /**
     * In case the OpeningProgress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OpeningProgressUpdateInput, OpeningProgressUncheckedUpdateInput>
  }

  /**
   * OpeningProgress delete
   */
  export type OpeningProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpeningProgress
     */
    select?: OpeningProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpeningProgress
     */
    omit?: OpeningProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpeningProgressInclude<ExtArgs> | null
    /**
     * Filter which OpeningProgress to delete.
     */
    where: OpeningProgressWhereUniqueInput
  }

  /**
   * OpeningProgress deleteMany
   */
  export type OpeningProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OpeningProgresses to delete
     */
    where?: OpeningProgressWhereInput
    /**
     * Limit how many OpeningProgresses to delete.
     */
    limit?: number
  }

  /**
   * OpeningProgress without action
   */
  export type OpeningProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpeningProgress
     */
    select?: OpeningProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OpeningProgress
     */
    omit?: OpeningProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpeningProgressInclude<ExtArgs> | null
  }


  /**
   * Model UserRepertoire
   */

  export type AggregateUserRepertoire = {
    _count: UserRepertoireCountAggregateOutputType | null
    _min: UserRepertoireMinAggregateOutputType | null
    _max: UserRepertoireMaxAggregateOutputType | null
  }

  export type UserRepertoireMinAggregateOutputType = {
    id: string | null
    userId: string | null
    eco: string | null
    side: string | null
    createdAt: Date | null
  }

  export type UserRepertoireMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    eco: string | null
    side: string | null
    createdAt: Date | null
  }

  export type UserRepertoireCountAggregateOutputType = {
    id: number
    userId: number
    eco: number
    side: number
    createdAt: number
    _all: number
  }


  export type UserRepertoireMinAggregateInputType = {
    id?: true
    userId?: true
    eco?: true
    side?: true
    createdAt?: true
  }

  export type UserRepertoireMaxAggregateInputType = {
    id?: true
    userId?: true
    eco?: true
    side?: true
    createdAt?: true
  }

  export type UserRepertoireCountAggregateInputType = {
    id?: true
    userId?: true
    eco?: true
    side?: true
    createdAt?: true
    _all?: true
  }

  export type UserRepertoireAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserRepertoire to aggregate.
     */
    where?: UserRepertoireWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRepertoires to fetch.
     */
    orderBy?: UserRepertoireOrderByWithRelationInput | UserRepertoireOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserRepertoireWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRepertoires from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRepertoires.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserRepertoires
    **/
    _count?: true | UserRepertoireCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserRepertoireMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserRepertoireMaxAggregateInputType
  }

  export type GetUserRepertoireAggregateType<T extends UserRepertoireAggregateArgs> = {
        [P in keyof T & keyof AggregateUserRepertoire]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserRepertoire[P]>
      : GetScalarType<T[P], AggregateUserRepertoire[P]>
  }




  export type UserRepertoireGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRepertoireWhereInput
    orderBy?: UserRepertoireOrderByWithAggregationInput | UserRepertoireOrderByWithAggregationInput[]
    by: UserRepertoireScalarFieldEnum[] | UserRepertoireScalarFieldEnum
    having?: UserRepertoireScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserRepertoireCountAggregateInputType | true
    _min?: UserRepertoireMinAggregateInputType
    _max?: UserRepertoireMaxAggregateInputType
  }

  export type UserRepertoireGroupByOutputType = {
    id: string
    userId: string
    eco: string
    side: string
    createdAt: Date
    _count: UserRepertoireCountAggregateOutputType | null
    _min: UserRepertoireMinAggregateOutputType | null
    _max: UserRepertoireMaxAggregateOutputType | null
  }

  type GetUserRepertoireGroupByPayload<T extends UserRepertoireGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserRepertoireGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserRepertoireGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserRepertoireGroupByOutputType[P]>
            : GetScalarType<T[P], UserRepertoireGroupByOutputType[P]>
        }
      >
    >


  export type UserRepertoireSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    eco?: boolean
    side?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    opening?: boolean | OpeningDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userRepertoire"]>

  export type UserRepertoireSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    eco?: boolean
    side?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    opening?: boolean | OpeningDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userRepertoire"]>

  export type UserRepertoireSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    eco?: boolean
    side?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    opening?: boolean | OpeningDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userRepertoire"]>

  export type UserRepertoireSelectScalar = {
    id?: boolean
    userId?: boolean
    eco?: boolean
    side?: boolean
    createdAt?: boolean
  }

  export type UserRepertoireOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "eco" | "side" | "createdAt", ExtArgs["result"]["userRepertoire"]>
  export type UserRepertoireInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    opening?: boolean | OpeningDefaultArgs<ExtArgs>
  }
  export type UserRepertoireIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    opening?: boolean | OpeningDefaultArgs<ExtArgs>
  }
  export type UserRepertoireIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    opening?: boolean | OpeningDefaultArgs<ExtArgs>
  }

  export type $UserRepertoirePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserRepertoire"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      opening: Prisma.$OpeningPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      eco: string
      side: string
      createdAt: Date
    }, ExtArgs["result"]["userRepertoire"]>
    composites: {}
  }

  type UserRepertoireGetPayload<S extends boolean | null | undefined | UserRepertoireDefaultArgs> = $Result.GetResult<Prisma.$UserRepertoirePayload, S>

  type UserRepertoireCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserRepertoireFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserRepertoireCountAggregateInputType | true
    }

  export interface UserRepertoireDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserRepertoire'], meta: { name: 'UserRepertoire' } }
    /**
     * Find zero or one UserRepertoire that matches the filter.
     * @param {UserRepertoireFindUniqueArgs} args - Arguments to find a UserRepertoire
     * @example
     * // Get one UserRepertoire
     * const userRepertoire = await prisma.userRepertoire.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserRepertoireFindUniqueArgs>(args: SelectSubset<T, UserRepertoireFindUniqueArgs<ExtArgs>>): Prisma__UserRepertoireClient<$Result.GetResult<Prisma.$UserRepertoirePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserRepertoire that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserRepertoireFindUniqueOrThrowArgs} args - Arguments to find a UserRepertoire
     * @example
     * // Get one UserRepertoire
     * const userRepertoire = await prisma.userRepertoire.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserRepertoireFindUniqueOrThrowArgs>(args: SelectSubset<T, UserRepertoireFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserRepertoireClient<$Result.GetResult<Prisma.$UserRepertoirePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserRepertoire that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRepertoireFindFirstArgs} args - Arguments to find a UserRepertoire
     * @example
     * // Get one UserRepertoire
     * const userRepertoire = await prisma.userRepertoire.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserRepertoireFindFirstArgs>(args?: SelectSubset<T, UserRepertoireFindFirstArgs<ExtArgs>>): Prisma__UserRepertoireClient<$Result.GetResult<Prisma.$UserRepertoirePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserRepertoire that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRepertoireFindFirstOrThrowArgs} args - Arguments to find a UserRepertoire
     * @example
     * // Get one UserRepertoire
     * const userRepertoire = await prisma.userRepertoire.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserRepertoireFindFirstOrThrowArgs>(args?: SelectSubset<T, UserRepertoireFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserRepertoireClient<$Result.GetResult<Prisma.$UserRepertoirePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserRepertoires that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRepertoireFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserRepertoires
     * const userRepertoires = await prisma.userRepertoire.findMany()
     * 
     * // Get first 10 UserRepertoires
     * const userRepertoires = await prisma.userRepertoire.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userRepertoireWithIdOnly = await prisma.userRepertoire.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserRepertoireFindManyArgs>(args?: SelectSubset<T, UserRepertoireFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRepertoirePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserRepertoire.
     * @param {UserRepertoireCreateArgs} args - Arguments to create a UserRepertoire.
     * @example
     * // Create one UserRepertoire
     * const UserRepertoire = await prisma.userRepertoire.create({
     *   data: {
     *     // ... data to create a UserRepertoire
     *   }
     * })
     * 
     */
    create<T extends UserRepertoireCreateArgs>(args: SelectSubset<T, UserRepertoireCreateArgs<ExtArgs>>): Prisma__UserRepertoireClient<$Result.GetResult<Prisma.$UserRepertoirePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserRepertoires.
     * @param {UserRepertoireCreateManyArgs} args - Arguments to create many UserRepertoires.
     * @example
     * // Create many UserRepertoires
     * const userRepertoire = await prisma.userRepertoire.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserRepertoireCreateManyArgs>(args?: SelectSubset<T, UserRepertoireCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserRepertoires and returns the data saved in the database.
     * @param {UserRepertoireCreateManyAndReturnArgs} args - Arguments to create many UserRepertoires.
     * @example
     * // Create many UserRepertoires
     * const userRepertoire = await prisma.userRepertoire.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserRepertoires and only return the `id`
     * const userRepertoireWithIdOnly = await prisma.userRepertoire.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserRepertoireCreateManyAndReturnArgs>(args?: SelectSubset<T, UserRepertoireCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRepertoirePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserRepertoire.
     * @param {UserRepertoireDeleteArgs} args - Arguments to delete one UserRepertoire.
     * @example
     * // Delete one UserRepertoire
     * const UserRepertoire = await prisma.userRepertoire.delete({
     *   where: {
     *     // ... filter to delete one UserRepertoire
     *   }
     * })
     * 
     */
    delete<T extends UserRepertoireDeleteArgs>(args: SelectSubset<T, UserRepertoireDeleteArgs<ExtArgs>>): Prisma__UserRepertoireClient<$Result.GetResult<Prisma.$UserRepertoirePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserRepertoire.
     * @param {UserRepertoireUpdateArgs} args - Arguments to update one UserRepertoire.
     * @example
     * // Update one UserRepertoire
     * const userRepertoire = await prisma.userRepertoire.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserRepertoireUpdateArgs>(args: SelectSubset<T, UserRepertoireUpdateArgs<ExtArgs>>): Prisma__UserRepertoireClient<$Result.GetResult<Prisma.$UserRepertoirePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserRepertoires.
     * @param {UserRepertoireDeleteManyArgs} args - Arguments to filter UserRepertoires to delete.
     * @example
     * // Delete a few UserRepertoires
     * const { count } = await prisma.userRepertoire.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserRepertoireDeleteManyArgs>(args?: SelectSubset<T, UserRepertoireDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserRepertoires.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRepertoireUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserRepertoires
     * const userRepertoire = await prisma.userRepertoire.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserRepertoireUpdateManyArgs>(args: SelectSubset<T, UserRepertoireUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserRepertoires and returns the data updated in the database.
     * @param {UserRepertoireUpdateManyAndReturnArgs} args - Arguments to update many UserRepertoires.
     * @example
     * // Update many UserRepertoires
     * const userRepertoire = await prisma.userRepertoire.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserRepertoires and only return the `id`
     * const userRepertoireWithIdOnly = await prisma.userRepertoire.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserRepertoireUpdateManyAndReturnArgs>(args: SelectSubset<T, UserRepertoireUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRepertoirePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserRepertoire.
     * @param {UserRepertoireUpsertArgs} args - Arguments to update or create a UserRepertoire.
     * @example
     * // Update or create a UserRepertoire
     * const userRepertoire = await prisma.userRepertoire.upsert({
     *   create: {
     *     // ... data to create a UserRepertoire
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserRepertoire we want to update
     *   }
     * })
     */
    upsert<T extends UserRepertoireUpsertArgs>(args: SelectSubset<T, UserRepertoireUpsertArgs<ExtArgs>>): Prisma__UserRepertoireClient<$Result.GetResult<Prisma.$UserRepertoirePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserRepertoires.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRepertoireCountArgs} args - Arguments to filter UserRepertoires to count.
     * @example
     * // Count the number of UserRepertoires
     * const count = await prisma.userRepertoire.count({
     *   where: {
     *     // ... the filter for the UserRepertoires we want to count
     *   }
     * })
    **/
    count<T extends UserRepertoireCountArgs>(
      args?: Subset<T, UserRepertoireCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserRepertoireCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserRepertoire.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRepertoireAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserRepertoireAggregateArgs>(args: Subset<T, UserRepertoireAggregateArgs>): Prisma.PrismaPromise<GetUserRepertoireAggregateType<T>>

    /**
     * Group by UserRepertoire.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRepertoireGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserRepertoireGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserRepertoireGroupByArgs['orderBy'] }
        : { orderBy?: UserRepertoireGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserRepertoireGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserRepertoireGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserRepertoire model
   */
  readonly fields: UserRepertoireFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserRepertoire.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserRepertoireClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    opening<T extends OpeningDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OpeningDefaultArgs<ExtArgs>>): Prisma__OpeningClient<$Result.GetResult<Prisma.$OpeningPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserRepertoire model
   */
  interface UserRepertoireFieldRefs {
    readonly id: FieldRef<"UserRepertoire", 'String'>
    readonly userId: FieldRef<"UserRepertoire", 'String'>
    readonly eco: FieldRef<"UserRepertoire", 'String'>
    readonly side: FieldRef<"UserRepertoire", 'String'>
    readonly createdAt: FieldRef<"UserRepertoire", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserRepertoire findUnique
   */
  export type UserRepertoireFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRepertoire
     */
    select?: UserRepertoireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRepertoire
     */
    omit?: UserRepertoireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRepertoireInclude<ExtArgs> | null
    /**
     * Filter, which UserRepertoire to fetch.
     */
    where: UserRepertoireWhereUniqueInput
  }

  /**
   * UserRepertoire findUniqueOrThrow
   */
  export type UserRepertoireFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRepertoire
     */
    select?: UserRepertoireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRepertoire
     */
    omit?: UserRepertoireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRepertoireInclude<ExtArgs> | null
    /**
     * Filter, which UserRepertoire to fetch.
     */
    where: UserRepertoireWhereUniqueInput
  }

  /**
   * UserRepertoire findFirst
   */
  export type UserRepertoireFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRepertoire
     */
    select?: UserRepertoireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRepertoire
     */
    omit?: UserRepertoireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRepertoireInclude<ExtArgs> | null
    /**
     * Filter, which UserRepertoire to fetch.
     */
    where?: UserRepertoireWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRepertoires to fetch.
     */
    orderBy?: UserRepertoireOrderByWithRelationInput | UserRepertoireOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserRepertoires.
     */
    cursor?: UserRepertoireWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRepertoires from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRepertoires.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserRepertoires.
     */
    distinct?: UserRepertoireScalarFieldEnum | UserRepertoireScalarFieldEnum[]
  }

  /**
   * UserRepertoire findFirstOrThrow
   */
  export type UserRepertoireFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRepertoire
     */
    select?: UserRepertoireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRepertoire
     */
    omit?: UserRepertoireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRepertoireInclude<ExtArgs> | null
    /**
     * Filter, which UserRepertoire to fetch.
     */
    where?: UserRepertoireWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRepertoires to fetch.
     */
    orderBy?: UserRepertoireOrderByWithRelationInput | UserRepertoireOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserRepertoires.
     */
    cursor?: UserRepertoireWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRepertoires from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRepertoires.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserRepertoires.
     */
    distinct?: UserRepertoireScalarFieldEnum | UserRepertoireScalarFieldEnum[]
  }

  /**
   * UserRepertoire findMany
   */
  export type UserRepertoireFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRepertoire
     */
    select?: UserRepertoireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRepertoire
     */
    omit?: UserRepertoireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRepertoireInclude<ExtArgs> | null
    /**
     * Filter, which UserRepertoires to fetch.
     */
    where?: UserRepertoireWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRepertoires to fetch.
     */
    orderBy?: UserRepertoireOrderByWithRelationInput | UserRepertoireOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserRepertoires.
     */
    cursor?: UserRepertoireWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRepertoires from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRepertoires.
     */
    skip?: number
    distinct?: UserRepertoireScalarFieldEnum | UserRepertoireScalarFieldEnum[]
  }

  /**
   * UserRepertoire create
   */
  export type UserRepertoireCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRepertoire
     */
    select?: UserRepertoireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRepertoire
     */
    omit?: UserRepertoireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRepertoireInclude<ExtArgs> | null
    /**
     * The data needed to create a UserRepertoire.
     */
    data: XOR<UserRepertoireCreateInput, UserRepertoireUncheckedCreateInput>
  }

  /**
   * UserRepertoire createMany
   */
  export type UserRepertoireCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserRepertoires.
     */
    data: UserRepertoireCreateManyInput | UserRepertoireCreateManyInput[]
  }

  /**
   * UserRepertoire createManyAndReturn
   */
  export type UserRepertoireCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRepertoire
     */
    select?: UserRepertoireSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserRepertoire
     */
    omit?: UserRepertoireOmit<ExtArgs> | null
    /**
     * The data used to create many UserRepertoires.
     */
    data: UserRepertoireCreateManyInput | UserRepertoireCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRepertoireIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserRepertoire update
   */
  export type UserRepertoireUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRepertoire
     */
    select?: UserRepertoireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRepertoire
     */
    omit?: UserRepertoireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRepertoireInclude<ExtArgs> | null
    /**
     * The data needed to update a UserRepertoire.
     */
    data: XOR<UserRepertoireUpdateInput, UserRepertoireUncheckedUpdateInput>
    /**
     * Choose, which UserRepertoire to update.
     */
    where: UserRepertoireWhereUniqueInput
  }

  /**
   * UserRepertoire updateMany
   */
  export type UserRepertoireUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserRepertoires.
     */
    data: XOR<UserRepertoireUpdateManyMutationInput, UserRepertoireUncheckedUpdateManyInput>
    /**
     * Filter which UserRepertoires to update
     */
    where?: UserRepertoireWhereInput
    /**
     * Limit how many UserRepertoires to update.
     */
    limit?: number
  }

  /**
   * UserRepertoire updateManyAndReturn
   */
  export type UserRepertoireUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRepertoire
     */
    select?: UserRepertoireSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserRepertoire
     */
    omit?: UserRepertoireOmit<ExtArgs> | null
    /**
     * The data used to update UserRepertoires.
     */
    data: XOR<UserRepertoireUpdateManyMutationInput, UserRepertoireUncheckedUpdateManyInput>
    /**
     * Filter which UserRepertoires to update
     */
    where?: UserRepertoireWhereInput
    /**
     * Limit how many UserRepertoires to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRepertoireIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserRepertoire upsert
   */
  export type UserRepertoireUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRepertoire
     */
    select?: UserRepertoireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRepertoire
     */
    omit?: UserRepertoireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRepertoireInclude<ExtArgs> | null
    /**
     * The filter to search for the UserRepertoire to update in case it exists.
     */
    where: UserRepertoireWhereUniqueInput
    /**
     * In case the UserRepertoire found by the `where` argument doesn't exist, create a new UserRepertoire with this data.
     */
    create: XOR<UserRepertoireCreateInput, UserRepertoireUncheckedCreateInput>
    /**
     * In case the UserRepertoire was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserRepertoireUpdateInput, UserRepertoireUncheckedUpdateInput>
  }

  /**
   * UserRepertoire delete
   */
  export type UserRepertoireDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRepertoire
     */
    select?: UserRepertoireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRepertoire
     */
    omit?: UserRepertoireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRepertoireInclude<ExtArgs> | null
    /**
     * Filter which UserRepertoire to delete.
     */
    where: UserRepertoireWhereUniqueInput
  }

  /**
   * UserRepertoire deleteMany
   */
  export type UserRepertoireDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserRepertoires to delete
     */
    where?: UserRepertoireWhereInput
    /**
     * Limit how many UserRepertoires to delete.
     */
    limit?: number
  }

  /**
   * UserRepertoire without action
   */
  export type UserRepertoireDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRepertoire
     */
    select?: UserRepertoireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRepertoire
     */
    omit?: UserRepertoireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRepertoireInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    elo: 'elo',
    puzzleRating: 'puzzleRating',
    puzzleStreak: 'puzzleStreak',
    puzzleSolved: 'puzzleSolved',
    puzzleFailed: 'puzzleFailed',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PuzzleAttemptScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    puzzleId: 'puzzleId',
    success: 'success',
    rating: 'rating',
    delta: 'delta',
    createdAt: 'createdAt'
  };

  export type PuzzleAttemptScalarFieldEnum = (typeof PuzzleAttemptScalarFieldEnum)[keyof typeof PuzzleAttemptScalarFieldEnum]


  export const PuzzleScalarFieldEnum: {
    id: 'id',
    fen: 'fen',
    solution: 'solution',
    rating: 'rating',
    ratingDeviation: 'ratingDeviation',
    themes: 'themes',
    createdAt: 'createdAt'
  };

  export type PuzzleScalarFieldEnum = (typeof PuzzleScalarFieldEnum)[keyof typeof PuzzleScalarFieldEnum]


  export const GameScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    whitePlayerId: 'whitePlayerId',
    blackPlayerId: 'blackPlayerId',
    pgn: 'pgn',
    fen: 'fen',
    result: 'result',
    status: 'status',
    source: 'source',
    aiLevel: 'aiLevel',
    timeControl: 'timeControl'
  };

  export type GameScalarFieldEnum = (typeof GameScalarFieldEnum)[keyof typeof GameScalarFieldEnum]


  export const MoveScalarFieldEnum: {
    id: 'id',
    gameId: 'gameId',
    ply: 'ply',
    fen: 'fen',
    san: 'san',
    uci: 'uci',
    evalBefore: 'evalBefore',
    evalAfter: 'evalAfter',
    delta: 'delta',
    classification: 'classification',
    createdAt: 'createdAt'
  };

  export type MoveScalarFieldEnum = (typeof MoveScalarFieldEnum)[keyof typeof MoveScalarFieldEnum]


  export const OpeningScalarFieldEnum: {
    eco: 'eco',
    name: 'name',
    fenRoot: 'fenRoot',
    dataJson: 'dataJson'
  };

  export type OpeningScalarFieldEnum = (typeof OpeningScalarFieldEnum)[keyof typeof OpeningScalarFieldEnum]


  export const OpeningProgressScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    eco: 'eco',
    progress: 'progress',
    history: 'history',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OpeningProgressScalarFieldEnum = (typeof OpeningProgressScalarFieldEnum)[keyof typeof OpeningProgressScalarFieldEnum]


  export const UserRepertoireScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    eco: 'eco',
    side: 'side',
    createdAt: 'createdAt'
  };

  export type UserRepertoireScalarFieldEnum = (typeof UserRepertoireScalarFieldEnum)[keyof typeof UserRepertoireScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    elo?: IntFilter<"User"> | number
    puzzleRating?: IntFilter<"User"> | number
    puzzleStreak?: IntFilter<"User"> | number
    puzzleSolved?: IntFilter<"User"> | number
    puzzleFailed?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    gamesAsBlack?: GameListRelationFilter
    gamesAsWhite?: GameListRelationFilter
    puzzleAttempts?: PuzzleAttemptListRelationFilter
    openingProgress?: OpeningProgressListRelationFilter
    repertoire?: UserRepertoireListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    elo?: SortOrder
    puzzleRating?: SortOrder
    puzzleStreak?: SortOrder
    puzzleSolved?: SortOrder
    puzzleFailed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    gamesAsBlack?: GameOrderByRelationAggregateInput
    gamesAsWhite?: GameOrderByRelationAggregateInput
    puzzleAttempts?: PuzzleAttemptOrderByRelationAggregateInput
    openingProgress?: OpeningProgressOrderByRelationAggregateInput
    repertoire?: UserRepertoireOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    elo?: IntFilter<"User"> | number
    puzzleRating?: IntFilter<"User"> | number
    puzzleStreak?: IntFilter<"User"> | number
    puzzleSolved?: IntFilter<"User"> | number
    puzzleFailed?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    gamesAsBlack?: GameListRelationFilter
    gamesAsWhite?: GameListRelationFilter
    puzzleAttempts?: PuzzleAttemptListRelationFilter
    openingProgress?: OpeningProgressListRelationFilter
    repertoire?: UserRepertoireListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    elo?: SortOrder
    puzzleRating?: SortOrder
    puzzleStreak?: SortOrder
    puzzleSolved?: SortOrder
    puzzleFailed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    elo?: IntWithAggregatesFilter<"User"> | number
    puzzleRating?: IntWithAggregatesFilter<"User"> | number
    puzzleStreak?: IntWithAggregatesFilter<"User"> | number
    puzzleSolved?: IntWithAggregatesFilter<"User"> | number
    puzzleFailed?: IntWithAggregatesFilter<"User"> | number
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type PuzzleAttemptWhereInput = {
    AND?: PuzzleAttemptWhereInput | PuzzleAttemptWhereInput[]
    OR?: PuzzleAttemptWhereInput[]
    NOT?: PuzzleAttemptWhereInput | PuzzleAttemptWhereInput[]
    id?: StringFilter<"PuzzleAttempt"> | string
    userId?: StringFilter<"PuzzleAttempt"> | string
    puzzleId?: StringFilter<"PuzzleAttempt"> | string
    success?: BoolFilter<"PuzzleAttempt"> | boolean
    rating?: IntFilter<"PuzzleAttempt"> | number
    delta?: IntFilter<"PuzzleAttempt"> | number
    createdAt?: DateTimeFilter<"PuzzleAttempt"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    puzzle?: XOR<PuzzleScalarRelationFilter, PuzzleWhereInput>
  }

  export type PuzzleAttemptOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    puzzleId?: SortOrder
    success?: SortOrder
    rating?: SortOrder
    delta?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    puzzle?: PuzzleOrderByWithRelationInput
  }

  export type PuzzleAttemptWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PuzzleAttemptWhereInput | PuzzleAttemptWhereInput[]
    OR?: PuzzleAttemptWhereInput[]
    NOT?: PuzzleAttemptWhereInput | PuzzleAttemptWhereInput[]
    userId?: StringFilter<"PuzzleAttempt"> | string
    puzzleId?: StringFilter<"PuzzleAttempt"> | string
    success?: BoolFilter<"PuzzleAttempt"> | boolean
    rating?: IntFilter<"PuzzleAttempt"> | number
    delta?: IntFilter<"PuzzleAttempt"> | number
    createdAt?: DateTimeFilter<"PuzzleAttempt"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    puzzle?: XOR<PuzzleScalarRelationFilter, PuzzleWhereInput>
  }, "id">

  export type PuzzleAttemptOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    puzzleId?: SortOrder
    success?: SortOrder
    rating?: SortOrder
    delta?: SortOrder
    createdAt?: SortOrder
    _count?: PuzzleAttemptCountOrderByAggregateInput
    _avg?: PuzzleAttemptAvgOrderByAggregateInput
    _max?: PuzzleAttemptMaxOrderByAggregateInput
    _min?: PuzzleAttemptMinOrderByAggregateInput
    _sum?: PuzzleAttemptSumOrderByAggregateInput
  }

  export type PuzzleAttemptScalarWhereWithAggregatesInput = {
    AND?: PuzzleAttemptScalarWhereWithAggregatesInput | PuzzleAttemptScalarWhereWithAggregatesInput[]
    OR?: PuzzleAttemptScalarWhereWithAggregatesInput[]
    NOT?: PuzzleAttemptScalarWhereWithAggregatesInput | PuzzleAttemptScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PuzzleAttempt"> | string
    userId?: StringWithAggregatesFilter<"PuzzleAttempt"> | string
    puzzleId?: StringWithAggregatesFilter<"PuzzleAttempt"> | string
    success?: BoolWithAggregatesFilter<"PuzzleAttempt"> | boolean
    rating?: IntWithAggregatesFilter<"PuzzleAttempt"> | number
    delta?: IntWithAggregatesFilter<"PuzzleAttempt"> | number
    createdAt?: DateTimeWithAggregatesFilter<"PuzzleAttempt"> | Date | string
  }

  export type PuzzleWhereInput = {
    AND?: PuzzleWhereInput | PuzzleWhereInput[]
    OR?: PuzzleWhereInput[]
    NOT?: PuzzleWhereInput | PuzzleWhereInput[]
    id?: StringFilter<"Puzzle"> | string
    fen?: StringFilter<"Puzzle"> | string
    solution?: StringFilter<"Puzzle"> | string
    rating?: IntFilter<"Puzzle"> | number
    ratingDeviation?: IntFilter<"Puzzle"> | number
    themes?: StringFilter<"Puzzle"> | string
    createdAt?: DateTimeFilter<"Puzzle"> | Date | string
    attempts?: PuzzleAttemptListRelationFilter
  }

  export type PuzzleOrderByWithRelationInput = {
    id?: SortOrder
    fen?: SortOrder
    solution?: SortOrder
    rating?: SortOrder
    ratingDeviation?: SortOrder
    themes?: SortOrder
    createdAt?: SortOrder
    attempts?: PuzzleAttemptOrderByRelationAggregateInput
  }

  export type PuzzleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PuzzleWhereInput | PuzzleWhereInput[]
    OR?: PuzzleWhereInput[]
    NOT?: PuzzleWhereInput | PuzzleWhereInput[]
    fen?: StringFilter<"Puzzle"> | string
    solution?: StringFilter<"Puzzle"> | string
    rating?: IntFilter<"Puzzle"> | number
    ratingDeviation?: IntFilter<"Puzzle"> | number
    themes?: StringFilter<"Puzzle"> | string
    createdAt?: DateTimeFilter<"Puzzle"> | Date | string
    attempts?: PuzzleAttemptListRelationFilter
  }, "id">

  export type PuzzleOrderByWithAggregationInput = {
    id?: SortOrder
    fen?: SortOrder
    solution?: SortOrder
    rating?: SortOrder
    ratingDeviation?: SortOrder
    themes?: SortOrder
    createdAt?: SortOrder
    _count?: PuzzleCountOrderByAggregateInput
    _avg?: PuzzleAvgOrderByAggregateInput
    _max?: PuzzleMaxOrderByAggregateInput
    _min?: PuzzleMinOrderByAggregateInput
    _sum?: PuzzleSumOrderByAggregateInput
  }

  export type PuzzleScalarWhereWithAggregatesInput = {
    AND?: PuzzleScalarWhereWithAggregatesInput | PuzzleScalarWhereWithAggregatesInput[]
    OR?: PuzzleScalarWhereWithAggregatesInput[]
    NOT?: PuzzleScalarWhereWithAggregatesInput | PuzzleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Puzzle"> | string
    fen?: StringWithAggregatesFilter<"Puzzle"> | string
    solution?: StringWithAggregatesFilter<"Puzzle"> | string
    rating?: IntWithAggregatesFilter<"Puzzle"> | number
    ratingDeviation?: IntWithAggregatesFilter<"Puzzle"> | number
    themes?: StringWithAggregatesFilter<"Puzzle"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Puzzle"> | Date | string
  }

  export type GameWhereInput = {
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    id?: StringFilter<"Game"> | string
    createdAt?: DateTimeFilter<"Game"> | Date | string
    updatedAt?: DateTimeFilter<"Game"> | Date | string
    whitePlayerId?: StringNullableFilter<"Game"> | string | null
    blackPlayerId?: StringNullableFilter<"Game"> | string | null
    pgn?: StringNullableFilter<"Game"> | string | null
    fen?: StringFilter<"Game"> | string
    result?: StringNullableFilter<"Game"> | string | null
    status?: StringFilter<"Game"> | string
    source?: StringNullableFilter<"Game"> | string | null
    aiLevel?: IntNullableFilter<"Game"> | number | null
    timeControl?: StringNullableFilter<"Game"> | string | null
    blackPlayer?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    whitePlayer?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    moves?: MoveListRelationFilter
  }

  export type GameOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    whitePlayerId?: SortOrderInput | SortOrder
    blackPlayerId?: SortOrderInput | SortOrder
    pgn?: SortOrderInput | SortOrder
    fen?: SortOrder
    result?: SortOrderInput | SortOrder
    status?: SortOrder
    source?: SortOrderInput | SortOrder
    aiLevel?: SortOrderInput | SortOrder
    timeControl?: SortOrderInput | SortOrder
    blackPlayer?: UserOrderByWithRelationInput
    whitePlayer?: UserOrderByWithRelationInput
    moves?: MoveOrderByRelationAggregateInput
  }

  export type GameWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    createdAt?: DateTimeFilter<"Game"> | Date | string
    updatedAt?: DateTimeFilter<"Game"> | Date | string
    whitePlayerId?: StringNullableFilter<"Game"> | string | null
    blackPlayerId?: StringNullableFilter<"Game"> | string | null
    pgn?: StringNullableFilter<"Game"> | string | null
    fen?: StringFilter<"Game"> | string
    result?: StringNullableFilter<"Game"> | string | null
    status?: StringFilter<"Game"> | string
    source?: StringNullableFilter<"Game"> | string | null
    aiLevel?: IntNullableFilter<"Game"> | number | null
    timeControl?: StringNullableFilter<"Game"> | string | null
    blackPlayer?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    whitePlayer?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    moves?: MoveListRelationFilter
  }, "id">

  export type GameOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    whitePlayerId?: SortOrderInput | SortOrder
    blackPlayerId?: SortOrderInput | SortOrder
    pgn?: SortOrderInput | SortOrder
    fen?: SortOrder
    result?: SortOrderInput | SortOrder
    status?: SortOrder
    source?: SortOrderInput | SortOrder
    aiLevel?: SortOrderInput | SortOrder
    timeControl?: SortOrderInput | SortOrder
    _count?: GameCountOrderByAggregateInput
    _avg?: GameAvgOrderByAggregateInput
    _max?: GameMaxOrderByAggregateInput
    _min?: GameMinOrderByAggregateInput
    _sum?: GameSumOrderByAggregateInput
  }

  export type GameScalarWhereWithAggregatesInput = {
    AND?: GameScalarWhereWithAggregatesInput | GameScalarWhereWithAggregatesInput[]
    OR?: GameScalarWhereWithAggregatesInput[]
    NOT?: GameScalarWhereWithAggregatesInput | GameScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Game"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Game"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Game"> | Date | string
    whitePlayerId?: StringNullableWithAggregatesFilter<"Game"> | string | null
    blackPlayerId?: StringNullableWithAggregatesFilter<"Game"> | string | null
    pgn?: StringNullableWithAggregatesFilter<"Game"> | string | null
    fen?: StringWithAggregatesFilter<"Game"> | string
    result?: StringNullableWithAggregatesFilter<"Game"> | string | null
    status?: StringWithAggregatesFilter<"Game"> | string
    source?: StringNullableWithAggregatesFilter<"Game"> | string | null
    aiLevel?: IntNullableWithAggregatesFilter<"Game"> | number | null
    timeControl?: StringNullableWithAggregatesFilter<"Game"> | string | null
  }

  export type MoveWhereInput = {
    AND?: MoveWhereInput | MoveWhereInput[]
    OR?: MoveWhereInput[]
    NOT?: MoveWhereInput | MoveWhereInput[]
    id?: StringFilter<"Move"> | string
    gameId?: StringFilter<"Move"> | string
    ply?: IntFilter<"Move"> | number
    fen?: StringFilter<"Move"> | string
    san?: StringNullableFilter<"Move"> | string | null
    uci?: StringNullableFilter<"Move"> | string | null
    evalBefore?: FloatNullableFilter<"Move"> | number | null
    evalAfter?: FloatNullableFilter<"Move"> | number | null
    delta?: FloatNullableFilter<"Move"> | number | null
    classification?: StringNullableFilter<"Move"> | string | null
    createdAt?: DateTimeFilter<"Move"> | Date | string
    game?: XOR<GameScalarRelationFilter, GameWhereInput>
  }

  export type MoveOrderByWithRelationInput = {
    id?: SortOrder
    gameId?: SortOrder
    ply?: SortOrder
    fen?: SortOrder
    san?: SortOrderInput | SortOrder
    uci?: SortOrderInput | SortOrder
    evalBefore?: SortOrderInput | SortOrder
    evalAfter?: SortOrderInput | SortOrder
    delta?: SortOrderInput | SortOrder
    classification?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    game?: GameOrderByWithRelationInput
  }

  export type MoveWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MoveWhereInput | MoveWhereInput[]
    OR?: MoveWhereInput[]
    NOT?: MoveWhereInput | MoveWhereInput[]
    gameId?: StringFilter<"Move"> | string
    ply?: IntFilter<"Move"> | number
    fen?: StringFilter<"Move"> | string
    san?: StringNullableFilter<"Move"> | string | null
    uci?: StringNullableFilter<"Move"> | string | null
    evalBefore?: FloatNullableFilter<"Move"> | number | null
    evalAfter?: FloatNullableFilter<"Move"> | number | null
    delta?: FloatNullableFilter<"Move"> | number | null
    classification?: StringNullableFilter<"Move"> | string | null
    createdAt?: DateTimeFilter<"Move"> | Date | string
    game?: XOR<GameScalarRelationFilter, GameWhereInput>
  }, "id">

  export type MoveOrderByWithAggregationInput = {
    id?: SortOrder
    gameId?: SortOrder
    ply?: SortOrder
    fen?: SortOrder
    san?: SortOrderInput | SortOrder
    uci?: SortOrderInput | SortOrder
    evalBefore?: SortOrderInput | SortOrder
    evalAfter?: SortOrderInput | SortOrder
    delta?: SortOrderInput | SortOrder
    classification?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: MoveCountOrderByAggregateInput
    _avg?: MoveAvgOrderByAggregateInput
    _max?: MoveMaxOrderByAggregateInput
    _min?: MoveMinOrderByAggregateInput
    _sum?: MoveSumOrderByAggregateInput
  }

  export type MoveScalarWhereWithAggregatesInput = {
    AND?: MoveScalarWhereWithAggregatesInput | MoveScalarWhereWithAggregatesInput[]
    OR?: MoveScalarWhereWithAggregatesInput[]
    NOT?: MoveScalarWhereWithAggregatesInput | MoveScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Move"> | string
    gameId?: StringWithAggregatesFilter<"Move"> | string
    ply?: IntWithAggregatesFilter<"Move"> | number
    fen?: StringWithAggregatesFilter<"Move"> | string
    san?: StringNullableWithAggregatesFilter<"Move"> | string | null
    uci?: StringNullableWithAggregatesFilter<"Move"> | string | null
    evalBefore?: FloatNullableWithAggregatesFilter<"Move"> | number | null
    evalAfter?: FloatNullableWithAggregatesFilter<"Move"> | number | null
    delta?: FloatNullableWithAggregatesFilter<"Move"> | number | null
    classification?: StringNullableWithAggregatesFilter<"Move"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Move"> | Date | string
  }

  export type OpeningWhereInput = {
    AND?: OpeningWhereInput | OpeningWhereInput[]
    OR?: OpeningWhereInput[]
    NOT?: OpeningWhereInput | OpeningWhereInput[]
    eco?: StringFilter<"Opening"> | string
    name?: StringFilter<"Opening"> | string
    fenRoot?: StringFilter<"Opening"> | string
    dataJson?: StringFilter<"Opening"> | string
    progress?: OpeningProgressListRelationFilter
    repertoire?: UserRepertoireListRelationFilter
  }

  export type OpeningOrderByWithRelationInput = {
    eco?: SortOrder
    name?: SortOrder
    fenRoot?: SortOrder
    dataJson?: SortOrder
    progress?: OpeningProgressOrderByRelationAggregateInput
    repertoire?: UserRepertoireOrderByRelationAggregateInput
  }

  export type OpeningWhereUniqueInput = Prisma.AtLeast<{
    eco?: string
    AND?: OpeningWhereInput | OpeningWhereInput[]
    OR?: OpeningWhereInput[]
    NOT?: OpeningWhereInput | OpeningWhereInput[]
    name?: StringFilter<"Opening"> | string
    fenRoot?: StringFilter<"Opening"> | string
    dataJson?: StringFilter<"Opening"> | string
    progress?: OpeningProgressListRelationFilter
    repertoire?: UserRepertoireListRelationFilter
  }, "eco">

  export type OpeningOrderByWithAggregationInput = {
    eco?: SortOrder
    name?: SortOrder
    fenRoot?: SortOrder
    dataJson?: SortOrder
    _count?: OpeningCountOrderByAggregateInput
    _max?: OpeningMaxOrderByAggregateInput
    _min?: OpeningMinOrderByAggregateInput
  }

  export type OpeningScalarWhereWithAggregatesInput = {
    AND?: OpeningScalarWhereWithAggregatesInput | OpeningScalarWhereWithAggregatesInput[]
    OR?: OpeningScalarWhereWithAggregatesInput[]
    NOT?: OpeningScalarWhereWithAggregatesInput | OpeningScalarWhereWithAggregatesInput[]
    eco?: StringWithAggregatesFilter<"Opening"> | string
    name?: StringWithAggregatesFilter<"Opening"> | string
    fenRoot?: StringWithAggregatesFilter<"Opening"> | string
    dataJson?: StringWithAggregatesFilter<"Opening"> | string
  }

  export type OpeningProgressWhereInput = {
    AND?: OpeningProgressWhereInput | OpeningProgressWhereInput[]
    OR?: OpeningProgressWhereInput[]
    NOT?: OpeningProgressWhereInput | OpeningProgressWhereInput[]
    id?: StringFilter<"OpeningProgress"> | string
    userId?: StringFilter<"OpeningProgress"> | string
    eco?: StringFilter<"OpeningProgress"> | string
    progress?: FloatFilter<"OpeningProgress"> | number
    history?: StringNullableFilter<"OpeningProgress"> | string | null
    createdAt?: DateTimeFilter<"OpeningProgress"> | Date | string
    updatedAt?: DateTimeFilter<"OpeningProgress"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    opening?: XOR<OpeningScalarRelationFilter, OpeningWhereInput>
  }

  export type OpeningProgressOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    eco?: SortOrder
    progress?: SortOrder
    history?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    opening?: OpeningOrderByWithRelationInput
  }

  export type OpeningProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_eco?: OpeningProgressUserIdEcoCompoundUniqueInput
    AND?: OpeningProgressWhereInput | OpeningProgressWhereInput[]
    OR?: OpeningProgressWhereInput[]
    NOT?: OpeningProgressWhereInput | OpeningProgressWhereInput[]
    userId?: StringFilter<"OpeningProgress"> | string
    eco?: StringFilter<"OpeningProgress"> | string
    progress?: FloatFilter<"OpeningProgress"> | number
    history?: StringNullableFilter<"OpeningProgress"> | string | null
    createdAt?: DateTimeFilter<"OpeningProgress"> | Date | string
    updatedAt?: DateTimeFilter<"OpeningProgress"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    opening?: XOR<OpeningScalarRelationFilter, OpeningWhereInput>
  }, "id" | "userId_eco">

  export type OpeningProgressOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    eco?: SortOrder
    progress?: SortOrder
    history?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OpeningProgressCountOrderByAggregateInput
    _avg?: OpeningProgressAvgOrderByAggregateInput
    _max?: OpeningProgressMaxOrderByAggregateInput
    _min?: OpeningProgressMinOrderByAggregateInput
    _sum?: OpeningProgressSumOrderByAggregateInput
  }

  export type OpeningProgressScalarWhereWithAggregatesInput = {
    AND?: OpeningProgressScalarWhereWithAggregatesInput | OpeningProgressScalarWhereWithAggregatesInput[]
    OR?: OpeningProgressScalarWhereWithAggregatesInput[]
    NOT?: OpeningProgressScalarWhereWithAggregatesInput | OpeningProgressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OpeningProgress"> | string
    userId?: StringWithAggregatesFilter<"OpeningProgress"> | string
    eco?: StringWithAggregatesFilter<"OpeningProgress"> | string
    progress?: FloatWithAggregatesFilter<"OpeningProgress"> | number
    history?: StringNullableWithAggregatesFilter<"OpeningProgress"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"OpeningProgress"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"OpeningProgress"> | Date | string
  }

  export type UserRepertoireWhereInput = {
    AND?: UserRepertoireWhereInput | UserRepertoireWhereInput[]
    OR?: UserRepertoireWhereInput[]
    NOT?: UserRepertoireWhereInput | UserRepertoireWhereInput[]
    id?: StringFilter<"UserRepertoire"> | string
    userId?: StringFilter<"UserRepertoire"> | string
    eco?: StringFilter<"UserRepertoire"> | string
    side?: StringFilter<"UserRepertoire"> | string
    createdAt?: DateTimeFilter<"UserRepertoire"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    opening?: XOR<OpeningScalarRelationFilter, OpeningWhereInput>
  }

  export type UserRepertoireOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    eco?: SortOrder
    side?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    opening?: OpeningOrderByWithRelationInput
  }

  export type UserRepertoireWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_eco?: UserRepertoireUserIdEcoCompoundUniqueInput
    AND?: UserRepertoireWhereInput | UserRepertoireWhereInput[]
    OR?: UserRepertoireWhereInput[]
    NOT?: UserRepertoireWhereInput | UserRepertoireWhereInput[]
    userId?: StringFilter<"UserRepertoire"> | string
    eco?: StringFilter<"UserRepertoire"> | string
    side?: StringFilter<"UserRepertoire"> | string
    createdAt?: DateTimeFilter<"UserRepertoire"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    opening?: XOR<OpeningScalarRelationFilter, OpeningWhereInput>
  }, "id" | "userId_eco">

  export type UserRepertoireOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    eco?: SortOrder
    side?: SortOrder
    createdAt?: SortOrder
    _count?: UserRepertoireCountOrderByAggregateInput
    _max?: UserRepertoireMaxOrderByAggregateInput
    _min?: UserRepertoireMinOrderByAggregateInput
  }

  export type UserRepertoireScalarWhereWithAggregatesInput = {
    AND?: UserRepertoireScalarWhereWithAggregatesInput | UserRepertoireScalarWhereWithAggregatesInput[]
    OR?: UserRepertoireScalarWhereWithAggregatesInput[]
    NOT?: UserRepertoireScalarWhereWithAggregatesInput | UserRepertoireScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserRepertoire"> | string
    userId?: StringWithAggregatesFilter<"UserRepertoire"> | string
    eco?: StringWithAggregatesFilter<"UserRepertoire"> | string
    side?: StringWithAggregatesFilter<"UserRepertoire"> | string
    createdAt?: DateTimeWithAggregatesFilter<"UserRepertoire"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    elo?: number
    puzzleRating?: number
    puzzleStreak?: number
    puzzleSolved?: number
    puzzleFailed?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    gamesAsBlack?: GameCreateNestedManyWithoutBlackPlayerInput
    gamesAsWhite?: GameCreateNestedManyWithoutWhitePlayerInput
    puzzleAttempts?: PuzzleAttemptCreateNestedManyWithoutUserInput
    openingProgress?: OpeningProgressCreateNestedManyWithoutUserInput
    repertoire?: UserRepertoireCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    elo?: number
    puzzleRating?: number
    puzzleStreak?: number
    puzzleSolved?: number
    puzzleFailed?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    gamesAsBlack?: GameUncheckedCreateNestedManyWithoutBlackPlayerInput
    gamesAsWhite?: GameUncheckedCreateNestedManyWithoutWhitePlayerInput
    puzzleAttempts?: PuzzleAttemptUncheckedCreateNestedManyWithoutUserInput
    openingProgress?: OpeningProgressUncheckedCreateNestedManyWithoutUserInput
    repertoire?: UserRepertoireUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    elo?: IntFieldUpdateOperationsInput | number
    puzzleRating?: IntFieldUpdateOperationsInput | number
    puzzleStreak?: IntFieldUpdateOperationsInput | number
    puzzleSolved?: IntFieldUpdateOperationsInput | number
    puzzleFailed?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gamesAsBlack?: GameUpdateManyWithoutBlackPlayerNestedInput
    gamesAsWhite?: GameUpdateManyWithoutWhitePlayerNestedInput
    puzzleAttempts?: PuzzleAttemptUpdateManyWithoutUserNestedInput
    openingProgress?: OpeningProgressUpdateManyWithoutUserNestedInput
    repertoire?: UserRepertoireUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    elo?: IntFieldUpdateOperationsInput | number
    puzzleRating?: IntFieldUpdateOperationsInput | number
    puzzleStreak?: IntFieldUpdateOperationsInput | number
    puzzleSolved?: IntFieldUpdateOperationsInput | number
    puzzleFailed?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gamesAsBlack?: GameUncheckedUpdateManyWithoutBlackPlayerNestedInput
    gamesAsWhite?: GameUncheckedUpdateManyWithoutWhitePlayerNestedInput
    puzzleAttempts?: PuzzleAttemptUncheckedUpdateManyWithoutUserNestedInput
    openingProgress?: OpeningProgressUncheckedUpdateManyWithoutUserNestedInput
    repertoire?: UserRepertoireUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    elo?: number
    puzzleRating?: number
    puzzleStreak?: number
    puzzleSolved?: number
    puzzleFailed?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    elo?: IntFieldUpdateOperationsInput | number
    puzzleRating?: IntFieldUpdateOperationsInput | number
    puzzleStreak?: IntFieldUpdateOperationsInput | number
    puzzleSolved?: IntFieldUpdateOperationsInput | number
    puzzleFailed?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    elo?: IntFieldUpdateOperationsInput | number
    puzzleRating?: IntFieldUpdateOperationsInput | number
    puzzleStreak?: IntFieldUpdateOperationsInput | number
    puzzleSolved?: IntFieldUpdateOperationsInput | number
    puzzleFailed?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PuzzleAttemptCreateInput = {
    id?: string
    success: boolean
    rating: number
    delta: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutPuzzleAttemptsInput
    puzzle: PuzzleCreateNestedOneWithoutAttemptsInput
  }

  export type PuzzleAttemptUncheckedCreateInput = {
    id?: string
    userId: string
    puzzleId: string
    success: boolean
    rating: number
    delta: number
    createdAt?: Date | string
  }

  export type PuzzleAttemptUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    success?: BoolFieldUpdateOperationsInput | boolean
    rating?: IntFieldUpdateOperationsInput | number
    delta?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPuzzleAttemptsNestedInput
    puzzle?: PuzzleUpdateOneRequiredWithoutAttemptsNestedInput
  }

  export type PuzzleAttemptUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    puzzleId?: StringFieldUpdateOperationsInput | string
    success?: BoolFieldUpdateOperationsInput | boolean
    rating?: IntFieldUpdateOperationsInput | number
    delta?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PuzzleAttemptCreateManyInput = {
    id?: string
    userId: string
    puzzleId: string
    success: boolean
    rating: number
    delta: number
    createdAt?: Date | string
  }

  export type PuzzleAttemptUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    success?: BoolFieldUpdateOperationsInput | boolean
    rating?: IntFieldUpdateOperationsInput | number
    delta?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PuzzleAttemptUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    puzzleId?: StringFieldUpdateOperationsInput | string
    success?: BoolFieldUpdateOperationsInput | boolean
    rating?: IntFieldUpdateOperationsInput | number
    delta?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PuzzleCreateInput = {
    id: string
    fen: string
    solution: string
    rating: number
    ratingDeviation: number
    themes: string
    createdAt?: Date | string
    attempts?: PuzzleAttemptCreateNestedManyWithoutPuzzleInput
  }

  export type PuzzleUncheckedCreateInput = {
    id: string
    fen: string
    solution: string
    rating: number
    ratingDeviation: number
    themes: string
    createdAt?: Date | string
    attempts?: PuzzleAttemptUncheckedCreateNestedManyWithoutPuzzleInput
  }

  export type PuzzleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fen?: StringFieldUpdateOperationsInput | string
    solution?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    ratingDeviation?: IntFieldUpdateOperationsInput | number
    themes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempts?: PuzzleAttemptUpdateManyWithoutPuzzleNestedInput
  }

  export type PuzzleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fen?: StringFieldUpdateOperationsInput | string
    solution?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    ratingDeviation?: IntFieldUpdateOperationsInput | number
    themes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempts?: PuzzleAttemptUncheckedUpdateManyWithoutPuzzleNestedInput
  }

  export type PuzzleCreateManyInput = {
    id: string
    fen: string
    solution: string
    rating: number
    ratingDeviation: number
    themes: string
    createdAt?: Date | string
  }

  export type PuzzleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fen?: StringFieldUpdateOperationsInput | string
    solution?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    ratingDeviation?: IntFieldUpdateOperationsInput | number
    themes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PuzzleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fen?: StringFieldUpdateOperationsInput | string
    solution?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    ratingDeviation?: IntFieldUpdateOperationsInput | number
    themes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pgn?: string | null
    fen: string
    result?: string | null
    status: string
    source?: string | null
    aiLevel?: number | null
    timeControl?: string | null
    blackPlayer?: UserCreateNestedOneWithoutGamesAsBlackInput
    whitePlayer?: UserCreateNestedOneWithoutGamesAsWhiteInput
    moves?: MoveCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    whitePlayerId?: string | null
    blackPlayerId?: string | null
    pgn?: string | null
    fen: string
    result?: string | null
    status: string
    source?: string | null
    aiLevel?: number | null
    timeControl?: string | null
    moves?: MoveUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pgn?: NullableStringFieldUpdateOperationsInput | string | null
    fen?: StringFieldUpdateOperationsInput | string
    result?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    aiLevel?: NullableIntFieldUpdateOperationsInput | number | null
    timeControl?: NullableStringFieldUpdateOperationsInput | string | null
    blackPlayer?: UserUpdateOneWithoutGamesAsBlackNestedInput
    whitePlayer?: UserUpdateOneWithoutGamesAsWhiteNestedInput
    moves?: MoveUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    whitePlayerId?: NullableStringFieldUpdateOperationsInput | string | null
    blackPlayerId?: NullableStringFieldUpdateOperationsInput | string | null
    pgn?: NullableStringFieldUpdateOperationsInput | string | null
    fen?: StringFieldUpdateOperationsInput | string
    result?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    aiLevel?: NullableIntFieldUpdateOperationsInput | number | null
    timeControl?: NullableStringFieldUpdateOperationsInput | string | null
    moves?: MoveUncheckedUpdateManyWithoutGameNestedInput
  }

  export type GameCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    whitePlayerId?: string | null
    blackPlayerId?: string | null
    pgn?: string | null
    fen: string
    result?: string | null
    status: string
    source?: string | null
    aiLevel?: number | null
    timeControl?: string | null
  }

  export type GameUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pgn?: NullableStringFieldUpdateOperationsInput | string | null
    fen?: StringFieldUpdateOperationsInput | string
    result?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    aiLevel?: NullableIntFieldUpdateOperationsInput | number | null
    timeControl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GameUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    whitePlayerId?: NullableStringFieldUpdateOperationsInput | string | null
    blackPlayerId?: NullableStringFieldUpdateOperationsInput | string | null
    pgn?: NullableStringFieldUpdateOperationsInput | string | null
    fen?: StringFieldUpdateOperationsInput | string
    result?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    aiLevel?: NullableIntFieldUpdateOperationsInput | number | null
    timeControl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MoveCreateInput = {
    id?: string
    ply: number
    fen: string
    san?: string | null
    uci?: string | null
    evalBefore?: number | null
    evalAfter?: number | null
    delta?: number | null
    classification?: string | null
    createdAt?: Date | string
    game: GameCreateNestedOneWithoutMovesInput
  }

  export type MoveUncheckedCreateInput = {
    id?: string
    gameId: string
    ply: number
    fen: string
    san?: string | null
    uci?: string | null
    evalBefore?: number | null
    evalAfter?: number | null
    delta?: number | null
    classification?: string | null
    createdAt?: Date | string
  }

  export type MoveUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ply?: IntFieldUpdateOperationsInput | number
    fen?: StringFieldUpdateOperationsInput | string
    san?: NullableStringFieldUpdateOperationsInput | string | null
    uci?: NullableStringFieldUpdateOperationsInput | string | null
    evalBefore?: NullableFloatFieldUpdateOperationsInput | number | null
    evalAfter?: NullableFloatFieldUpdateOperationsInput | number | null
    delta?: NullableFloatFieldUpdateOperationsInput | number | null
    classification?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    game?: GameUpdateOneRequiredWithoutMovesNestedInput
  }

  export type MoveUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    ply?: IntFieldUpdateOperationsInput | number
    fen?: StringFieldUpdateOperationsInput | string
    san?: NullableStringFieldUpdateOperationsInput | string | null
    uci?: NullableStringFieldUpdateOperationsInput | string | null
    evalBefore?: NullableFloatFieldUpdateOperationsInput | number | null
    evalAfter?: NullableFloatFieldUpdateOperationsInput | number | null
    delta?: NullableFloatFieldUpdateOperationsInput | number | null
    classification?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoveCreateManyInput = {
    id?: string
    gameId: string
    ply: number
    fen: string
    san?: string | null
    uci?: string | null
    evalBefore?: number | null
    evalAfter?: number | null
    delta?: number | null
    classification?: string | null
    createdAt?: Date | string
  }

  export type MoveUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ply?: IntFieldUpdateOperationsInput | number
    fen?: StringFieldUpdateOperationsInput | string
    san?: NullableStringFieldUpdateOperationsInput | string | null
    uci?: NullableStringFieldUpdateOperationsInput | string | null
    evalBefore?: NullableFloatFieldUpdateOperationsInput | number | null
    evalAfter?: NullableFloatFieldUpdateOperationsInput | number | null
    delta?: NullableFloatFieldUpdateOperationsInput | number | null
    classification?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoveUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    ply?: IntFieldUpdateOperationsInput | number
    fen?: StringFieldUpdateOperationsInput | string
    san?: NullableStringFieldUpdateOperationsInput | string | null
    uci?: NullableStringFieldUpdateOperationsInput | string | null
    evalBefore?: NullableFloatFieldUpdateOperationsInput | number | null
    evalAfter?: NullableFloatFieldUpdateOperationsInput | number | null
    delta?: NullableFloatFieldUpdateOperationsInput | number | null
    classification?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OpeningCreateInput = {
    eco: string
    name: string
    fenRoot: string
    dataJson: string
    progress?: OpeningProgressCreateNestedManyWithoutOpeningInput
    repertoire?: UserRepertoireCreateNestedManyWithoutOpeningInput
  }

  export type OpeningUncheckedCreateInput = {
    eco: string
    name: string
    fenRoot: string
    dataJson: string
    progress?: OpeningProgressUncheckedCreateNestedManyWithoutOpeningInput
    repertoire?: UserRepertoireUncheckedCreateNestedManyWithoutOpeningInput
  }

  export type OpeningUpdateInput = {
    eco?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fenRoot?: StringFieldUpdateOperationsInput | string
    dataJson?: StringFieldUpdateOperationsInput | string
    progress?: OpeningProgressUpdateManyWithoutOpeningNestedInput
    repertoire?: UserRepertoireUpdateManyWithoutOpeningNestedInput
  }

  export type OpeningUncheckedUpdateInput = {
    eco?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fenRoot?: StringFieldUpdateOperationsInput | string
    dataJson?: StringFieldUpdateOperationsInput | string
    progress?: OpeningProgressUncheckedUpdateManyWithoutOpeningNestedInput
    repertoire?: UserRepertoireUncheckedUpdateManyWithoutOpeningNestedInput
  }

  export type OpeningCreateManyInput = {
    eco: string
    name: string
    fenRoot: string
    dataJson: string
  }

  export type OpeningUpdateManyMutationInput = {
    eco?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fenRoot?: StringFieldUpdateOperationsInput | string
    dataJson?: StringFieldUpdateOperationsInput | string
  }

  export type OpeningUncheckedUpdateManyInput = {
    eco?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fenRoot?: StringFieldUpdateOperationsInput | string
    dataJson?: StringFieldUpdateOperationsInput | string
  }

  export type OpeningProgressCreateInput = {
    id?: string
    progress: number
    history?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutOpeningProgressInput
    opening: OpeningCreateNestedOneWithoutProgressInput
  }

  export type OpeningProgressUncheckedCreateInput = {
    id?: string
    userId: string
    eco: string
    progress: number
    history?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OpeningProgressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    progress?: FloatFieldUpdateOperationsInput | number
    history?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOpeningProgressNestedInput
    opening?: OpeningUpdateOneRequiredWithoutProgressNestedInput
  }

  export type OpeningProgressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    eco?: StringFieldUpdateOperationsInput | string
    progress?: FloatFieldUpdateOperationsInput | number
    history?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OpeningProgressCreateManyInput = {
    id?: string
    userId: string
    eco: string
    progress: number
    history?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OpeningProgressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    progress?: FloatFieldUpdateOperationsInput | number
    history?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OpeningProgressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    eco?: StringFieldUpdateOperationsInput | string
    progress?: FloatFieldUpdateOperationsInput | number
    history?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRepertoireCreateInput = {
    id?: string
    side: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutRepertoireInput
    opening: OpeningCreateNestedOneWithoutRepertoireInput
  }

  export type UserRepertoireUncheckedCreateInput = {
    id?: string
    userId: string
    eco: string
    side: string
    createdAt?: Date | string
  }

  export type UserRepertoireUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    side?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRepertoireNestedInput
    opening?: OpeningUpdateOneRequiredWithoutRepertoireNestedInput
  }

  export type UserRepertoireUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    eco?: StringFieldUpdateOperationsInput | string
    side?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRepertoireCreateManyInput = {
    id?: string
    userId: string
    eco: string
    side: string
    createdAt?: Date | string
  }

  export type UserRepertoireUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    side?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRepertoireUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    eco?: StringFieldUpdateOperationsInput | string
    side?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type GameListRelationFilter = {
    every?: GameWhereInput
    some?: GameWhereInput
    none?: GameWhereInput
  }

  export type PuzzleAttemptListRelationFilter = {
    every?: PuzzleAttemptWhereInput
    some?: PuzzleAttemptWhereInput
    none?: PuzzleAttemptWhereInput
  }

  export type OpeningProgressListRelationFilter = {
    every?: OpeningProgressWhereInput
    some?: OpeningProgressWhereInput
    none?: OpeningProgressWhereInput
  }

  export type UserRepertoireListRelationFilter = {
    every?: UserRepertoireWhereInput
    some?: UserRepertoireWhereInput
    none?: UserRepertoireWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type GameOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PuzzleAttemptOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OpeningProgressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserRepertoireOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    elo?: SortOrder
    puzzleRating?: SortOrder
    puzzleStreak?: SortOrder
    puzzleSolved?: SortOrder
    puzzleFailed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    elo?: SortOrder
    puzzleRating?: SortOrder
    puzzleStreak?: SortOrder
    puzzleSolved?: SortOrder
    puzzleFailed?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    elo?: SortOrder
    puzzleRating?: SortOrder
    puzzleStreak?: SortOrder
    puzzleSolved?: SortOrder
    puzzleFailed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    elo?: SortOrder
    puzzleRating?: SortOrder
    puzzleStreak?: SortOrder
    puzzleSolved?: SortOrder
    puzzleFailed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    elo?: SortOrder
    puzzleRating?: SortOrder
    puzzleStreak?: SortOrder
    puzzleSolved?: SortOrder
    puzzleFailed?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PuzzleScalarRelationFilter = {
    is?: PuzzleWhereInput
    isNot?: PuzzleWhereInput
  }

  export type PuzzleAttemptCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    puzzleId?: SortOrder
    success?: SortOrder
    rating?: SortOrder
    delta?: SortOrder
    createdAt?: SortOrder
  }

  export type PuzzleAttemptAvgOrderByAggregateInput = {
    rating?: SortOrder
    delta?: SortOrder
  }

  export type PuzzleAttemptMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    puzzleId?: SortOrder
    success?: SortOrder
    rating?: SortOrder
    delta?: SortOrder
    createdAt?: SortOrder
  }

  export type PuzzleAttemptMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    puzzleId?: SortOrder
    success?: SortOrder
    rating?: SortOrder
    delta?: SortOrder
    createdAt?: SortOrder
  }

  export type PuzzleAttemptSumOrderByAggregateInput = {
    rating?: SortOrder
    delta?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type PuzzleCountOrderByAggregateInput = {
    id?: SortOrder
    fen?: SortOrder
    solution?: SortOrder
    rating?: SortOrder
    ratingDeviation?: SortOrder
    themes?: SortOrder
    createdAt?: SortOrder
  }

  export type PuzzleAvgOrderByAggregateInput = {
    rating?: SortOrder
    ratingDeviation?: SortOrder
  }

  export type PuzzleMaxOrderByAggregateInput = {
    id?: SortOrder
    fen?: SortOrder
    solution?: SortOrder
    rating?: SortOrder
    ratingDeviation?: SortOrder
    themes?: SortOrder
    createdAt?: SortOrder
  }

  export type PuzzleMinOrderByAggregateInput = {
    id?: SortOrder
    fen?: SortOrder
    solution?: SortOrder
    rating?: SortOrder
    ratingDeviation?: SortOrder
    themes?: SortOrder
    createdAt?: SortOrder
  }

  export type PuzzleSumOrderByAggregateInput = {
    rating?: SortOrder
    ratingDeviation?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type MoveListRelationFilter = {
    every?: MoveWhereInput
    some?: MoveWhereInput
    none?: MoveWhereInput
  }

  export type MoveOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GameCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    whitePlayerId?: SortOrder
    blackPlayerId?: SortOrder
    pgn?: SortOrder
    fen?: SortOrder
    result?: SortOrder
    status?: SortOrder
    source?: SortOrder
    aiLevel?: SortOrder
    timeControl?: SortOrder
  }

  export type GameAvgOrderByAggregateInput = {
    aiLevel?: SortOrder
  }

  export type GameMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    whitePlayerId?: SortOrder
    blackPlayerId?: SortOrder
    pgn?: SortOrder
    fen?: SortOrder
    result?: SortOrder
    status?: SortOrder
    source?: SortOrder
    aiLevel?: SortOrder
    timeControl?: SortOrder
  }

  export type GameMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    whitePlayerId?: SortOrder
    blackPlayerId?: SortOrder
    pgn?: SortOrder
    fen?: SortOrder
    result?: SortOrder
    status?: SortOrder
    source?: SortOrder
    aiLevel?: SortOrder
    timeControl?: SortOrder
  }

  export type GameSumOrderByAggregateInput = {
    aiLevel?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type GameScalarRelationFilter = {
    is?: GameWhereInput
    isNot?: GameWhereInput
  }

  export type MoveCountOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    ply?: SortOrder
    fen?: SortOrder
    san?: SortOrder
    uci?: SortOrder
    evalBefore?: SortOrder
    evalAfter?: SortOrder
    delta?: SortOrder
    classification?: SortOrder
    createdAt?: SortOrder
  }

  export type MoveAvgOrderByAggregateInput = {
    ply?: SortOrder
    evalBefore?: SortOrder
    evalAfter?: SortOrder
    delta?: SortOrder
  }

  export type MoveMaxOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    ply?: SortOrder
    fen?: SortOrder
    san?: SortOrder
    uci?: SortOrder
    evalBefore?: SortOrder
    evalAfter?: SortOrder
    delta?: SortOrder
    classification?: SortOrder
    createdAt?: SortOrder
  }

  export type MoveMinOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    ply?: SortOrder
    fen?: SortOrder
    san?: SortOrder
    uci?: SortOrder
    evalBefore?: SortOrder
    evalAfter?: SortOrder
    delta?: SortOrder
    classification?: SortOrder
    createdAt?: SortOrder
  }

  export type MoveSumOrderByAggregateInput = {
    ply?: SortOrder
    evalBefore?: SortOrder
    evalAfter?: SortOrder
    delta?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type OpeningCountOrderByAggregateInput = {
    eco?: SortOrder
    name?: SortOrder
    fenRoot?: SortOrder
    dataJson?: SortOrder
  }

  export type OpeningMaxOrderByAggregateInput = {
    eco?: SortOrder
    name?: SortOrder
    fenRoot?: SortOrder
    dataJson?: SortOrder
  }

  export type OpeningMinOrderByAggregateInput = {
    eco?: SortOrder
    name?: SortOrder
    fenRoot?: SortOrder
    dataJson?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type OpeningScalarRelationFilter = {
    is?: OpeningWhereInput
    isNot?: OpeningWhereInput
  }

  export type OpeningProgressUserIdEcoCompoundUniqueInput = {
    userId: string
    eco: string
  }

  export type OpeningProgressCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    eco?: SortOrder
    progress?: SortOrder
    history?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OpeningProgressAvgOrderByAggregateInput = {
    progress?: SortOrder
  }

  export type OpeningProgressMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    eco?: SortOrder
    progress?: SortOrder
    history?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OpeningProgressMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    eco?: SortOrder
    progress?: SortOrder
    history?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OpeningProgressSumOrderByAggregateInput = {
    progress?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type UserRepertoireUserIdEcoCompoundUniqueInput = {
    userId: string
    eco: string
  }

  export type UserRepertoireCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    eco?: SortOrder
    side?: SortOrder
    createdAt?: SortOrder
  }

  export type UserRepertoireMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    eco?: SortOrder
    side?: SortOrder
    createdAt?: SortOrder
  }

  export type UserRepertoireMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    eco?: SortOrder
    side?: SortOrder
    createdAt?: SortOrder
  }

  export type GameCreateNestedManyWithoutBlackPlayerInput = {
    create?: XOR<GameCreateWithoutBlackPlayerInput, GameUncheckedCreateWithoutBlackPlayerInput> | GameCreateWithoutBlackPlayerInput[] | GameUncheckedCreateWithoutBlackPlayerInput[]
    connectOrCreate?: GameCreateOrConnectWithoutBlackPlayerInput | GameCreateOrConnectWithoutBlackPlayerInput[]
    createMany?: GameCreateManyBlackPlayerInputEnvelope
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
  }

  export type GameCreateNestedManyWithoutWhitePlayerInput = {
    create?: XOR<GameCreateWithoutWhitePlayerInput, GameUncheckedCreateWithoutWhitePlayerInput> | GameCreateWithoutWhitePlayerInput[] | GameUncheckedCreateWithoutWhitePlayerInput[]
    connectOrCreate?: GameCreateOrConnectWithoutWhitePlayerInput | GameCreateOrConnectWithoutWhitePlayerInput[]
    createMany?: GameCreateManyWhitePlayerInputEnvelope
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
  }

  export type PuzzleAttemptCreateNestedManyWithoutUserInput = {
    create?: XOR<PuzzleAttemptCreateWithoutUserInput, PuzzleAttemptUncheckedCreateWithoutUserInput> | PuzzleAttemptCreateWithoutUserInput[] | PuzzleAttemptUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PuzzleAttemptCreateOrConnectWithoutUserInput | PuzzleAttemptCreateOrConnectWithoutUserInput[]
    createMany?: PuzzleAttemptCreateManyUserInputEnvelope
    connect?: PuzzleAttemptWhereUniqueInput | PuzzleAttemptWhereUniqueInput[]
  }

  export type OpeningProgressCreateNestedManyWithoutUserInput = {
    create?: XOR<OpeningProgressCreateWithoutUserInput, OpeningProgressUncheckedCreateWithoutUserInput> | OpeningProgressCreateWithoutUserInput[] | OpeningProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OpeningProgressCreateOrConnectWithoutUserInput | OpeningProgressCreateOrConnectWithoutUserInput[]
    createMany?: OpeningProgressCreateManyUserInputEnvelope
    connect?: OpeningProgressWhereUniqueInput | OpeningProgressWhereUniqueInput[]
  }

  export type UserRepertoireCreateNestedManyWithoutUserInput = {
    create?: XOR<UserRepertoireCreateWithoutUserInput, UserRepertoireUncheckedCreateWithoutUserInput> | UserRepertoireCreateWithoutUserInput[] | UserRepertoireUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRepertoireCreateOrConnectWithoutUserInput | UserRepertoireCreateOrConnectWithoutUserInput[]
    createMany?: UserRepertoireCreateManyUserInputEnvelope
    connect?: UserRepertoireWhereUniqueInput | UserRepertoireWhereUniqueInput[]
  }

  export type GameUncheckedCreateNestedManyWithoutBlackPlayerInput = {
    create?: XOR<GameCreateWithoutBlackPlayerInput, GameUncheckedCreateWithoutBlackPlayerInput> | GameCreateWithoutBlackPlayerInput[] | GameUncheckedCreateWithoutBlackPlayerInput[]
    connectOrCreate?: GameCreateOrConnectWithoutBlackPlayerInput | GameCreateOrConnectWithoutBlackPlayerInput[]
    createMany?: GameCreateManyBlackPlayerInputEnvelope
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
  }

  export type GameUncheckedCreateNestedManyWithoutWhitePlayerInput = {
    create?: XOR<GameCreateWithoutWhitePlayerInput, GameUncheckedCreateWithoutWhitePlayerInput> | GameCreateWithoutWhitePlayerInput[] | GameUncheckedCreateWithoutWhitePlayerInput[]
    connectOrCreate?: GameCreateOrConnectWithoutWhitePlayerInput | GameCreateOrConnectWithoutWhitePlayerInput[]
    createMany?: GameCreateManyWhitePlayerInputEnvelope
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
  }

  export type PuzzleAttemptUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PuzzleAttemptCreateWithoutUserInput, PuzzleAttemptUncheckedCreateWithoutUserInput> | PuzzleAttemptCreateWithoutUserInput[] | PuzzleAttemptUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PuzzleAttemptCreateOrConnectWithoutUserInput | PuzzleAttemptCreateOrConnectWithoutUserInput[]
    createMany?: PuzzleAttemptCreateManyUserInputEnvelope
    connect?: PuzzleAttemptWhereUniqueInput | PuzzleAttemptWhereUniqueInput[]
  }

  export type OpeningProgressUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OpeningProgressCreateWithoutUserInput, OpeningProgressUncheckedCreateWithoutUserInput> | OpeningProgressCreateWithoutUserInput[] | OpeningProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OpeningProgressCreateOrConnectWithoutUserInput | OpeningProgressCreateOrConnectWithoutUserInput[]
    createMany?: OpeningProgressCreateManyUserInputEnvelope
    connect?: OpeningProgressWhereUniqueInput | OpeningProgressWhereUniqueInput[]
  }

  export type UserRepertoireUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserRepertoireCreateWithoutUserInput, UserRepertoireUncheckedCreateWithoutUserInput> | UserRepertoireCreateWithoutUserInput[] | UserRepertoireUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRepertoireCreateOrConnectWithoutUserInput | UserRepertoireCreateOrConnectWithoutUserInput[]
    createMany?: UserRepertoireCreateManyUserInputEnvelope
    connect?: UserRepertoireWhereUniqueInput | UserRepertoireWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type GameUpdateManyWithoutBlackPlayerNestedInput = {
    create?: XOR<GameCreateWithoutBlackPlayerInput, GameUncheckedCreateWithoutBlackPlayerInput> | GameCreateWithoutBlackPlayerInput[] | GameUncheckedCreateWithoutBlackPlayerInput[]
    connectOrCreate?: GameCreateOrConnectWithoutBlackPlayerInput | GameCreateOrConnectWithoutBlackPlayerInput[]
    upsert?: GameUpsertWithWhereUniqueWithoutBlackPlayerInput | GameUpsertWithWhereUniqueWithoutBlackPlayerInput[]
    createMany?: GameCreateManyBlackPlayerInputEnvelope
    set?: GameWhereUniqueInput | GameWhereUniqueInput[]
    disconnect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    delete?: GameWhereUniqueInput | GameWhereUniqueInput[]
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    update?: GameUpdateWithWhereUniqueWithoutBlackPlayerInput | GameUpdateWithWhereUniqueWithoutBlackPlayerInput[]
    updateMany?: GameUpdateManyWithWhereWithoutBlackPlayerInput | GameUpdateManyWithWhereWithoutBlackPlayerInput[]
    deleteMany?: GameScalarWhereInput | GameScalarWhereInput[]
  }

  export type GameUpdateManyWithoutWhitePlayerNestedInput = {
    create?: XOR<GameCreateWithoutWhitePlayerInput, GameUncheckedCreateWithoutWhitePlayerInput> | GameCreateWithoutWhitePlayerInput[] | GameUncheckedCreateWithoutWhitePlayerInput[]
    connectOrCreate?: GameCreateOrConnectWithoutWhitePlayerInput | GameCreateOrConnectWithoutWhitePlayerInput[]
    upsert?: GameUpsertWithWhereUniqueWithoutWhitePlayerInput | GameUpsertWithWhereUniqueWithoutWhitePlayerInput[]
    createMany?: GameCreateManyWhitePlayerInputEnvelope
    set?: GameWhereUniqueInput | GameWhereUniqueInput[]
    disconnect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    delete?: GameWhereUniqueInput | GameWhereUniqueInput[]
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    update?: GameUpdateWithWhereUniqueWithoutWhitePlayerInput | GameUpdateWithWhereUniqueWithoutWhitePlayerInput[]
    updateMany?: GameUpdateManyWithWhereWithoutWhitePlayerInput | GameUpdateManyWithWhereWithoutWhitePlayerInput[]
    deleteMany?: GameScalarWhereInput | GameScalarWhereInput[]
  }

  export type PuzzleAttemptUpdateManyWithoutUserNestedInput = {
    create?: XOR<PuzzleAttemptCreateWithoutUserInput, PuzzleAttemptUncheckedCreateWithoutUserInput> | PuzzleAttemptCreateWithoutUserInput[] | PuzzleAttemptUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PuzzleAttemptCreateOrConnectWithoutUserInput | PuzzleAttemptCreateOrConnectWithoutUserInput[]
    upsert?: PuzzleAttemptUpsertWithWhereUniqueWithoutUserInput | PuzzleAttemptUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PuzzleAttemptCreateManyUserInputEnvelope
    set?: PuzzleAttemptWhereUniqueInput | PuzzleAttemptWhereUniqueInput[]
    disconnect?: PuzzleAttemptWhereUniqueInput | PuzzleAttemptWhereUniqueInput[]
    delete?: PuzzleAttemptWhereUniqueInput | PuzzleAttemptWhereUniqueInput[]
    connect?: PuzzleAttemptWhereUniqueInput | PuzzleAttemptWhereUniqueInput[]
    update?: PuzzleAttemptUpdateWithWhereUniqueWithoutUserInput | PuzzleAttemptUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PuzzleAttemptUpdateManyWithWhereWithoutUserInput | PuzzleAttemptUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PuzzleAttemptScalarWhereInput | PuzzleAttemptScalarWhereInput[]
  }

  export type OpeningProgressUpdateManyWithoutUserNestedInput = {
    create?: XOR<OpeningProgressCreateWithoutUserInput, OpeningProgressUncheckedCreateWithoutUserInput> | OpeningProgressCreateWithoutUserInput[] | OpeningProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OpeningProgressCreateOrConnectWithoutUserInput | OpeningProgressCreateOrConnectWithoutUserInput[]
    upsert?: OpeningProgressUpsertWithWhereUniqueWithoutUserInput | OpeningProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OpeningProgressCreateManyUserInputEnvelope
    set?: OpeningProgressWhereUniqueInput | OpeningProgressWhereUniqueInput[]
    disconnect?: OpeningProgressWhereUniqueInput | OpeningProgressWhereUniqueInput[]
    delete?: OpeningProgressWhereUniqueInput | OpeningProgressWhereUniqueInput[]
    connect?: OpeningProgressWhereUniqueInput | OpeningProgressWhereUniqueInput[]
    update?: OpeningProgressUpdateWithWhereUniqueWithoutUserInput | OpeningProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OpeningProgressUpdateManyWithWhereWithoutUserInput | OpeningProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OpeningProgressScalarWhereInput | OpeningProgressScalarWhereInput[]
  }

  export type UserRepertoireUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserRepertoireCreateWithoutUserInput, UserRepertoireUncheckedCreateWithoutUserInput> | UserRepertoireCreateWithoutUserInput[] | UserRepertoireUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRepertoireCreateOrConnectWithoutUserInput | UserRepertoireCreateOrConnectWithoutUserInput[]
    upsert?: UserRepertoireUpsertWithWhereUniqueWithoutUserInput | UserRepertoireUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserRepertoireCreateManyUserInputEnvelope
    set?: UserRepertoireWhereUniqueInput | UserRepertoireWhereUniqueInput[]
    disconnect?: UserRepertoireWhereUniqueInput | UserRepertoireWhereUniqueInput[]
    delete?: UserRepertoireWhereUniqueInput | UserRepertoireWhereUniqueInput[]
    connect?: UserRepertoireWhereUniqueInput | UserRepertoireWhereUniqueInput[]
    update?: UserRepertoireUpdateWithWhereUniqueWithoutUserInput | UserRepertoireUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserRepertoireUpdateManyWithWhereWithoutUserInput | UserRepertoireUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserRepertoireScalarWhereInput | UserRepertoireScalarWhereInput[]
  }

  export type GameUncheckedUpdateManyWithoutBlackPlayerNestedInput = {
    create?: XOR<GameCreateWithoutBlackPlayerInput, GameUncheckedCreateWithoutBlackPlayerInput> | GameCreateWithoutBlackPlayerInput[] | GameUncheckedCreateWithoutBlackPlayerInput[]
    connectOrCreate?: GameCreateOrConnectWithoutBlackPlayerInput | GameCreateOrConnectWithoutBlackPlayerInput[]
    upsert?: GameUpsertWithWhereUniqueWithoutBlackPlayerInput | GameUpsertWithWhereUniqueWithoutBlackPlayerInput[]
    createMany?: GameCreateManyBlackPlayerInputEnvelope
    set?: GameWhereUniqueInput | GameWhereUniqueInput[]
    disconnect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    delete?: GameWhereUniqueInput | GameWhereUniqueInput[]
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    update?: GameUpdateWithWhereUniqueWithoutBlackPlayerInput | GameUpdateWithWhereUniqueWithoutBlackPlayerInput[]
    updateMany?: GameUpdateManyWithWhereWithoutBlackPlayerInput | GameUpdateManyWithWhereWithoutBlackPlayerInput[]
    deleteMany?: GameScalarWhereInput | GameScalarWhereInput[]
  }

  export type GameUncheckedUpdateManyWithoutWhitePlayerNestedInput = {
    create?: XOR<GameCreateWithoutWhitePlayerInput, GameUncheckedCreateWithoutWhitePlayerInput> | GameCreateWithoutWhitePlayerInput[] | GameUncheckedCreateWithoutWhitePlayerInput[]
    connectOrCreate?: GameCreateOrConnectWithoutWhitePlayerInput | GameCreateOrConnectWithoutWhitePlayerInput[]
    upsert?: GameUpsertWithWhereUniqueWithoutWhitePlayerInput | GameUpsertWithWhereUniqueWithoutWhitePlayerInput[]
    createMany?: GameCreateManyWhitePlayerInputEnvelope
    set?: GameWhereUniqueInput | GameWhereUniqueInput[]
    disconnect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    delete?: GameWhereUniqueInput | GameWhereUniqueInput[]
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    update?: GameUpdateWithWhereUniqueWithoutWhitePlayerInput | GameUpdateWithWhereUniqueWithoutWhitePlayerInput[]
    updateMany?: GameUpdateManyWithWhereWithoutWhitePlayerInput | GameUpdateManyWithWhereWithoutWhitePlayerInput[]
    deleteMany?: GameScalarWhereInput | GameScalarWhereInput[]
  }

  export type PuzzleAttemptUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PuzzleAttemptCreateWithoutUserInput, PuzzleAttemptUncheckedCreateWithoutUserInput> | PuzzleAttemptCreateWithoutUserInput[] | PuzzleAttemptUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PuzzleAttemptCreateOrConnectWithoutUserInput | PuzzleAttemptCreateOrConnectWithoutUserInput[]
    upsert?: PuzzleAttemptUpsertWithWhereUniqueWithoutUserInput | PuzzleAttemptUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PuzzleAttemptCreateManyUserInputEnvelope
    set?: PuzzleAttemptWhereUniqueInput | PuzzleAttemptWhereUniqueInput[]
    disconnect?: PuzzleAttemptWhereUniqueInput | PuzzleAttemptWhereUniqueInput[]
    delete?: PuzzleAttemptWhereUniqueInput | PuzzleAttemptWhereUniqueInput[]
    connect?: PuzzleAttemptWhereUniqueInput | PuzzleAttemptWhereUniqueInput[]
    update?: PuzzleAttemptUpdateWithWhereUniqueWithoutUserInput | PuzzleAttemptUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PuzzleAttemptUpdateManyWithWhereWithoutUserInput | PuzzleAttemptUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PuzzleAttemptScalarWhereInput | PuzzleAttemptScalarWhereInput[]
  }

  export type OpeningProgressUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OpeningProgressCreateWithoutUserInput, OpeningProgressUncheckedCreateWithoutUserInput> | OpeningProgressCreateWithoutUserInput[] | OpeningProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OpeningProgressCreateOrConnectWithoutUserInput | OpeningProgressCreateOrConnectWithoutUserInput[]
    upsert?: OpeningProgressUpsertWithWhereUniqueWithoutUserInput | OpeningProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OpeningProgressCreateManyUserInputEnvelope
    set?: OpeningProgressWhereUniqueInput | OpeningProgressWhereUniqueInput[]
    disconnect?: OpeningProgressWhereUniqueInput | OpeningProgressWhereUniqueInput[]
    delete?: OpeningProgressWhereUniqueInput | OpeningProgressWhereUniqueInput[]
    connect?: OpeningProgressWhereUniqueInput | OpeningProgressWhereUniqueInput[]
    update?: OpeningProgressUpdateWithWhereUniqueWithoutUserInput | OpeningProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OpeningProgressUpdateManyWithWhereWithoutUserInput | OpeningProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OpeningProgressScalarWhereInput | OpeningProgressScalarWhereInput[]
  }

  export type UserRepertoireUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserRepertoireCreateWithoutUserInput, UserRepertoireUncheckedCreateWithoutUserInput> | UserRepertoireCreateWithoutUserInput[] | UserRepertoireUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRepertoireCreateOrConnectWithoutUserInput | UserRepertoireCreateOrConnectWithoutUserInput[]
    upsert?: UserRepertoireUpsertWithWhereUniqueWithoutUserInput | UserRepertoireUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserRepertoireCreateManyUserInputEnvelope
    set?: UserRepertoireWhereUniqueInput | UserRepertoireWhereUniqueInput[]
    disconnect?: UserRepertoireWhereUniqueInput | UserRepertoireWhereUniqueInput[]
    delete?: UserRepertoireWhereUniqueInput | UserRepertoireWhereUniqueInput[]
    connect?: UserRepertoireWhereUniqueInput | UserRepertoireWhereUniqueInput[]
    update?: UserRepertoireUpdateWithWhereUniqueWithoutUserInput | UserRepertoireUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserRepertoireUpdateManyWithWhereWithoutUserInput | UserRepertoireUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserRepertoireScalarWhereInput | UserRepertoireScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPuzzleAttemptsInput = {
    create?: XOR<UserCreateWithoutPuzzleAttemptsInput, UserUncheckedCreateWithoutPuzzleAttemptsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPuzzleAttemptsInput
    connect?: UserWhereUniqueInput
  }

  export type PuzzleCreateNestedOneWithoutAttemptsInput = {
    create?: XOR<PuzzleCreateWithoutAttemptsInput, PuzzleUncheckedCreateWithoutAttemptsInput>
    connectOrCreate?: PuzzleCreateOrConnectWithoutAttemptsInput
    connect?: PuzzleWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutPuzzleAttemptsNestedInput = {
    create?: XOR<UserCreateWithoutPuzzleAttemptsInput, UserUncheckedCreateWithoutPuzzleAttemptsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPuzzleAttemptsInput
    upsert?: UserUpsertWithoutPuzzleAttemptsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPuzzleAttemptsInput, UserUpdateWithoutPuzzleAttemptsInput>, UserUncheckedUpdateWithoutPuzzleAttemptsInput>
  }

  export type PuzzleUpdateOneRequiredWithoutAttemptsNestedInput = {
    create?: XOR<PuzzleCreateWithoutAttemptsInput, PuzzleUncheckedCreateWithoutAttemptsInput>
    connectOrCreate?: PuzzleCreateOrConnectWithoutAttemptsInput
    upsert?: PuzzleUpsertWithoutAttemptsInput
    connect?: PuzzleWhereUniqueInput
    update?: XOR<XOR<PuzzleUpdateToOneWithWhereWithoutAttemptsInput, PuzzleUpdateWithoutAttemptsInput>, PuzzleUncheckedUpdateWithoutAttemptsInput>
  }

  export type PuzzleAttemptCreateNestedManyWithoutPuzzleInput = {
    create?: XOR<PuzzleAttemptCreateWithoutPuzzleInput, PuzzleAttemptUncheckedCreateWithoutPuzzleInput> | PuzzleAttemptCreateWithoutPuzzleInput[] | PuzzleAttemptUncheckedCreateWithoutPuzzleInput[]
    connectOrCreate?: PuzzleAttemptCreateOrConnectWithoutPuzzleInput | PuzzleAttemptCreateOrConnectWithoutPuzzleInput[]
    createMany?: PuzzleAttemptCreateManyPuzzleInputEnvelope
    connect?: PuzzleAttemptWhereUniqueInput | PuzzleAttemptWhereUniqueInput[]
  }

  export type PuzzleAttemptUncheckedCreateNestedManyWithoutPuzzleInput = {
    create?: XOR<PuzzleAttemptCreateWithoutPuzzleInput, PuzzleAttemptUncheckedCreateWithoutPuzzleInput> | PuzzleAttemptCreateWithoutPuzzleInput[] | PuzzleAttemptUncheckedCreateWithoutPuzzleInput[]
    connectOrCreate?: PuzzleAttemptCreateOrConnectWithoutPuzzleInput | PuzzleAttemptCreateOrConnectWithoutPuzzleInput[]
    createMany?: PuzzleAttemptCreateManyPuzzleInputEnvelope
    connect?: PuzzleAttemptWhereUniqueInput | PuzzleAttemptWhereUniqueInput[]
  }

  export type PuzzleAttemptUpdateManyWithoutPuzzleNestedInput = {
    create?: XOR<PuzzleAttemptCreateWithoutPuzzleInput, PuzzleAttemptUncheckedCreateWithoutPuzzleInput> | PuzzleAttemptCreateWithoutPuzzleInput[] | PuzzleAttemptUncheckedCreateWithoutPuzzleInput[]
    connectOrCreate?: PuzzleAttemptCreateOrConnectWithoutPuzzleInput | PuzzleAttemptCreateOrConnectWithoutPuzzleInput[]
    upsert?: PuzzleAttemptUpsertWithWhereUniqueWithoutPuzzleInput | PuzzleAttemptUpsertWithWhereUniqueWithoutPuzzleInput[]
    createMany?: PuzzleAttemptCreateManyPuzzleInputEnvelope
    set?: PuzzleAttemptWhereUniqueInput | PuzzleAttemptWhereUniqueInput[]
    disconnect?: PuzzleAttemptWhereUniqueInput | PuzzleAttemptWhereUniqueInput[]
    delete?: PuzzleAttemptWhereUniqueInput | PuzzleAttemptWhereUniqueInput[]
    connect?: PuzzleAttemptWhereUniqueInput | PuzzleAttemptWhereUniqueInput[]
    update?: PuzzleAttemptUpdateWithWhereUniqueWithoutPuzzleInput | PuzzleAttemptUpdateWithWhereUniqueWithoutPuzzleInput[]
    updateMany?: PuzzleAttemptUpdateManyWithWhereWithoutPuzzleInput | PuzzleAttemptUpdateManyWithWhereWithoutPuzzleInput[]
    deleteMany?: PuzzleAttemptScalarWhereInput | PuzzleAttemptScalarWhereInput[]
  }

  export type PuzzleAttemptUncheckedUpdateManyWithoutPuzzleNestedInput = {
    create?: XOR<PuzzleAttemptCreateWithoutPuzzleInput, PuzzleAttemptUncheckedCreateWithoutPuzzleInput> | PuzzleAttemptCreateWithoutPuzzleInput[] | PuzzleAttemptUncheckedCreateWithoutPuzzleInput[]
    connectOrCreate?: PuzzleAttemptCreateOrConnectWithoutPuzzleInput | PuzzleAttemptCreateOrConnectWithoutPuzzleInput[]
    upsert?: PuzzleAttemptUpsertWithWhereUniqueWithoutPuzzleInput | PuzzleAttemptUpsertWithWhereUniqueWithoutPuzzleInput[]
    createMany?: PuzzleAttemptCreateManyPuzzleInputEnvelope
    set?: PuzzleAttemptWhereUniqueInput | PuzzleAttemptWhereUniqueInput[]
    disconnect?: PuzzleAttemptWhereUniqueInput | PuzzleAttemptWhereUniqueInput[]
    delete?: PuzzleAttemptWhereUniqueInput | PuzzleAttemptWhereUniqueInput[]
    connect?: PuzzleAttemptWhereUniqueInput | PuzzleAttemptWhereUniqueInput[]
    update?: PuzzleAttemptUpdateWithWhereUniqueWithoutPuzzleInput | PuzzleAttemptUpdateWithWhereUniqueWithoutPuzzleInput[]
    updateMany?: PuzzleAttemptUpdateManyWithWhereWithoutPuzzleInput | PuzzleAttemptUpdateManyWithWhereWithoutPuzzleInput[]
    deleteMany?: PuzzleAttemptScalarWhereInput | PuzzleAttemptScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutGamesAsBlackInput = {
    create?: XOR<UserCreateWithoutGamesAsBlackInput, UserUncheckedCreateWithoutGamesAsBlackInput>
    connectOrCreate?: UserCreateOrConnectWithoutGamesAsBlackInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutGamesAsWhiteInput = {
    create?: XOR<UserCreateWithoutGamesAsWhiteInput, UserUncheckedCreateWithoutGamesAsWhiteInput>
    connectOrCreate?: UserCreateOrConnectWithoutGamesAsWhiteInput
    connect?: UserWhereUniqueInput
  }

  export type MoveCreateNestedManyWithoutGameInput = {
    create?: XOR<MoveCreateWithoutGameInput, MoveUncheckedCreateWithoutGameInput> | MoveCreateWithoutGameInput[] | MoveUncheckedCreateWithoutGameInput[]
    connectOrCreate?: MoveCreateOrConnectWithoutGameInput | MoveCreateOrConnectWithoutGameInput[]
    createMany?: MoveCreateManyGameInputEnvelope
    connect?: MoveWhereUniqueInput | MoveWhereUniqueInput[]
  }

  export type MoveUncheckedCreateNestedManyWithoutGameInput = {
    create?: XOR<MoveCreateWithoutGameInput, MoveUncheckedCreateWithoutGameInput> | MoveCreateWithoutGameInput[] | MoveUncheckedCreateWithoutGameInput[]
    connectOrCreate?: MoveCreateOrConnectWithoutGameInput | MoveCreateOrConnectWithoutGameInput[]
    createMany?: MoveCreateManyGameInputEnvelope
    connect?: MoveWhereUniqueInput | MoveWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneWithoutGamesAsBlackNestedInput = {
    create?: XOR<UserCreateWithoutGamesAsBlackInput, UserUncheckedCreateWithoutGamesAsBlackInput>
    connectOrCreate?: UserCreateOrConnectWithoutGamesAsBlackInput
    upsert?: UserUpsertWithoutGamesAsBlackInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGamesAsBlackInput, UserUpdateWithoutGamesAsBlackInput>, UserUncheckedUpdateWithoutGamesAsBlackInput>
  }

  export type UserUpdateOneWithoutGamesAsWhiteNestedInput = {
    create?: XOR<UserCreateWithoutGamesAsWhiteInput, UserUncheckedCreateWithoutGamesAsWhiteInput>
    connectOrCreate?: UserCreateOrConnectWithoutGamesAsWhiteInput
    upsert?: UserUpsertWithoutGamesAsWhiteInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGamesAsWhiteInput, UserUpdateWithoutGamesAsWhiteInput>, UserUncheckedUpdateWithoutGamesAsWhiteInput>
  }

  export type MoveUpdateManyWithoutGameNestedInput = {
    create?: XOR<MoveCreateWithoutGameInput, MoveUncheckedCreateWithoutGameInput> | MoveCreateWithoutGameInput[] | MoveUncheckedCreateWithoutGameInput[]
    connectOrCreate?: MoveCreateOrConnectWithoutGameInput | MoveCreateOrConnectWithoutGameInput[]
    upsert?: MoveUpsertWithWhereUniqueWithoutGameInput | MoveUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: MoveCreateManyGameInputEnvelope
    set?: MoveWhereUniqueInput | MoveWhereUniqueInput[]
    disconnect?: MoveWhereUniqueInput | MoveWhereUniqueInput[]
    delete?: MoveWhereUniqueInput | MoveWhereUniqueInput[]
    connect?: MoveWhereUniqueInput | MoveWhereUniqueInput[]
    update?: MoveUpdateWithWhereUniqueWithoutGameInput | MoveUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: MoveUpdateManyWithWhereWithoutGameInput | MoveUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: MoveScalarWhereInput | MoveScalarWhereInput[]
  }

  export type MoveUncheckedUpdateManyWithoutGameNestedInput = {
    create?: XOR<MoveCreateWithoutGameInput, MoveUncheckedCreateWithoutGameInput> | MoveCreateWithoutGameInput[] | MoveUncheckedCreateWithoutGameInput[]
    connectOrCreate?: MoveCreateOrConnectWithoutGameInput | MoveCreateOrConnectWithoutGameInput[]
    upsert?: MoveUpsertWithWhereUniqueWithoutGameInput | MoveUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: MoveCreateManyGameInputEnvelope
    set?: MoveWhereUniqueInput | MoveWhereUniqueInput[]
    disconnect?: MoveWhereUniqueInput | MoveWhereUniqueInput[]
    delete?: MoveWhereUniqueInput | MoveWhereUniqueInput[]
    connect?: MoveWhereUniqueInput | MoveWhereUniqueInput[]
    update?: MoveUpdateWithWhereUniqueWithoutGameInput | MoveUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: MoveUpdateManyWithWhereWithoutGameInput | MoveUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: MoveScalarWhereInput | MoveScalarWhereInput[]
  }

  export type GameCreateNestedOneWithoutMovesInput = {
    create?: XOR<GameCreateWithoutMovesInput, GameUncheckedCreateWithoutMovesInput>
    connectOrCreate?: GameCreateOrConnectWithoutMovesInput
    connect?: GameWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type GameUpdateOneRequiredWithoutMovesNestedInput = {
    create?: XOR<GameCreateWithoutMovesInput, GameUncheckedCreateWithoutMovesInput>
    connectOrCreate?: GameCreateOrConnectWithoutMovesInput
    upsert?: GameUpsertWithoutMovesInput
    connect?: GameWhereUniqueInput
    update?: XOR<XOR<GameUpdateToOneWithWhereWithoutMovesInput, GameUpdateWithoutMovesInput>, GameUncheckedUpdateWithoutMovesInput>
  }

  export type OpeningProgressCreateNestedManyWithoutOpeningInput = {
    create?: XOR<OpeningProgressCreateWithoutOpeningInput, OpeningProgressUncheckedCreateWithoutOpeningInput> | OpeningProgressCreateWithoutOpeningInput[] | OpeningProgressUncheckedCreateWithoutOpeningInput[]
    connectOrCreate?: OpeningProgressCreateOrConnectWithoutOpeningInput | OpeningProgressCreateOrConnectWithoutOpeningInput[]
    createMany?: OpeningProgressCreateManyOpeningInputEnvelope
    connect?: OpeningProgressWhereUniqueInput | OpeningProgressWhereUniqueInput[]
  }

  export type UserRepertoireCreateNestedManyWithoutOpeningInput = {
    create?: XOR<UserRepertoireCreateWithoutOpeningInput, UserRepertoireUncheckedCreateWithoutOpeningInput> | UserRepertoireCreateWithoutOpeningInput[] | UserRepertoireUncheckedCreateWithoutOpeningInput[]
    connectOrCreate?: UserRepertoireCreateOrConnectWithoutOpeningInput | UserRepertoireCreateOrConnectWithoutOpeningInput[]
    createMany?: UserRepertoireCreateManyOpeningInputEnvelope
    connect?: UserRepertoireWhereUniqueInput | UserRepertoireWhereUniqueInput[]
  }

  export type OpeningProgressUncheckedCreateNestedManyWithoutOpeningInput = {
    create?: XOR<OpeningProgressCreateWithoutOpeningInput, OpeningProgressUncheckedCreateWithoutOpeningInput> | OpeningProgressCreateWithoutOpeningInput[] | OpeningProgressUncheckedCreateWithoutOpeningInput[]
    connectOrCreate?: OpeningProgressCreateOrConnectWithoutOpeningInput | OpeningProgressCreateOrConnectWithoutOpeningInput[]
    createMany?: OpeningProgressCreateManyOpeningInputEnvelope
    connect?: OpeningProgressWhereUniqueInput | OpeningProgressWhereUniqueInput[]
  }

  export type UserRepertoireUncheckedCreateNestedManyWithoutOpeningInput = {
    create?: XOR<UserRepertoireCreateWithoutOpeningInput, UserRepertoireUncheckedCreateWithoutOpeningInput> | UserRepertoireCreateWithoutOpeningInput[] | UserRepertoireUncheckedCreateWithoutOpeningInput[]
    connectOrCreate?: UserRepertoireCreateOrConnectWithoutOpeningInput | UserRepertoireCreateOrConnectWithoutOpeningInput[]
    createMany?: UserRepertoireCreateManyOpeningInputEnvelope
    connect?: UserRepertoireWhereUniqueInput | UserRepertoireWhereUniqueInput[]
  }

  export type OpeningProgressUpdateManyWithoutOpeningNestedInput = {
    create?: XOR<OpeningProgressCreateWithoutOpeningInput, OpeningProgressUncheckedCreateWithoutOpeningInput> | OpeningProgressCreateWithoutOpeningInput[] | OpeningProgressUncheckedCreateWithoutOpeningInput[]
    connectOrCreate?: OpeningProgressCreateOrConnectWithoutOpeningInput | OpeningProgressCreateOrConnectWithoutOpeningInput[]
    upsert?: OpeningProgressUpsertWithWhereUniqueWithoutOpeningInput | OpeningProgressUpsertWithWhereUniqueWithoutOpeningInput[]
    createMany?: OpeningProgressCreateManyOpeningInputEnvelope
    set?: OpeningProgressWhereUniqueInput | OpeningProgressWhereUniqueInput[]
    disconnect?: OpeningProgressWhereUniqueInput | OpeningProgressWhereUniqueInput[]
    delete?: OpeningProgressWhereUniqueInput | OpeningProgressWhereUniqueInput[]
    connect?: OpeningProgressWhereUniqueInput | OpeningProgressWhereUniqueInput[]
    update?: OpeningProgressUpdateWithWhereUniqueWithoutOpeningInput | OpeningProgressUpdateWithWhereUniqueWithoutOpeningInput[]
    updateMany?: OpeningProgressUpdateManyWithWhereWithoutOpeningInput | OpeningProgressUpdateManyWithWhereWithoutOpeningInput[]
    deleteMany?: OpeningProgressScalarWhereInput | OpeningProgressScalarWhereInput[]
  }

  export type UserRepertoireUpdateManyWithoutOpeningNestedInput = {
    create?: XOR<UserRepertoireCreateWithoutOpeningInput, UserRepertoireUncheckedCreateWithoutOpeningInput> | UserRepertoireCreateWithoutOpeningInput[] | UserRepertoireUncheckedCreateWithoutOpeningInput[]
    connectOrCreate?: UserRepertoireCreateOrConnectWithoutOpeningInput | UserRepertoireCreateOrConnectWithoutOpeningInput[]
    upsert?: UserRepertoireUpsertWithWhereUniqueWithoutOpeningInput | UserRepertoireUpsertWithWhereUniqueWithoutOpeningInput[]
    createMany?: UserRepertoireCreateManyOpeningInputEnvelope
    set?: UserRepertoireWhereUniqueInput | UserRepertoireWhereUniqueInput[]
    disconnect?: UserRepertoireWhereUniqueInput | UserRepertoireWhereUniqueInput[]
    delete?: UserRepertoireWhereUniqueInput | UserRepertoireWhereUniqueInput[]
    connect?: UserRepertoireWhereUniqueInput | UserRepertoireWhereUniqueInput[]
    update?: UserRepertoireUpdateWithWhereUniqueWithoutOpeningInput | UserRepertoireUpdateWithWhereUniqueWithoutOpeningInput[]
    updateMany?: UserRepertoireUpdateManyWithWhereWithoutOpeningInput | UserRepertoireUpdateManyWithWhereWithoutOpeningInput[]
    deleteMany?: UserRepertoireScalarWhereInput | UserRepertoireScalarWhereInput[]
  }

  export type OpeningProgressUncheckedUpdateManyWithoutOpeningNestedInput = {
    create?: XOR<OpeningProgressCreateWithoutOpeningInput, OpeningProgressUncheckedCreateWithoutOpeningInput> | OpeningProgressCreateWithoutOpeningInput[] | OpeningProgressUncheckedCreateWithoutOpeningInput[]
    connectOrCreate?: OpeningProgressCreateOrConnectWithoutOpeningInput | OpeningProgressCreateOrConnectWithoutOpeningInput[]
    upsert?: OpeningProgressUpsertWithWhereUniqueWithoutOpeningInput | OpeningProgressUpsertWithWhereUniqueWithoutOpeningInput[]
    createMany?: OpeningProgressCreateManyOpeningInputEnvelope
    set?: OpeningProgressWhereUniqueInput | OpeningProgressWhereUniqueInput[]
    disconnect?: OpeningProgressWhereUniqueInput | OpeningProgressWhereUniqueInput[]
    delete?: OpeningProgressWhereUniqueInput | OpeningProgressWhereUniqueInput[]
    connect?: OpeningProgressWhereUniqueInput | OpeningProgressWhereUniqueInput[]
    update?: OpeningProgressUpdateWithWhereUniqueWithoutOpeningInput | OpeningProgressUpdateWithWhereUniqueWithoutOpeningInput[]
    updateMany?: OpeningProgressUpdateManyWithWhereWithoutOpeningInput | OpeningProgressUpdateManyWithWhereWithoutOpeningInput[]
    deleteMany?: OpeningProgressScalarWhereInput | OpeningProgressScalarWhereInput[]
  }

  export type UserRepertoireUncheckedUpdateManyWithoutOpeningNestedInput = {
    create?: XOR<UserRepertoireCreateWithoutOpeningInput, UserRepertoireUncheckedCreateWithoutOpeningInput> | UserRepertoireCreateWithoutOpeningInput[] | UserRepertoireUncheckedCreateWithoutOpeningInput[]
    connectOrCreate?: UserRepertoireCreateOrConnectWithoutOpeningInput | UserRepertoireCreateOrConnectWithoutOpeningInput[]
    upsert?: UserRepertoireUpsertWithWhereUniqueWithoutOpeningInput | UserRepertoireUpsertWithWhereUniqueWithoutOpeningInput[]
    createMany?: UserRepertoireCreateManyOpeningInputEnvelope
    set?: UserRepertoireWhereUniqueInput | UserRepertoireWhereUniqueInput[]
    disconnect?: UserRepertoireWhereUniqueInput | UserRepertoireWhereUniqueInput[]
    delete?: UserRepertoireWhereUniqueInput | UserRepertoireWhereUniqueInput[]
    connect?: UserRepertoireWhereUniqueInput | UserRepertoireWhereUniqueInput[]
    update?: UserRepertoireUpdateWithWhereUniqueWithoutOpeningInput | UserRepertoireUpdateWithWhereUniqueWithoutOpeningInput[]
    updateMany?: UserRepertoireUpdateManyWithWhereWithoutOpeningInput | UserRepertoireUpdateManyWithWhereWithoutOpeningInput[]
    deleteMany?: UserRepertoireScalarWhereInput | UserRepertoireScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutOpeningProgressInput = {
    create?: XOR<UserCreateWithoutOpeningProgressInput, UserUncheckedCreateWithoutOpeningProgressInput>
    connectOrCreate?: UserCreateOrConnectWithoutOpeningProgressInput
    connect?: UserWhereUniqueInput
  }

  export type OpeningCreateNestedOneWithoutProgressInput = {
    create?: XOR<OpeningCreateWithoutProgressInput, OpeningUncheckedCreateWithoutProgressInput>
    connectOrCreate?: OpeningCreateOrConnectWithoutProgressInput
    connect?: OpeningWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutOpeningProgressNestedInput = {
    create?: XOR<UserCreateWithoutOpeningProgressInput, UserUncheckedCreateWithoutOpeningProgressInput>
    connectOrCreate?: UserCreateOrConnectWithoutOpeningProgressInput
    upsert?: UserUpsertWithoutOpeningProgressInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOpeningProgressInput, UserUpdateWithoutOpeningProgressInput>, UserUncheckedUpdateWithoutOpeningProgressInput>
  }

  export type OpeningUpdateOneRequiredWithoutProgressNestedInput = {
    create?: XOR<OpeningCreateWithoutProgressInput, OpeningUncheckedCreateWithoutProgressInput>
    connectOrCreate?: OpeningCreateOrConnectWithoutProgressInput
    upsert?: OpeningUpsertWithoutProgressInput
    connect?: OpeningWhereUniqueInput
    update?: XOR<XOR<OpeningUpdateToOneWithWhereWithoutProgressInput, OpeningUpdateWithoutProgressInput>, OpeningUncheckedUpdateWithoutProgressInput>
  }

  export type UserCreateNestedOneWithoutRepertoireInput = {
    create?: XOR<UserCreateWithoutRepertoireInput, UserUncheckedCreateWithoutRepertoireInput>
    connectOrCreate?: UserCreateOrConnectWithoutRepertoireInput
    connect?: UserWhereUniqueInput
  }

  export type OpeningCreateNestedOneWithoutRepertoireInput = {
    create?: XOR<OpeningCreateWithoutRepertoireInput, OpeningUncheckedCreateWithoutRepertoireInput>
    connectOrCreate?: OpeningCreateOrConnectWithoutRepertoireInput
    connect?: OpeningWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutRepertoireNestedInput = {
    create?: XOR<UserCreateWithoutRepertoireInput, UserUncheckedCreateWithoutRepertoireInput>
    connectOrCreate?: UserCreateOrConnectWithoutRepertoireInput
    upsert?: UserUpsertWithoutRepertoireInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRepertoireInput, UserUpdateWithoutRepertoireInput>, UserUncheckedUpdateWithoutRepertoireInput>
  }

  export type OpeningUpdateOneRequiredWithoutRepertoireNestedInput = {
    create?: XOR<OpeningCreateWithoutRepertoireInput, OpeningUncheckedCreateWithoutRepertoireInput>
    connectOrCreate?: OpeningCreateOrConnectWithoutRepertoireInput
    upsert?: OpeningUpsertWithoutRepertoireInput
    connect?: OpeningWhereUniqueInput
    update?: XOR<XOR<OpeningUpdateToOneWithWhereWithoutRepertoireInput, OpeningUpdateWithoutRepertoireInput>, OpeningUncheckedUpdateWithoutRepertoireInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type GameCreateWithoutBlackPlayerInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pgn?: string | null
    fen: string
    result?: string | null
    status: string
    source?: string | null
    aiLevel?: number | null
    timeControl?: string | null
    whitePlayer?: UserCreateNestedOneWithoutGamesAsWhiteInput
    moves?: MoveCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateWithoutBlackPlayerInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    whitePlayerId?: string | null
    pgn?: string | null
    fen: string
    result?: string | null
    status: string
    source?: string | null
    aiLevel?: number | null
    timeControl?: string | null
    moves?: MoveUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameCreateOrConnectWithoutBlackPlayerInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutBlackPlayerInput, GameUncheckedCreateWithoutBlackPlayerInput>
  }

  export type GameCreateManyBlackPlayerInputEnvelope = {
    data: GameCreateManyBlackPlayerInput | GameCreateManyBlackPlayerInput[]
  }

  export type GameCreateWithoutWhitePlayerInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pgn?: string | null
    fen: string
    result?: string | null
    status: string
    source?: string | null
    aiLevel?: number | null
    timeControl?: string | null
    blackPlayer?: UserCreateNestedOneWithoutGamesAsBlackInput
    moves?: MoveCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateWithoutWhitePlayerInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    blackPlayerId?: string | null
    pgn?: string | null
    fen: string
    result?: string | null
    status: string
    source?: string | null
    aiLevel?: number | null
    timeControl?: string | null
    moves?: MoveUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameCreateOrConnectWithoutWhitePlayerInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutWhitePlayerInput, GameUncheckedCreateWithoutWhitePlayerInput>
  }

  export type GameCreateManyWhitePlayerInputEnvelope = {
    data: GameCreateManyWhitePlayerInput | GameCreateManyWhitePlayerInput[]
  }

  export type PuzzleAttemptCreateWithoutUserInput = {
    id?: string
    success: boolean
    rating: number
    delta: number
    createdAt?: Date | string
    puzzle: PuzzleCreateNestedOneWithoutAttemptsInput
  }

  export type PuzzleAttemptUncheckedCreateWithoutUserInput = {
    id?: string
    puzzleId: string
    success: boolean
    rating: number
    delta: number
    createdAt?: Date | string
  }

  export type PuzzleAttemptCreateOrConnectWithoutUserInput = {
    where: PuzzleAttemptWhereUniqueInput
    create: XOR<PuzzleAttemptCreateWithoutUserInput, PuzzleAttemptUncheckedCreateWithoutUserInput>
  }

  export type PuzzleAttemptCreateManyUserInputEnvelope = {
    data: PuzzleAttemptCreateManyUserInput | PuzzleAttemptCreateManyUserInput[]
  }

  export type OpeningProgressCreateWithoutUserInput = {
    id?: string
    progress: number
    history?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    opening: OpeningCreateNestedOneWithoutProgressInput
  }

  export type OpeningProgressUncheckedCreateWithoutUserInput = {
    id?: string
    eco: string
    progress: number
    history?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OpeningProgressCreateOrConnectWithoutUserInput = {
    where: OpeningProgressWhereUniqueInput
    create: XOR<OpeningProgressCreateWithoutUserInput, OpeningProgressUncheckedCreateWithoutUserInput>
  }

  export type OpeningProgressCreateManyUserInputEnvelope = {
    data: OpeningProgressCreateManyUserInput | OpeningProgressCreateManyUserInput[]
  }

  export type UserRepertoireCreateWithoutUserInput = {
    id?: string
    side: string
    createdAt?: Date | string
    opening: OpeningCreateNestedOneWithoutRepertoireInput
  }

  export type UserRepertoireUncheckedCreateWithoutUserInput = {
    id?: string
    eco: string
    side: string
    createdAt?: Date | string
  }

  export type UserRepertoireCreateOrConnectWithoutUserInput = {
    where: UserRepertoireWhereUniqueInput
    create: XOR<UserRepertoireCreateWithoutUserInput, UserRepertoireUncheckedCreateWithoutUserInput>
  }

  export type UserRepertoireCreateManyUserInputEnvelope = {
    data: UserRepertoireCreateManyUserInput | UserRepertoireCreateManyUserInput[]
  }

  export type GameUpsertWithWhereUniqueWithoutBlackPlayerInput = {
    where: GameWhereUniqueInput
    update: XOR<GameUpdateWithoutBlackPlayerInput, GameUncheckedUpdateWithoutBlackPlayerInput>
    create: XOR<GameCreateWithoutBlackPlayerInput, GameUncheckedCreateWithoutBlackPlayerInput>
  }

  export type GameUpdateWithWhereUniqueWithoutBlackPlayerInput = {
    where: GameWhereUniqueInput
    data: XOR<GameUpdateWithoutBlackPlayerInput, GameUncheckedUpdateWithoutBlackPlayerInput>
  }

  export type GameUpdateManyWithWhereWithoutBlackPlayerInput = {
    where: GameScalarWhereInput
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyWithoutBlackPlayerInput>
  }

  export type GameScalarWhereInput = {
    AND?: GameScalarWhereInput | GameScalarWhereInput[]
    OR?: GameScalarWhereInput[]
    NOT?: GameScalarWhereInput | GameScalarWhereInput[]
    id?: StringFilter<"Game"> | string
    createdAt?: DateTimeFilter<"Game"> | Date | string
    updatedAt?: DateTimeFilter<"Game"> | Date | string
    whitePlayerId?: StringNullableFilter<"Game"> | string | null
    blackPlayerId?: StringNullableFilter<"Game"> | string | null
    pgn?: StringNullableFilter<"Game"> | string | null
    fen?: StringFilter<"Game"> | string
    result?: StringNullableFilter<"Game"> | string | null
    status?: StringFilter<"Game"> | string
    source?: StringNullableFilter<"Game"> | string | null
    aiLevel?: IntNullableFilter<"Game"> | number | null
    timeControl?: StringNullableFilter<"Game"> | string | null
  }

  export type GameUpsertWithWhereUniqueWithoutWhitePlayerInput = {
    where: GameWhereUniqueInput
    update: XOR<GameUpdateWithoutWhitePlayerInput, GameUncheckedUpdateWithoutWhitePlayerInput>
    create: XOR<GameCreateWithoutWhitePlayerInput, GameUncheckedCreateWithoutWhitePlayerInput>
  }

  export type GameUpdateWithWhereUniqueWithoutWhitePlayerInput = {
    where: GameWhereUniqueInput
    data: XOR<GameUpdateWithoutWhitePlayerInput, GameUncheckedUpdateWithoutWhitePlayerInput>
  }

  export type GameUpdateManyWithWhereWithoutWhitePlayerInput = {
    where: GameScalarWhereInput
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyWithoutWhitePlayerInput>
  }

  export type PuzzleAttemptUpsertWithWhereUniqueWithoutUserInput = {
    where: PuzzleAttemptWhereUniqueInput
    update: XOR<PuzzleAttemptUpdateWithoutUserInput, PuzzleAttemptUncheckedUpdateWithoutUserInput>
    create: XOR<PuzzleAttemptCreateWithoutUserInput, PuzzleAttemptUncheckedCreateWithoutUserInput>
  }

  export type PuzzleAttemptUpdateWithWhereUniqueWithoutUserInput = {
    where: PuzzleAttemptWhereUniqueInput
    data: XOR<PuzzleAttemptUpdateWithoutUserInput, PuzzleAttemptUncheckedUpdateWithoutUserInput>
  }

  export type PuzzleAttemptUpdateManyWithWhereWithoutUserInput = {
    where: PuzzleAttemptScalarWhereInput
    data: XOR<PuzzleAttemptUpdateManyMutationInput, PuzzleAttemptUncheckedUpdateManyWithoutUserInput>
  }

  export type PuzzleAttemptScalarWhereInput = {
    AND?: PuzzleAttemptScalarWhereInput | PuzzleAttemptScalarWhereInput[]
    OR?: PuzzleAttemptScalarWhereInput[]
    NOT?: PuzzleAttemptScalarWhereInput | PuzzleAttemptScalarWhereInput[]
    id?: StringFilter<"PuzzleAttempt"> | string
    userId?: StringFilter<"PuzzleAttempt"> | string
    puzzleId?: StringFilter<"PuzzleAttempt"> | string
    success?: BoolFilter<"PuzzleAttempt"> | boolean
    rating?: IntFilter<"PuzzleAttempt"> | number
    delta?: IntFilter<"PuzzleAttempt"> | number
    createdAt?: DateTimeFilter<"PuzzleAttempt"> | Date | string
  }

  export type OpeningProgressUpsertWithWhereUniqueWithoutUserInput = {
    where: OpeningProgressWhereUniqueInput
    update: XOR<OpeningProgressUpdateWithoutUserInput, OpeningProgressUncheckedUpdateWithoutUserInput>
    create: XOR<OpeningProgressCreateWithoutUserInput, OpeningProgressUncheckedCreateWithoutUserInput>
  }

  export type OpeningProgressUpdateWithWhereUniqueWithoutUserInput = {
    where: OpeningProgressWhereUniqueInput
    data: XOR<OpeningProgressUpdateWithoutUserInput, OpeningProgressUncheckedUpdateWithoutUserInput>
  }

  export type OpeningProgressUpdateManyWithWhereWithoutUserInput = {
    where: OpeningProgressScalarWhereInput
    data: XOR<OpeningProgressUpdateManyMutationInput, OpeningProgressUncheckedUpdateManyWithoutUserInput>
  }

  export type OpeningProgressScalarWhereInput = {
    AND?: OpeningProgressScalarWhereInput | OpeningProgressScalarWhereInput[]
    OR?: OpeningProgressScalarWhereInput[]
    NOT?: OpeningProgressScalarWhereInput | OpeningProgressScalarWhereInput[]
    id?: StringFilter<"OpeningProgress"> | string
    userId?: StringFilter<"OpeningProgress"> | string
    eco?: StringFilter<"OpeningProgress"> | string
    progress?: FloatFilter<"OpeningProgress"> | number
    history?: StringNullableFilter<"OpeningProgress"> | string | null
    createdAt?: DateTimeFilter<"OpeningProgress"> | Date | string
    updatedAt?: DateTimeFilter<"OpeningProgress"> | Date | string
  }

  export type UserRepertoireUpsertWithWhereUniqueWithoutUserInput = {
    where: UserRepertoireWhereUniqueInput
    update: XOR<UserRepertoireUpdateWithoutUserInput, UserRepertoireUncheckedUpdateWithoutUserInput>
    create: XOR<UserRepertoireCreateWithoutUserInput, UserRepertoireUncheckedCreateWithoutUserInput>
  }

  export type UserRepertoireUpdateWithWhereUniqueWithoutUserInput = {
    where: UserRepertoireWhereUniqueInput
    data: XOR<UserRepertoireUpdateWithoutUserInput, UserRepertoireUncheckedUpdateWithoutUserInput>
  }

  export type UserRepertoireUpdateManyWithWhereWithoutUserInput = {
    where: UserRepertoireScalarWhereInput
    data: XOR<UserRepertoireUpdateManyMutationInput, UserRepertoireUncheckedUpdateManyWithoutUserInput>
  }

  export type UserRepertoireScalarWhereInput = {
    AND?: UserRepertoireScalarWhereInput | UserRepertoireScalarWhereInput[]
    OR?: UserRepertoireScalarWhereInput[]
    NOT?: UserRepertoireScalarWhereInput | UserRepertoireScalarWhereInput[]
    id?: StringFilter<"UserRepertoire"> | string
    userId?: StringFilter<"UserRepertoire"> | string
    eco?: StringFilter<"UserRepertoire"> | string
    side?: StringFilter<"UserRepertoire"> | string
    createdAt?: DateTimeFilter<"UserRepertoire"> | Date | string
  }

  export type UserCreateWithoutPuzzleAttemptsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    elo?: number
    puzzleRating?: number
    puzzleStreak?: number
    puzzleSolved?: number
    puzzleFailed?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    gamesAsBlack?: GameCreateNestedManyWithoutBlackPlayerInput
    gamesAsWhite?: GameCreateNestedManyWithoutWhitePlayerInput
    openingProgress?: OpeningProgressCreateNestedManyWithoutUserInput
    repertoire?: UserRepertoireCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPuzzleAttemptsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    elo?: number
    puzzleRating?: number
    puzzleStreak?: number
    puzzleSolved?: number
    puzzleFailed?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    gamesAsBlack?: GameUncheckedCreateNestedManyWithoutBlackPlayerInput
    gamesAsWhite?: GameUncheckedCreateNestedManyWithoutWhitePlayerInput
    openingProgress?: OpeningProgressUncheckedCreateNestedManyWithoutUserInput
    repertoire?: UserRepertoireUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPuzzleAttemptsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPuzzleAttemptsInput, UserUncheckedCreateWithoutPuzzleAttemptsInput>
  }

  export type PuzzleCreateWithoutAttemptsInput = {
    id: string
    fen: string
    solution: string
    rating: number
    ratingDeviation: number
    themes: string
    createdAt?: Date | string
  }

  export type PuzzleUncheckedCreateWithoutAttemptsInput = {
    id: string
    fen: string
    solution: string
    rating: number
    ratingDeviation: number
    themes: string
    createdAt?: Date | string
  }

  export type PuzzleCreateOrConnectWithoutAttemptsInput = {
    where: PuzzleWhereUniqueInput
    create: XOR<PuzzleCreateWithoutAttemptsInput, PuzzleUncheckedCreateWithoutAttemptsInput>
  }

  export type UserUpsertWithoutPuzzleAttemptsInput = {
    update: XOR<UserUpdateWithoutPuzzleAttemptsInput, UserUncheckedUpdateWithoutPuzzleAttemptsInput>
    create: XOR<UserCreateWithoutPuzzleAttemptsInput, UserUncheckedCreateWithoutPuzzleAttemptsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPuzzleAttemptsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPuzzleAttemptsInput, UserUncheckedUpdateWithoutPuzzleAttemptsInput>
  }

  export type UserUpdateWithoutPuzzleAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    elo?: IntFieldUpdateOperationsInput | number
    puzzleRating?: IntFieldUpdateOperationsInput | number
    puzzleStreak?: IntFieldUpdateOperationsInput | number
    puzzleSolved?: IntFieldUpdateOperationsInput | number
    puzzleFailed?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gamesAsBlack?: GameUpdateManyWithoutBlackPlayerNestedInput
    gamesAsWhite?: GameUpdateManyWithoutWhitePlayerNestedInput
    openingProgress?: OpeningProgressUpdateManyWithoutUserNestedInput
    repertoire?: UserRepertoireUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPuzzleAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    elo?: IntFieldUpdateOperationsInput | number
    puzzleRating?: IntFieldUpdateOperationsInput | number
    puzzleStreak?: IntFieldUpdateOperationsInput | number
    puzzleSolved?: IntFieldUpdateOperationsInput | number
    puzzleFailed?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gamesAsBlack?: GameUncheckedUpdateManyWithoutBlackPlayerNestedInput
    gamesAsWhite?: GameUncheckedUpdateManyWithoutWhitePlayerNestedInput
    openingProgress?: OpeningProgressUncheckedUpdateManyWithoutUserNestedInput
    repertoire?: UserRepertoireUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PuzzleUpsertWithoutAttemptsInput = {
    update: XOR<PuzzleUpdateWithoutAttemptsInput, PuzzleUncheckedUpdateWithoutAttemptsInput>
    create: XOR<PuzzleCreateWithoutAttemptsInput, PuzzleUncheckedCreateWithoutAttemptsInput>
    where?: PuzzleWhereInput
  }

  export type PuzzleUpdateToOneWithWhereWithoutAttemptsInput = {
    where?: PuzzleWhereInput
    data: XOR<PuzzleUpdateWithoutAttemptsInput, PuzzleUncheckedUpdateWithoutAttemptsInput>
  }

  export type PuzzleUpdateWithoutAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fen?: StringFieldUpdateOperationsInput | string
    solution?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    ratingDeviation?: IntFieldUpdateOperationsInput | number
    themes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PuzzleUncheckedUpdateWithoutAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fen?: StringFieldUpdateOperationsInput | string
    solution?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    ratingDeviation?: IntFieldUpdateOperationsInput | number
    themes?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PuzzleAttemptCreateWithoutPuzzleInput = {
    id?: string
    success: boolean
    rating: number
    delta: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutPuzzleAttemptsInput
  }

  export type PuzzleAttemptUncheckedCreateWithoutPuzzleInput = {
    id?: string
    userId: string
    success: boolean
    rating: number
    delta: number
    createdAt?: Date | string
  }

  export type PuzzleAttemptCreateOrConnectWithoutPuzzleInput = {
    where: PuzzleAttemptWhereUniqueInput
    create: XOR<PuzzleAttemptCreateWithoutPuzzleInput, PuzzleAttemptUncheckedCreateWithoutPuzzleInput>
  }

  export type PuzzleAttemptCreateManyPuzzleInputEnvelope = {
    data: PuzzleAttemptCreateManyPuzzleInput | PuzzleAttemptCreateManyPuzzleInput[]
  }

  export type PuzzleAttemptUpsertWithWhereUniqueWithoutPuzzleInput = {
    where: PuzzleAttemptWhereUniqueInput
    update: XOR<PuzzleAttemptUpdateWithoutPuzzleInput, PuzzleAttemptUncheckedUpdateWithoutPuzzleInput>
    create: XOR<PuzzleAttemptCreateWithoutPuzzleInput, PuzzleAttemptUncheckedCreateWithoutPuzzleInput>
  }

  export type PuzzleAttemptUpdateWithWhereUniqueWithoutPuzzleInput = {
    where: PuzzleAttemptWhereUniqueInput
    data: XOR<PuzzleAttemptUpdateWithoutPuzzleInput, PuzzleAttemptUncheckedUpdateWithoutPuzzleInput>
  }

  export type PuzzleAttemptUpdateManyWithWhereWithoutPuzzleInput = {
    where: PuzzleAttemptScalarWhereInput
    data: XOR<PuzzleAttemptUpdateManyMutationInput, PuzzleAttemptUncheckedUpdateManyWithoutPuzzleInput>
  }

  export type UserCreateWithoutGamesAsBlackInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    elo?: number
    puzzleRating?: number
    puzzleStreak?: number
    puzzleSolved?: number
    puzzleFailed?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    gamesAsWhite?: GameCreateNestedManyWithoutWhitePlayerInput
    puzzleAttempts?: PuzzleAttemptCreateNestedManyWithoutUserInput
    openingProgress?: OpeningProgressCreateNestedManyWithoutUserInput
    repertoire?: UserRepertoireCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutGamesAsBlackInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    elo?: number
    puzzleRating?: number
    puzzleStreak?: number
    puzzleSolved?: number
    puzzleFailed?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    gamesAsWhite?: GameUncheckedCreateNestedManyWithoutWhitePlayerInput
    puzzleAttempts?: PuzzleAttemptUncheckedCreateNestedManyWithoutUserInput
    openingProgress?: OpeningProgressUncheckedCreateNestedManyWithoutUserInput
    repertoire?: UserRepertoireUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutGamesAsBlackInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGamesAsBlackInput, UserUncheckedCreateWithoutGamesAsBlackInput>
  }

  export type UserCreateWithoutGamesAsWhiteInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    elo?: number
    puzzleRating?: number
    puzzleStreak?: number
    puzzleSolved?: number
    puzzleFailed?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    gamesAsBlack?: GameCreateNestedManyWithoutBlackPlayerInput
    puzzleAttempts?: PuzzleAttemptCreateNestedManyWithoutUserInput
    openingProgress?: OpeningProgressCreateNestedManyWithoutUserInput
    repertoire?: UserRepertoireCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutGamesAsWhiteInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    elo?: number
    puzzleRating?: number
    puzzleStreak?: number
    puzzleSolved?: number
    puzzleFailed?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    gamesAsBlack?: GameUncheckedCreateNestedManyWithoutBlackPlayerInput
    puzzleAttempts?: PuzzleAttemptUncheckedCreateNestedManyWithoutUserInput
    openingProgress?: OpeningProgressUncheckedCreateNestedManyWithoutUserInput
    repertoire?: UserRepertoireUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutGamesAsWhiteInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGamesAsWhiteInput, UserUncheckedCreateWithoutGamesAsWhiteInput>
  }

  export type MoveCreateWithoutGameInput = {
    id?: string
    ply: number
    fen: string
    san?: string | null
    uci?: string | null
    evalBefore?: number | null
    evalAfter?: number | null
    delta?: number | null
    classification?: string | null
    createdAt?: Date | string
  }

  export type MoveUncheckedCreateWithoutGameInput = {
    id?: string
    ply: number
    fen: string
    san?: string | null
    uci?: string | null
    evalBefore?: number | null
    evalAfter?: number | null
    delta?: number | null
    classification?: string | null
    createdAt?: Date | string
  }

  export type MoveCreateOrConnectWithoutGameInput = {
    where: MoveWhereUniqueInput
    create: XOR<MoveCreateWithoutGameInput, MoveUncheckedCreateWithoutGameInput>
  }

  export type MoveCreateManyGameInputEnvelope = {
    data: MoveCreateManyGameInput | MoveCreateManyGameInput[]
  }

  export type UserUpsertWithoutGamesAsBlackInput = {
    update: XOR<UserUpdateWithoutGamesAsBlackInput, UserUncheckedUpdateWithoutGamesAsBlackInput>
    create: XOR<UserCreateWithoutGamesAsBlackInput, UserUncheckedCreateWithoutGamesAsBlackInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGamesAsBlackInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGamesAsBlackInput, UserUncheckedUpdateWithoutGamesAsBlackInput>
  }

  export type UserUpdateWithoutGamesAsBlackInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    elo?: IntFieldUpdateOperationsInput | number
    puzzleRating?: IntFieldUpdateOperationsInput | number
    puzzleStreak?: IntFieldUpdateOperationsInput | number
    puzzleSolved?: IntFieldUpdateOperationsInput | number
    puzzleFailed?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gamesAsWhite?: GameUpdateManyWithoutWhitePlayerNestedInput
    puzzleAttempts?: PuzzleAttemptUpdateManyWithoutUserNestedInput
    openingProgress?: OpeningProgressUpdateManyWithoutUserNestedInput
    repertoire?: UserRepertoireUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGamesAsBlackInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    elo?: IntFieldUpdateOperationsInput | number
    puzzleRating?: IntFieldUpdateOperationsInput | number
    puzzleStreak?: IntFieldUpdateOperationsInput | number
    puzzleSolved?: IntFieldUpdateOperationsInput | number
    puzzleFailed?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gamesAsWhite?: GameUncheckedUpdateManyWithoutWhitePlayerNestedInput
    puzzleAttempts?: PuzzleAttemptUncheckedUpdateManyWithoutUserNestedInput
    openingProgress?: OpeningProgressUncheckedUpdateManyWithoutUserNestedInput
    repertoire?: UserRepertoireUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutGamesAsWhiteInput = {
    update: XOR<UserUpdateWithoutGamesAsWhiteInput, UserUncheckedUpdateWithoutGamesAsWhiteInput>
    create: XOR<UserCreateWithoutGamesAsWhiteInput, UserUncheckedCreateWithoutGamesAsWhiteInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGamesAsWhiteInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGamesAsWhiteInput, UserUncheckedUpdateWithoutGamesAsWhiteInput>
  }

  export type UserUpdateWithoutGamesAsWhiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    elo?: IntFieldUpdateOperationsInput | number
    puzzleRating?: IntFieldUpdateOperationsInput | number
    puzzleStreak?: IntFieldUpdateOperationsInput | number
    puzzleSolved?: IntFieldUpdateOperationsInput | number
    puzzleFailed?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gamesAsBlack?: GameUpdateManyWithoutBlackPlayerNestedInput
    puzzleAttempts?: PuzzleAttemptUpdateManyWithoutUserNestedInput
    openingProgress?: OpeningProgressUpdateManyWithoutUserNestedInput
    repertoire?: UserRepertoireUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGamesAsWhiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    elo?: IntFieldUpdateOperationsInput | number
    puzzleRating?: IntFieldUpdateOperationsInput | number
    puzzleStreak?: IntFieldUpdateOperationsInput | number
    puzzleSolved?: IntFieldUpdateOperationsInput | number
    puzzleFailed?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gamesAsBlack?: GameUncheckedUpdateManyWithoutBlackPlayerNestedInput
    puzzleAttempts?: PuzzleAttemptUncheckedUpdateManyWithoutUserNestedInput
    openingProgress?: OpeningProgressUncheckedUpdateManyWithoutUserNestedInput
    repertoire?: UserRepertoireUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MoveUpsertWithWhereUniqueWithoutGameInput = {
    where: MoveWhereUniqueInput
    update: XOR<MoveUpdateWithoutGameInput, MoveUncheckedUpdateWithoutGameInput>
    create: XOR<MoveCreateWithoutGameInput, MoveUncheckedCreateWithoutGameInput>
  }

  export type MoveUpdateWithWhereUniqueWithoutGameInput = {
    where: MoveWhereUniqueInput
    data: XOR<MoveUpdateWithoutGameInput, MoveUncheckedUpdateWithoutGameInput>
  }

  export type MoveUpdateManyWithWhereWithoutGameInput = {
    where: MoveScalarWhereInput
    data: XOR<MoveUpdateManyMutationInput, MoveUncheckedUpdateManyWithoutGameInput>
  }

  export type MoveScalarWhereInput = {
    AND?: MoveScalarWhereInput | MoveScalarWhereInput[]
    OR?: MoveScalarWhereInput[]
    NOT?: MoveScalarWhereInput | MoveScalarWhereInput[]
    id?: StringFilter<"Move"> | string
    gameId?: StringFilter<"Move"> | string
    ply?: IntFilter<"Move"> | number
    fen?: StringFilter<"Move"> | string
    san?: StringNullableFilter<"Move"> | string | null
    uci?: StringNullableFilter<"Move"> | string | null
    evalBefore?: FloatNullableFilter<"Move"> | number | null
    evalAfter?: FloatNullableFilter<"Move"> | number | null
    delta?: FloatNullableFilter<"Move"> | number | null
    classification?: StringNullableFilter<"Move"> | string | null
    createdAt?: DateTimeFilter<"Move"> | Date | string
  }

  export type GameCreateWithoutMovesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pgn?: string | null
    fen: string
    result?: string | null
    status: string
    source?: string | null
    aiLevel?: number | null
    timeControl?: string | null
    blackPlayer?: UserCreateNestedOneWithoutGamesAsBlackInput
    whitePlayer?: UserCreateNestedOneWithoutGamesAsWhiteInput
  }

  export type GameUncheckedCreateWithoutMovesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    whitePlayerId?: string | null
    blackPlayerId?: string | null
    pgn?: string | null
    fen: string
    result?: string | null
    status: string
    source?: string | null
    aiLevel?: number | null
    timeControl?: string | null
  }

  export type GameCreateOrConnectWithoutMovesInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutMovesInput, GameUncheckedCreateWithoutMovesInput>
  }

  export type GameUpsertWithoutMovesInput = {
    update: XOR<GameUpdateWithoutMovesInput, GameUncheckedUpdateWithoutMovesInput>
    create: XOR<GameCreateWithoutMovesInput, GameUncheckedCreateWithoutMovesInput>
    where?: GameWhereInput
  }

  export type GameUpdateToOneWithWhereWithoutMovesInput = {
    where?: GameWhereInput
    data: XOR<GameUpdateWithoutMovesInput, GameUncheckedUpdateWithoutMovesInput>
  }

  export type GameUpdateWithoutMovesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pgn?: NullableStringFieldUpdateOperationsInput | string | null
    fen?: StringFieldUpdateOperationsInput | string
    result?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    aiLevel?: NullableIntFieldUpdateOperationsInput | number | null
    timeControl?: NullableStringFieldUpdateOperationsInput | string | null
    blackPlayer?: UserUpdateOneWithoutGamesAsBlackNestedInput
    whitePlayer?: UserUpdateOneWithoutGamesAsWhiteNestedInput
  }

  export type GameUncheckedUpdateWithoutMovesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    whitePlayerId?: NullableStringFieldUpdateOperationsInput | string | null
    blackPlayerId?: NullableStringFieldUpdateOperationsInput | string | null
    pgn?: NullableStringFieldUpdateOperationsInput | string | null
    fen?: StringFieldUpdateOperationsInput | string
    result?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    aiLevel?: NullableIntFieldUpdateOperationsInput | number | null
    timeControl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OpeningProgressCreateWithoutOpeningInput = {
    id?: string
    progress: number
    history?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutOpeningProgressInput
  }

  export type OpeningProgressUncheckedCreateWithoutOpeningInput = {
    id?: string
    userId: string
    progress: number
    history?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OpeningProgressCreateOrConnectWithoutOpeningInput = {
    where: OpeningProgressWhereUniqueInput
    create: XOR<OpeningProgressCreateWithoutOpeningInput, OpeningProgressUncheckedCreateWithoutOpeningInput>
  }

  export type OpeningProgressCreateManyOpeningInputEnvelope = {
    data: OpeningProgressCreateManyOpeningInput | OpeningProgressCreateManyOpeningInput[]
  }

  export type UserRepertoireCreateWithoutOpeningInput = {
    id?: string
    side: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutRepertoireInput
  }

  export type UserRepertoireUncheckedCreateWithoutOpeningInput = {
    id?: string
    userId: string
    side: string
    createdAt?: Date | string
  }

  export type UserRepertoireCreateOrConnectWithoutOpeningInput = {
    where: UserRepertoireWhereUniqueInput
    create: XOR<UserRepertoireCreateWithoutOpeningInput, UserRepertoireUncheckedCreateWithoutOpeningInput>
  }

  export type UserRepertoireCreateManyOpeningInputEnvelope = {
    data: UserRepertoireCreateManyOpeningInput | UserRepertoireCreateManyOpeningInput[]
  }

  export type OpeningProgressUpsertWithWhereUniqueWithoutOpeningInput = {
    where: OpeningProgressWhereUniqueInput
    update: XOR<OpeningProgressUpdateWithoutOpeningInput, OpeningProgressUncheckedUpdateWithoutOpeningInput>
    create: XOR<OpeningProgressCreateWithoutOpeningInput, OpeningProgressUncheckedCreateWithoutOpeningInput>
  }

  export type OpeningProgressUpdateWithWhereUniqueWithoutOpeningInput = {
    where: OpeningProgressWhereUniqueInput
    data: XOR<OpeningProgressUpdateWithoutOpeningInput, OpeningProgressUncheckedUpdateWithoutOpeningInput>
  }

  export type OpeningProgressUpdateManyWithWhereWithoutOpeningInput = {
    where: OpeningProgressScalarWhereInput
    data: XOR<OpeningProgressUpdateManyMutationInput, OpeningProgressUncheckedUpdateManyWithoutOpeningInput>
  }

  export type UserRepertoireUpsertWithWhereUniqueWithoutOpeningInput = {
    where: UserRepertoireWhereUniqueInput
    update: XOR<UserRepertoireUpdateWithoutOpeningInput, UserRepertoireUncheckedUpdateWithoutOpeningInput>
    create: XOR<UserRepertoireCreateWithoutOpeningInput, UserRepertoireUncheckedCreateWithoutOpeningInput>
  }

  export type UserRepertoireUpdateWithWhereUniqueWithoutOpeningInput = {
    where: UserRepertoireWhereUniqueInput
    data: XOR<UserRepertoireUpdateWithoutOpeningInput, UserRepertoireUncheckedUpdateWithoutOpeningInput>
  }

  export type UserRepertoireUpdateManyWithWhereWithoutOpeningInput = {
    where: UserRepertoireScalarWhereInput
    data: XOR<UserRepertoireUpdateManyMutationInput, UserRepertoireUncheckedUpdateManyWithoutOpeningInput>
  }

  export type UserCreateWithoutOpeningProgressInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    elo?: number
    puzzleRating?: number
    puzzleStreak?: number
    puzzleSolved?: number
    puzzleFailed?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    gamesAsBlack?: GameCreateNestedManyWithoutBlackPlayerInput
    gamesAsWhite?: GameCreateNestedManyWithoutWhitePlayerInput
    puzzleAttempts?: PuzzleAttemptCreateNestedManyWithoutUserInput
    repertoire?: UserRepertoireCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOpeningProgressInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    elo?: number
    puzzleRating?: number
    puzzleStreak?: number
    puzzleSolved?: number
    puzzleFailed?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    gamesAsBlack?: GameUncheckedCreateNestedManyWithoutBlackPlayerInput
    gamesAsWhite?: GameUncheckedCreateNestedManyWithoutWhitePlayerInput
    puzzleAttempts?: PuzzleAttemptUncheckedCreateNestedManyWithoutUserInput
    repertoire?: UserRepertoireUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOpeningProgressInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOpeningProgressInput, UserUncheckedCreateWithoutOpeningProgressInput>
  }

  export type OpeningCreateWithoutProgressInput = {
    eco: string
    name: string
    fenRoot: string
    dataJson: string
    repertoire?: UserRepertoireCreateNestedManyWithoutOpeningInput
  }

  export type OpeningUncheckedCreateWithoutProgressInput = {
    eco: string
    name: string
    fenRoot: string
    dataJson: string
    repertoire?: UserRepertoireUncheckedCreateNestedManyWithoutOpeningInput
  }

  export type OpeningCreateOrConnectWithoutProgressInput = {
    where: OpeningWhereUniqueInput
    create: XOR<OpeningCreateWithoutProgressInput, OpeningUncheckedCreateWithoutProgressInput>
  }

  export type UserUpsertWithoutOpeningProgressInput = {
    update: XOR<UserUpdateWithoutOpeningProgressInput, UserUncheckedUpdateWithoutOpeningProgressInput>
    create: XOR<UserCreateWithoutOpeningProgressInput, UserUncheckedCreateWithoutOpeningProgressInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOpeningProgressInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOpeningProgressInput, UserUncheckedUpdateWithoutOpeningProgressInput>
  }

  export type UserUpdateWithoutOpeningProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    elo?: IntFieldUpdateOperationsInput | number
    puzzleRating?: IntFieldUpdateOperationsInput | number
    puzzleStreak?: IntFieldUpdateOperationsInput | number
    puzzleSolved?: IntFieldUpdateOperationsInput | number
    puzzleFailed?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gamesAsBlack?: GameUpdateManyWithoutBlackPlayerNestedInput
    gamesAsWhite?: GameUpdateManyWithoutWhitePlayerNestedInput
    puzzleAttempts?: PuzzleAttemptUpdateManyWithoutUserNestedInput
    repertoire?: UserRepertoireUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOpeningProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    elo?: IntFieldUpdateOperationsInput | number
    puzzleRating?: IntFieldUpdateOperationsInput | number
    puzzleStreak?: IntFieldUpdateOperationsInput | number
    puzzleSolved?: IntFieldUpdateOperationsInput | number
    puzzleFailed?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gamesAsBlack?: GameUncheckedUpdateManyWithoutBlackPlayerNestedInput
    gamesAsWhite?: GameUncheckedUpdateManyWithoutWhitePlayerNestedInput
    puzzleAttempts?: PuzzleAttemptUncheckedUpdateManyWithoutUserNestedInput
    repertoire?: UserRepertoireUncheckedUpdateManyWithoutUserNestedInput
  }

  export type OpeningUpsertWithoutProgressInput = {
    update: XOR<OpeningUpdateWithoutProgressInput, OpeningUncheckedUpdateWithoutProgressInput>
    create: XOR<OpeningCreateWithoutProgressInput, OpeningUncheckedCreateWithoutProgressInput>
    where?: OpeningWhereInput
  }

  export type OpeningUpdateToOneWithWhereWithoutProgressInput = {
    where?: OpeningWhereInput
    data: XOR<OpeningUpdateWithoutProgressInput, OpeningUncheckedUpdateWithoutProgressInput>
  }

  export type OpeningUpdateWithoutProgressInput = {
    eco?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fenRoot?: StringFieldUpdateOperationsInput | string
    dataJson?: StringFieldUpdateOperationsInput | string
    repertoire?: UserRepertoireUpdateManyWithoutOpeningNestedInput
  }

  export type OpeningUncheckedUpdateWithoutProgressInput = {
    eco?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fenRoot?: StringFieldUpdateOperationsInput | string
    dataJson?: StringFieldUpdateOperationsInput | string
    repertoire?: UserRepertoireUncheckedUpdateManyWithoutOpeningNestedInput
  }

  export type UserCreateWithoutRepertoireInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    elo?: number
    puzzleRating?: number
    puzzleStreak?: number
    puzzleSolved?: number
    puzzleFailed?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    gamesAsBlack?: GameCreateNestedManyWithoutBlackPlayerInput
    gamesAsWhite?: GameCreateNestedManyWithoutWhitePlayerInput
    puzzleAttempts?: PuzzleAttemptCreateNestedManyWithoutUserInput
    openingProgress?: OpeningProgressCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRepertoireInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    elo?: number
    puzzleRating?: number
    puzzleStreak?: number
    puzzleSolved?: number
    puzzleFailed?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    gamesAsBlack?: GameUncheckedCreateNestedManyWithoutBlackPlayerInput
    gamesAsWhite?: GameUncheckedCreateNestedManyWithoutWhitePlayerInput
    puzzleAttempts?: PuzzleAttemptUncheckedCreateNestedManyWithoutUserInput
    openingProgress?: OpeningProgressUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRepertoireInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRepertoireInput, UserUncheckedCreateWithoutRepertoireInput>
  }

  export type OpeningCreateWithoutRepertoireInput = {
    eco: string
    name: string
    fenRoot: string
    dataJson: string
    progress?: OpeningProgressCreateNestedManyWithoutOpeningInput
  }

  export type OpeningUncheckedCreateWithoutRepertoireInput = {
    eco: string
    name: string
    fenRoot: string
    dataJson: string
    progress?: OpeningProgressUncheckedCreateNestedManyWithoutOpeningInput
  }

  export type OpeningCreateOrConnectWithoutRepertoireInput = {
    where: OpeningWhereUniqueInput
    create: XOR<OpeningCreateWithoutRepertoireInput, OpeningUncheckedCreateWithoutRepertoireInput>
  }

  export type UserUpsertWithoutRepertoireInput = {
    update: XOR<UserUpdateWithoutRepertoireInput, UserUncheckedUpdateWithoutRepertoireInput>
    create: XOR<UserCreateWithoutRepertoireInput, UserUncheckedCreateWithoutRepertoireInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRepertoireInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRepertoireInput, UserUncheckedUpdateWithoutRepertoireInput>
  }

  export type UserUpdateWithoutRepertoireInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    elo?: IntFieldUpdateOperationsInput | number
    puzzleRating?: IntFieldUpdateOperationsInput | number
    puzzleStreak?: IntFieldUpdateOperationsInput | number
    puzzleSolved?: IntFieldUpdateOperationsInput | number
    puzzleFailed?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gamesAsBlack?: GameUpdateManyWithoutBlackPlayerNestedInput
    gamesAsWhite?: GameUpdateManyWithoutWhitePlayerNestedInput
    puzzleAttempts?: PuzzleAttemptUpdateManyWithoutUserNestedInput
    openingProgress?: OpeningProgressUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRepertoireInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    elo?: IntFieldUpdateOperationsInput | number
    puzzleRating?: IntFieldUpdateOperationsInput | number
    puzzleStreak?: IntFieldUpdateOperationsInput | number
    puzzleSolved?: IntFieldUpdateOperationsInput | number
    puzzleFailed?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gamesAsBlack?: GameUncheckedUpdateManyWithoutBlackPlayerNestedInput
    gamesAsWhite?: GameUncheckedUpdateManyWithoutWhitePlayerNestedInput
    puzzleAttempts?: PuzzleAttemptUncheckedUpdateManyWithoutUserNestedInput
    openingProgress?: OpeningProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type OpeningUpsertWithoutRepertoireInput = {
    update: XOR<OpeningUpdateWithoutRepertoireInput, OpeningUncheckedUpdateWithoutRepertoireInput>
    create: XOR<OpeningCreateWithoutRepertoireInput, OpeningUncheckedCreateWithoutRepertoireInput>
    where?: OpeningWhereInput
  }

  export type OpeningUpdateToOneWithWhereWithoutRepertoireInput = {
    where?: OpeningWhereInput
    data: XOR<OpeningUpdateWithoutRepertoireInput, OpeningUncheckedUpdateWithoutRepertoireInput>
  }

  export type OpeningUpdateWithoutRepertoireInput = {
    eco?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fenRoot?: StringFieldUpdateOperationsInput | string
    dataJson?: StringFieldUpdateOperationsInput | string
    progress?: OpeningProgressUpdateManyWithoutOpeningNestedInput
  }

  export type OpeningUncheckedUpdateWithoutRepertoireInput = {
    eco?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fenRoot?: StringFieldUpdateOperationsInput | string
    dataJson?: StringFieldUpdateOperationsInput | string
    progress?: OpeningProgressUncheckedUpdateManyWithoutOpeningNestedInput
  }

  export type GameCreateManyBlackPlayerInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    whitePlayerId?: string | null
    pgn?: string | null
    fen: string
    result?: string | null
    status: string
    source?: string | null
    aiLevel?: number | null
    timeControl?: string | null
  }

  export type GameCreateManyWhitePlayerInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    blackPlayerId?: string | null
    pgn?: string | null
    fen: string
    result?: string | null
    status: string
    source?: string | null
    aiLevel?: number | null
    timeControl?: string | null
  }

  export type PuzzleAttemptCreateManyUserInput = {
    id?: string
    puzzleId: string
    success: boolean
    rating: number
    delta: number
    createdAt?: Date | string
  }

  export type OpeningProgressCreateManyUserInput = {
    id?: string
    eco: string
    progress: number
    history?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserRepertoireCreateManyUserInput = {
    id?: string
    eco: string
    side: string
    createdAt?: Date | string
  }

  export type GameUpdateWithoutBlackPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pgn?: NullableStringFieldUpdateOperationsInput | string | null
    fen?: StringFieldUpdateOperationsInput | string
    result?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    aiLevel?: NullableIntFieldUpdateOperationsInput | number | null
    timeControl?: NullableStringFieldUpdateOperationsInput | string | null
    whitePlayer?: UserUpdateOneWithoutGamesAsWhiteNestedInput
    moves?: MoveUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateWithoutBlackPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    whitePlayerId?: NullableStringFieldUpdateOperationsInput | string | null
    pgn?: NullableStringFieldUpdateOperationsInput | string | null
    fen?: StringFieldUpdateOperationsInput | string
    result?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    aiLevel?: NullableIntFieldUpdateOperationsInput | number | null
    timeControl?: NullableStringFieldUpdateOperationsInput | string | null
    moves?: MoveUncheckedUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateManyWithoutBlackPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    whitePlayerId?: NullableStringFieldUpdateOperationsInput | string | null
    pgn?: NullableStringFieldUpdateOperationsInput | string | null
    fen?: StringFieldUpdateOperationsInput | string
    result?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    aiLevel?: NullableIntFieldUpdateOperationsInput | number | null
    timeControl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GameUpdateWithoutWhitePlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pgn?: NullableStringFieldUpdateOperationsInput | string | null
    fen?: StringFieldUpdateOperationsInput | string
    result?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    aiLevel?: NullableIntFieldUpdateOperationsInput | number | null
    timeControl?: NullableStringFieldUpdateOperationsInput | string | null
    blackPlayer?: UserUpdateOneWithoutGamesAsBlackNestedInput
    moves?: MoveUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateWithoutWhitePlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    blackPlayerId?: NullableStringFieldUpdateOperationsInput | string | null
    pgn?: NullableStringFieldUpdateOperationsInput | string | null
    fen?: StringFieldUpdateOperationsInput | string
    result?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    aiLevel?: NullableIntFieldUpdateOperationsInput | number | null
    timeControl?: NullableStringFieldUpdateOperationsInput | string | null
    moves?: MoveUncheckedUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateManyWithoutWhitePlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    blackPlayerId?: NullableStringFieldUpdateOperationsInput | string | null
    pgn?: NullableStringFieldUpdateOperationsInput | string | null
    fen?: StringFieldUpdateOperationsInput | string
    result?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    aiLevel?: NullableIntFieldUpdateOperationsInput | number | null
    timeControl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PuzzleAttemptUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    success?: BoolFieldUpdateOperationsInput | boolean
    rating?: IntFieldUpdateOperationsInput | number
    delta?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    puzzle?: PuzzleUpdateOneRequiredWithoutAttemptsNestedInput
  }

  export type PuzzleAttemptUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    puzzleId?: StringFieldUpdateOperationsInput | string
    success?: BoolFieldUpdateOperationsInput | boolean
    rating?: IntFieldUpdateOperationsInput | number
    delta?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PuzzleAttemptUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    puzzleId?: StringFieldUpdateOperationsInput | string
    success?: BoolFieldUpdateOperationsInput | boolean
    rating?: IntFieldUpdateOperationsInput | number
    delta?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OpeningProgressUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    progress?: FloatFieldUpdateOperationsInput | number
    history?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    opening?: OpeningUpdateOneRequiredWithoutProgressNestedInput
  }

  export type OpeningProgressUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    eco?: StringFieldUpdateOperationsInput | string
    progress?: FloatFieldUpdateOperationsInput | number
    history?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OpeningProgressUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    eco?: StringFieldUpdateOperationsInput | string
    progress?: FloatFieldUpdateOperationsInput | number
    history?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRepertoireUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    side?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    opening?: OpeningUpdateOneRequiredWithoutRepertoireNestedInput
  }

  export type UserRepertoireUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    eco?: StringFieldUpdateOperationsInput | string
    side?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRepertoireUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    eco?: StringFieldUpdateOperationsInput | string
    side?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PuzzleAttemptCreateManyPuzzleInput = {
    id?: string
    userId: string
    success: boolean
    rating: number
    delta: number
    createdAt?: Date | string
  }

  export type PuzzleAttemptUpdateWithoutPuzzleInput = {
    id?: StringFieldUpdateOperationsInput | string
    success?: BoolFieldUpdateOperationsInput | boolean
    rating?: IntFieldUpdateOperationsInput | number
    delta?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPuzzleAttemptsNestedInput
  }

  export type PuzzleAttemptUncheckedUpdateWithoutPuzzleInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    success?: BoolFieldUpdateOperationsInput | boolean
    rating?: IntFieldUpdateOperationsInput | number
    delta?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PuzzleAttemptUncheckedUpdateManyWithoutPuzzleInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    success?: BoolFieldUpdateOperationsInput | boolean
    rating?: IntFieldUpdateOperationsInput | number
    delta?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoveCreateManyGameInput = {
    id?: string
    ply: number
    fen: string
    san?: string | null
    uci?: string | null
    evalBefore?: number | null
    evalAfter?: number | null
    delta?: number | null
    classification?: string | null
    createdAt?: Date | string
  }

  export type MoveUpdateWithoutGameInput = {
    id?: StringFieldUpdateOperationsInput | string
    ply?: IntFieldUpdateOperationsInput | number
    fen?: StringFieldUpdateOperationsInput | string
    san?: NullableStringFieldUpdateOperationsInput | string | null
    uci?: NullableStringFieldUpdateOperationsInput | string | null
    evalBefore?: NullableFloatFieldUpdateOperationsInput | number | null
    evalAfter?: NullableFloatFieldUpdateOperationsInput | number | null
    delta?: NullableFloatFieldUpdateOperationsInput | number | null
    classification?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoveUncheckedUpdateWithoutGameInput = {
    id?: StringFieldUpdateOperationsInput | string
    ply?: IntFieldUpdateOperationsInput | number
    fen?: StringFieldUpdateOperationsInput | string
    san?: NullableStringFieldUpdateOperationsInput | string | null
    uci?: NullableStringFieldUpdateOperationsInput | string | null
    evalBefore?: NullableFloatFieldUpdateOperationsInput | number | null
    evalAfter?: NullableFloatFieldUpdateOperationsInput | number | null
    delta?: NullableFloatFieldUpdateOperationsInput | number | null
    classification?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoveUncheckedUpdateManyWithoutGameInput = {
    id?: StringFieldUpdateOperationsInput | string
    ply?: IntFieldUpdateOperationsInput | number
    fen?: StringFieldUpdateOperationsInput | string
    san?: NullableStringFieldUpdateOperationsInput | string | null
    uci?: NullableStringFieldUpdateOperationsInput | string | null
    evalBefore?: NullableFloatFieldUpdateOperationsInput | number | null
    evalAfter?: NullableFloatFieldUpdateOperationsInput | number | null
    delta?: NullableFloatFieldUpdateOperationsInput | number | null
    classification?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OpeningProgressCreateManyOpeningInput = {
    id?: string
    userId: string
    progress: number
    history?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserRepertoireCreateManyOpeningInput = {
    id?: string
    userId: string
    side: string
    createdAt?: Date | string
  }

  export type OpeningProgressUpdateWithoutOpeningInput = {
    id?: StringFieldUpdateOperationsInput | string
    progress?: FloatFieldUpdateOperationsInput | number
    history?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOpeningProgressNestedInput
  }

  export type OpeningProgressUncheckedUpdateWithoutOpeningInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    progress?: FloatFieldUpdateOperationsInput | number
    history?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OpeningProgressUncheckedUpdateManyWithoutOpeningInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    progress?: FloatFieldUpdateOperationsInput | number
    history?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRepertoireUpdateWithoutOpeningInput = {
    id?: StringFieldUpdateOperationsInput | string
    side?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRepertoireNestedInput
  }

  export type UserRepertoireUncheckedUpdateWithoutOpeningInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    side?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRepertoireUncheckedUpdateManyWithoutOpeningInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    side?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
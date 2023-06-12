/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/** Daten zu den Abbildungen eines Buches */
export type AbbildungInput = {
  beschriftung: Scalars['String']['input'];
  contentType: Scalars['String']['input'];
};

/** Enum-Typ für die Art eines Buches */
export enum Art {
  Druckausgabe = 'DRUCKAUSGABE',
  Kindle = 'KINDLE'
}

/** Datenschema zu einem Buch, das gelesen wird */
export type Buch = {
  __typename?: 'Buch';
  art?: Maybe<Art>;
  datum?: Maybe<Scalars['String']['output']>;
  homepage?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isbn: Scalars['String']['output'];
  lieferbar?: Maybe<Scalars['Boolean']['output']>;
  preis: Scalars['Float']['output'];
  rabatt?: Maybe<Scalars['Float']['output']>;
  rating?: Maybe<Scalars['Int']['output']>;
  schlagwoerter?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  titel: Titel;
  version: Scalars['Int']['output'];
};

/** Daten für ein neues Buch */
export type BuchInput = {
  abbildungen?: InputMaybe<Array<AbbildungInput>>;
  art?: InputMaybe<Art>;
  datum?: InputMaybe<Scalars['String']['input']>;
  homepage?: InputMaybe<Scalars['String']['input']>;
  isbn?: InputMaybe<Scalars['String']['input']>;
  lieferbar?: InputMaybe<Scalars['Boolean']['input']>;
  preis?: InputMaybe<Scalars['Float']['input']>;
  rabatt?: InputMaybe<Scalars['Float']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  schlagwoerter?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  titel: TitelInput;
};

/** Daten für ein zu änderndes Buch */
export type BuchUpdateInput = {
  art?: InputMaybe<Art>;
  datum?: InputMaybe<Scalars['String']['input']>;
  homepage?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  isbn?: InputMaybe<Scalars['String']['input']>;
  lieferbar?: InputMaybe<Scalars['Boolean']['input']>;
  preis?: InputMaybe<Scalars['Float']['input']>;
  rabatt?: InputMaybe<Scalars['Float']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  schlagwoerter?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  version?: InputMaybe<Scalars['Int']['input']>;
};

export type LoginResult = {
  __typename?: 'LoginResult';
  expiresIn: Scalars['String']['output'];
  roles: Array<Maybe<Scalars['String']['output']>>;
  token: Scalars['String']['output'];
};

/** Funktionen, um Bücher neu anzulegen, zu aktualisieren oder zu löschen */
export type Mutation = {
  __typename?: 'Mutation';
  create?: Maybe<Scalars['String']['output']>;
  delete?: Maybe<Scalars['Boolean']['output']>;
  login?: Maybe<LoginResult>;
  update?: Maybe<Scalars['Int']['output']>;
};


/** Funktionen, um Bücher neu anzulegen, zu aktualisieren oder zu löschen */
export type MutationCreateArgs = {
  input: BuchInput;
};


/** Funktionen, um Bücher neu anzulegen, zu aktualisieren oder zu löschen */
export type MutationDeleteArgs = {
  id: Scalars['ID']['input'];
};


/** Funktionen, um Bücher neu anzulegen, zu aktualisieren oder zu löschen */
export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


/** Funktionen, um Bücher neu anzulegen, zu aktualisieren oder zu löschen */
export type MutationUpdateArgs = {
  input: BuchUpdateInput;
};

/** Funktionen, um Bücherdaten zu lesen */
export type Query = {
  __typename?: 'Query';
  buch?: Maybe<Buch>;
  buecher?: Maybe<Array<Buch>>;
};


/** Funktionen, um Bücherdaten zu lesen */
export type QueryBuchArgs = {
  id: Scalars['ID']['input'];
};


/** Funktionen, um Bücherdaten zu lesen */
export type QueryBuecherArgs = {
  titel?: InputMaybe<Scalars['String']['input']>;
};

/** Daten zum Titel eines Buches */
export type Titel = {
  __typename?: 'Titel';
  titel: Scalars['String']['output'];
  untertitel?: Maybe<Scalars['String']['output']>;
};

/** Daten zum Titel eines neuen Buches */
export type TitelInput = {
  titel: Scalars['String']['input'];
  untertitel?: InputMaybe<Scalars['String']['input']>;
};

export type BuecherQueryVariables = Exact<{ [key: string]: never; }>;


export type BuecherQuery = { __typename?: 'Query', buecher?: Array<{ __typename?: 'Buch', id: string, version: number, isbn: string, rating?: number | null, lieferbar?: boolean | null, datum?: string | null, homepage?: string | null, schlagwoerter?: Array<string | null> | null, art?: Art | null, titel: { __typename?: 'Titel', titel: string } }> | null };


export const BuecherDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"buecher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buecher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"isbn"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"lieferbar"}},{"kind":"Field","name":{"kind":"Name","value":"datum"}},{"kind":"Field","name":{"kind":"Name","value":"homepage"}},{"kind":"Field","name":{"kind":"Name","value":"schlagwoerter"}},{"kind":"Field","name":{"kind":"Name","value":"art"}},{"kind":"Field","name":{"kind":"Name","value":"titel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"titel"}}]}}]}}]}}]} as unknown as DocumentNode<BuecherQuery, BuecherQueryVariables>;
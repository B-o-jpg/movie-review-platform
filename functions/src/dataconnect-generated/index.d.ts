import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateMovieReviewData {
  review_insert: Review_Key;
}

export interface CreateMovieReviewVariables {
  movieId: UUIDString;
  rating: number;
  reviewText: string;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  username: string;
  email: string;
  passwordHash: string;
  displayName?: string | null;
}

export interface GetReviewsForMovieData {
  reviews: ({
    id: UUIDString;
    rating: number;
    reviewText: string;
    user: {
      id: UUIDString;
      username: string;
      displayName?: string | null;
    } & User_Key;
  } & Review_Key)[];
}

export interface GetReviewsForMovieVariables {
  movieId: UUIDString;
}

export interface GetUserData {
  user?: {
    id: UUIDString;
    username: string;
    displayName?: string | null;
    email: string;
    bio?: string | null;
    createdAt: TimestampString;
  } & User_Key;
}

export interface GetUserVariables {
  id: UUIDString;
}

export interface Movie_Key {
  id: UUIDString;
  __typename?: 'Movie_Key';
}

export interface Review_Key {
  id: UUIDString;
  __typename?: 'Review_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface GetReviewsForMovieRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetReviewsForMovieVariables): QueryRef<GetReviewsForMovieData, GetReviewsForMovieVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetReviewsForMovieVariables): QueryRef<GetReviewsForMovieData, GetReviewsForMovieVariables>;
  operationName: string;
}
export const getReviewsForMovieRef: GetReviewsForMovieRef;

export function getReviewsForMovie(vars: GetReviewsForMovieVariables): QueryPromise<GetReviewsForMovieData, GetReviewsForMovieVariables>;
export function getReviewsForMovie(dc: DataConnect, vars: GetReviewsForMovieVariables): QueryPromise<GetReviewsForMovieData, GetReviewsForMovieVariables>;

interface CreateMovieReviewRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMovieReviewVariables): MutationRef<CreateMovieReviewData, CreateMovieReviewVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateMovieReviewVariables): MutationRef<CreateMovieReviewData, CreateMovieReviewVariables>;
  operationName: string;
}
export const createMovieReviewRef: CreateMovieReviewRef;

export function createMovieReview(vars: CreateMovieReviewVariables): MutationPromise<CreateMovieReviewData, CreateMovieReviewVariables>;
export function createMovieReview(dc: DataConnect, vars: CreateMovieReviewVariables): MutationPromise<CreateMovieReviewData, CreateMovieReviewVariables>;

interface GetUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserVariables): QueryRef<GetUserData, GetUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserVariables): QueryRef<GetUserData, GetUserVariables>;
  operationName: string;
}
export const getUserRef: GetUserRef;

export function getUser(vars: GetUserVariables): QueryPromise<GetUserData, GetUserVariables>;
export function getUser(dc: DataConnect, vars: GetUserVariables): QueryPromise<GetUserData, GetUserVariables>;


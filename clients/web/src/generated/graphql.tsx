import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  json: any;
  jsonb: any;
  point: any;
  timestamptz: any;
  uuid: any;
};

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
export type BooleanComparisonExp = {
  _eq?: Maybe<Scalars['Boolean']>;
  _gt?: Maybe<Scalars['Boolean']>;
  _gte?: Maybe<Scalars['Boolean']>;
  _in?: Maybe<Array<Scalars['Boolean']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Boolean']>;
  _lte?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Scalars['Boolean']>;
  _nin?: Maybe<Array<Scalars['Boolean']>>;
};

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export type IntComparisonExp = {
  _eq?: Maybe<Scalars['Int']>;
  _gt?: Maybe<Scalars['Int']>;
  _gte?: Maybe<Scalars['Int']>;
  _in?: Maybe<Array<Scalars['Int']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Int']>;
  _lte?: Maybe<Scalars['Int']>;
  _neq?: Maybe<Scalars['Int']>;
  _nin?: Maybe<Array<Scalars['Int']>>;
};

export type ReadInput = {
  key: Scalars['String'];
};

export type ReadOutput = {
  __typename?: 'ReadOutput';
  key: Scalars['String'];
  url: Scalars['String'];
};

export type SampleInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type SampleOutput = {
  __typename?: 'SampleOutput';
  accessToken: Scalars['String'];
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type StringComparisonExp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};

/** columns and relationships of "articles" */
export type Articles = {
  __typename?: 'articles';
  archived: Scalars['Boolean'];
  archivedAt?: Maybe<Scalars['timestamptz']>;
  archivedBy?: Maybe<Scalars['Int']>;
  /** An object relationship */
  archivedUser?: Maybe<Users>;
  /** An array relationship */
  articles: Array<Articles>;
  /** An aggregated array relationship */
  articles_aggregate: ArticlesAggregate;
  /** An array relationship */
  articles_user_activities: Array<ArticlesUserActivity>;
  /** An aggregated array relationship */
  articles_user_activities_aggregate: ArticlesUserActivityAggregate;
  /** An array relationship */
  blocks: Array<Blocks>;
  /** An aggregated array relationship */
  blocks_aggregate: BlocksAggregate;
  /** An object relationship */
  children?: Maybe<Articles>;
  createdAt: Scalars['timestamptz'];
  id: Scalars['Int'];
  parentId?: Maybe<Scalars['Int']>;
  path: Scalars['String'];
  position: Scalars['Int'];
  /** An object relationship */
  project?: Maybe<Projects>;
  projectId?: Maybe<Scalars['Int']>;
  published: Scalars['Boolean'];
  publishedAt?: Maybe<Scalars['timestamptz']>;
  publishedBy?: Maybe<Scalars['timestamptz']>;
  slug?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "articles" */
export type ArticlesArticlesArgs = {
  distinct_on?: Maybe<Array<ArticlesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ArticlesOrderBy>>;
  where?: Maybe<ArticlesBoolExp>;
};


/** columns and relationships of "articles" */
export type ArticlesArticlesAggregateArgs = {
  distinct_on?: Maybe<Array<ArticlesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ArticlesOrderBy>>;
  where?: Maybe<ArticlesBoolExp>;
};


/** columns and relationships of "articles" */
export type ArticlesArticlesUserActivitiesArgs = {
  distinct_on?: Maybe<Array<ArticlesUserActivitySelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ArticlesUserActivityOrderBy>>;
  where?: Maybe<ArticlesUserActivityBoolExp>;
};


/** columns and relationships of "articles" */
export type ArticlesArticlesUserActivitiesAggregateArgs = {
  distinct_on?: Maybe<Array<ArticlesUserActivitySelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ArticlesUserActivityOrderBy>>;
  where?: Maybe<ArticlesUserActivityBoolExp>;
};


/** columns and relationships of "articles" */
export type ArticlesBlocksArgs = {
  distinct_on?: Maybe<Array<BlocksSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<BlocksOrderBy>>;
  where?: Maybe<BlocksBoolExp>;
};


/** columns and relationships of "articles" */
export type ArticlesBlocksAggregateArgs = {
  distinct_on?: Maybe<Array<BlocksSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<BlocksOrderBy>>;
  where?: Maybe<BlocksBoolExp>;
};

/** aggregated selection of "articles" */
export type ArticlesAggregate = {
  __typename?: 'articles_aggregate';
  aggregate?: Maybe<ArticlesAggregateFields>;
  nodes: Array<Articles>;
};

/** aggregate fields of "articles" */
export type ArticlesAggregateFields = {
  __typename?: 'articles_aggregate_fields';
  avg?: Maybe<ArticlesAvgFields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<ArticlesMaxFields>;
  min?: Maybe<ArticlesMinFields>;
  stddev?: Maybe<ArticlesStddevFields>;
  stddev_pop?: Maybe<ArticlesStddevPopFields>;
  stddev_samp?: Maybe<ArticlesStddevSampFields>;
  sum?: Maybe<ArticlesSumFields>;
  var_pop?: Maybe<ArticlesVarPopFields>;
  var_samp?: Maybe<ArticlesVarSampFields>;
  variance?: Maybe<ArticlesVarianceFields>;
};


/** aggregate fields of "articles" */
export type ArticlesAggregateFieldsCountArgs = {
  columns?: Maybe<Array<ArticlesSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "articles" */
export type ArticlesAggregateOrderBy = {
  avg?: Maybe<ArticlesAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<ArticlesMaxOrderBy>;
  min?: Maybe<ArticlesMinOrderBy>;
  stddev?: Maybe<ArticlesStddevOrderBy>;
  stddev_pop?: Maybe<ArticlesStddevPopOrderBy>;
  stddev_samp?: Maybe<ArticlesStddevSampOrderBy>;
  sum?: Maybe<ArticlesSumOrderBy>;
  var_pop?: Maybe<ArticlesVarPopOrderBy>;
  var_samp?: Maybe<ArticlesVarSampOrderBy>;
  variance?: Maybe<ArticlesVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "articles" */
export type ArticlesArrRelInsertInput = {
  data: Array<ArticlesInsertInput>;
  on_conflict?: Maybe<ArticlesOnConflict>;
};

/** aggregate avg on columns */
export type ArticlesAvgFields = {
  __typename?: 'articles_avg_fields';
  archivedBy?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  parentId?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
  projectId?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "articles" */
export type ArticlesAvgOrderBy = {
  archivedBy?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  parentId?: Maybe<OrderBy>;
  position?: Maybe<OrderBy>;
  projectId?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "articles". All fields are combined with a logical 'AND'. */
export type ArticlesBoolExp = {
  _and?: Maybe<Array<Maybe<ArticlesBoolExp>>>;
  _not?: Maybe<ArticlesBoolExp>;
  _or?: Maybe<Array<Maybe<ArticlesBoolExp>>>;
  archived?: Maybe<BooleanComparisonExp>;
  archivedAt?: Maybe<TimestamptzComparisonExp>;
  archivedBy?: Maybe<IntComparisonExp>;
  archivedUser?: Maybe<UsersBoolExp>;
  articles?: Maybe<ArticlesBoolExp>;
  articles_user_activities?: Maybe<ArticlesUserActivityBoolExp>;
  blocks?: Maybe<BlocksBoolExp>;
  children?: Maybe<ArticlesBoolExp>;
  createdAt?: Maybe<TimestamptzComparisonExp>;
  id?: Maybe<IntComparisonExp>;
  parentId?: Maybe<IntComparisonExp>;
  path?: Maybe<StringComparisonExp>;
  position?: Maybe<IntComparisonExp>;
  project?: Maybe<ProjectsBoolExp>;
  projectId?: Maybe<IntComparisonExp>;
  published?: Maybe<BooleanComparisonExp>;
  publishedAt?: Maybe<TimestamptzComparisonExp>;
  publishedBy?: Maybe<TimestamptzComparisonExp>;
  slug?: Maybe<StringComparisonExp>;
  title?: Maybe<StringComparisonExp>;
  updatedAt?: Maybe<TimestamptzComparisonExp>;
};

/** unique or primary key constraints on table "articles" */
export enum ArticlesConstraint {
  /** unique or primary key constraint */
  ArticlesPkey = 'articles_pkey'
}

/** input type for incrementing integer column in table "articles" */
export type ArticlesIncInput = {
  archivedBy?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  parentId?: Maybe<Scalars['Int']>;
  position?: Maybe<Scalars['Int']>;
  projectId?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "articles" */
export type ArticlesInsertInput = {
  archived?: Maybe<Scalars['Boolean']>;
  archivedAt?: Maybe<Scalars['timestamptz']>;
  archivedBy?: Maybe<Scalars['Int']>;
  archivedUser?: Maybe<UsersObjRelInsertInput>;
  articles?: Maybe<ArticlesArrRelInsertInput>;
  articles_user_activities?: Maybe<ArticlesUserActivityArrRelInsertInput>;
  blocks?: Maybe<BlocksArrRelInsertInput>;
  children?: Maybe<ArticlesObjRelInsertInput>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  parentId?: Maybe<Scalars['Int']>;
  path?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  project?: Maybe<ProjectsObjRelInsertInput>;
  projectId?: Maybe<Scalars['Int']>;
  published?: Maybe<Scalars['Boolean']>;
  publishedAt?: Maybe<Scalars['timestamptz']>;
  publishedBy?: Maybe<Scalars['timestamptz']>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type ArticlesMaxFields = {
  __typename?: 'articles_max_fields';
  archivedAt?: Maybe<Scalars['timestamptz']>;
  archivedBy?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  parentId?: Maybe<Scalars['Int']>;
  path?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  projectId?: Maybe<Scalars['Int']>;
  publishedAt?: Maybe<Scalars['timestamptz']>;
  publishedBy?: Maybe<Scalars['timestamptz']>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "articles" */
export type ArticlesMaxOrderBy = {
  archivedAt?: Maybe<OrderBy>;
  archivedBy?: Maybe<OrderBy>;
  createdAt?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  parentId?: Maybe<OrderBy>;
  path?: Maybe<OrderBy>;
  position?: Maybe<OrderBy>;
  projectId?: Maybe<OrderBy>;
  publishedAt?: Maybe<OrderBy>;
  publishedBy?: Maybe<OrderBy>;
  slug?: Maybe<OrderBy>;
  title?: Maybe<OrderBy>;
  updatedAt?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type ArticlesMinFields = {
  __typename?: 'articles_min_fields';
  archivedAt?: Maybe<Scalars['timestamptz']>;
  archivedBy?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  parentId?: Maybe<Scalars['Int']>;
  path?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  projectId?: Maybe<Scalars['Int']>;
  publishedAt?: Maybe<Scalars['timestamptz']>;
  publishedBy?: Maybe<Scalars['timestamptz']>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "articles" */
export type ArticlesMinOrderBy = {
  archivedAt?: Maybe<OrderBy>;
  archivedBy?: Maybe<OrderBy>;
  createdAt?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  parentId?: Maybe<OrderBy>;
  path?: Maybe<OrderBy>;
  position?: Maybe<OrderBy>;
  projectId?: Maybe<OrderBy>;
  publishedAt?: Maybe<OrderBy>;
  publishedBy?: Maybe<OrderBy>;
  slug?: Maybe<OrderBy>;
  title?: Maybe<OrderBy>;
  updatedAt?: Maybe<OrderBy>;
};

/** response of any mutation on the table "articles" */
export type ArticlesMutationResponse = {
  __typename?: 'articles_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Articles>;
};

/** input type for inserting object relation for remote table "articles" */
export type ArticlesObjRelInsertInput = {
  data: ArticlesInsertInput;
  on_conflict?: Maybe<ArticlesOnConflict>;
};

/** on conflict condition type for table "articles" */
export type ArticlesOnConflict = {
  constraint: ArticlesConstraint;
  update_columns: Array<ArticlesUpdateColumn>;
  where?: Maybe<ArticlesBoolExp>;
};

/** ordering options when selecting data from "articles" */
export type ArticlesOrderBy = {
  archived?: Maybe<OrderBy>;
  archivedAt?: Maybe<OrderBy>;
  archivedBy?: Maybe<OrderBy>;
  archivedUser?: Maybe<UsersOrderBy>;
  articles_aggregate?: Maybe<ArticlesAggregateOrderBy>;
  articles_user_activities_aggregate?: Maybe<ArticlesUserActivityAggregateOrderBy>;
  blocks_aggregate?: Maybe<BlocksAggregateOrderBy>;
  children?: Maybe<ArticlesOrderBy>;
  createdAt?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  parentId?: Maybe<OrderBy>;
  path?: Maybe<OrderBy>;
  position?: Maybe<OrderBy>;
  project?: Maybe<ProjectsOrderBy>;
  projectId?: Maybe<OrderBy>;
  published?: Maybe<OrderBy>;
  publishedAt?: Maybe<OrderBy>;
  publishedBy?: Maybe<OrderBy>;
  slug?: Maybe<OrderBy>;
  title?: Maybe<OrderBy>;
  updatedAt?: Maybe<OrderBy>;
};

/** primary key columns input for table: "articles" */
export type ArticlesPkColumnsInput = {
  id: Scalars['Int'];
};

/** select columns of table "articles" */
export enum ArticlesSelectColumn {
  /** column name */
  Archived = 'archived',
  /** column name */
  ArchivedAt = 'archivedAt',
  /** column name */
  ArchivedBy = 'archivedBy',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  ParentId = 'parentId',
  /** column name */
  Path = 'path',
  /** column name */
  Position = 'position',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  Published = 'published',
  /** column name */
  PublishedAt = 'publishedAt',
  /** column name */
  PublishedBy = 'publishedBy',
  /** column name */
  Slug = 'slug',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "articles" */
export type ArticlesSetInput = {
  archived?: Maybe<Scalars['Boolean']>;
  archivedAt?: Maybe<Scalars['timestamptz']>;
  archivedBy?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  parentId?: Maybe<Scalars['Int']>;
  path?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  projectId?: Maybe<Scalars['Int']>;
  published?: Maybe<Scalars['Boolean']>;
  publishedAt?: Maybe<Scalars['timestamptz']>;
  publishedBy?: Maybe<Scalars['timestamptz']>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type ArticlesStddevFields = {
  __typename?: 'articles_stddev_fields';
  archivedBy?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  parentId?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
  projectId?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "articles" */
export type ArticlesStddevOrderBy = {
  archivedBy?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  parentId?: Maybe<OrderBy>;
  position?: Maybe<OrderBy>;
  projectId?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type ArticlesStddevPopFields = {
  __typename?: 'articles_stddev_pop_fields';
  archivedBy?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  parentId?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
  projectId?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "articles" */
export type ArticlesStddevPopOrderBy = {
  archivedBy?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  parentId?: Maybe<OrderBy>;
  position?: Maybe<OrderBy>;
  projectId?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type ArticlesStddevSampFields = {
  __typename?: 'articles_stddev_samp_fields';
  archivedBy?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  parentId?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
  projectId?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "articles" */
export type ArticlesStddevSampOrderBy = {
  archivedBy?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  parentId?: Maybe<OrderBy>;
  position?: Maybe<OrderBy>;
  projectId?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type ArticlesSumFields = {
  __typename?: 'articles_sum_fields';
  archivedBy?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  parentId?: Maybe<Scalars['Int']>;
  position?: Maybe<Scalars['Int']>;
  projectId?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "articles" */
export type ArticlesSumOrderBy = {
  archivedBy?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  parentId?: Maybe<OrderBy>;
  position?: Maybe<OrderBy>;
  projectId?: Maybe<OrderBy>;
};

/** update columns of table "articles" */
export enum ArticlesUpdateColumn {
  /** column name */
  Archived = 'archived',
  /** column name */
  ArchivedAt = 'archivedAt',
  /** column name */
  ArchivedBy = 'archivedBy',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  ParentId = 'parentId',
  /** column name */
  Path = 'path',
  /** column name */
  Position = 'position',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  Published = 'published',
  /** column name */
  PublishedAt = 'publishedAt',
  /** column name */
  PublishedBy = 'publishedBy',
  /** column name */
  Slug = 'slug',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** columns and relationships of "articles_user_activity" */
export type ArticlesUserActivity = {
  __typename?: 'articles_user_activity';
  /** An object relationship */
  article: Articles;
  articleId: Scalars['Int'];
  createdAt: Scalars['timestamptz'];
  id: Scalars['Int'];
  updatedAt: Scalars['timestamptz'];
  /** An object relationship */
  user: Users;
  userId: Scalars['Int'];
};

/** aggregated selection of "articles_user_activity" */
export type ArticlesUserActivityAggregate = {
  __typename?: 'articles_user_activity_aggregate';
  aggregate?: Maybe<ArticlesUserActivityAggregateFields>;
  nodes: Array<ArticlesUserActivity>;
};

/** aggregate fields of "articles_user_activity" */
export type ArticlesUserActivityAggregateFields = {
  __typename?: 'articles_user_activity_aggregate_fields';
  avg?: Maybe<ArticlesUserActivityAvgFields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<ArticlesUserActivityMaxFields>;
  min?: Maybe<ArticlesUserActivityMinFields>;
  stddev?: Maybe<ArticlesUserActivityStddevFields>;
  stddev_pop?: Maybe<ArticlesUserActivityStddevPopFields>;
  stddev_samp?: Maybe<ArticlesUserActivityStddevSampFields>;
  sum?: Maybe<ArticlesUserActivitySumFields>;
  var_pop?: Maybe<ArticlesUserActivityVarPopFields>;
  var_samp?: Maybe<ArticlesUserActivityVarSampFields>;
  variance?: Maybe<ArticlesUserActivityVarianceFields>;
};


/** aggregate fields of "articles_user_activity" */
export type ArticlesUserActivityAggregateFieldsCountArgs = {
  columns?: Maybe<Array<ArticlesUserActivitySelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "articles_user_activity" */
export type ArticlesUserActivityAggregateOrderBy = {
  avg?: Maybe<ArticlesUserActivityAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<ArticlesUserActivityMaxOrderBy>;
  min?: Maybe<ArticlesUserActivityMinOrderBy>;
  stddev?: Maybe<ArticlesUserActivityStddevOrderBy>;
  stddev_pop?: Maybe<ArticlesUserActivityStddevPopOrderBy>;
  stddev_samp?: Maybe<ArticlesUserActivityStddevSampOrderBy>;
  sum?: Maybe<ArticlesUserActivitySumOrderBy>;
  var_pop?: Maybe<ArticlesUserActivityVarPopOrderBy>;
  var_samp?: Maybe<ArticlesUserActivityVarSampOrderBy>;
  variance?: Maybe<ArticlesUserActivityVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "articles_user_activity" */
export type ArticlesUserActivityArrRelInsertInput = {
  data: Array<ArticlesUserActivityInsertInput>;
  on_conflict?: Maybe<ArticlesUserActivityOnConflict>;
};

/** aggregate avg on columns */
export type ArticlesUserActivityAvgFields = {
  __typename?: 'articles_user_activity_avg_fields';
  articleId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "articles_user_activity" */
export type ArticlesUserActivityAvgOrderBy = {
  articleId?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "articles_user_activity". All fields are combined with a logical 'AND'. */
export type ArticlesUserActivityBoolExp = {
  _and?: Maybe<Array<Maybe<ArticlesUserActivityBoolExp>>>;
  _not?: Maybe<ArticlesUserActivityBoolExp>;
  _or?: Maybe<Array<Maybe<ArticlesUserActivityBoolExp>>>;
  article?: Maybe<ArticlesBoolExp>;
  articleId?: Maybe<IntComparisonExp>;
  createdAt?: Maybe<TimestamptzComparisonExp>;
  id?: Maybe<IntComparisonExp>;
  updatedAt?: Maybe<TimestamptzComparisonExp>;
  user?: Maybe<UsersBoolExp>;
  userId?: Maybe<IntComparisonExp>;
};

/** unique or primary key constraints on table "articles_user_activity" */
export enum ArticlesUserActivityConstraint {
  /** unique or primary key constraint */
  ArticlesUserActivityPkey = 'articles_user_activity_pkey'
}

/** input type for incrementing integer column in table "articles_user_activity" */
export type ArticlesUserActivityIncInput = {
  articleId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "articles_user_activity" */
export type ArticlesUserActivityInsertInput = {
  article?: Maybe<ArticlesObjRelInsertInput>;
  articleId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  user?: Maybe<UsersObjRelInsertInput>;
  userId?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type ArticlesUserActivityMaxFields = {
  __typename?: 'articles_user_activity_max_fields';
  articleId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "articles_user_activity" */
export type ArticlesUserActivityMaxOrderBy = {
  articleId?: Maybe<OrderBy>;
  createdAt?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  updatedAt?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type ArticlesUserActivityMinFields = {
  __typename?: 'articles_user_activity_min_fields';
  articleId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "articles_user_activity" */
export type ArticlesUserActivityMinOrderBy = {
  articleId?: Maybe<OrderBy>;
  createdAt?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  updatedAt?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

/** response of any mutation on the table "articles_user_activity" */
export type ArticlesUserActivityMutationResponse = {
  __typename?: 'articles_user_activity_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<ArticlesUserActivity>;
};

/** input type for inserting object relation for remote table "articles_user_activity" */
export type ArticlesUserActivityObjRelInsertInput = {
  data: ArticlesUserActivityInsertInput;
  on_conflict?: Maybe<ArticlesUserActivityOnConflict>;
};

/** on conflict condition type for table "articles_user_activity" */
export type ArticlesUserActivityOnConflict = {
  constraint: ArticlesUserActivityConstraint;
  update_columns: Array<ArticlesUserActivityUpdateColumn>;
  where?: Maybe<ArticlesUserActivityBoolExp>;
};

/** ordering options when selecting data from "articles_user_activity" */
export type ArticlesUserActivityOrderBy = {
  article?: Maybe<ArticlesOrderBy>;
  articleId?: Maybe<OrderBy>;
  createdAt?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  updatedAt?: Maybe<OrderBy>;
  user?: Maybe<UsersOrderBy>;
  userId?: Maybe<OrderBy>;
};

/** primary key columns input for table: "articles_user_activity" */
export type ArticlesUserActivityPkColumnsInput = {
  id: Scalars['Int'];
};

/** select columns of table "articles_user_activity" */
export enum ArticlesUserActivitySelectColumn {
  /** column name */
  ArticleId = 'articleId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "articles_user_activity" */
export type ArticlesUserActivitySetInput = {
  articleId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type ArticlesUserActivityStddevFields = {
  __typename?: 'articles_user_activity_stddev_fields';
  articleId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "articles_user_activity" */
export type ArticlesUserActivityStddevOrderBy = {
  articleId?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type ArticlesUserActivityStddevPopFields = {
  __typename?: 'articles_user_activity_stddev_pop_fields';
  articleId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "articles_user_activity" */
export type ArticlesUserActivityStddevPopOrderBy = {
  articleId?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type ArticlesUserActivityStddevSampFields = {
  __typename?: 'articles_user_activity_stddev_samp_fields';
  articleId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "articles_user_activity" */
export type ArticlesUserActivityStddevSampOrderBy = {
  articleId?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type ArticlesUserActivitySumFields = {
  __typename?: 'articles_user_activity_sum_fields';
  articleId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "articles_user_activity" */
export type ArticlesUserActivitySumOrderBy = {
  articleId?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

/** update columns of table "articles_user_activity" */
export enum ArticlesUserActivityUpdateColumn {
  /** column name */
  ArticleId = 'articleId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** aggregate var_pop on columns */
export type ArticlesUserActivityVarPopFields = {
  __typename?: 'articles_user_activity_var_pop_fields';
  articleId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "articles_user_activity" */
export type ArticlesUserActivityVarPopOrderBy = {
  articleId?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type ArticlesUserActivityVarSampFields = {
  __typename?: 'articles_user_activity_var_samp_fields';
  articleId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "articles_user_activity" */
export type ArticlesUserActivityVarSampOrderBy = {
  articleId?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type ArticlesUserActivityVarianceFields = {
  __typename?: 'articles_user_activity_variance_fields';
  articleId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "articles_user_activity" */
export type ArticlesUserActivityVarianceOrderBy = {
  articleId?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

/** aggregate var_pop on columns */
export type ArticlesVarPopFields = {
  __typename?: 'articles_var_pop_fields';
  archivedBy?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  parentId?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
  projectId?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "articles" */
export type ArticlesVarPopOrderBy = {
  archivedBy?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  parentId?: Maybe<OrderBy>;
  position?: Maybe<OrderBy>;
  projectId?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type ArticlesVarSampFields = {
  __typename?: 'articles_var_samp_fields';
  archivedBy?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  parentId?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
  projectId?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "articles" */
export type ArticlesVarSampOrderBy = {
  archivedBy?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  parentId?: Maybe<OrderBy>;
  position?: Maybe<OrderBy>;
  projectId?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type ArticlesVarianceFields = {
  __typename?: 'articles_variance_fields';
  archivedBy?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  parentId?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
  projectId?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "articles" */
export type ArticlesVarianceOrderBy = {
  archivedBy?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  parentId?: Maybe<OrderBy>;
  position?: Maybe<OrderBy>;
  projectId?: Maybe<OrderBy>;
};

/** columns and relationships of "blocks" */
export type Blocks = {
  __typename?: 'blocks';
  /** An object relationship */
  article: Articles;
  articleId: Scalars['Int'];
  /** An array relationship */
  blocks: Array<Blocks>;
  /** An aggregated array relationship */
  blocks_aggregate: BlocksAggregate;
  /** An object relationship */
  children?: Maybe<Blocks>;
  createdAt: Scalars['timestamptz'];
  editingUserId?: Maybe<Scalars['Int']>;
  /** An object relationship */
  editing_user?: Maybe<Users>;
  id: Scalars['Int'];
  parentId?: Maybe<Scalars['Int']>;
  payload: Scalars['jsonb'];
  position: Scalars['Int'];
  type: Scalars['Int'];
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "blocks" */
export type BlocksBlocksArgs = {
  distinct_on?: Maybe<Array<BlocksSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<BlocksOrderBy>>;
  where?: Maybe<BlocksBoolExp>;
};


/** columns and relationships of "blocks" */
export type BlocksBlocksAggregateArgs = {
  distinct_on?: Maybe<Array<BlocksSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<BlocksOrderBy>>;
  where?: Maybe<BlocksBoolExp>;
};


/** columns and relationships of "blocks" */
export type BlocksPayloadArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "blocks" */
export type BlocksAggregate = {
  __typename?: 'blocks_aggregate';
  aggregate?: Maybe<BlocksAggregateFields>;
  nodes: Array<Blocks>;
};

/** aggregate fields of "blocks" */
export type BlocksAggregateFields = {
  __typename?: 'blocks_aggregate_fields';
  avg?: Maybe<BlocksAvgFields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<BlocksMaxFields>;
  min?: Maybe<BlocksMinFields>;
  stddev?: Maybe<BlocksStddevFields>;
  stddev_pop?: Maybe<BlocksStddevPopFields>;
  stddev_samp?: Maybe<BlocksStddevSampFields>;
  sum?: Maybe<BlocksSumFields>;
  var_pop?: Maybe<BlocksVarPopFields>;
  var_samp?: Maybe<BlocksVarSampFields>;
  variance?: Maybe<BlocksVarianceFields>;
};


/** aggregate fields of "blocks" */
export type BlocksAggregateFieldsCountArgs = {
  columns?: Maybe<Array<BlocksSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "blocks" */
export type BlocksAggregateOrderBy = {
  avg?: Maybe<BlocksAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<BlocksMaxOrderBy>;
  min?: Maybe<BlocksMinOrderBy>;
  stddev?: Maybe<BlocksStddevOrderBy>;
  stddev_pop?: Maybe<BlocksStddevPopOrderBy>;
  stddev_samp?: Maybe<BlocksStddevSampOrderBy>;
  sum?: Maybe<BlocksSumOrderBy>;
  var_pop?: Maybe<BlocksVarPopOrderBy>;
  var_samp?: Maybe<BlocksVarSampOrderBy>;
  variance?: Maybe<BlocksVarianceOrderBy>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type BlocksAppendInput = {
  payload?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "blocks" */
export type BlocksArrRelInsertInput = {
  data: Array<BlocksInsertInput>;
  on_conflict?: Maybe<BlocksOnConflict>;
};

/** aggregate avg on columns */
export type BlocksAvgFields = {
  __typename?: 'blocks_avg_fields';
  articleId?: Maybe<Scalars['Float']>;
  editingUserId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  parentId?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "blocks" */
export type BlocksAvgOrderBy = {
  articleId?: Maybe<OrderBy>;
  editingUserId?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  parentId?: Maybe<OrderBy>;
  position?: Maybe<OrderBy>;
  type?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "blocks". All fields are combined with a logical 'AND'. */
export type BlocksBoolExp = {
  _and?: Maybe<Array<Maybe<BlocksBoolExp>>>;
  _not?: Maybe<BlocksBoolExp>;
  _or?: Maybe<Array<Maybe<BlocksBoolExp>>>;
  article?: Maybe<ArticlesBoolExp>;
  articleId?: Maybe<IntComparisonExp>;
  blocks?: Maybe<BlocksBoolExp>;
  children?: Maybe<BlocksBoolExp>;
  createdAt?: Maybe<TimestamptzComparisonExp>;
  editingUserId?: Maybe<IntComparisonExp>;
  editing_user?: Maybe<UsersBoolExp>;
  id?: Maybe<IntComparisonExp>;
  parentId?: Maybe<IntComparisonExp>;
  payload?: Maybe<JsonbComparisonExp>;
  position?: Maybe<IntComparisonExp>;
  type?: Maybe<IntComparisonExp>;
  updatedAt?: Maybe<TimestamptzComparisonExp>;
};

/** unique or primary key constraints on table "blocks" */
export enum BlocksConstraint {
  /** unique or primary key constraint */
  BlocksPkey = 'blocks_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type BlocksDeleteAtPathInput = {
  payload?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type BlocksDeleteElemInput = {
  payload?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type BlocksDeleteKeyInput = {
  payload?: Maybe<Scalars['String']>;
};

/** input type for incrementing integer column in table "blocks" */
export type BlocksIncInput = {
  articleId?: Maybe<Scalars['Int']>;
  editingUserId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  parentId?: Maybe<Scalars['Int']>;
  position?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "blocks" */
export type BlocksInsertInput = {
  article?: Maybe<ArticlesObjRelInsertInput>;
  articleId?: Maybe<Scalars['Int']>;
  blocks?: Maybe<BlocksArrRelInsertInput>;
  children?: Maybe<BlocksObjRelInsertInput>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  editingUserId?: Maybe<Scalars['Int']>;
  editing_user?: Maybe<UsersObjRelInsertInput>;
  id?: Maybe<Scalars['Int']>;
  parentId?: Maybe<Scalars['Int']>;
  payload?: Maybe<Scalars['jsonb']>;
  position?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type BlocksMaxFields = {
  __typename?: 'blocks_max_fields';
  articleId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  editingUserId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  parentId?: Maybe<Scalars['Int']>;
  position?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "blocks" */
export type BlocksMaxOrderBy = {
  articleId?: Maybe<OrderBy>;
  createdAt?: Maybe<OrderBy>;
  editingUserId?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  parentId?: Maybe<OrderBy>;
  position?: Maybe<OrderBy>;
  type?: Maybe<OrderBy>;
  updatedAt?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type BlocksMinFields = {
  __typename?: 'blocks_min_fields';
  articleId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  editingUserId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  parentId?: Maybe<Scalars['Int']>;
  position?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "blocks" */
export type BlocksMinOrderBy = {
  articleId?: Maybe<OrderBy>;
  createdAt?: Maybe<OrderBy>;
  editingUserId?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  parentId?: Maybe<OrderBy>;
  position?: Maybe<OrderBy>;
  type?: Maybe<OrderBy>;
  updatedAt?: Maybe<OrderBy>;
};

/** response of any mutation on the table "blocks" */
export type BlocksMutationResponse = {
  __typename?: 'blocks_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Blocks>;
};

/** input type for inserting object relation for remote table "blocks" */
export type BlocksObjRelInsertInput = {
  data: BlocksInsertInput;
  on_conflict?: Maybe<BlocksOnConflict>;
};

/** on conflict condition type for table "blocks" */
export type BlocksOnConflict = {
  constraint: BlocksConstraint;
  update_columns: Array<BlocksUpdateColumn>;
  where?: Maybe<BlocksBoolExp>;
};

/** ordering options when selecting data from "blocks" */
export type BlocksOrderBy = {
  article?: Maybe<ArticlesOrderBy>;
  articleId?: Maybe<OrderBy>;
  blocks_aggregate?: Maybe<BlocksAggregateOrderBy>;
  children?: Maybe<BlocksOrderBy>;
  createdAt?: Maybe<OrderBy>;
  editingUserId?: Maybe<OrderBy>;
  editing_user?: Maybe<UsersOrderBy>;
  id?: Maybe<OrderBy>;
  parentId?: Maybe<OrderBy>;
  payload?: Maybe<OrderBy>;
  position?: Maybe<OrderBy>;
  type?: Maybe<OrderBy>;
  updatedAt?: Maybe<OrderBy>;
};

/** primary key columns input for table: "blocks" */
export type BlocksPkColumnsInput = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type BlocksPrependInput = {
  payload?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "blocks" */
export enum BlocksSelectColumn {
  /** column name */
  ArticleId = 'articleId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  EditingUserId = 'editingUserId',
  /** column name */
  Id = 'id',
  /** column name */
  ParentId = 'parentId',
  /** column name */
  Payload = 'payload',
  /** column name */
  Position = 'position',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "blocks" */
export type BlocksSetInput = {
  articleId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  editingUserId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  parentId?: Maybe<Scalars['Int']>;
  payload?: Maybe<Scalars['jsonb']>;
  position?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type BlocksStddevFields = {
  __typename?: 'blocks_stddev_fields';
  articleId?: Maybe<Scalars['Float']>;
  editingUserId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  parentId?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "blocks" */
export type BlocksStddevOrderBy = {
  articleId?: Maybe<OrderBy>;
  editingUserId?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  parentId?: Maybe<OrderBy>;
  position?: Maybe<OrderBy>;
  type?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type BlocksStddevPopFields = {
  __typename?: 'blocks_stddev_pop_fields';
  articleId?: Maybe<Scalars['Float']>;
  editingUserId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  parentId?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "blocks" */
export type BlocksStddevPopOrderBy = {
  articleId?: Maybe<OrderBy>;
  editingUserId?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  parentId?: Maybe<OrderBy>;
  position?: Maybe<OrderBy>;
  type?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type BlocksStddevSampFields = {
  __typename?: 'blocks_stddev_samp_fields';
  articleId?: Maybe<Scalars['Float']>;
  editingUserId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  parentId?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "blocks" */
export type BlocksStddevSampOrderBy = {
  articleId?: Maybe<OrderBy>;
  editingUserId?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  parentId?: Maybe<OrderBy>;
  position?: Maybe<OrderBy>;
  type?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type BlocksSumFields = {
  __typename?: 'blocks_sum_fields';
  articleId?: Maybe<Scalars['Int']>;
  editingUserId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  parentId?: Maybe<Scalars['Int']>;
  position?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "blocks" */
export type BlocksSumOrderBy = {
  articleId?: Maybe<OrderBy>;
  editingUserId?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  parentId?: Maybe<OrderBy>;
  position?: Maybe<OrderBy>;
  type?: Maybe<OrderBy>;
};

/** update columns of table "blocks" */
export enum BlocksUpdateColumn {
  /** column name */
  ArticleId = 'articleId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  EditingUserId = 'editingUserId',
  /** column name */
  Id = 'id',
  /** column name */
  ParentId = 'parentId',
  /** column name */
  Payload = 'payload',
  /** column name */
  Position = 'position',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** aggregate var_pop on columns */
export type BlocksVarPopFields = {
  __typename?: 'blocks_var_pop_fields';
  articleId?: Maybe<Scalars['Float']>;
  editingUserId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  parentId?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "blocks" */
export type BlocksVarPopOrderBy = {
  articleId?: Maybe<OrderBy>;
  editingUserId?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  parentId?: Maybe<OrderBy>;
  position?: Maybe<OrderBy>;
  type?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type BlocksVarSampFields = {
  __typename?: 'blocks_var_samp_fields';
  articleId?: Maybe<Scalars['Float']>;
  editingUserId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  parentId?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "blocks" */
export type BlocksVarSampOrderBy = {
  articleId?: Maybe<OrderBy>;
  editingUserId?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  parentId?: Maybe<OrderBy>;
  position?: Maybe<OrderBy>;
  type?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type BlocksVarianceFields = {
  __typename?: 'blocks_variance_fields';
  articleId?: Maybe<Scalars['Float']>;
  editingUserId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  parentId?: Maybe<Scalars['Float']>;
  position?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "blocks" */
export type BlocksVarianceOrderBy = {
  articleId?: Maybe<OrderBy>;
  editingUserId?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  parentId?: Maybe<OrderBy>;
  position?: Maybe<OrderBy>;
  type?: Maybe<OrderBy>;
};

/** columns and relationships of "campaigns" */
export type Campaigns = {
  __typename?: 'campaigns';
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  /** An array relationship */
  segment_campaigns: Array<SegmentCampaigns>;
  /** An aggregated array relationship */
  segment_campaigns_aggregate: SegmentCampaignsAggregate;
};


/** columns and relationships of "campaigns" */
export type CampaignsSegmentCampaignsArgs = {
  distinct_on?: Maybe<Array<SegmentCampaignsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SegmentCampaignsOrderBy>>;
  where?: Maybe<SegmentCampaignsBoolExp>;
};


/** columns and relationships of "campaigns" */
export type CampaignsSegmentCampaignsAggregateArgs = {
  distinct_on?: Maybe<Array<SegmentCampaignsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SegmentCampaignsOrderBy>>;
  where?: Maybe<SegmentCampaignsBoolExp>;
};

/** aggregated selection of "campaigns" */
export type CampaignsAggregate = {
  __typename?: 'campaigns_aggregate';
  aggregate?: Maybe<CampaignsAggregateFields>;
  nodes: Array<Campaigns>;
};

/** aggregate fields of "campaigns" */
export type CampaignsAggregateFields = {
  __typename?: 'campaigns_aggregate_fields';
  avg?: Maybe<CampaignsAvgFields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<CampaignsMaxFields>;
  min?: Maybe<CampaignsMinFields>;
  stddev?: Maybe<CampaignsStddevFields>;
  stddev_pop?: Maybe<CampaignsStddevPopFields>;
  stddev_samp?: Maybe<CampaignsStddevSampFields>;
  sum?: Maybe<CampaignsSumFields>;
  var_pop?: Maybe<CampaignsVarPopFields>;
  var_samp?: Maybe<CampaignsVarSampFields>;
  variance?: Maybe<CampaignsVarianceFields>;
};


/** aggregate fields of "campaigns" */
export type CampaignsAggregateFieldsCountArgs = {
  columns?: Maybe<Array<CampaignsSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "campaigns" */
export type CampaignsAggregateOrderBy = {
  avg?: Maybe<CampaignsAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<CampaignsMaxOrderBy>;
  min?: Maybe<CampaignsMinOrderBy>;
  stddev?: Maybe<CampaignsStddevOrderBy>;
  stddev_pop?: Maybe<CampaignsStddevPopOrderBy>;
  stddev_samp?: Maybe<CampaignsStddevSampOrderBy>;
  sum?: Maybe<CampaignsSumOrderBy>;
  var_pop?: Maybe<CampaignsVarPopOrderBy>;
  var_samp?: Maybe<CampaignsVarSampOrderBy>;
  variance?: Maybe<CampaignsVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "campaigns" */
export type CampaignsArrRelInsertInput = {
  data: Array<CampaignsInsertInput>;
  on_conflict?: Maybe<CampaignsOnConflict>;
};

/** aggregate avg on columns */
export type CampaignsAvgFields = {
  __typename?: 'campaigns_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "campaigns" */
export type CampaignsAvgOrderBy = {
  id?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "campaigns". All fields are combined with a logical 'AND'. */
export type CampaignsBoolExp = {
  _and?: Maybe<Array<Maybe<CampaignsBoolExp>>>;
  _not?: Maybe<CampaignsBoolExp>;
  _or?: Maybe<Array<Maybe<CampaignsBoolExp>>>;
  description?: Maybe<StringComparisonExp>;
  id?: Maybe<IntComparisonExp>;
  name?: Maybe<StringComparisonExp>;
  segment_campaigns?: Maybe<SegmentCampaignsBoolExp>;
};

/** unique or primary key constraints on table "campaigns" */
export enum CampaignsConstraint {
  /** unique or primary key constraint */
  CampaignsPkey = 'campaigns_pkey'
}

/** input type for incrementing integer column in table "campaigns" */
export type CampaignsIncInput = {
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "campaigns" */
export type CampaignsInsertInput = {
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  segment_campaigns?: Maybe<SegmentCampaignsArrRelInsertInput>;
};

/** aggregate max on columns */
export type CampaignsMaxFields = {
  __typename?: 'campaigns_max_fields';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "campaigns" */
export type CampaignsMaxOrderBy = {
  description?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  name?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type CampaignsMinFields = {
  __typename?: 'campaigns_min_fields';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "campaigns" */
export type CampaignsMinOrderBy = {
  description?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  name?: Maybe<OrderBy>;
};

/** response of any mutation on the table "campaigns" */
export type CampaignsMutationResponse = {
  __typename?: 'campaigns_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Campaigns>;
};

/** input type for inserting object relation for remote table "campaigns" */
export type CampaignsObjRelInsertInput = {
  data: CampaignsInsertInput;
  on_conflict?: Maybe<CampaignsOnConflict>;
};

/** on conflict condition type for table "campaigns" */
export type CampaignsOnConflict = {
  constraint: CampaignsConstraint;
  update_columns: Array<CampaignsUpdateColumn>;
  where?: Maybe<CampaignsBoolExp>;
};

/** ordering options when selecting data from "campaigns" */
export type CampaignsOrderBy = {
  description?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  name?: Maybe<OrderBy>;
  segment_campaigns_aggregate?: Maybe<SegmentCampaignsAggregateOrderBy>;
};

/** primary key columns input for table: "campaigns" */
export type CampaignsPkColumnsInput = {
  id: Scalars['Int'];
};

/** select columns of table "campaigns" */
export enum CampaignsSelectColumn {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "campaigns" */
export type CampaignsSetInput = {
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type CampaignsStddevFields = {
  __typename?: 'campaigns_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "campaigns" */
export type CampaignsStddevOrderBy = {
  id?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type CampaignsStddevPopFields = {
  __typename?: 'campaigns_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "campaigns" */
export type CampaignsStddevPopOrderBy = {
  id?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type CampaignsStddevSampFields = {
  __typename?: 'campaigns_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "campaigns" */
export type CampaignsStddevSampOrderBy = {
  id?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type CampaignsSumFields = {
  __typename?: 'campaigns_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "campaigns" */
export type CampaignsSumOrderBy = {
  id?: Maybe<OrderBy>;
};

/** update columns of table "campaigns" */
export enum CampaignsUpdateColumn {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** aggregate var_pop on columns */
export type CampaignsVarPopFields = {
  __typename?: 'campaigns_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "campaigns" */
export type CampaignsVarPopOrderBy = {
  id?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type CampaignsVarSampFields = {
  __typename?: 'campaigns_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "campaigns" */
export type CampaignsVarSampOrderBy = {
  id?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type CampaignsVarianceFields = {
  __typename?: 'campaigns_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "campaigns" */
export type CampaignsVarianceOrderBy = {
  id?: Maybe<OrderBy>;
};


/** expression to compare columns of type json. All fields are combined with logical 'AND'. */
export type JsonComparisonExp = {
  _eq?: Maybe<Scalars['json']>;
  _gt?: Maybe<Scalars['json']>;
  _gte?: Maybe<Scalars['json']>;
  _in?: Maybe<Array<Scalars['json']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['json']>;
  _lte?: Maybe<Scalars['json']>;
  _neq?: Maybe<Scalars['json']>;
  _nin?: Maybe<Array<Scalars['json']>>;
};


/** expression to compare columns of type jsonb. All fields are combined with logical 'AND'. */
export type JsonbComparisonExp = {
  /** is the column contained in the given json value */
  _contained_in?: Maybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: Maybe<Scalars['jsonb']>;
  _eq?: Maybe<Scalars['jsonb']>;
  _gt?: Maybe<Scalars['jsonb']>;
  _gte?: Maybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: Maybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: Maybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: Maybe<Array<Scalars['String']>>;
  _in?: Maybe<Array<Scalars['jsonb']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['jsonb']>;
  _lte?: Maybe<Scalars['jsonb']>;
  _neq?: Maybe<Scalars['jsonb']>;
  _nin?: Maybe<Array<Scalars['jsonb']>>;
};

/** mutation root */
export type MutationRoot = {
  __typename?: 'mutation_root';
  /** perform the action: "assets_generate_read_url" */
  assets_generate_read_url?: Maybe<ReadOutput>;
  /** perform the action: "assets_generate_upload_url" */
  assets_generate_upload_url?: Maybe<ReadOutput>;
  /** delete data from the table: "articles" */
  delete_articles?: Maybe<ArticlesMutationResponse>;
  /** delete single row from the table: "articles" */
  delete_articles_by_pk?: Maybe<Articles>;
  /** delete data from the table: "articles_user_activity" */
  delete_articles_user_activity?: Maybe<ArticlesUserActivityMutationResponse>;
  /** delete single row from the table: "articles_user_activity" */
  delete_articles_user_activity_by_pk?: Maybe<ArticlesUserActivity>;
  /** delete data from the table: "blocks" */
  delete_blocks?: Maybe<BlocksMutationResponse>;
  /** delete single row from the table: "blocks" */
  delete_blocks_by_pk?: Maybe<Blocks>;
  /** delete data from the table: "campaigns" */
  delete_campaigns?: Maybe<CampaignsMutationResponse>;
  /** delete single row from the table: "campaigns" */
  delete_campaigns_by_pk?: Maybe<Campaigns>;
  /** delete data from the table: "node_connections" */
  delete_node_connections?: Maybe<NodeConnectionsMutationResponse>;
  /** delete single row from the table: "node_connections" */
  delete_node_connections_by_pk?: Maybe<NodeConnections>;
  /** delete data from the table: "nodes" */
  delete_nodes?: Maybe<NodesMutationResponse>;
  /** delete single row from the table: "nodes" */
  delete_nodes_by_pk?: Maybe<Nodes>;
  /** delete data from the table: "organisations" */
  delete_organisations?: Maybe<OrganisationsMutationResponse>;
  /** delete single row from the table: "organisations" */
  delete_organisations_by_pk?: Maybe<Organisations>;
  /** delete data from the table: "permissions" */
  delete_permissions?: Maybe<PermissionsMutationResponse>;
  /** delete single row from the table: "permissions" */
  delete_permissions_by_pk?: Maybe<Permissions>;
  /** delete data from the table: "projects" */
  delete_projects?: Maybe<ProjectsMutationResponse>;
  /** delete single row from the table: "projects" */
  delete_projects_by_pk?: Maybe<Projects>;
  /** delete data from the table: "segment_campaigns" */
  delete_segment_campaigns?: Maybe<SegmentCampaignsMutationResponse>;
  /** delete single row from the table: "segment_campaigns" */
  delete_segment_campaigns_by_pk?: Maybe<SegmentCampaigns>;
  /** delete data from the table: "segments" */
  delete_segments?: Maybe<SegmentsMutationResponse>;
  /** delete single row from the table: "segments" */
  delete_segments_by_pk?: Maybe<Segments>;
  /** delete data from the table: "user_activities" */
  delete_user_activities?: Maybe<UserActivitiesMutationResponse>;
  /** delete single row from the table: "user_activities" */
  delete_user_activities_by_pk?: Maybe<UserActivities>;
  /** delete data from the table: "user_organisation" */
  delete_user_organisation?: Maybe<UserOrganisationMutationResponse>;
  /** delete single row from the table: "user_organisation" */
  delete_user_organisation_by_pk?: Maybe<UserOrganisation>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<UsersMutationResponse>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** insert data into the table: "articles" */
  insert_articles?: Maybe<ArticlesMutationResponse>;
  /** insert a single row into the table: "articles" */
  insert_articles_one?: Maybe<Articles>;
  /** insert data into the table: "articles_user_activity" */
  insert_articles_user_activity?: Maybe<ArticlesUserActivityMutationResponse>;
  /** insert a single row into the table: "articles_user_activity" */
  insert_articles_user_activity_one?: Maybe<ArticlesUserActivity>;
  /** insert data into the table: "blocks" */
  insert_blocks?: Maybe<BlocksMutationResponse>;
  /** insert a single row into the table: "blocks" */
  insert_blocks_one?: Maybe<Blocks>;
  /** insert data into the table: "campaigns" */
  insert_campaigns?: Maybe<CampaignsMutationResponse>;
  /** insert a single row into the table: "campaigns" */
  insert_campaigns_one?: Maybe<Campaigns>;
  /** insert data into the table: "node_connections" */
  insert_node_connections?: Maybe<NodeConnectionsMutationResponse>;
  /** insert a single row into the table: "node_connections" */
  insert_node_connections_one?: Maybe<NodeConnections>;
  /** insert data into the table: "nodes" */
  insert_nodes?: Maybe<NodesMutationResponse>;
  /** insert a single row into the table: "nodes" */
  insert_nodes_one?: Maybe<Nodes>;
  /** insert data into the table: "organisations" */
  insert_organisations?: Maybe<OrganisationsMutationResponse>;
  /** insert a single row into the table: "organisations" */
  insert_organisations_one?: Maybe<Organisations>;
  /** insert data into the table: "permissions" */
  insert_permissions?: Maybe<PermissionsMutationResponse>;
  /** insert a single row into the table: "permissions" */
  insert_permissions_one?: Maybe<Permissions>;
  /** insert data into the table: "projects" */
  insert_projects?: Maybe<ProjectsMutationResponse>;
  /** insert a single row into the table: "projects" */
  insert_projects_one?: Maybe<Projects>;
  /** insert data into the table: "segment_campaigns" */
  insert_segment_campaigns?: Maybe<SegmentCampaignsMutationResponse>;
  /** insert a single row into the table: "segment_campaigns" */
  insert_segment_campaigns_one?: Maybe<SegmentCampaigns>;
  /** insert data into the table: "segments" */
  insert_segments?: Maybe<SegmentsMutationResponse>;
  /** insert a single row into the table: "segments" */
  insert_segments_one?: Maybe<Segments>;
  /** insert data into the table: "user_activities" */
  insert_user_activities?: Maybe<UserActivitiesMutationResponse>;
  /** insert a single row into the table: "user_activities" */
  insert_user_activities_one?: Maybe<UserActivities>;
  /** insert data into the table: "user_organisation" */
  insert_user_organisation?: Maybe<UserOrganisationMutationResponse>;
  /** insert a single row into the table: "user_organisation" */
  insert_user_organisation_one?: Maybe<UserOrganisation>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<UsersMutationResponse>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** update data of the table: "articles" */
  update_articles?: Maybe<ArticlesMutationResponse>;
  /** update single row of the table: "articles" */
  update_articles_by_pk?: Maybe<Articles>;
  /** update data of the table: "articles_user_activity" */
  update_articles_user_activity?: Maybe<ArticlesUserActivityMutationResponse>;
  /** update single row of the table: "articles_user_activity" */
  update_articles_user_activity_by_pk?: Maybe<ArticlesUserActivity>;
  /** update data of the table: "blocks" */
  update_blocks?: Maybe<BlocksMutationResponse>;
  /** update single row of the table: "blocks" */
  update_blocks_by_pk?: Maybe<Blocks>;
  /** update data of the table: "campaigns" */
  update_campaigns?: Maybe<CampaignsMutationResponse>;
  /** update single row of the table: "campaigns" */
  update_campaigns_by_pk?: Maybe<Campaigns>;
  /** update data of the table: "node_connections" */
  update_node_connections?: Maybe<NodeConnectionsMutationResponse>;
  /** update single row of the table: "node_connections" */
  update_node_connections_by_pk?: Maybe<NodeConnections>;
  /** update data of the table: "nodes" */
  update_nodes?: Maybe<NodesMutationResponse>;
  /** update single row of the table: "nodes" */
  update_nodes_by_pk?: Maybe<Nodes>;
  /** update data of the table: "organisations" */
  update_organisations?: Maybe<OrganisationsMutationResponse>;
  /** update single row of the table: "organisations" */
  update_organisations_by_pk?: Maybe<Organisations>;
  /** update data of the table: "permissions" */
  update_permissions?: Maybe<PermissionsMutationResponse>;
  /** update single row of the table: "permissions" */
  update_permissions_by_pk?: Maybe<Permissions>;
  /** update data of the table: "projects" */
  update_projects?: Maybe<ProjectsMutationResponse>;
  /** update single row of the table: "projects" */
  update_projects_by_pk?: Maybe<Projects>;
  /** update data of the table: "segment_campaigns" */
  update_segment_campaigns?: Maybe<SegmentCampaignsMutationResponse>;
  /** update single row of the table: "segment_campaigns" */
  update_segment_campaigns_by_pk?: Maybe<SegmentCampaigns>;
  /** update data of the table: "segments" */
  update_segments?: Maybe<SegmentsMutationResponse>;
  /** update single row of the table: "segments" */
  update_segments_by_pk?: Maybe<Segments>;
  /** update data of the table: "user_activities" */
  update_user_activities?: Maybe<UserActivitiesMutationResponse>;
  /** update single row of the table: "user_activities" */
  update_user_activities_by_pk?: Maybe<UserActivities>;
  /** update data of the table: "user_organisation" */
  update_user_organisation?: Maybe<UserOrganisationMutationResponse>;
  /** update single row of the table: "user_organisation" */
  update_user_organisation_by_pk?: Maybe<UserOrganisation>;
  /** update data of the table: "users" */
  update_users?: Maybe<UsersMutationResponse>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
};


/** mutation root */
export type MutationRootAssetsGenerateReadUrlArgs = {
  key: Scalars['String'];
};


/** mutation root */
export type MutationRootAssetsGenerateUploadUrlArgs = {
  contentType: Scalars['String'];
};


/** mutation root */
export type MutationRootDeleteArticlesArgs = {
  where: ArticlesBoolExp;
};


/** mutation root */
export type MutationRootDeleteArticlesByPkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type MutationRootDeleteArticlesUserActivityArgs = {
  where: ArticlesUserActivityBoolExp;
};


/** mutation root */
export type MutationRootDeleteArticlesUserActivityByPkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type MutationRootDeleteBlocksArgs = {
  where: BlocksBoolExp;
};


/** mutation root */
export type MutationRootDeleteBlocksByPkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type MutationRootDeleteCampaignsArgs = {
  where: CampaignsBoolExp;
};


/** mutation root */
export type MutationRootDeleteCampaignsByPkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type MutationRootDeleteNodeConnectionsArgs = {
  where: NodeConnectionsBoolExp;
};


/** mutation root */
export type MutationRootDeleteNodeConnectionsByPkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type MutationRootDeleteNodesArgs = {
  where: NodesBoolExp;
};


/** mutation root */
export type MutationRootDeleteNodesByPkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type MutationRootDeleteOrganisationsArgs = {
  where: OrganisationsBoolExp;
};


/** mutation root */
export type MutationRootDeleteOrganisationsByPkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type MutationRootDeletePermissionsArgs = {
  where: PermissionsBoolExp;
};


/** mutation root */
export type MutationRootDeletePermissionsByPkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type MutationRootDeleteProjectsArgs = {
  where: ProjectsBoolExp;
};


/** mutation root */
export type MutationRootDeleteProjectsByPkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type MutationRootDeleteSegmentCampaignsArgs = {
  where: SegmentCampaignsBoolExp;
};


/** mutation root */
export type MutationRootDeleteSegmentCampaignsByPkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type MutationRootDeleteSegmentsArgs = {
  where: SegmentsBoolExp;
};


/** mutation root */
export type MutationRootDeleteSegmentsByPkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type MutationRootDeleteUserActivitiesArgs = {
  where: UserActivitiesBoolExp;
};


/** mutation root */
export type MutationRootDeleteUserActivitiesByPkArgs = {
  segment_id: Scalars['Int'];
  user_id: Scalars['Int'];
};


/** mutation root */
export type MutationRootDeleteUserOrganisationArgs = {
  where: UserOrganisationBoolExp;
};


/** mutation root */
export type MutationRootDeleteUserOrganisationByPkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type MutationRootDeleteUsersArgs = {
  where: UsersBoolExp;
};


/** mutation root */
export type MutationRootDeleteUsersByPkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type MutationRootInsertArticlesArgs = {
  objects: Array<ArticlesInsertInput>;
  on_conflict?: Maybe<ArticlesOnConflict>;
};


/** mutation root */
export type MutationRootInsertArticlesOneArgs = {
  object: ArticlesInsertInput;
  on_conflict?: Maybe<ArticlesOnConflict>;
};


/** mutation root */
export type MutationRootInsertArticlesUserActivityArgs = {
  objects: Array<ArticlesUserActivityInsertInput>;
  on_conflict?: Maybe<ArticlesUserActivityOnConflict>;
};


/** mutation root */
export type MutationRootInsertArticlesUserActivityOneArgs = {
  object: ArticlesUserActivityInsertInput;
  on_conflict?: Maybe<ArticlesUserActivityOnConflict>;
};


/** mutation root */
export type MutationRootInsertBlocksArgs = {
  objects: Array<BlocksInsertInput>;
  on_conflict?: Maybe<BlocksOnConflict>;
};


/** mutation root */
export type MutationRootInsertBlocksOneArgs = {
  object: BlocksInsertInput;
  on_conflict?: Maybe<BlocksOnConflict>;
};


/** mutation root */
export type MutationRootInsertCampaignsArgs = {
  objects: Array<CampaignsInsertInput>;
  on_conflict?: Maybe<CampaignsOnConflict>;
};


/** mutation root */
export type MutationRootInsertCampaignsOneArgs = {
  object: CampaignsInsertInput;
  on_conflict?: Maybe<CampaignsOnConflict>;
};


/** mutation root */
export type MutationRootInsertNodeConnectionsArgs = {
  objects: Array<NodeConnectionsInsertInput>;
  on_conflict?: Maybe<NodeConnectionsOnConflict>;
};


/** mutation root */
export type MutationRootInsertNodeConnectionsOneArgs = {
  object: NodeConnectionsInsertInput;
  on_conflict?: Maybe<NodeConnectionsOnConflict>;
};


/** mutation root */
export type MutationRootInsertNodesArgs = {
  objects: Array<NodesInsertInput>;
  on_conflict?: Maybe<NodesOnConflict>;
};


/** mutation root */
export type MutationRootInsertNodesOneArgs = {
  object: NodesInsertInput;
  on_conflict?: Maybe<NodesOnConflict>;
};


/** mutation root */
export type MutationRootInsertOrganisationsArgs = {
  objects: Array<OrganisationsInsertInput>;
  on_conflict?: Maybe<OrganisationsOnConflict>;
};


/** mutation root */
export type MutationRootInsertOrganisationsOneArgs = {
  object: OrganisationsInsertInput;
  on_conflict?: Maybe<OrganisationsOnConflict>;
};


/** mutation root */
export type MutationRootInsertPermissionsArgs = {
  objects: Array<PermissionsInsertInput>;
  on_conflict?: Maybe<PermissionsOnConflict>;
};


/** mutation root */
export type MutationRootInsertPermissionsOneArgs = {
  object: PermissionsInsertInput;
  on_conflict?: Maybe<PermissionsOnConflict>;
};


/** mutation root */
export type MutationRootInsertProjectsArgs = {
  objects: Array<ProjectsInsertInput>;
  on_conflict?: Maybe<ProjectsOnConflict>;
};


/** mutation root */
export type MutationRootInsertProjectsOneArgs = {
  object: ProjectsInsertInput;
  on_conflict?: Maybe<ProjectsOnConflict>;
};


/** mutation root */
export type MutationRootInsertSegmentCampaignsArgs = {
  objects: Array<SegmentCampaignsInsertInput>;
  on_conflict?: Maybe<SegmentCampaignsOnConflict>;
};


/** mutation root */
export type MutationRootInsertSegmentCampaignsOneArgs = {
  object: SegmentCampaignsInsertInput;
  on_conflict?: Maybe<SegmentCampaignsOnConflict>;
};


/** mutation root */
export type MutationRootInsertSegmentsArgs = {
  objects: Array<SegmentsInsertInput>;
  on_conflict?: Maybe<SegmentsOnConflict>;
};


/** mutation root */
export type MutationRootInsertSegmentsOneArgs = {
  object: SegmentsInsertInput;
  on_conflict?: Maybe<SegmentsOnConflict>;
};


/** mutation root */
export type MutationRootInsertUserActivitiesArgs = {
  objects: Array<UserActivitiesInsertInput>;
  on_conflict?: Maybe<UserActivitiesOnConflict>;
};


/** mutation root */
export type MutationRootInsertUserActivitiesOneArgs = {
  object: UserActivitiesInsertInput;
  on_conflict?: Maybe<UserActivitiesOnConflict>;
};


/** mutation root */
export type MutationRootInsertUserOrganisationArgs = {
  objects: Array<UserOrganisationInsertInput>;
  on_conflict?: Maybe<UserOrganisationOnConflict>;
};


/** mutation root */
export type MutationRootInsertUserOrganisationOneArgs = {
  object: UserOrganisationInsertInput;
  on_conflict?: Maybe<UserOrganisationOnConflict>;
};


/** mutation root */
export type MutationRootInsertUsersArgs = {
  objects: Array<UsersInsertInput>;
  on_conflict?: Maybe<UsersOnConflict>;
};


/** mutation root */
export type MutationRootInsertUsersOneArgs = {
  object: UsersInsertInput;
  on_conflict?: Maybe<UsersOnConflict>;
};


/** mutation root */
export type MutationRootUpdateArticlesArgs = {
  _inc?: Maybe<ArticlesIncInput>;
  _set?: Maybe<ArticlesSetInput>;
  where: ArticlesBoolExp;
};


/** mutation root */
export type MutationRootUpdateArticlesByPkArgs = {
  _inc?: Maybe<ArticlesIncInput>;
  _set?: Maybe<ArticlesSetInput>;
  pk_columns: ArticlesPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateArticlesUserActivityArgs = {
  _inc?: Maybe<ArticlesUserActivityIncInput>;
  _set?: Maybe<ArticlesUserActivitySetInput>;
  where: ArticlesUserActivityBoolExp;
};


/** mutation root */
export type MutationRootUpdateArticlesUserActivityByPkArgs = {
  _inc?: Maybe<ArticlesUserActivityIncInput>;
  _set?: Maybe<ArticlesUserActivitySetInput>;
  pk_columns: ArticlesUserActivityPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateBlocksArgs = {
  _append?: Maybe<BlocksAppendInput>;
  _delete_at_path?: Maybe<BlocksDeleteAtPathInput>;
  _delete_elem?: Maybe<BlocksDeleteElemInput>;
  _delete_key?: Maybe<BlocksDeleteKeyInput>;
  _inc?: Maybe<BlocksIncInput>;
  _prepend?: Maybe<BlocksPrependInput>;
  _set?: Maybe<BlocksSetInput>;
  where: BlocksBoolExp;
};


/** mutation root */
export type MutationRootUpdateBlocksByPkArgs = {
  _append?: Maybe<BlocksAppendInput>;
  _delete_at_path?: Maybe<BlocksDeleteAtPathInput>;
  _delete_elem?: Maybe<BlocksDeleteElemInput>;
  _delete_key?: Maybe<BlocksDeleteKeyInput>;
  _inc?: Maybe<BlocksIncInput>;
  _prepend?: Maybe<BlocksPrependInput>;
  _set?: Maybe<BlocksSetInput>;
  pk_columns: BlocksPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateCampaignsArgs = {
  _inc?: Maybe<CampaignsIncInput>;
  _set?: Maybe<CampaignsSetInput>;
  where: CampaignsBoolExp;
};


/** mutation root */
export type MutationRootUpdateCampaignsByPkArgs = {
  _inc?: Maybe<CampaignsIncInput>;
  _set?: Maybe<CampaignsSetInput>;
  pk_columns: CampaignsPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateNodeConnectionsArgs = {
  _inc?: Maybe<NodeConnectionsIncInput>;
  _set?: Maybe<NodeConnectionsSetInput>;
  where: NodeConnectionsBoolExp;
};


/** mutation root */
export type MutationRootUpdateNodeConnectionsByPkArgs = {
  _inc?: Maybe<NodeConnectionsIncInput>;
  _set?: Maybe<NodeConnectionsSetInput>;
  pk_columns: NodeConnectionsPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateNodesArgs = {
  _append?: Maybe<NodesAppendInput>;
  _delete_at_path?: Maybe<NodesDeleteAtPathInput>;
  _delete_elem?: Maybe<NodesDeleteElemInput>;
  _delete_key?: Maybe<NodesDeleteKeyInput>;
  _inc?: Maybe<NodesIncInput>;
  _prepend?: Maybe<NodesPrependInput>;
  _set?: Maybe<NodesSetInput>;
  where: NodesBoolExp;
};


/** mutation root */
export type MutationRootUpdateNodesByPkArgs = {
  _append?: Maybe<NodesAppendInput>;
  _delete_at_path?: Maybe<NodesDeleteAtPathInput>;
  _delete_elem?: Maybe<NodesDeleteElemInput>;
  _delete_key?: Maybe<NodesDeleteKeyInput>;
  _inc?: Maybe<NodesIncInput>;
  _prepend?: Maybe<NodesPrependInput>;
  _set?: Maybe<NodesSetInput>;
  pk_columns: NodesPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateOrganisationsArgs = {
  _inc?: Maybe<OrganisationsIncInput>;
  _set?: Maybe<OrganisationsSetInput>;
  where: OrganisationsBoolExp;
};


/** mutation root */
export type MutationRootUpdateOrganisationsByPkArgs = {
  _inc?: Maybe<OrganisationsIncInput>;
  _set?: Maybe<OrganisationsSetInput>;
  pk_columns: OrganisationsPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdatePermissionsArgs = {
  _inc?: Maybe<PermissionsIncInput>;
  _set?: Maybe<PermissionsSetInput>;
  where: PermissionsBoolExp;
};


/** mutation root */
export type MutationRootUpdatePermissionsByPkArgs = {
  _inc?: Maybe<PermissionsIncInput>;
  _set?: Maybe<PermissionsSetInput>;
  pk_columns: PermissionsPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateProjectsArgs = {
  _inc?: Maybe<ProjectsIncInput>;
  _set?: Maybe<ProjectsSetInput>;
  where: ProjectsBoolExp;
};


/** mutation root */
export type MutationRootUpdateProjectsByPkArgs = {
  _inc?: Maybe<ProjectsIncInput>;
  _set?: Maybe<ProjectsSetInput>;
  pk_columns: ProjectsPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateSegmentCampaignsArgs = {
  _inc?: Maybe<SegmentCampaignsIncInput>;
  _set?: Maybe<SegmentCampaignsSetInput>;
  where: SegmentCampaignsBoolExp;
};


/** mutation root */
export type MutationRootUpdateSegmentCampaignsByPkArgs = {
  _inc?: Maybe<SegmentCampaignsIncInput>;
  _set?: Maybe<SegmentCampaignsSetInput>;
  pk_columns: SegmentCampaignsPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateSegmentsArgs = {
  _inc?: Maybe<SegmentsIncInput>;
  _set?: Maybe<SegmentsSetInput>;
  where: SegmentsBoolExp;
};


/** mutation root */
export type MutationRootUpdateSegmentsByPkArgs = {
  _inc?: Maybe<SegmentsIncInput>;
  _set?: Maybe<SegmentsSetInput>;
  pk_columns: SegmentsPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateUserActivitiesArgs = {
  _inc?: Maybe<UserActivitiesIncInput>;
  _set?: Maybe<UserActivitiesSetInput>;
  where: UserActivitiesBoolExp;
};


/** mutation root */
export type MutationRootUpdateUserActivitiesByPkArgs = {
  _inc?: Maybe<UserActivitiesIncInput>;
  _set?: Maybe<UserActivitiesSetInput>;
  pk_columns: UserActivitiesPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateUserOrganisationArgs = {
  _inc?: Maybe<UserOrganisationIncInput>;
  _set?: Maybe<UserOrganisationSetInput>;
  where: UserOrganisationBoolExp;
};


/** mutation root */
export type MutationRootUpdateUserOrganisationByPkArgs = {
  _inc?: Maybe<UserOrganisationIncInput>;
  _set?: Maybe<UserOrganisationSetInput>;
  pk_columns: UserOrganisationPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateUsersArgs = {
  _inc?: Maybe<UsersIncInput>;
  _set?: Maybe<UsersSetInput>;
  where: UsersBoolExp;
};


/** mutation root */
export type MutationRootUpdateUsersByPkArgs = {
  _inc?: Maybe<UsersIncInput>;
  _set?: Maybe<UsersSetInput>;
  pk_columns: UsersPkColumnsInput;
};

/** columns and relationships of "node_connections" */
export type NodeConnections = {
  __typename?: 'node_connections';
  id: Scalars['Int'];
  /** An object relationship */
  node: Nodes;
  /** An object relationship */
  nodeByNodeOutId: Nodes;
  node_in_id: Scalars['Int'];
  node_out_id: Scalars['Int'];
};

/** aggregated selection of "node_connections" */
export type NodeConnectionsAggregate = {
  __typename?: 'node_connections_aggregate';
  aggregate?: Maybe<NodeConnectionsAggregateFields>;
  nodes: Array<NodeConnections>;
};

/** aggregate fields of "node_connections" */
export type NodeConnectionsAggregateFields = {
  __typename?: 'node_connections_aggregate_fields';
  avg?: Maybe<NodeConnectionsAvgFields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<NodeConnectionsMaxFields>;
  min?: Maybe<NodeConnectionsMinFields>;
  stddev?: Maybe<NodeConnectionsStddevFields>;
  stddev_pop?: Maybe<NodeConnectionsStddevPopFields>;
  stddev_samp?: Maybe<NodeConnectionsStddevSampFields>;
  sum?: Maybe<NodeConnectionsSumFields>;
  var_pop?: Maybe<NodeConnectionsVarPopFields>;
  var_samp?: Maybe<NodeConnectionsVarSampFields>;
  variance?: Maybe<NodeConnectionsVarianceFields>;
};


/** aggregate fields of "node_connections" */
export type NodeConnectionsAggregateFieldsCountArgs = {
  columns?: Maybe<Array<NodeConnectionsSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "node_connections" */
export type NodeConnectionsAggregateOrderBy = {
  avg?: Maybe<NodeConnectionsAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<NodeConnectionsMaxOrderBy>;
  min?: Maybe<NodeConnectionsMinOrderBy>;
  stddev?: Maybe<NodeConnectionsStddevOrderBy>;
  stddev_pop?: Maybe<NodeConnectionsStddevPopOrderBy>;
  stddev_samp?: Maybe<NodeConnectionsStddevSampOrderBy>;
  sum?: Maybe<NodeConnectionsSumOrderBy>;
  var_pop?: Maybe<NodeConnectionsVarPopOrderBy>;
  var_samp?: Maybe<NodeConnectionsVarSampOrderBy>;
  variance?: Maybe<NodeConnectionsVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "node_connections" */
export type NodeConnectionsArrRelInsertInput = {
  data: Array<NodeConnectionsInsertInput>;
  on_conflict?: Maybe<NodeConnectionsOnConflict>;
};

/** aggregate avg on columns */
export type NodeConnectionsAvgFields = {
  __typename?: 'node_connections_avg_fields';
  id?: Maybe<Scalars['Float']>;
  node_in_id?: Maybe<Scalars['Float']>;
  node_out_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "node_connections" */
export type NodeConnectionsAvgOrderBy = {
  id?: Maybe<OrderBy>;
  node_in_id?: Maybe<OrderBy>;
  node_out_id?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "node_connections". All fields are combined with a logical 'AND'. */
export type NodeConnectionsBoolExp = {
  _and?: Maybe<Array<Maybe<NodeConnectionsBoolExp>>>;
  _not?: Maybe<NodeConnectionsBoolExp>;
  _or?: Maybe<Array<Maybe<NodeConnectionsBoolExp>>>;
  id?: Maybe<IntComparisonExp>;
  node?: Maybe<NodesBoolExp>;
  nodeByNodeOutId?: Maybe<NodesBoolExp>;
  node_in_id?: Maybe<IntComparisonExp>;
  node_out_id?: Maybe<IntComparisonExp>;
};

/** unique or primary key constraints on table "node_connections" */
export enum NodeConnectionsConstraint {
  /** unique or primary key constraint */
  NodeConnectionsPkey = 'node_connections_pkey'
}

/** input type for incrementing integer column in table "node_connections" */
export type NodeConnectionsIncInput = {
  id?: Maybe<Scalars['Int']>;
  node_in_id?: Maybe<Scalars['Int']>;
  node_out_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "node_connections" */
export type NodeConnectionsInsertInput = {
  id?: Maybe<Scalars['Int']>;
  node?: Maybe<NodesObjRelInsertInput>;
  nodeByNodeOutId?: Maybe<NodesObjRelInsertInput>;
  node_in_id?: Maybe<Scalars['Int']>;
  node_out_id?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type NodeConnectionsMaxFields = {
  __typename?: 'node_connections_max_fields';
  id?: Maybe<Scalars['Int']>;
  node_in_id?: Maybe<Scalars['Int']>;
  node_out_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "node_connections" */
export type NodeConnectionsMaxOrderBy = {
  id?: Maybe<OrderBy>;
  node_in_id?: Maybe<OrderBy>;
  node_out_id?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type NodeConnectionsMinFields = {
  __typename?: 'node_connections_min_fields';
  id?: Maybe<Scalars['Int']>;
  node_in_id?: Maybe<Scalars['Int']>;
  node_out_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "node_connections" */
export type NodeConnectionsMinOrderBy = {
  id?: Maybe<OrderBy>;
  node_in_id?: Maybe<OrderBy>;
  node_out_id?: Maybe<OrderBy>;
};

/** response of any mutation on the table "node_connections" */
export type NodeConnectionsMutationResponse = {
  __typename?: 'node_connections_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<NodeConnections>;
};

/** input type for inserting object relation for remote table "node_connections" */
export type NodeConnectionsObjRelInsertInput = {
  data: NodeConnectionsInsertInput;
  on_conflict?: Maybe<NodeConnectionsOnConflict>;
};

/** on conflict condition type for table "node_connections" */
export type NodeConnectionsOnConflict = {
  constraint: NodeConnectionsConstraint;
  update_columns: Array<NodeConnectionsUpdateColumn>;
  where?: Maybe<NodeConnectionsBoolExp>;
};

/** ordering options when selecting data from "node_connections" */
export type NodeConnectionsOrderBy = {
  id?: Maybe<OrderBy>;
  node?: Maybe<NodesOrderBy>;
  nodeByNodeOutId?: Maybe<NodesOrderBy>;
  node_in_id?: Maybe<OrderBy>;
  node_out_id?: Maybe<OrderBy>;
};

/** primary key columns input for table: "node_connections" */
export type NodeConnectionsPkColumnsInput = {
  id: Scalars['Int'];
};

/** select columns of table "node_connections" */
export enum NodeConnectionsSelectColumn {
  /** column name */
  Id = 'id',
  /** column name */
  NodeInId = 'node_in_id',
  /** column name */
  NodeOutId = 'node_out_id'
}

/** input type for updating data in table "node_connections" */
export type NodeConnectionsSetInput = {
  id?: Maybe<Scalars['Int']>;
  node_in_id?: Maybe<Scalars['Int']>;
  node_out_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type NodeConnectionsStddevFields = {
  __typename?: 'node_connections_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  node_in_id?: Maybe<Scalars['Float']>;
  node_out_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "node_connections" */
export type NodeConnectionsStddevOrderBy = {
  id?: Maybe<OrderBy>;
  node_in_id?: Maybe<OrderBy>;
  node_out_id?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type NodeConnectionsStddevPopFields = {
  __typename?: 'node_connections_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  node_in_id?: Maybe<Scalars['Float']>;
  node_out_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "node_connections" */
export type NodeConnectionsStddevPopOrderBy = {
  id?: Maybe<OrderBy>;
  node_in_id?: Maybe<OrderBy>;
  node_out_id?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type NodeConnectionsStddevSampFields = {
  __typename?: 'node_connections_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  node_in_id?: Maybe<Scalars['Float']>;
  node_out_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "node_connections" */
export type NodeConnectionsStddevSampOrderBy = {
  id?: Maybe<OrderBy>;
  node_in_id?: Maybe<OrderBy>;
  node_out_id?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type NodeConnectionsSumFields = {
  __typename?: 'node_connections_sum_fields';
  id?: Maybe<Scalars['Int']>;
  node_in_id?: Maybe<Scalars['Int']>;
  node_out_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "node_connections" */
export type NodeConnectionsSumOrderBy = {
  id?: Maybe<OrderBy>;
  node_in_id?: Maybe<OrderBy>;
  node_out_id?: Maybe<OrderBy>;
};

/** update columns of table "node_connections" */
export enum NodeConnectionsUpdateColumn {
  /** column name */
  Id = 'id',
  /** column name */
  NodeInId = 'node_in_id',
  /** column name */
  NodeOutId = 'node_out_id'
}

/** aggregate var_pop on columns */
export type NodeConnectionsVarPopFields = {
  __typename?: 'node_connections_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  node_in_id?: Maybe<Scalars['Float']>;
  node_out_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "node_connections" */
export type NodeConnectionsVarPopOrderBy = {
  id?: Maybe<OrderBy>;
  node_in_id?: Maybe<OrderBy>;
  node_out_id?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type NodeConnectionsVarSampFields = {
  __typename?: 'node_connections_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  node_in_id?: Maybe<Scalars['Float']>;
  node_out_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "node_connections" */
export type NodeConnectionsVarSampOrderBy = {
  id?: Maybe<OrderBy>;
  node_in_id?: Maybe<OrderBy>;
  node_out_id?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type NodeConnectionsVarianceFields = {
  __typename?: 'node_connections_variance_fields';
  id?: Maybe<Scalars['Float']>;
  node_in_id?: Maybe<Scalars['Float']>;
  node_out_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "node_connections" */
export type NodeConnectionsVarianceOrderBy = {
  id?: Maybe<OrderBy>;
  node_in_id?: Maybe<OrderBy>;
  node_out_id?: Maybe<OrderBy>;
};

/** columns and relationships of "nodes" */
export type Nodes = {
  __typename?: 'nodes';
  enabled: Scalars['Boolean'];
  id: Scalars['Int'];
  /** An array relationship */
  nodeConnectionsByNodeOutId: Array<NodeConnections>;
  /** An aggregated array relationship */
  nodeConnectionsByNodeOutId_aggregate: NodeConnectionsAggregate;
  /** An array relationship */
  node_connections: Array<NodeConnections>;
  /** An aggregated array relationship */
  node_connections_aggregate: NodeConnectionsAggregate;
  payload: Scalars['jsonb'];
  position: Scalars['point'];
  type: Scalars['Int'];
};


/** columns and relationships of "nodes" */
export type NodesNodeConnectionsByNodeOutIdArgs = {
  distinct_on?: Maybe<Array<NodeConnectionsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<NodeConnectionsOrderBy>>;
  where?: Maybe<NodeConnectionsBoolExp>;
};


/** columns and relationships of "nodes" */
export type NodesNodeConnectionsByNodeOutIdAggregateArgs = {
  distinct_on?: Maybe<Array<NodeConnectionsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<NodeConnectionsOrderBy>>;
  where?: Maybe<NodeConnectionsBoolExp>;
};


/** columns and relationships of "nodes" */
export type NodesNodeConnectionsArgs = {
  distinct_on?: Maybe<Array<NodeConnectionsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<NodeConnectionsOrderBy>>;
  where?: Maybe<NodeConnectionsBoolExp>;
};


/** columns and relationships of "nodes" */
export type NodesNodeConnectionsAggregateArgs = {
  distinct_on?: Maybe<Array<NodeConnectionsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<NodeConnectionsOrderBy>>;
  where?: Maybe<NodeConnectionsBoolExp>;
};


/** columns and relationships of "nodes" */
export type NodesPayloadArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "nodes" */
export type NodesAggregate = {
  __typename?: 'nodes_aggregate';
  aggregate?: Maybe<NodesAggregateFields>;
  nodes: Array<Nodes>;
};

/** aggregate fields of "nodes" */
export type NodesAggregateFields = {
  __typename?: 'nodes_aggregate_fields';
  avg?: Maybe<NodesAvgFields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<NodesMaxFields>;
  min?: Maybe<NodesMinFields>;
  stddev?: Maybe<NodesStddevFields>;
  stddev_pop?: Maybe<NodesStddevPopFields>;
  stddev_samp?: Maybe<NodesStddevSampFields>;
  sum?: Maybe<NodesSumFields>;
  var_pop?: Maybe<NodesVarPopFields>;
  var_samp?: Maybe<NodesVarSampFields>;
  variance?: Maybe<NodesVarianceFields>;
};


/** aggregate fields of "nodes" */
export type NodesAggregateFieldsCountArgs = {
  columns?: Maybe<Array<NodesSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "nodes" */
export type NodesAggregateOrderBy = {
  avg?: Maybe<NodesAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<NodesMaxOrderBy>;
  min?: Maybe<NodesMinOrderBy>;
  stddev?: Maybe<NodesStddevOrderBy>;
  stddev_pop?: Maybe<NodesStddevPopOrderBy>;
  stddev_samp?: Maybe<NodesStddevSampOrderBy>;
  sum?: Maybe<NodesSumOrderBy>;
  var_pop?: Maybe<NodesVarPopOrderBy>;
  var_samp?: Maybe<NodesVarSampOrderBy>;
  variance?: Maybe<NodesVarianceOrderBy>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type NodesAppendInput = {
  payload?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "nodes" */
export type NodesArrRelInsertInput = {
  data: Array<NodesInsertInput>;
  on_conflict?: Maybe<NodesOnConflict>;
};

/** aggregate avg on columns */
export type NodesAvgFields = {
  __typename?: 'nodes_avg_fields';
  id?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "nodes" */
export type NodesAvgOrderBy = {
  id?: Maybe<OrderBy>;
  type?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "nodes". All fields are combined with a logical 'AND'. */
export type NodesBoolExp = {
  _and?: Maybe<Array<Maybe<NodesBoolExp>>>;
  _not?: Maybe<NodesBoolExp>;
  _or?: Maybe<Array<Maybe<NodesBoolExp>>>;
  enabled?: Maybe<BooleanComparisonExp>;
  id?: Maybe<IntComparisonExp>;
  nodeConnectionsByNodeOutId?: Maybe<NodeConnectionsBoolExp>;
  node_connections?: Maybe<NodeConnectionsBoolExp>;
  payload?: Maybe<JsonbComparisonExp>;
  position?: Maybe<PointComparisonExp>;
  type?: Maybe<IntComparisonExp>;
};

/** unique or primary key constraints on table "nodes" */
export enum NodesConstraint {
  /** unique or primary key constraint */
  NodesPkey = 'nodes_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type NodesDeleteAtPathInput = {
  payload?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type NodesDeleteElemInput = {
  payload?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type NodesDeleteKeyInput = {
  payload?: Maybe<Scalars['String']>;
};

/** input type for incrementing integer column in table "nodes" */
export type NodesIncInput = {
  id?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "nodes" */
export type NodesInsertInput = {
  enabled?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['Int']>;
  nodeConnectionsByNodeOutId?: Maybe<NodeConnectionsArrRelInsertInput>;
  node_connections?: Maybe<NodeConnectionsArrRelInsertInput>;
  payload?: Maybe<Scalars['jsonb']>;
  position?: Maybe<Scalars['point']>;
  type?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type NodesMaxFields = {
  __typename?: 'nodes_max_fields';
  id?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "nodes" */
export type NodesMaxOrderBy = {
  id?: Maybe<OrderBy>;
  type?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type NodesMinFields = {
  __typename?: 'nodes_min_fields';
  id?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "nodes" */
export type NodesMinOrderBy = {
  id?: Maybe<OrderBy>;
  type?: Maybe<OrderBy>;
};

/** response of any mutation on the table "nodes" */
export type NodesMutationResponse = {
  __typename?: 'nodes_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Nodes>;
};

/** input type for inserting object relation for remote table "nodes" */
export type NodesObjRelInsertInput = {
  data: NodesInsertInput;
  on_conflict?: Maybe<NodesOnConflict>;
};

/** on conflict condition type for table "nodes" */
export type NodesOnConflict = {
  constraint: NodesConstraint;
  update_columns: Array<NodesUpdateColumn>;
  where?: Maybe<NodesBoolExp>;
};

/** ordering options when selecting data from "nodes" */
export type NodesOrderBy = {
  enabled?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  nodeConnectionsByNodeOutId_aggregate?: Maybe<NodeConnectionsAggregateOrderBy>;
  node_connections_aggregate?: Maybe<NodeConnectionsAggregateOrderBy>;
  payload?: Maybe<OrderBy>;
  position?: Maybe<OrderBy>;
  type?: Maybe<OrderBy>;
};

/** primary key columns input for table: "nodes" */
export type NodesPkColumnsInput = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type NodesPrependInput = {
  payload?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "nodes" */
export enum NodesSelectColumn {
  /** column name */
  Enabled = 'enabled',
  /** column name */
  Id = 'id',
  /** column name */
  Payload = 'payload',
  /** column name */
  Position = 'position',
  /** column name */
  Type = 'type'
}

/** input type for updating data in table "nodes" */
export type NodesSetInput = {
  enabled?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['Int']>;
  payload?: Maybe<Scalars['jsonb']>;
  position?: Maybe<Scalars['point']>;
  type?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type NodesStddevFields = {
  __typename?: 'nodes_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "nodes" */
export type NodesStddevOrderBy = {
  id?: Maybe<OrderBy>;
  type?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type NodesStddevPopFields = {
  __typename?: 'nodes_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "nodes" */
export type NodesStddevPopOrderBy = {
  id?: Maybe<OrderBy>;
  type?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type NodesStddevSampFields = {
  __typename?: 'nodes_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "nodes" */
export type NodesStddevSampOrderBy = {
  id?: Maybe<OrderBy>;
  type?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type NodesSumFields = {
  __typename?: 'nodes_sum_fields';
  id?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "nodes" */
export type NodesSumOrderBy = {
  id?: Maybe<OrderBy>;
  type?: Maybe<OrderBy>;
};

/** update columns of table "nodes" */
export enum NodesUpdateColumn {
  /** column name */
  Enabled = 'enabled',
  /** column name */
  Id = 'id',
  /** column name */
  Payload = 'payload',
  /** column name */
  Position = 'position',
  /** column name */
  Type = 'type'
}

/** aggregate var_pop on columns */
export type NodesVarPopFields = {
  __typename?: 'nodes_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "nodes" */
export type NodesVarPopOrderBy = {
  id?: Maybe<OrderBy>;
  type?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type NodesVarSampFields = {
  __typename?: 'nodes_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "nodes" */
export type NodesVarSampOrderBy = {
  id?: Maybe<OrderBy>;
  type?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type NodesVarianceFields = {
  __typename?: 'nodes_variance_fields';
  id?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "nodes" */
export type NodesVarianceOrderBy = {
  id?: Maybe<OrderBy>;
  type?: Maybe<OrderBy>;
};

/** column ordering options */
export enum OrderBy {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "organisations" */
export type Organisations = {
  __typename?: 'organisations';
  id: Scalars['Int'];
  name: Scalars['String'];
  /** An array relationship */
  permissions: Array<Permissions>;
  /** An aggregated array relationship */
  permissions_aggregate: PermissionsAggregate;
  /** An array relationship */
  projects: Array<Projects>;
  /** An aggregated array relationship */
  projects_aggregate: ProjectsAggregate;
  slug: Scalars['String'];
  /** An array relationship */
  userOrganisations: Array<UserOrganisation>;
  /** An aggregated array relationship */
  userOrganisations_aggregate: UserOrganisationAggregate;
  /** An array relationship */
  users: Array<Users>;
  /** An aggregated array relationship */
  users_aggregate: UsersAggregate;
};


/** columns and relationships of "organisations" */
export type OrganisationsPermissionsArgs = {
  distinct_on?: Maybe<Array<PermissionsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<PermissionsOrderBy>>;
  where?: Maybe<PermissionsBoolExp>;
};


/** columns and relationships of "organisations" */
export type OrganisationsPermissionsAggregateArgs = {
  distinct_on?: Maybe<Array<PermissionsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<PermissionsOrderBy>>;
  where?: Maybe<PermissionsBoolExp>;
};


/** columns and relationships of "organisations" */
export type OrganisationsProjectsArgs = {
  distinct_on?: Maybe<Array<ProjectsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ProjectsOrderBy>>;
  where?: Maybe<ProjectsBoolExp>;
};


/** columns and relationships of "organisations" */
export type OrganisationsProjectsAggregateArgs = {
  distinct_on?: Maybe<Array<ProjectsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ProjectsOrderBy>>;
  where?: Maybe<ProjectsBoolExp>;
};


/** columns and relationships of "organisations" */
export type OrganisationsUserOrganisationsArgs = {
  distinct_on?: Maybe<Array<UserOrganisationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserOrganisationOrderBy>>;
  where?: Maybe<UserOrganisationBoolExp>;
};


/** columns and relationships of "organisations" */
export type OrganisationsUserOrganisationsAggregateArgs = {
  distinct_on?: Maybe<Array<UserOrganisationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserOrganisationOrderBy>>;
  where?: Maybe<UserOrganisationBoolExp>;
};


/** columns and relationships of "organisations" */
export type OrganisationsUsersArgs = {
  distinct_on?: Maybe<Array<UsersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UsersOrderBy>>;
  where?: Maybe<UsersBoolExp>;
};


/** columns and relationships of "organisations" */
export type OrganisationsUsersAggregateArgs = {
  distinct_on?: Maybe<Array<UsersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UsersOrderBy>>;
  where?: Maybe<UsersBoolExp>;
};

/** aggregated selection of "organisations" */
export type OrganisationsAggregate = {
  __typename?: 'organisations_aggregate';
  aggregate?: Maybe<OrganisationsAggregateFields>;
  nodes: Array<Organisations>;
};

/** aggregate fields of "organisations" */
export type OrganisationsAggregateFields = {
  __typename?: 'organisations_aggregate_fields';
  avg?: Maybe<OrganisationsAvgFields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<OrganisationsMaxFields>;
  min?: Maybe<OrganisationsMinFields>;
  stddev?: Maybe<OrganisationsStddevFields>;
  stddev_pop?: Maybe<OrganisationsStddevPopFields>;
  stddev_samp?: Maybe<OrganisationsStddevSampFields>;
  sum?: Maybe<OrganisationsSumFields>;
  var_pop?: Maybe<OrganisationsVarPopFields>;
  var_samp?: Maybe<OrganisationsVarSampFields>;
  variance?: Maybe<OrganisationsVarianceFields>;
};


/** aggregate fields of "organisations" */
export type OrganisationsAggregateFieldsCountArgs = {
  columns?: Maybe<Array<OrganisationsSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "organisations" */
export type OrganisationsAggregateOrderBy = {
  avg?: Maybe<OrganisationsAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<OrganisationsMaxOrderBy>;
  min?: Maybe<OrganisationsMinOrderBy>;
  stddev?: Maybe<OrganisationsStddevOrderBy>;
  stddev_pop?: Maybe<OrganisationsStddevPopOrderBy>;
  stddev_samp?: Maybe<OrganisationsStddevSampOrderBy>;
  sum?: Maybe<OrganisationsSumOrderBy>;
  var_pop?: Maybe<OrganisationsVarPopOrderBy>;
  var_samp?: Maybe<OrganisationsVarSampOrderBy>;
  variance?: Maybe<OrganisationsVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "organisations" */
export type OrganisationsArrRelInsertInput = {
  data: Array<OrganisationsInsertInput>;
  on_conflict?: Maybe<OrganisationsOnConflict>;
};

/** aggregate avg on columns */
export type OrganisationsAvgFields = {
  __typename?: 'organisations_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "organisations" */
export type OrganisationsAvgOrderBy = {
  id?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "organisations". All fields are combined with a logical 'AND'. */
export type OrganisationsBoolExp = {
  _and?: Maybe<Array<Maybe<OrganisationsBoolExp>>>;
  _not?: Maybe<OrganisationsBoolExp>;
  _or?: Maybe<Array<Maybe<OrganisationsBoolExp>>>;
  id?: Maybe<IntComparisonExp>;
  name?: Maybe<StringComparisonExp>;
  permissions?: Maybe<PermissionsBoolExp>;
  projects?: Maybe<ProjectsBoolExp>;
  slug?: Maybe<StringComparisonExp>;
  userOrganisations?: Maybe<UserOrganisationBoolExp>;
  users?: Maybe<UsersBoolExp>;
};

/** unique or primary key constraints on table "organisations" */
export enum OrganisationsConstraint {
  /** unique or primary key constraint */
  OrganisationsPkey1 = 'organisations_pkey1',
  /** unique or primary key constraint */
  OrganisationsSlugKey = 'organisations_slug_key'
}

/** input type for incrementing integer column in table "organisations" */
export type OrganisationsIncInput = {
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "organisations" */
export type OrganisationsInsertInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  permissions?: Maybe<PermissionsArrRelInsertInput>;
  projects?: Maybe<ProjectsArrRelInsertInput>;
  slug?: Maybe<Scalars['String']>;
  userOrganisations?: Maybe<UserOrganisationArrRelInsertInput>;
  users?: Maybe<UsersArrRelInsertInput>;
};

/** aggregate max on columns */
export type OrganisationsMaxFields = {
  __typename?: 'organisations_max_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "organisations" */
export type OrganisationsMaxOrderBy = {
  id?: Maybe<OrderBy>;
  name?: Maybe<OrderBy>;
  slug?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type OrganisationsMinFields = {
  __typename?: 'organisations_min_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "organisations" */
export type OrganisationsMinOrderBy = {
  id?: Maybe<OrderBy>;
  name?: Maybe<OrderBy>;
  slug?: Maybe<OrderBy>;
};

/** response of any mutation on the table "organisations" */
export type OrganisationsMutationResponse = {
  __typename?: 'organisations_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Organisations>;
};

/** input type for inserting object relation for remote table "organisations" */
export type OrganisationsObjRelInsertInput = {
  data: OrganisationsInsertInput;
  on_conflict?: Maybe<OrganisationsOnConflict>;
};

/** on conflict condition type for table "organisations" */
export type OrganisationsOnConflict = {
  constraint: OrganisationsConstraint;
  update_columns: Array<OrganisationsUpdateColumn>;
  where?: Maybe<OrganisationsBoolExp>;
};

/** ordering options when selecting data from "organisations" */
export type OrganisationsOrderBy = {
  id?: Maybe<OrderBy>;
  name?: Maybe<OrderBy>;
  permissions_aggregate?: Maybe<PermissionsAggregateOrderBy>;
  projects_aggregate?: Maybe<ProjectsAggregateOrderBy>;
  slug?: Maybe<OrderBy>;
  userOrganisations_aggregate?: Maybe<UserOrganisationAggregateOrderBy>;
  users_aggregate?: Maybe<UsersAggregateOrderBy>;
};

/** primary key columns input for table: "organisations" */
export type OrganisationsPkColumnsInput = {
  id: Scalars['Int'];
};

/** select columns of table "organisations" */
export enum OrganisationsSelectColumn {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Slug = 'slug'
}

/** input type for updating data in table "organisations" */
export type OrganisationsSetInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type OrganisationsStddevFields = {
  __typename?: 'organisations_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "organisations" */
export type OrganisationsStddevOrderBy = {
  id?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type OrganisationsStddevPopFields = {
  __typename?: 'organisations_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "organisations" */
export type OrganisationsStddevPopOrderBy = {
  id?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type OrganisationsStddevSampFields = {
  __typename?: 'organisations_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "organisations" */
export type OrganisationsStddevSampOrderBy = {
  id?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type OrganisationsSumFields = {
  __typename?: 'organisations_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "organisations" */
export type OrganisationsSumOrderBy = {
  id?: Maybe<OrderBy>;
};

/** update columns of table "organisations" */
export enum OrganisationsUpdateColumn {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Slug = 'slug'
}

/** aggregate var_pop on columns */
export type OrganisationsVarPopFields = {
  __typename?: 'organisations_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "organisations" */
export type OrganisationsVarPopOrderBy = {
  id?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type OrganisationsVarSampFields = {
  __typename?: 'organisations_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "organisations" */
export type OrganisationsVarSampOrderBy = {
  id?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type OrganisationsVarianceFields = {
  __typename?: 'organisations_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "organisations" */
export type OrganisationsVarianceOrderBy = {
  id?: Maybe<OrderBy>;
};

/** columns and relationships of "permissions" */
export type Permissions = {
  __typename?: 'permissions';
  id: Scalars['Int'];
  /** An object relationship */
  organisation: Organisations;
  organisationId: Scalars['Int'];
  /** An object relationship */
  project: Projects;
  projectId: Scalars['Int'];
  type: Scalars['String'];
  /** An object relationship */
  user?: Maybe<Users>;
  userId: Scalars['Int'];
};

/** aggregated selection of "permissions" */
export type PermissionsAggregate = {
  __typename?: 'permissions_aggregate';
  aggregate?: Maybe<PermissionsAggregateFields>;
  nodes: Array<Permissions>;
};

/** aggregate fields of "permissions" */
export type PermissionsAggregateFields = {
  __typename?: 'permissions_aggregate_fields';
  avg?: Maybe<PermissionsAvgFields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<PermissionsMaxFields>;
  min?: Maybe<PermissionsMinFields>;
  stddev?: Maybe<PermissionsStddevFields>;
  stddev_pop?: Maybe<PermissionsStddevPopFields>;
  stddev_samp?: Maybe<PermissionsStddevSampFields>;
  sum?: Maybe<PermissionsSumFields>;
  var_pop?: Maybe<PermissionsVarPopFields>;
  var_samp?: Maybe<PermissionsVarSampFields>;
  variance?: Maybe<PermissionsVarianceFields>;
};


/** aggregate fields of "permissions" */
export type PermissionsAggregateFieldsCountArgs = {
  columns?: Maybe<Array<PermissionsSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "permissions" */
export type PermissionsAggregateOrderBy = {
  avg?: Maybe<PermissionsAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<PermissionsMaxOrderBy>;
  min?: Maybe<PermissionsMinOrderBy>;
  stddev?: Maybe<PermissionsStddevOrderBy>;
  stddev_pop?: Maybe<PermissionsStddevPopOrderBy>;
  stddev_samp?: Maybe<PermissionsStddevSampOrderBy>;
  sum?: Maybe<PermissionsSumOrderBy>;
  var_pop?: Maybe<PermissionsVarPopOrderBy>;
  var_samp?: Maybe<PermissionsVarSampOrderBy>;
  variance?: Maybe<PermissionsVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "permissions" */
export type PermissionsArrRelInsertInput = {
  data: Array<PermissionsInsertInput>;
  on_conflict?: Maybe<PermissionsOnConflict>;
};

/** aggregate avg on columns */
export type PermissionsAvgFields = {
  __typename?: 'permissions_avg_fields';
  id?: Maybe<Scalars['Float']>;
  organisationId?: Maybe<Scalars['Float']>;
  projectId?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "permissions" */
export type PermissionsAvgOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
  projectId?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "permissions". All fields are combined with a logical 'AND'. */
export type PermissionsBoolExp = {
  _and?: Maybe<Array<Maybe<PermissionsBoolExp>>>;
  _not?: Maybe<PermissionsBoolExp>;
  _or?: Maybe<Array<Maybe<PermissionsBoolExp>>>;
  id?: Maybe<IntComparisonExp>;
  organisation?: Maybe<OrganisationsBoolExp>;
  organisationId?: Maybe<IntComparisonExp>;
  project?: Maybe<ProjectsBoolExp>;
  projectId?: Maybe<IntComparisonExp>;
  type?: Maybe<StringComparisonExp>;
  user?: Maybe<UsersBoolExp>;
  userId?: Maybe<IntComparisonExp>;
};

/** unique or primary key constraints on table "permissions" */
export enum PermissionsConstraint {
  /** unique or primary key constraint */
  PermissionsPkey = 'permissions_pkey'
}

/** input type for incrementing integer column in table "permissions" */
export type PermissionsIncInput = {
  id?: Maybe<Scalars['Int']>;
  organisationId?: Maybe<Scalars['Int']>;
  projectId?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "permissions" */
export type PermissionsInsertInput = {
  id?: Maybe<Scalars['Int']>;
  organisation?: Maybe<OrganisationsObjRelInsertInput>;
  organisationId?: Maybe<Scalars['Int']>;
  project?: Maybe<ProjectsObjRelInsertInput>;
  projectId?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  user?: Maybe<UsersObjRelInsertInput>;
  userId?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type PermissionsMaxFields = {
  __typename?: 'permissions_max_fields';
  id?: Maybe<Scalars['Int']>;
  organisationId?: Maybe<Scalars['Int']>;
  projectId?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "permissions" */
export type PermissionsMaxOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
  projectId?: Maybe<OrderBy>;
  type?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type PermissionsMinFields = {
  __typename?: 'permissions_min_fields';
  id?: Maybe<Scalars['Int']>;
  organisationId?: Maybe<Scalars['Int']>;
  projectId?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "permissions" */
export type PermissionsMinOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
  projectId?: Maybe<OrderBy>;
  type?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

/** response of any mutation on the table "permissions" */
export type PermissionsMutationResponse = {
  __typename?: 'permissions_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Permissions>;
};

/** input type for inserting object relation for remote table "permissions" */
export type PermissionsObjRelInsertInput = {
  data: PermissionsInsertInput;
  on_conflict?: Maybe<PermissionsOnConflict>;
};

/** on conflict condition type for table "permissions" */
export type PermissionsOnConflict = {
  constraint: PermissionsConstraint;
  update_columns: Array<PermissionsUpdateColumn>;
  where?: Maybe<PermissionsBoolExp>;
};

/** ordering options when selecting data from "permissions" */
export type PermissionsOrderBy = {
  id?: Maybe<OrderBy>;
  organisation?: Maybe<OrganisationsOrderBy>;
  organisationId?: Maybe<OrderBy>;
  project?: Maybe<ProjectsOrderBy>;
  projectId?: Maybe<OrderBy>;
  type?: Maybe<OrderBy>;
  user?: Maybe<UsersOrderBy>;
  userId?: Maybe<OrderBy>;
};

/** primary key columns input for table: "permissions" */
export type PermissionsPkColumnsInput = {
  id: Scalars['Int'];
};

/** select columns of table "permissions" */
export enum PermissionsSelectColumn {
  /** column name */
  Id = 'id',
  /** column name */
  OrganisationId = 'organisationId',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  Type = 'type',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "permissions" */
export type PermissionsSetInput = {
  id?: Maybe<Scalars['Int']>;
  organisationId?: Maybe<Scalars['Int']>;
  projectId?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type PermissionsStddevFields = {
  __typename?: 'permissions_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  organisationId?: Maybe<Scalars['Float']>;
  projectId?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "permissions" */
export type PermissionsStddevOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
  projectId?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type PermissionsStddevPopFields = {
  __typename?: 'permissions_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  organisationId?: Maybe<Scalars['Float']>;
  projectId?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "permissions" */
export type PermissionsStddevPopOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
  projectId?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type PermissionsStddevSampFields = {
  __typename?: 'permissions_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  organisationId?: Maybe<Scalars['Float']>;
  projectId?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "permissions" */
export type PermissionsStddevSampOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
  projectId?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type PermissionsSumFields = {
  __typename?: 'permissions_sum_fields';
  id?: Maybe<Scalars['Int']>;
  organisationId?: Maybe<Scalars['Int']>;
  projectId?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "permissions" */
export type PermissionsSumOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
  projectId?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

/** update columns of table "permissions" */
export enum PermissionsUpdateColumn {
  /** column name */
  Id = 'id',
  /** column name */
  OrganisationId = 'organisationId',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  Type = 'type',
  /** column name */
  UserId = 'userId'
}

/** aggregate var_pop on columns */
export type PermissionsVarPopFields = {
  __typename?: 'permissions_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  organisationId?: Maybe<Scalars['Float']>;
  projectId?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "permissions" */
export type PermissionsVarPopOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
  projectId?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type PermissionsVarSampFields = {
  __typename?: 'permissions_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  organisationId?: Maybe<Scalars['Float']>;
  projectId?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "permissions" */
export type PermissionsVarSampOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
  projectId?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type PermissionsVarianceFields = {
  __typename?: 'permissions_variance_fields';
  id?: Maybe<Scalars['Float']>;
  organisationId?: Maybe<Scalars['Float']>;
  projectId?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "permissions" */
export type PermissionsVarianceOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
  projectId?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};


/** expression to compare columns of type point. All fields are combined with logical 'AND'. */
export type PointComparisonExp = {
  _eq?: Maybe<Scalars['point']>;
  _gt?: Maybe<Scalars['point']>;
  _gte?: Maybe<Scalars['point']>;
  _in?: Maybe<Array<Scalars['point']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['point']>;
  _lte?: Maybe<Scalars['point']>;
  _neq?: Maybe<Scalars['point']>;
  _nin?: Maybe<Array<Scalars['point']>>;
};

/** columns and relationships of "projects" */
export type Projects = {
  __typename?: 'projects';
  /** An array relationship */
  articles: Array<Articles>;
  /** An aggregated array relationship */
  articles_aggregate: ArticlesAggregate;
  id: Scalars['Int'];
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  /** An object relationship */
  organisation?: Maybe<Organisations>;
  organisationId?: Maybe<Scalars['Int']>;
  /** An array relationship */
  permissions: Array<Permissions>;
  /** An aggregated array relationship */
  permissions_aggregate: PermissionsAggregate;
  /** An array relationship */
  segments: Array<Segments>;
  /** An aggregated array relationship */
  segments_aggregate: SegmentsAggregate;
  slug: Scalars['String'];
};


/** columns and relationships of "projects" */
export type ProjectsArticlesArgs = {
  distinct_on?: Maybe<Array<ArticlesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ArticlesOrderBy>>;
  where?: Maybe<ArticlesBoolExp>;
};


/** columns and relationships of "projects" */
export type ProjectsArticlesAggregateArgs = {
  distinct_on?: Maybe<Array<ArticlesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ArticlesOrderBy>>;
  where?: Maybe<ArticlesBoolExp>;
};


/** columns and relationships of "projects" */
export type ProjectsPermissionsArgs = {
  distinct_on?: Maybe<Array<PermissionsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<PermissionsOrderBy>>;
  where?: Maybe<PermissionsBoolExp>;
};


/** columns and relationships of "projects" */
export type ProjectsPermissionsAggregateArgs = {
  distinct_on?: Maybe<Array<PermissionsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<PermissionsOrderBy>>;
  where?: Maybe<PermissionsBoolExp>;
};


/** columns and relationships of "projects" */
export type ProjectsSegmentsArgs = {
  distinct_on?: Maybe<Array<SegmentsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SegmentsOrderBy>>;
  where?: Maybe<SegmentsBoolExp>;
};


/** columns and relationships of "projects" */
export type ProjectsSegmentsAggregateArgs = {
  distinct_on?: Maybe<Array<SegmentsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SegmentsOrderBy>>;
  where?: Maybe<SegmentsBoolExp>;
};

/** aggregated selection of "projects" */
export type ProjectsAggregate = {
  __typename?: 'projects_aggregate';
  aggregate?: Maybe<ProjectsAggregateFields>;
  nodes: Array<Projects>;
};

/** aggregate fields of "projects" */
export type ProjectsAggregateFields = {
  __typename?: 'projects_aggregate_fields';
  avg?: Maybe<ProjectsAvgFields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<ProjectsMaxFields>;
  min?: Maybe<ProjectsMinFields>;
  stddev?: Maybe<ProjectsStddevFields>;
  stddev_pop?: Maybe<ProjectsStddevPopFields>;
  stddev_samp?: Maybe<ProjectsStddevSampFields>;
  sum?: Maybe<ProjectsSumFields>;
  var_pop?: Maybe<ProjectsVarPopFields>;
  var_samp?: Maybe<ProjectsVarSampFields>;
  variance?: Maybe<ProjectsVarianceFields>;
};


/** aggregate fields of "projects" */
export type ProjectsAggregateFieldsCountArgs = {
  columns?: Maybe<Array<ProjectsSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "projects" */
export type ProjectsAggregateOrderBy = {
  avg?: Maybe<ProjectsAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<ProjectsMaxOrderBy>;
  min?: Maybe<ProjectsMinOrderBy>;
  stddev?: Maybe<ProjectsStddevOrderBy>;
  stddev_pop?: Maybe<ProjectsStddevPopOrderBy>;
  stddev_samp?: Maybe<ProjectsStddevSampOrderBy>;
  sum?: Maybe<ProjectsSumOrderBy>;
  var_pop?: Maybe<ProjectsVarPopOrderBy>;
  var_samp?: Maybe<ProjectsVarSampOrderBy>;
  variance?: Maybe<ProjectsVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "projects" */
export type ProjectsArrRelInsertInput = {
  data: Array<ProjectsInsertInput>;
  on_conflict?: Maybe<ProjectsOnConflict>;
};

/** aggregate avg on columns */
export type ProjectsAvgFields = {
  __typename?: 'projects_avg_fields';
  id?: Maybe<Scalars['Float']>;
  organisationId?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "projects" */
export type ProjectsAvgOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "projects". All fields are combined with a logical 'AND'. */
export type ProjectsBoolExp = {
  _and?: Maybe<Array<Maybe<ProjectsBoolExp>>>;
  _not?: Maybe<ProjectsBoolExp>;
  _or?: Maybe<Array<Maybe<ProjectsBoolExp>>>;
  articles?: Maybe<ArticlesBoolExp>;
  id?: Maybe<IntComparisonExp>;
  image?: Maybe<StringComparisonExp>;
  name?: Maybe<StringComparisonExp>;
  organisation?: Maybe<OrganisationsBoolExp>;
  organisationId?: Maybe<IntComparisonExp>;
  permissions?: Maybe<PermissionsBoolExp>;
  segments?: Maybe<SegmentsBoolExp>;
  slug?: Maybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "projects" */
export enum ProjectsConstraint {
  /** unique or primary key constraint */
  OrganisationsPkey = 'organisations_pkey'
}

/** input type for incrementing integer column in table "projects" */
export type ProjectsIncInput = {
  id?: Maybe<Scalars['Int']>;
  organisationId?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "projects" */
export type ProjectsInsertInput = {
  articles?: Maybe<ArticlesArrRelInsertInput>;
  id?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organisation?: Maybe<OrganisationsObjRelInsertInput>;
  organisationId?: Maybe<Scalars['Int']>;
  permissions?: Maybe<PermissionsArrRelInsertInput>;
  segments?: Maybe<SegmentsArrRelInsertInput>;
  slug?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type ProjectsMaxFields = {
  __typename?: 'projects_max_fields';
  id?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organisationId?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "projects" */
export type ProjectsMaxOrderBy = {
  id?: Maybe<OrderBy>;
  image?: Maybe<OrderBy>;
  name?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
  slug?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type ProjectsMinFields = {
  __typename?: 'projects_min_fields';
  id?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organisationId?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "projects" */
export type ProjectsMinOrderBy = {
  id?: Maybe<OrderBy>;
  image?: Maybe<OrderBy>;
  name?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
  slug?: Maybe<OrderBy>;
};

/** response of any mutation on the table "projects" */
export type ProjectsMutationResponse = {
  __typename?: 'projects_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Projects>;
};

/** input type for inserting object relation for remote table "projects" */
export type ProjectsObjRelInsertInput = {
  data: ProjectsInsertInput;
  on_conflict?: Maybe<ProjectsOnConflict>;
};

/** on conflict condition type for table "projects" */
export type ProjectsOnConflict = {
  constraint: ProjectsConstraint;
  update_columns: Array<ProjectsUpdateColumn>;
  where?: Maybe<ProjectsBoolExp>;
};

/** ordering options when selecting data from "projects" */
export type ProjectsOrderBy = {
  articles_aggregate?: Maybe<ArticlesAggregateOrderBy>;
  id?: Maybe<OrderBy>;
  image?: Maybe<OrderBy>;
  name?: Maybe<OrderBy>;
  organisation?: Maybe<OrganisationsOrderBy>;
  organisationId?: Maybe<OrderBy>;
  permissions_aggregate?: Maybe<PermissionsAggregateOrderBy>;
  segments_aggregate?: Maybe<SegmentsAggregateOrderBy>;
  slug?: Maybe<OrderBy>;
};

/** primary key columns input for table: "projects" */
export type ProjectsPkColumnsInput = {
  id: Scalars['Int'];
};

/** select columns of table "projects" */
export enum ProjectsSelectColumn {
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Name = 'name',
  /** column name */
  OrganisationId = 'organisationId',
  /** column name */
  Slug = 'slug'
}

/** input type for updating data in table "projects" */
export type ProjectsSetInput = {
  id?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organisationId?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type ProjectsStddevFields = {
  __typename?: 'projects_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  organisationId?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "projects" */
export type ProjectsStddevOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type ProjectsStddevPopFields = {
  __typename?: 'projects_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  organisationId?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "projects" */
export type ProjectsStddevPopOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type ProjectsStddevSampFields = {
  __typename?: 'projects_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  organisationId?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "projects" */
export type ProjectsStddevSampOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type ProjectsSumFields = {
  __typename?: 'projects_sum_fields';
  id?: Maybe<Scalars['Int']>;
  organisationId?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "projects" */
export type ProjectsSumOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
};

/** update columns of table "projects" */
export enum ProjectsUpdateColumn {
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Name = 'name',
  /** column name */
  OrganisationId = 'organisationId',
  /** column name */
  Slug = 'slug'
}

/** aggregate var_pop on columns */
export type ProjectsVarPopFields = {
  __typename?: 'projects_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  organisationId?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "projects" */
export type ProjectsVarPopOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type ProjectsVarSampFields = {
  __typename?: 'projects_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  organisationId?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "projects" */
export type ProjectsVarSampOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type ProjectsVarianceFields = {
  __typename?: 'projects_variance_fields';
  id?: Maybe<Scalars['Float']>;
  organisationId?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "projects" */
export type ProjectsVarianceOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
};

/** query root */
export type QueryRoot = {
  __typename?: 'query_root';
  /** fetch data from the table: "articles" */
  articles: Array<Articles>;
  /** fetch aggregated fields from the table: "articles" */
  articles_aggregate: ArticlesAggregate;
  /** fetch data from the table: "articles" using primary key columns */
  articles_by_pk?: Maybe<Articles>;
  /** fetch data from the table: "articles_user_activity" */
  articles_user_activity: Array<ArticlesUserActivity>;
  /** fetch aggregated fields from the table: "articles_user_activity" */
  articles_user_activity_aggregate: ArticlesUserActivityAggregate;
  /** fetch data from the table: "articles_user_activity" using primary key columns */
  articles_user_activity_by_pk?: Maybe<ArticlesUserActivity>;
  /** fetch data from the table: "blocks" */
  blocks: Array<Blocks>;
  /** fetch aggregated fields from the table: "blocks" */
  blocks_aggregate: BlocksAggregate;
  /** fetch data from the table: "blocks" using primary key columns */
  blocks_by_pk?: Maybe<Blocks>;
  /** fetch data from the table: "campaigns" */
  campaigns: Array<Campaigns>;
  /** fetch aggregated fields from the table: "campaigns" */
  campaigns_aggregate: CampaignsAggregate;
  /** fetch data from the table: "campaigns" using primary key columns */
  campaigns_by_pk?: Maybe<Campaigns>;
  /** fetch data from the table: "node_connections" */
  node_connections: Array<NodeConnections>;
  /** fetch aggregated fields from the table: "node_connections" */
  node_connections_aggregate: NodeConnectionsAggregate;
  /** fetch data from the table: "node_connections" using primary key columns */
  node_connections_by_pk?: Maybe<NodeConnections>;
  /** fetch data from the table: "nodes" */
  nodes: Array<Nodes>;
  /** fetch aggregated fields from the table: "nodes" */
  nodes_aggregate: NodesAggregate;
  /** fetch data from the table: "nodes" using primary key columns */
  nodes_by_pk?: Maybe<Nodes>;
  /** fetch data from the table: "organisations" */
  organisations: Array<Organisations>;
  /** fetch aggregated fields from the table: "organisations" */
  organisations_aggregate: OrganisationsAggregate;
  /** fetch data from the table: "organisations" using primary key columns */
  organisations_by_pk?: Maybe<Organisations>;
  /** fetch data from the table: "permissions" */
  permissions: Array<Permissions>;
  /** fetch aggregated fields from the table: "permissions" */
  permissions_aggregate: PermissionsAggregate;
  /** fetch data from the table: "permissions" using primary key columns */
  permissions_by_pk?: Maybe<Permissions>;
  /** fetch data from the table: "projects" */
  projects: Array<Projects>;
  /** fetch aggregated fields from the table: "projects" */
  projects_aggregate: ProjectsAggregate;
  /** fetch data from the table: "projects" using primary key columns */
  projects_by_pk?: Maybe<Projects>;
  /** fetch data from the table: "segment_campaigns" */
  segment_campaigns: Array<SegmentCampaigns>;
  /** fetch aggregated fields from the table: "segment_campaigns" */
  segment_campaigns_aggregate: SegmentCampaignsAggregate;
  /** fetch data from the table: "segment_campaigns" using primary key columns */
  segment_campaigns_by_pk?: Maybe<SegmentCampaigns>;
  /** fetch data from the table: "segments" */
  segments: Array<Segments>;
  /** fetch aggregated fields from the table: "segments" */
  segments_aggregate: SegmentsAggregate;
  /** fetch data from the table: "segments" using primary key columns */
  segments_by_pk?: Maybe<Segments>;
  /** fetch data from the table: "user_activities" */
  user_activities: Array<UserActivities>;
  /** fetch aggregated fields from the table: "user_activities" */
  user_activities_aggregate: UserActivitiesAggregate;
  /** fetch data from the table: "user_activities" using primary key columns */
  user_activities_by_pk?: Maybe<UserActivities>;
  /** fetch data from the table: "user_organisation" */
  user_organisation: Array<UserOrganisation>;
  /** fetch aggregated fields from the table: "user_organisation" */
  user_organisation_aggregate: UserOrganisationAggregate;
  /** fetch data from the table: "user_organisation" using primary key columns */
  user_organisation_by_pk?: Maybe<UserOrganisation>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: UsersAggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


/** query root */
export type QueryRootArticlesArgs = {
  distinct_on?: Maybe<Array<ArticlesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ArticlesOrderBy>>;
  where?: Maybe<ArticlesBoolExp>;
};


/** query root */
export type QueryRootArticlesAggregateArgs = {
  distinct_on?: Maybe<Array<ArticlesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ArticlesOrderBy>>;
  where?: Maybe<ArticlesBoolExp>;
};


/** query root */
export type QueryRootArticlesByPkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type QueryRootArticlesUserActivityArgs = {
  distinct_on?: Maybe<Array<ArticlesUserActivitySelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ArticlesUserActivityOrderBy>>;
  where?: Maybe<ArticlesUserActivityBoolExp>;
};


/** query root */
export type QueryRootArticlesUserActivityAggregateArgs = {
  distinct_on?: Maybe<Array<ArticlesUserActivitySelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ArticlesUserActivityOrderBy>>;
  where?: Maybe<ArticlesUserActivityBoolExp>;
};


/** query root */
export type QueryRootArticlesUserActivityByPkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type QueryRootBlocksArgs = {
  distinct_on?: Maybe<Array<BlocksSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<BlocksOrderBy>>;
  where?: Maybe<BlocksBoolExp>;
};


/** query root */
export type QueryRootBlocksAggregateArgs = {
  distinct_on?: Maybe<Array<BlocksSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<BlocksOrderBy>>;
  where?: Maybe<BlocksBoolExp>;
};


/** query root */
export type QueryRootBlocksByPkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type QueryRootCampaignsArgs = {
  distinct_on?: Maybe<Array<CampaignsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<CampaignsOrderBy>>;
  where?: Maybe<CampaignsBoolExp>;
};


/** query root */
export type QueryRootCampaignsAggregateArgs = {
  distinct_on?: Maybe<Array<CampaignsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<CampaignsOrderBy>>;
  where?: Maybe<CampaignsBoolExp>;
};


/** query root */
export type QueryRootCampaignsByPkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type QueryRootNodeConnectionsArgs = {
  distinct_on?: Maybe<Array<NodeConnectionsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<NodeConnectionsOrderBy>>;
  where?: Maybe<NodeConnectionsBoolExp>;
};


/** query root */
export type QueryRootNodeConnectionsAggregateArgs = {
  distinct_on?: Maybe<Array<NodeConnectionsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<NodeConnectionsOrderBy>>;
  where?: Maybe<NodeConnectionsBoolExp>;
};


/** query root */
export type QueryRootNodeConnectionsByPkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type QueryRootNodesArgs = {
  distinct_on?: Maybe<Array<NodesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<NodesOrderBy>>;
  where?: Maybe<NodesBoolExp>;
};


/** query root */
export type QueryRootNodesAggregateArgs = {
  distinct_on?: Maybe<Array<NodesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<NodesOrderBy>>;
  where?: Maybe<NodesBoolExp>;
};


/** query root */
export type QueryRootNodesByPkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type QueryRootOrganisationsArgs = {
  distinct_on?: Maybe<Array<OrganisationsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<OrganisationsOrderBy>>;
  where?: Maybe<OrganisationsBoolExp>;
};


/** query root */
export type QueryRootOrganisationsAggregateArgs = {
  distinct_on?: Maybe<Array<OrganisationsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<OrganisationsOrderBy>>;
  where?: Maybe<OrganisationsBoolExp>;
};


/** query root */
export type QueryRootOrganisationsByPkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type QueryRootPermissionsArgs = {
  distinct_on?: Maybe<Array<PermissionsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<PermissionsOrderBy>>;
  where?: Maybe<PermissionsBoolExp>;
};


/** query root */
export type QueryRootPermissionsAggregateArgs = {
  distinct_on?: Maybe<Array<PermissionsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<PermissionsOrderBy>>;
  where?: Maybe<PermissionsBoolExp>;
};


/** query root */
export type QueryRootPermissionsByPkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type QueryRootProjectsArgs = {
  distinct_on?: Maybe<Array<ProjectsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ProjectsOrderBy>>;
  where?: Maybe<ProjectsBoolExp>;
};


/** query root */
export type QueryRootProjectsAggregateArgs = {
  distinct_on?: Maybe<Array<ProjectsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ProjectsOrderBy>>;
  where?: Maybe<ProjectsBoolExp>;
};


/** query root */
export type QueryRootProjectsByPkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type QueryRootSegmentCampaignsArgs = {
  distinct_on?: Maybe<Array<SegmentCampaignsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SegmentCampaignsOrderBy>>;
  where?: Maybe<SegmentCampaignsBoolExp>;
};


/** query root */
export type QueryRootSegmentCampaignsAggregateArgs = {
  distinct_on?: Maybe<Array<SegmentCampaignsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SegmentCampaignsOrderBy>>;
  where?: Maybe<SegmentCampaignsBoolExp>;
};


/** query root */
export type QueryRootSegmentCampaignsByPkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type QueryRootSegmentsArgs = {
  distinct_on?: Maybe<Array<SegmentsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SegmentsOrderBy>>;
  where?: Maybe<SegmentsBoolExp>;
};


/** query root */
export type QueryRootSegmentsAggregateArgs = {
  distinct_on?: Maybe<Array<SegmentsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SegmentsOrderBy>>;
  where?: Maybe<SegmentsBoolExp>;
};


/** query root */
export type QueryRootSegmentsByPkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type QueryRootUserActivitiesArgs = {
  distinct_on?: Maybe<Array<UserActivitiesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserActivitiesOrderBy>>;
  where?: Maybe<UserActivitiesBoolExp>;
};


/** query root */
export type QueryRootUserActivitiesAggregateArgs = {
  distinct_on?: Maybe<Array<UserActivitiesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserActivitiesOrderBy>>;
  where?: Maybe<UserActivitiesBoolExp>;
};


/** query root */
export type QueryRootUserActivitiesByPkArgs = {
  segment_id: Scalars['Int'];
  user_id: Scalars['Int'];
};


/** query root */
export type QueryRootUserOrganisationArgs = {
  distinct_on?: Maybe<Array<UserOrganisationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserOrganisationOrderBy>>;
  where?: Maybe<UserOrganisationBoolExp>;
};


/** query root */
export type QueryRootUserOrganisationAggregateArgs = {
  distinct_on?: Maybe<Array<UserOrganisationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserOrganisationOrderBy>>;
  where?: Maybe<UserOrganisationBoolExp>;
};


/** query root */
export type QueryRootUserOrganisationByPkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type QueryRootUsersArgs = {
  distinct_on?: Maybe<Array<UsersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UsersOrderBy>>;
  where?: Maybe<UsersBoolExp>;
};


/** query root */
export type QueryRootUsersAggregateArgs = {
  distinct_on?: Maybe<Array<UsersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UsersOrderBy>>;
  where?: Maybe<UsersBoolExp>;
};


/** query root */
export type QueryRootUsersByPkArgs = {
  id: Scalars['Int'];
};

/** columns and relationships of "segment_campaigns" */
export type SegmentCampaigns = {
  __typename?: 'segment_campaigns';
  /** An object relationship */
  campaign: Campaigns;
  campaign_id: Scalars['Int'];
  id: Scalars['Int'];
  /** An object relationship */
  segment: Segments;
  segment_id: Scalars['Int'];
  slug?: Maybe<Scalars['String']>;
};

/** aggregated selection of "segment_campaigns" */
export type SegmentCampaignsAggregate = {
  __typename?: 'segment_campaigns_aggregate';
  aggregate?: Maybe<SegmentCampaignsAggregateFields>;
  nodes: Array<SegmentCampaigns>;
};

/** aggregate fields of "segment_campaigns" */
export type SegmentCampaignsAggregateFields = {
  __typename?: 'segment_campaigns_aggregate_fields';
  avg?: Maybe<SegmentCampaignsAvgFields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<SegmentCampaignsMaxFields>;
  min?: Maybe<SegmentCampaignsMinFields>;
  stddev?: Maybe<SegmentCampaignsStddevFields>;
  stddev_pop?: Maybe<SegmentCampaignsStddevPopFields>;
  stddev_samp?: Maybe<SegmentCampaignsStddevSampFields>;
  sum?: Maybe<SegmentCampaignsSumFields>;
  var_pop?: Maybe<SegmentCampaignsVarPopFields>;
  var_samp?: Maybe<SegmentCampaignsVarSampFields>;
  variance?: Maybe<SegmentCampaignsVarianceFields>;
};


/** aggregate fields of "segment_campaigns" */
export type SegmentCampaignsAggregateFieldsCountArgs = {
  columns?: Maybe<Array<SegmentCampaignsSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "segment_campaigns" */
export type SegmentCampaignsAggregateOrderBy = {
  avg?: Maybe<SegmentCampaignsAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<SegmentCampaignsMaxOrderBy>;
  min?: Maybe<SegmentCampaignsMinOrderBy>;
  stddev?: Maybe<SegmentCampaignsStddevOrderBy>;
  stddev_pop?: Maybe<SegmentCampaignsStddevPopOrderBy>;
  stddev_samp?: Maybe<SegmentCampaignsStddevSampOrderBy>;
  sum?: Maybe<SegmentCampaignsSumOrderBy>;
  var_pop?: Maybe<SegmentCampaignsVarPopOrderBy>;
  var_samp?: Maybe<SegmentCampaignsVarSampOrderBy>;
  variance?: Maybe<SegmentCampaignsVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "segment_campaigns" */
export type SegmentCampaignsArrRelInsertInput = {
  data: Array<SegmentCampaignsInsertInput>;
  on_conflict?: Maybe<SegmentCampaignsOnConflict>;
};

/** aggregate avg on columns */
export type SegmentCampaignsAvgFields = {
  __typename?: 'segment_campaigns_avg_fields';
  campaign_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  segment_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "segment_campaigns" */
export type SegmentCampaignsAvgOrderBy = {
  campaign_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  segment_id?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "segment_campaigns". All fields are combined with a logical 'AND'. */
export type SegmentCampaignsBoolExp = {
  _and?: Maybe<Array<Maybe<SegmentCampaignsBoolExp>>>;
  _not?: Maybe<SegmentCampaignsBoolExp>;
  _or?: Maybe<Array<Maybe<SegmentCampaignsBoolExp>>>;
  campaign?: Maybe<CampaignsBoolExp>;
  campaign_id?: Maybe<IntComparisonExp>;
  id?: Maybe<IntComparisonExp>;
  segment?: Maybe<SegmentsBoolExp>;
  segment_id?: Maybe<IntComparisonExp>;
  slug?: Maybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "segment_campaigns" */
export enum SegmentCampaignsConstraint {
  /** unique or primary key constraint */
  SegmentCampaignsPkey = 'segment_campaigns_pkey',
  /** unique or primary key constraint */
  SegmentCampaignsSlugKey = 'segment_campaigns_slug_key'
}

/** input type for incrementing integer column in table "segment_campaigns" */
export type SegmentCampaignsIncInput = {
  campaign_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  segment_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "segment_campaigns" */
export type SegmentCampaignsInsertInput = {
  campaign?: Maybe<CampaignsObjRelInsertInput>;
  campaign_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  segment?: Maybe<SegmentsObjRelInsertInput>;
  segment_id?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type SegmentCampaignsMaxFields = {
  __typename?: 'segment_campaigns_max_fields';
  campaign_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  segment_id?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "segment_campaigns" */
export type SegmentCampaignsMaxOrderBy = {
  campaign_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  segment_id?: Maybe<OrderBy>;
  slug?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type SegmentCampaignsMinFields = {
  __typename?: 'segment_campaigns_min_fields';
  campaign_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  segment_id?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "segment_campaigns" */
export type SegmentCampaignsMinOrderBy = {
  campaign_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  segment_id?: Maybe<OrderBy>;
  slug?: Maybe<OrderBy>;
};

/** response of any mutation on the table "segment_campaigns" */
export type SegmentCampaignsMutationResponse = {
  __typename?: 'segment_campaigns_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<SegmentCampaigns>;
};

/** input type for inserting object relation for remote table "segment_campaigns" */
export type SegmentCampaignsObjRelInsertInput = {
  data: SegmentCampaignsInsertInput;
  on_conflict?: Maybe<SegmentCampaignsOnConflict>;
};

/** on conflict condition type for table "segment_campaigns" */
export type SegmentCampaignsOnConflict = {
  constraint: SegmentCampaignsConstraint;
  update_columns: Array<SegmentCampaignsUpdateColumn>;
  where?: Maybe<SegmentCampaignsBoolExp>;
};

/** ordering options when selecting data from "segment_campaigns" */
export type SegmentCampaignsOrderBy = {
  campaign?: Maybe<CampaignsOrderBy>;
  campaign_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  segment?: Maybe<SegmentsOrderBy>;
  segment_id?: Maybe<OrderBy>;
  slug?: Maybe<OrderBy>;
};

/** primary key columns input for table: "segment_campaigns" */
export type SegmentCampaignsPkColumnsInput = {
  id: Scalars['Int'];
};

/** select columns of table "segment_campaigns" */
export enum SegmentCampaignsSelectColumn {
  /** column name */
  CampaignId = 'campaign_id',
  /** column name */
  Id = 'id',
  /** column name */
  SegmentId = 'segment_id',
  /** column name */
  Slug = 'slug'
}

/** input type for updating data in table "segment_campaigns" */
export type SegmentCampaignsSetInput = {
  campaign_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  segment_id?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type SegmentCampaignsStddevFields = {
  __typename?: 'segment_campaigns_stddev_fields';
  campaign_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  segment_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "segment_campaigns" */
export type SegmentCampaignsStddevOrderBy = {
  campaign_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  segment_id?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type SegmentCampaignsStddevPopFields = {
  __typename?: 'segment_campaigns_stddev_pop_fields';
  campaign_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  segment_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "segment_campaigns" */
export type SegmentCampaignsStddevPopOrderBy = {
  campaign_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  segment_id?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type SegmentCampaignsStddevSampFields = {
  __typename?: 'segment_campaigns_stddev_samp_fields';
  campaign_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  segment_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "segment_campaigns" */
export type SegmentCampaignsStddevSampOrderBy = {
  campaign_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  segment_id?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type SegmentCampaignsSumFields = {
  __typename?: 'segment_campaigns_sum_fields';
  campaign_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  segment_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "segment_campaigns" */
export type SegmentCampaignsSumOrderBy = {
  campaign_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  segment_id?: Maybe<OrderBy>;
};

/** update columns of table "segment_campaigns" */
export enum SegmentCampaignsUpdateColumn {
  /** column name */
  CampaignId = 'campaign_id',
  /** column name */
  Id = 'id',
  /** column name */
  SegmentId = 'segment_id',
  /** column name */
  Slug = 'slug'
}

/** aggregate var_pop on columns */
export type SegmentCampaignsVarPopFields = {
  __typename?: 'segment_campaigns_var_pop_fields';
  campaign_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  segment_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "segment_campaigns" */
export type SegmentCampaignsVarPopOrderBy = {
  campaign_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  segment_id?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type SegmentCampaignsVarSampFields = {
  __typename?: 'segment_campaigns_var_samp_fields';
  campaign_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  segment_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "segment_campaigns" */
export type SegmentCampaignsVarSampOrderBy = {
  campaign_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  segment_id?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type SegmentCampaignsVarianceFields = {
  __typename?: 'segment_campaigns_variance_fields';
  campaign_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  segment_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "segment_campaigns" */
export type SegmentCampaignsVarianceOrderBy = {
  campaign_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  segment_id?: Maybe<OrderBy>;
};

/** columns and relationships of "segments" */
export type Segments = {
  __typename?: 'segments';
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  /** An object relationship */
  organisation: Projects;
  project_id: Scalars['Int'];
  /** An array relationship */
  segment_campaigns: Array<SegmentCampaigns>;
  /** An aggregated array relationship */
  segment_campaigns_aggregate: SegmentCampaignsAggregate;
  /** An array relationship */
  user_activities: Array<UserActivities>;
  /** An aggregated array relationship */
  user_activities_aggregate: UserActivitiesAggregate;
};


/** columns and relationships of "segments" */
export type SegmentsSegmentCampaignsArgs = {
  distinct_on?: Maybe<Array<SegmentCampaignsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SegmentCampaignsOrderBy>>;
  where?: Maybe<SegmentCampaignsBoolExp>;
};


/** columns and relationships of "segments" */
export type SegmentsSegmentCampaignsAggregateArgs = {
  distinct_on?: Maybe<Array<SegmentCampaignsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SegmentCampaignsOrderBy>>;
  where?: Maybe<SegmentCampaignsBoolExp>;
};


/** columns and relationships of "segments" */
export type SegmentsUserActivitiesArgs = {
  distinct_on?: Maybe<Array<UserActivitiesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserActivitiesOrderBy>>;
  where?: Maybe<UserActivitiesBoolExp>;
};


/** columns and relationships of "segments" */
export type SegmentsUserActivitiesAggregateArgs = {
  distinct_on?: Maybe<Array<UserActivitiesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserActivitiesOrderBy>>;
  where?: Maybe<UserActivitiesBoolExp>;
};

/** aggregated selection of "segments" */
export type SegmentsAggregate = {
  __typename?: 'segments_aggregate';
  aggregate?: Maybe<SegmentsAggregateFields>;
  nodes: Array<Segments>;
};

/** aggregate fields of "segments" */
export type SegmentsAggregateFields = {
  __typename?: 'segments_aggregate_fields';
  avg?: Maybe<SegmentsAvgFields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<SegmentsMaxFields>;
  min?: Maybe<SegmentsMinFields>;
  stddev?: Maybe<SegmentsStddevFields>;
  stddev_pop?: Maybe<SegmentsStddevPopFields>;
  stddev_samp?: Maybe<SegmentsStddevSampFields>;
  sum?: Maybe<SegmentsSumFields>;
  var_pop?: Maybe<SegmentsVarPopFields>;
  var_samp?: Maybe<SegmentsVarSampFields>;
  variance?: Maybe<SegmentsVarianceFields>;
};


/** aggregate fields of "segments" */
export type SegmentsAggregateFieldsCountArgs = {
  columns?: Maybe<Array<SegmentsSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "segments" */
export type SegmentsAggregateOrderBy = {
  avg?: Maybe<SegmentsAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<SegmentsMaxOrderBy>;
  min?: Maybe<SegmentsMinOrderBy>;
  stddev?: Maybe<SegmentsStddevOrderBy>;
  stddev_pop?: Maybe<SegmentsStddevPopOrderBy>;
  stddev_samp?: Maybe<SegmentsStddevSampOrderBy>;
  sum?: Maybe<SegmentsSumOrderBy>;
  var_pop?: Maybe<SegmentsVarPopOrderBy>;
  var_samp?: Maybe<SegmentsVarSampOrderBy>;
  variance?: Maybe<SegmentsVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "segments" */
export type SegmentsArrRelInsertInput = {
  data: Array<SegmentsInsertInput>;
  on_conflict?: Maybe<SegmentsOnConflict>;
};

/** aggregate avg on columns */
export type SegmentsAvgFields = {
  __typename?: 'segments_avg_fields';
  id?: Maybe<Scalars['Float']>;
  project_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "segments" */
export type SegmentsAvgOrderBy = {
  id?: Maybe<OrderBy>;
  project_id?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "segments". All fields are combined with a logical 'AND'. */
export type SegmentsBoolExp = {
  _and?: Maybe<Array<Maybe<SegmentsBoolExp>>>;
  _not?: Maybe<SegmentsBoolExp>;
  _or?: Maybe<Array<Maybe<SegmentsBoolExp>>>;
  description?: Maybe<StringComparisonExp>;
  id?: Maybe<IntComparisonExp>;
  name?: Maybe<StringComparisonExp>;
  organisation?: Maybe<ProjectsBoolExp>;
  project_id?: Maybe<IntComparisonExp>;
  segment_campaigns?: Maybe<SegmentCampaignsBoolExp>;
  user_activities?: Maybe<UserActivitiesBoolExp>;
};

/** unique or primary key constraints on table "segments" */
export enum SegmentsConstraint {
  /** unique or primary key constraint */
  SegmentsPkey = 'segments_pkey'
}

/** input type for incrementing integer column in table "segments" */
export type SegmentsIncInput = {
  id?: Maybe<Scalars['Int']>;
  project_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "segments" */
export type SegmentsInsertInput = {
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  organisation?: Maybe<ProjectsObjRelInsertInput>;
  project_id?: Maybe<Scalars['Int']>;
  segment_campaigns?: Maybe<SegmentCampaignsArrRelInsertInput>;
  user_activities?: Maybe<UserActivitiesArrRelInsertInput>;
};

/** aggregate max on columns */
export type SegmentsMaxFields = {
  __typename?: 'segments_max_fields';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  project_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "segments" */
export type SegmentsMaxOrderBy = {
  description?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  name?: Maybe<OrderBy>;
  project_id?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type SegmentsMinFields = {
  __typename?: 'segments_min_fields';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  project_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "segments" */
export type SegmentsMinOrderBy = {
  description?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  name?: Maybe<OrderBy>;
  project_id?: Maybe<OrderBy>;
};

/** response of any mutation on the table "segments" */
export type SegmentsMutationResponse = {
  __typename?: 'segments_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Segments>;
};

/** input type for inserting object relation for remote table "segments" */
export type SegmentsObjRelInsertInput = {
  data: SegmentsInsertInput;
  on_conflict?: Maybe<SegmentsOnConflict>;
};

/** on conflict condition type for table "segments" */
export type SegmentsOnConflict = {
  constraint: SegmentsConstraint;
  update_columns: Array<SegmentsUpdateColumn>;
  where?: Maybe<SegmentsBoolExp>;
};

/** ordering options when selecting data from "segments" */
export type SegmentsOrderBy = {
  description?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  name?: Maybe<OrderBy>;
  organisation?: Maybe<ProjectsOrderBy>;
  project_id?: Maybe<OrderBy>;
  segment_campaigns_aggregate?: Maybe<SegmentCampaignsAggregateOrderBy>;
  user_activities_aggregate?: Maybe<UserActivitiesAggregateOrderBy>;
};

/** primary key columns input for table: "segments" */
export type SegmentsPkColumnsInput = {
  id: Scalars['Int'];
};

/** select columns of table "segments" */
export enum SegmentsSelectColumn {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  ProjectId = 'project_id'
}

/** input type for updating data in table "segments" */
export type SegmentsSetInput = {
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  project_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type SegmentsStddevFields = {
  __typename?: 'segments_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  project_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "segments" */
export type SegmentsStddevOrderBy = {
  id?: Maybe<OrderBy>;
  project_id?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type SegmentsStddevPopFields = {
  __typename?: 'segments_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  project_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "segments" */
export type SegmentsStddevPopOrderBy = {
  id?: Maybe<OrderBy>;
  project_id?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type SegmentsStddevSampFields = {
  __typename?: 'segments_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  project_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "segments" */
export type SegmentsStddevSampOrderBy = {
  id?: Maybe<OrderBy>;
  project_id?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type SegmentsSumFields = {
  __typename?: 'segments_sum_fields';
  id?: Maybe<Scalars['Int']>;
  project_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "segments" */
export type SegmentsSumOrderBy = {
  id?: Maybe<OrderBy>;
  project_id?: Maybe<OrderBy>;
};

/** update columns of table "segments" */
export enum SegmentsUpdateColumn {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  ProjectId = 'project_id'
}

/** aggregate var_pop on columns */
export type SegmentsVarPopFields = {
  __typename?: 'segments_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  project_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "segments" */
export type SegmentsVarPopOrderBy = {
  id?: Maybe<OrderBy>;
  project_id?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type SegmentsVarSampFields = {
  __typename?: 'segments_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  project_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "segments" */
export type SegmentsVarSampOrderBy = {
  id?: Maybe<OrderBy>;
  project_id?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type SegmentsVarianceFields = {
  __typename?: 'segments_variance_fields';
  id?: Maybe<Scalars['Float']>;
  project_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "segments" */
export type SegmentsVarianceOrderBy = {
  id?: Maybe<OrderBy>;
  project_id?: Maybe<OrderBy>;
};

/** subscription root */
export type SubscriptionRoot = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "articles" */
  articles: Array<Articles>;
  /** fetch aggregated fields from the table: "articles" */
  articles_aggregate: ArticlesAggregate;
  /** fetch data from the table: "articles" using primary key columns */
  articles_by_pk?: Maybe<Articles>;
  /** fetch data from the table: "articles_user_activity" */
  articles_user_activity: Array<ArticlesUserActivity>;
  /** fetch aggregated fields from the table: "articles_user_activity" */
  articles_user_activity_aggregate: ArticlesUserActivityAggregate;
  /** fetch data from the table: "articles_user_activity" using primary key columns */
  articles_user_activity_by_pk?: Maybe<ArticlesUserActivity>;
  /** fetch data from the table: "blocks" */
  blocks: Array<Blocks>;
  /** fetch aggregated fields from the table: "blocks" */
  blocks_aggregate: BlocksAggregate;
  /** fetch data from the table: "blocks" using primary key columns */
  blocks_by_pk?: Maybe<Blocks>;
  /** fetch data from the table: "campaigns" */
  campaigns: Array<Campaigns>;
  /** fetch aggregated fields from the table: "campaigns" */
  campaigns_aggregate: CampaignsAggregate;
  /** fetch data from the table: "campaigns" using primary key columns */
  campaigns_by_pk?: Maybe<Campaigns>;
  /** fetch data from the table: "node_connections" */
  node_connections: Array<NodeConnections>;
  /** fetch aggregated fields from the table: "node_connections" */
  node_connections_aggregate: NodeConnectionsAggregate;
  /** fetch data from the table: "node_connections" using primary key columns */
  node_connections_by_pk?: Maybe<NodeConnections>;
  /** fetch data from the table: "nodes" */
  nodes: Array<Nodes>;
  /** fetch aggregated fields from the table: "nodes" */
  nodes_aggregate: NodesAggregate;
  /** fetch data from the table: "nodes" using primary key columns */
  nodes_by_pk?: Maybe<Nodes>;
  /** fetch data from the table: "organisations" */
  organisations: Array<Organisations>;
  /** fetch aggregated fields from the table: "organisations" */
  organisations_aggregate: OrganisationsAggregate;
  /** fetch data from the table: "organisations" using primary key columns */
  organisations_by_pk?: Maybe<Organisations>;
  /** fetch data from the table: "permissions" */
  permissions: Array<Permissions>;
  /** fetch aggregated fields from the table: "permissions" */
  permissions_aggregate: PermissionsAggregate;
  /** fetch data from the table: "permissions" using primary key columns */
  permissions_by_pk?: Maybe<Permissions>;
  /** fetch data from the table: "projects" */
  projects: Array<Projects>;
  /** fetch aggregated fields from the table: "projects" */
  projects_aggregate: ProjectsAggregate;
  /** fetch data from the table: "projects" using primary key columns */
  projects_by_pk?: Maybe<Projects>;
  /** fetch data from the table: "segment_campaigns" */
  segment_campaigns: Array<SegmentCampaigns>;
  /** fetch aggregated fields from the table: "segment_campaigns" */
  segment_campaigns_aggregate: SegmentCampaignsAggregate;
  /** fetch data from the table: "segment_campaigns" using primary key columns */
  segment_campaigns_by_pk?: Maybe<SegmentCampaigns>;
  /** fetch data from the table: "segments" */
  segments: Array<Segments>;
  /** fetch aggregated fields from the table: "segments" */
  segments_aggregate: SegmentsAggregate;
  /** fetch data from the table: "segments" using primary key columns */
  segments_by_pk?: Maybe<Segments>;
  /** fetch data from the table: "user_activities" */
  user_activities: Array<UserActivities>;
  /** fetch aggregated fields from the table: "user_activities" */
  user_activities_aggregate: UserActivitiesAggregate;
  /** fetch data from the table: "user_activities" using primary key columns */
  user_activities_by_pk?: Maybe<UserActivities>;
  /** fetch data from the table: "user_organisation" */
  user_organisation: Array<UserOrganisation>;
  /** fetch aggregated fields from the table: "user_organisation" */
  user_organisation_aggregate: UserOrganisationAggregate;
  /** fetch data from the table: "user_organisation" using primary key columns */
  user_organisation_by_pk?: Maybe<UserOrganisation>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: UsersAggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


/** subscription root */
export type SubscriptionRootArticlesArgs = {
  distinct_on?: Maybe<Array<ArticlesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ArticlesOrderBy>>;
  where?: Maybe<ArticlesBoolExp>;
};


/** subscription root */
export type SubscriptionRootArticlesAggregateArgs = {
  distinct_on?: Maybe<Array<ArticlesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ArticlesOrderBy>>;
  where?: Maybe<ArticlesBoolExp>;
};


/** subscription root */
export type SubscriptionRootArticlesByPkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type SubscriptionRootArticlesUserActivityArgs = {
  distinct_on?: Maybe<Array<ArticlesUserActivitySelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ArticlesUserActivityOrderBy>>;
  where?: Maybe<ArticlesUserActivityBoolExp>;
};


/** subscription root */
export type SubscriptionRootArticlesUserActivityAggregateArgs = {
  distinct_on?: Maybe<Array<ArticlesUserActivitySelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ArticlesUserActivityOrderBy>>;
  where?: Maybe<ArticlesUserActivityBoolExp>;
};


/** subscription root */
export type SubscriptionRootArticlesUserActivityByPkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type SubscriptionRootBlocksArgs = {
  distinct_on?: Maybe<Array<BlocksSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<BlocksOrderBy>>;
  where?: Maybe<BlocksBoolExp>;
};


/** subscription root */
export type SubscriptionRootBlocksAggregateArgs = {
  distinct_on?: Maybe<Array<BlocksSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<BlocksOrderBy>>;
  where?: Maybe<BlocksBoolExp>;
};


/** subscription root */
export type SubscriptionRootBlocksByPkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type SubscriptionRootCampaignsArgs = {
  distinct_on?: Maybe<Array<CampaignsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<CampaignsOrderBy>>;
  where?: Maybe<CampaignsBoolExp>;
};


/** subscription root */
export type SubscriptionRootCampaignsAggregateArgs = {
  distinct_on?: Maybe<Array<CampaignsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<CampaignsOrderBy>>;
  where?: Maybe<CampaignsBoolExp>;
};


/** subscription root */
export type SubscriptionRootCampaignsByPkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type SubscriptionRootNodeConnectionsArgs = {
  distinct_on?: Maybe<Array<NodeConnectionsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<NodeConnectionsOrderBy>>;
  where?: Maybe<NodeConnectionsBoolExp>;
};


/** subscription root */
export type SubscriptionRootNodeConnectionsAggregateArgs = {
  distinct_on?: Maybe<Array<NodeConnectionsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<NodeConnectionsOrderBy>>;
  where?: Maybe<NodeConnectionsBoolExp>;
};


/** subscription root */
export type SubscriptionRootNodeConnectionsByPkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type SubscriptionRootNodesArgs = {
  distinct_on?: Maybe<Array<NodesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<NodesOrderBy>>;
  where?: Maybe<NodesBoolExp>;
};


/** subscription root */
export type SubscriptionRootNodesAggregateArgs = {
  distinct_on?: Maybe<Array<NodesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<NodesOrderBy>>;
  where?: Maybe<NodesBoolExp>;
};


/** subscription root */
export type SubscriptionRootNodesByPkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type SubscriptionRootOrganisationsArgs = {
  distinct_on?: Maybe<Array<OrganisationsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<OrganisationsOrderBy>>;
  where?: Maybe<OrganisationsBoolExp>;
};


/** subscription root */
export type SubscriptionRootOrganisationsAggregateArgs = {
  distinct_on?: Maybe<Array<OrganisationsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<OrganisationsOrderBy>>;
  where?: Maybe<OrganisationsBoolExp>;
};


/** subscription root */
export type SubscriptionRootOrganisationsByPkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type SubscriptionRootPermissionsArgs = {
  distinct_on?: Maybe<Array<PermissionsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<PermissionsOrderBy>>;
  where?: Maybe<PermissionsBoolExp>;
};


/** subscription root */
export type SubscriptionRootPermissionsAggregateArgs = {
  distinct_on?: Maybe<Array<PermissionsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<PermissionsOrderBy>>;
  where?: Maybe<PermissionsBoolExp>;
};


/** subscription root */
export type SubscriptionRootPermissionsByPkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type SubscriptionRootProjectsArgs = {
  distinct_on?: Maybe<Array<ProjectsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ProjectsOrderBy>>;
  where?: Maybe<ProjectsBoolExp>;
};


/** subscription root */
export type SubscriptionRootProjectsAggregateArgs = {
  distinct_on?: Maybe<Array<ProjectsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ProjectsOrderBy>>;
  where?: Maybe<ProjectsBoolExp>;
};


/** subscription root */
export type SubscriptionRootProjectsByPkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type SubscriptionRootSegmentCampaignsArgs = {
  distinct_on?: Maybe<Array<SegmentCampaignsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SegmentCampaignsOrderBy>>;
  where?: Maybe<SegmentCampaignsBoolExp>;
};


/** subscription root */
export type SubscriptionRootSegmentCampaignsAggregateArgs = {
  distinct_on?: Maybe<Array<SegmentCampaignsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SegmentCampaignsOrderBy>>;
  where?: Maybe<SegmentCampaignsBoolExp>;
};


/** subscription root */
export type SubscriptionRootSegmentCampaignsByPkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type SubscriptionRootSegmentsArgs = {
  distinct_on?: Maybe<Array<SegmentsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SegmentsOrderBy>>;
  where?: Maybe<SegmentsBoolExp>;
};


/** subscription root */
export type SubscriptionRootSegmentsAggregateArgs = {
  distinct_on?: Maybe<Array<SegmentsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SegmentsOrderBy>>;
  where?: Maybe<SegmentsBoolExp>;
};


/** subscription root */
export type SubscriptionRootSegmentsByPkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type SubscriptionRootUserActivitiesArgs = {
  distinct_on?: Maybe<Array<UserActivitiesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserActivitiesOrderBy>>;
  where?: Maybe<UserActivitiesBoolExp>;
};


/** subscription root */
export type SubscriptionRootUserActivitiesAggregateArgs = {
  distinct_on?: Maybe<Array<UserActivitiesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserActivitiesOrderBy>>;
  where?: Maybe<UserActivitiesBoolExp>;
};


/** subscription root */
export type SubscriptionRootUserActivitiesByPkArgs = {
  segment_id: Scalars['Int'];
  user_id: Scalars['Int'];
};


/** subscription root */
export type SubscriptionRootUserOrganisationArgs = {
  distinct_on?: Maybe<Array<UserOrganisationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserOrganisationOrderBy>>;
  where?: Maybe<UserOrganisationBoolExp>;
};


/** subscription root */
export type SubscriptionRootUserOrganisationAggregateArgs = {
  distinct_on?: Maybe<Array<UserOrganisationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserOrganisationOrderBy>>;
  where?: Maybe<UserOrganisationBoolExp>;
};


/** subscription root */
export type SubscriptionRootUserOrganisationByPkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type SubscriptionRootUsersArgs = {
  distinct_on?: Maybe<Array<UsersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UsersOrderBy>>;
  where?: Maybe<UsersBoolExp>;
};


/** subscription root */
export type SubscriptionRootUsersAggregateArgs = {
  distinct_on?: Maybe<Array<UsersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UsersOrderBy>>;
  where?: Maybe<UsersBoolExp>;
};


/** subscription root */
export type SubscriptionRootUsersByPkArgs = {
  id: Scalars['Int'];
};


/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type TimestamptzComparisonExp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "user_activities" */
export type UserActivities = {
  __typename?: 'user_activities';
  created_at: Scalars['timestamptz'];
  /** An object relationship */
  segment: Segments;
  segment_id: Scalars['Int'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['Int'];
};

/** aggregated selection of "user_activities" */
export type UserActivitiesAggregate = {
  __typename?: 'user_activities_aggregate';
  aggregate?: Maybe<UserActivitiesAggregateFields>;
  nodes: Array<UserActivities>;
};

/** aggregate fields of "user_activities" */
export type UserActivitiesAggregateFields = {
  __typename?: 'user_activities_aggregate_fields';
  avg?: Maybe<UserActivitiesAvgFields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<UserActivitiesMaxFields>;
  min?: Maybe<UserActivitiesMinFields>;
  stddev?: Maybe<UserActivitiesStddevFields>;
  stddev_pop?: Maybe<UserActivitiesStddevPopFields>;
  stddev_samp?: Maybe<UserActivitiesStddevSampFields>;
  sum?: Maybe<UserActivitiesSumFields>;
  var_pop?: Maybe<UserActivitiesVarPopFields>;
  var_samp?: Maybe<UserActivitiesVarSampFields>;
  variance?: Maybe<UserActivitiesVarianceFields>;
};


/** aggregate fields of "user_activities" */
export type UserActivitiesAggregateFieldsCountArgs = {
  columns?: Maybe<Array<UserActivitiesSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user_activities" */
export type UserActivitiesAggregateOrderBy = {
  avg?: Maybe<UserActivitiesAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<UserActivitiesMaxOrderBy>;
  min?: Maybe<UserActivitiesMinOrderBy>;
  stddev?: Maybe<UserActivitiesStddevOrderBy>;
  stddev_pop?: Maybe<UserActivitiesStddevPopOrderBy>;
  stddev_samp?: Maybe<UserActivitiesStddevSampOrderBy>;
  sum?: Maybe<UserActivitiesSumOrderBy>;
  var_pop?: Maybe<UserActivitiesVarPopOrderBy>;
  var_samp?: Maybe<UserActivitiesVarSampOrderBy>;
  variance?: Maybe<UserActivitiesVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "user_activities" */
export type UserActivitiesArrRelInsertInput = {
  data: Array<UserActivitiesInsertInput>;
  on_conflict?: Maybe<UserActivitiesOnConflict>;
};

/** aggregate avg on columns */
export type UserActivitiesAvgFields = {
  __typename?: 'user_activities_avg_fields';
  segment_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "user_activities" */
export type UserActivitiesAvgOrderBy = {
  segment_id?: Maybe<OrderBy>;
  user_id?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "user_activities". All fields are combined with a logical 'AND'. */
export type UserActivitiesBoolExp = {
  _and?: Maybe<Array<Maybe<UserActivitiesBoolExp>>>;
  _not?: Maybe<UserActivitiesBoolExp>;
  _or?: Maybe<Array<Maybe<UserActivitiesBoolExp>>>;
  created_at?: Maybe<TimestamptzComparisonExp>;
  segment?: Maybe<SegmentsBoolExp>;
  segment_id?: Maybe<IntComparisonExp>;
  user?: Maybe<UsersBoolExp>;
  user_id?: Maybe<IntComparisonExp>;
};

/** unique or primary key constraints on table "user_activities" */
export enum UserActivitiesConstraint {
  /** unique or primary key constraint */
  UserActivitiesPkey = 'user_activities_pkey'
}

/** input type for incrementing integer column in table "user_activities" */
export type UserActivitiesIncInput = {
  segment_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "user_activities" */
export type UserActivitiesInsertInput = {
  created_at?: Maybe<Scalars['timestamptz']>;
  segment?: Maybe<SegmentsObjRelInsertInput>;
  segment_id?: Maybe<Scalars['Int']>;
  user?: Maybe<UsersObjRelInsertInput>;
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type UserActivitiesMaxFields = {
  __typename?: 'user_activities_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  segment_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "user_activities" */
export type UserActivitiesMaxOrderBy = {
  created_at?: Maybe<OrderBy>;
  segment_id?: Maybe<OrderBy>;
  user_id?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type UserActivitiesMinFields = {
  __typename?: 'user_activities_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  segment_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "user_activities" */
export type UserActivitiesMinOrderBy = {
  created_at?: Maybe<OrderBy>;
  segment_id?: Maybe<OrderBy>;
  user_id?: Maybe<OrderBy>;
};

/** response of any mutation on the table "user_activities" */
export type UserActivitiesMutationResponse = {
  __typename?: 'user_activities_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<UserActivities>;
};

/** input type for inserting object relation for remote table "user_activities" */
export type UserActivitiesObjRelInsertInput = {
  data: UserActivitiesInsertInput;
  on_conflict?: Maybe<UserActivitiesOnConflict>;
};

/** on conflict condition type for table "user_activities" */
export type UserActivitiesOnConflict = {
  constraint: UserActivitiesConstraint;
  update_columns: Array<UserActivitiesUpdateColumn>;
  where?: Maybe<UserActivitiesBoolExp>;
};

/** ordering options when selecting data from "user_activities" */
export type UserActivitiesOrderBy = {
  created_at?: Maybe<OrderBy>;
  segment?: Maybe<SegmentsOrderBy>;
  segment_id?: Maybe<OrderBy>;
  user?: Maybe<UsersOrderBy>;
  user_id?: Maybe<OrderBy>;
};

/** primary key columns input for table: "user_activities" */
export type UserActivitiesPkColumnsInput = {
  segment_id: Scalars['Int'];
  user_id: Scalars['Int'];
};

/** select columns of table "user_activities" */
export enum UserActivitiesSelectColumn {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  SegmentId = 'segment_id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "user_activities" */
export type UserActivitiesSetInput = {
  created_at?: Maybe<Scalars['timestamptz']>;
  segment_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type UserActivitiesStddevFields = {
  __typename?: 'user_activities_stddev_fields';
  segment_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "user_activities" */
export type UserActivitiesStddevOrderBy = {
  segment_id?: Maybe<OrderBy>;
  user_id?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type UserActivitiesStddevPopFields = {
  __typename?: 'user_activities_stddev_pop_fields';
  segment_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "user_activities" */
export type UserActivitiesStddevPopOrderBy = {
  segment_id?: Maybe<OrderBy>;
  user_id?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type UserActivitiesStddevSampFields = {
  __typename?: 'user_activities_stddev_samp_fields';
  segment_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "user_activities" */
export type UserActivitiesStddevSampOrderBy = {
  segment_id?: Maybe<OrderBy>;
  user_id?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type UserActivitiesSumFields = {
  __typename?: 'user_activities_sum_fields';
  segment_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "user_activities" */
export type UserActivitiesSumOrderBy = {
  segment_id?: Maybe<OrderBy>;
  user_id?: Maybe<OrderBy>;
};

/** update columns of table "user_activities" */
export enum UserActivitiesUpdateColumn {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  SegmentId = 'segment_id',
  /** column name */
  UserId = 'user_id'
}

/** aggregate var_pop on columns */
export type UserActivitiesVarPopFields = {
  __typename?: 'user_activities_var_pop_fields';
  segment_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "user_activities" */
export type UserActivitiesVarPopOrderBy = {
  segment_id?: Maybe<OrderBy>;
  user_id?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type UserActivitiesVarSampFields = {
  __typename?: 'user_activities_var_samp_fields';
  segment_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "user_activities" */
export type UserActivitiesVarSampOrderBy = {
  segment_id?: Maybe<OrderBy>;
  user_id?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type UserActivitiesVarianceFields = {
  __typename?: 'user_activities_variance_fields';
  segment_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "user_activities" */
export type UserActivitiesVarianceOrderBy = {
  segment_id?: Maybe<OrderBy>;
  user_id?: Maybe<OrderBy>;
};

/** columns and relationships of "user_organisation" */
export type UserOrganisation = {
  __typename?: 'user_organisation';
  id: Scalars['Int'];
  /** An object relationship */
  organisation: Organisations;
  organisationId: Scalars['Int'];
  /** An object relationship */
  user: Users;
  userId: Scalars['Int'];
};

/** aggregated selection of "user_organisation" */
export type UserOrganisationAggregate = {
  __typename?: 'user_organisation_aggregate';
  aggregate?: Maybe<UserOrganisationAggregateFields>;
  nodes: Array<UserOrganisation>;
};

/** aggregate fields of "user_organisation" */
export type UserOrganisationAggregateFields = {
  __typename?: 'user_organisation_aggregate_fields';
  avg?: Maybe<UserOrganisationAvgFields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<UserOrganisationMaxFields>;
  min?: Maybe<UserOrganisationMinFields>;
  stddev?: Maybe<UserOrganisationStddevFields>;
  stddev_pop?: Maybe<UserOrganisationStddevPopFields>;
  stddev_samp?: Maybe<UserOrganisationStddevSampFields>;
  sum?: Maybe<UserOrganisationSumFields>;
  var_pop?: Maybe<UserOrganisationVarPopFields>;
  var_samp?: Maybe<UserOrganisationVarSampFields>;
  variance?: Maybe<UserOrganisationVarianceFields>;
};


/** aggregate fields of "user_organisation" */
export type UserOrganisationAggregateFieldsCountArgs = {
  columns?: Maybe<Array<UserOrganisationSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user_organisation" */
export type UserOrganisationAggregateOrderBy = {
  avg?: Maybe<UserOrganisationAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<UserOrganisationMaxOrderBy>;
  min?: Maybe<UserOrganisationMinOrderBy>;
  stddev?: Maybe<UserOrganisationStddevOrderBy>;
  stddev_pop?: Maybe<UserOrganisationStddevPopOrderBy>;
  stddev_samp?: Maybe<UserOrganisationStddevSampOrderBy>;
  sum?: Maybe<UserOrganisationSumOrderBy>;
  var_pop?: Maybe<UserOrganisationVarPopOrderBy>;
  var_samp?: Maybe<UserOrganisationVarSampOrderBy>;
  variance?: Maybe<UserOrganisationVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "user_organisation" */
export type UserOrganisationArrRelInsertInput = {
  data: Array<UserOrganisationInsertInput>;
  on_conflict?: Maybe<UserOrganisationOnConflict>;
};

/** aggregate avg on columns */
export type UserOrganisationAvgFields = {
  __typename?: 'user_organisation_avg_fields';
  id?: Maybe<Scalars['Float']>;
  organisationId?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "user_organisation" */
export type UserOrganisationAvgOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "user_organisation". All fields are combined with a logical 'AND'. */
export type UserOrganisationBoolExp = {
  _and?: Maybe<Array<Maybe<UserOrganisationBoolExp>>>;
  _not?: Maybe<UserOrganisationBoolExp>;
  _or?: Maybe<Array<Maybe<UserOrganisationBoolExp>>>;
  id?: Maybe<IntComparisonExp>;
  organisation?: Maybe<OrganisationsBoolExp>;
  organisationId?: Maybe<IntComparisonExp>;
  user?: Maybe<UsersBoolExp>;
  userId?: Maybe<IntComparisonExp>;
};

/** unique or primary key constraints on table "user_organisation" */
export enum UserOrganisationConstraint {
  /** unique or primary key constraint */
  UserOrganisationPkey = 'user_organisation_pkey'
}

/** input type for incrementing integer column in table "user_organisation" */
export type UserOrganisationIncInput = {
  id?: Maybe<Scalars['Int']>;
  organisationId?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "user_organisation" */
export type UserOrganisationInsertInput = {
  id?: Maybe<Scalars['Int']>;
  organisation?: Maybe<OrganisationsObjRelInsertInput>;
  organisationId?: Maybe<Scalars['Int']>;
  user?: Maybe<UsersObjRelInsertInput>;
  userId?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type UserOrganisationMaxFields = {
  __typename?: 'user_organisation_max_fields';
  id?: Maybe<Scalars['Int']>;
  organisationId?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "user_organisation" */
export type UserOrganisationMaxOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type UserOrganisationMinFields = {
  __typename?: 'user_organisation_min_fields';
  id?: Maybe<Scalars['Int']>;
  organisationId?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "user_organisation" */
export type UserOrganisationMinOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

/** response of any mutation on the table "user_organisation" */
export type UserOrganisationMutationResponse = {
  __typename?: 'user_organisation_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<UserOrganisation>;
};

/** input type for inserting object relation for remote table "user_organisation" */
export type UserOrganisationObjRelInsertInput = {
  data: UserOrganisationInsertInput;
  on_conflict?: Maybe<UserOrganisationOnConflict>;
};

/** on conflict condition type for table "user_organisation" */
export type UserOrganisationOnConflict = {
  constraint: UserOrganisationConstraint;
  update_columns: Array<UserOrganisationUpdateColumn>;
  where?: Maybe<UserOrganisationBoolExp>;
};

/** ordering options when selecting data from "user_organisation" */
export type UserOrganisationOrderBy = {
  id?: Maybe<OrderBy>;
  organisation?: Maybe<OrganisationsOrderBy>;
  organisationId?: Maybe<OrderBy>;
  user?: Maybe<UsersOrderBy>;
  userId?: Maybe<OrderBy>;
};

/** primary key columns input for table: "user_organisation" */
export type UserOrganisationPkColumnsInput = {
  id: Scalars['Int'];
};

/** select columns of table "user_organisation" */
export enum UserOrganisationSelectColumn {
  /** column name */
  Id = 'id',
  /** column name */
  OrganisationId = 'organisationId',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "user_organisation" */
export type UserOrganisationSetInput = {
  id?: Maybe<Scalars['Int']>;
  organisationId?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type UserOrganisationStddevFields = {
  __typename?: 'user_organisation_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  organisationId?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "user_organisation" */
export type UserOrganisationStddevOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type UserOrganisationStddevPopFields = {
  __typename?: 'user_organisation_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  organisationId?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "user_organisation" */
export type UserOrganisationStddevPopOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type UserOrganisationStddevSampFields = {
  __typename?: 'user_organisation_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  organisationId?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "user_organisation" */
export type UserOrganisationStddevSampOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type UserOrganisationSumFields = {
  __typename?: 'user_organisation_sum_fields';
  id?: Maybe<Scalars['Int']>;
  organisationId?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "user_organisation" */
export type UserOrganisationSumOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

/** update columns of table "user_organisation" */
export enum UserOrganisationUpdateColumn {
  /** column name */
  Id = 'id',
  /** column name */
  OrganisationId = 'organisationId',
  /** column name */
  UserId = 'userId'
}

/** aggregate var_pop on columns */
export type UserOrganisationVarPopFields = {
  __typename?: 'user_organisation_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  organisationId?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "user_organisation" */
export type UserOrganisationVarPopOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type UserOrganisationVarSampFields = {
  __typename?: 'user_organisation_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  organisationId?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "user_organisation" */
export type UserOrganisationVarSampOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type UserOrganisationVarianceFields = {
  __typename?: 'user_organisation_variance_fields';
  id?: Maybe<Scalars['Float']>;
  organisationId?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "user_organisation" */
export type UserOrganisationVarianceOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
  userId?: Maybe<OrderBy>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  /** An object relationship */
  archives?: Maybe<Articles>;
  /** An array relationship */
  articles_user_activities: Array<ArticlesUserActivity>;
  /** An aggregated array relationship */
  articles_user_activities_aggregate: ArticlesUserActivityAggregate;
  createdAt?: Maybe<Scalars['timestamptz']>;
  /** An array relationship */
  editor_activities: Array<UserActivities>;
  /** An aggregated array relationship */
  editor_activities_aggregate: UserActivitiesAggregate;
  email: Scalars['String'];
  hasuraUserId: Scalars['String'];
  id: Scalars['Int'];
  image: Scalars['String'];
  lastSignedInAt: Scalars['timestamptz'];
  name: Scalars['String'];
  /** An object relationship */
  organisation: Organisations;
  organisationId: Scalars['Int'];
  /** An array relationship */
  permissions: Array<Permissions>;
  /** An aggregated array relationship */
  permissions_aggregate: PermissionsAggregate;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  /** An array relationship */
  userOrganisations: Array<UserOrganisation>;
  /** An aggregated array relationship */
  userOrganisations_aggregate: UserOrganisationAggregate;
};


/** columns and relationships of "users" */
export type UsersArticlesUserActivitiesArgs = {
  distinct_on?: Maybe<Array<ArticlesUserActivitySelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ArticlesUserActivityOrderBy>>;
  where?: Maybe<ArticlesUserActivityBoolExp>;
};


/** columns and relationships of "users" */
export type UsersArticlesUserActivitiesAggregateArgs = {
  distinct_on?: Maybe<Array<ArticlesUserActivitySelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ArticlesUserActivityOrderBy>>;
  where?: Maybe<ArticlesUserActivityBoolExp>;
};


/** columns and relationships of "users" */
export type UsersEditorActivitiesArgs = {
  distinct_on?: Maybe<Array<UserActivitiesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserActivitiesOrderBy>>;
  where?: Maybe<UserActivitiesBoolExp>;
};


/** columns and relationships of "users" */
export type UsersEditorActivitiesAggregateArgs = {
  distinct_on?: Maybe<Array<UserActivitiesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserActivitiesOrderBy>>;
  where?: Maybe<UserActivitiesBoolExp>;
};


/** columns and relationships of "users" */
export type UsersPermissionsArgs = {
  distinct_on?: Maybe<Array<PermissionsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<PermissionsOrderBy>>;
  where?: Maybe<PermissionsBoolExp>;
};


/** columns and relationships of "users" */
export type UsersPermissionsAggregateArgs = {
  distinct_on?: Maybe<Array<PermissionsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<PermissionsOrderBy>>;
  where?: Maybe<PermissionsBoolExp>;
};


/** columns and relationships of "users" */
export type UsersUserOrganisationsArgs = {
  distinct_on?: Maybe<Array<UserOrganisationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserOrganisationOrderBy>>;
  where?: Maybe<UserOrganisationBoolExp>;
};


/** columns and relationships of "users" */
export type UsersUserOrganisationsAggregateArgs = {
  distinct_on?: Maybe<Array<UserOrganisationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserOrganisationOrderBy>>;
  where?: Maybe<UserOrganisationBoolExp>;
};

/** aggregated selection of "users" */
export type UsersAggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<UsersAggregateFields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type UsersAggregateFields = {
  __typename?: 'users_aggregate_fields';
  avg?: Maybe<UsersAvgFields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<UsersMaxFields>;
  min?: Maybe<UsersMinFields>;
  stddev?: Maybe<UsersStddevFields>;
  stddev_pop?: Maybe<UsersStddevPopFields>;
  stddev_samp?: Maybe<UsersStddevSampFields>;
  sum?: Maybe<UsersSumFields>;
  var_pop?: Maybe<UsersVarPopFields>;
  var_samp?: Maybe<UsersVarSampFields>;
  variance?: Maybe<UsersVarianceFields>;
};


/** aggregate fields of "users" */
export type UsersAggregateFieldsCountArgs = {
  columns?: Maybe<Array<UsersSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "users" */
export type UsersAggregateOrderBy = {
  avg?: Maybe<UsersAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<UsersMaxOrderBy>;
  min?: Maybe<UsersMinOrderBy>;
  stddev?: Maybe<UsersStddevOrderBy>;
  stddev_pop?: Maybe<UsersStddevPopOrderBy>;
  stddev_samp?: Maybe<UsersStddevSampOrderBy>;
  sum?: Maybe<UsersSumOrderBy>;
  var_pop?: Maybe<UsersVarPopOrderBy>;
  var_samp?: Maybe<UsersVarSampOrderBy>;
  variance?: Maybe<UsersVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "users" */
export type UsersArrRelInsertInput = {
  data: Array<UsersInsertInput>;
  on_conflict?: Maybe<UsersOnConflict>;
};

/** aggregate avg on columns */
export type UsersAvgFields = {
  __typename?: 'users_avg_fields';
  id?: Maybe<Scalars['Float']>;
  organisationId?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "users" */
export type UsersAvgOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type UsersBoolExp = {
  _and?: Maybe<Array<Maybe<UsersBoolExp>>>;
  _not?: Maybe<UsersBoolExp>;
  _or?: Maybe<Array<Maybe<UsersBoolExp>>>;
  archives?: Maybe<ArticlesBoolExp>;
  articles_user_activities?: Maybe<ArticlesUserActivityBoolExp>;
  createdAt?: Maybe<TimestamptzComparisonExp>;
  editor_activities?: Maybe<UserActivitiesBoolExp>;
  email?: Maybe<StringComparisonExp>;
  hasuraUserId?: Maybe<StringComparisonExp>;
  id?: Maybe<IntComparisonExp>;
  image?: Maybe<StringComparisonExp>;
  lastSignedInAt?: Maybe<TimestamptzComparisonExp>;
  name?: Maybe<StringComparisonExp>;
  organisation?: Maybe<OrganisationsBoolExp>;
  organisationId?: Maybe<IntComparisonExp>;
  permissions?: Maybe<PermissionsBoolExp>;
  updatedAt?: Maybe<TimestamptzComparisonExp>;
  userOrganisations?: Maybe<UserOrganisationBoolExp>;
};

/** unique or primary key constraints on table "users" */
export enum UsersConstraint {
  /** unique or primary key constraint */
  UsersHasuraUserIdKey = 'users_hasura_user_id_key',
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey'
}

/** input type for incrementing integer column in table "users" */
export type UsersIncInput = {
  id?: Maybe<Scalars['Int']>;
  organisationId?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "users" */
export type UsersInsertInput = {
  archives?: Maybe<ArticlesObjRelInsertInput>;
  articles_user_activities?: Maybe<ArticlesUserActivityArrRelInsertInput>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  editor_activities?: Maybe<UserActivitiesArrRelInsertInput>;
  email?: Maybe<Scalars['String']>;
  hasuraUserId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  lastSignedInAt?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  organisation?: Maybe<OrganisationsObjRelInsertInput>;
  organisationId?: Maybe<Scalars['Int']>;
  permissions?: Maybe<PermissionsArrRelInsertInput>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userOrganisations?: Maybe<UserOrganisationArrRelInsertInput>;
};

/** aggregate max on columns */
export type UsersMaxFields = {
  __typename?: 'users_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  hasuraUserId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  lastSignedInAt?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  organisationId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "users" */
export type UsersMaxOrderBy = {
  createdAt?: Maybe<OrderBy>;
  email?: Maybe<OrderBy>;
  hasuraUserId?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  image?: Maybe<OrderBy>;
  lastSignedInAt?: Maybe<OrderBy>;
  name?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
  updatedAt?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type UsersMinFields = {
  __typename?: 'users_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  hasuraUserId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  lastSignedInAt?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  organisationId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "users" */
export type UsersMinOrderBy = {
  createdAt?: Maybe<OrderBy>;
  email?: Maybe<OrderBy>;
  hasuraUserId?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  image?: Maybe<OrderBy>;
  lastSignedInAt?: Maybe<OrderBy>;
  name?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
  updatedAt?: Maybe<OrderBy>;
};

/** response of any mutation on the table "users" */
export type UsersMutationResponse = {
  __typename?: 'users_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type UsersObjRelInsertInput = {
  data: UsersInsertInput;
  on_conflict?: Maybe<UsersOnConflict>;
};

/** on conflict condition type for table "users" */
export type UsersOnConflict = {
  constraint: UsersConstraint;
  update_columns: Array<UsersUpdateColumn>;
  where?: Maybe<UsersBoolExp>;
};

/** ordering options when selecting data from "users" */
export type UsersOrderBy = {
  archives?: Maybe<ArticlesOrderBy>;
  articles_user_activities_aggregate?: Maybe<ArticlesUserActivityAggregateOrderBy>;
  createdAt?: Maybe<OrderBy>;
  editor_activities_aggregate?: Maybe<UserActivitiesAggregateOrderBy>;
  email?: Maybe<OrderBy>;
  hasuraUserId?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  image?: Maybe<OrderBy>;
  lastSignedInAt?: Maybe<OrderBy>;
  name?: Maybe<OrderBy>;
  organisation?: Maybe<OrganisationsOrderBy>;
  organisationId?: Maybe<OrderBy>;
  permissions_aggregate?: Maybe<PermissionsAggregateOrderBy>;
  updatedAt?: Maybe<OrderBy>;
  userOrganisations_aggregate?: Maybe<UserOrganisationAggregateOrderBy>;
};

/** primary key columns input for table: "users" */
export type UsersPkColumnsInput = {
  id: Scalars['Int'];
};

/** select columns of table "users" */
export enum UsersSelectColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Email = 'email',
  /** column name */
  HasuraUserId = 'hasuraUserId',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  LastSignedInAt = 'lastSignedInAt',
  /** column name */
  Name = 'name',
  /** column name */
  OrganisationId = 'organisationId',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "users" */
export type UsersSetInput = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  hasuraUserId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  lastSignedInAt?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  organisationId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type UsersStddevFields = {
  __typename?: 'users_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  organisationId?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "users" */
export type UsersStddevOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type UsersStddevPopFields = {
  __typename?: 'users_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  organisationId?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "users" */
export type UsersStddevPopOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type UsersStddevSampFields = {
  __typename?: 'users_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  organisationId?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "users" */
export type UsersStddevSampOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type UsersSumFields = {
  __typename?: 'users_sum_fields';
  id?: Maybe<Scalars['Int']>;
  organisationId?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "users" */
export type UsersSumOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
};

/** update columns of table "users" */
export enum UsersUpdateColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Email = 'email',
  /** column name */
  HasuraUserId = 'hasuraUserId',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  LastSignedInAt = 'lastSignedInAt',
  /** column name */
  Name = 'name',
  /** column name */
  OrganisationId = 'organisationId',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** aggregate var_pop on columns */
export type UsersVarPopFields = {
  __typename?: 'users_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  organisationId?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "users" */
export type UsersVarPopOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type UsersVarSampFields = {
  __typename?: 'users_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  organisationId?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "users" */
export type UsersVarSampOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type UsersVarianceFields = {
  __typename?: 'users_variance_fields';
  id?: Maybe<Scalars['Float']>;
  organisationId?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "users" */
export type UsersVarianceOrderBy = {
  id?: Maybe<OrderBy>;
  organisationId?: Maybe<OrderBy>;
};


export type ArticleFragment = (
  { __typename?: 'articles' }
  & Pick<Articles, 'id' | 'parentId' | 'projectId' | 'title' | 'updatedAt' | 'createdAt' | 'archived' | 'archivedAt' | 'position' | 'path'>
);

export type CreateArticleMutationVariables = Exact<{
  object: ArticlesInsertInput;
}>;


export type CreateArticleMutation = (
  { __typename?: 'mutation_root' }
  & { insert_articles_one?: Maybe<(
    { __typename: 'articles' }
    & { blocks: Array<(
      { __typename?: 'blocks' }
      & BlockFragment
    )> }
    & ArticleFragment
  )> }
);

export type GetArticlesQueryVariables = Exact<{
  projectId: Scalars['Int'];
}>;


export type GetArticlesQuery = (
  { __typename?: 'query_root' }
  & { projects_by_pk?: Maybe<(
    { __typename?: 'projects' }
    & Pick<Projects, 'id'>
    & { articles: Array<(
      { __typename?: 'articles' }
      & ArticleFragment
    )> }
  )> }
);

export type GetArticleOneQueryVariables = Exact<{
  path: Scalars['String'];
}>;


export type GetArticleOneQuery = (
  { __typename?: 'query_root' }
  & { articles: Array<(
    { __typename?: 'articles' }
    & { blocks: Array<(
      { __typename?: 'blocks' }
      & BlockFragment
    )> }
    & ArticleFragment
  )> }
);

export type GetArticlesSubscriptionSubscriptionVariables = Exact<{
  projectId: Scalars['Int'];
}>;


export type GetArticlesSubscriptionSubscription = (
  { __typename?: 'subscription_root' }
  & { projects_by_pk?: Maybe<(
    { __typename?: 'projects' }
    & { articles: Array<(
      { __typename?: 'articles' }
      & ArticleFragment
    )> }
  )> }
);

export type GetArticleOneSubscriptionSubscriptionVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetArticleOneSubscriptionSubscription = (
  { __typename?: 'subscription_root' }
  & { articles: Array<(
    { __typename?: 'articles' }
    & { blocks: Array<(
      { __typename?: 'blocks' }
      & BlockFragment
    )> }
    & ArticleFragment
  )> }
);

export type UpsertArticlesMutationVariables = Exact<{
  objects: Array<ArticlesInsertInput> | ArticlesInsertInput;
}>;


export type UpsertArticlesMutation = (
  { __typename?: 'mutation_root' }
  & { insert_articles?: Maybe<(
    { __typename?: 'articles_mutation_response' }
    & { returning: Array<(
      { __typename?: 'articles' }
      & { blocks: Array<(
        { __typename?: 'blocks' }
        & BlockFragment
      )> }
      & ArticleFragment
    )> }
  )> }
);

export type GetUserActivitySubscriptionVariables = Exact<{
  articleId: Scalars['Int'];
}>;


export type GetUserActivitySubscription = (
  { __typename?: 'subscription_root' }
  & { articles_user_activity: Array<(
    { __typename?: 'articles_user_activity' }
    & Pick<ArticlesUserActivity, 'createdAt'>
    & { user: (
      { __typename?: 'users' }
      & Pick<Users, 'id' | 'name' | 'image'>
    ) }
  )> }
);

export type UpdateUserActivityMutationVariables = Exact<{
  articleId: Scalars['Int'];
  userId: Scalars['Int'];
  now: Scalars['timestamptz'];
}>;


export type UpdateUserActivityMutation = (
  { __typename?: 'mutation_root' }
  & { insert_articles_user_activity_one?: Maybe<(
    { __typename?: 'articles_user_activity' }
    & Pick<ArticlesUserActivity, 'userId' | 'articleId'>
  )> }
);

export type GenerateReadAssetUrlMutationVariables = Exact<{
  key: Scalars['String'];
}>;


export type GenerateReadAssetUrlMutation = (
  { __typename?: 'mutation_root' }
  & { assets_generate_read_url?: Maybe<(
    { __typename?: 'ReadOutput' }
    & Pick<ReadOutput, 'key' | 'url'>
  )> }
);

export type GenerateUploadAssetUrlMutationVariables = Exact<{
  contentType: Scalars['String'];
}>;


export type GenerateUploadAssetUrlMutation = (
  { __typename?: 'mutation_root' }
  & { assets_generate_upload_url?: Maybe<(
    { __typename?: 'ReadOutput' }
    & Pick<ReadOutput, 'key' | 'url'>
  )> }
);

export type BlockFragment = (
  { __typename: 'blocks' }
  & Pick<Blocks, 'id' | 'articleId' | 'parentId' | 'editingUserId' | 'updatedAt' | 'createdAt' | 'payload' | 'type' | 'position'>
);

export type DeleteBlocksMutationVariables = Exact<{
  ids?: Maybe<Array<Scalars['Int']> | Scalars['Int']>;
}>;


export type DeleteBlocksMutation = (
  { __typename?: 'mutation_root' }
  & { delete_blocks?: Maybe<(
    { __typename?: 'blocks_mutation_response' }
    & Pick<BlocksMutationResponse, 'affected_rows'>
  )> }
);

export type UpsertBlocksMutationVariables = Exact<{
  articleId: Scalars['Int'];
  objects: Array<BlocksInsertInput> | BlocksInsertInput;
}>;


export type UpsertBlocksMutation = (
  { __typename?: 'mutation_root' }
  & { delete_blocks?: Maybe<(
    { __typename?: 'blocks_mutation_response' }
    & { returning: Array<(
      { __typename?: 'blocks' }
      & Pick<Blocks, 'id'>
    )> }
  )>, insert_blocks?: Maybe<(
    { __typename?: 'blocks_mutation_response' }
    & { returning: Array<(
      { __typename?: 'blocks' }
      & BlockFragment
    )> }
  )> }
);

export type GetOrganisationOneQueryVariables = Exact<{
  slug: Scalars['String'];
  projectSlug: Scalars['String'];
}>;


export type GetOrganisationOneQuery = (
  { __typename?: 'query_root' }
  & { organisations: Array<(
    { __typename?: 'organisations' }
    & { projects: Array<(
      { __typename?: 'projects' }
      & { articles: Array<(
        { __typename?: 'articles' }
        & ArticleFragment
      )>, archivedArticles: Array<(
        { __typename?: 'articles' }
        & ArticleFragment
      )> }
      & ProjectFragment
    )> }
    & OrganisationFragment
  )> }
);

export type OrganisationFragment = (
  { __typename?: 'organisations' }
  & Pick<Organisations, 'id' | 'name' | 'slug'>
);

export type CreateProjectMutationVariables = Exact<{
  object: ProjectsInsertInput;
}>;


export type CreateProjectMutation = (
  { __typename?: 'mutation_root' }
  & { insert_projects_one?: Maybe<(
    { __typename?: 'projects' }
    & Pick<Projects, 'id'>
  )> }
);

export type GetProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsQuery = (
  { __typename?: 'query_root' }
  & { projects: Array<(
    { __typename?: 'projects' }
    & ProjectFragment
  )> }
);

export type GetProjectOneQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetProjectOneQuery = (
  { __typename?: 'query_root' }
  & { projects: Array<(
    { __typename?: 'projects' }
    & { articles: Array<(
      { __typename?: 'articles' }
      & ArticleFragment
    )>, archivedArticles: Array<(
      { __typename?: 'articles' }
      & ArticleFragment
    )> }
    & ProjectFragment
  )> }
);

export type ProjectFragment = (
  { __typename?: 'projects' }
  & Pick<Projects, 'id' | 'name' | 'image' | 'slug'>
);

export type GetProjectOneSubscriptionSubscriptionVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetProjectOneSubscriptionSubscription = (
  { __typename?: 'subscription_root' }
  & { projects: Array<(
    { __typename?: 'projects' }
    & ProjectFragment
  )> }
);

export type GetUserOneQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetUserOneQuery = (
  { __typename?: 'query_root' }
  & { users_by_pk?: Maybe<(
    { __typename?: 'users' }
    & Pick<Users, 'id' | 'name'>
    & { userOrganisations: Array<(
      { __typename?: 'user_organisation' }
      & { organisation: (
        { __typename?: 'organisations' }
        & { projects: Array<(
          { __typename?: 'projects' }
          & ProjectFragment
        )>, stats: (
          { __typename?: 'user_organisation_aggregate' }
          & { aggregate?: Maybe<(
            { __typename?: 'user_organisation_aggregate_fields' }
            & Pick<UserOrganisationAggregateFields, 'count'>
          )> }
        ) }
        & OrganisationFragment
      ) }
    )> }
  )> }
);

export const ArticleFragmentDoc = gql`
    fragment Article on articles {
  id
  parentId
  projectId
  title
  updatedAt
  createdAt
  archived
  archivedAt
  position
  path
}
    `;
export const BlockFragmentDoc = gql`
    fragment Block on blocks {
  __typename
  id
  articleId
  parentId
  editingUserId
  updatedAt
  createdAt
  payload
  type
  position
}
    `;
export const OrganisationFragmentDoc = gql`
    fragment Organisation on organisations {
  id
  name
  slug
}
    `;
export const ProjectFragmentDoc = gql`
    fragment Project on projects {
  id
  name
  image
  slug
}
    `;
export const CreateArticleDocument = gql`
    mutation CreateArticle($object: articles_insert_input!) {
  insert_articles_one(object: $object) {
    __typename
    ...Article
    blocks {
      ...Block
    }
  }
}
    ${ArticleFragmentDoc}
${BlockFragmentDoc}`;
export type CreateArticleMutationFn = Apollo.MutationFunction<CreateArticleMutation, CreateArticleMutationVariables>;

/**
 * __useCreateArticleMutation__
 *
 * To run a mutation, you first call `useCreateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArticleMutation, { data, loading, error }] = useCreateArticleMutation({
 *   variables: {
 *      object: // value for 'object'
 *   },
 * });
 */
export function useCreateArticleMutation(baseOptions?: Apollo.MutationHookOptions<CreateArticleMutation, CreateArticleMutationVariables>) {
        return Apollo.useMutation<CreateArticleMutation, CreateArticleMutationVariables>(CreateArticleDocument, baseOptions);
      }
export type CreateArticleMutationHookResult = ReturnType<typeof useCreateArticleMutation>;
export type CreateArticleMutationResult = Apollo.MutationResult<CreateArticleMutation>;
export type CreateArticleMutationOptions = Apollo.BaseMutationOptions<CreateArticleMutation, CreateArticleMutationVariables>;
export const GetArticlesDocument = gql`
    query GetArticles($projectId: Int!) {
  projects_by_pk(id: $projectId) {
    id
    articles {
      ...Article
    }
  }
}
    ${ArticleFragmentDoc}`;

/**
 * __useGetArticlesQuery__
 *
 * To run a query within a React component, call `useGetArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticlesQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetArticlesQuery(baseOptions: Apollo.QueryHookOptions<GetArticlesQuery, GetArticlesQueryVariables>) {
        return Apollo.useQuery<GetArticlesQuery, GetArticlesQueryVariables>(GetArticlesDocument, baseOptions);
      }
export function useGetArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetArticlesQuery, GetArticlesQueryVariables>) {
          return Apollo.useLazyQuery<GetArticlesQuery, GetArticlesQueryVariables>(GetArticlesDocument, baseOptions);
        }
export type GetArticlesQueryHookResult = ReturnType<typeof useGetArticlesQuery>;
export type GetArticlesLazyQueryHookResult = ReturnType<typeof useGetArticlesLazyQuery>;
export type GetArticlesQueryResult = Apollo.QueryResult<GetArticlesQuery, GetArticlesQueryVariables>;
export const GetArticleOneDocument = gql`
    query GetArticleOne($path: String!) {
  articles(where: {path: {_eq: $path}}) {
    ...Article
    blocks {
      ...Block
    }
  }
}
    ${ArticleFragmentDoc}
${BlockFragmentDoc}`;

/**
 * __useGetArticleOneQuery__
 *
 * To run a query within a React component, call `useGetArticleOneQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticleOneQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticleOneQuery({
 *   variables: {
 *      path: // value for 'path'
 *   },
 * });
 */
export function useGetArticleOneQuery(baseOptions: Apollo.QueryHookOptions<GetArticleOneQuery, GetArticleOneQueryVariables>) {
        return Apollo.useQuery<GetArticleOneQuery, GetArticleOneQueryVariables>(GetArticleOneDocument, baseOptions);
      }
export function useGetArticleOneLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetArticleOneQuery, GetArticleOneQueryVariables>) {
          return Apollo.useLazyQuery<GetArticleOneQuery, GetArticleOneQueryVariables>(GetArticleOneDocument, baseOptions);
        }
export type GetArticleOneQueryHookResult = ReturnType<typeof useGetArticleOneQuery>;
export type GetArticleOneLazyQueryHookResult = ReturnType<typeof useGetArticleOneLazyQuery>;
export type GetArticleOneQueryResult = Apollo.QueryResult<GetArticleOneQuery, GetArticleOneQueryVariables>;
export const GetArticlesSubscriptionDocument = gql`
    subscription GetArticlesSubscription($projectId: Int!) {
  projects_by_pk(id: $projectId) {
    articles {
      ...Article
    }
  }
}
    ${ArticleFragmentDoc}`;

/**
 * __useGetArticlesSubscriptionSubscription__
 *
 * To run a query within a React component, call `useGetArticlesSubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetArticlesSubscriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticlesSubscriptionSubscription({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetArticlesSubscriptionSubscription(baseOptions: Apollo.SubscriptionHookOptions<GetArticlesSubscriptionSubscription, GetArticlesSubscriptionSubscriptionVariables>) {
        return Apollo.useSubscription<GetArticlesSubscriptionSubscription, GetArticlesSubscriptionSubscriptionVariables>(GetArticlesSubscriptionDocument, baseOptions);
      }
export type GetArticlesSubscriptionSubscriptionHookResult = ReturnType<typeof useGetArticlesSubscriptionSubscription>;
export type GetArticlesSubscriptionSubscriptionResult = Apollo.SubscriptionResult<GetArticlesSubscriptionSubscription>;
export const GetArticleOneSubscriptionDocument = gql`
    subscription GetArticleOneSubscription($slug: String!) {
  articles(where: {slug: {_eq: $slug}}) {
    ...Article
    blocks {
      ...Block
    }
  }
}
    ${ArticleFragmentDoc}
${BlockFragmentDoc}`;

/**
 * __useGetArticleOneSubscriptionSubscription__
 *
 * To run a query within a React component, call `useGetArticleOneSubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetArticleOneSubscriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticleOneSubscriptionSubscription({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetArticleOneSubscriptionSubscription(baseOptions: Apollo.SubscriptionHookOptions<GetArticleOneSubscriptionSubscription, GetArticleOneSubscriptionSubscriptionVariables>) {
        return Apollo.useSubscription<GetArticleOneSubscriptionSubscription, GetArticleOneSubscriptionSubscriptionVariables>(GetArticleOneSubscriptionDocument, baseOptions);
      }
export type GetArticleOneSubscriptionSubscriptionHookResult = ReturnType<typeof useGetArticleOneSubscriptionSubscription>;
export type GetArticleOneSubscriptionSubscriptionResult = Apollo.SubscriptionResult<GetArticleOneSubscriptionSubscription>;
export const UpsertArticlesDocument = gql`
    mutation UpsertArticles($objects: [articles_insert_input!]!) {
  insert_articles(
    objects: $objects
    on_conflict: {constraint: articles_pkey, update_columns: [parentId, projectId, title, archived, archivedAt, position, path]}
  ) {
    returning {
      ...Article
      blocks {
        ...Block
      }
    }
  }
}
    ${ArticleFragmentDoc}
${BlockFragmentDoc}`;
export type UpsertArticlesMutationFn = Apollo.MutationFunction<UpsertArticlesMutation, UpsertArticlesMutationVariables>;

/**
 * __useUpsertArticlesMutation__
 *
 * To run a mutation, you first call `useUpsertArticlesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertArticlesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertArticlesMutation, { data, loading, error }] = useUpsertArticlesMutation({
 *   variables: {
 *      objects: // value for 'objects'
 *   },
 * });
 */
export function useUpsertArticlesMutation(baseOptions?: Apollo.MutationHookOptions<UpsertArticlesMutation, UpsertArticlesMutationVariables>) {
        return Apollo.useMutation<UpsertArticlesMutation, UpsertArticlesMutationVariables>(UpsertArticlesDocument, baseOptions);
      }
export type UpsertArticlesMutationHookResult = ReturnType<typeof useUpsertArticlesMutation>;
export type UpsertArticlesMutationResult = Apollo.MutationResult<UpsertArticlesMutation>;
export type UpsertArticlesMutationOptions = Apollo.BaseMutationOptions<UpsertArticlesMutation, UpsertArticlesMutationVariables>;
export const GetUserActivityDocument = gql`
    subscription getUserActivity($articleId: Int!) {
  articles_user_activity(
    where: {articleId: {_eq: $articleId}}
    order_by: {userId: asc}
  ) {
    createdAt
    user {
      id
      name
      image
    }
  }
}
    `;

/**
 * __useGetUserActivitySubscription__
 *
 * To run a query within a React component, call `useGetUserActivitySubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetUserActivitySubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserActivitySubscription({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useGetUserActivitySubscription(baseOptions: Apollo.SubscriptionHookOptions<GetUserActivitySubscription, GetUserActivitySubscriptionVariables>) {
        return Apollo.useSubscription<GetUserActivitySubscription, GetUserActivitySubscriptionVariables>(GetUserActivityDocument, baseOptions);
      }
export type GetUserActivitySubscriptionHookResult = ReturnType<typeof useGetUserActivitySubscription>;
export type GetUserActivitySubscriptionResult = Apollo.SubscriptionResult<GetUserActivitySubscription>;
export const UpdateUserActivityDocument = gql`
    mutation updateUserActivity($articleId: Int!, $userId: Int!, $now: timestamptz!) {
  insert_articles_user_activity_one(
    object: {articleId: $articleId, userId: $userId, createdAt: $now}
    on_conflict: {constraint: articles_user_activity_pkey, update_columns: [createdAt]}
  ) {
    userId
    articleId
  }
}
    `;
export type UpdateUserActivityMutationFn = Apollo.MutationFunction<UpdateUserActivityMutation, UpdateUserActivityMutationVariables>;

/**
 * __useUpdateUserActivityMutation__
 *
 * To run a mutation, you first call `useUpdateUserActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserActivityMutation, { data, loading, error }] = useUpdateUserActivityMutation({
 *   variables: {
 *      articleId: // value for 'articleId'
 *      userId: // value for 'userId'
 *      now: // value for 'now'
 *   },
 * });
 */
export function useUpdateUserActivityMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserActivityMutation, UpdateUserActivityMutationVariables>) {
        return Apollo.useMutation<UpdateUserActivityMutation, UpdateUserActivityMutationVariables>(UpdateUserActivityDocument, baseOptions);
      }
export type UpdateUserActivityMutationHookResult = ReturnType<typeof useUpdateUserActivityMutation>;
export type UpdateUserActivityMutationResult = Apollo.MutationResult<UpdateUserActivityMutation>;
export type UpdateUserActivityMutationOptions = Apollo.BaseMutationOptions<UpdateUserActivityMutation, UpdateUserActivityMutationVariables>;
export const GenerateReadAssetUrlDocument = gql`
    mutation GenerateReadAssetUrl($key: String!) {
  assets_generate_read_url(key: $key) {
    key
    url
  }
}
    `;
export type GenerateReadAssetUrlMutationFn = Apollo.MutationFunction<GenerateReadAssetUrlMutation, GenerateReadAssetUrlMutationVariables>;

/**
 * __useGenerateReadAssetUrlMutation__
 *
 * To run a mutation, you first call `useGenerateReadAssetUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateReadAssetUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateReadAssetUrlMutation, { data, loading, error }] = useGenerateReadAssetUrlMutation({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useGenerateReadAssetUrlMutation(baseOptions?: Apollo.MutationHookOptions<GenerateReadAssetUrlMutation, GenerateReadAssetUrlMutationVariables>) {
        return Apollo.useMutation<GenerateReadAssetUrlMutation, GenerateReadAssetUrlMutationVariables>(GenerateReadAssetUrlDocument, baseOptions);
      }
export type GenerateReadAssetUrlMutationHookResult = ReturnType<typeof useGenerateReadAssetUrlMutation>;
export type GenerateReadAssetUrlMutationResult = Apollo.MutationResult<GenerateReadAssetUrlMutation>;
export type GenerateReadAssetUrlMutationOptions = Apollo.BaseMutationOptions<GenerateReadAssetUrlMutation, GenerateReadAssetUrlMutationVariables>;
export const GenerateUploadAssetUrlDocument = gql`
    mutation GenerateUploadAssetUrl($contentType: String!) {
  assets_generate_upload_url(contentType: $contentType) {
    key
    url
  }
}
    `;
export type GenerateUploadAssetUrlMutationFn = Apollo.MutationFunction<GenerateUploadAssetUrlMutation, GenerateUploadAssetUrlMutationVariables>;

/**
 * __useGenerateUploadAssetUrlMutation__
 *
 * To run a mutation, you first call `useGenerateUploadAssetUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateUploadAssetUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateUploadAssetUrlMutation, { data, loading, error }] = useGenerateUploadAssetUrlMutation({
 *   variables: {
 *      contentType: // value for 'contentType'
 *   },
 * });
 */
export function useGenerateUploadAssetUrlMutation(baseOptions?: Apollo.MutationHookOptions<GenerateUploadAssetUrlMutation, GenerateUploadAssetUrlMutationVariables>) {
        return Apollo.useMutation<GenerateUploadAssetUrlMutation, GenerateUploadAssetUrlMutationVariables>(GenerateUploadAssetUrlDocument, baseOptions);
      }
export type GenerateUploadAssetUrlMutationHookResult = ReturnType<typeof useGenerateUploadAssetUrlMutation>;
export type GenerateUploadAssetUrlMutationResult = Apollo.MutationResult<GenerateUploadAssetUrlMutation>;
export type GenerateUploadAssetUrlMutationOptions = Apollo.BaseMutationOptions<GenerateUploadAssetUrlMutation, GenerateUploadAssetUrlMutationVariables>;
export const DeleteBlocksDocument = gql`
    mutation DeleteBlocks($ids: [Int!]) {
  delete_blocks(where: {id: {_in: $ids}}) {
    affected_rows
  }
}
    `;
export type DeleteBlocksMutationFn = Apollo.MutationFunction<DeleteBlocksMutation, DeleteBlocksMutationVariables>;

/**
 * __useDeleteBlocksMutation__
 *
 * To run a mutation, you first call `useDeleteBlocksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBlocksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBlocksMutation, { data, loading, error }] = useDeleteBlocksMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteBlocksMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBlocksMutation, DeleteBlocksMutationVariables>) {
        return Apollo.useMutation<DeleteBlocksMutation, DeleteBlocksMutationVariables>(DeleteBlocksDocument, baseOptions);
      }
export type DeleteBlocksMutationHookResult = ReturnType<typeof useDeleteBlocksMutation>;
export type DeleteBlocksMutationResult = Apollo.MutationResult<DeleteBlocksMutation>;
export type DeleteBlocksMutationOptions = Apollo.BaseMutationOptions<DeleteBlocksMutation, DeleteBlocksMutationVariables>;
export const UpsertBlocksDocument = gql`
    mutation UpsertBlocks($articleId: Int!, $objects: [blocks_insert_input!]!) {
  delete_blocks(where: {articleId: {_eq: $articleId}}) {
    returning {
      id
    }
  }
  insert_blocks(
    objects: $objects
    on_conflict: {constraint: blocks_pkey, update_columns: [parentId, payload, articleId, type, editingUserId, position]}
  ) {
    returning {
      ...Block
    }
  }
}
    ${BlockFragmentDoc}`;
export type UpsertBlocksMutationFn = Apollo.MutationFunction<UpsertBlocksMutation, UpsertBlocksMutationVariables>;

/**
 * __useUpsertBlocksMutation__
 *
 * To run a mutation, you first call `useUpsertBlocksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertBlocksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertBlocksMutation, { data, loading, error }] = useUpsertBlocksMutation({
 *   variables: {
 *      articleId: // value for 'articleId'
 *      objects: // value for 'objects'
 *   },
 * });
 */
export function useUpsertBlocksMutation(baseOptions?: Apollo.MutationHookOptions<UpsertBlocksMutation, UpsertBlocksMutationVariables>) {
        return Apollo.useMutation<UpsertBlocksMutation, UpsertBlocksMutationVariables>(UpsertBlocksDocument, baseOptions);
      }
export type UpsertBlocksMutationHookResult = ReturnType<typeof useUpsertBlocksMutation>;
export type UpsertBlocksMutationResult = Apollo.MutationResult<UpsertBlocksMutation>;
export type UpsertBlocksMutationOptions = Apollo.BaseMutationOptions<UpsertBlocksMutation, UpsertBlocksMutationVariables>;
export const GetOrganisationOneDocument = gql`
    query GetOrganisationOne($slug: String!, $projectSlug: String!) {
  organisations(where: {slug: {_eq: $slug}}) {
    ...Organisation
    projects(where: {slug: {_eq: $projectSlug}}) {
      ...Project
      articles: articles(where: {archived: {_eq: false}}) {
        ...Article
      }
      archivedArticles: articles(where: {archived: {_eq: true}}) {
        ...Article
      }
    }
  }
}
    ${OrganisationFragmentDoc}
${ProjectFragmentDoc}
${ArticleFragmentDoc}`;

/**
 * __useGetOrganisationOneQuery__
 *
 * To run a query within a React component, call `useGetOrganisationOneQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrganisationOneQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrganisationOneQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *      projectSlug: // value for 'projectSlug'
 *   },
 * });
 */
export function useGetOrganisationOneQuery(baseOptions: Apollo.QueryHookOptions<GetOrganisationOneQuery, GetOrganisationOneQueryVariables>) {
        return Apollo.useQuery<GetOrganisationOneQuery, GetOrganisationOneQueryVariables>(GetOrganisationOneDocument, baseOptions);
      }
export function useGetOrganisationOneLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrganisationOneQuery, GetOrganisationOneQueryVariables>) {
          return Apollo.useLazyQuery<GetOrganisationOneQuery, GetOrganisationOneQueryVariables>(GetOrganisationOneDocument, baseOptions);
        }
export type GetOrganisationOneQueryHookResult = ReturnType<typeof useGetOrganisationOneQuery>;
export type GetOrganisationOneLazyQueryHookResult = ReturnType<typeof useGetOrganisationOneLazyQuery>;
export type GetOrganisationOneQueryResult = Apollo.QueryResult<GetOrganisationOneQuery, GetOrganisationOneQueryVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($object: projects_insert_input!) {
  insert_projects_one(object: $object) {
    id
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      object: // value for 'object'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, baseOptions);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const GetProjectsDocument = gql`
    query GetProjects {
  projects {
    ...Project
  }
}
    ${ProjectFragmentDoc}`;

/**
 * __useGetProjectsQuery__
 *
 * To run a query within a React component, call `useGetProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
        return Apollo.useQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, baseOptions);
      }
export function useGetProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
          return Apollo.useLazyQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, baseOptions);
        }
export type GetProjectsQueryHookResult = ReturnType<typeof useGetProjectsQuery>;
export type GetProjectsLazyQueryHookResult = ReturnType<typeof useGetProjectsLazyQuery>;
export type GetProjectsQueryResult = Apollo.QueryResult<GetProjectsQuery, GetProjectsQueryVariables>;
export const GetProjectOneDocument = gql`
    query GetProjectOne($slug: String!) {
  projects(where: {slug: {_eq: $slug}}) {
    ...Project
    articles: articles(where: {archived: {_eq: false}}) {
      ...Article
    }
    archivedArticles: articles(where: {archived: {_eq: true}}) {
      ...Article
    }
  }
}
    ${ProjectFragmentDoc}
${ArticleFragmentDoc}`;

/**
 * __useGetProjectOneQuery__
 *
 * To run a query within a React component, call `useGetProjectOneQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectOneQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectOneQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetProjectOneQuery(baseOptions: Apollo.QueryHookOptions<GetProjectOneQuery, GetProjectOneQueryVariables>) {
        return Apollo.useQuery<GetProjectOneQuery, GetProjectOneQueryVariables>(GetProjectOneDocument, baseOptions);
      }
export function useGetProjectOneLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectOneQuery, GetProjectOneQueryVariables>) {
          return Apollo.useLazyQuery<GetProjectOneQuery, GetProjectOneQueryVariables>(GetProjectOneDocument, baseOptions);
        }
export type GetProjectOneQueryHookResult = ReturnType<typeof useGetProjectOneQuery>;
export type GetProjectOneLazyQueryHookResult = ReturnType<typeof useGetProjectOneLazyQuery>;
export type GetProjectOneQueryResult = Apollo.QueryResult<GetProjectOneQuery, GetProjectOneQueryVariables>;
export const GetProjectOneSubscriptionDocument = gql`
    subscription GetProjectOneSubscription($slug: String!) {
  projects(where: {slug: {_eq: $slug}}) {
    ...Project
  }
}
    ${ProjectFragmentDoc}`;

/**
 * __useGetProjectOneSubscriptionSubscription__
 *
 * To run a query within a React component, call `useGetProjectOneSubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectOneSubscriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectOneSubscriptionSubscription({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetProjectOneSubscriptionSubscription(baseOptions: Apollo.SubscriptionHookOptions<GetProjectOneSubscriptionSubscription, GetProjectOneSubscriptionSubscriptionVariables>) {
        return Apollo.useSubscription<GetProjectOneSubscriptionSubscription, GetProjectOneSubscriptionSubscriptionVariables>(GetProjectOneSubscriptionDocument, baseOptions);
      }
export type GetProjectOneSubscriptionSubscriptionHookResult = ReturnType<typeof useGetProjectOneSubscriptionSubscription>;
export type GetProjectOneSubscriptionSubscriptionResult = Apollo.SubscriptionResult<GetProjectOneSubscriptionSubscription>;
export const GetUserOneDocument = gql`
    query GetUserOne($id: Int!) {
  users_by_pk(id: $id) {
    id
    name
    userOrganisations {
      organisation {
        ...Organisation
        projects {
          ...Project
        }
        stats: userOrganisations_aggregate {
          aggregate {
            count
          }
        }
      }
    }
  }
}
    ${OrganisationFragmentDoc}
${ProjectFragmentDoc}`;

/**
 * __useGetUserOneQuery__
 *
 * To run a query within a React component, call `useGetUserOneQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserOneQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserOneQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserOneQuery(baseOptions: Apollo.QueryHookOptions<GetUserOneQuery, GetUserOneQueryVariables>) {
        return Apollo.useQuery<GetUserOneQuery, GetUserOneQueryVariables>(GetUserOneDocument, baseOptions);
      }
export function useGetUserOneLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserOneQuery, GetUserOneQueryVariables>) {
          return Apollo.useLazyQuery<GetUserOneQuery, GetUserOneQueryVariables>(GetUserOneDocument, baseOptions);
        }
export type GetUserOneQueryHookResult = ReturnType<typeof useGetUserOneQuery>;
export type GetUserOneLazyQueryHookResult = ReturnType<typeof useGetUserOneLazyQuery>;
export type GetUserOneQueryResult = Apollo.QueryResult<GetUserOneQuery, GetUserOneQueryVariables>;
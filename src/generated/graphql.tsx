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
  jsonb: any;
  point: any;
  timestamptz: any;
};

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
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
export type Int_Comparison_Exp = {
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

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
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
  /** An object relationship */
  children?: Maybe<Articles>;
  created_at: Scalars['timestamptz'];
  id: Scalars['Int'];
  parent_id?: Maybe<Scalars['Int']>;
  project_id?: Maybe<Scalars['Int']>;
  slug: Scalars['String'];
  title: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "articles" */
export type Articles_Aggregate = {
  __typename?: 'articles_aggregate';
  aggregate?: Maybe<Articles_Aggregate_Fields>;
  nodes: Array<Articles>;
};

/** aggregate fields of "articles" */
export type Articles_Aggregate_Fields = {
  __typename?: 'articles_aggregate_fields';
  avg?: Maybe<Articles_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Articles_Max_Fields>;
  min?: Maybe<Articles_Min_Fields>;
  stddev?: Maybe<Articles_Stddev_Fields>;
  stddev_pop?: Maybe<Articles_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Articles_Stddev_Samp_Fields>;
  sum?: Maybe<Articles_Sum_Fields>;
  var_pop?: Maybe<Articles_Var_Pop_Fields>;
  var_samp?: Maybe<Articles_Var_Samp_Fields>;
  variance?: Maybe<Articles_Variance_Fields>;
};


/** aggregate fields of "articles" */
export type Articles_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Articles_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "articles" */
export type Articles_Aggregate_Order_By = {
  avg?: Maybe<Articles_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Articles_Max_Order_By>;
  min?: Maybe<Articles_Min_Order_By>;
  stddev?: Maybe<Articles_Stddev_Order_By>;
  stddev_pop?: Maybe<Articles_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Articles_Stddev_Samp_Order_By>;
  sum?: Maybe<Articles_Sum_Order_By>;
  var_pop?: Maybe<Articles_Var_Pop_Order_By>;
  var_samp?: Maybe<Articles_Var_Samp_Order_By>;
  variance?: Maybe<Articles_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "articles" */
export type Articles_Arr_Rel_Insert_Input = {
  data: Array<Articles_Insert_Input>;
  on_conflict?: Maybe<Articles_On_Conflict>;
};

/** aggregate avg on columns */
export type Articles_Avg_Fields = {
  __typename?: 'articles_avg_fields';
  id?: Maybe<Scalars['Float']>;
  parent_id?: Maybe<Scalars['Float']>;
  project_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "articles" */
export type Articles_Avg_Order_By = {
  id?: Maybe<Order_By>;
  parent_id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "articles". All fields are combined with a logical 'AND'. */
export type Articles_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Articles_Bool_Exp>>>;
  _not?: Maybe<Articles_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Articles_Bool_Exp>>>;
  children?: Maybe<Articles_Bool_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  parent_id?: Maybe<Int_Comparison_Exp>;
  project_id?: Maybe<Int_Comparison_Exp>;
  slug?: Maybe<String_Comparison_Exp>;
  title?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "articles" */
export enum Articles_Constraint {
  /** unique or primary key constraint */
  ArticlesPkey = 'articles_pkey',
  /** unique or primary key constraint */
  ArticlesSlugKey = 'articles_slug_key'
}

/** input type for incrementing integer column in table "articles" */
export type Articles_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
  parent_id?: Maybe<Scalars['Int']>;
  project_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "articles" */
export type Articles_Insert_Input = {
  children?: Maybe<Articles_Obj_Rel_Insert_Input>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  parent_id?: Maybe<Scalars['Int']>;
  project_id?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Articles_Max_Fields = {
  __typename?: 'articles_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  parent_id?: Maybe<Scalars['Int']>;
  project_id?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "articles" */
export type Articles_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  parent_id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
  slug?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Articles_Min_Fields = {
  __typename?: 'articles_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  parent_id?: Maybe<Scalars['Int']>;
  project_id?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "articles" */
export type Articles_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  parent_id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
  slug?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "articles" */
export type Articles_Mutation_Response = {
  __typename?: 'articles_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Articles>;
};

/** input type for inserting object relation for remote table "articles" */
export type Articles_Obj_Rel_Insert_Input = {
  data: Articles_Insert_Input;
  on_conflict?: Maybe<Articles_On_Conflict>;
};

/** on conflict condition type for table "articles" */
export type Articles_On_Conflict = {
  constraint: Articles_Constraint;
  update_columns: Array<Articles_Update_Column>;
  where?: Maybe<Articles_Bool_Exp>;
};

/** ordering options when selecting data from "articles" */
export type Articles_Order_By = {
  children?: Maybe<Articles_Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  parent_id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
  slug?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: "articles" */
export type Articles_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "articles" */
export enum Articles_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ParentId = 'parent_id',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  Slug = 'slug',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "articles" */
export type Articles_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  parent_id?: Maybe<Scalars['Int']>;
  project_id?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Articles_Stddev_Fields = {
  __typename?: 'articles_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  parent_id?: Maybe<Scalars['Float']>;
  project_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "articles" */
export type Articles_Stddev_Order_By = {
  id?: Maybe<Order_By>;
  parent_id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Articles_Stddev_Pop_Fields = {
  __typename?: 'articles_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  parent_id?: Maybe<Scalars['Float']>;
  project_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "articles" */
export type Articles_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
  parent_id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Articles_Stddev_Samp_Fields = {
  __typename?: 'articles_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  parent_id?: Maybe<Scalars['Float']>;
  project_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "articles" */
export type Articles_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
  parent_id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Articles_Sum_Fields = {
  __typename?: 'articles_sum_fields';
  id?: Maybe<Scalars['Int']>;
  parent_id?: Maybe<Scalars['Int']>;
  project_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "articles" */
export type Articles_Sum_Order_By = {
  id?: Maybe<Order_By>;
  parent_id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
};

/** update columns of table "articles" */
export enum Articles_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ParentId = 'parent_id',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  Slug = 'slug',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Articles_Var_Pop_Fields = {
  __typename?: 'articles_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  parent_id?: Maybe<Scalars['Float']>;
  project_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "articles" */
export type Articles_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
  parent_id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Articles_Var_Samp_Fields = {
  __typename?: 'articles_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  parent_id?: Maybe<Scalars['Float']>;
  project_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "articles" */
export type Articles_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
  parent_id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Articles_Variance_Fields = {
  __typename?: 'articles_variance_fields';
  id?: Maybe<Scalars['Float']>;
  parent_id?: Maybe<Scalars['Float']>;
  project_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "articles" */
export type Articles_Variance_Order_By = {
  id?: Maybe<Order_By>;
  parent_id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
};

/** columns and relationships of "blocks" */
export type Blocks = {
  __typename?: 'blocks';
  article_id: Scalars['Int'];
  /** An object relationship */
  children?: Maybe<Blocks>;
  created_at: Scalars['timestamptz'];
  id: Scalars['Int'];
  parent_id?: Maybe<Scalars['Int']>;
  payload: Scalars['jsonb'];
  type: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "blocks" */
export type BlocksPayloadArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "blocks" */
export type Blocks_Aggregate = {
  __typename?: 'blocks_aggregate';
  aggregate?: Maybe<Blocks_Aggregate_Fields>;
  nodes: Array<Blocks>;
};

/** aggregate fields of "blocks" */
export type Blocks_Aggregate_Fields = {
  __typename?: 'blocks_aggregate_fields';
  avg?: Maybe<Blocks_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Blocks_Max_Fields>;
  min?: Maybe<Blocks_Min_Fields>;
  stddev?: Maybe<Blocks_Stddev_Fields>;
  stddev_pop?: Maybe<Blocks_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Blocks_Stddev_Samp_Fields>;
  sum?: Maybe<Blocks_Sum_Fields>;
  var_pop?: Maybe<Blocks_Var_Pop_Fields>;
  var_samp?: Maybe<Blocks_Var_Samp_Fields>;
  variance?: Maybe<Blocks_Variance_Fields>;
};


/** aggregate fields of "blocks" */
export type Blocks_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Blocks_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "blocks" */
export type Blocks_Aggregate_Order_By = {
  avg?: Maybe<Blocks_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Blocks_Max_Order_By>;
  min?: Maybe<Blocks_Min_Order_By>;
  stddev?: Maybe<Blocks_Stddev_Order_By>;
  stddev_pop?: Maybe<Blocks_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Blocks_Stddev_Samp_Order_By>;
  sum?: Maybe<Blocks_Sum_Order_By>;
  var_pop?: Maybe<Blocks_Var_Pop_Order_By>;
  var_samp?: Maybe<Blocks_Var_Samp_Order_By>;
  variance?: Maybe<Blocks_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Blocks_Append_Input = {
  payload?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "blocks" */
export type Blocks_Arr_Rel_Insert_Input = {
  data: Array<Blocks_Insert_Input>;
  on_conflict?: Maybe<Blocks_On_Conflict>;
};

/** aggregate avg on columns */
export type Blocks_Avg_Fields = {
  __typename?: 'blocks_avg_fields';
  article_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  parent_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "blocks" */
export type Blocks_Avg_Order_By = {
  article_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  parent_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "blocks". All fields are combined with a logical 'AND'. */
export type Blocks_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Blocks_Bool_Exp>>>;
  _not?: Maybe<Blocks_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Blocks_Bool_Exp>>>;
  article_id?: Maybe<Int_Comparison_Exp>;
  children?: Maybe<Blocks_Bool_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  parent_id?: Maybe<Int_Comparison_Exp>;
  payload?: Maybe<Jsonb_Comparison_Exp>;
  type?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "blocks" */
export enum Blocks_Constraint {
  /** unique or primary key constraint */
  BlocksPkey = 'blocks_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Blocks_Delete_At_Path_Input = {
  payload?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Blocks_Delete_Elem_Input = {
  payload?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Blocks_Delete_Key_Input = {
  payload?: Maybe<Scalars['String']>;
};

/** input type for incrementing integer column in table "blocks" */
export type Blocks_Inc_Input = {
  article_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  parent_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "blocks" */
export type Blocks_Insert_Input = {
  article_id?: Maybe<Scalars['Int']>;
  children?: Maybe<Blocks_Obj_Rel_Insert_Input>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  parent_id?: Maybe<Scalars['Int']>;
  payload?: Maybe<Scalars['jsonb']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Blocks_Max_Fields = {
  __typename?: 'blocks_max_fields';
  article_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  parent_id?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "blocks" */
export type Blocks_Max_Order_By = {
  article_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  parent_id?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Blocks_Min_Fields = {
  __typename?: 'blocks_min_fields';
  article_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  parent_id?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "blocks" */
export type Blocks_Min_Order_By = {
  article_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  parent_id?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "blocks" */
export type Blocks_Mutation_Response = {
  __typename?: 'blocks_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Blocks>;
};

/** input type for inserting object relation for remote table "blocks" */
export type Blocks_Obj_Rel_Insert_Input = {
  data: Blocks_Insert_Input;
  on_conflict?: Maybe<Blocks_On_Conflict>;
};

/** on conflict condition type for table "blocks" */
export type Blocks_On_Conflict = {
  constraint: Blocks_Constraint;
  update_columns: Array<Blocks_Update_Column>;
  where?: Maybe<Blocks_Bool_Exp>;
};

/** ordering options when selecting data from "blocks" */
export type Blocks_Order_By = {
  article_id?: Maybe<Order_By>;
  children?: Maybe<Blocks_Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  parent_id?: Maybe<Order_By>;
  payload?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: "blocks" */
export type Blocks_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Blocks_Prepend_Input = {
  payload?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "blocks" */
export enum Blocks_Select_Column {
  /** column name */
  ArticleId = 'article_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ParentId = 'parent_id',
  /** column name */
  Payload = 'payload',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "blocks" */
export type Blocks_Set_Input = {
  article_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  parent_id?: Maybe<Scalars['Int']>;
  payload?: Maybe<Scalars['jsonb']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Blocks_Stddev_Fields = {
  __typename?: 'blocks_stddev_fields';
  article_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  parent_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "blocks" */
export type Blocks_Stddev_Order_By = {
  article_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  parent_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Blocks_Stddev_Pop_Fields = {
  __typename?: 'blocks_stddev_pop_fields';
  article_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  parent_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "blocks" */
export type Blocks_Stddev_Pop_Order_By = {
  article_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  parent_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Blocks_Stddev_Samp_Fields = {
  __typename?: 'blocks_stddev_samp_fields';
  article_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  parent_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "blocks" */
export type Blocks_Stddev_Samp_Order_By = {
  article_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  parent_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Blocks_Sum_Fields = {
  __typename?: 'blocks_sum_fields';
  article_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  parent_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "blocks" */
export type Blocks_Sum_Order_By = {
  article_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  parent_id?: Maybe<Order_By>;
};

/** update columns of table "blocks" */
export enum Blocks_Update_Column {
  /** column name */
  ArticleId = 'article_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ParentId = 'parent_id',
  /** column name */
  Payload = 'payload',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Blocks_Var_Pop_Fields = {
  __typename?: 'blocks_var_pop_fields';
  article_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  parent_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "blocks" */
export type Blocks_Var_Pop_Order_By = {
  article_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  parent_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Blocks_Var_Samp_Fields = {
  __typename?: 'blocks_var_samp_fields';
  article_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  parent_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "blocks" */
export type Blocks_Var_Samp_Order_By = {
  article_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  parent_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Blocks_Variance_Fields = {
  __typename?: 'blocks_variance_fields';
  article_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  parent_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "blocks" */
export type Blocks_Variance_Order_By = {
  article_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  parent_id?: Maybe<Order_By>;
};

/** columns and relationships of "campaigns" */
export type Campaigns = {
  __typename?: 'campaigns';
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  /** An array relationship */
  segment_campaigns: Array<Segment_Campaigns>;
  /** An aggregated array relationship */
  segment_campaigns_aggregate: Segment_Campaigns_Aggregate;
};


/** columns and relationships of "campaigns" */
export type CampaignsSegment_CampaignsArgs = {
  distinct_on?: Maybe<Array<Segment_Campaigns_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Segment_Campaigns_Order_By>>;
  where?: Maybe<Segment_Campaigns_Bool_Exp>;
};


/** columns and relationships of "campaigns" */
export type CampaignsSegment_Campaigns_AggregateArgs = {
  distinct_on?: Maybe<Array<Segment_Campaigns_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Segment_Campaigns_Order_By>>;
  where?: Maybe<Segment_Campaigns_Bool_Exp>;
};

/** aggregated selection of "campaigns" */
export type Campaigns_Aggregate = {
  __typename?: 'campaigns_aggregate';
  aggregate?: Maybe<Campaigns_Aggregate_Fields>;
  nodes: Array<Campaigns>;
};

/** aggregate fields of "campaigns" */
export type Campaigns_Aggregate_Fields = {
  __typename?: 'campaigns_aggregate_fields';
  avg?: Maybe<Campaigns_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Campaigns_Max_Fields>;
  min?: Maybe<Campaigns_Min_Fields>;
  stddev?: Maybe<Campaigns_Stddev_Fields>;
  stddev_pop?: Maybe<Campaigns_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Campaigns_Stddev_Samp_Fields>;
  sum?: Maybe<Campaigns_Sum_Fields>;
  var_pop?: Maybe<Campaigns_Var_Pop_Fields>;
  var_samp?: Maybe<Campaigns_Var_Samp_Fields>;
  variance?: Maybe<Campaigns_Variance_Fields>;
};


/** aggregate fields of "campaigns" */
export type Campaigns_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Campaigns_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "campaigns" */
export type Campaigns_Aggregate_Order_By = {
  avg?: Maybe<Campaigns_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Campaigns_Max_Order_By>;
  min?: Maybe<Campaigns_Min_Order_By>;
  stddev?: Maybe<Campaigns_Stddev_Order_By>;
  stddev_pop?: Maybe<Campaigns_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Campaigns_Stddev_Samp_Order_By>;
  sum?: Maybe<Campaigns_Sum_Order_By>;
  var_pop?: Maybe<Campaigns_Var_Pop_Order_By>;
  var_samp?: Maybe<Campaigns_Var_Samp_Order_By>;
  variance?: Maybe<Campaigns_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "campaigns" */
export type Campaigns_Arr_Rel_Insert_Input = {
  data: Array<Campaigns_Insert_Input>;
  on_conflict?: Maybe<Campaigns_On_Conflict>;
};

/** aggregate avg on columns */
export type Campaigns_Avg_Fields = {
  __typename?: 'campaigns_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "campaigns" */
export type Campaigns_Avg_Order_By = {
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "campaigns". All fields are combined with a logical 'AND'. */
export type Campaigns_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Campaigns_Bool_Exp>>>;
  _not?: Maybe<Campaigns_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Campaigns_Bool_Exp>>>;
  description?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  segment_campaigns?: Maybe<Segment_Campaigns_Bool_Exp>;
};

/** unique or primary key constraints on table "campaigns" */
export enum Campaigns_Constraint {
  /** unique or primary key constraint */
  CampaignsPkey = 'campaigns_pkey'
}

/** input type for incrementing integer column in table "campaigns" */
export type Campaigns_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "campaigns" */
export type Campaigns_Insert_Input = {
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  segment_campaigns?: Maybe<Segment_Campaigns_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Campaigns_Max_Fields = {
  __typename?: 'campaigns_max_fields';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "campaigns" */
export type Campaigns_Max_Order_By = {
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Campaigns_Min_Fields = {
  __typename?: 'campaigns_min_fields';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "campaigns" */
export type Campaigns_Min_Order_By = {
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** response of any mutation on the table "campaigns" */
export type Campaigns_Mutation_Response = {
  __typename?: 'campaigns_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Campaigns>;
};

/** input type for inserting object relation for remote table "campaigns" */
export type Campaigns_Obj_Rel_Insert_Input = {
  data: Campaigns_Insert_Input;
  on_conflict?: Maybe<Campaigns_On_Conflict>;
};

/** on conflict condition type for table "campaigns" */
export type Campaigns_On_Conflict = {
  constraint: Campaigns_Constraint;
  update_columns: Array<Campaigns_Update_Column>;
  where?: Maybe<Campaigns_Bool_Exp>;
};

/** ordering options when selecting data from "campaigns" */
export type Campaigns_Order_By = {
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  segment_campaigns_aggregate?: Maybe<Segment_Campaigns_Aggregate_Order_By>;
};

/** primary key columns input for table: "campaigns" */
export type Campaigns_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "campaigns" */
export enum Campaigns_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "campaigns" */
export type Campaigns_Set_Input = {
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Campaigns_Stddev_Fields = {
  __typename?: 'campaigns_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "campaigns" */
export type Campaigns_Stddev_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Campaigns_Stddev_Pop_Fields = {
  __typename?: 'campaigns_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "campaigns" */
export type Campaigns_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Campaigns_Stddev_Samp_Fields = {
  __typename?: 'campaigns_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "campaigns" */
export type Campaigns_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Campaigns_Sum_Fields = {
  __typename?: 'campaigns_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "campaigns" */
export type Campaigns_Sum_Order_By = {
  id?: Maybe<Order_By>;
};

/** update columns of table "campaigns" */
export enum Campaigns_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** aggregate var_pop on columns */
export type Campaigns_Var_Pop_Fields = {
  __typename?: 'campaigns_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "campaigns" */
export type Campaigns_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Campaigns_Var_Samp_Fields = {
  __typename?: 'campaigns_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "campaigns" */
export type Campaigns_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Campaigns_Variance_Fields = {
  __typename?: 'campaigns_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "campaigns" */
export type Campaigns_Variance_Order_By = {
  id?: Maybe<Order_By>;
};


/** expression to compare columns of type jsonb. All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
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
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "articles" */
  delete_articles?: Maybe<Articles_Mutation_Response>;
  /** delete single row from the table: "articles" */
  delete_articles_by_pk?: Maybe<Articles>;
  /** delete data from the table: "blocks" */
  delete_blocks?: Maybe<Blocks_Mutation_Response>;
  /** delete single row from the table: "blocks" */
  delete_blocks_by_pk?: Maybe<Blocks>;
  /** delete data from the table: "campaigns" */
  delete_campaigns?: Maybe<Campaigns_Mutation_Response>;
  /** delete single row from the table: "campaigns" */
  delete_campaigns_by_pk?: Maybe<Campaigns>;
  /** delete data from the table: "node_connections" */
  delete_node_connections?: Maybe<Node_Connections_Mutation_Response>;
  /** delete single row from the table: "node_connections" */
  delete_node_connections_by_pk?: Maybe<Node_Connections>;
  /** delete data from the table: "nodes" */
  delete_nodes?: Maybe<Nodes_Mutation_Response>;
  /** delete single row from the table: "nodes" */
  delete_nodes_by_pk?: Maybe<Nodes>;
  /** delete data from the table: "organisations" */
  delete_organisations?: Maybe<Organisations_Mutation_Response>;
  /** delete single row from the table: "organisations" */
  delete_organisations_by_pk?: Maybe<Organisations>;
  /** delete data from the table: "projects" */
  delete_projects?: Maybe<Projects_Mutation_Response>;
  /** delete single row from the table: "projects" */
  delete_projects_by_pk?: Maybe<Projects>;
  /** delete data from the table: "segment_campaigns" */
  delete_segment_campaigns?: Maybe<Segment_Campaigns_Mutation_Response>;
  /** delete single row from the table: "segment_campaigns" */
  delete_segment_campaigns_by_pk?: Maybe<Segment_Campaigns>;
  /** delete data from the table: "segments" */
  delete_segments?: Maybe<Segments_Mutation_Response>;
  /** delete single row from the table: "segments" */
  delete_segments_by_pk?: Maybe<Segments>;
  /** delete data from the table: "user_activities" */
  delete_user_activities?: Maybe<User_Activities_Mutation_Response>;
  /** delete single row from the table: "user_activities" */
  delete_user_activities_by_pk?: Maybe<User_Activities>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** insert data into the table: "articles" */
  insert_articles?: Maybe<Articles_Mutation_Response>;
  /** insert a single row into the table: "articles" */
  insert_articles_one?: Maybe<Articles>;
  /** insert data into the table: "blocks" */
  insert_blocks?: Maybe<Blocks_Mutation_Response>;
  /** insert a single row into the table: "blocks" */
  insert_blocks_one?: Maybe<Blocks>;
  /** insert data into the table: "campaigns" */
  insert_campaigns?: Maybe<Campaigns_Mutation_Response>;
  /** insert a single row into the table: "campaigns" */
  insert_campaigns_one?: Maybe<Campaigns>;
  /** insert data into the table: "node_connections" */
  insert_node_connections?: Maybe<Node_Connections_Mutation_Response>;
  /** insert a single row into the table: "node_connections" */
  insert_node_connections_one?: Maybe<Node_Connections>;
  /** insert data into the table: "nodes" */
  insert_nodes?: Maybe<Nodes_Mutation_Response>;
  /** insert a single row into the table: "nodes" */
  insert_nodes_one?: Maybe<Nodes>;
  /** insert data into the table: "organisations" */
  insert_organisations?: Maybe<Organisations_Mutation_Response>;
  /** insert a single row into the table: "organisations" */
  insert_organisations_one?: Maybe<Organisations>;
  /** insert data into the table: "projects" */
  insert_projects?: Maybe<Projects_Mutation_Response>;
  /** insert a single row into the table: "projects" */
  insert_projects_one?: Maybe<Projects>;
  /** insert data into the table: "segment_campaigns" */
  insert_segment_campaigns?: Maybe<Segment_Campaigns_Mutation_Response>;
  /** insert a single row into the table: "segment_campaigns" */
  insert_segment_campaigns_one?: Maybe<Segment_Campaigns>;
  /** insert data into the table: "segments" */
  insert_segments?: Maybe<Segments_Mutation_Response>;
  /** insert a single row into the table: "segments" */
  insert_segments_one?: Maybe<Segments>;
  /** insert data into the table: "user_activities" */
  insert_user_activities?: Maybe<User_Activities_Mutation_Response>;
  /** insert a single row into the table: "user_activities" */
  insert_user_activities_one?: Maybe<User_Activities>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** update data of the table: "articles" */
  update_articles?: Maybe<Articles_Mutation_Response>;
  /** update single row of the table: "articles" */
  update_articles_by_pk?: Maybe<Articles>;
  /** update data of the table: "blocks" */
  update_blocks?: Maybe<Blocks_Mutation_Response>;
  /** update single row of the table: "blocks" */
  update_blocks_by_pk?: Maybe<Blocks>;
  /** update data of the table: "campaigns" */
  update_campaigns?: Maybe<Campaigns_Mutation_Response>;
  /** update single row of the table: "campaigns" */
  update_campaigns_by_pk?: Maybe<Campaigns>;
  /** update data of the table: "node_connections" */
  update_node_connections?: Maybe<Node_Connections_Mutation_Response>;
  /** update single row of the table: "node_connections" */
  update_node_connections_by_pk?: Maybe<Node_Connections>;
  /** update data of the table: "nodes" */
  update_nodes?: Maybe<Nodes_Mutation_Response>;
  /** update single row of the table: "nodes" */
  update_nodes_by_pk?: Maybe<Nodes>;
  /** update data of the table: "organisations" */
  update_organisations?: Maybe<Organisations_Mutation_Response>;
  /** update single row of the table: "organisations" */
  update_organisations_by_pk?: Maybe<Organisations>;
  /** update data of the table: "projects" */
  update_projects?: Maybe<Projects_Mutation_Response>;
  /** update single row of the table: "projects" */
  update_projects_by_pk?: Maybe<Projects>;
  /** update data of the table: "segment_campaigns" */
  update_segment_campaigns?: Maybe<Segment_Campaigns_Mutation_Response>;
  /** update single row of the table: "segment_campaigns" */
  update_segment_campaigns_by_pk?: Maybe<Segment_Campaigns>;
  /** update data of the table: "segments" */
  update_segments?: Maybe<Segments_Mutation_Response>;
  /** update single row of the table: "segments" */
  update_segments_by_pk?: Maybe<Segments>;
  /** update data of the table: "user_activities" */
  update_user_activities?: Maybe<User_Activities_Mutation_Response>;
  /** update single row of the table: "user_activities" */
  update_user_activities_by_pk?: Maybe<User_Activities>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
};


/** mutation root */
export type Mutation_RootDelete_ArticlesArgs = {
  where: Articles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Articles_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_BlocksArgs = {
  where: Blocks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Blocks_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_CampaignsArgs = {
  where: Campaigns_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Campaigns_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Node_ConnectionsArgs = {
  where: Node_Connections_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Node_Connections_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_NodesArgs = {
  where: Nodes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Nodes_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_OrganisationsArgs = {
  where: Organisations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Organisations_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_ProjectsArgs = {
  where: Projects_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Projects_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Segment_CampaignsArgs = {
  where: Segment_Campaigns_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Segment_Campaigns_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_SegmentsArgs = {
  where: Segments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Segments_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_User_ActivitiesArgs = {
  where: User_Activities_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Activities_By_PkArgs = {
  segment_id: Scalars['Int'];
  user_id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootInsert_ArticlesArgs = {
  objects: Array<Articles_Insert_Input>;
  on_conflict?: Maybe<Articles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Articles_OneArgs = {
  object: Articles_Insert_Input;
  on_conflict?: Maybe<Articles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_BlocksArgs = {
  objects: Array<Blocks_Insert_Input>;
  on_conflict?: Maybe<Blocks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Blocks_OneArgs = {
  object: Blocks_Insert_Input;
  on_conflict?: Maybe<Blocks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CampaignsArgs = {
  objects: Array<Campaigns_Insert_Input>;
  on_conflict?: Maybe<Campaigns_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Campaigns_OneArgs = {
  object: Campaigns_Insert_Input;
  on_conflict?: Maybe<Campaigns_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Node_ConnectionsArgs = {
  objects: Array<Node_Connections_Insert_Input>;
  on_conflict?: Maybe<Node_Connections_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Node_Connections_OneArgs = {
  object: Node_Connections_Insert_Input;
  on_conflict?: Maybe<Node_Connections_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_NodesArgs = {
  objects: Array<Nodes_Insert_Input>;
  on_conflict?: Maybe<Nodes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Nodes_OneArgs = {
  object: Nodes_Insert_Input;
  on_conflict?: Maybe<Nodes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_OrganisationsArgs = {
  objects: Array<Organisations_Insert_Input>;
  on_conflict?: Maybe<Organisations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Organisations_OneArgs = {
  object: Organisations_Insert_Input;
  on_conflict?: Maybe<Organisations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ProjectsArgs = {
  objects: Array<Projects_Insert_Input>;
  on_conflict?: Maybe<Projects_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Projects_OneArgs = {
  object: Projects_Insert_Input;
  on_conflict?: Maybe<Projects_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Segment_CampaignsArgs = {
  objects: Array<Segment_Campaigns_Insert_Input>;
  on_conflict?: Maybe<Segment_Campaigns_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Segment_Campaigns_OneArgs = {
  object: Segment_Campaigns_Insert_Input;
  on_conflict?: Maybe<Segment_Campaigns_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_SegmentsArgs = {
  objects: Array<Segments_Insert_Input>;
  on_conflict?: Maybe<Segments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Segments_OneArgs = {
  object: Segments_Insert_Input;
  on_conflict?: Maybe<Segments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_ActivitiesArgs = {
  objects: Array<User_Activities_Insert_Input>;
  on_conflict?: Maybe<User_Activities_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Activities_OneArgs = {
  object: User_Activities_Insert_Input;
  on_conflict?: Maybe<User_Activities_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_ArticlesArgs = {
  _inc?: Maybe<Articles_Inc_Input>;
  _set?: Maybe<Articles_Set_Input>;
  where: Articles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Articles_By_PkArgs = {
  _inc?: Maybe<Articles_Inc_Input>;
  _set?: Maybe<Articles_Set_Input>;
  pk_columns: Articles_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_BlocksArgs = {
  _append?: Maybe<Blocks_Append_Input>;
  _delete_at_path?: Maybe<Blocks_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Blocks_Delete_Elem_Input>;
  _delete_key?: Maybe<Blocks_Delete_Key_Input>;
  _inc?: Maybe<Blocks_Inc_Input>;
  _prepend?: Maybe<Blocks_Prepend_Input>;
  _set?: Maybe<Blocks_Set_Input>;
  where: Blocks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Blocks_By_PkArgs = {
  _append?: Maybe<Blocks_Append_Input>;
  _delete_at_path?: Maybe<Blocks_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Blocks_Delete_Elem_Input>;
  _delete_key?: Maybe<Blocks_Delete_Key_Input>;
  _inc?: Maybe<Blocks_Inc_Input>;
  _prepend?: Maybe<Blocks_Prepend_Input>;
  _set?: Maybe<Blocks_Set_Input>;
  pk_columns: Blocks_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_CampaignsArgs = {
  _inc?: Maybe<Campaigns_Inc_Input>;
  _set?: Maybe<Campaigns_Set_Input>;
  where: Campaigns_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Campaigns_By_PkArgs = {
  _inc?: Maybe<Campaigns_Inc_Input>;
  _set?: Maybe<Campaigns_Set_Input>;
  pk_columns: Campaigns_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Node_ConnectionsArgs = {
  _inc?: Maybe<Node_Connections_Inc_Input>;
  _set?: Maybe<Node_Connections_Set_Input>;
  where: Node_Connections_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Node_Connections_By_PkArgs = {
  _inc?: Maybe<Node_Connections_Inc_Input>;
  _set?: Maybe<Node_Connections_Set_Input>;
  pk_columns: Node_Connections_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_NodesArgs = {
  _append?: Maybe<Nodes_Append_Input>;
  _delete_at_path?: Maybe<Nodes_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Nodes_Delete_Elem_Input>;
  _delete_key?: Maybe<Nodes_Delete_Key_Input>;
  _inc?: Maybe<Nodes_Inc_Input>;
  _prepend?: Maybe<Nodes_Prepend_Input>;
  _set?: Maybe<Nodes_Set_Input>;
  where: Nodes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Nodes_By_PkArgs = {
  _append?: Maybe<Nodes_Append_Input>;
  _delete_at_path?: Maybe<Nodes_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Nodes_Delete_Elem_Input>;
  _delete_key?: Maybe<Nodes_Delete_Key_Input>;
  _inc?: Maybe<Nodes_Inc_Input>;
  _prepend?: Maybe<Nodes_Prepend_Input>;
  _set?: Maybe<Nodes_Set_Input>;
  pk_columns: Nodes_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_OrganisationsArgs = {
  _inc?: Maybe<Organisations_Inc_Input>;
  _set?: Maybe<Organisations_Set_Input>;
  where: Organisations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Organisations_By_PkArgs = {
  _inc?: Maybe<Organisations_Inc_Input>;
  _set?: Maybe<Organisations_Set_Input>;
  pk_columns: Organisations_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ProjectsArgs = {
  _inc?: Maybe<Projects_Inc_Input>;
  _set?: Maybe<Projects_Set_Input>;
  where: Projects_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Projects_By_PkArgs = {
  _inc?: Maybe<Projects_Inc_Input>;
  _set?: Maybe<Projects_Set_Input>;
  pk_columns: Projects_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Segment_CampaignsArgs = {
  _inc?: Maybe<Segment_Campaigns_Inc_Input>;
  _set?: Maybe<Segment_Campaigns_Set_Input>;
  where: Segment_Campaigns_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Segment_Campaigns_By_PkArgs = {
  _inc?: Maybe<Segment_Campaigns_Inc_Input>;
  _set?: Maybe<Segment_Campaigns_Set_Input>;
  pk_columns: Segment_Campaigns_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_SegmentsArgs = {
  _inc?: Maybe<Segments_Inc_Input>;
  _set?: Maybe<Segments_Set_Input>;
  where: Segments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Segments_By_PkArgs = {
  _inc?: Maybe<Segments_Inc_Input>;
  _set?: Maybe<Segments_Set_Input>;
  pk_columns: Segments_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_ActivitiesArgs = {
  _inc?: Maybe<User_Activities_Inc_Input>;
  _set?: Maybe<User_Activities_Set_Input>;
  where: User_Activities_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Activities_By_PkArgs = {
  _inc?: Maybe<User_Activities_Inc_Input>;
  _set?: Maybe<User_Activities_Set_Input>;
  pk_columns: User_Activities_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _inc?: Maybe<Users_Inc_Input>;
  _set?: Maybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _inc?: Maybe<Users_Inc_Input>;
  _set?: Maybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};

/** columns and relationships of "node_connections" */
export type Node_Connections = {
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
export type Node_Connections_Aggregate = {
  __typename?: 'node_connections_aggregate';
  aggregate?: Maybe<Node_Connections_Aggregate_Fields>;
  nodes: Array<Node_Connections>;
};

/** aggregate fields of "node_connections" */
export type Node_Connections_Aggregate_Fields = {
  __typename?: 'node_connections_aggregate_fields';
  avg?: Maybe<Node_Connections_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Node_Connections_Max_Fields>;
  min?: Maybe<Node_Connections_Min_Fields>;
  stddev?: Maybe<Node_Connections_Stddev_Fields>;
  stddev_pop?: Maybe<Node_Connections_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Node_Connections_Stddev_Samp_Fields>;
  sum?: Maybe<Node_Connections_Sum_Fields>;
  var_pop?: Maybe<Node_Connections_Var_Pop_Fields>;
  var_samp?: Maybe<Node_Connections_Var_Samp_Fields>;
  variance?: Maybe<Node_Connections_Variance_Fields>;
};


/** aggregate fields of "node_connections" */
export type Node_Connections_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Node_Connections_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "node_connections" */
export type Node_Connections_Aggregate_Order_By = {
  avg?: Maybe<Node_Connections_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Node_Connections_Max_Order_By>;
  min?: Maybe<Node_Connections_Min_Order_By>;
  stddev?: Maybe<Node_Connections_Stddev_Order_By>;
  stddev_pop?: Maybe<Node_Connections_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Node_Connections_Stddev_Samp_Order_By>;
  sum?: Maybe<Node_Connections_Sum_Order_By>;
  var_pop?: Maybe<Node_Connections_Var_Pop_Order_By>;
  var_samp?: Maybe<Node_Connections_Var_Samp_Order_By>;
  variance?: Maybe<Node_Connections_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "node_connections" */
export type Node_Connections_Arr_Rel_Insert_Input = {
  data: Array<Node_Connections_Insert_Input>;
  on_conflict?: Maybe<Node_Connections_On_Conflict>;
};

/** aggregate avg on columns */
export type Node_Connections_Avg_Fields = {
  __typename?: 'node_connections_avg_fields';
  id?: Maybe<Scalars['Float']>;
  node_in_id?: Maybe<Scalars['Float']>;
  node_out_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "node_connections" */
export type Node_Connections_Avg_Order_By = {
  id?: Maybe<Order_By>;
  node_in_id?: Maybe<Order_By>;
  node_out_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "node_connections". All fields are combined with a logical 'AND'. */
export type Node_Connections_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Node_Connections_Bool_Exp>>>;
  _not?: Maybe<Node_Connections_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Node_Connections_Bool_Exp>>>;
  id?: Maybe<Int_Comparison_Exp>;
  node?: Maybe<Nodes_Bool_Exp>;
  nodeByNodeOutId?: Maybe<Nodes_Bool_Exp>;
  node_in_id?: Maybe<Int_Comparison_Exp>;
  node_out_id?: Maybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "node_connections" */
export enum Node_Connections_Constraint {
  /** unique or primary key constraint */
  NodeConnectionsPkey = 'node_connections_pkey'
}

/** input type for incrementing integer column in table "node_connections" */
export type Node_Connections_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
  node_in_id?: Maybe<Scalars['Int']>;
  node_out_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "node_connections" */
export type Node_Connections_Insert_Input = {
  id?: Maybe<Scalars['Int']>;
  node?: Maybe<Nodes_Obj_Rel_Insert_Input>;
  nodeByNodeOutId?: Maybe<Nodes_Obj_Rel_Insert_Input>;
  node_in_id?: Maybe<Scalars['Int']>;
  node_out_id?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Node_Connections_Max_Fields = {
  __typename?: 'node_connections_max_fields';
  id?: Maybe<Scalars['Int']>;
  node_in_id?: Maybe<Scalars['Int']>;
  node_out_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "node_connections" */
export type Node_Connections_Max_Order_By = {
  id?: Maybe<Order_By>;
  node_in_id?: Maybe<Order_By>;
  node_out_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Node_Connections_Min_Fields = {
  __typename?: 'node_connections_min_fields';
  id?: Maybe<Scalars['Int']>;
  node_in_id?: Maybe<Scalars['Int']>;
  node_out_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "node_connections" */
export type Node_Connections_Min_Order_By = {
  id?: Maybe<Order_By>;
  node_in_id?: Maybe<Order_By>;
  node_out_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "node_connections" */
export type Node_Connections_Mutation_Response = {
  __typename?: 'node_connections_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Node_Connections>;
};

/** input type for inserting object relation for remote table "node_connections" */
export type Node_Connections_Obj_Rel_Insert_Input = {
  data: Node_Connections_Insert_Input;
  on_conflict?: Maybe<Node_Connections_On_Conflict>;
};

/** on conflict condition type for table "node_connections" */
export type Node_Connections_On_Conflict = {
  constraint: Node_Connections_Constraint;
  update_columns: Array<Node_Connections_Update_Column>;
  where?: Maybe<Node_Connections_Bool_Exp>;
};

/** ordering options when selecting data from "node_connections" */
export type Node_Connections_Order_By = {
  id?: Maybe<Order_By>;
  node?: Maybe<Nodes_Order_By>;
  nodeByNodeOutId?: Maybe<Nodes_Order_By>;
  node_in_id?: Maybe<Order_By>;
  node_out_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "node_connections" */
export type Node_Connections_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "node_connections" */
export enum Node_Connections_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  NodeInId = 'node_in_id',
  /** column name */
  NodeOutId = 'node_out_id'
}

/** input type for updating data in table "node_connections" */
export type Node_Connections_Set_Input = {
  id?: Maybe<Scalars['Int']>;
  node_in_id?: Maybe<Scalars['Int']>;
  node_out_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Node_Connections_Stddev_Fields = {
  __typename?: 'node_connections_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  node_in_id?: Maybe<Scalars['Float']>;
  node_out_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "node_connections" */
export type Node_Connections_Stddev_Order_By = {
  id?: Maybe<Order_By>;
  node_in_id?: Maybe<Order_By>;
  node_out_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Node_Connections_Stddev_Pop_Fields = {
  __typename?: 'node_connections_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  node_in_id?: Maybe<Scalars['Float']>;
  node_out_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "node_connections" */
export type Node_Connections_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
  node_in_id?: Maybe<Order_By>;
  node_out_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Node_Connections_Stddev_Samp_Fields = {
  __typename?: 'node_connections_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  node_in_id?: Maybe<Scalars['Float']>;
  node_out_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "node_connections" */
export type Node_Connections_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
  node_in_id?: Maybe<Order_By>;
  node_out_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Node_Connections_Sum_Fields = {
  __typename?: 'node_connections_sum_fields';
  id?: Maybe<Scalars['Int']>;
  node_in_id?: Maybe<Scalars['Int']>;
  node_out_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "node_connections" */
export type Node_Connections_Sum_Order_By = {
  id?: Maybe<Order_By>;
  node_in_id?: Maybe<Order_By>;
  node_out_id?: Maybe<Order_By>;
};

/** update columns of table "node_connections" */
export enum Node_Connections_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  NodeInId = 'node_in_id',
  /** column name */
  NodeOutId = 'node_out_id'
}

/** aggregate var_pop on columns */
export type Node_Connections_Var_Pop_Fields = {
  __typename?: 'node_connections_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  node_in_id?: Maybe<Scalars['Float']>;
  node_out_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "node_connections" */
export type Node_Connections_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
  node_in_id?: Maybe<Order_By>;
  node_out_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Node_Connections_Var_Samp_Fields = {
  __typename?: 'node_connections_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  node_in_id?: Maybe<Scalars['Float']>;
  node_out_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "node_connections" */
export type Node_Connections_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
  node_in_id?: Maybe<Order_By>;
  node_out_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Node_Connections_Variance_Fields = {
  __typename?: 'node_connections_variance_fields';
  id?: Maybe<Scalars['Float']>;
  node_in_id?: Maybe<Scalars['Float']>;
  node_out_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "node_connections" */
export type Node_Connections_Variance_Order_By = {
  id?: Maybe<Order_By>;
  node_in_id?: Maybe<Order_By>;
  node_out_id?: Maybe<Order_By>;
};

/** columns and relationships of "nodes" */
export type Nodes = {
  __typename?: 'nodes';
  enabled: Scalars['Boolean'];
  id: Scalars['Int'];
  /** An array relationship */
  nodeConnectionsByNodeOutId: Array<Node_Connections>;
  /** An aggregated array relationship */
  nodeConnectionsByNodeOutId_aggregate: Node_Connections_Aggregate;
  /** An array relationship */
  node_connections: Array<Node_Connections>;
  /** An aggregated array relationship */
  node_connections_aggregate: Node_Connections_Aggregate;
  payload: Scalars['jsonb'];
  position: Scalars['point'];
  type: Scalars['Int'];
};


/** columns and relationships of "nodes" */
export type NodesNodeConnectionsByNodeOutIdArgs = {
  distinct_on?: Maybe<Array<Node_Connections_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Node_Connections_Order_By>>;
  where?: Maybe<Node_Connections_Bool_Exp>;
};


/** columns and relationships of "nodes" */
export type NodesNodeConnectionsByNodeOutId_AggregateArgs = {
  distinct_on?: Maybe<Array<Node_Connections_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Node_Connections_Order_By>>;
  where?: Maybe<Node_Connections_Bool_Exp>;
};


/** columns and relationships of "nodes" */
export type NodesNode_ConnectionsArgs = {
  distinct_on?: Maybe<Array<Node_Connections_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Node_Connections_Order_By>>;
  where?: Maybe<Node_Connections_Bool_Exp>;
};


/** columns and relationships of "nodes" */
export type NodesNode_Connections_AggregateArgs = {
  distinct_on?: Maybe<Array<Node_Connections_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Node_Connections_Order_By>>;
  where?: Maybe<Node_Connections_Bool_Exp>;
};


/** columns and relationships of "nodes" */
export type NodesPayloadArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "nodes" */
export type Nodes_Aggregate = {
  __typename?: 'nodes_aggregate';
  aggregate?: Maybe<Nodes_Aggregate_Fields>;
  nodes: Array<Nodes>;
};

/** aggregate fields of "nodes" */
export type Nodes_Aggregate_Fields = {
  __typename?: 'nodes_aggregate_fields';
  avg?: Maybe<Nodes_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Nodes_Max_Fields>;
  min?: Maybe<Nodes_Min_Fields>;
  stddev?: Maybe<Nodes_Stddev_Fields>;
  stddev_pop?: Maybe<Nodes_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Nodes_Stddev_Samp_Fields>;
  sum?: Maybe<Nodes_Sum_Fields>;
  var_pop?: Maybe<Nodes_Var_Pop_Fields>;
  var_samp?: Maybe<Nodes_Var_Samp_Fields>;
  variance?: Maybe<Nodes_Variance_Fields>;
};


/** aggregate fields of "nodes" */
export type Nodes_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Nodes_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "nodes" */
export type Nodes_Aggregate_Order_By = {
  avg?: Maybe<Nodes_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Nodes_Max_Order_By>;
  min?: Maybe<Nodes_Min_Order_By>;
  stddev?: Maybe<Nodes_Stddev_Order_By>;
  stddev_pop?: Maybe<Nodes_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Nodes_Stddev_Samp_Order_By>;
  sum?: Maybe<Nodes_Sum_Order_By>;
  var_pop?: Maybe<Nodes_Var_Pop_Order_By>;
  var_samp?: Maybe<Nodes_Var_Samp_Order_By>;
  variance?: Maybe<Nodes_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Nodes_Append_Input = {
  payload?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "nodes" */
export type Nodes_Arr_Rel_Insert_Input = {
  data: Array<Nodes_Insert_Input>;
  on_conflict?: Maybe<Nodes_On_Conflict>;
};

/** aggregate avg on columns */
export type Nodes_Avg_Fields = {
  __typename?: 'nodes_avg_fields';
  id?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "nodes" */
export type Nodes_Avg_Order_By = {
  id?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "nodes". All fields are combined with a logical 'AND'. */
export type Nodes_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Nodes_Bool_Exp>>>;
  _not?: Maybe<Nodes_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Nodes_Bool_Exp>>>;
  enabled?: Maybe<Boolean_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  nodeConnectionsByNodeOutId?: Maybe<Node_Connections_Bool_Exp>;
  node_connections?: Maybe<Node_Connections_Bool_Exp>;
  payload?: Maybe<Jsonb_Comparison_Exp>;
  position?: Maybe<Point_Comparison_Exp>;
  type?: Maybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "nodes" */
export enum Nodes_Constraint {
  /** unique or primary key constraint */
  NodesPkey = 'nodes_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Nodes_Delete_At_Path_Input = {
  payload?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Nodes_Delete_Elem_Input = {
  payload?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Nodes_Delete_Key_Input = {
  payload?: Maybe<Scalars['String']>;
};

/** input type for incrementing integer column in table "nodes" */
export type Nodes_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "nodes" */
export type Nodes_Insert_Input = {
  enabled?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['Int']>;
  nodeConnectionsByNodeOutId?: Maybe<Node_Connections_Arr_Rel_Insert_Input>;
  node_connections?: Maybe<Node_Connections_Arr_Rel_Insert_Input>;
  payload?: Maybe<Scalars['jsonb']>;
  position?: Maybe<Scalars['point']>;
  type?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Nodes_Max_Fields = {
  __typename?: 'nodes_max_fields';
  id?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "nodes" */
export type Nodes_Max_Order_By = {
  id?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Nodes_Min_Fields = {
  __typename?: 'nodes_min_fields';
  id?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "nodes" */
export type Nodes_Min_Order_By = {
  id?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
};

/** response of any mutation on the table "nodes" */
export type Nodes_Mutation_Response = {
  __typename?: 'nodes_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Nodes>;
};

/** input type for inserting object relation for remote table "nodes" */
export type Nodes_Obj_Rel_Insert_Input = {
  data: Nodes_Insert_Input;
  on_conflict?: Maybe<Nodes_On_Conflict>;
};

/** on conflict condition type for table "nodes" */
export type Nodes_On_Conflict = {
  constraint: Nodes_Constraint;
  update_columns: Array<Nodes_Update_Column>;
  where?: Maybe<Nodes_Bool_Exp>;
};

/** ordering options when selecting data from "nodes" */
export type Nodes_Order_By = {
  enabled?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  nodeConnectionsByNodeOutId_aggregate?: Maybe<Node_Connections_Aggregate_Order_By>;
  node_connections_aggregate?: Maybe<Node_Connections_Aggregate_Order_By>;
  payload?: Maybe<Order_By>;
  position?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
};

/** primary key columns input for table: "nodes" */
export type Nodes_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Nodes_Prepend_Input = {
  payload?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "nodes" */
export enum Nodes_Select_Column {
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
export type Nodes_Set_Input = {
  enabled?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['Int']>;
  payload?: Maybe<Scalars['jsonb']>;
  position?: Maybe<Scalars['point']>;
  type?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Nodes_Stddev_Fields = {
  __typename?: 'nodes_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "nodes" */
export type Nodes_Stddev_Order_By = {
  id?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Nodes_Stddev_Pop_Fields = {
  __typename?: 'nodes_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "nodes" */
export type Nodes_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Nodes_Stddev_Samp_Fields = {
  __typename?: 'nodes_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "nodes" */
export type Nodes_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Nodes_Sum_Fields = {
  __typename?: 'nodes_sum_fields';
  id?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "nodes" */
export type Nodes_Sum_Order_By = {
  id?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
};

/** update columns of table "nodes" */
export enum Nodes_Update_Column {
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
export type Nodes_Var_Pop_Fields = {
  __typename?: 'nodes_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "nodes" */
export type Nodes_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Nodes_Var_Samp_Fields = {
  __typename?: 'nodes_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "nodes" */
export type Nodes_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Nodes_Variance_Fields = {
  __typename?: 'nodes_variance_fields';
  id?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "nodes" */
export type Nodes_Variance_Order_By = {
  id?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
};

/** column ordering options */
export enum Order_By {
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
};

/** aggregated selection of "organisations" */
export type Organisations_Aggregate = {
  __typename?: 'organisations_aggregate';
  aggregate?: Maybe<Organisations_Aggregate_Fields>;
  nodes: Array<Organisations>;
};

/** aggregate fields of "organisations" */
export type Organisations_Aggregate_Fields = {
  __typename?: 'organisations_aggregate_fields';
  avg?: Maybe<Organisations_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Organisations_Max_Fields>;
  min?: Maybe<Organisations_Min_Fields>;
  stddev?: Maybe<Organisations_Stddev_Fields>;
  stddev_pop?: Maybe<Organisations_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Organisations_Stddev_Samp_Fields>;
  sum?: Maybe<Organisations_Sum_Fields>;
  var_pop?: Maybe<Organisations_Var_Pop_Fields>;
  var_samp?: Maybe<Organisations_Var_Samp_Fields>;
  variance?: Maybe<Organisations_Variance_Fields>;
};


/** aggregate fields of "organisations" */
export type Organisations_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Organisations_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "organisations" */
export type Organisations_Aggregate_Order_By = {
  avg?: Maybe<Organisations_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Organisations_Max_Order_By>;
  min?: Maybe<Organisations_Min_Order_By>;
  stddev?: Maybe<Organisations_Stddev_Order_By>;
  stddev_pop?: Maybe<Organisations_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Organisations_Stddev_Samp_Order_By>;
  sum?: Maybe<Organisations_Sum_Order_By>;
  var_pop?: Maybe<Organisations_Var_Pop_Order_By>;
  var_samp?: Maybe<Organisations_Var_Samp_Order_By>;
  variance?: Maybe<Organisations_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "organisations" */
export type Organisations_Arr_Rel_Insert_Input = {
  data: Array<Organisations_Insert_Input>;
  on_conflict?: Maybe<Organisations_On_Conflict>;
};

/** aggregate avg on columns */
export type Organisations_Avg_Fields = {
  __typename?: 'organisations_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "organisations" */
export type Organisations_Avg_Order_By = {
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "organisations". All fields are combined with a logical 'AND'. */
export type Organisations_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Organisations_Bool_Exp>>>;
  _not?: Maybe<Organisations_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Organisations_Bool_Exp>>>;
  id?: Maybe<Int_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "organisations" */
export enum Organisations_Constraint {
  /** unique or primary key constraint */
  OrganisationsPkey1 = 'organisations_pkey1'
}

/** input type for incrementing integer column in table "organisations" */
export type Organisations_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "organisations" */
export type Organisations_Insert_Input = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Organisations_Max_Fields = {
  __typename?: 'organisations_max_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "organisations" */
export type Organisations_Max_Order_By = {
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Organisations_Min_Fields = {
  __typename?: 'organisations_min_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "organisations" */
export type Organisations_Min_Order_By = {
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** response of any mutation on the table "organisations" */
export type Organisations_Mutation_Response = {
  __typename?: 'organisations_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Organisations>;
};

/** input type for inserting object relation for remote table "organisations" */
export type Organisations_Obj_Rel_Insert_Input = {
  data: Organisations_Insert_Input;
  on_conflict?: Maybe<Organisations_On_Conflict>;
};

/** on conflict condition type for table "organisations" */
export type Organisations_On_Conflict = {
  constraint: Organisations_Constraint;
  update_columns: Array<Organisations_Update_Column>;
  where?: Maybe<Organisations_Bool_Exp>;
};

/** ordering options when selecting data from "organisations" */
export type Organisations_Order_By = {
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** primary key columns input for table: "organisations" */
export type Organisations_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "organisations" */
export enum Organisations_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "organisations" */
export type Organisations_Set_Input = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Organisations_Stddev_Fields = {
  __typename?: 'organisations_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "organisations" */
export type Organisations_Stddev_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Organisations_Stddev_Pop_Fields = {
  __typename?: 'organisations_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "organisations" */
export type Organisations_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Organisations_Stddev_Samp_Fields = {
  __typename?: 'organisations_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "organisations" */
export type Organisations_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Organisations_Sum_Fields = {
  __typename?: 'organisations_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "organisations" */
export type Organisations_Sum_Order_By = {
  id?: Maybe<Order_By>;
};

/** update columns of table "organisations" */
export enum Organisations_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** aggregate var_pop on columns */
export type Organisations_Var_Pop_Fields = {
  __typename?: 'organisations_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "organisations" */
export type Organisations_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Organisations_Var_Samp_Fields = {
  __typename?: 'organisations_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "organisations" */
export type Organisations_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Organisations_Variance_Fields = {
  __typename?: 'organisations_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "organisations" */
export type Organisations_Variance_Order_By = {
  id?: Maybe<Order_By>;
};


/** expression to compare columns of type point. All fields are combined with logical 'AND'. */
export type Point_Comparison_Exp = {
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
  articles_aggregate: Articles_Aggregate;
  id: Scalars['Int'];
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  /** An object relationship */
  organisation?: Maybe<Organisations>;
  organisation_id?: Maybe<Scalars['Int']>;
  /** An array relationship */
  segments: Array<Segments>;
  /** An aggregated array relationship */
  segments_aggregate: Segments_Aggregate;
  slug: Scalars['String'];
};


/** columns and relationships of "projects" */
export type ProjectsArticlesArgs = {
  distinct_on?: Maybe<Array<Articles_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Articles_Order_By>>;
  where?: Maybe<Articles_Bool_Exp>;
};


/** columns and relationships of "projects" */
export type ProjectsArticles_AggregateArgs = {
  distinct_on?: Maybe<Array<Articles_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Articles_Order_By>>;
  where?: Maybe<Articles_Bool_Exp>;
};


/** columns and relationships of "projects" */
export type ProjectsSegmentsArgs = {
  distinct_on?: Maybe<Array<Segments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Segments_Order_By>>;
  where?: Maybe<Segments_Bool_Exp>;
};


/** columns and relationships of "projects" */
export type ProjectsSegments_AggregateArgs = {
  distinct_on?: Maybe<Array<Segments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Segments_Order_By>>;
  where?: Maybe<Segments_Bool_Exp>;
};

/** aggregated selection of "projects" */
export type Projects_Aggregate = {
  __typename?: 'projects_aggregate';
  aggregate?: Maybe<Projects_Aggregate_Fields>;
  nodes: Array<Projects>;
};

/** aggregate fields of "projects" */
export type Projects_Aggregate_Fields = {
  __typename?: 'projects_aggregate_fields';
  avg?: Maybe<Projects_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Projects_Max_Fields>;
  min?: Maybe<Projects_Min_Fields>;
  stddev?: Maybe<Projects_Stddev_Fields>;
  stddev_pop?: Maybe<Projects_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Projects_Stddev_Samp_Fields>;
  sum?: Maybe<Projects_Sum_Fields>;
  var_pop?: Maybe<Projects_Var_Pop_Fields>;
  var_samp?: Maybe<Projects_Var_Samp_Fields>;
  variance?: Maybe<Projects_Variance_Fields>;
};


/** aggregate fields of "projects" */
export type Projects_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Projects_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "projects" */
export type Projects_Aggregate_Order_By = {
  avg?: Maybe<Projects_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Projects_Max_Order_By>;
  min?: Maybe<Projects_Min_Order_By>;
  stddev?: Maybe<Projects_Stddev_Order_By>;
  stddev_pop?: Maybe<Projects_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Projects_Stddev_Samp_Order_By>;
  sum?: Maybe<Projects_Sum_Order_By>;
  var_pop?: Maybe<Projects_Var_Pop_Order_By>;
  var_samp?: Maybe<Projects_Var_Samp_Order_By>;
  variance?: Maybe<Projects_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "projects" */
export type Projects_Arr_Rel_Insert_Input = {
  data: Array<Projects_Insert_Input>;
  on_conflict?: Maybe<Projects_On_Conflict>;
};

/** aggregate avg on columns */
export type Projects_Avg_Fields = {
  __typename?: 'projects_avg_fields';
  id?: Maybe<Scalars['Float']>;
  organisation_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "projects" */
export type Projects_Avg_Order_By = {
  id?: Maybe<Order_By>;
  organisation_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "projects". All fields are combined with a logical 'AND'. */
export type Projects_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Projects_Bool_Exp>>>;
  _not?: Maybe<Projects_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Projects_Bool_Exp>>>;
  articles?: Maybe<Articles_Bool_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  image?: Maybe<String_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  organisation?: Maybe<Organisations_Bool_Exp>;
  organisation_id?: Maybe<Int_Comparison_Exp>;
  segments?: Maybe<Segments_Bool_Exp>;
  slug?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "projects" */
export enum Projects_Constraint {
  /** unique or primary key constraint */
  OrganisationsPkey = 'organisations_pkey'
}

/** input type for incrementing integer column in table "projects" */
export type Projects_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
  organisation_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "projects" */
export type Projects_Insert_Input = {
  articles?: Maybe<Articles_Arr_Rel_Insert_Input>;
  id?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organisation?: Maybe<Organisations_Obj_Rel_Insert_Input>;
  organisation_id?: Maybe<Scalars['Int']>;
  segments?: Maybe<Segments_Arr_Rel_Insert_Input>;
  slug?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Projects_Max_Fields = {
  __typename?: 'projects_max_fields';
  id?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organisation_id?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "projects" */
export type Projects_Max_Order_By = {
  id?: Maybe<Order_By>;
  image?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  organisation_id?: Maybe<Order_By>;
  slug?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Projects_Min_Fields = {
  __typename?: 'projects_min_fields';
  id?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organisation_id?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "projects" */
export type Projects_Min_Order_By = {
  id?: Maybe<Order_By>;
  image?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  organisation_id?: Maybe<Order_By>;
  slug?: Maybe<Order_By>;
};

/** response of any mutation on the table "projects" */
export type Projects_Mutation_Response = {
  __typename?: 'projects_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Projects>;
};

/** input type for inserting object relation for remote table "projects" */
export type Projects_Obj_Rel_Insert_Input = {
  data: Projects_Insert_Input;
  on_conflict?: Maybe<Projects_On_Conflict>;
};

/** on conflict condition type for table "projects" */
export type Projects_On_Conflict = {
  constraint: Projects_Constraint;
  update_columns: Array<Projects_Update_Column>;
  where?: Maybe<Projects_Bool_Exp>;
};

/** ordering options when selecting data from "projects" */
export type Projects_Order_By = {
  articles_aggregate?: Maybe<Articles_Aggregate_Order_By>;
  id?: Maybe<Order_By>;
  image?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  organisation?: Maybe<Organisations_Order_By>;
  organisation_id?: Maybe<Order_By>;
  segments_aggregate?: Maybe<Segments_Aggregate_Order_By>;
  slug?: Maybe<Order_By>;
};

/** primary key columns input for table: "projects" */
export type Projects_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "projects" */
export enum Projects_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Name = 'name',
  /** column name */
  OrganisationId = 'organisation_id',
  /** column name */
  Slug = 'slug'
}

/** input type for updating data in table "projects" */
export type Projects_Set_Input = {
  id?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organisation_id?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Projects_Stddev_Fields = {
  __typename?: 'projects_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  organisation_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "projects" */
export type Projects_Stddev_Order_By = {
  id?: Maybe<Order_By>;
  organisation_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Projects_Stddev_Pop_Fields = {
  __typename?: 'projects_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  organisation_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "projects" */
export type Projects_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
  organisation_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Projects_Stddev_Samp_Fields = {
  __typename?: 'projects_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  organisation_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "projects" */
export type Projects_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
  organisation_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Projects_Sum_Fields = {
  __typename?: 'projects_sum_fields';
  id?: Maybe<Scalars['Int']>;
  organisation_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "projects" */
export type Projects_Sum_Order_By = {
  id?: Maybe<Order_By>;
  organisation_id?: Maybe<Order_By>;
};

/** update columns of table "projects" */
export enum Projects_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Name = 'name',
  /** column name */
  OrganisationId = 'organisation_id',
  /** column name */
  Slug = 'slug'
}

/** aggregate var_pop on columns */
export type Projects_Var_Pop_Fields = {
  __typename?: 'projects_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  organisation_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "projects" */
export type Projects_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
  organisation_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Projects_Var_Samp_Fields = {
  __typename?: 'projects_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  organisation_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "projects" */
export type Projects_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
  organisation_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Projects_Variance_Fields = {
  __typename?: 'projects_variance_fields';
  id?: Maybe<Scalars['Float']>;
  organisation_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "projects" */
export type Projects_Variance_Order_By = {
  id?: Maybe<Order_By>;
  organisation_id?: Maybe<Order_By>;
};

/** query root */
export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "articles" */
  articles: Array<Articles>;
  /** fetch aggregated fields from the table: "articles" */
  articles_aggregate: Articles_Aggregate;
  /** fetch data from the table: "articles" using primary key columns */
  articles_by_pk?: Maybe<Articles>;
  /** fetch data from the table: "blocks" */
  blocks: Array<Blocks>;
  /** fetch aggregated fields from the table: "blocks" */
  blocks_aggregate: Blocks_Aggregate;
  /** fetch data from the table: "blocks" using primary key columns */
  blocks_by_pk?: Maybe<Blocks>;
  /** fetch data from the table: "campaigns" */
  campaigns: Array<Campaigns>;
  /** fetch aggregated fields from the table: "campaigns" */
  campaigns_aggregate: Campaigns_Aggregate;
  /** fetch data from the table: "campaigns" using primary key columns */
  campaigns_by_pk?: Maybe<Campaigns>;
  /** fetch data from the table: "node_connections" */
  node_connections: Array<Node_Connections>;
  /** fetch aggregated fields from the table: "node_connections" */
  node_connections_aggregate: Node_Connections_Aggregate;
  /** fetch data from the table: "node_connections" using primary key columns */
  node_connections_by_pk?: Maybe<Node_Connections>;
  /** fetch data from the table: "nodes" */
  nodes: Array<Nodes>;
  /** fetch aggregated fields from the table: "nodes" */
  nodes_aggregate: Nodes_Aggregate;
  /** fetch data from the table: "nodes" using primary key columns */
  nodes_by_pk?: Maybe<Nodes>;
  /** fetch data from the table: "organisations" */
  organisations: Array<Organisations>;
  /** fetch aggregated fields from the table: "organisations" */
  organisations_aggregate: Organisations_Aggregate;
  /** fetch data from the table: "organisations" using primary key columns */
  organisations_by_pk?: Maybe<Organisations>;
  /** fetch data from the table: "projects" */
  projects: Array<Projects>;
  /** fetch aggregated fields from the table: "projects" */
  projects_aggregate: Projects_Aggregate;
  /** fetch data from the table: "projects" using primary key columns */
  projects_by_pk?: Maybe<Projects>;
  /** fetch data from the table: "segment_campaigns" */
  segment_campaigns: Array<Segment_Campaigns>;
  /** fetch aggregated fields from the table: "segment_campaigns" */
  segment_campaigns_aggregate: Segment_Campaigns_Aggregate;
  /** fetch data from the table: "segment_campaigns" using primary key columns */
  segment_campaigns_by_pk?: Maybe<Segment_Campaigns>;
  /** fetch data from the table: "segments" */
  segments: Array<Segments>;
  /** fetch aggregated fields from the table: "segments" */
  segments_aggregate: Segments_Aggregate;
  /** fetch data from the table: "segments" using primary key columns */
  segments_by_pk?: Maybe<Segments>;
  /** fetch data from the table: "user_activities" */
  user_activities: Array<User_Activities>;
  /** fetch aggregated fields from the table: "user_activities" */
  user_activities_aggregate: User_Activities_Aggregate;
  /** fetch data from the table: "user_activities" using primary key columns */
  user_activities_by_pk?: Maybe<User_Activities>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


/** query root */
export type Query_RootArticlesArgs = {
  distinct_on?: Maybe<Array<Articles_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Articles_Order_By>>;
  where?: Maybe<Articles_Bool_Exp>;
};


/** query root */
export type Query_RootArticles_AggregateArgs = {
  distinct_on?: Maybe<Array<Articles_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Articles_Order_By>>;
  where?: Maybe<Articles_Bool_Exp>;
};


/** query root */
export type Query_RootArticles_By_PkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type Query_RootBlocksArgs = {
  distinct_on?: Maybe<Array<Blocks_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Blocks_Order_By>>;
  where?: Maybe<Blocks_Bool_Exp>;
};


/** query root */
export type Query_RootBlocks_AggregateArgs = {
  distinct_on?: Maybe<Array<Blocks_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Blocks_Order_By>>;
  where?: Maybe<Blocks_Bool_Exp>;
};


/** query root */
export type Query_RootBlocks_By_PkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type Query_RootCampaignsArgs = {
  distinct_on?: Maybe<Array<Campaigns_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Campaigns_Order_By>>;
  where?: Maybe<Campaigns_Bool_Exp>;
};


/** query root */
export type Query_RootCampaigns_AggregateArgs = {
  distinct_on?: Maybe<Array<Campaigns_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Campaigns_Order_By>>;
  where?: Maybe<Campaigns_Bool_Exp>;
};


/** query root */
export type Query_RootCampaigns_By_PkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type Query_RootNode_ConnectionsArgs = {
  distinct_on?: Maybe<Array<Node_Connections_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Node_Connections_Order_By>>;
  where?: Maybe<Node_Connections_Bool_Exp>;
};


/** query root */
export type Query_RootNode_Connections_AggregateArgs = {
  distinct_on?: Maybe<Array<Node_Connections_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Node_Connections_Order_By>>;
  where?: Maybe<Node_Connections_Bool_Exp>;
};


/** query root */
export type Query_RootNode_Connections_By_PkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type Query_RootNodesArgs = {
  distinct_on?: Maybe<Array<Nodes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Nodes_Order_By>>;
  where?: Maybe<Nodes_Bool_Exp>;
};


/** query root */
export type Query_RootNodes_AggregateArgs = {
  distinct_on?: Maybe<Array<Nodes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Nodes_Order_By>>;
  where?: Maybe<Nodes_Bool_Exp>;
};


/** query root */
export type Query_RootNodes_By_PkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type Query_RootOrganisationsArgs = {
  distinct_on?: Maybe<Array<Organisations_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Organisations_Order_By>>;
  where?: Maybe<Organisations_Bool_Exp>;
};


/** query root */
export type Query_RootOrganisations_AggregateArgs = {
  distinct_on?: Maybe<Array<Organisations_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Organisations_Order_By>>;
  where?: Maybe<Organisations_Bool_Exp>;
};


/** query root */
export type Query_RootOrganisations_By_PkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type Query_RootProjectsArgs = {
  distinct_on?: Maybe<Array<Projects_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Projects_Order_By>>;
  where?: Maybe<Projects_Bool_Exp>;
};


/** query root */
export type Query_RootProjects_AggregateArgs = {
  distinct_on?: Maybe<Array<Projects_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Projects_Order_By>>;
  where?: Maybe<Projects_Bool_Exp>;
};


/** query root */
export type Query_RootProjects_By_PkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type Query_RootSegment_CampaignsArgs = {
  distinct_on?: Maybe<Array<Segment_Campaigns_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Segment_Campaigns_Order_By>>;
  where?: Maybe<Segment_Campaigns_Bool_Exp>;
};


/** query root */
export type Query_RootSegment_Campaigns_AggregateArgs = {
  distinct_on?: Maybe<Array<Segment_Campaigns_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Segment_Campaigns_Order_By>>;
  where?: Maybe<Segment_Campaigns_Bool_Exp>;
};


/** query root */
export type Query_RootSegment_Campaigns_By_PkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type Query_RootSegmentsArgs = {
  distinct_on?: Maybe<Array<Segments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Segments_Order_By>>;
  where?: Maybe<Segments_Bool_Exp>;
};


/** query root */
export type Query_RootSegments_AggregateArgs = {
  distinct_on?: Maybe<Array<Segments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Segments_Order_By>>;
  where?: Maybe<Segments_Bool_Exp>;
};


/** query root */
export type Query_RootSegments_By_PkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type Query_RootUser_ActivitiesArgs = {
  distinct_on?: Maybe<Array<User_Activities_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Activities_Order_By>>;
  where?: Maybe<User_Activities_Bool_Exp>;
};


/** query root */
export type Query_RootUser_Activities_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Activities_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Activities_Order_By>>;
  where?: Maybe<User_Activities_Bool_Exp>;
};


/** query root */
export type Query_RootUser_Activities_By_PkArgs = {
  segment_id: Scalars['Int'];
  user_id: Scalars['Int'];
};


/** query root */
export type Query_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_By_PkArgs = {
  id: Scalars['Int'];
};

/** columns and relationships of "segment_campaigns" */
export type Segment_Campaigns = {
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
export type Segment_Campaigns_Aggregate = {
  __typename?: 'segment_campaigns_aggregate';
  aggregate?: Maybe<Segment_Campaigns_Aggregate_Fields>;
  nodes: Array<Segment_Campaigns>;
};

/** aggregate fields of "segment_campaigns" */
export type Segment_Campaigns_Aggregate_Fields = {
  __typename?: 'segment_campaigns_aggregate_fields';
  avg?: Maybe<Segment_Campaigns_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Segment_Campaigns_Max_Fields>;
  min?: Maybe<Segment_Campaigns_Min_Fields>;
  stddev?: Maybe<Segment_Campaigns_Stddev_Fields>;
  stddev_pop?: Maybe<Segment_Campaigns_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Segment_Campaigns_Stddev_Samp_Fields>;
  sum?: Maybe<Segment_Campaigns_Sum_Fields>;
  var_pop?: Maybe<Segment_Campaigns_Var_Pop_Fields>;
  var_samp?: Maybe<Segment_Campaigns_Var_Samp_Fields>;
  variance?: Maybe<Segment_Campaigns_Variance_Fields>;
};


/** aggregate fields of "segment_campaigns" */
export type Segment_Campaigns_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Segment_Campaigns_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "segment_campaigns" */
export type Segment_Campaigns_Aggregate_Order_By = {
  avg?: Maybe<Segment_Campaigns_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Segment_Campaigns_Max_Order_By>;
  min?: Maybe<Segment_Campaigns_Min_Order_By>;
  stddev?: Maybe<Segment_Campaigns_Stddev_Order_By>;
  stddev_pop?: Maybe<Segment_Campaigns_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Segment_Campaigns_Stddev_Samp_Order_By>;
  sum?: Maybe<Segment_Campaigns_Sum_Order_By>;
  var_pop?: Maybe<Segment_Campaigns_Var_Pop_Order_By>;
  var_samp?: Maybe<Segment_Campaigns_Var_Samp_Order_By>;
  variance?: Maybe<Segment_Campaigns_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "segment_campaigns" */
export type Segment_Campaigns_Arr_Rel_Insert_Input = {
  data: Array<Segment_Campaigns_Insert_Input>;
  on_conflict?: Maybe<Segment_Campaigns_On_Conflict>;
};

/** aggregate avg on columns */
export type Segment_Campaigns_Avg_Fields = {
  __typename?: 'segment_campaigns_avg_fields';
  campaign_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  segment_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "segment_campaigns" */
export type Segment_Campaigns_Avg_Order_By = {
  campaign_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  segment_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "segment_campaigns". All fields are combined with a logical 'AND'. */
export type Segment_Campaigns_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Segment_Campaigns_Bool_Exp>>>;
  _not?: Maybe<Segment_Campaigns_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Segment_Campaigns_Bool_Exp>>>;
  campaign?: Maybe<Campaigns_Bool_Exp>;
  campaign_id?: Maybe<Int_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  segment?: Maybe<Segments_Bool_Exp>;
  segment_id?: Maybe<Int_Comparison_Exp>;
  slug?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "segment_campaigns" */
export enum Segment_Campaigns_Constraint {
  /** unique or primary key constraint */
  SegmentCampaignsPkey = 'segment_campaigns_pkey',
  /** unique or primary key constraint */
  SegmentCampaignsSlugKey = 'segment_campaigns_slug_key'
}

/** input type for incrementing integer column in table "segment_campaigns" */
export type Segment_Campaigns_Inc_Input = {
  campaign_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  segment_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "segment_campaigns" */
export type Segment_Campaigns_Insert_Input = {
  campaign?: Maybe<Campaigns_Obj_Rel_Insert_Input>;
  campaign_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  segment?: Maybe<Segments_Obj_Rel_Insert_Input>;
  segment_id?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Segment_Campaigns_Max_Fields = {
  __typename?: 'segment_campaigns_max_fields';
  campaign_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  segment_id?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "segment_campaigns" */
export type Segment_Campaigns_Max_Order_By = {
  campaign_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  segment_id?: Maybe<Order_By>;
  slug?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Segment_Campaigns_Min_Fields = {
  __typename?: 'segment_campaigns_min_fields';
  campaign_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  segment_id?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "segment_campaigns" */
export type Segment_Campaigns_Min_Order_By = {
  campaign_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  segment_id?: Maybe<Order_By>;
  slug?: Maybe<Order_By>;
};

/** response of any mutation on the table "segment_campaigns" */
export type Segment_Campaigns_Mutation_Response = {
  __typename?: 'segment_campaigns_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Segment_Campaigns>;
};

/** input type for inserting object relation for remote table "segment_campaigns" */
export type Segment_Campaigns_Obj_Rel_Insert_Input = {
  data: Segment_Campaigns_Insert_Input;
  on_conflict?: Maybe<Segment_Campaigns_On_Conflict>;
};

/** on conflict condition type for table "segment_campaigns" */
export type Segment_Campaigns_On_Conflict = {
  constraint: Segment_Campaigns_Constraint;
  update_columns: Array<Segment_Campaigns_Update_Column>;
  where?: Maybe<Segment_Campaigns_Bool_Exp>;
};

/** ordering options when selecting data from "segment_campaigns" */
export type Segment_Campaigns_Order_By = {
  campaign?: Maybe<Campaigns_Order_By>;
  campaign_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  segment?: Maybe<Segments_Order_By>;
  segment_id?: Maybe<Order_By>;
  slug?: Maybe<Order_By>;
};

/** primary key columns input for table: "segment_campaigns" */
export type Segment_Campaigns_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "segment_campaigns" */
export enum Segment_Campaigns_Select_Column {
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
export type Segment_Campaigns_Set_Input = {
  campaign_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  segment_id?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Segment_Campaigns_Stddev_Fields = {
  __typename?: 'segment_campaigns_stddev_fields';
  campaign_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  segment_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "segment_campaigns" */
export type Segment_Campaigns_Stddev_Order_By = {
  campaign_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  segment_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Segment_Campaigns_Stddev_Pop_Fields = {
  __typename?: 'segment_campaigns_stddev_pop_fields';
  campaign_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  segment_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "segment_campaigns" */
export type Segment_Campaigns_Stddev_Pop_Order_By = {
  campaign_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  segment_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Segment_Campaigns_Stddev_Samp_Fields = {
  __typename?: 'segment_campaigns_stddev_samp_fields';
  campaign_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  segment_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "segment_campaigns" */
export type Segment_Campaigns_Stddev_Samp_Order_By = {
  campaign_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  segment_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Segment_Campaigns_Sum_Fields = {
  __typename?: 'segment_campaigns_sum_fields';
  campaign_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  segment_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "segment_campaigns" */
export type Segment_Campaigns_Sum_Order_By = {
  campaign_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  segment_id?: Maybe<Order_By>;
};

/** update columns of table "segment_campaigns" */
export enum Segment_Campaigns_Update_Column {
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
export type Segment_Campaigns_Var_Pop_Fields = {
  __typename?: 'segment_campaigns_var_pop_fields';
  campaign_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  segment_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "segment_campaigns" */
export type Segment_Campaigns_Var_Pop_Order_By = {
  campaign_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  segment_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Segment_Campaigns_Var_Samp_Fields = {
  __typename?: 'segment_campaigns_var_samp_fields';
  campaign_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  segment_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "segment_campaigns" */
export type Segment_Campaigns_Var_Samp_Order_By = {
  campaign_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  segment_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Segment_Campaigns_Variance_Fields = {
  __typename?: 'segment_campaigns_variance_fields';
  campaign_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  segment_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "segment_campaigns" */
export type Segment_Campaigns_Variance_Order_By = {
  campaign_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  segment_id?: Maybe<Order_By>;
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
  segment_campaigns: Array<Segment_Campaigns>;
  /** An aggregated array relationship */
  segment_campaigns_aggregate: Segment_Campaigns_Aggregate;
};


/** columns and relationships of "segments" */
export type SegmentsSegment_CampaignsArgs = {
  distinct_on?: Maybe<Array<Segment_Campaigns_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Segment_Campaigns_Order_By>>;
  where?: Maybe<Segment_Campaigns_Bool_Exp>;
};


/** columns and relationships of "segments" */
export type SegmentsSegment_Campaigns_AggregateArgs = {
  distinct_on?: Maybe<Array<Segment_Campaigns_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Segment_Campaigns_Order_By>>;
  where?: Maybe<Segment_Campaigns_Bool_Exp>;
};

/** aggregated selection of "segments" */
export type Segments_Aggregate = {
  __typename?: 'segments_aggregate';
  aggregate?: Maybe<Segments_Aggregate_Fields>;
  nodes: Array<Segments>;
};

/** aggregate fields of "segments" */
export type Segments_Aggregate_Fields = {
  __typename?: 'segments_aggregate_fields';
  avg?: Maybe<Segments_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Segments_Max_Fields>;
  min?: Maybe<Segments_Min_Fields>;
  stddev?: Maybe<Segments_Stddev_Fields>;
  stddev_pop?: Maybe<Segments_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Segments_Stddev_Samp_Fields>;
  sum?: Maybe<Segments_Sum_Fields>;
  var_pop?: Maybe<Segments_Var_Pop_Fields>;
  var_samp?: Maybe<Segments_Var_Samp_Fields>;
  variance?: Maybe<Segments_Variance_Fields>;
};


/** aggregate fields of "segments" */
export type Segments_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Segments_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "segments" */
export type Segments_Aggregate_Order_By = {
  avg?: Maybe<Segments_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Segments_Max_Order_By>;
  min?: Maybe<Segments_Min_Order_By>;
  stddev?: Maybe<Segments_Stddev_Order_By>;
  stddev_pop?: Maybe<Segments_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Segments_Stddev_Samp_Order_By>;
  sum?: Maybe<Segments_Sum_Order_By>;
  var_pop?: Maybe<Segments_Var_Pop_Order_By>;
  var_samp?: Maybe<Segments_Var_Samp_Order_By>;
  variance?: Maybe<Segments_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "segments" */
export type Segments_Arr_Rel_Insert_Input = {
  data: Array<Segments_Insert_Input>;
  on_conflict?: Maybe<Segments_On_Conflict>;
};

/** aggregate avg on columns */
export type Segments_Avg_Fields = {
  __typename?: 'segments_avg_fields';
  id?: Maybe<Scalars['Float']>;
  project_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "segments" */
export type Segments_Avg_Order_By = {
  id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "segments". All fields are combined with a logical 'AND'. */
export type Segments_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Segments_Bool_Exp>>>;
  _not?: Maybe<Segments_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Segments_Bool_Exp>>>;
  description?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  organisation?: Maybe<Projects_Bool_Exp>;
  project_id?: Maybe<Int_Comparison_Exp>;
  segment_campaigns?: Maybe<Segment_Campaigns_Bool_Exp>;
};

/** unique or primary key constraints on table "segments" */
export enum Segments_Constraint {
  /** unique or primary key constraint */
  SegmentsPkey = 'segments_pkey'
}

/** input type for incrementing integer column in table "segments" */
export type Segments_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
  project_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "segments" */
export type Segments_Insert_Input = {
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  organisation?: Maybe<Projects_Obj_Rel_Insert_Input>;
  project_id?: Maybe<Scalars['Int']>;
  segment_campaigns?: Maybe<Segment_Campaigns_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Segments_Max_Fields = {
  __typename?: 'segments_max_fields';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  project_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "segments" */
export type Segments_Max_Order_By = {
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Segments_Min_Fields = {
  __typename?: 'segments_min_fields';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  project_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "segments" */
export type Segments_Min_Order_By = {
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "segments" */
export type Segments_Mutation_Response = {
  __typename?: 'segments_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Segments>;
};

/** input type for inserting object relation for remote table "segments" */
export type Segments_Obj_Rel_Insert_Input = {
  data: Segments_Insert_Input;
  on_conflict?: Maybe<Segments_On_Conflict>;
};

/** on conflict condition type for table "segments" */
export type Segments_On_Conflict = {
  constraint: Segments_Constraint;
  update_columns: Array<Segments_Update_Column>;
  where?: Maybe<Segments_Bool_Exp>;
};

/** ordering options when selecting data from "segments" */
export type Segments_Order_By = {
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  organisation?: Maybe<Projects_Order_By>;
  project_id?: Maybe<Order_By>;
  segment_campaigns_aggregate?: Maybe<Segment_Campaigns_Aggregate_Order_By>;
};

/** primary key columns input for table: "segments" */
export type Segments_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "segments" */
export enum Segments_Select_Column {
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
export type Segments_Set_Input = {
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  project_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Segments_Stddev_Fields = {
  __typename?: 'segments_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  project_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "segments" */
export type Segments_Stddev_Order_By = {
  id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Segments_Stddev_Pop_Fields = {
  __typename?: 'segments_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  project_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "segments" */
export type Segments_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Segments_Stddev_Samp_Fields = {
  __typename?: 'segments_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  project_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "segments" */
export type Segments_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Segments_Sum_Fields = {
  __typename?: 'segments_sum_fields';
  id?: Maybe<Scalars['Int']>;
  project_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "segments" */
export type Segments_Sum_Order_By = {
  id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
};

/** update columns of table "segments" */
export enum Segments_Update_Column {
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
export type Segments_Var_Pop_Fields = {
  __typename?: 'segments_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  project_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "segments" */
export type Segments_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Segments_Var_Samp_Fields = {
  __typename?: 'segments_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  project_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "segments" */
export type Segments_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Segments_Variance_Fields = {
  __typename?: 'segments_variance_fields';
  id?: Maybe<Scalars['Float']>;
  project_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "segments" */
export type Segments_Variance_Order_By = {
  id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
};

/** subscription root */
export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "articles" */
  articles: Array<Articles>;
  /** fetch aggregated fields from the table: "articles" */
  articles_aggregate: Articles_Aggregate;
  /** fetch data from the table: "articles" using primary key columns */
  articles_by_pk?: Maybe<Articles>;
  /** fetch data from the table: "blocks" */
  blocks: Array<Blocks>;
  /** fetch aggregated fields from the table: "blocks" */
  blocks_aggregate: Blocks_Aggregate;
  /** fetch data from the table: "blocks" using primary key columns */
  blocks_by_pk?: Maybe<Blocks>;
  /** fetch data from the table: "campaigns" */
  campaigns: Array<Campaigns>;
  /** fetch aggregated fields from the table: "campaigns" */
  campaigns_aggregate: Campaigns_Aggregate;
  /** fetch data from the table: "campaigns" using primary key columns */
  campaigns_by_pk?: Maybe<Campaigns>;
  /** fetch data from the table: "node_connections" */
  node_connections: Array<Node_Connections>;
  /** fetch aggregated fields from the table: "node_connections" */
  node_connections_aggregate: Node_Connections_Aggregate;
  /** fetch data from the table: "node_connections" using primary key columns */
  node_connections_by_pk?: Maybe<Node_Connections>;
  /** fetch data from the table: "nodes" */
  nodes: Array<Nodes>;
  /** fetch aggregated fields from the table: "nodes" */
  nodes_aggregate: Nodes_Aggregate;
  /** fetch data from the table: "nodes" using primary key columns */
  nodes_by_pk?: Maybe<Nodes>;
  /** fetch data from the table: "organisations" */
  organisations: Array<Organisations>;
  /** fetch aggregated fields from the table: "organisations" */
  organisations_aggregate: Organisations_Aggregate;
  /** fetch data from the table: "organisations" using primary key columns */
  organisations_by_pk?: Maybe<Organisations>;
  /** fetch data from the table: "projects" */
  projects: Array<Projects>;
  /** fetch aggregated fields from the table: "projects" */
  projects_aggregate: Projects_Aggregate;
  /** fetch data from the table: "projects" using primary key columns */
  projects_by_pk?: Maybe<Projects>;
  /** fetch data from the table: "segment_campaigns" */
  segment_campaigns: Array<Segment_Campaigns>;
  /** fetch aggregated fields from the table: "segment_campaigns" */
  segment_campaigns_aggregate: Segment_Campaigns_Aggregate;
  /** fetch data from the table: "segment_campaigns" using primary key columns */
  segment_campaigns_by_pk?: Maybe<Segment_Campaigns>;
  /** fetch data from the table: "segments" */
  segments: Array<Segments>;
  /** fetch aggregated fields from the table: "segments" */
  segments_aggregate: Segments_Aggregate;
  /** fetch data from the table: "segments" using primary key columns */
  segments_by_pk?: Maybe<Segments>;
  /** fetch data from the table: "user_activities" */
  user_activities: Array<User_Activities>;
  /** fetch aggregated fields from the table: "user_activities" */
  user_activities_aggregate: User_Activities_Aggregate;
  /** fetch data from the table: "user_activities" using primary key columns */
  user_activities_by_pk?: Maybe<User_Activities>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


/** subscription root */
export type Subscription_RootArticlesArgs = {
  distinct_on?: Maybe<Array<Articles_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Articles_Order_By>>;
  where?: Maybe<Articles_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootArticles_AggregateArgs = {
  distinct_on?: Maybe<Array<Articles_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Articles_Order_By>>;
  where?: Maybe<Articles_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootArticles_By_PkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootBlocksArgs = {
  distinct_on?: Maybe<Array<Blocks_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Blocks_Order_By>>;
  where?: Maybe<Blocks_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootBlocks_AggregateArgs = {
  distinct_on?: Maybe<Array<Blocks_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Blocks_Order_By>>;
  where?: Maybe<Blocks_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootBlocks_By_PkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootCampaignsArgs = {
  distinct_on?: Maybe<Array<Campaigns_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Campaigns_Order_By>>;
  where?: Maybe<Campaigns_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootCampaigns_AggregateArgs = {
  distinct_on?: Maybe<Array<Campaigns_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Campaigns_Order_By>>;
  where?: Maybe<Campaigns_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootCampaigns_By_PkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootNode_ConnectionsArgs = {
  distinct_on?: Maybe<Array<Node_Connections_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Node_Connections_Order_By>>;
  where?: Maybe<Node_Connections_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootNode_Connections_AggregateArgs = {
  distinct_on?: Maybe<Array<Node_Connections_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Node_Connections_Order_By>>;
  where?: Maybe<Node_Connections_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootNode_Connections_By_PkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootNodesArgs = {
  distinct_on?: Maybe<Array<Nodes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Nodes_Order_By>>;
  where?: Maybe<Nodes_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootNodes_AggregateArgs = {
  distinct_on?: Maybe<Array<Nodes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Nodes_Order_By>>;
  where?: Maybe<Nodes_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootNodes_By_PkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootOrganisationsArgs = {
  distinct_on?: Maybe<Array<Organisations_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Organisations_Order_By>>;
  where?: Maybe<Organisations_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootOrganisations_AggregateArgs = {
  distinct_on?: Maybe<Array<Organisations_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Organisations_Order_By>>;
  where?: Maybe<Organisations_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootOrganisations_By_PkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootProjectsArgs = {
  distinct_on?: Maybe<Array<Projects_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Projects_Order_By>>;
  where?: Maybe<Projects_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProjects_AggregateArgs = {
  distinct_on?: Maybe<Array<Projects_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Projects_Order_By>>;
  where?: Maybe<Projects_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProjects_By_PkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootSegment_CampaignsArgs = {
  distinct_on?: Maybe<Array<Segment_Campaigns_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Segment_Campaigns_Order_By>>;
  where?: Maybe<Segment_Campaigns_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootSegment_Campaigns_AggregateArgs = {
  distinct_on?: Maybe<Array<Segment_Campaigns_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Segment_Campaigns_Order_By>>;
  where?: Maybe<Segment_Campaigns_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootSegment_Campaigns_By_PkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootSegmentsArgs = {
  distinct_on?: Maybe<Array<Segments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Segments_Order_By>>;
  where?: Maybe<Segments_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootSegments_AggregateArgs = {
  distinct_on?: Maybe<Array<Segments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Segments_Order_By>>;
  where?: Maybe<Segments_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootSegments_By_PkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootUser_ActivitiesArgs = {
  distinct_on?: Maybe<Array<User_Activities_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Activities_Order_By>>;
  where?: Maybe<User_Activities_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUser_Activities_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Activities_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Activities_Order_By>>;
  where?: Maybe<User_Activities_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUser_Activities_By_PkArgs = {
  segment_id: Scalars['Int'];
  user_id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['Int'];
};


/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
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
export type User_Activities = {
  __typename?: 'user_activities';
  created_at: Scalars['timestamptz'];
  segment_id: Scalars['Int'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['Int'];
};

/** aggregated selection of "user_activities" */
export type User_Activities_Aggregate = {
  __typename?: 'user_activities_aggregate';
  aggregate?: Maybe<User_Activities_Aggregate_Fields>;
  nodes: Array<User_Activities>;
};

/** aggregate fields of "user_activities" */
export type User_Activities_Aggregate_Fields = {
  __typename?: 'user_activities_aggregate_fields';
  avg?: Maybe<User_Activities_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<User_Activities_Max_Fields>;
  min?: Maybe<User_Activities_Min_Fields>;
  stddev?: Maybe<User_Activities_Stddev_Fields>;
  stddev_pop?: Maybe<User_Activities_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Activities_Stddev_Samp_Fields>;
  sum?: Maybe<User_Activities_Sum_Fields>;
  var_pop?: Maybe<User_Activities_Var_Pop_Fields>;
  var_samp?: Maybe<User_Activities_Var_Samp_Fields>;
  variance?: Maybe<User_Activities_Variance_Fields>;
};


/** aggregate fields of "user_activities" */
export type User_Activities_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<User_Activities_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user_activities" */
export type User_Activities_Aggregate_Order_By = {
  avg?: Maybe<User_Activities_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<User_Activities_Max_Order_By>;
  min?: Maybe<User_Activities_Min_Order_By>;
  stddev?: Maybe<User_Activities_Stddev_Order_By>;
  stddev_pop?: Maybe<User_Activities_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<User_Activities_Stddev_Samp_Order_By>;
  sum?: Maybe<User_Activities_Sum_Order_By>;
  var_pop?: Maybe<User_Activities_Var_Pop_Order_By>;
  var_samp?: Maybe<User_Activities_Var_Samp_Order_By>;
  variance?: Maybe<User_Activities_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "user_activities" */
export type User_Activities_Arr_Rel_Insert_Input = {
  data: Array<User_Activities_Insert_Input>;
  on_conflict?: Maybe<User_Activities_On_Conflict>;
};

/** aggregate avg on columns */
export type User_Activities_Avg_Fields = {
  __typename?: 'user_activities_avg_fields';
  segment_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "user_activities" */
export type User_Activities_Avg_Order_By = {
  segment_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "user_activities". All fields are combined with a logical 'AND'. */
export type User_Activities_Bool_Exp = {
  _and?: Maybe<Array<Maybe<User_Activities_Bool_Exp>>>;
  _not?: Maybe<User_Activities_Bool_Exp>;
  _or?: Maybe<Array<Maybe<User_Activities_Bool_Exp>>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  segment_id?: Maybe<Int_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  user_id?: Maybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_activities" */
export enum User_Activities_Constraint {
  /** unique or primary key constraint */
  UserActivitiesPkey = 'user_activities_pkey'
}

/** input type for incrementing integer column in table "user_activities" */
export type User_Activities_Inc_Input = {
  segment_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "user_activities" */
export type User_Activities_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  segment_id?: Maybe<Scalars['Int']>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type User_Activities_Max_Fields = {
  __typename?: 'user_activities_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  segment_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "user_activities" */
export type User_Activities_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  segment_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type User_Activities_Min_Fields = {
  __typename?: 'user_activities_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  segment_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "user_activities" */
export type User_Activities_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  segment_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "user_activities" */
export type User_Activities_Mutation_Response = {
  __typename?: 'user_activities_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<User_Activities>;
};

/** input type for inserting object relation for remote table "user_activities" */
export type User_Activities_Obj_Rel_Insert_Input = {
  data: User_Activities_Insert_Input;
  on_conflict?: Maybe<User_Activities_On_Conflict>;
};

/** on conflict condition type for table "user_activities" */
export type User_Activities_On_Conflict = {
  constraint: User_Activities_Constraint;
  update_columns: Array<User_Activities_Update_Column>;
  where?: Maybe<User_Activities_Bool_Exp>;
};

/** ordering options when selecting data from "user_activities" */
export type User_Activities_Order_By = {
  created_at?: Maybe<Order_By>;
  segment_id?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "user_activities" */
export type User_Activities_Pk_Columns_Input = {
  segment_id: Scalars['Int'];
  user_id: Scalars['Int'];
};

/** select columns of table "user_activities" */
export enum User_Activities_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  SegmentId = 'segment_id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "user_activities" */
export type User_Activities_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  segment_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type User_Activities_Stddev_Fields = {
  __typename?: 'user_activities_stddev_fields';
  segment_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "user_activities" */
export type User_Activities_Stddev_Order_By = {
  segment_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type User_Activities_Stddev_Pop_Fields = {
  __typename?: 'user_activities_stddev_pop_fields';
  segment_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "user_activities" */
export type User_Activities_Stddev_Pop_Order_By = {
  segment_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type User_Activities_Stddev_Samp_Fields = {
  __typename?: 'user_activities_stddev_samp_fields';
  segment_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "user_activities" */
export type User_Activities_Stddev_Samp_Order_By = {
  segment_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type User_Activities_Sum_Fields = {
  __typename?: 'user_activities_sum_fields';
  segment_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "user_activities" */
export type User_Activities_Sum_Order_By = {
  segment_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** update columns of table "user_activities" */
export enum User_Activities_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  SegmentId = 'segment_id',
  /** column name */
  UserId = 'user_id'
}

/** aggregate var_pop on columns */
export type User_Activities_Var_Pop_Fields = {
  __typename?: 'user_activities_var_pop_fields';
  segment_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "user_activities" */
export type User_Activities_Var_Pop_Order_By = {
  segment_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type User_Activities_Var_Samp_Fields = {
  __typename?: 'user_activities_var_samp_fields';
  segment_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "user_activities" */
export type User_Activities_Var_Samp_Order_By = {
  segment_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type User_Activities_Variance_Fields = {
  __typename?: 'user_activities_variance_fields';
  segment_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "user_activities" */
export type User_Activities_Variance_Order_By = {
  segment_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  /** An array relationship */
  editor_activities: Array<User_Activities>;
  /** An aggregated array relationship */
  editor_activities_aggregate: User_Activities_Aggregate;
  email: Scalars['String'];
  hasura_user_id: Scalars['String'];
  id: Scalars['Int'];
  image: Scalars['String'];
  name: Scalars['String'];
  organisation_id: Scalars['Int'];
};


/** columns and relationships of "users" */
export type UsersEditor_ActivitiesArgs = {
  distinct_on?: Maybe<Array<User_Activities_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Activities_Order_By>>;
  where?: Maybe<User_Activities_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersEditor_Activities_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Activities_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Activities_Order_By>>;
  where?: Maybe<User_Activities_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  avg?: Maybe<Users_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
  stddev?: Maybe<Users_Stddev_Fields>;
  stddev_pop?: Maybe<Users_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Users_Stddev_Samp_Fields>;
  sum?: Maybe<Users_Sum_Fields>;
  var_pop?: Maybe<Users_Var_Pop_Fields>;
  var_samp?: Maybe<Users_Var_Samp_Fields>;
  variance?: Maybe<Users_Variance_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Users_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "users" */
export type Users_Aggregate_Order_By = {
  avg?: Maybe<Users_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Users_Max_Order_By>;
  min?: Maybe<Users_Min_Order_By>;
  stddev?: Maybe<Users_Stddev_Order_By>;
  stddev_pop?: Maybe<Users_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Users_Stddev_Samp_Order_By>;
  sum?: Maybe<Users_Sum_Order_By>;
  var_pop?: Maybe<Users_Var_Pop_Order_By>;
  var_samp?: Maybe<Users_Var_Samp_Order_By>;
  variance?: Maybe<Users_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "users" */
export type Users_Arr_Rel_Insert_Input = {
  data: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** aggregate avg on columns */
export type Users_Avg_Fields = {
  __typename?: 'users_avg_fields';
  id?: Maybe<Scalars['Float']>;
  organisation_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "users" */
export type Users_Avg_Order_By = {
  id?: Maybe<Order_By>;
  organisation_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  _not?: Maybe<Users_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  editor_activities?: Maybe<User_Activities_Bool_Exp>;
  email?: Maybe<String_Comparison_Exp>;
  hasura_user_id?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  image?: Maybe<String_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  organisation_id?: Maybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersHasuraUserIdKey = 'users_hasura_user_id_key',
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey'
}

/** input type for incrementing integer column in table "users" */
export type Users_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
  organisation_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  editor_activities?: Maybe<User_Activities_Arr_Rel_Insert_Input>;
  email?: Maybe<Scalars['String']>;
  hasura_user_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organisation_id?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  email?: Maybe<Scalars['String']>;
  hasura_user_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organisation_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "users" */
export type Users_Max_Order_By = {
  email?: Maybe<Order_By>;
  hasura_user_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  image?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  organisation_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  email?: Maybe<Scalars['String']>;
  hasura_user_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organisation_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "users" */
export type Users_Min_Order_By = {
  email?: Maybe<Order_By>;
  hasura_user_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  image?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  organisation_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns: Array<Users_Update_Column>;
  where?: Maybe<Users_Bool_Exp>;
};

/** ordering options when selecting data from "users" */
export type Users_Order_By = {
  editor_activities_aggregate?: Maybe<User_Activities_Aggregate_Order_By>;
  email?: Maybe<Order_By>;
  hasura_user_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  image?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  organisation_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "users" */
export type Users_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  Email = 'email',
  /** column name */
  HasuraUserId = 'hasura_user_id',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Name = 'name',
  /** column name */
  OrganisationId = 'organisation_id'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  email?: Maybe<Scalars['String']>;
  hasura_user_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organisation_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Users_Stddev_Fields = {
  __typename?: 'users_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  organisation_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "users" */
export type Users_Stddev_Order_By = {
  id?: Maybe<Order_By>;
  organisation_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Users_Stddev_Pop_Fields = {
  __typename?: 'users_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  organisation_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "users" */
export type Users_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
  organisation_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Users_Stddev_Samp_Fields = {
  __typename?: 'users_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  organisation_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "users" */
export type Users_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
  organisation_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Users_Sum_Fields = {
  __typename?: 'users_sum_fields';
  id?: Maybe<Scalars['Int']>;
  organisation_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "users" */
export type Users_Sum_Order_By = {
  id?: Maybe<Order_By>;
  organisation_id?: Maybe<Order_By>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  Email = 'email',
  /** column name */
  HasuraUserId = 'hasura_user_id',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Name = 'name',
  /** column name */
  OrganisationId = 'organisation_id'
}

/** aggregate var_pop on columns */
export type Users_Var_Pop_Fields = {
  __typename?: 'users_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  organisation_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "users" */
export type Users_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
  organisation_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Users_Var_Samp_Fields = {
  __typename?: 'users_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  organisation_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "users" */
export type Users_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
  organisation_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Users_Variance_Fields = {
  __typename?: 'users_variance_fields';
  id?: Maybe<Scalars['Float']>;
  organisation_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "users" */
export type Users_Variance_Order_By = {
  id?: Maybe<Order_By>;
  organisation_id?: Maybe<Order_By>;
};

export type GetArticlesQueryVariables = Exact<{
  projectId: Scalars['Int'];
}>;


export type GetArticlesQuery = (
  { __typename?: 'query_root' }
  & { articles: Array<(
    { __typename?: 'articles' }
    & Pick<Articles, 'id' | 'parent_id' | 'slug' | 'title' | 'updated_at' | 'created_at'>
  )> }
);

export type GetBlocksQueryVariables = Exact<{
  articleId: Scalars['Int'];
}>;


export type GetBlocksQuery = (
  { __typename?: 'query_root' }
  & { blocks: Array<(
    { __typename?: 'blocks' }
    & Pick<Blocks, 'id' | 'parent_id' | 'updated_at' | 'created_at' | 'payload' | 'type'>
  )> }
);

export type GetProjectDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectDataQuery = (
  { __typename?: 'query_root' }
  & { projects_by_pk?: Maybe<(
    { __typename?: 'projects' }
    & Pick<Projects, 'id' | 'name' | 'image' | 'slug'>
  )> }
);


export const GetArticlesDocument = gql`
    query GetArticles($projectId: Int!) {
  articles(where: {project_id: {_eq: $projectId}}) {
    id
    parent_id
    slug
    title
    updated_at
    created_at
  }
}
    `;

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
export const GetBlocksDocument = gql`
    query GetBlocks($articleId: Int!) {
  blocks(where: {article_id: {_eq: $articleId}}) {
    id
    parent_id
    updated_at
    created_at
    payload
    type
  }
}
    `;

/**
 * __useGetBlocksQuery__
 *
 * To run a query within a React component, call `useGetBlocksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBlocksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBlocksQuery({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useGetBlocksQuery(baseOptions: Apollo.QueryHookOptions<GetBlocksQuery, GetBlocksQueryVariables>) {
        return Apollo.useQuery<GetBlocksQuery, GetBlocksQueryVariables>(GetBlocksDocument, baseOptions);
      }
export function useGetBlocksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBlocksQuery, GetBlocksQueryVariables>) {
          return Apollo.useLazyQuery<GetBlocksQuery, GetBlocksQueryVariables>(GetBlocksDocument, baseOptions);
        }
export type GetBlocksQueryHookResult = ReturnType<typeof useGetBlocksQuery>;
export type GetBlocksLazyQueryHookResult = ReturnType<typeof useGetBlocksLazyQuery>;
export type GetBlocksQueryResult = Apollo.QueryResult<GetBlocksQuery, GetBlocksQueryVariables>;
export const GetProjectDataDocument = gql`
    query GetProjectData {
  projects_by_pk(id: 1) {
    id
    name
    image
    slug
  }
}
    `;

/**
 * __useGetProjectDataQuery__
 *
 * To run a query within a React component, call `useGetProjectDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProjectDataQuery(baseOptions?: Apollo.QueryHookOptions<GetProjectDataQuery, GetProjectDataQueryVariables>) {
        return Apollo.useQuery<GetProjectDataQuery, GetProjectDataQueryVariables>(GetProjectDataDocument, baseOptions);
      }
export function useGetProjectDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectDataQuery, GetProjectDataQueryVariables>) {
          return Apollo.useLazyQuery<GetProjectDataQuery, GetProjectDataQueryVariables>(GetProjectDataDocument, baseOptions);
        }
export type GetProjectDataQueryHookResult = ReturnType<typeof useGetProjectDataQuery>;
export type GetProjectDataLazyQueryHookResult = ReturnType<typeof useGetProjectDataLazyQuery>;
export type GetProjectDataQueryResult = Apollo.QueryResult<GetProjectDataQuery, GetProjectDataQueryVariables>;
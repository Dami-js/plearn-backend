/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';
import { FilterQuery, Document, Model } from 'mongoose';

export interface CollationDocument {
  locale: string;
  caseLevel: boolean;
  caseFirst: string;
  strength: number;
  numericOrdering: boolean;
  alternate: string;
  maxVariable: string;
  backwards: boolean;
}

export interface PopulateOptions {
  path: any;
  select: any;
  model: string | Model<any, {}>;
  match: any;
}

export interface PaginateOptions {
  select?: Object | string;
  sort?: Object | string;
  page?: number;
  limit?: number;
  pagination?: boolean;
  collation?: CollationDocument;
  populate?: PopulateOptions;
}

export interface PaginationResult {
  docs: Array<any>;
  totalDocs: number;
  limit: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  page: number;
  totalPages: number;
  prevPage: number | null;
  nextPage: number | null;
}

export interface PaginateModelArgs<T> {
  model: Model<any, {}>;
  query?: (FilterQuery<T> & Document) | {};
  options?: PaginateOptions;
}

// model: Model<any, {}>,
// query?: (FilterQuery<T> & Document) | {},
// options: PaginateOptions = {},

@Injectable()
export class PaginateModel<T extends Document> {
  public async paginate(args: PaginateModelArgs<T>): Promise<PaginationResult> {
    const { model, query, options = {} } = args;

    const {
      select = {},
      sort = {},
      page = 1,
      limit = 10,
      pagination = true,
      collation,
      populate,
    } = options;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const dataLength = await model.countDocuments().exec();
    const results: PaginationResult = {
      docs: [],
      totalDocs: null,
      limit,
      hasPrevPage: startIndex > 0,
      hasNextPage: endIndex < dataLength,
      page,
      totalPages: Math.ceil(dataLength / limit),
      prevPage: startIndex > 0 ? page - 1 : null,
      nextPage: endIndex < dataLength ? page + 1 : null,
    };
    if (!pagination) {
      results.docs = await model
        .find({ ...query })
        .select(select)
        .sort(sort)
        .collation(collation)
        .populate(
          populate?.path,
          populate?.select,
          populate?.model,
          populate?.match,
        );
    } else {
      results.docs = await model
        .find({ ...query })
        .select(select)
        .sort(sort)
        .collation(collation)
        .populate(
          populate?.path,
          populate?.select,
          populate?.model,
          populate?.match,
        )
        .limit(limit)
        .skip(startIndex)
        .exec();
    }
    results.totalDocs = results.docs.length;

    return results;
  }
}

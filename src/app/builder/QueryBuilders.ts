// import { FilterQuery, Query } from 'mongoose';

import { FilterQuery, Query } from 'mongoose';

// class QueryBuilder<T> {
//   public modelQuery: Query<T[], T>;
//   public query: Record<string, unknown>;
//   constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
//     this.modelQuery = modelQuery;
//     this.query = query;
//   }
//   //Searching
//   search(searchableFields: string[]) {
//     const searchTerm = this?.query?.searchTerm;
//     if (searchTerm)
//       this.modelQuery = this?.modelQuery?.find({
//         $or: searchableFields.map(
//           (fields) =>
//             ({
//               [fields]: { $regex: searchTerm, $options: 'i' },
//             }) as FilterQuery<T>,
//         ),
//       });
//     return this;
//   }
//   // filtering
//   filter() {
//     const queryObj = { ...this.query }; //copy
//     const excludeFields = ['searchTerm', 'sort', 'limit', 'page'];
//     excludeFields?.forEach((el) => {
//       delete queryObj[el];
//     });
//     this.modelQuery = this?.modelQuery?.find(queryObj as FilterQuery<T>);
//     return this;
//   }

//   //sorting
//   sort() {
//     const sort = this?.query?.sort || '-createdAt';
//     this.modelQuery = this?.modelQuery?.sort(sort as string);
//     return this;
//   }
//   // pagination
//   paginate() {
//     const page = Number(this?.query?.page) || 1;
//     const limit = Number(this?.query?.limit) || 10;
//     const skip = (page - 1) * limit;
//     this.modelQuery = this?.modelQuery?.skip(skip)?.limit(limit);
//     return this;
//   }
//   // fields
//   fields() {
//     const fields =
//       (this?.query?.fields as string)?.split(',')?.join() || '- _v';
//     this.modelQuery = this?.modelQuery?.select(fields);
//     return this;
//   }
// }

// export default QueryBuilder;

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  //searching
  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm as string;
    console.log({ searchableFields });

    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })) as FilterQuery<T>[],
      });
    }
    return this;
  }

  //filtering
  filter() {
    const queryObj = { ...this.query }; //copy
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  //sorting
  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }

  //pagination
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  // fields;
  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;

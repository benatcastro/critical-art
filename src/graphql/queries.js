/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const searchAccounts = /* GraphQL */ `
  query SearchAccounts(
    $filter: SearchableAccountFilterInput
    $sort: [SearchableAccountSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableAccountAggregationInput]
  ) {
    searchAccounts(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        email
        username
        firstName
        lastName
        verified
        artistAcc
        favImg {
          id
          Src
          ShortDesc
          Description
          createdAt
          updatedAt
          accountImagesId
        }
        images {
          nextToken
        }
        createdAt
        updatedAt
        accountFavImgId
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const searchImages = /* GraphQL */ `
  query SearchImages(
    $filter: SearchableimageFilterInput
    $sort: [SearchableimageSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableimageAggregationInput]
  ) {
    searchImages(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        Src
        author {
          id
          email
          username
          firstName
          lastName
          verified
          artistAcc
          createdAt
          updatedAt
          accountFavImgId
        }
        ShortDesc
        Description
        createdAt
        updatedAt
        accountImagesId
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const getAccount = /* GraphQL */ `
  query GetAccount($id: ID!) {
    getAccount(id: $id) {
      id
      email
      username
      firstName
      lastName
      verified
      artistAcc
      favImg {
        id
        Src
        author {
          id
          email
          username
          firstName
          lastName
          verified
          artistAcc
          createdAt
          updatedAt
          accountFavImgId
        }
        ShortDesc
        Description
        createdAt
        updatedAt
        accountImagesId
      }
      images {
        items {
          id
          Src
          ShortDesc
          Description
          createdAt
          updatedAt
          accountImagesId
        }
        nextToken
      }
      createdAt
      updatedAt
      accountFavImgId
    }
  }
`;
export const listAccounts = /* GraphQL */ `
  query ListAccounts(
    $filter: ModelAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        username
        firstName
        lastName
        verified
        artistAcc
        favImg {
          id
          Src
          ShortDesc
          Description
          createdAt
          updatedAt
          accountImagesId
        }
        images {
          nextToken
        }
        createdAt
        updatedAt
        accountFavImgId
      }
      nextToken
    }
  }
`;
export const getImage = /* GraphQL */ `
  query GetImage($id: ID!) {
    getImage(id: $id) {
      id
      Src
      author {
        id
        email
        username
        firstName
        lastName
        verified
        artistAcc
        favImg {
          id
          Src
          ShortDesc
          Description
          createdAt
          updatedAt
          accountImagesId
        }
        images {
          nextToken
        }
        createdAt
        updatedAt
        accountFavImgId
      }
      ShortDesc
      Description
      createdAt
      updatedAt
      accountImagesId
    }
  }
`;
export const listImages = /* GraphQL */ `
  query ListImages(
    $filter: ModelImageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listImages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Src
        author {
          id
          email
          username
          firstName
          lastName
          verified
          artistAcc
          createdAt
          updatedAt
          accountFavImgId
        }
        ShortDesc
        Description
        createdAt
        updatedAt
        accountImagesId
      }
      nextToken
    }
  }
`;

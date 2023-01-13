/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAccount = /* GraphQL */ `
  query GetAccount($id: ID!) {
    getAccount(id: $id) {
      id
      email
      cognitoUser
      username
      firstName
      lastName
      verified
      artistAcc
      avatar
      biography
      favImg
      createdAt
      updatedAt
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
        cognitoUser
        username
        firstName
        lastName
        verified
        artistAcc
        avatar
        biography
        favImg
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getImage = /* GraphQL */ `
  query GetImage($id: ID!) {
    getImage(id: $id) {
      id
      auth
      src
      author
      type
      shortDesc
      description
      createdAt
      updatedAt
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
        auth
        src
        author
        type
        shortDesc
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const accountByEmail = /* GraphQL */ `
  query AccountByEmail(
    $email: String!
    $sortDirection: ModelSortDirection
    $filter: ModelAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    accountByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        cognitoUser
        username
        firstName
        lastName
        verified
        artistAcc
        avatar
        biography
        favImg
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const accountByUsername = /* GraphQL */ `
  query AccountByUsername(
    $username: String!
    $sortDirection: ModelSortDirection
    $filter: ModelAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    accountByUsername(
      username: $username
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        cognitoUser
        username
        firstName
        lastName
        verified
        artistAcc
        avatar
        biography
        favImg
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const imageByAuth = /* GraphQL */ `
  query ImageByAuth(
    $auth: String!
    $sortDirection: ModelSortDirection
    $filter: ModelimageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    imageByAuth(
      auth: $auth
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        auth
        src
        author
        type
        shortDesc
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

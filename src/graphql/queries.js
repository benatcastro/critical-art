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
      favImg {
        id
        authorName
        src
        author {
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
          createdAt
          updatedAt
          accountFavImgId
        }
        shortDesc
        description
        createdAt
        updatedAt
        accountImagesId
      }
      images {
        items {
          id
          authorName
          src
          shortDesc
          description
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
        cognitoUser
        username
        firstName
        lastName
        verified
        artistAcc
        avatar
        biography
        favImg {
          id
          authorName
          src
          shortDesc
          description
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
      authorName
      src
      author {
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
        favImg {
          id
          authorName
          src
          shortDesc
          description
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
      shortDesc
      description
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
        authorName
        src
        author {
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
          createdAt
          updatedAt
          accountFavImgId
        }
        shortDesc
        description
        createdAt
        updatedAt
        accountImagesId
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
        favImg {
          id
          authorName
          src
          shortDesc
          description
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
        favImg {
          id
          authorName
          src
          shortDesc
          description
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
export const imageByAuthor = /* GraphQL */ `
  query ImageByAuthor(
    $authorName: String!
    $sortDirection: ModelSortDirection
    $filter: ModelimageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    imageByAuthor(
      authorName: $authorName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        authorName
        src
        author {
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
          createdAt
          updatedAt
          accountFavImgId
        }
        shortDesc
        description
        createdAt
        updatedAt
        accountImagesId
      }
      nextToken
    }
  }
`;

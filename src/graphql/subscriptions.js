/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAccount = /* GraphQL */ `
  subscription OnCreateAccount($filter: ModelSubscriptionAccountFilterInput) {
    onCreateAccount(filter: $filter) {
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
export const onUpdateAccount = /* GraphQL */ `
  subscription OnUpdateAccount($filter: ModelSubscriptionAccountFilterInput) {
    onUpdateAccount(filter: $filter) {
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
export const onDeleteAccount = /* GraphQL */ `
  subscription OnDeleteAccount($filter: ModelSubscriptionAccountFilterInput) {
    onDeleteAccount(filter: $filter) {
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
export const onCreateImage = /* GraphQL */ `
  subscription OnCreateImage($filter: ModelSubscriptionImageFilterInput) {
    onCreateImage(filter: $filter) {
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
export const onUpdateImage = /* GraphQL */ `
  subscription OnUpdateImage($filter: ModelSubscriptionImageFilterInput) {
    onUpdateImage(filter: $filter) {
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
export const onDeleteImage = /* GraphQL */ `
  subscription OnDeleteImage($filter: ModelSubscriptionImageFilterInput) {
    onDeleteImage(filter: $filter) {
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

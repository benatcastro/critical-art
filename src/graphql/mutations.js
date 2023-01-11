/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAccount = /* GraphQL */ `
  mutation CreateAccount(
    $input: CreateAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    createAccount(input: $input, condition: $condition) {
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
export const updateAccount = /* GraphQL */ `
  mutation UpdateAccount(
    $input: UpdateAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    updateAccount(input: $input, condition: $condition) {
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
export const deleteAccount = /* GraphQL */ `
  mutation DeleteAccount(
    $input: DeleteAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    deleteAccount(input: $input, condition: $condition) {
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
export const createImage = /* GraphQL */ `
  mutation CreateImage(
    $input: CreateImageInput!
    $condition: ModelImageConditionInput
  ) {
    createImage(input: $input, condition: $condition) {
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
export const updateImage = /* GraphQL */ `
  mutation UpdateImage(
    $input: UpdateImageInput!
    $condition: ModelImageConditionInput
  ) {
    updateImage(input: $input, condition: $condition) {
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
export const deleteImage = /* GraphQL */ `
  mutation DeleteImage(
    $input: DeleteImageInput!
    $condition: ModelImageConditionInput
  ) {
    deleteImage(input: $input, condition: $condition) {
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

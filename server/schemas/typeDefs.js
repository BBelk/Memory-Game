const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    highscores: [String]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(id: ID!): User
    me: User
  }

  type Mutation {
    addUser(email:String!, username:String!, password:String!): Auth
    login(email:String!, password:String!): Auth
    removeUser(profileId: ID!): User
    updateUser(profileId: ID!, username: String! email: String!, password: String!): User
    addHighscore(profileId: ID!, newHighscore: String): User
  }
`;

module.exports = typeDefs;

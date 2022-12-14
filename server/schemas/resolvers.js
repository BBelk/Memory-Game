const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (_, args) => {
      return User.findOne({ _id: args.id });
    },
    me: async (_, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (_, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, username, password }) => {
      const user = await User.findOne(email ? { email } : { username });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    removeUser: async (parent, { profileId }) => {
      return User.findOneAndDelete({ _id: profileId });
    },
    updateUser: async (parent, { profileId, username, email, password }) => {
      return await User.findByIdAndUpdate({ _id: profileId }, {$set: { username: username, email: email, password: password }}, { new: true });
    },

    addHighscore: async (parent, { profileId, newHighscore }) => {
      return User.findOneAndUpdate(
        { _id: profileId },
        {
          $addToSet: { highscores: newHighscore },
        },
        {
          new: true,
        }
      );
    },
  }
};

module.exports = resolvers;

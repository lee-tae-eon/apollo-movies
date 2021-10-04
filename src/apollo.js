import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4040/",
  cache: new InMemoryCache(),
  resolvers: {
    Movie: {
      isLiked: () => false, // 디폴트로 false 값 지니도록.
    },
    Mutation: {
      toggleLikeMovie: (_, { id, isLiked }, { cache }) => {
        const thisMovie = {
          __typename: "Movie",
          id: `${id}`,
          isLiked: `${isLiked}`,
        };
        cache.modify({
          id: cache.identify(thisMovie),
          fields: {
            isLiked() {
              return !isLiked;
            },
          },
        });
      },
    },
  },
});

export default client;

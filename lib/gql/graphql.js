import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'https://api-ap-northeast-1.graphcms.com/v2/cl1kb0b3l730d01xi4w1qbspk/master',
  cache: new InMemoryCache(),
})

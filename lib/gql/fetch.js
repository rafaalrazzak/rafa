import { gql } from '@apollo/client'

export const AUTHOR = gql`
  query Author {
    authors {
      id
      detail
      name
      avatar {
        url
      }
      socialMedia
    }
  }
`

export const BLOG = gql`
  query Blog {
    blogs {
      id
      authors {
        id
        content
        name
        twitter
        avatar {
          url
        }
      }
      thumbnail {
        url
      }
      category
      containt
      slug
      title
      datePublished
    }
  }
`

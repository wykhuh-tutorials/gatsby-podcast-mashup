import React from "react"
import { graphql } from "gatsby"

export default ({ data }) => (
  <ul>
    {data.oneGraph.fehh.rss2Feed.items.map(item => (
      <li>{item.title}</li>
    ))}
  </ul>
)

// graphql - during build, gatsby will run the graphql query, embed data into
// the source code,  and delete all graphql code from source code.
export const query = graphql`
  {
    oneGraph {
      bbc: rss {
        rss2Feed(url: "http://podcasts.files.bbci.co.uk/p02pc9pj.rss") {
          ...RSSFragment
        }
      }
      fehh: rss {
        rss2Feed(
          url: "http://feeds.soundcloud.com/users/soundcloud:users:206137365/sounds.rss"
        ) {
          ...RSSFragment
        }
      }
      rp: rss {
        rss2Feed(url: "http://rss.simplecast.com/podcasts/6265/rss") {
          ...RSSFragment
        }
      }
    }
  }
  fragment RSSFragment on ONEGRAPH_Rss2Channel {
    image {
      uri
    }
    title
    items {
      pubDate
      title
      link
      enclosure {
        mime
        url
        length
      }
    }
  }
`

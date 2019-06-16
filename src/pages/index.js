import React from "react"
import { graphql } from "gatsby"

const sortPodcasts = podcastArr =>
  podcastArr.reduce((acc, podcast) => {
    const image = podcast.rss2Feed.image
    const title = podcast.rss2Feed.title
    const items = podcast.rss2Feed.items

    return [
      ...acc,
      ...items.map(item => ({
        ...item,
        podcast: {
          title,
          image,
        },
      })),
    ].sort((a, b) => b.pubDate - a.pubDate)
  }, [])

export default ({ data }) => {
  const items = sortPodcasts([data.oneGraph.fehh, data.oneGraph.rp])

  return (
    <ul>
      {items.map(item => (
        <li>
          {item.pubDate}: {item.title}
        </li>
      ))}
    </ul>
  )
}

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

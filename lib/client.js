import sanityClient from "@sanity/client"
import ImageUrlBuilder from "@sanity/image-url"
export const client = sanityClient({
    projectId: "05caaxtd",
    dataset: "production",
    apiVersion: "2022-11-06",
    useCdn: true,
    token:
    "skwVxxNZl4Ha3da55i8bBtbHw7FhpoYBucW95xt8byjHcxjkEeiXEJZ0lYVJyKn2JGIUtrT6kfTCCqqoaKIm1ZGabtA5rbs0MVpKQ8jbVnqxfbNRCfzfN7zBhxPZs8aQdxn7J4YOQUIVwSm6l8BalkxaBM3qK581TrXbcKd5lCpAPMwet1rk"
})

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source)
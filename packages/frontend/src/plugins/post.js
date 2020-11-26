import times from "@/plugins/times";

export function normalize(post) {
  post.sourceUrl = `https://twitter.com/${post.postedBy.screenName}/status/${post.idStr}`;
  post.createdAt = times(post.createdAt).format("YYYY-MM-DD");
  post.updatedAt = times(post.updatedAt).format("YYYY-MM-DD");
  return post;
}
export function expandRecusively(post) {
  post = normalize(post);
  if (post.entities) post.entities = JSON.parse(post.entities);
  if (post.quotedStatuses) {
    post.quotedStatuses = post.quotedStatuses.map(s => expandRecusively(s));
  }
  return post;
}

import times from "@/plugins/times";

export function normalize(post) {
  post.sourceUrl = `https://twitter.com/${post.postedBy.screenName}/status/${post.idStr}`;
  post.createdAt = times(post.createdAt).format("YYYY-MM-DD");
  post.updatedAt = times(post.updatedAt).format("YYYY-MM-DD");
  return post;
}
export function expandRecusively(post) {
  if (!post.postedBy) return null;
  post = normalize(post);
  if (post.entities) post.entities = JSON.parse(post.entities);
  if (post.quotedStatuses && post.quotedStatuses.length) {
    post.quotedStatuses = post.quotedStatuses.map(s => expandRecusively(s)).filter(s => !!s);
  }
  return post;
}

export function addDividingFlag({ current, pre, tail, sort }) {
  if (!["createdAtAsc", "createdAtDesc"].includes(sort)) {
    return;
  }
  if (!pre) {
    if (!tail) {
      current.shouldShowDivider = true;
      return;
    }
    if (tail.createdAt !== current.createdAt) {
      current.shouldShowDivider = true;
      return;
    }
    return;
  }
  if (pre.createdAt !== current.createdAt) {
    current.shouldShowDivider = true;
  }
}

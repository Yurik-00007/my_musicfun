export const CurrentUserReaction = {
  Like: 1,
  Dislike: -1,
  None: 0,
} as const;

// export type CurrentUserReaction =
//   (typeof CurrentUserReaction)[keyof typeof CurrentUserReaction]; //1|-1|0

export const SortBy = {
  PublishedAt: "publishedAt",
  LikesCount: "likesCount",
} as const;
export type SortBy = (typeof SortBy)[keyof typeof SortBy];

export const SortDirection = {
  ASC: "asc",
  DESC: "desc",
} as const;
export type SortDirection = (typeof SortDirection)[keyof typeof SortDirection];

export const PaginationType = {
  OFFSET: "offset",
  CURSOR: "cursor",
} as const;
export type PaginationType =
  (typeof PaginationType)[keyof typeof PaginationType];

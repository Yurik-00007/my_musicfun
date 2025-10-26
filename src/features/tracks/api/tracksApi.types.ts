import type { PaginationType, SortBy, SortDirection } from "@/common/enums";
import * as z from "zod";
import {
  fetchTracksResponseSchema,
  trackAttachmentSchema,
  trackAttributesSchema,
  trackDataSchema,
  trackRelationshipsSchema,
  tracksIncludedSchema,
  tracksMetaSchema,
} from "@/features/tracks/model/tracks.schemas.ts";

/*
export type FetchTracksResponse = {
  data: TrackData[];
  meta: TracksMeta;
  included: TracksIncluded[];
};

export type TracksMeta = {
  page: number;
  pageSize: number;
  totalCount: number | null;
  pagesCount: number | null;
  nextCursor: string | null;
};

export type TrackData = {
  id: string;
  type: string;
  attributes: TrackAttributes;
  relationships: TrackRelationships;
};

export type TrackAttributes = {
  title: string;
  addedAt: string;
  attachments: TrackAttachment[];
  images: Images;
  currentUserReaction: CurrentUserReaction;
  user: User;
  isPublished: boolean;
  publishedAt?: string;
  likesCount: number;
};

export type TrackAttachment = {
  id: string;
  addedAt: string;
  updatedAt: string;
  version: number;
  url: string;
  contentType: string;
  originalName: string;
  fileSize: number;
};

export type TrackRelationships = {
  artists: {
    data: {
      id: string;
      type: string;
    };
  };
};

export type TracksIncluded = {
  id: string;
  type: "artists";
  attributes: {
    name: string;
  };
};
*/

export type FetchTracksResponse = z.infer<typeof fetchTracksResponseSchema>;
export type TrackData = z.infer<typeof trackDataSchema>;
export type TracksMeta = z.infer<typeof tracksMetaSchema>;
export type TrackAttachment = z.infer<typeof trackAttachmentSchema>;
export type TrackAttributes = z.infer<typeof trackAttributesSchema>;
export type TrackRelationships = z.infer<typeof trackRelationshipsSchema>;
export type TracksIncluded = z.infer<typeof tracksIncludedSchema>;

// Arguments
export type FetchTracksArgs = {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  sortBy?: SortBy;
  sortDirection?: SortDirection;
  tagsIds?: string[];
  artistsIds?: string[];
  userId?: string;
  includeDrafts?: boolean;
  paginationType?: PaginationType;
  cursor?: string;
};

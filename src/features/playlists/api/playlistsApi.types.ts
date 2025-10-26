/*
import type { CurrentUserReaction, Images, Tag, User } from "@/common/types";

export type PlaylistsResponse = {
  data: PlaylistData[]
  meta: PlaylistMeta
}

export type PlaylistData = {
  id: string
  type: 'playlists'
  attributes: PlaylistAttributes
}

export type PlaylistMeta = {
  page: number
  pageSize: number
  totalCount: number
  pagesCount: number
}

export type PlaylistAttributes = {
  title: string
  description: string
  addedAt: string
  updatedAt: string
  order: number
  dislikesCount: number
  likesCount: number
  tags: Tag[]
  images: Images
  user: User
  currentUserReaction: CurrentUserReaction
}

// Arguments
export type FetchPlaylistsArgs = {
  pageNumber?: number
  pageSize?: number
  search?: string
  sortBy?: 'addedAt' | 'likesCount'
  sortDirection?: 'asc' | 'desc'
  tagsIds?: string[]
  userId?: string
  trackId?: string
}

export type CreatePlaylistArgs = {
  title: string
  description: string
}

export type UpdatePlaylistArgs={
  title: string
  description: string
  tagIds: string[]
}
*/
import * as z from "zod";
import {
  playlistAttributesSchema,
  playlistCreateResponseSchema,
  playlistDataSchema,
  playlistMetaSchema,
  type playlistsResponseSchema,
} from "@/features/playlists/model/playlists.schemas.ts";

export type PlaylistMeta = z.infer<typeof playlistMetaSchema>;
export type PlaylistAttributes = z.infer<typeof playlistAttributesSchema>;
export type PlaylistData = z.infer<typeof playlistDataSchema>;
export type PlaylistsResponse = z.infer<typeof playlistsResponseSchema>;
export type PlaylistCreateResponse = z.infer<
  typeof playlistCreateResponseSchema
>;

// Arguments
export type FetchPlaylistsArgs = {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  sortBy?: "addedAt" | "likesCount";
  sortDirection?: "asc" | "desc";
  tagsIds?: string[];
  userId?: string;
  trackId?: string;
};

export type CreatePlaylistArgs = {
  title: string;
  description: string;
};

export type UpdatePlaylistArgs = {
  title: string;
  description: string;
  tagIds: string[];
};

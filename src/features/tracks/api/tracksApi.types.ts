import type {Images, User} from "@/common/types";
import {CurrentUserReaction, type PaginationType, type SortBy, type SortDirection} from "@/common/enums";

export type FetchTracksResponse = {
  data: TrackData[]
  meta: TracksMeta
  included: TracksIncluded[]
}

export type TracksMeta = {
  page: number
  pageSize: number
  totalCount: number | null
  pagesCount: number | null
  nextCursor: string | null
}

export type TrackData = {
  id: string
  type: string
  attributes: TrackAttributes
  relationships: TrackRelationships
}

export type TrackAttributes = {
  title: string
  addedAt: string
  attachments: TrackAttachment[]
  images: Images
  currentUserReaction: CurrentUserReaction
  user: User
  isPublished: boolean
  publishedAt?: string
  likesCount: number
}

export type TrackAttachment = {
  id: string
  addedAt: string
  updatedAt: string
  version: number
  url: string
  contentType: string
  originalName: string
  fileSize: number
}

export type TrackRelationships = {
  artists: {
    data: {
      id: string
      type: string
    }
  }
}

export type TracksIncluded = {
  id: string
  type: 'artists'
  attributes: {
    name: string
  }
}

// Arguments
export type FetchTracksArgs = {
  pageNumber?: number
  pageSize?: number
  search?: string
  sortBy?: SortBy
  sortDirection?: SortDirection
  tagsIds?: string[]
  artistsIds?: string[]
  userId?: string
  includeDrafts?: boolean
  paginationType?: PaginationType
  cursor?: string
}
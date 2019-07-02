export enum Type {
  folder = "folder",
  video = "video",
  image = "image",
  text = "text"
}

export interface ServerResponse {
  type: Type,
  path: string
  name: string
  ext: string
  payload: File[] | Video | Image | Text
}

export interface File {
  name: string
  path: string
  isDir: boolean
  size: string | null
}

export interface Video {
  posterUrl: string | null
  videoUrl: string
  vttUrl: string | null
  smiUrl: string | null
  videoWidth: number
  videoHeight: number
}

export interface Image {
  rawUrl: string
}

export interface Text {
  rawUrl: string
}
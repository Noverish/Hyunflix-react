import { Type } from './type';

export interface ServerResponse {
  type: Type,
  path: string
  name: string
  ext: string
  payload: File[] | Video | Image | Text
}

export interface File {
  name: string
  type: Type
  path: string
  isDir: boolean
  size: string | null
}

export interface Video {
  posterUrl: string | null
  videoUrl: string
  subtitleUrl: string | null
  videoWidth: number
  videoHeight: number
}

export interface Image {
  rawUrl: string
}

export interface Text {
  rawUrl: string
}

export { Type, typeToSVG, parseType } from './type';
export enum Type {
  folder = "folder",
  video = "video",
  image = "image",
  text = "text",
  etc = "etc"
}

export namespace Type {
  export function svg(type: Type): string {
    switch (type) {
      case Type.folder:
        return '/icons/folder.svg';
      case Type.image:
        return '/icons/image.svg';
      case Type.text:
        return '/icons/text.svg';
      case Type.video:
        return '/icons/video.svg';
      case Type.etc:
        return '';
    }
  }
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
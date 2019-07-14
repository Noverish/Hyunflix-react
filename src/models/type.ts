import { extname } from 'path';

export enum Type {
  folder = "folder",
  video = "video",
  image = "image",
  text = "text",
  etc = "etc"
}

export function typeToSVG(type: Type): string {
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
      return '/icons/etc.svg';
  }
}

export function parseType(path: string): Type {
  const ext = extname(path).toLowerCase();
  
  switch (ext) {
    case '':
      return Type.folder;
    case '.mp4':
      return Type.video;
    case '.vtt':
    case '.srt':
    case '.smi':
    case '.txt':
      return Type.text;
    case '.jpg':
    case '.jpeg':
    case '.png':
      return Type.image;
    default:
      return Type.etc;
  }
}
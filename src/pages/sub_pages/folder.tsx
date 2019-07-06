import React from 'react';
import { extname } from 'path';
import { ServerResponse, File } from '../../models';

export default function FolderPage (res: ServerResponse) {
  const files: File[] = res.payload as File[];
  const fileCompList = files.map((file: File) => {
    const ext = extname(file.path);
    let filePath = '';
    
    if (ext === '.mp4' || ext === '') {
      filePath = file.path;
    } else {
      filePath = 'http://home.hyunsub.kim:8080' + file.path + "?raw";
    }
    
    return (
      <tr key={ file.name }>
        <td><a href={ `${filePath}` }>{ file.name + ((file.isDir) ? '/' : '') }</a></td>
        <td>{ file.size || '-' }</td>
      </tr>  
    )
  });
  
  return (
    <table>
      <thead>
        <tr>
          <th>제목</th>
          <th>크기</th>
        </tr>
      </thead>
      <tbody>
        { fileCompList }
      </tbody>
    </table>
  )
}

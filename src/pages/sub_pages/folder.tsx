import React from 'react';
import { ServerResponse, File } from '../../models';

export default function FolderPage (res: ServerResponse) {
  const files: File[] = res.payload as File[];
  const fileCompList = files.map((file: File) => (
    <tr key={ file.name }>
      <td><a href={ `${file.path}` }>{ file.name + ((file.isDir) ? '/' : '') }</a></td>
      <td>{ file.size || '-' }</td>
    </tr>  
  ));
    
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

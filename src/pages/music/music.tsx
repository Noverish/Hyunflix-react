import React from 'react';

import { MainLayout } from 'components';

interface Props {
  
}

interface State {
  
}

class MusicPage extends React.Component<Props, State> {
  render() {
    return (
      <MainLayout>
        <audio controls loop style={{ width: '100%' }}>
          <source src="http://home.hyunsub.kim:8081/archive/Musics/Others/추억/듣기용/Wizard Of OZ.mp3" type="audio/mpeg" />
        </audio>
      </MainLayout>
    )
  }
}

export default MusicPage;
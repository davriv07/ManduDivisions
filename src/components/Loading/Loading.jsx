import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

function Loading() {
  return (
    <div
      style={{
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: 99,
        margin: 0,
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.4)',
        textAlign: 'center',
      }}
    >
      <LoadingOutlined
        style={{ fontSize: '12rem', color: 'ActiveBorder' }}
        spin
      />
    </div>
  );
}

export default Loading;

import React from 'react';
import './FaceRecognition.css';

const faceRecognition = ({ imageUrl, box }) => {
  return (
    <div>
      <div className='absolute mt2'>
        <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto' align='middle'/>
        <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
      </div>
    </div>
  );
}

export default faceRecognition;

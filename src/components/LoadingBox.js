import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';

export default function LoadingBox() {
 return (
  <div className="loading">
   <CircularProgress
    sx={{
     alignItems: 'center'
    }}
    disableShrink
   />
  </div>
 );
}

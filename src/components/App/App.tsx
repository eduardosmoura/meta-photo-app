import React, { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PhotoGallery = React.lazy(() => import('../PhotoGallery/PhotoGallery'));

const App: React.FC = () => {
  return (
    <div>
      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <PhotoGallery />
      </Suspense>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;

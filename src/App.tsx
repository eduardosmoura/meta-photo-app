import React, { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import { Loading } from 'components/Loading/Loading';
import 'react-toastify/dist/ReactToastify.css';

const PhotoGallery = React.lazy(
  () => import('./components/PhotoGallery/PhotoGallery')
);

const App: React.FC = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <PhotoGallery />
      </Suspense>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;

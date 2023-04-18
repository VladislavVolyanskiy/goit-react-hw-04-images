// import { Component } from 'react';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { ImageGallery } from '../ImageGallery/ImageGallery';
import { SearchBar } from '../SearchBar/SearchBar';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { PicsApi } from '../../api/PicsApi';

import css from './App.module.css';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [totalHits, setTotalHits] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tags, setTags] = useState('');
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    const onFetchDataHandle = async () => {
      setStatus(STATUS.PENDING);
      setIsLoading(false);

      try {
        const { hits, totalHits } = await PicsApi(searchQuery, page);

        if (totalHits === 0) {
          setStatus(STATUS.IDLE);
          return toast('No images found!', {
            icon: '🙈',
          });
        }

        const newImages = result(hits);

        if (page > 1) {
          return setImages(images => [...images, ...newImages], totalHits);
        }
        setImages(newImages);
        setStatus(STATUS.RESOLVED);
        setTotalHits(totalHits);
      } catch (error) {
        setStatus(STATUS.REJECTED);
        toast.error('This is an error!');
        console.log(error);
      } finally {
        setIsLoading(false);
        setStatus(STATUS.IDLE);
      }
    };
    onFetchDataHandle();
  }, [page, searchQuery]);

  const handleFormSubmit = newSearchQuery => {
    if (newSearchQuery === searchQuery) {
      return toast('Pictures on this query have already been requested!', {
        icon: '⚠️',
      });
    }
    setSearchQuery(newSearchQuery);
    setPage(1);
    setImages([]);
    setStatus(STATUS.IDLE);
    setTotalHits(null);
  };

  const loadMore = () => {
    setPage(page => page + 1);
  };

  const result = data => {
    return data.map(({ id, tags, largeImageURL, webformatURL }) => ({
      id,
      tags,
      largeImageURL,
      webformatURL,
    }));
  };

  const isLoadMoreBtnVisible = () => {
    const hitsExceedPage = totalHits - page * 12;
    if (hitsExceedPage > 0) {
      return !isLoading;
    }
    return false;
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openModal = (largeImageURL, tags) => {
    toggleModal();
    setTags(tags);
    setLargeImageURL(largeImageURL);
  };

  return (
    <div className={css.App}>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
        }}
      />
      {isLoading && <Loader />}
      <SearchBar onSubmit={handleFormSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal}></ImageGallery>
      )}
      {status === 'pending' && <Loader />}
      {isLoadMoreBtnVisible() && <Button onLoadMore={loadMore}></Button>}
      {showModal && (
        <Modal
          onModalClick={toggleModal}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      )}
    </div>
  );
}

// import { Component } from 'react';
// import toast, { Toaster } from 'react-hot-toast';

// import { ImageGallery } from '../ImageGallery/ImageGallery';
// import { SearchBar } from '../SearchBar/SearchBar';
// import { Loader } from '../Loader/Loader';
// import { Button } from '../Button/Button';
// import { Modal } from '../Modal/Modal';
// import { PicsApi } from '../../api/PicsApi';

// import css from './App.module.css';

// const STATUS = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
// };

// export class App extends Component {
//   state = {
//     searchQuery: '',
//     page: 1,
//     images: [],
//     error: null,
//     status: STATUS.IDLE,
//     totalHits: null,
//   };

//   componentDidUpdate = (_, prevState) => {
//     const prevQuery = prevState.searchQuery;
//     const newQuery = this.state.searchQuery;
//     const prevPage = prevState.page;
//     const newPage = this.state.page;

//     if (prevQuery !== newQuery || prevPage !== newPage)
//       this.onFetchDataHandle();
//   };

//   handleFormSubmit = searchQuery => {
//     if (searchQuery === this.state.searchQuery) {
//       return toast('Pictures on this query have already been requested!', {
//         icon: '⚠️',
//       });
//     }
//     this.setState({
//       searchQuery,
//       page: 1,
//       images: [],
//       status: STATUS.IDLE,
//       totalHits: null,
//     });
//   };

//   loadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   result = data => {
//     return data.map(({ id, tags, largeImageURL, webformatURL }) => ({
//       id,
//       tags,
//       largeImageURL,
//       webformatURL,
//     }));
//   };

//   onFetchDataHandle = async () => {
//     const { searchQuery, page } = this.state;
//     this.setState({ isLoading: false, status: STATUS.PENDING });
//     try {
//       const { hits, totalHits } = await PicsApi(searchQuery, page);

//       if (totalHits === 0) {
//         this.setState({ status: STATUS.IDLE });
//         return toast('No images found!', {
//           icon: '🙈',
//         });
//       }

//       const newImages = this.result(hits);

//       if (page > 1) {
//         return this.setState(({ images }) => ({
//           images: [...images, ...newImages],
//           totalHits,
//         }));
//       }

//       this.setState({
//         status: STATUS.RESOLVED,
//         images: newImages,
//         totalHits: totalHits,
//       });
//     } catch (error) {
//       this.setState({ error, status: STATUS.REJECTED });
//       toast.error('This is an error!');
//       console.log(error);
//     } finally {
//       this.setState({ isLoading: false, status: STATUS.IDLE });
//     }
//   };

//   isLoadMoreBtnVisible = () => {
//     const hitsExceedPage = this.state.totalHits - this.state.page * 12;
//     if (hitsExceedPage > 0) {
//       return !this.state.isLoading;
//     }
//     return false;
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   openModal = (largeImageURL, tags) => {
//     this.toggleModal();
//     this.setState({
//       largeImageURL,
//       tags,
//     });
//   };

//   render() {
//     const { images, status, largeImageURL, tags, showModal, isLoading } =
//       this.state;
//     return (
//       <div className={css.App}>
//         <Toaster
//           position="top-right"
//           toastOptions={{
//             duration: 2500,
//           }}
//         />
//         {isLoading && <Loader />}
//         <SearchBar onSubmit={this.handleFormSubmit} />
//         {images.length > 0 && (
//           <ImageGallery
//             images={images}
//             openModal={this.openModal}
//           ></ImageGallery>
//         )}
//         {status === 'pending' && <Loader />}
//         {this.isLoadMoreBtnVisible() && (
//           <Button onLoadMore={this.loadMore}></Button>
//         )}
//         {showModal && (
//           <Modal
//             onModalClick={this.toggleModal}
//             largeImageURL={largeImageURL}
//             tags={tags}
//           />
//         )}
//       </div>
//     );
//   }
// }

// import React, { Component } from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import css from './Modal.module.css';

export function Modal({ onModalClick, largeImageURL, tags }) {
  useEffect(() => {
    const onEscDown = e => {
      if (e.code === 'Escape') {
        onModalClick();
      }
    };
    window.addEventListener('keydown', onEscDown);

    return () => {
      window.removeEventListener('keydown', onEscDown);
    };
  }, [onModalClick]);

  const onOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onModalClick();
    }
  };

  return (
    <div className={css.Overlay} onClick={onOverlayClick}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onModalClick: PropTypes.func.isRequired,
};

// import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// import css from './Modal.module.css';

// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.onEscDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.onEscDown);
//   }

//   onEscDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onModalClick();
//     }
//   };

//   onOverlayClick = e => {
//     if (e.target === e.currentTarget) {
//       this.props.onModalClick();
//     }
//   };

//   render() {
//     const { largeImageURL, tags } = this.props;
//     return (
//       <div className={css.Overlay} onClick={this.onOverlayClick}>
//         <div className={css.Modal}>
//           <img src={largeImageURL} alt={tags} />
//         </div>
//       </div>
//     );
//   }
// }

// Modal.propTypes = {
//   largeImageURL: PropTypes.string.isRequired,
//   tags: PropTypes.string.isRequired,
//   onModalClick: PropTypes.func.isRequired,
// };

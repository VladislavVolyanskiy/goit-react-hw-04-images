// import React, { Component } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

import css from './SearchBar.module.css';
import { ImSearch } from 'react-icons/im';

export function SearchBar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleTextChange = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchQuery.trim() === '') {
      toast('Type something in the search field', {
        icon: '👋',
      });
      return;
    }
    onSubmit(searchQuery);
    // input reset is now disabled
    // setSearchQuery('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <ImSearch className={css.SearchImg} />
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleTextChange}
        />
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import toast from 'react-hot-toast';

// import css from './SearchBar.module.css';
// import { ImSearch } from 'react-icons/im';

// export class SearchBar extends Component {
//   state = {
//     searchQuery: '',
//   };

//   handleNameChange = event => {
//     this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = event => {
//     event.preventDefault();

//     if (this.state.searchQuery.trim() === '') {
//       toast('Type something in the search field', {
//         icon: '👋',
//       });
//       return;
//     }

//     this.props.onSubmit(this.state.searchQuery);

//     // input reset is now disabled
//     // this.setState({ searchQuery: '' });
//   };
//   render() {
//     return (
//       <header className={css.Searchbar}>
//         <form className={css.SearchForm} onSubmit={this.handleSubmit}>
//           <button type="submit" className={css.SearchFormButton}>
//             <ImSearch className={css.SearchImg} />
//           </button>

//           <input
//             className={css.SearchFormInput}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={this.state.searchQuery}
//             onChange={this.handleNameChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }

// SearchBar.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };

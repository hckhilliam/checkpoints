import './SearchBar.scss';

import * as React from 'react';
import { connect } from 'react-redux';

import Input from './Input';
import Button from './Button';
import UserProfile from './UserProfile';

import { List, ClickableListItem } from './List';
import { searchGeneral } from '../actions/search';
import { openDropdownList, closeDropdownList } from '../actions/dropdownlist';
import { openDialog } from '../actions/dialog';

interface SearchProps {
  deepSearch?: (query: string) => void;
  results?: Checkpoints.SearchResult[];
  onChange?: (results: Checkpoints.SearchResult[], anchor: HTMLElement) => void;
  onSelectUser?: (user: Checkpoints.User) => void;
}

interface SearchState {
  searchText?: string;
}

export class SearchBar extends React.Component<SearchProps, SearchState> {
  state: SearchState = {
    searchText: '',
  };

  anchor: HTMLElement;

  search = (searchQuery) => {
    this.props.deepSearch(searchQuery);
    this.filter(searchQuery, this.props.results);
  };

  filter = (searchQuery, results: Checkpoints.SearchResult[]) => {
    let searchRegEx = new RegExp('\\b' + searchQuery, 'i');
    this.props.onChange(results.filter(r => {
      if (searchRegEx.test(r.name)) {
        r.show = true;
      } else {
        r.show = false;
      }
      return true;
    }), this.anchor);
  }

  editSearch = (event) => {
    this.setState({ searchText: event.target.value });
    this.search(event.target.value);
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.search(this.state.searchText);
  }

  componentWillReceiveProps(nextProps: SearchProps) {
    this.filter(this.state.searchText, nextProps.results);
  }

  render() {
    const { results } = this.props;
    return (
      <form className="SearchBar" onSubmit={this.onSubmit} autoComplete="off">
        <div className="SearchBar-Dropdown" ref={e => this.anchor = e}>
          <Input placeholder="Search" name="search" value={this.state.searchText} onChange={this.editSearch}/>
        </div>
        <Button type="submit">
          <i className="fa fa-search" aria-hidden="true"></i>
        </Button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    results: state.search
  };
};

const mapDispatchToProps = (dispatch, ownProps: SearchProps) => {
  return {
    deepSearch: _.debounce((query: string) => { dispatch(searchGeneral(query)); }, 250, { leading: true, maxWait: 500 }),
    onChange: (results: Checkpoints.SearchResult[], anchor: HTMLElement) => {
      const onSelectUser = (user: Checkpoints.User) => {
        dispatch(closeDropdownList());
        dispatch(openDialog(<UserProfile userId={user.id} />, {
          size: 'Large'
        }));
      };

      dispatch(openDropdownList(
        results.map(r => {
          if (r.show) {
            let picture = r.picture ? <img className="display" src={r.picture.url} /> : null;
            return (
              <ClickableListItem key={r.id} onClick={() => onSelectUser(r)}>
              {/*}   <span className="SearchBar-ResultIcon">
                  { r.type=="user" && <i className="fa fa-user" aria-hidden="true"></i> }
                  { r.type=="event" && <i className="fa fa-calendar" aria-hidden="true"></i> }
                  { r.type=="checkpoint" && <i className="fa fa-check-circle-o" aria-hidden="true"></i> }
                </span>*/}
                {picture}
                <div className="name">{r.name}</div>
              </ClickableListItem>
            );
          }
        }),
        { anchor: anchor }
      ));
    }
  };
};

const SearchBarContainer = connect(mapStateToProps, mapDispatchToProps)(SearchBar);
export default SearchBarContainer;


import './SearchBar.scss';

import * as React from 'react';
import { connect } from 'react-redux';

import { searchGeneral } from '../actions/search';

import Input from './Input';
import Button from './Button';
import { List, ClickableListItem } from './List';

interface SearchProps {
  search?: (string) => void;
  results?: Checkpoints.SearchResults[];
}

interface SearchState {
  searchText?: string;
}

export class SearchBar extends React.Component<SearchProps, SearchState> {
  state: SearchState = {
    searchText: ""
  };

  editSearch = (event) => {
    this.setState({searchText: event.target.value});
    this.props.search(event.target.value);
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.search(this.state.searchText);
  }

  selectResult = (event) => {

  }

  render() {
    const { results } = this.props;
    return (
      <form className="SearchBar" onSubmit={this.onSubmit} autoComplete="off">
        <div className="SearchBar-Dropdown">
          <Input placeholder="Search" name="search" value={this.state.searchText} onChange={this.editSearch}/>
          <List className="SearchBar-List">
            {
              results.map(r => {
                let id = r.name;
                return (
                  <ClickableListItem key={id} onClick={this.selectResult}>
                    <span className="SearchBar-ResultIcon">
                      { r.type=="user" && <i className="fa fa-user" aria-hidden="true"></i> }
                      { r.type=="event" && <i className="fa fa-calendar" aria-hidden="true"></i> }
                      { r.type=="checkpoint" && <i className="fa fa-check-circle-o" aria-hidden="true"></i> }
                    </span>
                    { r.name }
                  </ClickableListItem>
                );
              })
            }
          </List>
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

const mapDispatchToProps = dispatch => {
  return {
    search: (query: string) => {
      dispatch(searchGeneral(query));
    }
  };
};

const SearchBarContainer = connect(mapStateToProps, mapDispatchToProps)(SearchBar);
export default SearchBarContainer;


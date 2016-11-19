import './SearchBar.scss';

import * as React from 'react';
import { connect } from 'react-redux';

import { searchGeneral } from '../actions/search';

import Input from './Input';
import Button from './Button';
import { List, ClickableListItem } from './List';

interface SearchProps {
  deepSearch?: (query: string) => void;
  results?: Checkpoints.SearchResult[];
}

interface SearchState {
  searchText?: string;
  results?: Checkpoints.SearchResult[];
}

export class SearchBar extends React.Component<SearchProps, SearchState> {
  state: SearchState = {
    searchText: "",
    results: []
  };

  search = (event) => {
    this.props.deepSearch(event.target.value);
    this.filter(event.target.value, this.state.results);
  };

  filter = (searchQuery, results: Checkpoints.SearchResult[]) => {
    let searchRegEx = new RegExp('\\b' + searchQuery, 'i');
    this.setState({ results: results.filter(r => {
        if (searchRegEx.test(r.name)) {
          r.show = true;
        } else {
          r.show = false;
        }
        return true;
      })
    });
  }

  editSearch = (event) => {
    this.setState({ searchText: event.target.value });
    this.search(event);
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.search(event);
  }

  selectResult = (event) => {

  }

  componentWillReceiveProps(nextProps: SearchProps) {
    this.filter(this.state.searchText, nextProps.results);
  }

  render() {
    const { results } = this.state;
    return (
      <form className="SearchBar" onSubmit={this.onSubmit} autoComplete="off">
        <div className="SearchBar-Dropdown">
          <Input placeholder="Search" name="search" value={this.state.searchText} onChange={this.editSearch}/>
          <List className="SearchBar-List">
            {
              results.map(r => {
                if (r.show) {
                  let picture = r.picture ? <img className="display" src={r.picture.url} /> : null;
                  return (
                    <ClickableListItem key={r.id} onClick={this.selectResult}>
                    {/*}   <span className="SearchBar-ResultIcon">
                        { r.type=="user" && <i className="fa fa-user" aria-hidden="true"></i> }
                        { r.type=="event" && <i className="fa fa-calendar" aria-hidden="true"></i> }
                        { r.type=="checkpoint" && <i className="fa fa-check-circle-o" aria-hidden="true"></i> }
                      </span>*/}
                      {picture}
                      {r.name}
                    </ClickableListItem>
                  );
                }
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
    deepSearch: _.debounce((query: string) => { dispatch(searchGeneral(query)); }, 250, { leading: true, maxWait: 500 })
  };
};

const SearchBarContainer = connect(mapStateToProps, mapDispatchToProps)(SearchBar);
export default SearchBarContainer;


import React, { useEffect, useState } from 'react';
import filmApi from '../api/film';
import ReactSelect from 'react-select/async';
import { components } from 'react-select';
import Image from './Image';

export const IconOption = (props) => {
  const { Option } = components;
  const { Poster, Year, Title } = props.data?.data ?? {};
  return (
    <Option {...props}>
      <div style={{ display: 'flex', cursor: 'pointer' }}>
        <Image
          src={Poster}
          style={{ width: 48, height: 48, borderRadius: '50%' }}
          alt={Title}
        />
        <div className='ml-sm'>
          {props.children}
          <div style={{ display: 'flex', color: 'rgba(0,0,0,0.6)' }}>
            <span>{Year}</span>
          </div>
        </div>
      </div>
    </Option>
  );
};

export const Menu = (props) => {
  return (
    <>
      <components.Menu {...props}>
        <div>
          {props.selectProps.fetchingData ? (
            <span className='fetching'>Fetching data...</span>
          ) : (
            <div>{props.children}</div>
          )}
          <div
            style={{ width: '100%', cursor: 'pointer' }}
            role='button'
            tabIndex={0}
            className='d-flex center padding-md hover-highlight hover-highlight-bg'
            onClick={() =>
              props.selectProps.onClickSearch(props.selectProps.inputValue)
            }
          >
            Search all result for "{props.selectProps.inputValue}"
          </div>
        </div>
      </components.Menu>
    </>
  );
};

const SearchMovie = ({ onChange, onSearch, onInputChange, inputValue }) => {
  const [open, setOpen] = useState(false);

  const fetchByKeyword = async (keyword) => {
    const { data } = await filmApi.search({ keyword, page: 1 });
    const searchOption =
      data?.Search?.map((search) => ({
        label: search.Title,
        value: search.imdbID,
        data: search,
      })) ?? [];
    return searchOption;
  };

  const handleSearch = async (keyword) => {
    const { data } = await filmApi.search({ keyword, page: 1 });
    setOpen(false);
    if (onSearch) {
      onSearch(data, keyword);
    }
  };

  const [portal, setPortal] = useState();
  useEffect(() => {
    setPortal(document.body);
  }, []);

  return (
    <div className='d-flex' style={{ width: '100%' }}>
      <div style={{ flex: 1 }}>
        <ReactSelect
          components={{
            // ValueContainer: IconValueContainer,
            Menu,
            IndicatorSeparator: () => <div />,
            DropdownIndicator: SearchIcon,
            Option: IconOption,
          }}
          onChange={onChange}
          styles={{
            control: (provided) => ({
              ...provided,
              height: '100%',
              minHeight: 56,
            }),
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            valueContainer: (base) => ({
              ...base,
              paddingLeft: 24,
              paddingRight: 24,
            }),
          }}
          autoFocus={false}
          onClickSearch={handleSearch}
          onInputChange={(e, action) => {
            if (onInputChange) onInputChange(e, action);

            if (action.action === 'menu-close') {
              setOpen(false);
            } else {
              setOpen(true);
            }
          }}
          menuIsOpen={open}
          inputValue={inputValue}
          menuPortalTarget={portal}
          loadOptions={fetchByKeyword}
          placeholder='Type minimum of 3 letter to search...'
          isClearable
        />
      </div>
    </div>
  );
};

const SearchIcon = (props) => {
  return (
    <div
      style={{
        padding: 12,
        marginRight: 12,
        cursor: 'pointer',
        borderRadius: '50%',
      }}
      onClick={() => {
        props.selectProps.onClickSearch(props.selectProps.inputValue);
      }}
      role='button'
      className='d-flex center hover-highlight-bg hover-highlight'
    >
      <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} {...props}>
        <path d='M9 2C5.146 2 2 5.146 2 9s3.146 7 7 7a6.959 6.959 0 004.574-1.719l.426.426V16l6 6 2-2-6-6h-1.293l-.426-.426A6.959 6.959 0 0016 9c0-3.854-3.146-7-7-7zm0 2c2.773 0 5 2.227 5 5s-2.227 5-5 5-5-2.227-5-5 2.227-5 5-5z' />
      </svg>
    </div>
  );
};
export default SearchMovie;

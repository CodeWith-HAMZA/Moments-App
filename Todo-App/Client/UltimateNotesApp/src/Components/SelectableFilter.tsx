import React from 'react';
import { Select } from 'antd';
import { NotesFilterSelectionList } from '../Utils/Constants';

const handleChange = (value: { value: string; label: React.ReactNode }) => {
  console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
};

const SelectableFilter: React.FC = (): JSX.Element => (
  <Select
    labelInValue
    defaultValue={{ value: 'title', label: 'Find By Title' }}
    style={{ width: 120 }}
    onChange={handleChange}
    options={NotesFilterSelectionList}
  />
);

export default SelectableFilter;

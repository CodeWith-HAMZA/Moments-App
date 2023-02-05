import React, { useContext, useState } from "react";
import { Select, Space } from "antd";
import Context from "../Context/Context";

const avalaibleCategories = ["Personal", "Educative", "Programming"];

// const cityData = {
//   Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
//   Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
// };

// type CityName = keyof typeof cityData;

const SelectCategory: React.FC = () => {
    const context = useContext(Context)
  const handleProvinceChange = (value: string) => {
    // console.log(value);
    context?.setChoosedCategory(value)
  };

  return (
    <Space wrap>
      <Select
        defaultValue={avalaibleCategories[0] as any}
        style={{ width: 120 }}
        onChange={handleProvinceChange}
        options={avalaibleCategories.map((availableCat, idx) => ({
          label: availableCat,
          value: availableCat ,
        }))}
      />
      {/* <Select
        defaultValue={avalaibleCategories[0] as any}
        style={{ width: 120 }}
        onChange={handleProvinceChange}
        options={avalaibleCategories.map((availableCat, idx) => ({
          label: availableCat,
          value: availableCat + idx.toString(),
        }))}
      /> */}
      {/* <Select
        style={{ width: 120 }}
        value={secondCity as any}
        onChange={onSecondCityChange}
        options={cities.map((city) => ({ label: city, value: city }))}
      /> */}
    </Space>
  );
};

export default SelectCategory;

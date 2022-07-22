import React from "react";
import ReactSelect from "react-select";
import { LanguageOptions } from "../../constants/LanguageOptions";
import { CustomStyles } from "../../constants/CustomStyles";

interface LanguageDropdownProps {
  onSelectChange: Function;
  language: object;
}

export default function LanguageDropdown(props: LanguageDropdownProps) {
  const { onSelectChange, language } = props;
  return (
    <ReactSelect
      id="long-value-select"
      instanceId="long-value-select"
      placeholder={`Filter By Category`}
      options={LanguageOptions}
      value={language}
      styles={CustomStyles}
      onChange={(selectedOption) => {
        onSelectChange(selectedOption);
      }}
    />
  );
}

import ReactSelect, { ActionMeta } from "react-select";
import { CustomStyles } from "../../constants/CustomStyles";
import { monacoThemes } from "../../lib/defineTheme";

interface ThemeDropdownProps {
  handleThemeChange: Function;
  theme: any;
}

export default function ThemeDropdown(props: ThemeDropdownProps) {
  const { handleThemeChange, theme } = props;
  return (
    <ReactSelect
      id="long-value-select"
      instanceId="long-value-select"
      placeholder={`Select Theme`}
      options={monacoThemes}
      value={theme}
      styles={CustomStyles}
      onChange={(selectedOption) => {
        handleThemeChange(selectedOption);
      }}
    />
  );
}

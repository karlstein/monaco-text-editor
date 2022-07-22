import { classnames } from "../../utils/general";

interface CustomInputProps {
  customInput: any;
  setCustomInput: any;
}

export default function CustomInput(props: CustomInputProps) {
  const { customInput, setCustomInput } = props;
  return (
    <>
      {" "}
      <textarea
        rows={5}
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`Custom input`}
        className={classnames(
          "focus:outline-none w-full border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white mt-2"
        )}
      />
    </>
  );
}

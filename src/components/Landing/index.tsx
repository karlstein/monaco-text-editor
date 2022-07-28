import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { LanguageOptions } from "../../constants/LanguageOptions";
import useKeyPress from "../../hooks/useKeyPress";
import { ThemeProps } from "../../interface/ThemeProps";
import { defineTheme } from "../../lib/defineTheme";
import { classnames } from "../../utils/general";
import CodeEditorWindow from "../CodeEditorWindow";
import CustomInput from "../CustomInput";
import Footer from "../Footer";
import ForMe from "../ForMe";
import LanguageDropdown from "../LanguageDropdown";
import OutputDetails from "../OutputDetails";
import OutputWindow from "../OutputWindow";
import ThemeDropdown from "../ThemeDropdown";

const javascriptDefault = `/**
* Problem: Binary Search: Search a sorted array for a target value.
*/

// Time: O(log n)
const binarySearch = (arr, target) => {
 return binarySearchHelper(arr, target, 0, arr.length - 1);
};

const binarySearchHelper = (arr, target, start, end) => {
 if (start > end) {
   return false;
 }
 let mid = Math.floor((start + end) / 2);
 if (arr[mid] === target) {
   return mid;
 }
 if (arr[mid] < target) {
   return binarySearchHelper(arr, target, mid + 1, end);
 }
 if (arr[mid] > target) {
   return binarySearchHelper(arr, target, start, mid - 1);
 }
};

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target = 5;
console.log(binarySearch(arr, target));
`;

export default function Landing() {
  const [code, setCode] = useState(javascriptDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState<Boolean | null>(null);
  const [theme, setTheme] = useState<ThemeProps>({
    value: "cobalt",
    label: "Cobalt",
  });
  const [language, setLanguage] = useState(LanguageOptions[0]);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Controll");

  const onSelectChange = (sl: any) => {
    console.log("Selected Option...", sl);
    setLanguage(sl);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);

  const onChange = (action: any, data: any) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      //   source_code: btoa(code)
      source_code: Buffer.from(code).toString("base64"),
      stdin: Buffer.from(customInput).toString("base64"),
    };

    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "6062811995mshfb495d145d52be9p172324jsn127e9efb903b",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        console.log(formData.source_code);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;

        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many request", status);

          showErrorToast(`Quota of 100 exceeded for the day!`, 10000);
        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  };

  const checkStatus = async (token: any) => {
    const options = {
      method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions" + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Key": "6062811995mshfb495d145d52be9p172324jsn127e9efb903b",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast("Compiled Successfully");
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast();
    }
  };

  function handleThemeChange(th: ThemeProps) {
    console.log("themeH...", th);
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(th);
    } else {
      defineTheme(th.value).then((_) => setTheme(th));
    }
  }

  useEffect(() => {
    defineTheme("oceanic-next").then((_) => {
      setTheme({ value: "oceanic-next", label: "Oceanic Next" });
    });
  }, []);

  const showSuccessToast = (msg: string) => {
    toast.success(msg || "Compiled Successfully!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const showErrorToast = (msg?: string, timer?: number) => {
    toast.error(msg || "Something went wrong! Please try again.", {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Link href="https://github.com/manuarora700/react-code-editor">
        <a
          title="Fork me on GitHub"
          className="github-corner"
          target="_blank"
          rel="noreferrer"
        >
          <ForMe />
        </a>
      </Link>

      <div className=" h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500" />
      <div className=" flex flex-row">
        <div className=" flex flex-shrink-0 w-[30%] h-full my-5 mx-4">
          <div className="">
            <p>data</p>
          </div>
        </div>
        <div className=" flex flex-col w-[65%] space-x-4 items-start px-5 py-4">
          <div className=" flex flex-row">
            <div className=" px-4 py-4">
              <LanguageDropdown
                onSelectChange={onSelectChange}
                language={language}
              />
            </div>
            <div className=" px-4 py-4">
              <ThemeDropdown
                handleThemeChange={handleThemeChange}
                theme={theme}
              />
            </div>
          </div>
          <div className=" flex flex-col w-full h-full justify-start">
            <CodeEditorWindow
              code={code}
              onChange={onChange}
              language={language?.value}
              theme={theme.value}
            />
          </div>

          {/* <div className=" right-container flex flex-shrink-0 w-[30%] flex-col">
          <OutputWindow outputDetails={outputDetails} />
          <div className=" flex flex-col items-end">
            <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
            <button
              onClick={handleCompile}
              disabled={!code}
              className={classnames(
                " mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                !code ? "opacity-50" : ""
              )}
            >
              {processing ? "Processing..." : "Compile and Execute"}
            </button>
          </div>
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}
        </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
}

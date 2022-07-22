interface OutputWindowProps {
  outputDetails: any;
}

export default function OutputWindow(props: OutputWindowProps) {
  const { outputDetails } = props;
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      return (
        <pre className=" px-2 py-1 font-normal text-xs text-red-500">
          {Buffer.from(outputDetails?.compile_output, "base64").toString(
            "utf-8"
          )}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre className=" px-2 py-1 font-normal text-xs text-red-500">
          {Buffer.from(outputDetails?.stdout, "base64").toString("utf-8") !==
          null
            ? `${Buffer.from(outputDetails?.stdout, "base64").toString(
                "utf-8"
              )}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre className=" px-2 py-1 font-normal text-xs text-red-500">
          {`Time Limit Exceedef`}
        </pre>
      );
    } else {
      return (
        <pre className=" px-2 py-1 font-normal text-xs text-red-500">
          {Buffer.from(outputDetails.stderr, "base64").toString("utf-8")}
        </pre>
      );
    }
  };

  return (
    <>
      <h1 className=" font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
        Output
      </h1>
      <div className=" w-full h-56 bg-[#1e293b] rounded-md text-white font-normal text-sm overflow-y-auto">
        {outputDetails ? <>{getOutput()}</> : null}
      </div>
    </>
  );
}

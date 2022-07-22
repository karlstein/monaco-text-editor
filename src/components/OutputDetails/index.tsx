interface OutputDetailsProps {
  outputDetails: any;
}

export default function OutputDetails(props: OutputDetailsProps) {
  const { outputDetails } = props;

  return (
    <div className=" metrics-container mt-4 flex flex-col space-y-3">
      <p className=" text-sm">
        Status:{" "}
        <span className=" font-semibold px2 py1 rounded-md bg-gray-100">
          {outputDetails?.status?.description}
        </span>
      </p>
      <p className=" text-sm">
        Memory:{" "}
        <span className=" font-semibold px2 py1 rounded-md bg-gray-100">
          {outputDetails?.memory}
        </span>
      </p>
      <p className=" text-sm">
        Time:{" "}
        <span className=" font-semibold px2 py1 rounded-md bg-gray-100">
          {outputDetails?.time}
        </span>
      </p>
    </div>
  );
}

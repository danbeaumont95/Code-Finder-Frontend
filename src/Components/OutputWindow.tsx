import React from 'react';
import '../Styles/OutputWindow.css';

function OutputWindow({ outputDetails }: any) {
  const getOutput = () => {
    const statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // compilation error
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {atob(outputDetails?.compile_output)}
        </pre>
      );
    } if (statusId === 3) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-green-500">
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } if (statusId === 5) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          Time Limit Exceeded
        </pre>
      );
    }
    return (
      <pre className="px-2 py-1 font-normal text-xs text-red-500">
        {atob(outputDetails?.stderr)}
      </pre>
    );
  };
  return (
    <div className="output">
      <h1 style={{ color: 'lime' }}>
        Output dan
      </h1>

      <h6 style={{ color: 'lime' }}>

        {outputDetails ? <>{getOutput()}</> : null}
      </h6>

    </div>
  );
}

export default OutputWindow;

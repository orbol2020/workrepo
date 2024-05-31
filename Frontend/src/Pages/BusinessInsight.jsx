import React, { useState, useCallback } from "react";



const BusinessInsight = () => {
  const [options, setOptions] = useState([]);
  const [text, setText] = useState("");
  const [value, setValue] = useState("");

  const handleTextChange = useCallback(
    (changeEvent) => {
      setText(changeEvent.currentTarget.value);
    },
    [setText]
  );

  const handleValueChange = useCallback(
    (changeEvent) => {
      setValue(changeEvent.currentTarget.value);
    },
    [setValue]
  );

  const handleSubmit = useCallback(
    
    (submitEvent) => {
      submitEvent.preventDefault();

      setOptions([
        ...options,
        {
          key: window.crypto.randomUUID(),
          text,
          value,
        },
      ]);
    },
    [text, value, options, setOptions]

    
  );


  return (
    <>
      <div className="bg-gray-30">
        <div className="container flex items-start justify-start min-h-screen px-6 mx-auto flex-wrap content-start w-full mt-14 overflow-hidden">
          <div className="border-2 h-[300px] w-[400px] rounded-lg overflow-hidden">
            <div className="h-[40px] w-[400px] flex justify-center items-center text-white bg-blue-500  border-b-2 overflow-hidden">
                <h2>Edit Cities Field</h2>
            </div>
            <form onSubmit={handleSubmit} className=" px-4">
              <div>
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  City
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[50%] p-2.5 mt-2"
                  placeholder="Enter New City Name"
                  required
                  onChange={handleTextChange}
                />
              </div>
              {/* <label htmlFor="text">Text</label>
              <input
                id="text"
                type="text"
                value={text}
                onChange={handleTextChange} */}
              {/* /> */}

              <div>
                {/* <label htmlFor="value">
            Value
          </label>
          <input id="value" type="text" value={value} onChange={handleValueChange} /> */}
              </div>
              <button
                type="submit"
                className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md flex justify-center items-center gap-1 hover:bg-blue-400"
              >
                Add
              </button>
            </form>

            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  px-4 mt-6">Select an option</label>
            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[50%] p-2.5  ml-4">
              <option value="">Delhi</option>
              <option value="">Mumbai</option>
              {options.map((currentOption) => (
                <option key={currentOption.key} value={currentOption.value}>
                  {currentOption.text}
                </option>
              ))}
            </select>


          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessInsight;

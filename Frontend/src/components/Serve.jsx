import React, { useState } from "react";
import { MdOpenInNew } from "react-icons/md";
import './CardForm.css';
import UploadWidget from "./UploadWidget.jsx";
import CardForm from './CardForm.jsx';
import TheatricalForm from './TheatricalForm.jsx';

const Serve = ({ data }) => {
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState('');
  const [selectedCardId, setSelectedCardId] = useState('');

  const resetForm = () => {
    setFormType('');
    setSelectedCardId('');
    setShowForm(false);
  };

  const toggleFormVisibility = () => {
    setShowForm(prevShowForm => !prevShowForm);
  };

  if (data.title === "Home Screen") {
    return (
      <div>
        <div className="relative w-[250px] h-[330px] rounded-3xl overflow-hidden mr-3 mb-4">
          <div className="rt h-full w-full bg-[url('/src/assets/the.jpeg')] bg-no-repeat bg-cover bg-center">
            <div className="absolute h-1 w-12 rounded-2xl bg-white top-52 left-[100px]"></div>
            <h3 className="text-white absolute top-56 text-center w-full text-xl font-semibold">
              {data.title}
            </h3>
          </div>
          <div className="absolute bottom-0 w-full h-10 flex justify-center items-center gap-2 text-white cursor-pointer">
            <MdOpenInNew style={{ fontSize: "1.2rem" }} />
            <button onClick={toggleFormVisibility}><h2>MAKE CHANGES</h2></button>
          </div>
        </div>
        {showForm && (
          <>
            <CardForm
              formType={formType}
              setFormType={setFormType}
              selectedCardId={selectedCardId}
              setSelectedCardId={setSelectedCardId}
              resetForm={resetForm}
            />
            <div className="cloud-widget">
              <UploadWidget />
            </div>
          </>
        )}
      </div>
    );
  } else if (data.title === "Theatrical") {
    return (
      <div>
        <div className="relative w-[250px] h-[330px] rounded-3xl overflow-hidden mr-3 mb-4">
          <div className="rt h-full w-full bg-[url('/src/assets/the.jpeg')] bg-no-repeat bg-cover bg-center">
            <div className="absolute h-1 w-12 rounded-2xl bg-white top-52 left-[100px]"></div>
            <h3 className="text-white absolute top-56 text-center w-full text-xl font-semibold">
              {data.title}
            </h3>
          </div>
          <div className="absolute bottom-0 w-full h-10 flex justify-center items-center gap-2 text-white cursor-pointer">
            <MdOpenInNew style={{ fontSize: "1.2rem" }} />
            <button onClick={toggleFormVisibility}><h2>MAKE CHANGES</h2></button>
          </div>
        </div>
        {showForm && (
          <>
            <TheatricalForm
              formType={formType}
              setFormType={setFormType}
              resetForm={resetForm}
            />
            <div className="cloud-widget">
              <UploadWidget />
            </div>
          </>
        )}
      </div>
    );
  } else {
    return (
      <div className="relative w-[250px] h-[330px] rounded-3xl overflow-hidden mr-3 mb-4">
        <div className="rt h-full w-full bg-[url('/src/assets/the.jpeg')] bg-no-repeat bg-cover bg-center">
          <div className="absolute h-1 w-12 rounded-2xl bg-white top-52 left-[100px]"></div>
          <h3 className="text-white absolute top-56 text-center w-full text-xl font-semibold">
            {data.title}
          </h3>
        </div>
        <div className="absolute bottom-0 w-full h-10 flex justify-center items-center gap-2 text-white cursor-pointer">
          <MdOpenInNew style={{ fontSize: "1.2rem" }} />
          <h2>VIEW DETAILS</h2>
        </div>
      </div>
    );
  }
};

export default Serve;

import React from "react";
import Serve from "../components/Serve.jsx";

const Service = () => {
  const data = [
    { title: "Theatrical", page: "theatrical" },
    { title: "Mangazine", page: "theatrical" },
    { title: "Branded Kiosk", page: "theatrical" },
    { title: "Voucher Distribution", page: "theatrical" },
    { title: "Flight Ticket", page: "theatrical" },
    { title: "Commercial Video Ad", page: "theatrical" },
    { title: "Commercial Visual Photo Ad", page: "theatrical" },
    { title: "Business Insight", page: "businessInsight" },
    { title: "Home Screen", page: "theatrical" },
  ];

  return (
    <div className="container mx-auto px-6 py-4">
      <div className="flex flex-wrap items-start justify-center">
        {data.map((item, index) => (
          <Serve data={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Service;

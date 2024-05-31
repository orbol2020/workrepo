import { PencilRuler, Image, Shield, Settings, User } from "lucide-react";
import React, { useState } from "react";

const SideNav = ({selectedIndex}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const menuList = [
    {
      id: 1,
      name: "Servies",
      icon: PencilRuler,
    },
    {
      id: 2,
      name: "Users",
      icon: User,
    },
    {
      id: 3,
      name: "Settings",
      icon: Settings,
    },
  ];
  return (
    <div className="border shadow-sm h-screen">
      <div>
        {menuList.map((menu, index) => (
          <h2
            onClick={() => {setActiveIndex(index)
              selectedIndex(index)
            }}
            className={`p-3 text-lg px-7 text-white-500 my-2 cursor-pointer hover:bg-blue-400 hover:text-white flex items-center gap-2 text-bold
                ${activeIndex==index&&'bg-blue-400 text-white'}`}
            key={index}
          >
            <menu.icon />
            {menu.name}
          </h2>
        ))}
      </div>
    </div>
  );
};

export default SideNav;

import React from "react";
import AllProduct from "../component/AllProduct";

const MenuList = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Our Menu
      </h1>

      <AllProduct heading={""} />
    </div>
  );
};

export default MenuList;

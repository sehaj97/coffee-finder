"use client";
import Banner from "./top-banner.client";
const NearbyCoffeeStores = () => {
  return (
    <section className="mb-12 grid lg:mb-24 lg:grid-cols-2 mx-0 lg:mx-[300px]">
      <div>
        <Banner buttonText="View Your Local Coffee Shops" />
      </div>
    </section>
  );
};

export default NearbyCoffeeStores;

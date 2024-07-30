import React from "react";
import Image from "next/image";
import Link from "next/link";

const ProductsBentoGrid = ({ path }: { path: string }) => {
  return (
    <>
      <div className="header">
        <h3>All categories</h3>
        <p>here you can find all the categories of products that we have</p>
      </div>

      <section className="bento-grid grid-rows-3 grid-cols-3">
        {/* Fashion and Apparel */}
        <Link
          href={path + "/fashion-and-apparel"}
          className="bento-element row-span-3 !h-full"
        >
          <span className="overlay"></span>
          <Image
            src="/assets/products_categories/Fashion and Apparel.jpg"
            width={800}
            height={800}
            alt="Fashion and Apparel"
          />

          <p className="centre-p bg-[#847359]">Fashion and Apparel</p>
        </Link>
        {/* Electronics */}
        <Link href={path + "/electronics"} className="bento-element col-span-2">
          <span className="overlay"></span>
          <Image
            src="/assets/products_categories/Electronics.jpg"
            width={800}
            height={800}
            alt="Electronics"
          />

          <p className="centre-p bg-[#821D6D]">Electronics</p>
        </Link>
        {/* Home and Kitchen */}
        <Link
          href={path + "/home-and-kitchen"}
          className="bento-element col-span-2"
        >
          <span className="overlay"></span>
          <Image
            src="/assets/products_categories/Home and Kitchen.jpg"
            width={800}
            height={800}
            alt="Home and Kitchen"
          />

          <p className="centre-p bg-[#858585]">Home and Kitchen</p>
        </Link>
        {/* Beauty and Personal Care */}
        <Link
          href={path + "/beauty-and-personal-care"}
          className="bento-element"
        >
          <span className="overlay"></span>
          <Image
            src="/assets/products_categories/Beauty and Personal Care.jpg"
            width={800}
            height={800}
            alt="Beauty and Personal Care"
          />

          <p className="centre-p bg-[#193204]">Beauty and Personal Care</p>
        </Link>
        {/* Health and Wellness */}
        <Link href={path + "/health-and-wellness"} className="bento-element">
          <span className="overlay"></span>
          <Image
            src="/assets/products_categories/Health and Wellness.jpg"
            width={800}
            height={800}
            alt="Health and Wellness"
          />

          <p className="centre-p bg-[#7D2527]">Health and Wellness</p>
        </Link>
      </section>
    </>
  );
};

export default ProductsBentoGrid;

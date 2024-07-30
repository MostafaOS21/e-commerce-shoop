import Image from "next/image";
import React from "react";

// export const categories = [
//   "Electronics",
//   "Home and Kitchen",
//   "Fashion and Apparel",
//   "Beauty and Personal Care",
//   "Health and Wellness",
// ];

// .bento-grid {
//   @apply grid gap-4;
// }

// .bento-element {
//   @apply overflow-hidden relative rounded-lg shadow-md;
// }

export default function Products() {
  return (
    <div>
      <div className="header">
        <h3>All categories</h3>
        <p>here you can find all the categories of products that we have</p>
      </div>

      <section className="bento-grid grid-rows-3 grid-cols-3">
        {/* Fashion and Apparel */}
        <div className="bento-element row-span-2">
          <span className="overlay"></span>
          <Image
            src="/assets/products_categories/Fashion and Apparel.jpg"
            width={800}
            height={800}
            alt="Fashion and Apparel"
          />
        </div>
        {/* Electronics */}
        <div className="bento-element col-span-2">
          <span className="overlay"></span>
          <Image
            src="/assets/products_categories/Electronics.jpg"
            width={800}
            height={800}
            alt="Electronics"
          />
        </div>
        {/* Home and Kitchen */}
        <div className="bento-element col-span-2">
          <span className="overlay"></span>
          <Image
            src="/assets/products_categories/Home and Kitchen.jpg"
            width={800}
            height={800}
            alt="Home and Kitchen"
          />
        </div>
      </section>
    </div>
  );
}

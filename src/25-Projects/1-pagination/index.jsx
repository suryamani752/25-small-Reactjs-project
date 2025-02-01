import { useEffect, useState } from "react";
import PaginationPage from "./pagination";
import SkeletonLoader from "../4-skeleton-Loader";

const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  //calculate total pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  //get current page items
  const productStartIndex = (currentPage - 1) * itemsPerPage;
  const productEndIndex = productStartIndex + itemsPerPage;
  const currentProductItems = products.slice(
    productStartIndex,
    productEndIndex
  );

  //fetch Products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      const getProducts = await response.json();
      console.log(getProducts);
      setProducts(getProducts);
    } catch (error) {
      console.error("unable to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  if (loading) {
    return (
      <div className="p-10 mx-10">
        <h1 className="text-4xl font-extrabold text-center mb-5">Pagination</h1>
        <div className="grid grid-cols-2 gap-5">
          {[...Array(itemsPerPage)].map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="p-10 mx-10">
        <h1 className="text-4xl font-extrabold text-center mb-5">Pagination</h1>
        <div className="grid grid-cols-2 gap-5">
          {currentProductItems.map((singleProduct, index) => (
            <div
              className="p-5 mt-5 mb-2 bg-grey-100 rounded border flex flex-col gap-3 justify-center items-center hover:bg-gray-300"
              key={index}
            >
              <div className="w-[100px]">
                <img src={singleProduct.image} alt="" className="w-full" />
              </div>
              <p className="text-2xl font-bold">{singleProduct.title}</p>
              <div className="flex justify-around gap-5">
                <p>Price: ${singleProduct.price}</p>
                <p>Rating: {singleProduct.rating.rate} / 5</p>
              </div>
            </div>
          ))}
        </div>
        <PaginationPage
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
};

export default Pagination;

import { useEffect, useState, useMemo } from "react";

function FilterProducts() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState("default");
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Skeleton Loader Component
  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden relative animate-pulse">
      <div className="relative overflow-hidden">
        <div className="w-full h-56 bg-gray-200" />
      </div>
      <div className="p-5">
        <div className="h-6 bg-gray-200 rounded-full w-3/4 mb-4" />
        <div className="flex items-center justify-between mb-3">
          <div className="h-4 bg-gray-200 rounded-full w-1/4" />
          <div className="h-4 bg-gray-200 rounded-full w-1/3" />
        </div>
        <div className="h-10 bg-gray-200 rounded-lg" />
      </div>
    </div>
  );

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const limit = 12;
        const skip = (page - 1) * limit;
        const response = await fetch(
          `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
        );
        const data = await response.json();

        if (data?.products) {
          const maxProductPrice = Math.max(
            ...data.products.map((p) => p.price)
          );
          setMaxPrice((prev) => (page === 1 ? maxProductPrice : prev));
          setProducts((prev) =>
            page === 1 ? data.products : [...prev, ...data.products]
          );
          setTotalProducts(data.total);
        }
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
        setIsLoadingMore(false);
      }
    };

    fetchProducts();
  }, [page]);

  // Get unique categories
  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))],
    [products]
  );

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesCategory =
        !selectedCategory ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesPrice = product.price <= maxPrice;
      return matchesCategory && matchesSearch && matchesPrice;
    });

    switch (sortBy) {
      case "price_asc":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price_desc":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "title_asc":
        return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return filtered;
    }
  }, [products, selectedCategory, searchQuery, maxPrice, sortBy]);

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory("");
    setSearchQuery("");
    setMaxPrice(Math.max(...products.map((p) => p.price)));
    setSortBy("default");
    setPage(1);
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setPage((prev) => prev + 1);
  };

  const hasMoreProducts = products.length < totalProducts;

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-100 rounded-lg max-w-2xl mx-auto mt-8">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          FILTER PRODUCTS
        </h1>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Search Input */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Search Products
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="Search..."
                />
                <svg
                  className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Max Price: ${maxPrice}
              </label>
              <div className="relative pt-4">
                <input
                  type="range"
                  min="0"
                  max={Math.max(...products.map((p) => p.price))}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full cursor-pointer range range-lg range-primary accent-blue-600"
                />
              </div>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Sort By
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full cursor-pointer pl-4 pr-10 py-2.5 border-2 border-gray-200 rounded-xl appearance-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                >
                  <option value="default">Featured</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="title_asc">Title: A-Z</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Reset Filters */}
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full cursor-pointer flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:border-blue-500 text-gray-700 hover:text-blue-600 px-4 py-2.5 rounded-xl transition-all hover:shadow-md"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory((prev) =>
                  prev === category ? "" : category
                )
              }
              className={`flex cursor-pointer items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-200 shadow-sm"
              }`}
            >
              {selectedCategory === category && (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ease-out overflow-hidden relative"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-56 object-cover transform group-hover:scale-105 transition-all duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold text-blue-600 shadow-sm">
                      ${product.price}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2 text-gray-800">
                      {product.title}
                    </h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {product.rating}
                      </span>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {product.category}
                      </span>
                    </div>
                    <button className="w-full cursor-pointer mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {isLoadingMore && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                {[...Array(4)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )}

            {hasMoreProducts && (
              <div className="text-center mt-12">
                <button
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl transition-all 
                    font-semibold cursor-pointer shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoadingMore ? (
                    <div className="flex items-center gap-2">
                      <span className="animate-spin inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full"></span>
                      Loading...
                    </div>
                  ) : (
                    "Load More Products"
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="inline-block p-6 bg-white rounded-2xl shadow-lg">
              <svg
                className="w-16 h-16 mx-auto text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Try adjusting your filters or search terms to find what you're
                looking for.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterProducts;

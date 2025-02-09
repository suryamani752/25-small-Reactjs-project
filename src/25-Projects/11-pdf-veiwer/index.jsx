import {
  Document,
  PDFDownloadLink,
  PDFViewer,
  Page,
  Text,
  View,
  Image as PDFImage,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";

// Register fonts
Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/opensans/v27/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVc.ttf",
    },
    {
      src: "https://fonts.gstatic.com/s/opensans/v27/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1x4gaVc.ttf",
      fontWeight: 600,
    },
  ],
});

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: "Open Sans" },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#2d3748",
  },
  section: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: 600, color: "#4a5568" },
  value: { fontSize: 12, marginBottom: 8, color: "#718096" },
  image: { width: 150, height: 150, marginBottom: 15 },
});

function PdfViewComponent({ productDetails }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.header}>{productDetails?.title}</Text>
          {productDetails?.images?.[0] && (
            <PDFImage style={styles.image} src={productDetails.images[0]} />
          )}
          <View style={styles.section}>
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.value}>{productDetails?.description}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Category:</Text>
            <Text style={styles.value}>{productDetails?.category}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Price:</Text>
            <Text style={styles.value}>${productDetails?.price}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Rating:</Text>
            <Text style={styles.value}>{productDetails?.rating}/5</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Stock:</Text>
            <Text style={styles.value}>
              {productDetails?.stock} units available
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

function PdfViewer() {
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  async function fetchListOfProducts() {
    try {
      setLoading(true);
      const apiResponse = await fetch(
        "https://dummyjson.com/products?limit=10&skip=0"
      );
      const result = await apiResponse.json();
      if (result?.products?.length) {
        setProducts(result.products);
      }
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchListOfProducts();
  }, []);

  async function handleFetchProductDetails(getId) {
    try {
      setLoading(true);
      const apiResponse = await fetch(
        `https://dummyjson.com/products/${getId}`
      );
      const result = await apiResponse.json();
      setProductDetails(result);
    } catch (err) {
      setError("Failed to fetch product details");
    } finally {
      setLoading(false);
    }
  }

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Product PDF Viewer
        </h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <RingLoader color="#4299e1" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {filteredProducts.map((productItem) => (
                <div
                  key={productItem.id}
                  onClick={() => handleFetchProductDetails(productItem.id)}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {productItem.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Category: {productItem.category}
                  </p>
                  <p className="text-blue-600 font-medium">
                    ${productItem.price}
                  </p>
                </div>
              ))}
            </div>

            {productDetails && (
              <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  {productDetails.title} Details
                </h2>

                <div className="mb-6">
                  <PDFViewer className="w-full h-[800px] border rounded-lg">
                    <PdfViewComponent productDetails={productDetails} />
                  </PDFViewer>
                </div>

                <PDFDownloadLink
                  fileName={`${productDetails.title}-Details.pdf`}
                  document={
                    <PdfViewComponent productDetails={productDetails} />
                  }
                  className="inline-block"
                >
                  {({ loading }) => (
                    <button
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {loading ? "Generating PDF..." : "Download PDF"}
                    </button>
                  )}
                </PDFDownloadLink>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default PdfViewer;

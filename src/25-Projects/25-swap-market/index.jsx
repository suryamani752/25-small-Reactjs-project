import { useState, useEffect, useMemo } from "react";
import { ArrowPathIcon, PlusIcon } from "@heroicons/react/24/solid";
import { v4 as uuidv4 } from "uuid";
import ListingCard from "./ListingCard";
import Modal from "./Modal";
import { CATEGORIES, CONDITIONS } from "./constants";

const initialListings = [
  {
    id: uuidv4(),
    title: "Vintage Guitar",
    description: "Well-maintained acoustic guitar",
    offer: "Looking for wooden bookshelf",
    category: "music",
    condition: "used",
    postedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Designer Dress",
    description: "Size M, never worn",
    offer: "Want hiking gear or kitchen appliances",
    category: "clothing",
    condition: "new",
    postedAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

function CommunitySwap() {
  const [listings, setListings] = useState(() => {
    const saved = localStorage.getItem("swapListings");
    return saved ? JSON.parse(saved) : initialListings;
  });
  const [showForm, setShowForm] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [filters, setFilters] = useState({
    category: "all",
    condition: "all",
    search: "",
  });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    offer: "",
    category: "other",
    condition: "used",
  });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem("swapListings", JSON.stringify(listings));
  }, [listings]);

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const categoryMatch =
        filters.category === "all" || listing.category === filters.category;
      const conditionMatch =
        filters.condition === "all" || listing.condition === filters.condition;
      const searchMatch =
        listing.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        listing.description
          .toLowerCase()
          .includes(filters.search.toLowerCase());
      return categoryMatch && conditionMatch && searchMatch;
    });
  }, [listings, filters]);

  const handleSubmitListing = (e) => {
    e.preventDefault();
    const newListing = {
      ...formData,
      id: uuidv4(),
      postedAt: new Date().toISOString(),
    };
    setListings([newListing, ...listings]);
    setShowForm(false);
    setFormData({
      title: "",
      description: "",
      offer: "",
      category: "other",
      condition: "used",
    });
    setToast("Listing posted successfully!");
    setTimeout(() => setToast(null), 3000);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setShowContact(false);
    setToast("Message sent successfully!");
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex items-center gap-4">
          <ArrowPathIcon className="h-12 w-12 text-green-600" />
          <h1 className="text-4xl font-bold text-gray-800">Community Swap</h1>
        </header>

        <div className="bg-white p-6 rounded-xl shadow-sm mb-8 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-transform hover:scale-105"
            >
              <PlusIcon className="h-5 w-5" />
              Post New Listing
            </button>
            <input
              type="text"
              placeholder="Search listings..."
              className="p-2 border rounded w-full md:w-64"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <select
              className="p-2 border rounded w-full md:w-auto"
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
            <select
              className="p-2 border rounded w-full md:w-auto"
              value={filters.condition}
              onChange={(e) =>
                setFilters({ ...filters, condition: e.target.value })
              }
            >
              {CONDITIONS.map((cond) => (
                <option key={cond} value={cond}>
                  {cond.charAt(0).toUpperCase() + cond.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.length > 0 ? (
            filteredListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onContact={(listing) => {
                  setSelectedListing(listing);
                  setShowContact(true);
                }}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 text-lg">
                No listings found. Be the first to post!
              </p>
            </div>
          )}
        </div>

        <Modal
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          title="Post New Listing"
        >
          <form onSubmit={handleSubmitListing} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Item Title*</label>
              <input
                required
                type="text"
                className="w-full p-2 border rounded"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                maxLength={50}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Description*</label>
              <textarea
                required
                className="w-full p-2 border rounded"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                maxLength={200}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Desired Trade*</label>
              <input
                required
                type="text"
                className="w-full p-2 border rounded"
                value={formData.offer}
                onChange={(e) =>
                  setFormData({ ...formData, offer: e.target.value })
                }
                maxLength={100}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Category*</label>
                <select
                  className="w-full p-2 border rounded"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  {CATEGORIES.slice(1).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Condition*</label>
                <select
                  className="w-full p-2 border rounded"
                  value={formData.condition}
                  onChange={(e) =>
                    setFormData({ ...formData, condition: e.target.value })
                  }
                >
                  {CONDITIONS.slice(1).map((cond) => (
                    <option key={cond} value={cond}>
                      {cond.charAt(0).toUpperCase() + cond.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Post Listing
              </button>
            </div>
          </form>
        </Modal>

        <Modal
          isOpen={showContact}
          onClose={() => setShowContact(false)}
          title={`Contact ${selectedListing?.title} Owner`}
        >
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Your Name*</label>
              <input
                required
                type="text"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Your Email*</label>
              <input
                required
                type="email"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Message*</label>
              <textarea
                required
                className="w-full p-2 border rounded"
                defaultValue={`Hi! I'm interested in your ${selectedListing?.title} and would like to discuss a trade.`}
              />
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setShowContact(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Send Message
              </button>
            </div>
          </form>
        </Modal>

        {toast && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg animate-fade-in">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}

export default CommunitySwap;

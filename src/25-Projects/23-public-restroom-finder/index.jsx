import { useState, useEffect } from "react";
import {
  BuildingOfficeIcon,
  PlusIcon,
  StarIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { MapPinIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";

// Initial mock data
const initialRestrooms = [
  {
    id: uuidv4(),
    name: "City Center Mall",
    location: "Main Atrium, Level 2",
    cleanliness: 4,
    accessibility: 3,
    notes: "Clean and well-maintained, baby changing facilities available",
    lat: 51.5074,
    lng: -0.1278,
    reviews: [],
    addedBy: "Anonymous",
    dateAdded: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Central Park West",
    location: "Near playground area",
    cleanliness: 2,
    accessibility: 4,
    notes: "Portable toilet, hand sanitizer provided",
    lat: 40.7851,
    lng: -73.9683,
    reviews: ["Needs more frequent cleaning"],
    addedBy: "Anonymous",
    dateAdded: new Date().toISOString(),
  },
];

function PublicRestroomFinder() {
  const [restrooms, setRestrooms] = useState(() => {
    const saved = localStorage.getItem("restrooms");
    return saved ? JSON.parse(saved) : initialRestrooms;
  });
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    minCleanliness: 0,
    minAccessibility: 0,
    search: "",
    sortBy: "cleanliness",
  });
  const [selectedRestroom, setSelectedRestroom] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(null);
  const [reviewText, setReviewText] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    cleanliness: 3,
    accessibility: 3,
    notes: "",
    lat: "",
    lng: "",
    addedBy: "Anonymous",
  });

  useEffect(() => {
    localStorage.setItem("restrooms", JSON.stringify(restrooms));
  }, [restrooms]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRestroom = {
      ...formData,
      id: uuidv4(),
      lat: formData.lat ? parseFloat(formData.lat) : Math.random() * 180 - 90,
      lng: formData.lng ? parseFloat(formData.lng) : Math.random() * 360 - 180,
      cleanliness: Number(formData.cleanliness),
      accessibility: Number(formData.accessibility),
      reviews: [],
      dateAdded: new Date().toISOString(),
    };
    setRestrooms([...restrooms, newRestroom]);
    setShowForm(false);
    resetForm();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this restroom?")) {
      setRestrooms(restrooms.filter((r) => r.id !== id));
      if (selectedRestroom?.id === id) setSelectedRestroom(null);
    }
  };

  const handleAddReview = (restroomId) => {
    if (reviewText.trim()) {
      const updatedRestrooms = restrooms.map((r) =>
        r.id === restroomId ? { ...r, reviews: [...r.reviews, reviewText] } : r
      );
      setRestrooms(updatedRestrooms);
      setShowReviewForm(null);
      setReviewText("");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      location: "",
      cleanliness: 3,
      accessibility: 3,
      notes: "",
      lat: "",
      lng: "",
      addedBy: "Anonymous",
    });
  };

  const filteredRestrooms = restrooms
    .filter(
      (restroom) =>
        restroom.cleanliness >= filters.minCleanliness &&
        restroom.accessibility >= filters.minAccessibility &&
        (filters.search === "" ||
          restroom.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          restroom.location
            .toLowerCase()
            .includes(filters.search.toLowerCase()))
    )
    .sort((a, b) => {
      if (filters.sortBy === "cleanliness")
        return b.cleanliness - a.cleanliness;
      if (filters.sortBy === "accessibility")
        return b.accessibility - a.accessibility;
      if (filters.sortBy === "date")
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-gray-200 py-16 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex items-center justify-between bg-white py-6 px-8 rounded-3xl shadow-lg">
          <div className="flex items-center gap-4">
            <BuildingOfficeIcon className="h-12 w-12 text-blue-700" />
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight drop-shadow-md">
              Public Restroom Finder
            </h1>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold hover:bg-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <PlusIcon className="h-5 w-5" />
            Add Restroom
          </button>
        </header>

        {/* Controls */}
        <div className="bg-white p-8 rounded-3xl shadow-lg mb-12 grid grid-cols-1 md:grid-cols-4 gap-6 border-t-4 border-blue-200">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Min Cleanliness
            </label>
            <select
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
              value={filters.minCleanliness}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  minCleanliness: Number(e.target.value),
                })
              }
            >
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}★+
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Min Accessibility
            </label>
            <select
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
              value={filters.minAccessibility}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  minAccessibility: Number(e.target.value),
                })
              }
            >
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}★+
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="Search by name or location..."
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md placeholder-gray-400"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Sort By
            </label>
            <select
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
              value={filters.sortBy}
              onChange={(e) =>
                setFilters({ ...filters, sortBy: e.target.value })
              }
            >
              <option value="cleanliness">Cleanliness</option>
              <option value="accessibility">Accessibility</option>
              <option value="date">Date Added</option>
            </select>
          </div>
        </div>

        {/* Restroom List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRestrooms.length === 0 ? (
            <p className="col-span-full text-center text-gray-600 text-lg font-medium bg-white py-6 rounded-2xl shadow-md">
              No restrooms match your criteria. Try adjusting the filters!
            </p>
          ) : (
            filteredRestrooms.map((restroom) => (
              <div
                key={restroom.id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {restroom.name}
                    </h2>
                    <button
                      onClick={() => handleDelete(restroom.id)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200"
                    >
                      <TrashIcon className="h-6 w-6" />
                    </button>
                  </div>
                  <p className="text-gray-700 mb-4 flex items-center gap-2 text-sm font-medium">
                    <MapPinIcon className="h-5 w-5 text-blue-500" />
                    {restroom.location}
                  </p>
                  <div className="flex gap-6 mb-4">
                    <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                      <StarIcon className="h-5 w-5 text-yellow-500" />
                      <span className="text-gray-800 font-semibold">
                        {restroom.cleanliness}/5
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full">
                      <StarIcon className="h-5 w-5 text-blue-500" />
                      <span className="text-gray-800 font-semibold">
                        {restroom.accessibility}/5
                      </span>
                    </div>
                  </div>
                  {restroom.notes && (
                    <p className="text-gray-600 mb-4 italic text-sm bg-gray-50 p-3 rounded-lg">
                      "{restroom.notes}"
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mb-4">
                    Added by{" "}
                    <span className="font-medium">{restroom.addedBy}</span> on{" "}
                    {new Date(restroom.dateAdded).toLocaleDateString()}
                  </p>
                  {restroom.reviews?.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">
                        Reviews:
                      </h4>
                      <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                        {restroom.reviews.map((review, index) => (
                          <li key={index} className="leading-relaxed">
                            {review}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="space-y-3">
                    <button
                      onClick={() => setSelectedRestroom(restroom)}
                      className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      View on Map
                    </button>
                    <button
                      onClick={() =>
                        setShowReviewForm(
                          showReviewForm === restroom.id ? null : restroom.id
                        )
                      }
                      className="w-full bg-green-600 text-white py-2.5 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      {showReviewForm === restroom.id
                        ? "Cancel Review"
                        : "Add Review"}
                    </button>
                  </div>
                  {showReviewForm === restroom.id && (
                    <div className="mt-4 space-y-3">
                      <textarea
                        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 h-28 resize-none shadow-sm"
                        placeholder="Write your review..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                      />
                      <button
                        onClick={() => handleAddReview(restroom.id)}
                        className="w-full bg-green-700 text-white py-2.5 rounded-xl font-semibold hover:bg-green-800 transition-all duration-300 shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={!reviewText.trim()}
                      >
                        Submit Review
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Map Modal */}
        {selectedRestroom && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-8 rounded-3xl max-w-lg w-full shadow-2xl border-t-4 border-blue-300">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {selectedRestroom.name}
                </h3>
                <button
                  onClick={() => setSelectedRestroom(null)}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  <XMarkIcon className="h-7 w-7" />
                </button>
              </div>
              <div className="aspect-video bg-gray-100 rounded-xl mb-6 flex items-center justify-center border border-gray-200">
                <p className="text-gray-600 text-center font-medium">
                  Map Placeholder
                  <br />
                  Lat: {selectedRestroom.lat.toFixed(2)}, Lng:{" "}
                  {selectedRestroom.lng.toFixed(2)}
                </p>
              </div>
              <p className="text-gray-700 mb-6 flex items-center gap-2 text-sm font-medium">
                <MapPinIcon className="h-5 w-5 text-blue-500" />
                {selectedRestroom.location}
              </p>
              <button
                onClick={() => setSelectedRestroom(null)}
                className="w-full bg-gray-200 text-gray-800 py-2.5 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Add New Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-8 rounded-3xl max-w-lg w-full shadow-2xl border-t-4 border-blue-300 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 drop-shadow-sm">
                  Add New Restroom
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  <XMarkIcon className="h-7 w-7" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Name*
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Location*
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Cleanliness*
                    </label>
                    <select
                      className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                      value={formData.cleanliness}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          cleanliness: Number(e.target.value),
                        })
                      }
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n} Stars
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Accessibility*
                    </label>
                    <select
                      className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                      value={formData.accessibility}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          accessibility: Number(e.target.value),
                        })
                      }
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n} Stars
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Latitude (optional)
                    </label>
                    <input
                      type="number"
                      step="any"
                      className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                      value={formData.lat}
                      onChange={(e) =>
                        setFormData({ ...formData, lat: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Longitude (optional)
                    </label>
                    <input
                      type="number"
                      step="any"
                      className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                      value={formData.lng}
                      onChange={(e) =>
                        setFormData({ ...formData, lng: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Added By (optional)
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                    value={formData.addedBy}
                    onChange={(e) =>
                      setFormData({ ...formData, addedBy: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Notes
                  </label>
                  <textarea
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 h-28 resize-none shadow-sm hover:shadow-md"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PublicRestroomFinder;

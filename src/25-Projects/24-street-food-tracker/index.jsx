import { useState, useEffect, useMemo } from "react";
import {
  TruckIcon,
  PlusIcon,
  ClockIcon,
  XMarkIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";

const initialVendors = [
  {
    id: uuidv4(),
    name: "Maria's Tacos",
    type: "tacos",
    location: "5th St & Broadway",
    hours: "11 AM - 3 PM",
    menu: "Carne asada, al pastor",
    reportedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Burger Bus",
    type: "burgers",
    location: "Central Park West",
    hours: "10 AM - 5 PM",
    menu: "Cheeseburger, fries",
    reportedAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

const isOpen = (hours) => {
  const [start, end] = hours.split(" - ");
  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;
  const parseTime = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return hours + (minutes ? minutes / 60 : 0);
  };
  return currentHour >= parseTime(start) && currentHour <= parseTime(end);
};

const VendorCard = ({ vendor, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{vendor.name}</h2>
          <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm capitalize">
            {vendor.type}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(vendor)}
            className="text-blue-600 hover:text-blue-800"
            aria-label={`Edit ${vendor.name}`}
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(vendor)}
            className="text-red-600 hover:text-red-800"
            aria-label={`Delete ${vendor.name}`}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="space-y-2 text-gray-600">
        <p className="flex items-center gap-2">
          <TruckIcon className="h-5 w-5" /> {vendor.location}
        </p>
        <p className="flex items-center gap-2">
          <ClockIcon className="h-5 w-5" /> {vendor.hours}{" "}
          <span
            className={`px-2 py-1 rounded-full text-sm ${
              isOpen(vendor.hours)
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {isOpen(vendor.hours) ? "Open" : "Closed"}
          </span>
        </p>
        {vendor.menu && (
          <div className="mt-4">
            <h3 className="font-semibold text-gray-700">Menu:</h3>
            <p>{vendor.menu}</p>
          </div>
        )}
        <p className="text-sm text-gray-500 mt-2">
          Reported: {new Date(vendor.reportedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

// New Delete Confirmation Modal Component
const DeleteModal = ({ vendor, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl max-w-md w-full animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Confirm Delete
        </h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{vendor.name}</span>? This action
          cannot be undone.
        </p>
        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

function StreetFoodTracker() {
  const [vendors, setVendors] = useState(() => {
    try {
      const saved = localStorage.getItem("streetFoodVendors");
      return saved ? JSON.parse(saved) : initialVendors;
    } catch (error) {
      console.error("Failed to load vendors:", error);
      return initialVendors;
    }
  });
  const [showForm, setShowForm] = useState(false);
  const [editVendor, setEditVendor] = useState(null);
  const [filters, setFilters] = useState({ type: "all", status: "all" });
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [formData, setFormData] = useState({
    name: "",
    type: "tacos",
    location: "",
    hours: "",
    menu: "",
  });
  const [formError, setFormError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vendorToDelete, setVendorToDelete] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem("streetFoodVendors", JSON.stringify(vendors));
    } catch (error) {
      console.error("Failed to save vendors:", error);
    }
  }, [vendors]);

  const validateHours = (hours) => {
    const regex =
      /^\d{1,2}(:\d{2})?\s*(AM|PM)\s*-\s*\d{1,2}(:\d{2})?\s*(AM|PM)$/i;
    return regex.test(hours.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateHours(formData.hours)) {
      setFormError("Hours must be in format '11 AM - 3 PM'");
      return;
    }
    const vendorData = editVendor
      ? { ...editVendor, ...formData }
      : { ...formData, id: uuidv4(), reportedAt: new Date().toISOString() };
    setVendors(
      editVendor
        ? vendors.map((v) => (v.id === editVendor.id ? vendorData : v))
        : [vendorData, ...vendors]
    );
    toast.success(editVendor ? "Vendor updated!" : "Vendor added!");
    resetForm();
  };

  const handleEdit = (vendor) => {
    setEditVendor(vendor);
    setFormData({
      name: vendor.name,
      type: vendor.type,
      location: vendor.location,
      hours: vendor.hours,
      menu: vendor.menu,
    });
    setShowForm(true);
  };

  const handleDelete = (vendor) => {
    setVendorToDelete(vendor);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setVendors(vendors.filter((v) => v.id !== vendorToDelete.id));
    toast.success("Vendor deleted!");
    setShowDeleteModal(false);
    setVendorToDelete(null);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditVendor(null);
    setFormError("");
    setFormData({ name: "", type: "tacos", location: "", hours: "", menu: "" });
  };

  const filteredVendors = useMemo(() => {
    let result = vendors.filter((v) => {
      const typeMatch = filters.type === "all" || v.type === filters.type;
      const statusMatch =
        filters.status === "all" ||
        (filters.status === "open" ? isOpen(v.hours) : !isOpen(v.hours));
      const searchMatch =
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.location.toLowerCase().includes(search.toLowerCase());
      return typeMatch && statusMatch && searchMatch;
    });
    return result.sort((a, b) =>
      sortOrder === "desc"
        ? new Date(b.reportedAt) - new Date(a.reportedAt)
        : new Date(a.reportedAt) - new Date(b.reportedAt)
    );
  }, [vendors, filters, search, sortOrder]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <Toaster position="top-right" />
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 flex items-center gap-4">
          <TruckIcon className="h-12 w-12 text-red-600" aria-hidden="true" />
          <h1 className="text-4xl font-bold text-gray-800">
            Street Food Tracker
          </h1>
        </header>

        {/* Controls */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <button
              onClick={() => setShowForm(true)}
              className="bg-red-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
              aria-label="Report a new vendor"
            >
              <PlusIcon className="h-5 w-5" /> Add Vendor
            </button>
            <input
              type="text"
              placeholder="Search by name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="w-full sm:w-auto p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Filter by cuisine"
            >
              <option value="all">All Cuisines</option>
              <option value="tacos">Tacos</option>
              <option value="burgers">Burgers</option>
              <option value="asian">Asian</option>
              <option value="vegan">Vegan</option>
              <option value="desserts">Desserts</option>
            </select>
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              className="w-full sm:w-auto p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Filter by status"
            >
              <option value="all">All Statuses</option>
              <option value="open">Open Now</option>
              <option value="closed">Closed</option>
            </select>
            <button
              onClick={() =>
                setSortOrder(sortOrder === "desc" ? "asc" : "desc")
              }
              className="w-full sm:w-auto bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              Sort by Time ({sortOrder === "desc" ? "Newest" : "Oldest"})
            </button>
          </div>
        </div>

        {/* Vendor Feed */}
        <div className="space-y-6">
          {filteredVendors.length ? (
            filteredVendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p className="text-gray-600 text-center text-lg">
              No vendors match your criteria.
            </p>
          )}
        </div>

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-xl max-w-lg w-full relative animate-fade-in">
              <button
                onClick={resetForm}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                aria-label="Close"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
              <h2 className="text-2xl font-bold mb-6">
                {editVendor ? "Edit Vendor" : "Add New Vendor"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Name*
                  </label>
                  <input
                    id="name"
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="type"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Type*
                    </label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="tacos">Tacos</option>
                      <option value="burgers">Burgers</option>
                      <option value="asian">Asian</option>
                      <option value="vegan">Vegan</option>
                      <option value="desserts">Desserts</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="hours"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Hours*
                    </label>
                    <input
                      id="hours"
                      required
                      type="text"
                      placeholder="e.g., 11 AM - 3 PM"
                      value={formData.hours}
                      onChange={(e) =>
                        setFormData({ ...formData, hours: e.target.value })
                      }
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    {formError && (
                      <p className="text-red-600 text-sm mt-1">{formError}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Location*
                  </label>
                  <input
                    id="location"
                    required
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="menu"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Menu
                  </label>
                  <textarea
                    id="menu"
                    value={formData.menu}
                    onChange={(e) =>
                      setFormData({ ...formData, menu: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    rows="3"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                  >
                    {editVendor ? "Update" : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <DeleteModal
            vendor={vendorToDelete}
            onConfirm={confirmDelete}
            onCancel={() => setShowDeleteModal(false)}
          />
        )}
      </div>
    </div>
  );
}

export default StreetFoodTracker;

const styles = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }
`;

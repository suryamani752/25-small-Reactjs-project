import { useState } from "react";
import {
  EnvelopeIcon,
  PhoneIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

const PETS = [
  {
    id: 1,
    name: "Buddy",
    type: "dog",
    breed: "Golden Retriever",
    age: "2 years",
    location: "New York, NY",
    description: "Friendly and energetic golden retriever loves playing fetch",
    image: "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb",
    gender: "Male",
    size: "Large",
    vaccinated: true,
  },
  {
    id: 2,
    name: "Whiskers",
    type: "cat",
    breed: "Siamese",
    age: "6 months",
    location: "Los Angeles, CA",
    description: "Playful kitten looking for a loving home",
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5",
    gender: "Female",
    size: "Small",
    vaccinated: false,
  },
  {
    id: 3,
    name: "Max",
    type: "dog",
    breed: "Labrador",
    age: "1 year",
    location: "Chicago, IL",
    description: "Loyal companion who loves water and treats",
    image: "https://images.unsplash.com/photo-1561037404-61cd46aa615b",
    gender: "Male",
    size: "Medium",
    vaccinated: true,
  },
];

function PetAdoption() {
  const [filters, setFilters] = useState({
    type: "all",
    age: "all",
    gender: "all",
    search: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filteredPets = PETS.filter((pet) => {
    const typeMatch = filters.type === "all" || pet.type === filters.type;
    const ageMatch = filters.age === "all" || pet.age.includes(filters.age);
    const genderMatch =
      filters.gender === "all" || pet.gender === filters.gender;
    const searchMatch =
      filters.search === "" ||
      pet.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      pet.breed.toLowerCase().includes(filters.search.toLowerCase());
    const favoriteMatch = !showFavoritesOnly || favorites.includes(pet.id);
    return typeMatch && ageMatch && genderMatch && searchMatch && favoriteMatch;
  });

  const handleFavorite = (petId) => {
    setFavorites((prev) =>
      prev.includes(petId)
        ? prev.filter((id) => id !== petId)
        : [...prev, petId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { ...formData, pet: selectedPet.name });
    setModalOpen(false);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-blue-700 tracking-tight">
            Adopt Your Perfect Pet
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Find a loving companion waiting for their forever home
          </p>
        </div>

        {/* Filters and Favorites Button */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pet Type
              </label>
              <select
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
              >
                <option value="all">All Pets</option>
                <option value="dog">Dogs</option>
                <option value="cat">Cats</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <select
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                onChange={(e) =>
                  setFilters({ ...filters, age: e.target.value })
                }
              >
                <option value="all">All Ages</option>
                <option value="months">Under 1 year</option>
                <option value="year">1-3 years</option>
                <option value="years">Over 3 years</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                onChange={(e) =>
                  setFilters({ ...filters, gender: e.target.value })
                }
              >
                <option value="all">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                placeholder="Search by name or breed..."
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`w-full p-3 rounded-lg font-semibold transition-colors duration-200 flex items-center cursor-pointer justify-center gap-2 ${
                  showFavoritesOnly
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                <HeartSolidIcon className="h-5 w-5" />
                {showFavoritesOnly
                  ? "Show All Pets"
                  : `Favorites (${favorites.length})`}
              </button>
            </div>
          </div>
        </div>

        {/* Pet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPets.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 text-lg">
              {showFavoritesOnly && favorites.length === 0
                ? "You haven't favorited any pets yet!"
                : "No pets match your criteria. Try adjusting the filters!"}
            </p>
          ) : (
            filteredPets.map((pet) => (
              <div
                key={pet.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
              >
                <div className="relative">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={() => handleFavorite(pet.id)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white cursor-pointer"
                  >
                    {favorites.includes(pet.id) ? (
                      <HeartSolidIcon className="h-6 w-6 text-red-500" />
                    ) : (
                      <HeartIcon className="h-6 w-6 text-gray-600" />
                    )}
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {pet.name}
                    </h2>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        pet.vaccinated
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {pet.vaccinated ? "Vaccinated" : "Not Vaccinated"}
                    </span>
                  </div>
                  <div className="mt-3 space-y-2 text-gray-600">
                    <p>
                      <span className="font-medium">Breed:</span> {pet.breed}
                    </p>
                    <p>
                      <span className="font-medium">Age:</span> {pet.age}
                    </p>
                    <p>
                      <span className="font-medium">Gender:</span> {pet.gender}
                    </p>
                    <p>
                      <span className="font-medium">Size:</span> {pet.size}
                    </p>
                    <p>
                      <span className="font-medium">Location:</span>{" "}
                      {pet.location}
                    </p>
                  </div>
                  <p className="mt-4 text-gray-700 italic">{pet.description}</p>
                  <button
                    onClick={() => {
                      setSelectedPet(pet);
                      setModalOpen(true);
                      setFormData({
                        ...formData,
                        message: `Hi, I'm interested in adopting ${pet.name}!`,
                      });
                    }}
                    className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
                  >
                    Contact Shelter
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Contact Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-8 rounded-2xl max-w-md w-full shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Contact About {selectedPet.name}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Send Message
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

export default PetAdoption;

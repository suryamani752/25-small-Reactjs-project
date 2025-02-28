import { EnvelopeIcon } from "@heroicons/react/24/solid";

const timeSince = (date) => {
  const now = new Date();
  const posted = new Date(date);
  const diff = Math.floor((now - posted) / 1000); // seconds
  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
};

const ListingCard = ({ listing, onContact }) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
    <div className="mb-4">
      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm">
        {listing.category}
      </span>
      <span className="ml-2 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
        {listing.condition}
      </span>
    </div>
    <h2 className="text-2xl font-bold mb-2">{listing.title}</h2>
    <p className="text-gray-600 mb-2">{listing.description}</p>
    <p className="text-gray-500 text-sm mb-4">
      Posted {timeSince(listing.postedAt)}
    </p>
    <div className="bg-yellow-50 p-4 rounded-lg mb-4">
      <p className="font-semibold text-yellow-700">Desired trade:</p>
      <p className="text-yellow-800">{listing.offer}</p>
    </div>
    <button
      onClick={() => onContact(listing)}
      className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 transition-transform hover:scale-105"
    >
      <EnvelopeIcon className="h-5 w-5" />
      Message Trader
    </button>
  </div>
);

export default ListingCard;

import { useNavigate } from "react-router-dom";

export default function Card({ name, path }) {
  const navigate = useNavigate();
  return (
    <div className="card relative mb-5 w-[190px] h-[254px] rounded-[20px] bg-gray-100 p-6 border-2 border-gray-300 transition ease-out duration-500 overflow-visible hover:border-blue-500 hover:shadow-md">
      <div className="card-details grid place-content-center h-full gap-2 text-black">
        <p className="text-title text-xl font-bold">{name}</p>
        {/* <p className="text-body text-gray-500">
          Here are the details of the card
        </p> */}
      </div>
      <button
        onClick={() => navigate(path)}
        className="bg-black text-white p-3 rounded-lg ml-5 cursor-pointer"
      >
        Click Here
      </button>
    </div>
  );
}

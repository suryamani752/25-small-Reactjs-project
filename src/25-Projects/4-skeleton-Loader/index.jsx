const SkeletonLoader = () => {
  return (
    <div className="p-5 mt-5 mb-2 bg-gray-100 rounded border flex flex-col gap-3 justify-center items-center animate-pulse">
      <div className="w-[100px] h-[100px] bg-gray-300 rounded" />
      <div className="h-5 bg-gray-300 w-3/4 rounded" />
      <div className="flex justify-around gap-5 w-full">
        <div className="h-4 bg-gray-300 w-1/4 rounded" />
        <div className="h-4 bg-gray-300 w-1/4 rounded" />
      </div>
    </div>
  );
};


export default SkeletonLoader;
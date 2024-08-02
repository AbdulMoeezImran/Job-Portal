import { InfinitySpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="bg-gray w-full min-h-screen h-full flex items-center flex-col justify-center">
      <InfinitySpin width="200" color="#4f46e5" />
      <p className="text-xs uppercase">Loading Resources Hold Tight...</p>
    </div>
  );
};

export default Loader;

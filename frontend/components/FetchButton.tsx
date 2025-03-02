import { TrendingUp } from "lucide-react";

export default function FetchButton() {
  return (
    <button
      className="text-center w-48 rounded-full h-14 relative text-lg group"
      type="submit"
    >
      <div className="bg-[#4fcf2c] dark:bg-[#004d7a] rounded-full h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-full z-10 duration-500">
        <TrendingUp />
      </div>
      <p className="translate-x-2 group-hover:translate-x-0 duration-500 font-semibold">
        Go Fetch!
      </p>
    </button>
  );
}

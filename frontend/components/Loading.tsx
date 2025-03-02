export default function Loading() {
  return (
    <div className="flex space-x-2">
      <div
        className="loader border-r-2 rounded-full border-yellow-500 bg-yellow-300 animate-bounce
                 aspect-square w-8 flex justify-center items-center text-yellow-700"
      >
        $
      </div>
      <div
        className="loader border-r-2 rounded-full border-yellow-500 bg-yellow-300 animate-bounce
                 aspect-square w-8 flex justify-center items-center text-yellow-700 delay-100"
      >
        £
      </div>
      <div
        className="loader border-r-2 rounded-full border-yellow-500 bg-yellow-300 animate-bounce
                 aspect-square w-8 flex justify-center items-center text-yellow-700 delay-150"
      >
        €
      </div>
      <div
        className="loader border-r-2 rounded-full border-yellow-500 bg-yellow-300 animate-bounce
                 aspect-square w-8 flex justify-center items-center text-yellow-700 delay-200"
      >
        ¥
      </div>
    </div>
  );
}

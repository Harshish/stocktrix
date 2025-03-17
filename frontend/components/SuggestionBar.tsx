export default function SuggestionBar(stock: {
  symbol: string;
  shortname: string;
  exchange: string;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={stock.onSelect}
      className="flex items-center space-x-2 cursor-pointer mt-2 hover:bg-gray-700 p-1 w-full rounded-md"
    >
      <span className="font-bold">{stock.symbol}</span>
      <span className="text-gray-500 text-sm">{stock.shortname}</span>
      <span className="text-xs text-gray-400">{stock.exchange}</span>
    </button>
  );
}

export default function SuggestionBar(stock: {
  symbol: string;
  shortname: string;
  exchange: string;
}) {
  return (
    <div className="flex items-center space-x-2 cursor-pointer">
      <span className="font-bold">{stock.symbol}</span>
      <span className="text-gray-500">{stock.shortname}</span>
      <span className="text-xs text-gray-400">{stock.exchange}</span>
    </div>
  );
}

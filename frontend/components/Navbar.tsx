import ThemeSwitch from "./ThemeSwitch";

export default function Navbar() {
  return (
    <div className="p-8 flex items-center justify-between w-full">
      <h1 className="text-2xl font-bold">{process.env.NEXT_PUBLIC_APP_NAME}</h1>
      <ThemeSwitch />
    </div>
  );
}

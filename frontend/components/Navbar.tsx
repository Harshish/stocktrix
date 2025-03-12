import ThemeSwitch from "./ThemeSwitch";

export default function Navbar() {
  return (
    <div className="p-8 flex items-center justify-between w-full">
      <div className="flex items-center space-x-2">
        <img src="/bull.svg" alt="Logo" width={50} height={50} />
        <h1 className="text-2xl font-bold">
          {process.env.NEXT_PUBLIC_APP_NAME}
        </h1>
      </div>
      <ThemeSwitch />
    </div>
  );
}

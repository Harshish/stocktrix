import BackButton from "@/components/BackButton";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center space-x-2">
      <BackButton />
      <h1 className="text-4xl font-bold">404</h1>
      <div className="h-40 w-0.5 bg-gradient-to-b from-transparent via-black dark:via-white to-transparent mx-4"></div>
      <p className="text-lg">Page Not Found</p>
    </div>
  );
}

import BackButton from "@/components/BackButton";

export default function ErrorPage({
  error,
  message,
}: {
  error: string;
  message: string;
}) {
  return (
    <div className="flex flex-1 justify-center items-center space-x-2 mx-4">
      <BackButton />
      <h1 className="md:text-3xl sm:text-2xl text-xl font-bold w-[50%] flex justify-center">
        {error}
      </h1>
      <div className="h-40 w-0.5 bg-gradient-to-b from-transparent via-black dark:via-white to-transparent mx-4"></div>
      <p className="md:text-lg sm:text-sm text-xs p-2">{message}</p>
    </div>
  );
}

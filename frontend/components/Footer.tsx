import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex items-center justify-center w-full h-10 space-x-2">
      <span className="text-sm text-muted-foreground">
        Built with ❤️ by{" "}
        <Link
          href="https://github.com/Harshish"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Harsis
        </Link>
      </span>
      <span className="text-sm text-muted-foreground">
        <Link
          href="https://buymeacoffee.com/harsis"
          target="_blank"
          className="flex justify-center items-center"
        >
          <img src="/bmac.svg" alt="Buy Me a Coffee" width={30} height={30} />
          <p className="underline">Buy Me a Coffee</p>
        </Link>
      </span>
    </footer>
  );
}

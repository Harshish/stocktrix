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
        <a href="https://www.buymeacoffee.com/harsis" target="_blank">
          <img
            src="/bmc-button.svg"
            alt="Buy Me A Coffee"
            height={25}
            width={150}
          />
        </a>
      </span>
    </footer>
  );
}

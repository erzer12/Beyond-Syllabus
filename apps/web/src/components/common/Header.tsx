import { GraduationCap, MessageSquareCode, Sparkles, User, Trophy } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";
// import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/10 dark:bg-black/30 backdrop-blur-sm z-50">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className=" sm:inline-block font-semibold text-xl">
            Beyond Syllabus
          </span>
        </Link>

        <div className="hidden md:flex items-center">
          {/* buttons go here */}
        </div>

        <div className="flex items-center gap-2 ">
          <ThemeToggle />
          <Link href="/leaderboard">
            <Button variant="outline" size="icon">
              <Trophy className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="outline" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

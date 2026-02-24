import Link from "next/link"
import { Smartphone, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Navbar() {
  // Example cart count – replace with real state later
  const cartItemCount = 3

  return (
    <nav className="sticky top-0 z-50 border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center space-x-2">
          <Smartphone className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
          <span className="text-lg font-bold sm:text-xl">PhoneStore</span>
        </Link>

        {/* Right side icons */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/smartphones" aria-label="Smartphones">
              <Smartphone className="h-5 w-5" />
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/cart" aria-label="Shopping cart">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs">
                  {cartItemCount}
                </Badge>
              )}
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
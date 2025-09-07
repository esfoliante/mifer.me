'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

type NavigationItem = {
  name: string
  href: string
  disabled: boolean
}

const navigationItems: NavigationItem[] = [
  { name: 'Home', href: '/', disabled: false },
  { name: 'About', href: '/about', disabled: true },
]

export default function Topbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [isToastVisible, setIsToastVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigationClick = (item: NavigationItem, e: React.MouseEvent) => {
    if (item.disabled) {
      e.preventDefault()
      setShowToast(true)
      setIsToastVisible(true)
      setTimeout(() => {
        setIsToastVisible(false)
        setTimeout(() => setShowToast(false), 300)
      }, 2700)
    }
  }

  const handleResumeDownload = () => {
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'Miguel_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <header className={`sticky top-0 z-50 w-full text-white transition-all duration-300 ${
      isScrolled 
        ? 'border-gray-900 border-b border-border bg-neutral-900 backdrop-blur shadow-sm' 
        : 'border-b border-transparent bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image 
                src="/mf-logo.svg" 
                alt="MF Logo" 
                width={40} 
                height={40}
                className="h-10 w-10"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavigationClick(item, e)}
                  className={`text-sm font-medium transition-colors hover:text-gray-100 ${
                    item.disabled 
                      ? 'text-muted-foreground/50 cursor-not-allowed opacity-50' 
                      : isActive 
                        ? 'text-white border-b-2 border-foreground' 
                        : 'text-muted-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Contact Button */}
          <div className="hidden md:flex space-x-5 items-center">
            <Button onClick={handleResumeDownload}>
              My resume
            </Button>

            <Button asChild>
              <Link href="mailto:miguel.personal@pm.me">
                Contact me
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-neutral-950">
                <div className="flex flex-col space-y-6 mt-8 px-5">
                  {/* Mobile Logo */}
                  <div className="flex items-center space-x-2 pb-4">
                    <Image 
                      src="/mf-logo.svg" 
                      alt="MF Logo" 
                      width={32} 
                      height={32}
                      className="h-16 w-16"
                    />
                  </div>
                  
                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-4">
                    {navigationItems.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={(e) => handleNavigationClick(item, e)}
                          className={`text-lg font-medium transition-colors hover:text-muted-foreground ${
                            item.disabled 
                              ? 'text-muted-foreground/50 cursor-not-allowed opacity-50' 
                              : isActive 
                                ? 'text-white' 
                                : 'text-gray-100'
                          }`}
                        >
                          {item.name}
                        </Link>
                      )
                    })}
                  </nav>
                  
                  {/* Mobile Contact Button */}
                  <div className="pt-4 space-y-3">
                    <Button onClick={handleResumeDownload} className="w-full">
                      My resume
                    </Button>

                    <Button asChild className="w-full">
                      <Link href="mailto:miguel.personal@pm.me">
                        Contact me
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed top-20 right-4 z-50 bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-3 transition-opacity duration-300 ease-in-out ${
          isToastVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-sm font-medium text-black">I&apos;m still working on this page!</span>
          </div>
        </div>
      )}
    </header>
  )
} 

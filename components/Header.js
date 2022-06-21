import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import headerNavLinks from '@/data/headerNavLinks'

function useIsScrollTop() {
  const [isTop, setIsTop] = useState(true)
  useEffect(() => {
    function onScroll() {
      setIsTop(window.scrollY <= 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return isTop
}

export default function Header() {
  const router = useRouter()
  const [navShow, setNavShow] = useState(false)
  const { locale, locales } = router
  const isTop = useIsScrollTop()

  const changeLanguage = (locale) => {
    router.push(router.asPath, router.asPath, { locale })
  }

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  return (
    <>
      <header
        className={`fixed w-full bg-transparent ${
          isTop
            ? 'border-none'
            : 'border-b border-secondary-200 dark:border-secondary-800 dark:bg-violet-1000'
        } top-0 z-30 flex items-center justify-between bg-white bg-opacity-30 backdrop-blur-lg firefox:bg-opacity-100 dark:bg-opacity-30 dark:firefox:bg-opacity-100`}
      >
        <nav className="mx-auto flex w-full max-w-3xl items-center justify-between px-2 py-2 xl:px-0">
          <div className="flex w-full items-center justify-between text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className=" items-center p-2 font-medium text-secondary-900 dark:text-secondary-300 dark:hover:text-secondary-100 sm:py-4 sm:px-3 xl:first:pl-0"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-1">
              {locales.map((e, index) => (
                <span key={e}>
                  <button
                    aria-label={`Change to ${e}`}
                    type="button"
                    value={locale}
                    onClick={() => changeLanguage(e)}
                    className="inline-block cursor-pointer p-2 font-medium text-secondary-900 dark:text-secondary-300 dark:hover:text-secondary-100 sm:py-4"
                  >
                    {e.toUpperCase()}
                  </button>
                  {index === 0 && (
                    <span className="py-1 text-secondary-300 dark:text-secondary-700 sm:py-4">
                      /
                    </span>
                  )}
                </span>
              ))}
              <ThemeSwitch />
            </div>
          </div>
          <div className="sm:hidden">
            <button
              type="button"
              className="ml-1 mr-1 h-8 w-8 rounded"
              aria-label="Toggle Menu"
              onClick={onToggleNav}
            >
              <svg
                viewBox="0 0 100 100"
                className="h-8 w-8 text-secondary-900 dark:text-secondary-100"
              >
                <path
                  className={`${navShow ? 'opened' : ''} line line1`}
                  d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                />
                <path className={`${navShow ? 'opened' : ''} line line2`} d="M 20,50 H 80" />
                <path
                  className={`${navShow ? 'opened' : ''} line line3`}
                  d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                />
              </svg>
            </button>
          </div>
        </nav>
      </header>
      <MobileNav navShow={navShow} onToggleNav={onToggleNav} />
    </>
  )
}

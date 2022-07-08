/* eslint-disable jsx-a11y/no-onchange */
import dynamic from 'next/dynamic'
import SectionContainer from './SectionContainer'

const LeftDarkGradient = dynamic(() => import('./background/left-dark-gradient.svg'), {
  ssr: true,
})
const RightDarkGradient = dynamic(() => import('./background/right-dark-gradient.svg'), {
  ssr: true,
})

const Header = dynamic(() => import('./Header'), {
  ssr: true,
})
const Footer = dynamic(() => import('./Footer'), {
  ssr: true,
})

const LayoutWrapper = ({ children }) => {
  return (
    <>
      <Header />
      <SectionContainer>
        <div className="flex min-h-screen flex-col justify-between">
          <main className="mb-auto">{children}</main>
          <Footer />
        </div>
        <div className="fixed -bottom-11 -left-28 -z-10 h-full w-full opacity-60 sm:-bottom-0 sm:-left-64">
          <LeftDarkGradient />
        </div>
        <div className="fixed -top-96 right-64 -z-10 h-full w-full opacity-60 sm:-right-96">
          <RightDarkGradient />
        </div>
      </SectionContainer>
    </>
  )
}

export default LayoutWrapper

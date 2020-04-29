import React, { useEffect, useState, useRef } from 'react'
import lodash from 'lodash'

interface Props {
  images: string[]
  className?: string
}

const Rotate = ({ images, className }: Props) => {
	let [, setCurrentImageIndex] = useState(0)
	const currentImageIndex = useRef(0)

  useEffect(() => {
    const handleWheel = (event: MouseWheelEvent): void => {
      const isScrollingUp = event.deltaY > 0 && currentImageIndex.current < images.length - 1
      const isScrollingDown = event.deltaY < 0 && currentImageIndex.current > 0
      const pageShouldScroll = currentImageIndex.current === images.length -1

      if (pageShouldScroll) {
        document.body.classList.add('scroll')
      }

      if (isScrollingUp) {
				setCurrentImageIndex(currentImageIndex.current += 1)
      } else if (isScrollingDown) {
        setCurrentImageIndex(currentImageIndex.current -= 1)
      }
    }

    window.addEventListener('wheel', lodash.throttle(handleWheel, 100))

		return () => window.removeEventListener('wheel', handleWheel)
	}, [images.length])

  return (
    <img
      alt={`apple ${currentImageIndex.current + 1}`}
      src={images[currentImageIndex.current]}
      className={className}
    />
  )
}

export default Rotate
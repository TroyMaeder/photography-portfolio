import React, { useEffect, useState, useRef } from 'react'
import lodash from 'lodash'

interface Props {
  images: string[]
  className?: string
}

const Rotate = ({ images, className }: Props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const length = useRef(images.length)
  const pageShouldScroll = currentImageIndex === Number(length) - 1

  if (pageShouldScroll) {
    document.body.classList.add('scroll')
  }

  useEffect(() => {
    // https://dmitripavlutin.com/react-hooks-stale-closures/
    const handleWheel = (event: MouseWheelEvent): void => {
      setCurrentImageIndex((currentImageIndex) => {
        if (event.deltaY > 0) {
          return Math.min(currentImageIndex + 1, length.current - 1)
        } else {
          return Math.max(currentImageIndex - 1, 0)
        }
      })
    }

    window.addEventListener('wheel', lodash.throttle(handleWheel, 100))

    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return (
    <img
      alt={`apple ${currentImageIndex + 1}`}
      src={images[currentImageIndex]}
      className={className}
    />
  )
}

export default Rotate

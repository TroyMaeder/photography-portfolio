import React, { useEffect, useState } from 'react'
import _ from 'lodash'

interface Props {
  images: string[]
  className?: string
}

const Rotate = ({ images, className }: Props) => {
  let [imageIndex, setImageIndex] = useState(0)

  useEffect(() => {
    const handleWheel = (event: MouseWheelEvent): void => {
      const isScrollingUp = event.deltaY > 0 && imageIndex < images.length - 1
      const isScrollingDown = event.deltaY < 0 && imageIndex > 0
      const pageShouldScroll = imageIndex === images.length -1

      if (pageShouldScroll) {
        document.body.classList.add('scroll')
      }

      if (isScrollingUp) {
        setImageIndex(imageIndex += 1)
      } else if (isScrollingDown) {
        setImageIndex(imageIndex -= 1)
      }
    }

    window.addEventListener('wheel', _.throttle(handleWheel, 100))

    return () => window.removeEventListener('wheel', handleWheel)}, [])

  return (
    <img
      alt={`apple ${imageIndex + 1}`}
      src={images[imageIndex]}
      className={className}
    />
  )
}

export default Rotate
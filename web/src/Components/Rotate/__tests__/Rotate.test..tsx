import React from 'react'
import { mount } from 'enzyme'
import Rotate from '../Rotate'
import Images from '../../../assets/apples'
import { act } from 'react-dom/test-utils'

describe('Rotate', () => {
  it('updates image alt when wheel event is triggered', () => {
    const map = {} as any
    window.addEventListener = jest.fn((event, cb) => {
      map[event] = cb
    })

    const component = mount(<Rotate images={Images} />)

    act(() => {
      map.wheel({ deltaY: 1 })
    })

    expect(component.find('img').prop('alt')).toMatch('apple 1')
  })

  it('correctly adds a class', () => {
   const component = mount(
    <Rotate
      className="apples-make-me-smile"
      images={Images}
    />)

    expect(component.find('img').prop('className')).toMatch('apples-make-me-smile')
  })
})
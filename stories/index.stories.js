import React from 'react'
import { storiesOf } from '@storybook/react'
import DragSort from '../src/index'
import testData from './testData'

import './index.stories.scss'

storiesOf('拖放组件', module)
  .add('demo1', () => {
    const DragSortItem=DragSort.Item
    const handleChange=(r)=>{
      console.log('输出新的排序结果:',r)
    }
    return (<DragSort 
      className="demo-1"
      onChange={handleChange}
    >
      {
        testData.map(item=>(<DragSortItem 
          className="drag-item"
          tag='div'
          key={item.id} 
          id={item.id}>{item.name}</DragSortItem>))
      }
    </DragSort>)
  })
  .add('demo2',()=>{
    const DragSortItem=DragSort.Item
    const handleChange=(r)=>{
      console.log('-----------',r)
    }
    return (<DragSort className="demo-2"    onChange={handleChange}>
      {
        testData.map(item=>(<DragSortItem 
          className="drag-item"
          tag='div'
          key={item.id} 
          id={item.id}>{item.name}</DragSortItem>))
      }
    </DragSort>)
  })

> 基于React的简单排序组件


##### 使用
```
npm install drag-sort-react
```
```js
    import DragSort from 'drag-sort-react'

    const DragSortItem=DragSort.Item
    const handleChange=(r)=>{
      console.log('输出新的排序结果:',r)
    }

    return (<DragSort className="demo-1" onChange={handleChange}>
      {
        testData.map(item=>(<DragSortItem 
          className="drag-item"
          tag='div'
          key={item.id} 
          id={item.id}>{item.name}</DragSortItem>))
      }
    </DragSort>)
``` 

`onChange`排序改变后触发的事件

##### 配置
> DragSort
```js
DragSort.defaultProps = {
    tag: "div",
    className: "",
    options: {
        draggable: true
    },
    onChange: noop
}

DragSort.propTypes = {
    // 元素将要渲染的Dom，默认div
    tag: PropTypes.string,
    // 元素的样式名 方便自定义样式
    className: PropTypes.string,
    // 元素开始拖放
    onStart: PropTypes.func,
    // 元素顺序改变后的回调事件
    onChange: PropTypes.func,
    // 配置
    options: PropTypes.shape({
        // 是否禁止拖放
        draggable: PropTypes.bool
    })
}
```

> DragSortItem

```js
DragSortItem.defaultProps = {
    tag: "div",
    className: "",
    draggable: true
}

DragSortItem.propTypes = {
    // 标记元素tag
    tag: PropTypes.string,
    // 类名字
    className: PropTypes.string,
    //当前item的id
    id: PropTypes.string.isRequired,
    // 当前元素是否支持拖拽
    draggable: PropTypes.bool
}
```


> 基于React的简单排序组件

##### 开发
```
npm install
npm run dev
```

##### 编译库
```
npm run build
```

##### 编译演示程序
```
build-storybook
```

### 组件需要实现的功能点
1. 组件实现暴露出`<DragSort>`组件，针对循环的列表采用`<DragSortitem></DragSortitem>`
其中`DragSortitem`=`DragSort.item`

2. 能够实现父组件针对`DragSort.item`自定义要渲染的元素
3. 支持对单个列的控制，某个列禁止拖动
4. 支持对当前正在拖放的元素增加class
5. 支持设置`DragSort`是否能拖动
7. 支持恢复排序
8. 列表元素的拖放排序与列表的排布无关系(横向排序，纵向排序)
9. 暴露出相关事件
    - `onStart` 开始拖动
    - `onChange` 排序改变后触发的事件

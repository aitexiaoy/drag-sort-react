### 组件需要实现的功能点
1. 组件实现暴露出`<DragSort>`组件，针对循环的列表采用`<DragSortitem></DragSortitem>`
其中`DragSortitem`=`DragSort.item`

2. 能够实现父组件针对`DragSort.item`自定义要渲染的元素
3. 支持对单个列的控制，某个列禁止拖动
4. 支持对当前正在拖放的元素增加class
5. 支持设置`DragSort`是否能拖动
6. 设置是否支持影子元素来模拟被插入的元素的位置
7. 支持恢复排序
8. 列表元素的拖放排序与列表的排布无关系(横向排序，纵向排序)
9. 暴露出相关事件
    - `onChoose` 列表中元素被选择
    - `onStart` 开始拖动
    - `onEnd` 拖放结束
    - `onUpdate` 顺序更换后的回调

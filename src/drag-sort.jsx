import React from "react"
import { PureComponent, PropTypes } from "../libs"

const noop = () => {
    return false
}
export default class DragSort extends PureComponent {
    constructor(props) {
        super(props), (this.dragItemList = [])
        this.currentDragSortItem = null
        this.DragSortDom = null
        this.state = {}
    }

    componentDidMount() {
        const {options:{draggable}}=this.props
        if(draggable){
            this.DragSortDom.style.cursor='move'
        }
    }

    getChildContext() {
        return {
            component: this
        }
    }

    addDragItem = item => {
        this.dragItemList.push(item)
    }

    removeDragItem = item => {
        if (item) {
            this.dragItemList.splice(this.dragItemList.indexOf(item), 1)
        }
    }

    // 拖拽前的判断
    handleMouseDown = e => {
        const { options } = this.props
        const type = e.type
        const target = e.target
        // 必须是鼠标左键
        if ((/mousedown|pointerdown/.test(type) && e.button !== 0) || options.draggable === false) {
            return
        }
        // 子元素设置draggable为true
        this.currentDragSortItem = this.dragItemList.find(item => item.node === target)
        if (this.currentDragSortItem.props.draggable === true) {
            // 允许当前元素能被拖动
            target.setAttribute("draggable", true)
        } else {
            return
        }
    }

    // 拖放到元素上
    handleDragEnter = e => {
        if (e.target === this.DragSortDom) {
            return
        }
        // 将拖动的元素插入到被覆盖的元素之前
        this.DragSortDom.insertBefore(this.currentDragSortItem.node, e.target)
    }

    // 离开元素
    handleDragLeave = e => {
        const { DragSortDom, currentDragSortItem } = this
        // 拖动的不是最后一个元素并且拖动元素离开了最后一个元素
        if (currentDragSortItem.node !== e.target && e.target === this.DragSortDom.lastChild) {
           // 插入到最后一个元素之后
            DragSortDom.appendChild(currentDragSortItem.node)
        }
    }

    // 开始拖放
    handleDragStart = e => {}

    // 拖放结束
    handleDragEnd = e => {
        // 设置当前元素不能拖动
        e.target.setAttribute("draggable", false)
        const { onChange } = this.props
        // 返回结果
        onChange(this.getIdsByDom())
    }

    // 根据dom获取到id的顺序
    getIdsByDom = () => {
        const resultSort = []
        this.DragSortDom.childNodes.forEach(i => {
            resultSort.push(i.getAttribute("data-id"))
        })
        return resultSort
    }

    render() {
        const { tag: Component, className } = this.props
        return (
            <Component
                ref={e => {
                    this.DragSortDom = e
                }}
                className={className}
                onDragEnter={this.handleDragEnter}
                onDragLeave={this.handleDragLeave}
                onMouseDown={this.handleMouseDown}
                onDragStart={this.handleDragStart}
                onDragEnd={this.handleDragEnd}
            >
                {this.props.children}
            </Component>
        )
    }
}

DragSort.childContextTypes = {
    component: PropTypes.any
}

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

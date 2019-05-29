import React from "react"
import { PureComponent, PropTypes } from "../libs"

export default class DragSortItem extends PureComponent {
    constructor(props) {
        super(props)
        this.node = null
    }

    componentDidMount() {
        this.parent().addDragItem(this)
    }

    componentWillMount() {
        this.parent().removeDragItem(this)
    }

    /**
     * 获得父元素
     */
    parent = () => {
        return this.context.component
    }

    render() {
        const { tag: Component, id, className } = this.props
        return (
            <Component
                data-id={id}
                className={className}
                ref={e => {
                    this.node = e
                }}
            >
                {this.props.children}
            </Component>
        )
    }
}

DragSortItem.contextTypes = {
    component: PropTypes.any
}

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

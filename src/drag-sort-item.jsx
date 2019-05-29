import React from "react";
import { PureComponent, PropTypes } from "../libs";

export default class DragSortItem extends PureComponent {
  constructor(props) {
    super(props);
    this.node=null;
  }

  componentDidMount(){
      this.parent().addDragItem(this)
  }

  componentWillMount(){
    this.parent().removeDragItem(this)
  }

  /**
   * 获得父元素
   */
  parent = () => {
    return this.context.component;
  };
  // 拖动事件
  domdrugstart = (e, currentData) => {
    const { key } = this;
    const { data } = this.props;
    this.currentDragData = currentData;
    const node = e.target;
    const contentNode = node.firstElementChild;
    // contentNode.className = contentNode.className.replace('selectlist-selectitem-drag-datamodel', '')
    this.currentDragNodeWidth = contentNode.clientWidth;
    this.dragIngIndex = _.findIndex(
      data,
      item => item[key] === currentData[key]
    );
  };

  // 拖动后鼠标进入另一个可接受区域
  dragenter = (e, enterData) => {
    const { currentDragData, key, currentDragNodeWidth } = this;
    const { data, onChange } = this.props;
    this.enterDragData = enterData;
    if (
      !enterData[key] ||
      this.dragIngIndex === -1 ||
      enterData[key] === currentDragData[key]
    ) {
      return;
    }
    console.log("============进来了", enterData.name);
    this.dragEnterIndex = _.findIndex(
      data,
      item => item[key] === enterData[key]
    );
    data.splice(this.dragIngIndex, 1);
    data.splice(this.dragEnterIndex, 0, "kongdezhanweide");
    console.log(this.dragIngIndex, this.dragEnterIndex);
    onChange(data);

    window.setTimeout(() => {
      this.kongdeNode.style.width = `${currentDragNodeWidth}px`;
    }, 50);
    window.clearTimeout(this.throttleTime);
  };

  // a拖到b，离开b的时候触发
  dragleave = (e, leaveData) => {
    const { enterDragData, key } = this;
    console.log("============离开了", leaveData.name);
    if (enterDragData[key] === leaveData[key] && this.throttleTime) {
      window.clearTimeout(this.throttleTime);
      this.throttleTime = 0;
    }
    if (!leaveData[key]) {
      const { data, onChange } = this.props;
      data.splice(this.dragEnterIndex, 1, this.currentDragData);
      onChange(data);
    }
  };

  drop = e => {
    e.preventDefault();
    const { data, onChange } = this.props;
    console.log("=================================");
    data.splice(this.dragEnterIndex, 1, this.currentDragData);
    onChange(data);
  };

  dragOver = e => {
    e.preventDefault();
    console.log("==================dragOver");
  };

  render() {
    const { tag: Component, id, className, draggable } = this.props;
    return (
      <Component
        data-id={id}
        className={className}
        ref={e=>{this.node=e}}
        // draggable={draggable}
        // onDragEnter={(e) => { this.dragenter(e, id) }}
        // onDragLeave={(e) => { this.dragleave(e, id) }}
        // onDragStart={(e) => { this.domdrugstart(e, id) }}
        // onDrop={(e) => { this.drop(e, id) }}
        // onDragOver={e => this.dragOver(e, id)}
      >
        {this.props.children}
      </Component>
    );
  }
}

DragSortItem.contextTypes = {
  component: PropTypes.any
};

DragSortItem.defaultProps = {
  tag: "div",
  className: "",
  draggable: true
};

DragSortItem.propTypes = {
  tag: PropTypes.string, // 标记元素tag
  className: PropTypes.string, // 类名字
  id: PropTypes.string.isRequired, //当前item的id
  draggable: PropTypes.bool // 当前元素是否支持拖拽
};

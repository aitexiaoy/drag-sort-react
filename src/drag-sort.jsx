import React from "react"
import { PureComponent, PropTypes } from '../libs'

export default class DragSort extends PureComponent {
  constructor(props) {
    super(props),
    this.dragItemList=[]
    this.currentDragSortItem=null
    this.DragSortDom=null
  }

  getChildContext(){
    return {
      component: this
    };
  }

  addDragItem=(item)=> {
    this.dragItemList.push(item);
  }

  removeDragItem=(item)=>{
    if (item) {
      this.dragItemList.splice(this.dragItemList.indexOf(item), 1);
    }
  }

  // 拖拽前的判断
  handleMouseDown=(e)=>{
    const {options}=this.props

    const type=e.type
    const target=e.target
    const originalTarget = e.target.shadowRoot && (e.path && e.path[0]) || target
    console.log(target,originalTarget)

    // 必须是鼠标左键
    if (/mousedown|pointerdown/.test(type) && e.button !== 0 || options.disabled) {
        return; 
    }

    // 子元素设置draggable为true
    this.currentDragSortItem=this.dragItemList.find(item=>item.node===target)
    if(this.currentDragSortItem.props.draggable===true){
        target.setAttribute('draggable',true)
    }
    else{
        return
    }

    }

    // 拖放到元素上
    handleDragEnter=(e)=>{
        console.log('==========================拖到元素上',e.target)
        if(e.target===this.DragSortDom){
          return 
        }
        this.DragSortDom.insertBefore(this.currentDragSortItem.node,e.target)
    }

    // 离开元素
    handleDragLeave=(e)=>{
        console.log('=====================离开',e.target)
        const {DragSortDom,currentDragSortItem}=this
        if(currentDragSortItem.node!==e.target&&e.target===this.dragItemList[this.dragItemList.length-1].node){
            DragSortDom.appendChild(currentDragSortItem.node)
        }
    }

    // 开始拖放
    handleDragStart=(e)=>{
        console.log('============111111========开始拖放',e.target)
    }

    // 拖放结束
    handleDragEnd=(e)=>{
        console.log('============111111========拖放结束',e.target)
        e.target.setAttribute('draggable',false)
    }

  render(){
      const {tag:Component,className}=this.props
      return (<Component 
        ref={e=>{this.DragSortDom=e}}
        className={className}
        onDragEnter={this.handleDragEnter}
        onDragLeave={this.handleDragLeave}
        onMouseDown={this.handleMouseDown}
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
        >{this.props.children}</Component>)
  }
}

DragSort.childContextTypes={
    component:PropTypes.any
}


DragSort.defaultProps={
    tag:'div',
    className: '',
    options:{
        disabled:false
    }
}

DragSort.propTypes = {
    tag:PropTypes.string,
    className: PropTypes.string,
    options:PropTypes.shape({
        disabled:PropTypes.bool
    })
};

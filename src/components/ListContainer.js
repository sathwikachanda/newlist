import React from 'react'
import ListItem from './ListItem'

const ListContainer = ({ 
  title, 
  items = [],
  isSelectable, 
  isSelected, 
  onSelect, 
  onMoveItem,
  arrowDirection,
  arrowTitle,
  containerClass = "list-container"
}) => (
  <div className="list-box">
    <div className="list-header">
      <h3 className="list-title">{title}</h3>
      {isSelectable && (
        <input
          type="checkbox"
          className="list-checkbox"
          checked={isSelected}
          onChange={onSelect}
        />
      )}
    </div>
    <div className={containerClass}>
      {items?.map(item => (
        <ListItem
          key={item.id}
          item={item}
          onMove={onMoveItem}
          arrowDirection={arrowDirection}
          arrowTitle={arrowTitle}
        />
      ))}
    </div>
  </div>
)

export default ListContainer 
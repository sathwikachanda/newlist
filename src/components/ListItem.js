import React from 'react'

const ListItem = ({ item, onMove, arrowDirection, arrowTitle }) => (
  <div className="list-item">
    <div className="item-content">
      <p className="item-name">{item.name}</p>
      <p className="description">{item.description}</p>
    </div>
    {arrowDirection && (
      <button 
        className="arrow-button" 
        onClick={() => onMove(item)}
        title={arrowTitle}
      >
        {typeof arrowDirection === 'function' 
          ? arrowDirection(item) === 'left' ? '←' : '→'
          : arrowDirection === 'left' ? '←' : '→'
        }
      </button>
    )}
  </div>
)

export default ListItem 
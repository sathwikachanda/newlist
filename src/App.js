import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
  fetchLists, 
  selectList, 
  moveItem, 
  setCreatingList,
  cancelChanges,
  updateChanges
} from './store/actions'
import ListContainer from './components/ListContainer'
import './App.css'

function App() {
  const dispatch = useDispatch()
  const { 
    lists, 
    selectedLists, 
    isCreatingList, 
    newList, 
    loading, 
    error 
  } = useSelector(state => state)
  console.log("lists", lists)
  console.log("selectedLists", selectedLists)
  console.log("isCreatingList", isCreatingList)
  console.log("newList", newList)
  console.log("loading", loading)
  console.log("error", error)

  useEffect(() => {
    dispatch(fetchLists())
  }, [dispatch])

  const handleCreateNewList = () => {
    if (selectedLists.length !== 2) {
      alert('You should select exactly 2 lists to create a new list')
      return
    }
    dispatch(setCreatingList(true))
  }

  const handleMoveItem = (item, fromList, targetList) => {
    dispatch(moveItem(item, fromList, targetList))
  }

  const renderLoadingView = () => (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  )

  const renderFailureView = () => (
    <div className="failure-container">
      <img 
        src="https://assets.ccbp.in/frontend/content/react-js/list-creation-failure-lg-output.png" 
        alt="failure view"
      />
      <button onClick={() => dispatch(fetchLists())}>Try Again</button>
    </div>
  )

  const renderListCreationView = () => (
    <div className="list-creation-container">
      <div className="header">
        <h2 className="section-title">Create New List</h2>
      </div>
      <div className="lists-row">
        <ListContainer
          title={`List ${selectedLists[0]} (${lists[selectedLists[0]]?.length || 0})`}
          items={lists[selectedLists[0]]}
          onMoveItem={(item) => handleMoveItem(item, selectedLists[0], 'new')}
          arrowDirection="right"
          arrowTitle="Move to new list"
        />

        <ListContainer
          title={`List 3 (${newList.length})`}
          items={newList}
          containerClass="new-list-container"
          onMoveItem={(item) => handleMoveItem(item, 'new', item.originalList === selectedLists[0] ? selectedLists[1] : selectedLists[0])}
          arrowDirection={(item) => item.originalList === selectedLists[0] ? 'right' : 'left'}
          arrowTitle={(item) => `Move to List ${item.originalList === selectedLists[0] ? selectedLists[1] : selectedLists[0]}`}
        />

        <ListContainer
          title={`List ${selectedLists[1]} (${lists[selectedLists[1]]?.length || 0})`}
          items={lists[selectedLists[1]]}
          onMoveItem={(item) => handleMoveItem(item, selectedLists[1], 'new')}
          arrowDirection="left"
          arrowTitle="Move to new list"
        />
      </div>
      
      <div className="buttons-container">
        <button 
          className="action-button cancel-button" 
          onClick={() => dispatch(cancelChanges())}
        >
          Cancel
        </button>
        <button 
          className="action-button update-button" 
          onClick={() => dispatch(updateChanges())}
        >
          Update
        </button>
      </div>
    </div>
  )

  const renderSuccessView = () => (
    <>
      <button 
        className="create-button"
        onClick={handleCreateNewList}
      >
        Create a new list
      </button>
      <div className="lists-container">
        {isCreatingList ? (
          renderListCreationView()
        ) : (
          <div className="lists-row">
            {[1, 2].map(listNumber => (
              <ListContainer
                key={listNumber}
                title={`List ${listNumber} (${lists[listNumber]?.length || 0})`}
                items={lists[listNumber]}
                isSelectable
                isSelected={selectedLists.includes(listNumber)}
                onSelect={() => dispatch(selectList(listNumber))}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )

  if (loading) return renderLoadingView()
  if (error) return renderFailureView()
  return (
    <div className="app-container">
      <h1>List Creation</h1>
      {renderSuccessView()}
    </div>
  )
}

export default App

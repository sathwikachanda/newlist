import { LIST_TYPES } from './types'

export const fetchLists = () => async (dispatch) => {
  dispatch({ type: LIST_TYPES.FETCH_LISTS_REQUEST })
  
  try {
    const response = await fetch('https://apis.ccbp.in/list-creation/lists')
    const data = await response.json()
    
    const organizedLists = {
      1: data.lists.filter(item => item.list_number === 1),
      2: data.lists.filter(item => item.list_number === 2)
    }
    
    dispatch({ 
      type: LIST_TYPES.FETCH_LISTS_SUCCESS, 
      payload: organizedLists 
    })
  } catch (error) {
    dispatch({ 
      type: LIST_TYPES.FETCH_LISTS_FAILURE, 
      payload: error.message 
    })
  }
}

export const selectList = (listNumber) => ({
  type: LIST_TYPES.SELECT_LIST,
  payload: listNumber
})

export const moveItem = (item, fromList, targetList) => ({
  type: LIST_TYPES.MOVE_ITEM,
  payload: { item, fromList, targetList }
})

export const setCreatingList = (isCreating) => ({
  type: LIST_TYPES.SET_CREATING_LIST,
  payload: isCreating
})

export const cancelChanges = () => ({
  type: LIST_TYPES.CANCEL_CHANGES
})

export const updateChanges = () => ({
  type: LIST_TYPES.UPDATE_CHANGES
}) 
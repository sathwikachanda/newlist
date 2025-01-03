import { LIST_TYPES } from './types'

const initialState = {
  lists: {},
  originalLists: {},
  selectedLists: [],
  newList: [],
  isCreatingList: false,
  loading: false,
  error: null
}

export const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_TYPES.FETCH_LISTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }

    case LIST_TYPES.FETCH_LISTS_SUCCESS:
      return {
        ...state,
        lists: action.payload,
        originalLists: action.payload,
        loading: false
      }

    case LIST_TYPES.FETCH_LISTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case LIST_TYPES.SELECT_LIST:
      const listNumber = action.payload
      const isSelected = state.selectedLists.includes(listNumber)
      
      return {
        ...state,
        selectedLists: isSelected
          ? state.selectedLists.filter(num => num !== listNumber)
          : state.selectedLists.length < 2
            ? [...state.selectedLists, listNumber]
            : state.selectedLists
      }

    case LIST_TYPES.MOVE_ITEM:
      const { item, fromList, targetList } = action.payload
      
      if (fromList === 'new') {
        return {
          ...state,
          newList: state.newList.filter(i => i.id !== item.id),
          lists: {
            ...state.lists,
            [targetList]: [...state.lists[targetList], item]
          }
        }
      } else {
        return {
          ...state,
          lists: {
            ...state.lists,
            [fromList]: state.lists[fromList].filter(i => i.id !== item.id)
          },
          newList: [...state.newList, {
            ...item,
            originalList: fromList
          }]
        }
      }

    case LIST_TYPES.SET_CREATING_LIST:
      return {
        ...state,
        isCreatingList: action.payload,
        lists: action.payload ? {...state.lists} : state.lists,
        newList: []
      }

    case LIST_TYPES.CANCEL_CHANGES:
      return {
        ...state,
        lists: JSON.parse(JSON.stringify(state.originalLists)),
        newList: [],
        isCreatingList: false,
        selectedLists: []
      }

    case LIST_TYPES.UPDATE_CHANGES:
      const updatedLists = { ...state.lists }
      
      state.newList.forEach(item => {
        const targetList = item.originalList === state.selectedLists[0] 
          ? state.selectedLists[1] 
          : state.selectedLists[0]
        
        updatedLists[targetList] = [...updatedLists[targetList], item]
      })

      return {
        ...state,
        lists: updatedLists,
        originalLists: JSON.parse(JSON.stringify(updatedLists)),
        newList: [],
        isCreatingList: false,
        selectedLists: []
      }

    default:
      return state
  }
} 
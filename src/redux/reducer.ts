import { ItemTypes } from "../ide/DndConstants";

interface Widget {
  type: ItemTypes;
  id: number;
}

export interface ReduxState {
  widgets: Widget[];
}

const initialState: ReduxState = {
  widgets: [
    {
      type: ItemTypes.Widget,
      id: 0,
    },
    {
      type: ItemTypes.Group,
      id: 1,
    },
  ],
};

export default function reducer(
  state: ReduxState = initialState,
  action: any
): ReduxState {
  if (action.type === "ADD_ITEM") {
    return {
      ...state,
      widgets: [
        ...state.widgets,
        {
          type: action.itemType,
          id: state.widgets.length,
        },
      ],
    };
  }
  return state;
}

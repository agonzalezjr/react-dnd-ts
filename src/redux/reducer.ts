import { ItemTypes } from "../ide/DndConstants";
import { DropPosition } from "../ide/Widget";

interface Widget {
  type: ItemTypes;
  id: number;
  // for a group
  widgets?: Widget[];
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
      widgets: [],
    },
  ],
};

export default function reducer(
  state: ReduxState = initialState,
  action: any
): ReduxState {
  if (action.type === "ADD_ITEM") {
    console.log(`> reducer.addItem = ${JSON.stringify(action)}`);
    console.log(`> reducer.widgets = ${JSON.stringify(state.widgets)}`);

    let newWidgets = [...state.widgets];

    if (action.id === -1) {
      // it's a new widget
      action.id = state.widgets.length;
    } else {
      // remove the widget from the list
      newWidgets = state.widgets.filter((widget) => widget.id !== action.id);
    }

    if (action.reference !== undefined) {
      const pos = newWidgets.findIndex(
        (widget) => widget.id === action.reference
      );
      if (pos === 0 && action.dropPosition === DropPosition.Before) {
        newWidgets.unshift({
          type: action.itemType,
          id: action.id,
        });
      } else if (
        pos === newWidgets.length - 1 &&
        action.dropPosition === DropPosition.After
      ) {
        newWidgets.push({
          type: action.itemType,
          id: action.id,
        });
      } else if (action.dropPosition === DropPosition.Inside) {
        const innerWidgets = newWidgets[pos].widgets;
        if (innerWidgets) {
          innerWidgets.push({
            type: action.itemType,
            id: action.id,
          });
        }
      } else {
        const splicePos =
          action.dropPosition === DropPosition.Before ? pos : pos + 1;
        newWidgets.splice(splicePos, 0, {
          type: action.itemType,
          id: action.id,
        });
      }
    } else {
      // put it at the end
      newWidgets.push({
        type: action.itemType,
        id: action.id,
      });
    }

    console.log(`> reducer.newWidgets = ${JSON.stringify(newWidgets)}`);

    return {
      ...state,
      widgets: newWidgets,
    };
  }
  return state;
}

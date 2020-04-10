interface Field {
  id: number;
}

export interface ReduxState {
  fields: Field[];
}

const initialState: ReduxState = {
  fields: [{ id: 1 }],
};

export default function reducer(
  state: ReduxState = initialState,
  action: any
): ReduxState {
  return state;
}

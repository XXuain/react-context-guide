import { useReducer } from "react";
import CardContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cardReducer = (state, action) => {
  const actionTypeHandle = {
    ADD: () => {
      const updateTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      let updateItems;

      if (state.items[existingIndex]) {
        updateItems = [...state.items];
        updateItems[existingIndex] = {
          ...state.items[existingIndex],
          amount: state.items[existingIndex].amount + action.item.amount,
        };
      } else {
        updateItems = state.items.concat(action.item);
      }

      return {
        items: updateItems,
        totalAmount: updateTotalAmount,
      };
    },
    REMOVE: () => {},
  };
  return actionTypeHandle[action.type]
    ? actionTypeHandle[action.type]()
    : defaultCartState;
};

const CardProvider = ({ children }) => {
  const [cardState, dispatchCartAction] = useReducer(
    cardReducer,
    defaultCartState
  );

  const addItemToCardHandler = (item) => {
    dispatchCartAction({ type: "ADD", item });
  };
  const removeItemFormCardHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id });
  };

  // this will be dynamic
  const cartContext = {
    items: cardState.items,
    totalAmount: cardState.totalAmount,
    addItem: addItemToCardHandler,
    removeItem: removeItemFormCardHandler,
  };
  return (
    <CardContext.Provider value={cartContext}>{children}</CardContext.Provider>
  );
};

export default CardProvider;

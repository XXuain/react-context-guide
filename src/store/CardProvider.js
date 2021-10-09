import { useReducer } from "react";
import CardContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cardReducer = (state, action) => {
  const actionTypeHandle = {
    ADD: () => {
      const updateItems = state.items.concat(action.item);
      const updateTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
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

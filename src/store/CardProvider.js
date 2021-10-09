import CardContext from "./cart-context";

const CardProvider = ({ children }) => {
  const addItemToCardHandler = (item) => {};
  const removeItemFormCardHandler = (id) => {};

  // this will be dynamic
  const cartContext = {
    items: [],
    totalAmount: 0,
    addItem: addItemToCardHandler,
    removeItem: removeItemFormCardHandler,
  };
  return (
    <CardContext.Provider value={cartContext}>{children}</CardContext.Provider>
  );
};

export default CardProvider;

import { useContext, useEffect, useState } from "react";
import CardContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CardContext);
  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNum, item) => {
    return curNum + item.amount;
  }, 0);

  const [isHightLight, setIsHightLight] = useState(false);
  const btnClasses = `${classes.button} ${isHightLight ? classes.bump : ""}`;
  useEffect(() => {
    if (items.length === 0) return;
    setIsHightLight(true);

    const timer = setTimeout(() => {
      setIsHightLight(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;

import React, { useState, useEffect } from "react";
import "./todo.scss";

export default function Test() {
  const [check, setCheck] = useState([false, false, false, false]);
  const [number, setNumber] = useState(0);
  const [listId, setId] = useState(0);

  const arr = [];

  console.log("Рендер");

  const toggleChange = (checked, id, qqq) => {
    let temp = checked === true ? false : true;

    let qq = check.map((item, index) => {
      if (index === Number(id)) {
        return temp;
      }
      else {
        return item;
      }
    });

    return setCheck(qq);
  };

  const checkedAll = (element) => {
    element.preventDefault();
    let temp = check.map((item) => {
      if (item === false) {
        return true;
      } else {
        return item;
      }
    });

    return setCheck(temp);
  };

  const unCheckedAll = (element) => {
    element.preventDefault();
    let temp = check.map((item) => {
      if (item === true) {
        return false;
      } else {
        return item;
      }
    });
     setCheck(temp);
  };

  for (let i = 0; i < 4; i++) {
    arr.push(
      <input
        type="checkbox"
        key={i}
        id={i}
        checked={check[i]}
        onChange={(e) => toggleChange(check[i], e.target.id)}
      />
    );
  }

  return (
    <form className="form-checked">
      {arr}
      <button onClick={checkedAll}>Отметить все</button>
      <button onClick={unCheckedAll}>Снять метку всем</button>
    </form>
  );
}

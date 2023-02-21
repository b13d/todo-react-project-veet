import React, { useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import "./todo.scss";

const arr = [];

export default function Main() {
  const [list, setList] = useState([]);
  const [id, setId] = useState(0);
  const [check, setCheck] = useState([]);
  const [listWord, setListWords] = useState([]);
  const [cross, setCross] = useState([]);
  const [buttons, activeButtons] = useState("hidden");

  const inputElement = useRef();

  const handleChange = (event, element, idCheck) => {
    event.preventDefault();

    let newCheckList = check.map((value, index) => {
      if (idCheck === index) {
        let temp = value === true ? false : true;
        return temp;
      } else {
        return value;
      }
    });

    let count = 0;

    newCheckList.map((value, index) => {
      if (value === true) {
        count++;
      }
    });

    if (count > 0) {
      activeButtons("buttons-check");
    } else {
      activeButtons("hidden");
    }
    setCheck(newCheckList);
  };

  const handleSubmitChecked = (event) => {
    event.preventDefault();

    const arrIndex = [];

    check.map((value, index) => {
      if (value === true) {
        arrIndex.push(index);
        return true;
      }
      return false;
    });

    let z = 0;

    let temp = cross.map((value, index) => {
      if (arrIndex[z] === index) {
        z++;
        return "list__p--cross";
      } else {
        return "list__li";
      }
    });

    setCross(temp);
  };

  const handleSubmitDelete = (event) => {
    event.preventDefault();

    let arrIndexDel = [];

    let temp = check.map((value, index) => {
      if (value === true) {
        arrIndexDel.push(index);
        return index;
      }
    });

    if (arrIndexDel.length > 0) Delete(arrIndexDel);
  };

  const handleSubmitCheckedAll = (event) => {
    event.preventDefault();

    let temp = check.map((value) => {
      if (value === false) {
        return true;
      } else {
        return true;
      }
    });

    setCheck(temp);
  };

  const handleSubmitUnCheckedAll = (event) => {
    event.preventDefault();

    let temp = check.map((value) => {
      if (value === true) {
        return false;
      } else {
        return false;
      }
    });

    let tempCross = cross.map((value) => {
      if (value === "list__p--cross") {
        return "list__li";
      } else {
        return "list__li";
      }
    });

    setCross(tempCross);
    setCheck(temp);
  };

  return (
    <div>
      <Body />
    </div>
  );

  function Body() {
    return (
      <div>
        <form className="todo-form">
          <div className="header-form">
            <label className="todo-form__label" htmlFor="#">
              My To Do List
            </label>
            <div className="header-form__input">
              <input
                autoFocus
                ref={inputElement}
                className="todo-form__input"
                type="text"
                placeholder="Title..."
              />
              <button
                className="todo-form__button"
                onClick={(e) => {
                  e.preventDefault();
                  AddTask(e);
                }}
              >
                Add
              </button>
            </div>
            <div className={buttons}>
              <button className="btn-check" onClick={handleSubmitChecked}>
                Сделать отмеченными
              </button>
              <button className="btn-check" onClick={handleSubmitDelete}>
                Удалить
              </button>
              <button className="btn-check" onClick={handleSubmitCheckedAll}>
                Выбрать все
              </button>
              <button className="btn-check" onClick={handleSubmitUnCheckedAll}>
                Отменить все
              </button>
            </div>
          </div>
          <div>
            <ul className="list">{<ListDraw />}</ul>
          </div>
        </form>
      </div>
    );
  }

  function ListDraw() {
    const listItems = [];

    for (let i = 0; i < check.length; i++) {
      listItems.push(
        <a
          key={list[i].key}
          className="list__link"
          onClick={(e) => Cross(e, i)}
        >
          <li className={cross[i]}>
            <p className="list__p">{listWord[i]}</p>

            <div className="list__buttons">
              <input
                id={list[i].key}
                className="checkbox"
                type="checkbox"
                checked={check[i]}
                onChange={(e) => handleChange(e, arr[i], i)}
              />
              <button
                type="submit"
                onClick={(e) => {
                  Delete(list[i].key);
                }}
                className="list__button"
              >
                ×
              </button>
            </div>
          </li>
        </a>
      );
    }

    return listItems;
  }

  function AddTask(e) {
    if (inputElement.current.value.trim().length !== 0) {
      let arr = check;
      let arrWords = [];
      const arrList = [];
      let crossList = [];

      crossList = cross;
      arrWords = listWord;
      crossList.push("list__li");
      arrWords.push(inputElement.current.value);
      arr.push(false);
      setListWords(arrWords);

      for (let i = 0; i < arr.length; i++) {
        arrList.push(
          <a key={i} className="list__link" onClick={(e) => Cross(e, i)}>
            <li className="list__li">
              <p className="list__p">{inputElement.current.value}</p>
              <div className="list__buttons">
                <input
                  id={id}
                  className="checkbox"
                  type="checkbox"
                  checked={arr[i]}
                  onChange={(e) => handleChange(e, arr[i], i)}
                />
                <button
                  type="submit"
                  onClick={(e) => {
                    Delete(id);
                  }}
                  className="list__button"
                >
                  ×
                </button>
              </div>
            </li>
          </a>
        );
      }
      setCheck(arr);
      setList(arrList);
      setId((id) => id + 1);
      inputElement.current.value = "";
    } else {
      inputElement.current.value = "";
      alert("Вы ввели пустую строку!");
    }

    arr.push(list);
  }

  function Delete(id) {
    let arrReserve = [];
    let arrCheck = [];
    let arrWords = [];
    let arrCross = [];

    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < id.length; j++) {
        if (id[j].toString() === list[i].key) {
          break;
        } else if (j + 1 === id.length) {
          arrWords.push(listWord[i]);
          arrReserve.push(list[i]);
          arrCheck.push(check[i]);
          arrCross.push(cross[i]);
        }
      }
    }

    setListWords(arrWords);
    setCheck(arrCheck);
    setCross(arrCross);
    setList(arrReserve);

    if (arrReserve.length === 0) {
      activeButtons("hidden");
    }
  }

  function Cross(element, crossId) {
    element.preventDefault();

    let str = element.target.className;

    if (str !== "list__button" && str !== "checkbox") {
      if (str === "list__p") {
        str = element.target.parentElement.className;
        str =
          str === "list__p--cross"
            ? (str = "list__li")
            : (str = "list__p--cross");
      } else {
        str =
          str === "list__p--cross"
            ? (str = "list__li")
            : (str = "list__p--cross");
      }

      let arr = cross.map((value, index) => {
        if (crossId === index) {
          let temp = str;
          return temp;
        } else {
          return value;
        }
      });

      setCross(arr);
    }
  }
}

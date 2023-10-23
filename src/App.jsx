import { useState } from "react";
import "./App.css";
import { useRef } from "react";
import { useEffect } from "react";

function App() {
  const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

  let defaultTheme;
  if (isDarkTheme) {
    defaultTheme = localStorage.getItem("theme") || "dark";
  } else {
    defaultTheme = localStorage.getItem("theme") || "light";
  }

  const [theme, setTheme] = useState(defaultTheme);

  const handleChange = (e) => {
    setTheme(e.target.id);
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  });

  const [operation, setOperation] = useState("");
  const myRef = useRef();

  const addComma = (str) => {
    if (str.length > 3) {
      str = str.split("").reverse().join("");
      const regex = /.{3}/gi;
      const peaces = str.match(regex);
      const acc = peaces.length * 3;
      const modulo = str.length % acc;
      if (modulo) peaces.push(str.slice(acc));
      if (str.indexOf(".") != -1) {
        return peaces
          .reverse()
          .map((el) => el.split("").reverse().join(""))
          .join(",")
          .replace(/,(?=[^,]*$)/, "");
      } else {
        return peaces
          .reverse()
          .map((el) => el.split("").reverse().join(""))
          .join(",");
      }
    } else {
      return str;
    }
  };

  const handleClick = (e) => {
    if (e.target.value === "reset") {
      setOperation("");
      myRef.current.value = "";
    } else if (e.target.value === "=") {
      if (operation.split("").includes(".")) {
        myRef.current.value = addComma(eval(operation).toFixed(2));
      } else {
        myRef.current.value = addComma(`${eval(operation)}`);
      }
      setOperation(myRef.current.value);
    } else if (e.target.value === "del") {
      let list = myRef.current.value.split("").slice(0, -1);
      myRef.current.value = list.join("");
      setOperation(myRef.current.value);
      console.log(list);
    } else {
      setOperation((prev) => prev + e.target.value);
      myRef.current.value += e.target.value;
    }
  };
  return (
    <main
      className={theme === "dark" ? "" : theme === "light" ? "light" : "purple"}
    >
      <div className="Header">
        <a href="#" className="Header-Logo">
          calc
        </a>

        <div className="Header-ToggleBox">
          <p>theme</p>
          <div className="Header-ToggleBox-Form">
            <div className="Header-ToggleBox-Form-Nums">
              <p>1</p>
              <p>2</p>
              <p>3</p>
            </div>
            <div className="Header-ToggleBox-Form-Inputs">
              <input
                type="radio"
                name="theme"
                id="dark"
                checked={theme === "dark"}
                onChange={handleChange}
                aria-label="theme"
                className="Header-ToggleBox-Form-Inputs-Radio"
              />
              <input
                type="radio"
                name="theme"
                id="light"
                checked={theme === "light"}
                onChange={handleChange}
                aria-label="theme"
                className="Header-ToggleBox-Form-Inputs-Radio"
              />
              <input
                type="radio"
                name="theme"
                id="purple"
                checked={theme === "purple"}
                onChange={handleChange}
                aria-label="theme"
                className="Header-ToggleBox-Form-Inputs-Radio"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="Head">
        <input
          type="text"
          name="txt"
          id="txt"
          ref={myRef}
          className="Head-Input"
          disabled
          aria-label="result"
        />
      </div>
      <div className="CalculBox">
        <button className="Key" value={"7"} onClick={handleClick}>
          7
        </button>
        <button className="Key" value={"8"} onClick={handleClick}>
          8
        </button>
        <button className="Key" value={"9"} onClick={handleClick}>
          9
        </button>
        <button className="Key delKey" value={"del"} onClick={handleClick}>
          del
        </button>
        <button className="Key" value={"4"} onClick={handleClick}>
          4
        </button>
        <button className="Key" value={"5"} onClick={handleClick}>
          5
        </button>
        <button className="Key" value={"6"} onClick={handleClick}>
          6
        </button>
        <button className="Key" value={"+"} onClick={handleClick}>
          +
        </button>
        <button className="Key" value={"1"} onClick={handleClick}>
          1
        </button>
        <button className="Key" value={"2"} onClick={handleClick}>
          2
        </button>
        <button className="Key" value={"3"} onClick={handleClick}>
          3
        </button>
        <button className="Key" value={"-"} onClick={handleClick}>
          -
        </button>
        <button className="Key" value={"."} onClick={handleClick}>
          .
        </button>
        <button className="Key" value={"0"} onClick={handleClick}>
          0
        </button>
        <button className="Key" value={"/"} onClick={handleClick}>
          /
        </button>
        <button className="Key" value={"*"} onClick={handleClick}>
          x
        </button>
        <button className="Key resetKey" value={"reset"} onClick={handleClick}>
          reset
        </button>
        <button className="Key equalKey" value={"="} onClick={handleClick}>
          =
        </button>
      </div>
    </main>
  );
}

export default App;

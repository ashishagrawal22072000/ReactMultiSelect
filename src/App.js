import React, { useEffect, useState } from "react";
import "./App.css";
export default function App() {
  const [option, setOption] = useState([]);
  const [selected, setSelected] = useState([]);
  const [write, setWrite] = useState("");
  const [padding, setPadding] = useState(0);
  const handleClick = (data) => {
    setSelected([...selected, data]);
    const val = option.filter((ele) => {
      return ele !== data;
    });
    setOption(val);
    setPadding(padding + 110);
  };

  const restore = (ele) => {
    setOption([...option, ele]);
    const val = selected.filter((e) => {
      return e !== ele;
    });
    setSelected(val);
    setPadding(padding - 110);
  };

  const fetchData = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      console.log(data)
      setOption(
        data?.products.map((ele) => {
          return ele.title.slice(0, 10);
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <input
        type="text"
        className=" border border-5 fw-bold input"
        value={write}
        onChange={(e) => setWrite(e.target.value)}
        style={{ paddingLeft: `${padding}px` }}
        placeholder="What You Want Search..."
      />
      {selected.length > 0 ? (
        <>
          <div
            className="items"
          >
            {selected.map((ele) => {
              return (
                <>
                  <div
                    className="item"
                    style={{
                      marginLeft: "5px",
                      height: "30px",
                      width: "auto",
                    }}
                  >
                    <div>
                      <p
                        onClick={() => restore(ele)}
                      >
                        {ele}
                      </p>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                      <button
                        style={{
                          height: "10px",
                          width: "10px",
                          background: "transparent",
                          border: 0,
                        }}
                      >
                        X
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </>
      ) : (
        <></>
      )}
      <div style={{ marginTop: "100px" }}>
        {option
          .sort()
          .filter((ele) => {
            if (write === "") {
              return ele;
            } else if (ele.toLowerCase().startsWith(`${write}`)) {
              return ele;
            }
          })
          .map((ele) => {
            return (
              <>
                <div onClick={() => handleClick(ele)}>{ele}</div>
              </>
            );
          })}
      </div>
    </div>
  );
}

import "./App.scss";
import APIService from "./services/APIService";
import { useState } from "react";

import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function App() {
  const { getInfo } = APIService();
  const [list, setList] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [checkboxCounter, setCheckboxCounter] = useState(0);

  function checkValueOfCheckbox(value) {
    switch (`${value}`) {
      case "false":
        setCheckboxCounter((counter) => counter - 1);
        break;
      case "true":
        setCheckboxCounter((counter) => counter + 1);
        break;
      default:
        return;
    }
  }

  function getData(country) {
    getInfo(country).then((res) => setList(res));
  }

  function clearList() {
    setList("");
    setCheckboxCounter(0);
  }

  function renderList(list) {
    return (
      <Table>
        {list.map((item, i) => {
          return (
            <TableRow key={i + 1}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{item.code}</TableCell>
              <TableCell>{item.country}</TableCell>
              <TableCell>
                {item?.domains.map((domain, i) => {
                  if (i === item.domains.length - 1)
                    return (
                      <a href={`https://` + domain} target="_blank">
                        {domain}
                      </a>
                    );
                  return (
                    <a href={`https://` + domain} target="_blank">
                      {domain},
                    </a>
                  );
                })}
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                {item?.pages.map((page, i) => {
                  if (i === item.pages.length - 1)
                    return (
                      <a href={`https://` + page} target="_blank">
                        {page}
                      </a>
                    );
                  return (
                    <a href={`https://` + page} target="_blank">
                      {page},
                    </a>
                  );
                })}
              </TableCell>
              <TableCell>
                <Checkbox
                  type="checkbox"
                  onChange={(e) => checkValueOfCheckbox(e.target.checked)}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </Table>
    );
  }

  return (
    <>
      <div className="container">
        <header className="header">
          <TextField
            id="filled-basic"
            label="Filled"
            variant="filled"
            type="text"
            value={inputValue}
            onInput={(e) => setInputValue(e.target.value)}
          />

          <Button variant="contained" onClick={() => getData(inputValue)}>
            Отправить
          </Button>
          <Button variant="contained" onClick={clearList}>
            Сбросить
          </Button>
          <div className="counter">Counter: {checkboxCounter}</div>
        </header>

        {list ? renderList(list) : <h1>Type country...</h1>}
      </div>
    </>
  );
}

export default App;

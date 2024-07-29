import { useState } from "react";
import DATA from "../../../data";
import styles from "./styles.module.css";
// single selection
// multiselection

const Accordian = () => {
  const [isSelected, setIsSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(id) {
    setIsSelected(id === isSelected ? null : id);
  }

  function handleMultipleSelection(id) {
    let cpyMultiple = [...multiple];
    const itemIndex = cpyMultiple.indexOf(id);
    if (itemIndex === -1) {
      cpyMultiple.push(id);
    } else {
      cpyMultiple.splice(itemIndex, 1);
    }
    setMultiple(cpyMultiple);
  }

  console.log(isSelected, multiple);
  return (
    <div className={styles.wrapper}>
      <button
        onClick={() => {
          setEnableMultiSelection(!enableMultiSelection);
        }}
      >
        Enable multi selection
      </button>
      <div className={styles.accordian}>
        {DATA && DATA.length > 0 ? (
          DATA.map((data) => (
            <div className={styles.item} key={data.id}>
              <div
                onClick={() => {
                  enableMultiSelection
                    ? handleMultipleSelection(data.id)
                    : handleSingleSelection(data.id);
                }}
                className={styles.title}
              >
                <h3>{data.question}</h3>
                <span>
                  {enableMultiSelection && multiple.includes(data.id)
                    ? "-"
                    : isSelected === data.id
                    ? "-"
                    : "+"}
                </span>
              </div>
              {isSelected === data.id || multiple.indexOf(data.id) !== -1 ? (
                <div className={styles.content}>{data.answer}</div>
              ) : null}
            </div>
          ))
        ) : (
          <p>No data found1</p>
        )}
      </div>
    </div>
  );
};

export default Accordian;

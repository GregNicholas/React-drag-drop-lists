import React, { useState, useRef } from "react";
import "./styles.css";

const columns = ["list 1", "list 2", "list 3"];
const items = [
  { name: "item 1", status: "list 1" },
  { name: "item 2", status: "list 1" },
  { name: "item 3", status: "list 1" },
  { name: "item 4", status: "list 2" },
  { name: "item 5", status: "list 2" },
  { name: "item 6", status: "list 2" }
];

const App = () => {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const dragList = useRef();
  const dragOverList = useRef();
  const [lists, setLists] = useState(
    columns.map((col) => ({
      name: col,
      tasks: items.filter((item) => item.status === col)
    }))
  );

  const dragStart = (e, position, listIndex) => {
    dragItem.current = position;
    dragList.current = listIndex;
    // console.log(e.target.innerHTML);
  };

  const dragEnter = (e, position, listIndex) => {
    dragOverItem.current = position;
    dragOverList.current = listIndex;
    // console.log(e.target.parentElement);
    e.target.classList.add("drag-over");
    // const dragItemContent = list[dragItem.current];
    // if (dragItemContent.status !== e.target.getAttribute("data-status")) {
    //   e.target.classList.add("drop-target");
    // }
  };

  const dragLeave = (e) => {
    e.target.classList.remove("drag-over");
  };

  const dragOver = (e) => {
    // console.log("dragover");
    e.preventDefault();
  };

  const drop = (e) => {
    e.preventDefault();
    console.log("list ", dragList.current, "to", dragOverList.current);
    console.log("pos", dragItem.current, "to", dragOverItem.current);
    // const copyListItems = [...list];
    // const dragItemContent = copyListItems[dragItem.current];
    // copyListItems.splice(dragItem.current, 1);
    // copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    // dragItem.current = null;
    // dragOverItem.current = null;
    // setList(copyListItems);
    dragEnd(e); // call dragEnd function and pass the event object
  };

  const dragEnd = (e) => {
    e.target.classList.remove("drag-over");
  };

  return (
    <>
      {/* {list &&
        list.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "lightblue",
              margin: "20px 25%",
              textAlign: "center",
              fontSize: "40px"
            }}
            draggable
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => dragEnter(e, index)}
            onDragLeave={dragLeave}
            onDragOver={dragOver}
            onDrop={drop}
            onDragEnd={dragEnd}
          >
            {item}
          </div>
        ))} */}
      <div className="list-box">
        {lists &&
          lists.map((list, listIndex) => (
            <div key={listIndex} className="list">
              <h2>{list.name}</h2>
              {list.tasks.map((task, index) => (
                <div
                  key={index}
                  className="list-item"
                  draggable
                  onDragStart={(e) => dragStart(e, index, listIndex)}
                  onDragEnter={(e) => dragEnter(e, index, listIndex)}
                  onDragLeave={dragLeave}
                  onDragOver={dragOver}
                  onDrop={drop}
                  onDragEnd={dragEnd}
                >
                  {task.name}
                </div>
              ))}
            </div>
          ))}
      </div>
    </>
  );
};

export default App;

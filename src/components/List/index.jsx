import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./style.css";
const array = [
  {
    id: 1,
    name: "Item 1",
  },
  {
    id: 2,
    name: "Item 2",
  },
  {
    id: 3,
    name: "Item 3",
  },
  {
    id: 4,
    name: "Item 4",
  },
  {
    id: 5,
    name: "Item 5",
  },
  {
    id: 6,
    name: "Item 6",
  },
  {
    id: 7,
    name: "Item 7",
  },
  {
    id: 8,
    name: "Item 8",
  },
  {
    id: 9,
    name: "Item 9",
  },
  {
    id: 10,
    name: "Item 10",
  },
];
const array2 = [
  {
    id: 11,
    name: "Item 11",
  },
  {
    id: 12,
    name: "Item 12",
  },
  {
    id: 13,
    name: "Item 13",
  },
];
const List = () => {
  const [data, setData] = useState(array);
  const [data2, setData2] = useState(array2);
  const handleDragEnd = (result) => {
    console.log(result);
    const from = result.source.index;
    const to = result.destination.index;
    // console.log(data[from], data[to]);
    // const newData = [...data].splice(from, 0, data[to]);
    const newData = [...data];
    const dataDeleted = newData.splice(from, 1);
    // newData.splice(to, 0, ...dataDeleted);
    setData((prevState) => {
      prevState = [...prevState];
      prevState.splice(from, 1);
      prevState.splice(to, 0, ...dataDeleted);
      return prevState;
    });
  };
  console.log(data);
  return (
    <div className="box">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="1">
          {(provided) => (
            <ul
              className="list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            ></ul>
          )}
        </Droppable>
        <Droppable droppableId="item2">
          {(provided) => {
            return (
              <ul
                className="list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {data2.map((item, index) => (
                  <Draggable
                    key={item.id}
                    index={index}
                    draggableId={item.id.toString()}
                  >
                    {(provided) => (
                      <li
                        className="item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {item.name}
                      </li>
                    )}
                  </Draggable>
                ))}
              </ul>
            );
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default List;

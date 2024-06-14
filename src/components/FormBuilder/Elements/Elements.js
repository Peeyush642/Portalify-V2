import React, { useState, useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { UserContext } from "../../../context/FormBuilderContext.js";
import styles from "./Elements.module.css";
import Image from "next/image";
import styled from "styled-components";

const Item = styled.div``;
const List = styled.div``;

const Kiosk = styled(List)`
  width: auto;
`;
const Clone = styled(Item)`
  width: 100%;
  margin-right: 1rem;
`;
const Elements = (props) => {
  const { multiPageToggle } = props;
  const { elementList, allElements } = useContext(UserContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredElements, setFilteredElements] = useState(elementList);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    const filtered = elementList.filter((category) => {
      const filteredElements = category.elements.filter((element) => {
        return (
          element.name
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          category.type.toLowerCase().includes(event.target.value.toLowerCase())
        );
      });
      return filteredElements.length >= 0;
    });
    setFilteredElements(filtered);
  };

  const filteredElementList = filteredElements.map((category, indexOut) => {
    if (category.type === "Multipage Elements" && !multiPageToggle) {
      return null;
    }
    return (
      <React.Fragment key={category.type}>
        <div className={styles.element_heading}>{category.type}</div>
        <div className={`${styles.element_list} ${styles.custom_row}`}>
          {category.elements
            .filter((element) => {
              return (
                element.name
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                category.type.toLowerCase().includes(searchQuery.toLowerCase())
              );
            })
            .map((element, index) => (
              <Draggable
                key={element.id}
                draggableId={element.id}
                index={element.index - 1 }
              >
                {(provided, snapshot) => (
                  <React.Fragment>
                    <Item
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`${styles.element_group} ${
                        element.index === 10 || element.index === 12
                          ? styles.disabled_element
                          : ""
                      }`}
                      style={provided.draggableProps.style}
                    >
                      <div className={styles.element_icon}>
                        <Image src={element.icon} alt={element.name} />
                      </div>
                      <div className={styles.element_name}>
                        {element.name}
                      </div>
                      {element.index === 10 ? (
                        <span className={styles.tooltiptext}>
                          Coming Soon
                        </span>
                      ) : null}
                    </Item>
                    {snapshot.isDragging && (
                      <Clone>
                        <div className={styles.element_group}>
                          <div className={styles.element_icon}>
                            <Image src={element.icon} alt={element.name} />
                          </div>
                          <div className={styles.element_name}>
                            {element.name}
                          </div>
                        </div>
                      </Clone>
                    )}
                  </React.Fragment>
                )}
              </Draggable>
            ))}
        </div>
      </React.Fragment>
    );
  });

  return (
    <div className={styles.elementList}>
      <div className={styles["search-header"]}>
        <input
          type="text"
          value={searchQuery}
          placeholder="Search"
          onChange={handleSearchInputChange}
        />
      </div>
      <Droppable droppableId="allElements" isDropDisabled={true}>
        {(provided, snapshot) => (
          <Kiosk ref={provided.innerRef} aggingOver={snapshot.isDraggingOver}>
            {filteredElementList}
            {provided.placeholder}
          </Kiosk>
        )}
      </Droppable>
    </div>
  );
};

export default Elements;

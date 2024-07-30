import { useState } from "react";

const MenuItem = ({ item = [] }) => {
  const [isShowingSubSection, setisShowingSubSection] = useState(false);

  function handleSelectSection(getLabel) {
    console.log(getLabel);
    setisShowingSubSection((prevState) => !prevState);
  }

  console.log(isShowingSubSection);

  let subSectionClass = undefined;
  if (
    item.label !== "Home" &&
    item.label !== "Profile" &&
    item.label !== "Settings"
  ) {
    subSectionClass = "subSection";
  }

  return (
    <>
      <li>
        <div
          onClick={() => handleSelectSection(item.label)}
          className={`label_icon_container ${subSectionClass}`}
        >
          <p className="item_label">{item.label}</p>
          <span className="show_hide_icon">
            {isShowingSubSection &&
            item &&
            item.children &&
            item.children.length > 0
              ? "-"
              : "+"}
          </span>
        </div>
      </li>
      {isShowingSubSection &&
      item &&
      item.children &&
      item.children.length > 0 ? (
        <MenuList list={item.children} />
      ) : null}
    </>
  );
};

const MenuList = ({ list }) => {
  return (
    <ul className="menu-list-container">
      {list?.length > 0
        ? list.map((listItem) => (
            <MenuItem key={listItem.label} item={listItem} />
          ))
        : null}
    </ul>
  );
};

export default MenuList;

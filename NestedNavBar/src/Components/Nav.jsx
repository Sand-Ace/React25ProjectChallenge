import MenuList from "./MenuList";

const Nav = ({ data }) => {
  console.log(data);
  return (
    <div className="treeview_container">
      <MenuList list={data} />
    </div>
  );
};

export default Nav;

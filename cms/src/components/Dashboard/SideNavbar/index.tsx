import React, {useState} from "react";
import "./SideNavbar.scss";
import {
  MdHome,
  MdPerson,
  MdHelp,
} from "react-icons/md";
import Nav from "react-bootstrap/Nav";
import Collapse from "react-bootstrap/Collapse";
import { ReactComponent as ProductIcon } from "../../../assets/ProductIcon.svg";
import { ReactComponent as PostIcon } from "../../../assets/PostIcon.svg";

interface Props {};

interface State {};

interface CollapseNavLinkProps {
  title: string;
  icon: JSX.Element;
  collapseElements: Array<string>;
};

const CollapseNavLink: React.FC<CollapseNavLinkProps> = (props: CollapseNavLinkProps) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Nav.Link className="item" onClick={() => setOpen(!isOpen)}>
        {props.icon}
        {props.title}
      </Nav.Link>

      <Collapse in={isOpen}>
        <div>
          {props.collapseElements.map(function(element) {
            return (
              <Nav.Link className="subitem">
                {element}
              </Nav.Link>
            );
          })}
        </div>
      </Collapse>
    </>
  )
}


export default class SideNavbar extends React.Component<Props, State> {

  render() {
    return (
      <div className="sidenav">
        <Nav className="flex-column">
          <Nav.Link className="item">
            <MdHome className="icon"/>
            Trang chủ
          </Nav.Link>
          <CollapseNavLink
            title="Sản phẩm"
            icon={<ProductIcon className="icon custom-draw"/>}
            collapseElements={["Tất cả sản phẩm", "Yêu cầu sản phẩm"]}
          />
          <Nav.Link className="item">
            <PostIcon className="icon custom-draw"/>
            Bài đăng
          </Nav.Link>
          <Nav.Link className="item">
            <MdPerson className="icon"/>
            Thông tin cá nhân
          </Nav.Link>
          <hr className="h-divider"/>
          <div className="footer">
            <Nav.Link className="item">
              <MdHelp className="icon"/>
              Help & Support
            </Nav.Link>
          </div>
        </Nav>
      </div>
    )
  }
}

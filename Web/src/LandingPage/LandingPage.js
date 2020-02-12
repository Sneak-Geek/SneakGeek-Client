import React from 'react';
import './LandingPage.css';
import Logo from '../Image/logo.png';
import Page1Screen from '../Image/page-1-screen.png';
import Android from '../Image/android.png';
import Page2Screen from '../Image/page-2-screen.png';
import Page3Screen from '../Image/page-3-screen.png';
import Tao from '../Image/ios.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default class LandingPage extends React.Component {
    render() {
        return (
            <div>
                {/* Navigation Bar */}
                <Navbar className="nav-adjust">
                    <Navbar.Brand href="#home">
                        <img
                            alt=""
                            src={Logo}
                            width="70"
                            height="70"
                        />
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Link className="nav-text" href="#deets">Cách hoạt động</Nav.Link>
                        <Nav.Link className="nav-text" href="#deets">Về chúng tôi</Nav.Link>
                        <Nav.Link className="nav-text" href="#deets">Liên hệ</Nav.Link>
                    </Nav>
                </Navbar>
                {/* First Component */}
                <div className="first-component">
                    <div>
                        <div className="sneak-geek-text">
                            SneakGeek
                        </div>
                        <div className="nen-tang-text"> 
                            Nền tảng trung gian giao dịch sneakers trực tuyến đầu tiên tại Việt Nam
                        </div>
                        <div className="android">
                            <img src = {Android}/>
                        </div>
                        <div className="tao">
                            <img src = {Tao}/>
                        </div>
                    </div>
                    <div className="page-1-screen">
                        <img src = {Page1Screen}/>
                    </div>
                </div>
                {/* Second Component */}
                <div className="second-component">
                    <div className="p2-img">
                        <img src = {Page2Screen}/>
                    </div>
                    <div>
                        <div className="tim-kiem-text">
                            Tìm kiếm dễ dàng
                        </div>
                        <div className="hon-text"> 
                            Hơn 32.000 mẫu giày khác nhau, liên tục cập nhật từ các thương hiệu nổi tiếng
                        </div>
                    </div>     
                </div>
                {/* Third Component */}
                <div className="third-component">
                    <div>
                        <div className="reduced-width mua-ban-text">
                            Mua/bán thuận tiện
                        </div>
                        <div className="reduced-width mua-ban-small-text"> 
                            Mua/bán và quản lý đơn hàng nhanh chóng, tiện lợi, phù hợp với cả cửa hàng lẫn người dùng cá nhân
                        </div>
                    </div>
                    <div>
                        <img src = {Page3Screen}/>
                    </div>
                </div>
            </div>
        )
    }
}
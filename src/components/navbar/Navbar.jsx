import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar, Badge, Divider, Drawer, Layout, Menu,
} from 'antd';
import {
  BellOutlined,
  DownOutlined,
  MenuOutlined,
} from '@ant-design/icons';
//* Img
import BagIcon from '../../assets/icons/bag.svg';
import QuestionIcon from '../../assets/icons/question.svg';
import Logo from '../../assets/mandu-logo.png';
import LogoLight from '../../assets/logo-white.png';
//* Css
import './style.css';

const { Header } = Layout;

const styleLogoDark = {
  height: '40px',
  width: '120px',
  objectFit: 'cover',
  alignSelf: 'center',
  borderRadius: '0.1875rem',
  border: '1px solid #EDE9E9',
};

const styleLogoLigth = {
  height: '30px',
  width: '100px',
  objectFit: 'cover',
  alignSelf: 'center',
  borderRadius: '0.1875rem',
};

function AppMenu({
  className, items, mode = 'horizontal', style,
}) {
  return (
    <>
      {mode === 'vertical' ? (
        <div className="navbar-logo">
          <img src={Logo} alt="madu" style={styleLogoDark} />
        </div>
      ) : (
        ''
      )}
      <Menu
        className={className}
        style={
          style ?? {
            background: 'transparent',
            color: '#FFF',
            width: '100%',
          }
        }
        mode={mode}
        defaultSelectedKeys={['1']}
        items={items}
      />
    </>
  );
}

AppMenu.propTypes = {
  // eslint-disable-next-line react/require-default-props
  className: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  items: PropTypes.array.isRequired,
  mode: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types, react/require-default-props
  style: PropTypes.object,
};

function Navbar(args) {
  const { items, user, avatarImg } = args;
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  // Todo: getThe first user letter in order to generate an avatarImg
  const [avatar, setAvatar] = React.useState('');

  React.useEffect(() => {
    if (!avatarImg) {
      setAvatar(user?.split()[0]);
    }
  }, []);

  return (
    <Header
      className="navbar-main"
      style={{
        display: 'flex',
        alignItems: 'center',
        paddingInline: '0.5rem',
      }}
    >
      <div className="navbar-logo">
        <img
          src={LogoLight}
          alt="madu"
          style={styleLogoLigth}
          className="navbar-logo-img-light"
        />
      </div>
      {/* // *  Menu links section */}
      <AppMenu className="menu-links" items={items} mode="horizontal" />
      {/* // *  Menu icon (appears at certain resolution) */}
      <div style={{ marginInline: '1rem' }} className="menu-icon">
        <MenuOutlined
          style={{
            color: '#FFF',
            fontSize: 26,
            cursor: 'pointer',
            display: 'flex',
          }}
          onClick={() => setMenuIsOpen(true)}
        />
      </div>
      {/* // *  Icons section */}
      <div className="icons-section">
        <img src={BagIcon} alt="bag-icon" />
        <Divider type="vertical" />
        {/* <QuestionCircleOutlined /> */}
        <img src={QuestionIcon} alt="question-icon" />
        <Divider type="vertical" />
        <Badge count={3}>
          <Avatar icon={<BellOutlined />} size="small" />
        </Badge>
      </div>
      {/* // *  Avatar section */}
      <div className="avatar-section">
        <Avatar
          gap={4}
          style={{
            float: 'right',
            backgroundColor: '#f56a00',
          }}
        >
          A
        </Avatar>
        <div
          style={{ color: '#FFF', marginInline: '.6rem' }}
          className="navbar-text text-inactive"
        >
          {user}
        </div>
        <DownOutlined
          style={{
            color: '#FFF',
            marginInline: '.6rem',
            cursor: 'not-allowed',
          }}
        />
      </div>
      <div className="navbar-logo">
        <img
          src={Logo}
          alt="madu"
          style={styleLogoDark}
          className="navbar-logo-img"
        />
      </div>
      <Drawer
        placement="left"
        open={menuIsOpen}
        onClose={() => setMenuIsOpen(false)}
        closable
      >
        <AppMenu items={items} mode="vertical" style={{ color: '#000' }} />
      </Drawer>
    </Header>
  );
}

export default Navbar;

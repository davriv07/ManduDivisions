import React from 'react';
import {
  Breadcrumb, Button, Layout, Modal, Tabs, Tooltip, theme,
} from 'antd';
//* Css
import './style.css';
import {
  DownloadOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';

const Navbar = React.lazy(() => import('../../components/navbar/Navbar'));

const { Content, Header } = Layout;

//* Styles
const styleLayout = {
  width: '100vw',
  height: '100vh',
  margin: 0,
  padding: 0,
};

//* Some data
const navbarItems = [
  {
    label: 'Dashboard',
    key: 'dashboard',
    disabled: true,
  },
  {
    label: 'Organización',
    key: 'organization',
  },
  {
    label: 'Modelos',
    key: 'modelos',
    disabled: true,
    children: [
      {
        label: 'Modelos',
        key: 'models',
      },
    ],
  },
  {
    label: 'Seguimiento',
    key: 'seguimiento',
    disabled: true,
    children: [
      {
        label: 'Procesos',
        key: 'processes',
      },
    ],
  },
];

//* Dummy function
const onChange = (key) => {
  console.log(key);
};

//* Lazy import...
const TableDivisionsComponent = React.lazy(() => import('../../components/tables/Table'));

//* Table actions like: Add, import, export
function TableMainActions() {
  //* Modal
  const [open, setOpen] = React.useState(false);
  const showModal = () => setOpen(true);
  const handleCancel = () => setOpen(false);
  const handleOk = () => setOpen(false);

  return (
    <>
      <Modal
        title="Agregar división"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Este es un modal</p>
      </Modal>
      <div className="content-buttons-sections">
        <Tooltip title="Agregar">
          <Button type="primary" icon={<PlusOutlined onClick={showModal} />} />
        </Tooltip>
        <Tooltip title="Importar">
          <Button type="default" icon={<UploadOutlined />} />
        </Tooltip>
        <Tooltip title="Exportar">
          <Button type="default" icon={<DownloadOutlined />} />
        </Tooltip>
      </div>
    </>
  );
}

function Divisions() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const tabItems = [
    {
      key: '1',
      label: 'Divisiones',
      children: <TableDivisionsComponent />,
    },
    {
      key: '2',
      label: 'Colaboradores',
      children: 'Content of Tab Pane 2',
      disabled: true,
    },
  ];

  return (
    <Layout className="layout" style={styleLayout}>
      <Navbar items={navbarItems} user="Administrador" />
      <Content style={{ padding: '0' }}>
        <Header
          style={{ background: '#FFF', height: '5rem', padding: '1.2rem' }}
        >
          <Breadcrumb
            className="breadcumb-main"
            style={{ margin: '0' }}
            items={[{ title: 'Organización' }]}
          />
          <Tabs
            defaultActiveKey="1"
            items={tabItems}
            onChange={onChange}
            tabBarExtraContent={<TableMainActions />}
          />
        </Header>
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        />
      </Content>
    </Layout>
  );
}

export default Divisions;

import React, { useEffect, useState } from 'react';
import {
  Col, Input, Radio, Row, Select, Space, Table,
} from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';

//* Css
import './style.css';
import axios from 'axios';

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

function TableDivisions() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (column, search, page, per_page) => {
    axios.get(`${import.meta.env.VITE_API}/division`)
      .then((res) => {
        setData(res.data.result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  //* Helper for getting filters
  const getUniqueFilters = (dataD, dataIndex) => {
    if (!dataD) return [];
    const uniqueValues = new Set();
    // eslint-disable-next-line no-restricted-syntax
    for (const item of dataD) {
      uniqueValues.add(item[dataIndex]);
    }
    return Array.from(uniqueValues).map((value) => ({
      text: value,
      value,
    }));
  };

  const columns = [
    {
      title: 'División',
      dataIndex: 'division',
      filters: getUniqueFilters(data.data, 'division'),
      onFilter: (value, record) => record.division?.indexOf(value) === 0,
      sorter: (a, b) => a.division.length > b.division.length,
    },
    {
      title: 'División superior',
      dataIndex: 'division_parent',
      filters: getUniqueFilters(data.data, 'division_parent'),
      onFilter: (value, record) => record.division_parent?.indexOf(value) === 0,
      sorter: (a, b) => a.division_parent?.length > b.division_parent?.length,
    },
    {
      title: 'Colaboradores',
      dataIndex: 'collaborators',
      sorter: (a, b) => a.collaborators > b.collaborators,
    },
    {
      title: 'Nivel',
      dataIndex: 'level',
      filters: getUniqueFilters(data.data, 'level'),
      onFilter: (value, record) => record.level === value,
      sorter: (a, b) => a.level > b.level,
    },
    {
      title: 'Subdivisiones',
      dataIndex: 'subdivisions',
      sorter: (a, b) => a.subdivisions > b.subdivisions,
      render: (e) => (
        <div>
          <span>{e}</span>
          <PlusCircleFilled
            style={{ marginLeft: 8, color: '#49C5A9E5' }}
            onClick={(val) => console.log(val)}
          />
        </div>
      ),
    },
    {
      title: 'Embajadores',
      dataIndex: 'ambassador',
    },
  ];

  const selectColumnOptions = columns.map((column) => ({
    value: column.dataIndex,
    label: column.title,
  }));

  return (
    <div className="table-container">
      <Row style={{ padding: '0.7rem' }}>
        <Col span={6}>
          <Radio.Group>
            <Radio.Button checked>Listado</Radio.Button>
            <Radio.Button disabled>Árbol</Radio.Button>
          </Radio.Group>
        </Col>
        <Col
          span={8}
          offset={10}
          style={{ display: 'flex', justifyContent: 'end' }}
        >
          <Space direction="horizontal">
            <Select
              placeholder="Columnas"
              style={{ width: 120 }}
              onChange={(e) => console.log(e)}
              options={selectColumnOptions}
            />
            <Input placeholder="Buscar" style={{ minWidth: 300 }} />
          </Space>
        </Col>
      </Row>

      <Table
        rowKey={(row) => row.id}
        columns={columns}
        dataSource={data.data}
        onChange={onChange}
        pagination={{
          current: data.current_page,
          pageSize: data.per_page,
          total: data.total,
          showTotal: (total) => `Total colaboradores: ${total}`,
          showPrevNextJumpers: true,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100'],
        }}
        expandable
        loading={loading}
      />
    </div>
  );
}

export default TableDivisions;

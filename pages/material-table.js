import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { useQuery, gql } from '@apollo/client';

const GET_PROMOTORAS = gql`
  {
    promotoras {
      id
      nombres
      apellidos
      razonSocial
      nit
    }
  }
`;
const Wrapper = ({ promotoras }) => {
  console.log(promotoras);
  const [columns, setColumns] = useState([
    { title: 'id', field: 'id' },
    { title: 'Nombres', field: 'nombres' },
    { title: 'Apellidos', field: 'apellidos' },
    { title: 'Razon Social', field: 'razonSocial' },
    {
      title: 'NIT',
      field: 'nit',
    },
  ]);
  const [data, setdata] = useState(promotoras);
  return (
    <div style={{ maxWidth: '100%' }}>
      <MaterialTable
        columns={columns}
        // data={data}
        title='Promotoras'
        // editable={{
        //   onRowUpdate: (newData, oldData) =>
        //     new Promise((resolve, reject) => {
        //       setTimeout(() => {
        //         {
        //           const data = this.state.data;
        //           const index = data.indexOf(oldData);
        //           data[index] = newData;
        //           this.setState({ data }, () => resolve());
        //         }
        //         resolve();
        //       }, 1000);
        //     }),
        // }}
      />
    </div>
  );
};
const TablePage = () => {
  const { loading, error, data } = useQuery(GET_PROMOTORAS);
  if (loading) return 'Loading';
  if (error) return 'error...';
  return <Wrapper promotoras={data.promotoras} />;
};

export default TablePage;

import React from 'react';
import clone from 'clone';
import TableWrapper from '../TeamsTable.styles';
import { EditableCell, DeleteCell } from 'components/Tables/HelperCells';

export default function(props) {
  const [state, setState] = React.useState({
    columns: createcolumns(clone(props.tableInfo.columns)),
    dataList: props.dataList.getAll(),
  });
  const { columns, dataList } = state;

  function createcolumns(columns) {
    const renderEditableFirstName = (text, record, index) => (
      <EditableCell
        index={index}
        columnsKey={columns[0].key}
        value={text[columns[0].key]}
        onChange={onCellChange}
      />
    );
    const renderEditableLastName = (text, record, index) => (
      <EditableCell
        index={index}
        columnsKey={columns[1].key}
        value={text[columns[1].key]}
        onChange={onCellChange}
      />
    );
    columns[0].render = renderEditableFirstName;
    columns[1].render = renderEditableLastName;
    const deleteColumn = {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record, index) => (
        <DeleteCell index={index} onDeleteCell={onDeleteCell} />
      ),
    };
    columns.push(deleteColumn);
    return columns;
  }

  function onCellChange(value, columnsKey, index) {
    dataList[index][columnsKey] = value;
    setState({ ...state, dataList });
  }

  function onDeleteCell(index) {
    dataList.splice(index, 1);
    setState({ ...state, dataList });
  }

  function onChange(pagination, filters, sorter) {
    if (sorter && sorter.columnKey && sorter.order) {
      if (sorter.order === 'ascend') {
        dataList.getSortAsc(sorter.columnKey);
      } else {
        dataList.getSortDesc(sorter.columnKey);
      }
      setState(dataList.getAll());
    }
  }

  return (
    <TableWrapper
      columns={columns}
      onChange={onChange}
      dataSource={dataList}
      className="isoEditableTable"
    />
  );
}

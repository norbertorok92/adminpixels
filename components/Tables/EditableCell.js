import React from 'react';
import Input from 'components/uielements/input';
import { EditOutlined, CheckOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export default function(props) {
  const [state, setState] = React.useState({
    value: props.value,
    editable: false,
  });
  const handleChange = event => {
    const value = event.target.value;
    setState({ ...state, value });
  };
  const check = () => {
    setState({ ...state, editable: false });
    if (props.onChange) {
      props.onChange(state.value, props.columnsKey, props.index);
    }
  };
  const edit = () => {
    setState({ ...state, editable: true });
  };
  const { value, editable } = state;
  return (
    <div className="isoEditData">
      {editable ? (
        <div className="isoEditDataWrapper">
          <Input value={value} onChange={handleChange} onPressEnter={check} />
          <Button type="link" icon={<CheckOutlined />} className="isoEditIcon" onClick={check} />
        </div>
      ) : (
        <p className="isoDataWrapper">
          {value || ' '}
          <Button type="link" icon={<EditOutlined />} className="isoEditIcon" onClick={edit} />
        </p>
      )}
    </div>
  );
}

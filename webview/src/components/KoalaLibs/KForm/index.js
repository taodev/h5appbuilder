import React from 'react';
import { Form, Input, Select } from 'antd';

const FormItem = Form.Item;

class KForm extends React.Component {
  // props = {
  //   schema: {},
  // }

  renderForm = () => {
    const { layout, itemLayout, children } = this.props.schema;

    const items = [];
    let i = 0;
    let field = null;
    for (i = 0; i < children.length; i += 1) {
      field = children[i];
      switch (field.type) {
        case 'select':
          items.push(this.renderSelect(field, i, itemLayout));
          break;
        default:
          items.push(this.renderNormal(field, i, itemLayout));
      }
    }

    return (
      <Form layout={layout}>
        { items }
      </Form>
    );
  }

  renderSelect(field, index, layout) {
    const options = [];
    if (field.options) {
      field.options.forEach((option) => {
        options.push(<Select.Option key={option.key} value={option.key}>
          { option.value }
        </Select.Option>);
      });
    }

    return (
      <FormItem key={index} label={field.label} {...layout} >
        {
          this.props.form.getFieldDecorator(field.name,
            {
              initialValue: field.defaultValue,
              rules: [
                {
                  required: field.required,
                  message: field.message,
                },
              ],
            })(<Select placeholder={field.placeholder || '请选择'} size={field.size}>
              {options}
            </Select>)
        }
      </FormItem>
    );
  }

  renderNormal(field, index, layout) {
    return (
      <FormItem key={index} label={field.label} {...layout} >
        {this.props.form.getFieldDecorator(field.name, {
          rules: [
            {
              required: field.required,
              message: field.message,
            },
          ],
        })(<Input size={field.size} placeholder={field.placeholder} />)}
      </FormItem>
    );
  }

  render() {
    const form = this.renderForm();

    return (
      <div id={121233}>
        { form }
      </div>
    );
  }
}

export default Form.create()(KForm);

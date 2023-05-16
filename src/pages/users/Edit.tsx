import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm, getValueFromEvent } from "@refinedev/antd";
import { Form, Input, Checkbox, DatePicker, Upload } from "antd";
import dayjs from "dayjs";

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const usersData = queryResult?.data?.data;

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Id"
          name={["id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input readOnly disabled />
        </Form.Item>
        <Form.Item
          label="First Name"
          name={["firstName"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name={["lastName"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name={["email"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Status"
          valuePropName="checked"
          name={["status"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Checkbox>Status</Checkbox>
        </Form.Item>
        <Form.Item
          label="Birthday"
          name={["birthday"]}
          rules={[
            {
              required: true,
            },
          ]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker />
        </Form.Item>
        <>
          {(usersData?.skills as any[])?.map((item, index) => (
            <Form.Item
              key={index}
              label={`Skills ${index + 1}`}
              name={["skills", index]}
            >
              <Input type="text" />
            </Form.Item>
          ))}
        </>
        <Form.Item label="Avatar">
          <Form.Item
            name="avatar"
            valuePropName="fileList"
            getValueFromEvent={getValueFromEvent}
            noStyle
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Upload.Dragger
              listType="picture"
              multiple
              beforeUpload={() => false}
            >
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
      </Form>
    </Edit>
  );
};

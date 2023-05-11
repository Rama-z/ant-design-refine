import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm, useSelect, getValueFromEvent } from "@refinedev/antd";
import { Form, Input, Select, DatePicker, Upload } from "antd";
import dayjs from "dayjs";

export const PostCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm();

  const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",
  });

  const { selectProps: userSelectProps } = useSelect({
    resource: "users",
    optionLabel: "firstName",
  });

  const { selectProps: tagsSelectProps } = useSelect({
    resource: "tags",
  });

  const { selectProps: languageSelectProps } = useSelect({
    resource: "languages",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name={["title"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Slug"
          name={["slug"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Content"
          name="content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item
          label="Hit"
          name={["hit"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Category"
          name={["category", "id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...categorySelectProps} />
        </Form.Item>
        <Form.Item
          label="User"
          name={["user", "id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...userSelectProps} />
        </Form.Item>
        <Form.Item
          label="Status"
          name={["status"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Status Color"
          name={["status_color"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Created At"
          name={["createdAt"]}
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
        <Form.Item
          label="Published At"
          name={["publishedAt"]}
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
        <Form.Item label="Image">
          <Form.Item
            name="image"
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
        <Form.Item
          label="Tags"
          name={"tags"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select mode="multiple" {...tagsSelectProps} />
        </Form.Item>
        <Form.Item
          label="Language"
          name={"language"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...languageSelectProps} />
        </Form.Item>
      </Form>
    </Create>
  );
};

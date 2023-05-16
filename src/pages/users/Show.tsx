import React from "react";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import {
  Show,
  NumberField,
  TagField,
  TextField,
  EmailField,
  BooleanField,
  DateField,
  ImageField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const UserShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <NumberField value={record?.id ?? ""} />
      <Title level={5}>First Name</Title>
      <TextField value={record?.firstName} />
      <Title level={5}>Last Name</Title>
      <TextField value={record?.lastName} />
      <Title level={5}>Email</Title>
      <EmailField value={record?.email} />
      <Title level={5}>Status</Title>
      <BooleanField value={record?.status} />
      <Title level={5}>Birthday</Title>
      <DateField value={record?.birthday} />
      <Title level={5}>Skills</Title>
      {record?.skills?.map((item: any) => (
        <TagField value={item} key={item} />
      ))}
      <Title level={5}>Avatar</Title>
      {record?.avatar?.map((item: any) => (
        <ImageField
          style={{ maxWidth: 200 }}
          value={item?.url}
          key={item?.url}
        />
      ))}
    </Show>
  );
};

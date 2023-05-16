import React from "react";
import {
  IResourceComponentsProps,
  useShow,
  useOne,
  useMany,
} from "@refinedev/core";
import {
  Show,
  NumberField,
  TagField,
  TextField,
  MarkdownField,
  DateField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const SampleShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: categoryData, isLoading: categoryIsLoading } = useOne({
    resource: "categories",
    id: record?.category?.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  const { data: tagsData, isLoading: tagsIsLoading } = useMany({
    resource: "tags",
    ids: record?.tags || [],
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <NumberField value={record?.id ?? ""} />
      <Title level={5}>Title</Title>
      <TextField value={record?.title} />
      <Title level={5}>Content</Title>
      <MarkdownField value={record?.content} />
      <Title level={5}>Category</Title>
      {categoryIsLoading ? <>Loading...</> : <>{categoryData?.data?.title}</>}
      <Title level={5}>Tags</Title>
      {tagsIsLoading ? (
        <>Loading...</>
      ) : (
        <>
          {tagsData?.data?.map((tag: any) => (
            <TagField key={tag?.title} value={tag?.title} />
          ))}
        </>
      )}
      <Title level={5}>Created At</Title>
      <DateField value={record?.createdAt} />
    </Show>
  );
};

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
  ImageField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const PostShow: React.FC<IResourceComponentsProps> = () => {
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

  const { data: userData, isLoading: userIsLoading } = useOne({
    resource: "users",
    id: record?.user?.id || "",
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

  const { data: languageData, isLoading: languageIsLoading } = useOne({
    resource: "languages",
    id: record?.language || "",
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
      <Title level={5}>Slug</Title>
      <TextField value={record?.slug} />
      <Title level={5}>Content</Title>
      <MarkdownField value={record?.content} />
      <Title level={5}>Hit</Title>
      <NumberField value={record?.hit ?? ""} />
      <Title level={5}>Category</Title>
      {categoryIsLoading ? <>Loading...</> : <>{categoryData?.data?.title}</>}
      <Title level={5}>User</Title>
      {userIsLoading ? (
        <>Loading...</>
      ) : (
        <>{userData?.data?.firstName + " " + userData?.data?.lastName}</>
      )}
      <Title level={5}>Status</Title>
      <TextField value={record?.status} />
      <Title level={5}>Status Color</Title>
      <TextField value={record?.status_color} />
      <Title level={5}>Created At</Title>
      <DateField value={record?.createdAt} />
      <Title level={5}>Published At</Title>
      <DateField value={record?.publishedAt} />
      <Title level={5}>Image</Title>
      {record?.image?.map((item: any) => (
        <ImageField
          style={{ maxWidth: 200 }}
          value={item?.url}
          key={item?.url}
        />
      ))}
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
      <Title level={5}>Language</Title>
      {languageIsLoading ? <>Loading...</> : <>{languageData?.data?.title}</>}
    </Show>
  );
};

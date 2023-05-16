import React from "react";
import { IResourceComponentsProps, BaseRecord, useMany } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  MarkdownField,
  DateField,
  ImageField,
  TagField,
  DeleteButton,
  FilterDropdown,
  useSelect,
} from "@refinedev/antd";
import { Table, Space, Select } from "antd";

export const PostList: React.FC<IResourceComponentsProps> = () => {
  const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",
  });

  const { selectProps: userSelectProps } = useSelect({
    resource: "users",
  });

  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: "categories",
    ids: tableProps?.dataSource?.map((item) => item?.category?.id) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  const { data: userData, isLoading: userIsLoading } = useMany({
    resource: "users",
    ids: tableProps?.dataSource?.map((item) => item?.user?.id) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  const { data: tagsData, isLoading: tagsIsLoading } = useMany({
    resource: "tags",
    ids: [].concat(
      ...(tableProps?.dataSource?.map((item) => item?.tags) ?? [])
    ),
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  const { data: languageData, isLoading: languageIsLoading } = useMany({
    resource: "languages",
    ids: tableProps?.dataSource?.map((item) => item?.language) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column sorter dataIndex="id" title="Id" />
        <Table.Column sorter dataIndex="titles" title="Titles" />
        <Table.Column sorter dataIndex="slug" title="Slug" />
        <Table.Column
          sorter
          dataIndex="content"
          title="Content"
          render={(value) => (
            <MarkdownField value={value.slice(0, 80) + "..."} />
          )}
        />
        <Table.Column sorter dataIndex="hit" title="Hit" />
        <Table.Column
          sorter
          dataIndex={["category", "id"]}
          title="Category"
          render={(value) =>
            categoryIsLoading ? (
              <>Loading...</>
            ) : (
              categoryData?.data?.find((item) => item.id === value)?.title
            )
          }
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                placeholder="Select category"
                {...categorySelectProps}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          sorter
          dataIndex={["user", "id"]}
          title="User"
          render={(value) =>
            userIsLoading ? (
              <>Loading...</>
            ) : (
              userData?.data?.find((item) => item.id === value)?.firstName +
              " " +
              userData?.data?.find((item) => item.id === value)?.lastName
            )
          }
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                placeholder="Select category"
                {...userSelectProps}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column sorter dataIndex="status" title="Status" />
        <Table.Column sorter dataIndex="status_color" title="Status Color" />
        <Table.Column
          sorter
          dataIndex={["createdAt"]}
          title="Created At"
          render={(value) => <DateField value={value} />}
        />
        <Table.Column
          sorter
          dataIndex={["publishedAt"]}
          title="Published At"
          render={(value) => <DateField value={value} />}
        />
        <Table.Column
          sorter
          dataIndex="image"
          title="Image"
          render={(value: any[]) => (
            <>
              {value?.map((item, index) => (
                <ImageField
                  style={{ maxWidth: "100px" }}
                  value={item?.url}
                  key={index}
                />
              ))}
            </>
          )}
        />
        <Table.Column
          sorter
          dataIndex="tags"
          title="Tags"
          render={(value: any[]) =>
            tagsIsLoading ? (
              <>Loading...</>
            ) : (
              <>
                {value?.map((item, index) => (
                  <TagField
                    key={index}
                    value={
                      tagsData?.data?.find(
                        (resourceItems) => resourceItems.id === item
                      )?.title
                    }
                  />
                ))}
              </>
            )
          }
        />
        <Table.Column
          sorter
          dataIndex={["language"]}
          title="Language"
          render={(value) =>
            languageIsLoading ? (
              <>Loading...</>
            ) : (
              languageData?.data?.find((item) => item.id === value)?.title
            )
          }
        />
        <Table.Column
          sorter
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};

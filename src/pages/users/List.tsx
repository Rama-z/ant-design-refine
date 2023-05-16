import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  TagField,
  EmailField,
  BooleanField,
  DateField,
  ImageField,
  DeleteButton,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const UserList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column sorter dataIndex="id" title="Id" />
        <Table.Column dataIndex="firstName" title="First Name" />
        <Table.Column dataIndex="lastName" title="Last Name" />
        <Table.Column
          dataIndex={["email"]}
          title="Email"
          render={(value: any) => <EmailField value={value} />}
        />
        <Table.Column
          dataIndex={["status"]}
          title="Status"
          render={(value: any) => <BooleanField value={value} />}
        />
        <Table.Column
          dataIndex={["birthday"]}
          title="Birthday"
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex="skills"
          title="Skills"
          render={(value: any[]) => (
            <>
              {value?.map((item) => (
                <TagField value={item} key={item} />
              ))}
            </>
          )}
        />
        <Table.Column
          dataIndex="avatar"
          title="Avatar"
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

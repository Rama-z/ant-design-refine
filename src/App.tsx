import { Refine } from "@refinedev/core";
import {
  ThemedLayoutV2,
  notificationProvider,
  ErrorComponent,
  RefineThemes,
} from "@refinedev/antd";
import routerBindings, {
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AntdInferencer } from "@refinedev/inferencer/antd";

import { ConfigProvider } from "antd";

import "@refinedev/antd/dist/reset.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Purple}>
        <Refine
          routerProvider={routerBindings}
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          notificationProvider={notificationProvider}
          resources={[
            {
              name: "users",
              list: "/users",
            },
            {
              name: "posts",
              list: "/posts",
              show: "/posts/show/:id",
              create: "/posts/create",
              edit: "/posts/edit/:id",
            },
            {
              name: "samples",
              list: "/samples",
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
        >
          <Routes>
            <Route
              // Sidebar
              element={
                <ThemedLayoutV2>
                  <Outlet />
                </ThemedLayoutV2>
              }
            >
              {/* <Route index element={<NavigateToResource resource="posts" />} /> */}
              <Route path="users" element={<AntdInferencer />} />
              <Route path="posts">
                <Route index element={<AntdInferencer />} />
                <Route path="show/:id" element={<AntdInferencer />} />
                <Route path="edit/:id" element={<AntdInferencer />} />
                <Route path="create" element={<AntdInferencer />} />
              </Route>
              <Route path="samples" element={<AntdInferencer />} />
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
          <UnsavedChangesNotifier />
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;

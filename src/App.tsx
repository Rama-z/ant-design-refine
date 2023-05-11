import { Refine, Authenticated } from "@refinedev/core";
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
import { PostCreate, PostEdit, PostList, PostShow } from "./pages/posts/index";
import authProvider, { axiosInstance } from "./authProvider";
import { LoginPage, RegisterPage } from "./components/pages/auth/components";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Purple}>
        <Refine
          authProvider={authProvider}
          routerProvider={routerBindings}
          dataProvider={dataProvider(
            "https://api.fake-rest.refine.dev",
            axiosInstance
          )}
          notificationProvider={notificationProvider}
          resources={[
            {
              name: "users",
              list: "/users",
              create: "/users/create",
            },
            {
              name: "posts",
              list: "/posts",
              show: "/posts/show/:id",
              create: "/posts/create",
              edit: "/posts/edit/:id",
              meta: {
                canDelete: true,
              },
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
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route
              // Sidebar
              element={
                <Authenticated fallback={<LoginPage />}>
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route index element={<NavigateToResource resource="posts" />} />
              <Route path="users">
                <Route index element={<AntdInferencer />} />
                <Route path="create" element={<AntdInferencer />} />
              </Route>
              <Route path="posts">
                <Route index element={<PostList />} />
                <Route path="show/:id" element={<PostShow />} />
                <Route path="edit/:id" element={<PostEdit />} />
                <Route path="create" element={<PostCreate />} />
              </Route>
              <Route path="samples">
                <Route index element={<AntdInferencer />} />
                <Route path="create" element={<AntdInferencer />} />
              </Route>
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

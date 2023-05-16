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
import {
  ForgotPasswordPage,
  LoginPage,
  RegisterPage,
  UpdatePasswordPage,
} from "./pages/auth/components";
import { UserCreate, UserEdit, UserList, UserShow } from "./pages/users";
import {
  SampleCreate,
  SampleEdit,
  SampleList,
  SampleShow,
} from "./pages/samples";

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
              show: "/users/show/:id",
              edit: "/users/edit/:id",
            },
            {
              name: "posts",
              list: "/posts",
              create: "/posts/create",
              show: "/posts/show/:id",
              edit: "/posts/edit/:id",
            },
            {
              name: "samples",
              list: "/samples",
              create: "/samples/create",
              show: "/samples/show/:id",
              edit: "/samples/edit/:id",
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
            <Route path="forgotPassword" element={<ForgotPasswordPage />} />
            <Route path="updatePassword" element={<UpdatePasswordPage />} />
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
                <Route index element={<UserList />} />
                <Route path="create" element={<UserCreate />} />
                <Route path="show/:id" element={<UserShow />} />
                <Route path="edit/:id" element={<UserEdit />} />
              </Route>
              <Route path="posts">
                <Route index element={<PostList />} />
                <Route path="show/:id" element={<PostShow />} />
                <Route path="edit/:id" element={<PostEdit />} />
                <Route path="create" element={<PostCreate />} />
              </Route>
              <Route path="samples">
                <Route index element={<SampleList />} />
                <Route path="create" element={<SampleCreate />} />
                <Route path="show/:id" element={<SampleShow />} />
                <Route path="edit/:id" element={<SampleEdit />} />
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

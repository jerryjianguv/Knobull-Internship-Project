import auto from "./auto";
import { Navigate } from "react-router-dom";
import Error from "@/pages/err";
import loadable from "@loadable/component";
import { Spin } from "antd";
type LoadingComponent = () => Promise<React.ReactNode>;
export interface RouterInfo {
  components: LoadingComponent | React.ReactNode;
  [MENU_PATH]: string;
  [MENU_KEY]?: any;
  [MENU_TITLE]?: string | any;
  [MENU_KEEPALIVE]?: string | any;
  [name: string]: any;
}

const defaultArr: RouterInfo[] = [
  {
    [MENU_PATH]: "/",
    [MENU_KEY]: "index",
    components: <Navigate to="/front/home" replace />,
  },
  {
    [MENU_PATH]: "/admin",
    [MENU_KEY]: "admin",
    components: <Navigate to="/admin/userManagement" replace />,
  },
  {
    [MENU_PATH]: "/result/404",
    components: <Error />,
  },
  {
    [MENU_PATH]: "/result/403",
    components: (
      <Error
        status="403"
        errTitle="403"
        subTitle="Sorry, you don't have access to this page."
      />
    ),
  },
  {
    [MENU_PATH]: "/result/500",
    components: (
      <Error
        status="500"
        errTitle="500"
        subTitle="Sorry, the server is reporting an error."
      />
    ),
  },
  {
    [MENU_PATH]: "*",
    [MENU_TITLE]: "Page not found",
    [MENU_KEY]: "404",
    components: <Error />,
  },
];
const autoList: RouterInfo[] = [];
const fellbackStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 500,
  fontSize: 24,
};
auto.forEach((item) => {
  const { components, ...anyProps } = item;
  const Com = loadable(item.components, {
    fallback: <Spin style={fellbackStyle} tip="Page loading...." />,
  });
  const info = { ...anyProps, components: <Com /> };
  autoList.push(info);
});
const list: RouterInfo[] = [...autoList, ...defaultArr];

export default list;

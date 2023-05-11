// import axios from "axios";
// import { DataProvider, HttpError } from "@refinedev/core";
// import { stringify } from "query-string";

// const axiosInstance = axios.create();

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     const customError: HttpError = {
//       ...error,
//       message: error.response?.data?.message,
//       statusCode: error.response?.status,
//     };
//     return Promise.reject(customError);
//   }
// );

// export const dataProvider = (apiUrl: string): DataProvider => ({
//   getList: async ({ resource, pagination, sorters }) => {
//     const url = `${apiUrl}/${resource}`;
//     const { current = 1, pageSize = 10 } = pagination ?? {};

//     const query: {
//       _start?: number;
//       _end?: number;
//       _sort?: string;
//       _order?: string;
//     } = {
//       _start: (current - 1) * pageSize,
//       _end: current * pageSize,
//     };
//     if (sorters && sorters.length > 0) {
//       query._sort = sorters[0].field;
//       query._order = sorters[0].order;
//     }
//     const { data, headers } = await axiosInstance.get(
//       `${url}?${stringify(query)}`
//     );
//     const total = +headers["x-total-count"];
//     // return {
//     //   data,
//     //   total,
//     // };
//   },
// });

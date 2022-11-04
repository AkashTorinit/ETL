import axios from "axios";
import dynamic from "next/dynamic";
import { useCallback, useState, useEffect } from "react";
import { UserTableRow } from "../../backend/user/user";
// import CustomTable from "../template/customTable";
import { String } from "aws-sdk/clients/apigateway";
const CustomTable = dynamic(() => import("../template/customTable"));
interface Props {
  search: String;
}

const UserTableView = ({ search }: Props) => {
  const [reloadTableData] = useState(0);
  const [headCells, setHeadCells] = useState([
    // {
    //   id: "userId",
    //   label: "User ID",
    //   search: "",
    // },
    {
      id: "email",
      label: "User",
      search: "",
    },
    {
      id: "createdDateTime",
      label: "Registered At",
      search: "",
    },
    {
      id: "password",
      label: "Change Password",
      search: "",
    },
    {
      id: "action",
      label: "Action",
      search: "",
    },
  ]);

  const [refreshPage,setrefreshPage] = useState(false)

  const fetchData = async (data: any) => {
    // eslint-disable-next-line quotes
    const page = data.page - 1;
    const skipRecords = page * data.rowsPerPage;

    return await axios.get(
      `/api/getUsers?limit=${data.rowsPerPage}&skip=${skipRecords}&sortBy=${data.sort_column}&sort=${data.sort_type}&search=${search}`
    );
  };

  const formatRowData = useCallback(
    ({ email, createdDateTime, status }: UserTableRow) => {
      // const dataTime = moment(createdDateTime).format("L");
      return { email, createdDateTime, status };
    },
    []
  );

  const handleClick = () => {
    setrefreshPage(!refreshPage)
  }

  useEffect(() => {
       
  }, [refreshPage]);

  return (
    <CustomTable
      headCells={headCells}
      triggerReloadRows={reloadTableData}
      api={fetchData}
      formatRowData={formatRowData}
      handleSearch={setHeadCells}
      defaultSortOrder={"asc"}
      defaultSortColumn={"userId"}
      handleClick={handleClick}
    />
  );
};

export default UserTableView;

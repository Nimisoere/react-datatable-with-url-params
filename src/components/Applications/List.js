import React from "react";
import PropTypes from "prop-types";
import DataTable from "../Shared/DataTable";

export const ApplicationsList = ({ ...props }) => {
  console.log(props)
  const { fetching, data, loadData, error } = props;
  const dataCount =
    data && data.count ? data.count : data && data.data ? data.data.length : 0;

  const columns = [
    {
      name: "User ID",
      accessor: "id"
    },
    {
      name: "Name",
      accessor: "name"
    },
    {
      name: "Email",
      accessor: "email"
    },
    {
      name: "Date of Birth / Age",
      accessor: "birth_date"
    },
    {
      name: "Years of experience",
      accessor: "year_of_experience"
    },
    {
      name: "Position Applied",
      accessor: "position_applied"
    },
    {
      name: "Application Date",
      accessor: "application_date"
    },
    {
      name: "Application Status",
      accessor: "status"
    }
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        loading={fetching}
        data={data}
        count={dataCount}
        countName="Applications"
        loadData={loadData}
        error={error}
        bordered={true}
        striped={true}
        hover={true}
        responsive
      />
    </div>
  );
};

ApplicationsList.propTypes = {
  match: PropTypes.object.isRequired,
  data: PropTypes.object,
  loadData: PropTypes.func,
  fetching: PropTypes.bool,
  fetched: PropTypes.bool,
  error: PropTypes.object
};

export default ApplicationsList;

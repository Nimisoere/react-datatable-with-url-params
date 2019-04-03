import React from "react";
import PropTypes from "prop-types";
import DataTable from "../Shared/DataTable";
import { MdLens } from "react-icons/md";
import { appConstants } from "../../_constants";
const calculateAge = dob => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const ApplicationsList = ({ ...props }) => {
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
      accessor: "name",
      filterable: true
    },
    {
      name: "Email",
      accessor: "email"
    },
    {
      name: "Date of Birth / Age",
      accessor: "birth_date",
      Cell: row => {
        return (
          <div>
            {row.birth_date} <strong>({calculateAge(row.birth_date)})</strong>
          </div>
        );
      }
    },
    {
      name: "Years of experience",
      accessor: "year_of_experience",
      sortable: true
    },
    {
      name: "Position Applied",
      accessor: "position_applied",
      sortable: true,
      filterable: true
    },
    {
      name: "Application Date",
      accessor: "application_date",
      sortable: true,
      sortType: "date"
    },
    {
      name: "Application Status",
      accessor: "status",
      filterable: true,
      filterOptions: [
        {value: appConstants.APPLICATION_STATUS.APPROVED, label: "Approved"},
        {value: appConstants.APPLICATION_STATUS.WAITING, label: "Waiting"},
        {value: appConstants.APPLICATION_STATUS.REJECTED, label: "Rejected"}
      ],
      Cell: row => {
        switch (row.status) {
          case appConstants.APPLICATION_STATUS.APPROVED:
            return (
              <span>
                <MdLens className="text-success" /> Approved
              </span>
            );
          case appConstants.APPLICATION_STATUS.REJECTED:
            return (
              <span>
                <MdLens className="text-danger" /> Rejected
              </span>
            );
          case appConstants.APPLICATION_STATUS.WAITING:
            return (
              <span>
                <MdLens className="text-warning" /> Waiting
              </span>
            );
          default:
            return "foo";
        }
      }
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
        defaultPageSize="10"
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

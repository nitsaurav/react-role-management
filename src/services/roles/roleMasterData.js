// import axios from "axios";

export default function getRoleMasterData() {
  // fetch all data from api
  // let data = [];
  // await axios.get("https://test.com/api/roles").then(res => {
  //   data = res.data.data;
  // });
  // return data;

  return [
    {
      id: 1,
      name: "Admin"
    },
    {
      id: 2,
      name: "Super Admin"
    },
    {
      id: 3,
      name: "Cashier"
    }
  ];
}

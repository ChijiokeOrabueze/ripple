const rootUrl = "http://localhost:8080/api/v1/clients";
export const triggerSeeds = [
  {
    url: `${rootUrl}/client1`,
    name: "client1",
    params: [{ name: "param1" }, { name: "param2" }],
  },
  {
    url: `${rootUrl}/client2`,
    name: "client2",
    params: [{ name: "param1" }],
  },
  {
    url: `${rootUrl}/client3`,
    name: "client3",
    params: [{ name: "param1" }, { name: "param2" }, { name: "param3" }],
  },
];

import SvgColor from "../../component/Dashboard/svg-color";

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "dashboard",
    path: "/dashboard/",
    icon: icon("ic_analytics"),
  },
  {
    title: "user",
    path: "/dashboard/user",
    icon: icon("ic_user"),
  },
  {
    title: "profile",
    path: "/dashboard/profile",
    icon: icon("ic_gear"),
  },
  {
    title: "Land",
    path: "/dashboard/land",
    icon: icon("ic_cart"),
  },
];

export default navConfig;

import HomeIcon from "@mui/icons-material/Home";
import EngineeringIcon from "@mui/icons-material/Engineering";
import RocketIcon from "@mui/icons-material/Rocket";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import MemoryIcon from "@mui/icons-material/Memory";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import TerminalIcon from "@mui/icons-material/Terminal";

export const forumData = [
  {
    name: "INÍCIO",
    icon: <HomeIcon />,
    pathPergunta: "/",
    pathAvisos: "/avisos",
  },
  {
    name: "ENGENHARIAS",
    icon: <EngineeringIcon />,
    pathPergunta: "/engenharias",
    pathAvisos: "/avisos/engenharia",
  },
  {
    name: "ENGENHARIA AEROESPACIAL",
    icon: <RocketIcon />,
    pathPergunta: "/aeroespacial",
    pathAvisos: "/avisos/aeroespacial",
  },
  {
    name: "ENGENHARIA AUTOMOTIVA",
    icon: <CarRepairIcon />,
    pathPergunta: "/automotiva",
    pathAvisos: "/avisos/automotiva",
  },
  {
    name: "ENGENHARIA ELETRÔNICA",
    icon: <MemoryIcon />,
    pathPergunta: "/eletronica",
    pathAvisos: "/avisos/eletronica",
  },
  {
    name: "ENGENHARIA DE ENERGIA",
    icon: <EnergySavingsLeafIcon />,
    pathPergunta: "/energia",
    pathAvisos: "/avisos/energia",
  },
  {
    name: "ENGENHARIA DE SOFTWARE",
    icon: <TerminalIcon />,
    pathPergunta: "/software",
    pathAvisos: "/avisos/software",
  },
];

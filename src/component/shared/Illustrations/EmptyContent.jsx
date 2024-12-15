import PropTypes from "prop-types";
import Box from "@mui/material/Box";

export default function IllustrationEmpty({ ...other }) {
  return (
    <Box {...other}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 480 360"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="BG"
            x1="19.496%"
            x2="77.479%"
            y1="71.822%"
            y2="16.69%"
          >
            <stop offset="0%" stopColor="#502fb1" />
            <stop offset="100%" stopColor="#502fb1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <path
          fill="url(#BG)"
          fillRule="nonzero"
          d="M0 198.78c0 41.458 14.945 79.235 39.539 107.786 28.214 32.765 69.128 53.365 114.734 53.365a148.44 148.44 0 0056.495-11.036c7.919-3.16 15.24-6.84 21.93-11.314 10.335-6.893 19.946-15.067 28.697-24.392 16.05-17.285 29.051-37.891 38.15-60.504a175.973 175.973 0 007.317-25.896c1.214-5.845 2.122-11.799 2.7-17.85a181.84 181.84 0 00.369-11.877c0-9.343-.712-18.483-2.087-27.384-2.422-15.725-7.028-30.697-13.797-44.84-1.516-3.17-3.116-6.34-4.796-9.51-4.432-8.328-9.745-16.972-15.783-25.785-4.754-6.939-9.874-13.6-15.356-20.005C224.39 36.184 176.458 13.23 123.51 13.23a175.774 175.774 0 00-25.168 1.81C44.072 23.304 0 77.002 0 140.42v58.36z"
          opacity={0.2}
        />
        <path fill="#7950f2" d="M182.67 256h-17.34l-30-75h77.34z" />
        <path
          fill="#502fb1"
          d="M182.67 256h-17.34l-30-75h77.34z"
          opacity={0.24}
        />
        <path fill="#7950f2" d="M332.67 256h-17.34l-30-75h77.34z" />
        <path
          fill="#502fb1"
          d="M332.67 256h-17.34l-30-75h77.34z"
          opacity={0.24}
        />
        <path fill="#7950f2" d="M182.67 106h-17.34l-30-75h77.34z" />
        <path
          fill="#502fb1"
          d="M182.67 106h-17.34l-30-75h77.34z"
          opacity={0.24}
        />
        <path fill="#7950f2" d="M332.67 106h-17.34l-30-75h77.34z" />
        <path
          fill="#502fb1"
          d="M332.67 106h-17.34l-30-75h77.34z"
          opacity={0.24}
        />
        <path fill="#7950f2" d="M257.67 181h-17.34l-30-75h77.34z" />
        <path
          fill="#502fb1"
          d="M257.67 181h-17.34l-30-75h77.34z"
          opacity={0.24}
        />
      </svg>
    </Box>
  );
}

IllustrationEmpty.propTypes = {
  sx: PropTypes.object,
};

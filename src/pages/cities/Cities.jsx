import { Box, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Container from '../../components/container/Container';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useCities } from '../../store/Cities';
import { useNavigate } from 'react-router-dom';

const Cities = () => {
  const api = "http://localhost:3000/cities";
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState("");
  const { isDarkMode } = useCities();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, [isDarkMode]);

  useEffect(() => {
    getCities();
  }, []);

  async function getCities() {
    try {
      const { data } = await axios.get(api);
      setCities(data);
    } catch (error) {
      console.error(error);
    }
  }

  const Filter = cities.filter((ele) =>
    ele.name.toLowerCase().includes(search.toLowerCase().trim())
  );

  return (
    <Container sx={{ backgroundColor: "#f4f4f9" }}>
      <Box
        sx={{
          marginTop: "30px",
          marginBottom: "30px",
          padding: "20px",
          backgroundImage: "url('/public/dec47003-26ec-434e-8421-b14b55ec9657.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "20px",
          boxShadow: isDarkMode ? "0px 4px 20px #424242" : "0px 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          size='small'
          sx={{
            boxShadow: "0px 2px 6px rgba(100, 100, 100)",
            borderRadius: '30px',
            "& .MuiOutlinedInput-root": {
              borderRadius: "30px",
              backgroundColor: isDarkMode ? "#202020" : "#fff",
              boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#0075c9" }} />
              </InputAdornment>
            ),
          }}
          placeholder="Search cities"
        />

        <Grid container sx={{ display: "flex", gap: "50px", marginTop: "30px" }}>
          {Filter.length > 0 ? (
            Filter.map((el) => (
              <Grid
                key={el.id}
                onClick={() => navigate(`/city/${el.name}`)}
                data-aos='zoom-in-up'
                item
                sx={{
                  transition: 'transform 0.5s ease, background-color 0.5s ease',
                  "&:hover": {
                    transform: 'scale(1.1)',
                  },
                  maxWidth: "430px",
                  width: "100%",
                  cursor: "pointer",
                  boxShadow: "0px 0px 15px rgba(0,0,0,0.2)",
                  borderRadius: "20px",
                  margin: "auto",
                  backgroundColor: isDarkMode ? "#00000099" : "#ffffff99"
                }}
              >
                <Box className="carousel">
                  {el.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={el.name}
                      style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "20px 20px 0 0" }}
                    />
                  ))}
                </Box>
                <Typography
                  sx={{
                    textAlign: "center",
                    padding: "15px 0",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    color: isDarkMode ? "#fff" : "#000",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                  }}
                >
                  {el.name}
                </Typography>
              </Grid>
            ))
          ) : (
            <Typography
              sx={{
                textAlign: "center",
                width: "100%",
                padding: "20px",
                fontWeight: "bold",
                fontSize: "1.5rem",
                color: "#ff0000",
              }}
            >
              Not Found: "{search}"
            </Typography>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default Cities;

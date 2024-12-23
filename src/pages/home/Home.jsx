import { Box, Button, Grid, styled, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Container from "../../components/container/Container"
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useCities } from '../../store/Cities';
import Aos from 'aos';
import { ArrowRightOutlined } from '@mui/icons-material';

const Home = () => {
  let api = "http://localhost:3000/cities"
  const [cities, setCities] = useState([])
  const [search, setSearch] = useState("")
  const { isDarkMode } = useCities()
  const navigate = useNavigate()

  const StyledButton = styled(Button)({
    fontWeight: '600',
    width: 'fit-content',
    alignSelf:'center',
    margin:'20px 0',
    fontSize: '18px',
    textTransform: 'none',
    padding: '6px 14px',
    borderRadius: '20px',
    transition: 'all 0.3s ease',
    background: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      backgroundColor: isDarkMode ? 'rgba(40, 40, 40, 1)' : 'rgba(240, 240, 240, 1)',
      transform: 'translateY(-2px)',
      boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.15)',
    },
  });

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, [isDarkMode]);

  useEffect(() => {
    get()
  }, [])


  async function get() {
    try {
      const { data } = await axios.get(api)
      setCities(data)
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <>
      <Container>
        <Box sx={{ marginTop: "30px", display:'flex', flexDirection:'column' }}>
          <Box
            sx={{
              position: 'relative',
              padding: '270px 0px',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              borderRadius: "20px",
              backgroundImage: "url('/src/images/ismoil.png')",
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: "url('/src/images/ismoil.png')",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                filter: 'blur(10px)',
                zIndex: -1,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                borderRadius: "20px",
                zIndex: 0,
              },
            }}
          >
            <Typography
              sx={{
                textAlign: 'center',
                fontWeight: '900',
                fontSize: {md:"70px", xs:"50px"},
                position: 'relative',
                color: 'white',
                zIndex: 1,
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
              }}
            >Welcome to Tajikistan</Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <TextField
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                variant="outlined"
                size='small'
                sx={{
                  width: '100%',
                  maxWidth: '400px',
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                    backgroundColor: isDarkMode ? "#202020" : "#fff",
                    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                    zIndex: 1,
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
            </Box>
          </Box>

          <Box data-aos="fade-down">
          <Box sx={{marginTop: "30px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", padding: "0px 50px"}}>
            <Typography data-aos="fade-right" sx={{fontSize: "40px", fontWeight: "900"}}>Cities of Tajikistan</Typography>
            <StyledButton data-aos="fade-left" sx={{ background: 'linear-gradient(90deg, #00c6ff, #0072ff)', color: 'white', marginBottom: "30px", width: "300px" }}>
            <Link to="/cities" style={{ textDecoration: 'none', display: 'flex', alignItems: "center", gap: '10px', color: 'inherit' }}>
               More Cities <ArrowRightOutlined></ArrowRightOutlined>
            </Link>
          </StyledButton>
          </Box>
          <Typography sx={{padding: "0px 50px", fontSize: "25px", color: "gray"}}>The largest metropolitan area in Tajikistan is that of the capital Dushanbe, <br /> with 15,63,400 inhabitants (2024 est.). Thirteen percent of the population <br /> of the country lives in the region of the capital.</Typography>
          </Box>

          <Grid container sx={{ display: "flex", gap: "50px", marginTop: "30px", marginBottom: "30px"}}>
            {cities.length > 0 && cities.slice(0, 6).filter((ele) => ele.name.toLowerCase().includes(search.toLocaleLowerCase().trim())).map((el) => (
              <Grid key={el.id} onClick={() => navigate(`/city/${el.name}`)} data-aos="fade-down" item sx={{
                maxWidth: "430px",
                width: "100%",
                cursor: "pointer",
                boxShadow: "0px 0px 15px rgba(0,0,0,0.2)",
                borderRadius: "20px",
                margin: "auto",
                backgroundColor: isDarkMode ? "#00000099" : "#ffffff99",
                  "&:hover": {
                    transition: 'all 0.5s',
                    scale:'1.1'
                  }
              }}>
                <Box className="carousel" >
                  {el.images.map((image, i) => (
                    <img src={image} key={i} alt={el.name} style={{
                      width: "100%",
                      height: "100%", backgroundColor: "#283593", objectFit: "cover"
                    }} />
                  ))}
                </Box>
                <Typography sx={{
                  textAlign: "center",
                  padding: "15px 0",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  color: isDarkMode ? "#fff" : "#000",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                }}>{el.name}</Typography>
              </Grid>
            ))}
          </Grid>

        </Box>
      </Container>
    </>
  )
}

export default Home
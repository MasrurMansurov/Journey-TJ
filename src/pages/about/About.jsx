import { Box, Typography } from '@mui/material'
import { useEffect } from 'react'
import Container from "../../components/container/Container"
import { Link } from 'react-router-dom'
import InfoIcon from '@mui/icons-material/Info';
import { useCities } from '../../store/Cities'
import AOS from 'aos';
import 'aos/dist/aos.css';


const About = () => {
  const { isDarkMode } = useCities()

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, [isDarkMode]);

  const style = {
    backgroundColor: isDarkMode ? "#00000090" : "#ffffff90", backdropFilter: 'blur(10px)', marginTop: "30px", padding: "20px", borderRadius: "20px", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)"
  }
  return (
    <>
      <Container>
        <Box sx={{ marginTop: "30px", marginBottom: "30px", padding: "30px", backgroundImage: "url('/public/dec47003-26ec-434e-8421-b14b55ec9657.webp')", backgroundSize: "cover", borderRadius: "20px", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)" }}>


          <Box data-aos="fade-right" sx={style}>
            <Typography sx={{ fontSize: "30px", fontWeight: "900" }}><InfoIcon></InfoIcon> About Journey Tajikistan</Typography>
            <Typography sx={{ marginTop: "5px", fontSize: "25px" }}>
              <Link to={"/"} style={{ textDecorationColor: 'gray' }}><span style={{ fontFamily: "inherit", fontWeight: "900", color: "gray" }}>Journey Tajikistan</span></Link> - is an interactive application that opens up all the cities of Tajikistan, their culture, nature, and history to you. We aim to inspire travelers to explore this amazing region.
            </Typography>
          </Box>

          <Box data-aos="fade-left" sx={style}>
            <Typography sx={{ fontSize: "30px", fontWeight: "900" }}><InfoIcon></InfoIcon> History of Creation</Typography>
            <Typography sx={{ marginTop: "5px", fontSize: "25px" }}>
              The idea of <Link to={"/"} style={{ textDecorationColor: 'gray' }}><span style={{ fontWeight: "900", color: "gray" }}>Journey Tajikistan</span></Link> was born out of a love for travel and a desire to share the beauty of Tajikistan. We want everyone to discover unique cities and their rich heritage.
            </Typography>
          </Box>

          <Box data-aos="fade-right" sx={style}>
            <Typography sx={{ fontSize: "30px", fontWeight: "900" }}><InfoIcon></InfoIcon> Goals and Mission</Typography>
            <Typography sx={{ marginTop: "5px", fontSize: "25px" }}>
              Our mission is to create a convenient platform for exploring Tajikistan, helping travelers find information about each city, its attractions, and cultural features.
            </Typography>
          </Box>

          <Box data-aos="fade-left" sx={style}>
            <Typography sx={{ fontSize: "30px", fontWeight: "900" }}><InfoIcon></InfoIcon> What We Offer</Typography>
            <Typography sx={{ marginTop: "5px", fontSize: "25px" }}>
              <Link to={"/"} style={{ textDecorationColor: 'gray' }}><span style={{ fontWeight: "900", color: "gray" }}>Journey Tajikistan</span></Link> provides detailed guides for each city, photographs, travel tips, and information about local traditions. You can also plan your journey and share your experiences with others.
            </Typography>
          </Box>

          <Box data-aos="fade-right" sx={style}>
            <Typography sx={{ fontSize: "30px", fontWeight: "900" }}><InfoIcon></InfoIcon> Your Values</Typography>
            <Typography sx={{ marginTop: "5px", fontSize: "25px" }}>
              We believe in sustainable tourism and respect for culture and traditions. Our goal is to promote local tourism and support local communities.
            </Typography>
          </Box>

          <Box data-aos="fade-left" sx={style}>
            <Typography sx={{ fontSize: "30px", fontWeight: "900" }}><InfoIcon></InfoIcon> Contact Information</Typography>
            <Typography sx={{ marginTop: "5px", fontSize: "25px" }}>
              We always welcome your feedback and suggestions! Feel free to contact us via email: <Link to={''}><span style={{ cursor: "pointer", fontWeight: "900", textDecoration: "underline", color: isDarkMode ? "gray" : "", textDecorationColor: isDarkMode ? "gray" : "" }}>info@journeytj.com</span></Link>
            </Typography>
          </Box>

        </Box>
      </Container>
    </>
  )
}

export default About

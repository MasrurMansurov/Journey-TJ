import { Avatar, Box, Button, Link, TextField, Tooltip, Typography } from "@mui/material";
import axios, { all } from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/container/Container";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation'; 
import 'swiper/css/pagination'
import { Mousewheel, Navigation, Pagination, Autoplay  } from 'swiper/modules'; 
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import Modal from '@mui/material/Modal';
import StarsIcon from '@mui/icons-material/Stars';
import { useCities } from "../../store/Cities";
const City = () => {
  let api = "http://localhost:3000/cities/?name=";
  const name = useParams();
  const [city,setCity] = useState([])
  const [textOpen,setTextOpen] = useState(false)

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius:"10px"
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [AddName,setAddName] = useState("")
  const [AddComment,setAddComment] = useState("")
  const [comments, setComments] = useState([])
  const {isDarkMode} = useCities()
  const [Hotels,setHotels] = useState([])
  

  useEffect(() => {
    get()
  }, [])


  async function get() {
    try {
      const {data}= await axios.get(api+name.name)
      const {data:allcomments} = await axios.get('http://localhost:3000/comments')
      const commentsOf = allcomments.filter(el => +el?.cityId == +data[0].id)
      const {data:AllHotel} = await axios.get('http://localhost:3000/HotelsOfCity')
      const HotelOf = AllHotel.filter(el => +el?.cityId == +data[0].id)
      setComments(commentsOf)
      setCity(data)
      setHotels(HotelOf)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() =>
  {
    console.table(comments)
  } , [comments])

  async function Add() {
    let obj ={
      cityId:city[0].id,
      title:AddComment,
      name:AddName
    }
    try {
      const r=await axios.post('http://localhost:3000/comments',obj)
      setCity(r.data)
      get()
      handleClose()
    } catch (error) {
      console.error(error);
    }
  }
  
  // alert(JSON.stringify(Hotels));

  return <Container>
    <Box>
    <Box sx={{marginTop: "30px", marginBottom: "30px"}}>
     {city.length>0 && city?.map((el , i)=>{
       return <Box key={i}>
        <Swiper
        style={{width: "100%",maxWidth: "900px"}}
        spaceBetween={50}
        slidesPerView={1}
        mousewheel={true}
        loop={true}
        autoplay={{delay: 3000, disableOnInteraction: false,}}
        // navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination, Mousewheel, Autoplay ]} 
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        >
         <Box sx={{padding: "0px 3px"}}>
         {
          el?.images?.map((img, index) =>
          (
           <SwiperSlide style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "5px"}} key={index}><img style={{ maxWidth: "900px",width:"100%", height: "400px", alignItems: "center", objectFit: "cover",borderRadius: "10px" }} src={img} alt="Images are not defined !" /></SwiperSlide> 
          ))
         }
         </Box>

         </Swiper>
         <Typography sx={{fontSize: "40px", fontWeight: "700",maxWidth:"900px",margin:"auto",marginTop:"30px"}}>{el.name}</Typography>
         <Tooltip title="Click to see more">
         <Typography
        sx={{
          fontSize: "20px",
          maxWidth: "900px",
          margin: "auto",
          display: "-webkit-box",
          WebkitLineClamp: textOpen ? "none" : "5",
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          opacity:"70%",
          cursor: "pointer",
        }}
        onClick={()=>setTextOpen(!textOpen)}
        >
          {el.desc}
        </Typography><br />
        </Tooltip>

      <Box sx={{maxWidth:"900px",margin:"auto",marginBottom:"20px"}}>
      <Typography sx={{fontSize:"40px",fontWeight:"700",}}>Hotels</Typography><br />  
      <Box sx={{display:"flex",flexWrap:"wrap",gap:"50px"}}>
      {Hotels.length>0 && Hotels.map((hotel)=>{
          return <Box sx={{maxWidth:"300px",width:"100%",border:"1px solid black",padding:"20px 20px",borderRadius:"20px"}}>
            <Box className="" sx={{maxWidth:"300px",height:"150px"}}>
              {console.log(hotel.images[0])}
             
                 <img style={{width:"100%",height:"150px",borderRadius:"10px"}} src={hotel.images[0]} alt="" />
            </Box><br />
            <Typography sx={{fontWeight:"700",fontSize:"20px"}}>{hotel.name}</Typography>
            <Typography sx={{fontSize:"14px",marginBottom:"10px"}}>{hotel.description}</Typography>
            <Typography sx={{display:"flex",alignItems:"center",color:"#dd0"}}>{<StarsIcon/>}{hotel.rating}</Typography>
          </Box>
         })}
      </Box>
      </Box>

        <Box
          sx={{ marginTop: 2, maxWidth:"900px", margin:"auto", borderRadius: "20px", overflow: "hidden" }}
          dangerouslySetInnerHTML={{ __html: el.googleMap }}
          /><br/>
          <Box sx={{maxWidth:"900px",margin:"auto"}}>
          <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <Typography sx={{fontSize:"40px",fontWeight:"700",}}>Leave a review</Typography><br />
          <ControlPointOutlinedIcon onClick={()=>handleOpen()} sx={{fontSize:"50px",position:"sticky",bottom:"0",right:"0",cursor:"pointer"}} />
          </Box>
          </Box><br />
          <Box sx={{ backgroundColor:isDarkMode?"white":"#4444",scrollbarColor:"#00000010 #00000010`",overflow:"auto",position:"relative",padding:"20px",maxWidth:"900px",height:"300px",margin:"auto",borderRadius:"10px"}}>
           { comments.length > 0 && comments.map((ele)=>{ 
             return <Box>    
            <Box sx={{padding:"10px",backgroundColor:isDarkMode?"#444444":"white",borderRadius:"10px"}}>
            <Box sx={{display:"flex",alignItems:"center",gap:"15px",padding:"4px"}}>
            <Avatar/>
            <Box>
              <Typography sx={{fontWeight:"700"}}>{ele?.name.toUpperCase()}</Typography>
            <Typography>{ele.title}</Typography>
            </Box>
            </Box>
            </Box><br />
            </Box>
            })}
          </Box>

       </Box>

     })}
    </Box>



    {/* Modal Add */}
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <TextField fullWidth value={AddName} onChange={(e)=> setAddName(e.target.value)} label="Name" /><br /><br />
         <TextField fullWidth value={AddComment} onChange={(e)=>setAddComment(e.target.value)} label="Comment" /><br /><br />
         <Box sx={{display:"flex",gap:"20px"}}>
         <Button variant="contained"   onClick={()=> Add()}>save</Button>
         <Button onClick={()=>handleClose()} sx={{color:"red",border :"1px solid red"}}>CancEl</Button>
         </Box>
        </Box>
      </Modal>
 
   </Box>
  </Container>
};

export default City;

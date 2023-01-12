import { domen } from "../../Const/Const";
import { FC } from "react";
import { Carousel } from "react-bootstrap";

interface IMySlider{
    img: IImg[]
}

interface IImg{
    fileName: string,
    id: string
}

const MySlider:FC<IMySlider> = ({img})=>{
    const png = ['img','jpg','png', 'jfif']
    
    if(img.length===0){
        return(
            <></>
        )
    }   

    if(img.length===1){
        return(
            <>
                {png.includes(img[0]?.fileName.split('.')[1]) ? 
                <img src={`http://${domen}/${img[0]?.fileName}`} alt="" /> 
                : 
                <video 
                    width="320" height="240" 
                    controls
                    src={`http://${domen}/${img[0]?.fileName}`}> 
                    <source 
                        src={`http://${domen}/${img[0]?.fileName}`}
                        type="video/mp4">
                        
                        </source>
                </video>
                }
            </>
        )
    }   

    return(
        <div>
        <Carousel style={{zIndex: 0, position: 'relative'}} fade interval={null}>
        {img?.map((img)=>(
            <Carousel.Item key={img.id}>
                {png.includes(img?.fileName.split('.')[1]) ? 
                <img src={`http://${domen}/${img?.fileName}`} alt="" /> 
                : <video controls src={`http://${domen}/${img?.fileName}`} /> }
           </Carousel.Item>
        ))}
       
      </Carousel>
      </div>
    )
}

export default MySlider
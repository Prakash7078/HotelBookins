/* eslint-disable react/prop-types */
import { Carousel } from "react-carousel-minimal";

const slideNumberStyle = {
  fontSize: "20px",
  fontWeight: "bold",
};

const ImageSlider = ({ data }) => {
  const images = data.map((url) => ({ image: url }));
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          padding: "0 20px",
        }}
      >
        <Carousel
          data={images}
          width="850px"
          height="500px"
          radius="10px"
          slideNumber={true}
          slideNumberStyle={slideNumberStyle}
          automatic={false}
          dots={true}
          slideBackgroundColor="darkgrey"
          slideImageFit="cover"
          thumbnails={true}
          thumbnailWidth="100px"
          style={{
            textAlign: "center",
            maxWidth: "850px",
            maxHeight: "500px",
            margin: "auto",
          }}
        />
      </div>
    </div>
  );
};

export default ImageSlider;
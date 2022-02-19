import {Swiper, SwiperSlide} from 'swiper/react';
import Card from '@material-ui/core/Card';
import SwiperCore, {Keyboard, Navigation, Pagination, Scrollbar} from 'swiper/core';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/scrollbar/scrollbar.min.css';

SwiperCore.use([Keyboard, Scrollbar, Pagination, Navigation])

export default function MySwiper (props) {
  let images = [];

  images.push(props.apartment.pic1);
  if(props.apartment.pic2 !== null){
    images.push(props.apartment.pic2);
  }
  if(props.apartment.pic3 !== null){
    images.push(props.apartment.pic3);
  }
  if(props.apartment.pic4 !== null){
    images.push(props.apartment.pic4);
  }
  if(props.apartment.pic5 !== null){
    images.push(props.apartment.pic5);
  }

	return (
		<Card>
			<Swiper
				grabCursor
				keyboard={{ enabled: true }}
				pagination={{ clickable: true }}
				/*navigation*/
				loop
			>
				{images.map((image, index) => (
          <SwiperSlide key={index}>
            <img style={{ backgroundImage: "url(" + images[index] + ")" }} className={"card-img"}/>
          </SwiperSlide>
				))}
			</Swiper>
		</Card>
	)
}